import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, createRateLimiter } from '../api/_lib/subscribe-core.js';

const API_KEY = 'xkeysib-test-secret-key';
const EMAIL = 'Jane.Doe@Example.com';
const FIXED_NOW = Date.UTC(2026, 9, 8, 14, 30);

const validBody = (overrides = {}) => ({
  email: EMAIL,
  source: 'waitlist-site',
  language: 'en',
  consent: true,
  website: '',
  ...overrides,
});

function brevoResponse(status, payload) {
  return new Response(payload === undefined ? null : JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function setup({ brevo = () => brevoResponse(201, {}), env = { BREVO_API_KEY: API_KEY }, rateLimiter } = {}) {
  const calls = [];
  const logs = [];
  const logger = {
    error: (line) => logs.push(line),
    warn: (line) => logs.push(line),
    log: (line) => logs.push(line),
  };
  const fetchImpl = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return brevo(url, init);
  };
  const handler = createHandler({
    fetchImpl,
    env,
    now: () => FIXED_NOW,
    rateLimiter: rateLimiter ?? createRateLimiter({ now: () => FIXED_NOW }),
    logger,
  });
  return { handler, calls, logs };
}

async function call(handler, options = {}) {
  const { method = 'POST', headers = {} } = options;
  const body = 'body' in options ? options.body : validBody();
  const req = { method, body, headers: { 'x-real-ip': '203.0.113.7', ...headers } };
  const res = {
    statusCode: undefined,
    headers: {},
    payload: undefined,
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
    end() {
      return this;
    },
  };
  await handler(req, res);
  return res;
}

test('valid subscription calls Brevo double opt-in with the expected request', async () => {
  const { handler, calls } = setup();
  const res = await call(handler);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { ok: true, status: 'pending_confirmation' });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
  assert.equal(calls[0].init.method, 'POST');
  assert.equal(calls[0].init.headers['api-key'], API_KEY);
  assert.deepEqual(calls[0].body, {
    email: 'jane.doe@example.com',
    includeListIds: [2],
    templateId: 1,
    redirectionUrl: 'https://www.agentivity.io/thank-you',
    attributes: { SOURCE: 'waitlist-site', LANGUAGE: 'en', CONSENT_DATE: '2026-10-08' },
  });
});

test('French subscription redirects to /fr/merci', async () => {
  const { handler, calls } = setup();
  const res = await call(handler, { body: validBody({ language: 'fr' }) });

  assert.equal(res.statusCode, 200);
  assert.equal(calls[0].body.redirectionUrl, 'https://www.agentivity.io/fr/merci');
  assert.equal(calls[0].body.attributes.LANGUAGE, 'fr');
});

test('language defaults to en and the other sources are accepted', async () => {
  const { handler, calls } = setup();
  const { language, ...withoutLanguage } = validBody({ source: 'community-install' });
  const res = await call(handler, { body: withoutLanguage });

  assert.equal(res.statusCode, 200);
  assert.equal(calls[0].body.attributes.LANGUAGE, 'en');
  assert.equal(calls[0].body.attributes.SOURCE, 'community-install');

  const newsletter = await call(handler, { body: validBody({ source: 'newsletter' }), headers: { 'x-real-ip': '198.51.100.1' } });
  assert.equal(newsletter.statusCode, 200);
});

test('invalid emails are rejected with 400 and never reach Brevo', async () => {
  const tooLong = `${'a'.repeat(250)}@example.com`;
  const invalid = ['', 'not-an-email', 'a@b', '@example.com', 'a b@example.com', 'a..b@example.com', '.a@example.com', tooLong, 42, null, undefined];

  for (const [index, email] of invalid.entries()) {
    const { handler, calls } = setup();
    const res = await call(handler, { body: validBody({ email }), headers: { 'x-real-ip': `192.0.2.${index}` } });
    assert.equal(res.statusCode, 400, `email ${JSON.stringify(email)?.slice(0, 30)}`);
    assert.deepEqual(res.payload, { error: 'invalid_email' });
    assert.equal(calls.length, 0);
  }
});

test('an email of exactly 254 characters is accepted, 255 is not', async () => {
  const local = 'a'.repeat(64);
  const domain = (lastLabelLength) => `${'x'.repeat(63)}.${'y'.repeat(63)}.${'z'.repeat(lastLabelLength)}.com`;
  const atLimit = `${local}@${domain(57)}`;
  const overLimit = `${local}@${domain(58)}`;
  assert.equal(atLimit.length, 254);
  assert.equal(overLimit.length, 255);

  const accepted = await call(setup().handler, { body: validBody({ email: atLimit }) });
  assert.equal(accepted.statusCode, 200);

  const rejected = await call(setup().handler, { body: validBody({ email: overLimit }) });
  assert.equal(rejected.statusCode, 400);
  assert.deepEqual(rejected.payload, { error: 'invalid_email' });
});

