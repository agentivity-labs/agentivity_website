const BREVO_URL = 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';
const BREVO_TIMEOUT_MS = 8000;

// List 2 = "Agentivity marketing".
const LIST_IDS = [2];
// Only the English confirmation template exists so far; put the French id here once it is created.
const TEMPLATE_IDS = { en: 1, fr: 1 };
const REDIRECTION_URLS = {
  en: 'https://www.agentivity.io/thank-you',
  fr: 'https://www.agentivity.io/fr/merci',
};

const SOURCES = ['waitlist-site', 'community-install', 'newsletter'];
const LANGUAGES = ['en', 'fr'];
const ALLOWED_FIELDS = new Set(['email', 'source', 'language', 'consent', 'website']);

const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_PART_LENGTH = 64;
const MAX_LOGGED_MESSAGE_LENGTH = 300;
const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const RATE_LIMIT_MAX_ENTRIES = 10_000;

const BASE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

export function createRateLimiter({
  max = RATE_LIMIT.max,
  windowMs = RATE_LIMIT.windowMs,
  maxEntries = RATE_LIMIT_MAX_ENTRIES,
  now = Date.now,
} = {}) {
  const hits = new Map();

  return function check(key) {
    const t = now();

    if (hits.size >= maxEntries) {
      for (const [k, entry] of hits) {
        if (entry.resetAt <= t) hits.delete(k);
      }
      if (hits.size >= maxEntries) hits.clear();
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= t) {
      hits.set(key, { count: 1, resetAt: t + windowMs });
      return { allowed: true };
    }

    entry.count += 1;
    if (entry.count > max) {
      return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - t) / 1000) };
    }
    return { allowed: true };
  };
}

function clientIp(req) {
  const headers = req.headers ?? {};
  const forwarded = headers['x-forwarded-for'];
  const firstForwarded = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0].trim();
  return headers['x-real-ip'] || firstForwarded || req.socket?.remoteAddress || 'unknown';
}

function readBody(req) {
  let body;
  try {
    body = req.body;
  } catch {
    return { error: 'invalid_json' };
  }

  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    try {
      body = JSON.parse(String(body));
    } catch {
      return { error: 'invalid_json' };
    }
  }

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'invalid_body' };
  }
  return { body };
}

function isHoneypotFilled(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

function isValidEmail(email) {
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return false;
  }
  const local = email.slice(0, email.indexOf('@'));
  return (
    local.length <= MAX_LOCAL_PART_LENGTH &&
    !local.startsWith('.') &&
    !local.endsWith('.') &&
    !local.includes('..')
  );
}

function validate(body) {
  for (const key of Object.keys(body)) {
    if (!ALLOWED_FIELDS.has(key)) return { error: 'unknown_field' };
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!isValidEmail(email)) return { error: 'invalid_email' };
  if (body.consent !== true) return { error: 'consent_required' };
  if (!SOURCES.includes(body.source)) return { error: 'invalid_source' };

  const language = body.language === undefined ? 'en' : body.language;
  if (!LANGUAGES.includes(language)) return { error: 'invalid_language' };

  return { value: { email, source: body.source, language } };
}

