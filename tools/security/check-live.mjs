// Checks the site in production from the outside: addresses, security headers, files that must stay private, the two forms,
// the certificate. Run by the monthly security audit, or by hand: node tools/security/check-live.mjs. Exits 1 when a check fails.
import { connect } from 'node:tls';

const SITE = 'https://www.agentivity.io';
const HEADERS = {
  'content-security-policy': /frame-ancestors 'none'/,
  'x-content-type-options': /^nosniff$/,
  'x-frame-options': /^DENY$/,
  'referrer-policy': /^strict-origin-when-cross-origin$/,
  'permissions-policy': /camera=\(\)/,
  'strict-transport-security': /max-age=\d{8,}/,
};
const PRIVATE_PATHS = ['/.env', '/.git/config', '/package.json', '/api/_lib/subscribe-core.js', '/tests/subscribe.test.js', '/.vercel/project.json'];
const MIN_DAYS = { certificate: 14, securityTxt: 30 };

const failures = [];
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` (${detail})` : ''}`);
  if (!ok) failures.push(name);
};
const days = (date) => Math.floor((new Date(date) - Date.now()) / 86_400_000);
const request = (url, init = {}) => fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15_000), ...init });

for (const from of ['http://www.agentivity.io/', 'https://agentivity.io/']) {
  const response = await request(from);
  check(`${from} goes to ${SITE}/`, response.status === 308 && response.headers.get('location') === `${SITE}/`, String(response.status));
}

const home = await request(`${SITE}/`);
check('home page answers', home.status === 200, String(home.status));
for (const [name, rule] of Object.entries(HEADERS)) {
  check(`header ${name}`, rule.test(home.headers.get(name) ?? ''));
}

for (const path of PRIVATE_PATHS) {
  const response = await request(SITE + path);
  check(`${path} is not served`, response.status === 404, String(response.status));
}

const securityTxt = await request(`${SITE}/.well-known/security.txt`);
const expires = (await securityTxt.text()).match(/^Expires: (.+)$/m)?.[1];
check('security.txt is valid', securityTxt.status === 200 && expires && days(expires) > MIN_DAYS.securityTxt, expires ? `${days(expires)} days left` : `${securityTxt.status}`);

check('subscribe refuses GET', (await request(`${SITE}/api/subscribe`)).status === 405);
const contact = await request(`${SITE}/api/contact`, { method: 'OPTIONS', headers: { Origin: 'https://example.com' } });
check('contact answers no other origin', !contact.headers.has('access-control-allow-origin'));

const certificate = await new Promise((resolve, reject) => {
  const socket = connect({ host: 'www.agentivity.io', port: 443, servername: 'www.agentivity.io' }, () => {
    resolve(socket.getPeerCertificate());
    socket.end();
  });
  socket.on('error', reject);
});
check('certificate is far from expiring', days(certificate.valid_to) > MIN_DAYS.certificate, `${days(certificate.valid_to)} days left`);

console.log(failures.length ? `\n${failures.length} check(s) failed` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
