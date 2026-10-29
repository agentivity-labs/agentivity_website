import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../api/_lib/contact-core.js';
import { createRateLimiter } from '../api/_lib/subscribe-core.js';

const API_KEY = 'xkeysib-test-secret-key';
const FIXED_NOW = Date.UTC(2026, 9, 29, 17, 0);

const validBody = (overrides = {}) => ({
  name: 'Jane Doe',
  email: 'Jane.Doe@Example.com',
  service: 'strategy',
  message: 'We are 2,000 people.\nWe want a first team in finance.',
  language: 'en',
  website: '',
  ...overrides,
});

function brevoResponse(status, payload) {
  return new Response(payload === undefined ? null : JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function setup({ brevo = () => brevoResponse(201, { messageId: '<1@relay>' }), env = { BREVO_API_KEY: API_KEY }, rateLimiter } = {}) {
  const calls = [];
  const logs = [];
  const logger = { error: (line) => logs.push(line), warn: (line) => logs.push(line), log: (line) => logs.push(line) };
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
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
    end() { return this; },
  };
  await handler(req, res);
  return res;
}

test('a valid enquiry is sent to our inbox, the visitor as reply-to', async () => {
  const { handler, calls } = setup();
  const res = await call(handler);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.brevo.com/v3/smtp/email');
  assert.equal(calls[0].init.headers['api-key'], API_KEY);
  const sent = calls[0].body;
  assert.deepEqual(sent.sender, { name: 'Agentivity website', email: 'hello@agentivity.io' });
  assert.deepEqual(sent.to, [{ email: 'hello@agentivity.io', name: 'Agentivity' }]);
  assert.deepEqual(sent.replyTo, { email: 'jane.doe@example.com', name: 'Jane Doe' });
  assert.equal(sent.subject, 'Services enquiry: Strategy (Jane Doe)');
  assert.match(sent.textContent, /Name: Jane Doe\nE-mail: jane\.doe@example\.com\nAbout: Strategy\nPage: \/services/);
  assert.match(sent.textContent, /We want a first team in finance\./);
});

test('the message is escaped in the HTML part', async () => {
  const { handler, calls } = setup();
  await call(handler, { body: validBody({ name: 'Jane <b>', message: '<script>alert(1)</script> & co' }) });
  const html = calls[0].body.htmlContent;
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt; &amp; co'));
  assert.ok(html.includes('Jane &lt;b&gt;'));
});

test('line breaks in the name never reach the subject', async () => {
  const { handler, calls } = setup();
  await call(handler, { body: validBody({ name: 'Jane\r\nBcc: x@example.com' }) });
  assert.equal(calls[0].body.subject, 'Services enquiry: Strategy (Jane Bcc: x@example.com)');
});

test('the subject and the page follow the language and an empty topic', async () => {
  const { handler, calls } = setup();
  await call(handler, { body: validBody({ service: '', language: 'fr', message: '' }) });
  assert.equal(calls[0].body.subject, 'Services enquiry: Not given (Jane Doe)');
  assert.match(calls[0].body.textContent, /Page: \/fr\/services/);
  assert.match(calls[0].body.textContent, /\(no message\)/);
});

test('a filled honeypot answers success and sends nothing', async () => {
  const { handler, calls } = setup();
  const res = await call(handler, { body: validBody({ website: 'http://spam.example' }) });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { ok: true });
  assert.equal(calls.length, 0);
});

test('invalid input is refused before Brevo is called', async () => {
  const { handler, calls } = setup({ rateLimiter: createRateLimiter({ max: 100, now: () => FIXED_NOW }) });
  const cases = [
    [validBody({ name: '' }), 'invalid_name'],
    [validBody({ name: 'x'.repeat(101) }), 'invalid_name'],
    [validBody({ email: 'not-an-email' }), 'invalid_email'],
    [validBody({ service: 'pricing' }), 'invalid_service'],
    [validBody({ message: 42 }), 'invalid_message'],
    [validBody({ message: 'x'.repeat(5001) }), 'message_too_long'],
    [validBody({ language: 'de' }), 'invalid_language'],
    [{ ...validBody(), extra: 1 }, 'unknown_field'],
  ];
  for (const [body, error] of cases) {
    const res = await call(handler, { body });
    assert.equal(res.statusCode, 400, error);
    assert.deepEqual(res.payload, { error });
  }
  assert.equal(calls.length, 0);
});

test('a JSON body sent as text is read, a broken one is refused', async () => {
  const { handler } = setup();
  assert.equal((await call(handler, { body: JSON.stringify(validBody()) })).statusCode, 200);
  const broken = await call(handler, { body: '{' });
  assert.equal(broken.statusCode, 400);
  assert.deepEqual(broken.payload, { error: 'invalid_json' });
});

test('only POST and OPTIONS are accepted', async () => {
  const { handler } = setup();
  const get = await call(handler, { method: 'GET' });
  assert.equal(get.statusCode, 405);
  assert.equal(get.headers.allow, 'POST, OPTIONS');
  const options = await call(handler, { method: 'OPTIONS' });
  assert.equal(options.statusCode, 204);
});

test('too many enquiries from one address are refused', async () => {
  const { handler } = setup({ rateLimiter: createRateLimiter({ max: 2, now: () => FIXED_NOW }) });
  assert.equal((await call(handler)).statusCode, 200);
  assert.equal((await call(handler)).statusCode, 200);
  const third = await call(handler);
  assert.equal(third.statusCode, 429);
  assert.ok(Number(third.headers['retry-after']) > 0);
});

test('without the Brevo key the relay answers not configured', async () => {
  const { handler, calls, logs } = setup({ env: {} });
  const res = await call(handler);
  assert.equal(res.statusCode, 503);
  assert.deepEqual(res.payload, { error: 'not_configured' });
  assert.equal(calls.length, 0);
  assert.match(logs[0], /contact_not_configured/);
});

test('a Brevo refusal answers upstream_error and logs no address or key', async () => {
  const { handler, logs } = setup({
    brevo: () => brevoResponse(400, { code: 'invalid_parameter', message: `sender jane.doe@example.com not valid for ${API_KEY}` }),
  });
  const res = await call(handler);
  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.payload, { error: 'upstream_error' });
  assert.ok(!logs.join('').includes('jane.doe@example.com'));
  assert.ok(!logs.join('').includes(API_KEY));
});

test('an unreachable Brevo answers upstream_error', async () => {
  const { handler } = setup({ brevo: () => { throw new DOMException('timed out', 'TimeoutError'); } });
  const res = await call(handler);
  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.payload, { error: 'upstream_error' });
});
