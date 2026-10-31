// Records the page of the Studio session (session.mjs) continuously, while the session is driven step by step by other
// commands: a conversation with a team cannot be scripted ahead, so the frames are taken on their own, every 100 ms.
//   node live.mjs <name>      runs until the file <name>/STOP exists; frames in <name>/frames, timings in <name>/frames.json
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 9360;
const name = process.argv[2];
if (!name) { console.error('Usage: node live.mjs <name>'); process.exit(1); }
const DIR = join(process.cwd(), name);
const FRAMES = join(DIR, 'frames');
rmSync(DIR, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener('open', res, { once: true }); ws.addEventListener('error', rej, { once: true }); });
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); const w = pending.get(m.id); if (!w) return; pending.delete(m.id); m.error ? w.reject(new Error(m.error.message)) : w.resolve(m.result); });
const send = (method, params = {}) => new Promise((resolve, reject) => { id += 1; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });

const frames = [];
const started = Date.now();
while (!existsSync(join(DIR, 'STOP'))) {
  const t = Date.now() - started;
  const shot = await Promise.race([send('Page.captureScreenshot', { format: 'jpeg', quality: 88 }), sleep(3000).then(() => null)]);
  if (shot) {
    const file = `${String(frames.length).padStart(5, '0')}.jpg`;
    frames.push({ t, file });
    await writeFile(join(FRAMES, file), Buffer.from(shot.data, 'base64'));
  }
  await sleep(60);
}
writeFileSync(join(DIR, 'frames.json'), JSON.stringify({ frames }, null, 1));
ws.close();
console.log(`${frames.length} frames over ${((frames.at(-1)?.t ?? 0) / 1000).toFixed(1)}s → ${DIR}`);