// Brevo's wording is only ever written to our own logs, never returned to the client.
function redactForLog(text, secrets) {
  let redacted = text;
  for (const secret of secrets) {
    if (secret) redacted = redacted.split(secret).join('[redacted]');
  }
  return redacted
    .replace(/[^\s@<>"',;()]+@[^\s@<>"',;()]+/g, '[email]')
    .slice(0, MAX_LOGGED_MESSAGE_LENGTH);
}

async function callBrevo({ fetchImpl, apiKey, email, source, language, today }) {
  const response = await fetchImpl(BREVO_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      includeListIds: LIST_IDS,
      templateId: TEMPLATE_IDS[language],
      redirectionUrl: REDIRECTION_URLS[language],
      attributes: { SOURCE: source, LANGUAGE: language, CONSENT_DATE: today },
    }),
    signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
  });

  if (response.ok) return { outcome: 'pending_confirmation' };

  const detail = await response.json().catch(() => ({}));
  const code = typeof detail?.code === 'string' ? detail.code : undefined;
  const message = typeof detail?.message === 'string' ? detail.message : '';
  const failure = { status: response.status, code, message: redactForLog(message, [email, apiKey]) };

  if (response.status === 400) {
    // Brevo does not document the "contact already exists" response of this endpoint,
    // so both the error codes and the message wording are matched defensively.
    if (code === 'duplicate_parameter' || /already (exist|associated|subscribed)/i.test(message)) {
      return { outcome: 'already_subscribed', ...failure };
    }
    // Same recipient submitted twice in a row: the confirmation email is already on its way.
    if (code === 'duplicate_request' || code === 'Request already processed') {
      return { outcome: 'pending_confirmation', ...failure };
    }
    if (code === 'invalid_parameter' && /e-?mail/i.test(message) && !/attribute/i.test(message)) {
      return { outcome: 'invalid_email', ...failure };
    }
  }

  return { outcome: 'upstream_error', ...failure };
}

function send(res, status, payload, extraHeaders = {}) {
  for (const [name, value] of Object.entries({ ...BASE_HEADERS, ...extraHeaders })) {
    res.setHeader(name, value);
  }
  res.status(status).json(payload);
}

export function createHandler({
  fetchImpl = globalThis.fetch,
  env = process.env,
  now = Date.now,
  rateLimiter = createRateLimiter({ now }),
  logger = console,
} = {}) {
  const log = (level, event, fields = {}) => logger[level](JSON.stringify({ event, ...fields }));

  return async function handler(req, res) {
    if (req.method === 'OPTIONS') {
      for (const [name, value] of Object.entries({ ...BASE_HEADERS, 'Access-Control-Max-Age': '86400' })) {
        res.setHeader(name, value);
      }
      res.status(204).end();
      return;
    }

    if (req.method !== 'POST') {
      return send(res, 405, { error: 'method_not_allowed' }, { Allow: 'POST, OPTIONS' });
    }

    const limit = rateLimiter(clientIp(req));
    if (!limit.allowed) {
      return send(res, 429, { error: 'rate_limited' }, { 'Retry-After': String(limit.retryAfterSec) });
    }

    const parsed = readBody(req);
    if (parsed.error) return send(res, 400, { error: parsed.error });

    // Same answer as a real success so a bot cannot tell it was caught.
    if (isHoneypotFilled(parsed.body.website)) {
      return send(res, 200, { ok: true, status: 'pending_confirmation' });
    }

    const checked = validate(parsed.body);
    if (checked.error) return send(res, 400, { error: checked.error });

    const apiKey = typeof env.BREVO_API_KEY === 'string' ? env.BREVO_API_KEY.trim() : '';
    if (!apiKey) {
      log('error', 'subscribe_not_configured');
      return send(res, 503, { error: 'not_configured' });
    }

    let result;
    try {
      result = await callBrevo({
        fetchImpl,
        apiKey,
        ...checked.value,
        today: new Date(now()).toISOString().slice(0, 10),
      });
    } catch (error) {
      log('error', 'brevo_unreachable', { reason: error?.name ?? 'unknown' });
      return send(res, 502, { error: 'upstream_error' });
    }

    switch (result.outcome) {
      case 'pending_confirmation':
        return send(res, 200, { ok: true, status: 'pending_confirmation' });
      case 'already_subscribed':
        return send(res, 200, { ok: true, status: 'already_subscribed' });
      case 'invalid_email':
        return send(res, 400, { error: 'invalid_email' });
      default:
        log('error', 'brevo_error', {
          brevoStatus: result.status,
          brevoCode: result.code,
          brevoMessage: result.message,
        });
        return send(res, 502, { error: 'upstream_error' });
    }
  };
}