test('consent must be the boolean true', async () => {
  for (const consent of [undefined, false, 'true', 1, 'on', null]) {
    const { handler, calls } = setup();
    const body = validBody({ consent });
    if (consent === undefined) delete body.consent;
    const res = await call(handler, { body });

    assert.equal(res.statusCode, 400, `consent ${String(consent)}`);
    assert.deepEqual(res.payload, { error: 'consent_required' });
    assert.equal(calls.length, 0);
  }
});

test('unknown source, language and extra fields are rejected', async () => {
  const cases = [
    [{ source: 'services-enquiry' }, 'invalid_source'],
    [{ source: undefined }, 'invalid_source'],
    [{ source: ['waitlist-site'] }, 'invalid_source'],
    [{ language: 'de' }, 'invalid_language'],
    [{ language: null }, 'invalid_language'],
    [{ name: 'Jane' }, 'unknown_field'],
  ];

  for (const [overrides, expected] of cases) {
    const { handler, calls } = setup();
    const res = await call(handler, { body: validBody(overrides) });
    assert.equal(res.statusCode, 400, expected);
    assert.deepEqual(res.payload, { error: expected });
    assert.equal(calls.length, 0);
  }
});

test('malformed bodies are rejected with 400', async () => {
  const { handler, calls } = setup();

  const badJson = await call(handler, { body: '{not json', headers: { 'x-real-ip': '192.0.2.1' } });
  assert.deepEqual([badJson.statusCode, badJson.payload], [400, { error: 'invalid_json' }]);

  const array = await call(handler, { body: [], headers: { 'x-real-ip': '192.0.2.2' } });
  assert.deepEqual([array.statusCode, array.payload], [400, { error: 'invalid_body' }]);

  const missing = await call(handler, { body: undefined, headers: { 'x-real-ip': '192.0.2.3' } });
  assert.deepEqual([missing.statusCode, missing.payload], [400, { error: 'invalid_body' }]);

  const asString = await call(handler, { body: JSON.stringify(validBody()), headers: { 'x-real-ip': '192.0.2.4' } });
  assert.equal(asString.statusCode, 200);
  assert.equal(calls.length, 1);
});

test('a filled honeypot answers 200 like a success but does nothing', async () => {
  const { handler, calls } = setup();
  const res = await call(handler, { body: validBody({ website: 'http://spam.example' }) });

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { ok: true, status: 'pending_confirmation' });
  assert.equal(calls.length, 0);
});

test('a missing API key answers 503 not_configured without crashing', async () => {
  for (const env of [{}, { BREVO_API_KEY: '' }, { BREVO_API_KEY: '   ' }]) {
    const { handler, calls } = setup({ env });
    const res = await call(handler);

    assert.equal(res.statusCode, 503);
    assert.deepEqual(res.payload, { error: 'not_configured' });
    assert.equal(calls.length, 0);
  }
});

test('an existing contact is reported as already subscribed', async () => {
  const variants = [
    { code: 'duplicate_parameter', message: 'Contact already exist' },
    { code: 'invalid_parameter', message: 'Contact already associated with a list' },
  ];

  for (const payload of variants) {
    const { handler } = setup({ brevo: () => brevoResponse(400, payload) });
    const res = await call(handler);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.payload, { ok: true, status: 'already_subscribed' });
  }
});

test('a repeated request means the confirmation email is already on its way', async () => {
  const { handler } = setup({ brevo: () => brevoResponse(400, { code: 'duplicate_request', message: 'x' }) });
  const res = await call(handler);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { ok: true, status: 'pending_confirmation' });
});

test('Brevo rejecting the email address is reported as invalid_email', async () => {
  const { handler } = setup({ brevo: () => brevoResponse(400, { code: 'invalid_parameter', message: 'Invalid email address' }) });
  const res = await call(handler);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.payload, { error: 'invalid_email' });
});

