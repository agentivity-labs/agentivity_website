// Draws the share images (Open Graph, 1200x630) of the product pages, in English and French, from their own titles and a
// real Studio screen. Each page then points at /og/<slug>-<lang>.png.
//   node tools/og-images.mjs            draws every image into site/public/og/
//   node tools/og-images.mjs teams      draws one page only
// Needs Google Chrome; the fonts come from Google Fonts, so the machine needs the internet.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const site = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const pub = join(site, 'public');
const i18n = { en: JSON.parse(readFileSync(join(site, 'src/i18n/en.json'), 'utf8')), fr: JSON.parse(readFileSync(join(site, 'src/i18n/fr.json'), 'utf8')) };

// slug: the page address; text: where its hero is in the translation files; shot: the Studio screen shown on the right, from
// site/public, or from tools/og-sources when the site has no picture that fits (a frame of a video, for example).
const PAGES = [
  { slug: 'teams', text: (t) => ({ label: t.teams_page.hero.crumb + ' · ' + t.teams_page.hero.name, ...t.teams_page.hero }), shot: '../../tools/og-sources/teams.jpg' },
  { slug: 'agents', text: (t) => product(t, 'agents'), shot: 'media/product/agent-with-knowledge-base.jpg' },
  { slug: 'workflows', text: (t) => product(t, 'workflows'), shot: 'media/studio-workflow-approval.webp' },
  { slug: 'prompt-studio', text: (t) => product(t, 'prompt_studio'), shot: 'media/product/prompt-studio-screen.jpg' },
  { slug: 'knowledge-and-data', text: (t) => product(t, 'knowledge'), shot: 'media/product/kb-search-dialog.jpg' },
  { slug: 'vibeapps', text: (t) => product(t, 'vibeapps'), shot: 'media/trip-planner.jpg' },
  { slug: 'assistant', text: (t) => ({ label: t.assistant_page.hero.eyebrow, ...t.assistant_page.hero }), shot: 'media/assistant-create.jpg' },
  { slug: 'how-it-works', text: (t) => ({ label: t.how_page.hero.eyebrow, ...t.how_page.hero }), shot: 'media/assistant-change.jpg' },
];
function product(t, key) {
  const hero = t.product_pages[key].hero;
  return { label: t.product_pages.crumb + ' · ' + hero.name, h1: hero.h1, h1_accent: hero.h1_accent };
}
// The fixed line of the brand, at the bottom of every image.
const TAGLINE = { en: 'AI teams for your business, no code', fr: "Des équipes d'IA pour votre entreprise, sans code" };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = (lang, page) => {
  const t = page.text(i18n[lang]);
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600;700&family=Instrument+Serif:ital@0;1&display=swap">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #152844; font-family: 'Hanken Grotesk', sans-serif; color: #fff; position: relative; }
  .glow { position: absolute; inset: 0; background: radial-gradient(700px 420px at 92% 18%, rgba(255,200,61,.16), transparent 60%), radial-gradient(600px 400px at 0% 100%, rgba(58,80,120,.55), transparent 70%); }
  .copy { position: absolute; left: 64px; top: 56px; width: 560px; height: 518px; display: flex; flex-direction: column; }
  .logo { height: 34px; width: auto; align-self: flex-start; }
  .label { margin-top: 64px; font-size: 19px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #FFC83D; }
  h1 { margin-top: 18px; font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 68px; line-height: 1; letter-spacing: -.01em; text-wrap: balance; }
  h1 em { text-wrap: balance; }
  h1 em { display: block; font-style: italic; color: #FFC83D; }
  .tag { margin-top: auto; font-size: 20px; font-weight: 600; color: #C9D2E6; }
  .site { margin-top: 6px; font-size: 16px; font-weight: 700; letter-spacing: .12em; color: #8FA0C2; }
  .shot { position: absolute; left: 660px; top: 92px; width: 640px; border-radius: 18px; overflow: hidden; background: #fff; border: 6px solid #fff; box-shadow: 0 40px 70px -30px rgba(0,0,0,.65); }
  .shot img { display: block; width: 100%; height: 446px; object-fit: cover; object-position: left top; }
</style></head><body>
  <div class="glow"></div>
  <div class="copy">
    <img class="logo" src="${pathToFileURL(join(pub, 'agentivity-wordmark-white.svg'))}">
    <p class="label">${esc(t.label)}</p>
    <h1>${esc(t.h1)} <em>${esc(t.h1_accent)}</em></h1>
    <p class="tag">${esc(TAGLINE[lang])}</p>
    <p class="site">AGENTIVITY.IO</p>
  </div>
  <div class="shot"><img src="${pathToFileURL(join(pub, page.shot))}"></div>
</body></html>`;
};

const only = process.argv[2];
const pages = PAGES.filter((p) => !only || p.slug === only);
if (!pages.length) { console.error(`No page "${only}". Pages: ${PAGES.map((p) => p.slug).join(', ')}`); process.exit(1); }

const PORT = 9367;
const work = mkdtempSync(join(tmpdir(), 'og-'));
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [`--remote-debugging-port=${PORT}`, `--user-data-dir=${join(work, 'profile')}`, '--headless=new', '--hide-scrollbars', '--no-first-run', '--allow-file-access-from-files', '--window-size=1200,630', 'about:blank'], { stdio: 'ignore' });
let list; for (let i = 0; i < 80; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (list.find((x) => x.type === 'page')) break; } catch {} await sleep(250); }
const ws = new WebSocket(list.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); const p = pending.get(m.id); if (p) { pending.delete(m.id); p(m.result); } });
const send = (method, params = {}) => new Promise((r) => { id++; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });

mkdirSync(join(pub, 'og'), { recursive: true });
try {
  for (const page of pages) {
    for (const lang of ['en', 'fr']) {
      const file = join(work, `${page.slug}-${lang}.html`);
      writeFileSync(file, html(lang, page));
      await send('Page.navigate', { url: pathToFileURL(file).href });
      await sleep(400);
      await send('Runtime.evaluate', { expression: 'Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())])', awaitPromise: true });
      // A long title gets a smaller size, so that it keeps to three lines at most.
      await send('Runtime.evaluate', { expression: `(() => { const h = document.querySelector('h1'); let size = 68; while (h.offsetHeight > 3.05 * size && size > 44) { size -= 2; h.style.fontSize = size + 'px'; } })()` });
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const out = join(pub, 'og', `${page.slug}-${lang}.png`);
      writeFileSync(out, Buffer.from(shot.data, 'base64'));
      console.log('site/public/og/' + `${page.slug}-${lang}.png`);
    }
  }
} finally {
  ws.close(); chrome.kill();
  await sleep(500);
  rmSync(work, { recursive: true, force: true });
}
