import {
  BASE_HEADERS,
  clientIp,
  createRateLimiter,
  isHoneypotFilled,
  isValidEmail,
  readBody,
  redactForLog,
  send,
} from './subscribe-core.js';

// The enquiry of the /services form, sent to us as a Brevo transactional e-mail. The sender must be a verified sender of the
// Brevo account (or an address of an authenticated domain), otherwise Brevo refuses the e-mail.
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_TIMEOUT_MS = 8000;
const INBOX = 'hello@agentivity.io';
const SENDER = { name: 'Agentivity website', email: INBOX };

// The values of the "What is it about?" list of the form (services_page.contact.form.topics).
const TOPICS = {
  strategy: 'Strategy',
  transformation: 'Transformation',
  execution: 'Execution',
  'agent-teams': 'AI teams and automation',
  workshops: 'Workshop or training',
  other: 'Not sure yet',
};
const LANGUAGES = ['en', 'fr'];
const ALLOWED_FIELDS = new Set(['name', 'email', 'service', 'message', 'language', 'website']);
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

function oneLine(text) {
  return text.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function validate(body) {
  for (const key of Object.keys(body)) {
    if (!ALLOWED_FIELDS.has(key)) return { error: 'unknown_field' };
  }

  const name = typeof body.name === 'string' ? oneLine(body.name) : '';
  if (name.length === 0 || name.length > MAX_NAME_LENGTH) return { error: 'invalid_name' };

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!isValidEmail(email)) return { error: 'invalid_email' };

  const service = body.service === undefined || body.service === '' ? '' : body.service;
  if (service !== '' && !Object.hasOwn(TOPICS, service)) return { error: 'invalid_service' };

  const message = typeof body.message === 'string' ? body.message.replace(/\r\n?/g, '\n').trim() : '';
  if (body.message !== undefined && typeof body.message !== 'string') return { error: 'invalid_message' };
  if (message.length > MAX_MESSAGE_LENGTH) return { error: 'message_too_long' };

  const language = body.language === undefined ? 'en' : body.language;
  if (!LANGUAGES.includes(language)) return { error: 'invalid_language' };

  return { value: { name, email, service, message, language } };
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function composeEmail({ name, email, service, message, language }) {
  const topic = service ? TOPICS[service] : 'Not given';
  const lines = [
    ['Name', name],
    ['E-mail', email],
    ['About', topic],
    ['Page', language === 'fr' ? '/fr/services' : '/services'],
  ];
  const context = message || '(no message)';
  const textContent = lines.map(([label, value]) => `${label}: ${value}`).join('\n') + '\n\n' + context + '\n';
  const htmlContent =
    '<p>' + lines.map(([label, value]) => `<strong>${label}:</strong> ${escapeHtml(value)}`).join('<br>') + '</p>' +
    '<p style="white-space:pre-wrap">' + escapeHtml(context) + '</p>';
  return {
    sender: SENDER,
    to: [{ email: INBOX, name: 'Agentivity' }],
    replyTo: { email, name: name.slice(0, 70) },
    subject: `Services enquiry: ${topic} (${name})`.slice(0, 200),
    textContent,
    htmlContent,
  };
}

async function callBrevo({ fetchImpl, apiKey, value }) {
  const response = await fetchImpl(BREVO_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(composeEmail(value)),
    signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
  });

  if (response.ok) return { outcome: 'sent' };

  const detail = await response.json().catch(() => ({}));
  const code = typeof detail?.code === 'string' ? detail.code : undefined;
  const message = typeof detail?.message === 'string' ? detail.message : '';
  return { outcome: 'upstream_error', status: response.status, code, message: redactForLog(message, [value.email, apiKey]) };
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
      return send(res, 200, { ok: true });
    }

    const checked = validate(parsed.body);
    if (checked.error) return send(res, 400, { error: checked.error });

    const apiKey = typeof env.BREVO_API_KEY === 'string' ? env.BREVO_API_KEY.trim() : '';
    if (!apiKey) {
      log('error', 'contact_not_configured');
      return send(res, 503, { error: 'not_configured' });
    }

    let result;
    try {
      result = await callBrevo({ fetchImpl, apiKey, value: checked.value });
    } catch (error) {
      log('error', 'brevo_unreachable', { reason: error?.name ?? 'unknown' });
      return send(res, 502, { error: 'upstream_error' });
    }

    if (result.outcome === 'sent') return send(res, 200, { ok: true });

    log('error', 'brevo_error', { brevoStatus: result.status, brevoCode: result.code, brevoMessage: result.message });
    return send(res, 502, { error: 'upstream_error' });
  };
}