test('Brevo errors become a generic 502 and no detail reaches the client', async () => {
  const secretDetail = 'Attribute not found: SOURCE category value newsletter';
  const failures = [
    () => brevoResponse(400, { code: 'invalid_parameter', message: secretDetail }),
    () => brevoResponse(400, { code: 'Attribute not found', message: secretDetail }),
    () => brevoResponse(401, { code: 'unauthorized', message: secretDetail }),
    () => brevoResponse(500, { message: secretDetail }),
    () => new Response('<html>gateway</html>', { status: 502 }),
    () => {
      throw new TypeError('fetch failed');
    },
  ];

  for (const brevo of failures) {
    const { handler } = setup({ brevo });
    const res = await call(handler);

    assert.equal(res.statusCode, 502);
    assert.deepEqual(res.payload, { error: 'upstream_error' });
    assert.ok(!JSON.stringify(res.payload).includes('Attribute'));
  }
});

test('rate limiting: the 6th request in 10 minutes from one IP gets 429', async () => {
  let clock = FIXED_NOW;
  const rateLimiter = createRateLimiter({ now: () => clock });
  const { handler, calls } = setup({ rateLimiter });

  for (let i = 0; i < 5; i += 1) {
    assert.equal((await call(handler)).statusCode, 200);
  }

  const blocked = await call(handler);
  assert.equal(blocked.statusCode, 429);
  assert.deepEqual(blocked.payload, { error: 'rate_limited' });
  assert.equal(blocked.headers['retry-after'], '600');
  assert.equal(calls.length, 5);

  const otherIp = await call(handler, { headers: { 'x-real-ip': '198.51.100.9' } });
  assert.equal(otherIp.statusCode, 200);

  clock += 10 * 60 * 1000 + 1;
  assert.equal((await call(handler)).statusCode, 200);
});

test('rate limiting falls back to x-forwarded-for and its first address', async () => {
  const { handler } = setup();
  const headers = { 'x-real-ip': undefined, 'x-forwarded-for': '198.51.100.20, 10.0.0.1' };

  for (let i = 0; i < 5; i += 1) {
    assert.equal((await call(handler, { headers })).statusCode, 200);
  }
  assert.equal((await call(handler, { headers })).statusCode, 429);
  assert.equal((await call(handler, { headers: { 'x-forwarded-for': '198.51.100.21' } })).statusCode, 200);
});

test('the rate limiter forgets expired entries instead of growing forever', () => {
  let clock = 0;
  const check = createRateLimiter({ max: 1, windowMs: 1000, maxEntries: 3, now: () => clock });

  check('a');
  check('b');
  check('c');
  clock = 2000;
  assert.equal(check('d').allowed, true);
  assert.equal(check('a').allowed, true);
});

test('only POST is accepted; OPTIONS answers the CORS preflight', async () => {
  const { handler, calls } = setup();

  const get = await call(handler, { method: 'GET', body: undefined });
  assert.equal(get.statusCode, 405);
  assert.deepEqual(get.payload, { error: 'method_not_allowed' });
  assert.equal(get.headers.allow, 'POST, OPTIONS');

  const preflight = await call(handler, { method: 'OPTIONS', body: undefined });
  assert.equal(preflight.statusCode, 204);
  assert.equal(preflight.headers['access-control-allow-origin'], '*');
  assert.equal(preflight.headers['access-control-allow-methods'], 'POST, OPTIONS');
  assert.equal(preflight.headers['access-control-allow-headers'], 'Content-Type');
  assert.equal(calls.length, 0);
});

test('every response is open to all origins, uncached and cookie-free', async () => {
  const responses = [
    await call(setup().handler),
    await call(setup().handler, { body: validBody({ email: 'nope' }) }),
    await call(setup().handler, { method: 'PUT' }),
    await call(setup({ env: {} }).handler),
  ];

  for (const res of responses) {
    assert.equal(res.headers['access-control-allow-origin'], '*');
    assert.equal(res.headers['cache-control'], 'no-store');
    assert.equal(res.headers['set-cookie'], undefined);
  }
});

test('logs never contain the email address or the API key', async () => {
  const scenarios = [
    setup({ brevo: () => brevoResponse(400, { code: 'invalid_parameter', message: `Bad value for ${EMAIL}` }) }),
    setup({ brevo: () => { throw new TypeError(`fetch failed for ${EMAIL} with ${API_KEY}`); } }),
    setup({ env: {} }),
  ];

  for (const { handler, logs } of scenarios) {
    await call(handler);
    assert.ok(logs.length > 0, 'the failure should be logged');
    for (const line of logs) {
      assert.ok(!line.includes(API_KEY));
      assert.ok(!line.toLowerCase().includes('jane.doe'));
      assert.ok(!line.toLowerCase().includes('example.com'));
    }
  }
});
