// Records a short clip of the Studio in the browser kept open by session.mjs.
//   node rec.mjs <name> '<json actions>'
// Actions: ["move",x,y,ms] ["click",x,y] ["type",text,msPerChar] ["wait",ms] ["drag",x1,y1,x2,y2,ms] ["key",key,code,vk]
// A drawn pointer follows the mouse, since a screen recording has no cursor of its own.
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
const PORT = 9360;
const [name, actionsJson, cropJson] = process.argv.slice(2);
const crop = cropJson ? JSON.parse(cropJson) : { w: 1418, h: 770 };

const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener('open', res, { once: true }); ws.addEventListener('error', rej, { once: true }); });
let id = 0; const pending = new Map(); const frames = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.method === 'Page.screencastFrame') {
    frames.push({ data: m.params.data, t: m.params.metadata.timestamp });
    send('Page.screencastFrameAck', { sessionId: m.params.sessionId }).catch(() => {});
    return;
  }
  const w = pending.get(m.id); if (!w) return; pending.delete(m.id);
  m.error ? w.reject(new Error(m.error.message)) : w.resolve(m.result);
});
function send(method, params = {}) { return new Promise((resolve, reject) => { id += 1; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); }); }
const evaluate = (expression) => send('Runtime.evaluate', { expression, awaitPromise: true });
const mouse = (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1, ...extra });

await evaluate(`(() => {
  if (document.getElementById('rec-pointer')) return;
  const p = document.createElement('div');
  p.id = 'rec-pointer';
  p.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;width:26px;height:26px;transform:translate(700px,420px);transition:transform 0s linear';
  p.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l15 9.500-6.300 1.400L16.500 20l-3 1.400-3.700-7.200L5 18.500z" fill="#101A2E" stroke="#fff" stroke-width="1.400" stroke-linejoin="round"/></svg><span style="position:absolute;left:-14px;top:-14px;width:34px;height:34px;border-radius:50%;background:rgba(255,200,61,.75);transform:scale(0);transition:transform .18s ease-out, opacity .3s ease-out;opacity:0"></span>';
  document.body.appendChild(p);
})()`);
let pos = { x: 700, y: 420 };
async function moveTo(x, y, ms = 550) {
  await evaluate(`(() => { const p = document.getElementById('rec-pointer'); p.style.transition = 'transform ${ms}ms cubic-bezier(.4,0,.2,1)'; p.style.transform = 'translate(${x}px,${y}px)'; })()`);
  const steps = Math.max(4, Math.round(ms / 40));
  for (let i = 1; i <= steps; i += 1) { await mouse('mouseMoved', pos.x + ((x - pos.x) * i) / steps, pos.y + ((y - pos.y) * i) / steps, { button: 'none' }); await sleep(ms / steps); }
  pos = { x, y };
}
const pulse = () => evaluate(`(() => { const s = document.querySelector('#rec-pointer span'); s.style.transition = 'none'; s.style.transform = 'scale(.3)'; s.style.opacity = '1'; requestAnimationFrame(() => { s.style.transition = 'transform .28s ease-out, opacity .45s ease-out'; s.style.transform = 'scale(1)'; s.style.opacity = '0'; }); })()`);

await send('Page.enable');
await send('Page.startScreencast', { format: 'jpeg', quality: 90, everyNthFrame: 1 });
await sleep(500);
for (const [kind, a, b, c, d, e] of JSON.parse(actionsJson)) {
  if (kind === 'move') await moveTo(a, b, c ?? 550);
  else if (kind === 'click') { await moveTo(a, b, c ?? 550); await sleep(120); await pulse(); await mouse('mousePressed', a, b); await sleep(60); await mouse('mouseReleased', a, b); await sleep(350); }
  else if (kind === 'type') { for (const ch of a) { await send('Input.insertText', { text: ch }); await sleep(b ?? 45); } }
  else if (kind === 'wait') await sleep(a);
  else if (kind === 'key') { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: a, code: b || a, windowsVirtualKeyCode: c || 0 }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: a, code: b || a, windowsVirtualKeyCode: c || 0 }); await sleep(200); }
  else if (kind === 'drag') {
    await moveTo(a, b, 500); await sleep(150); await pulse(); await mouse('mousePressed', a, b); await sleep(250);
    const ms = e ?? 900, steps = Math.round(ms / 30);
    await evaluate(`(() => { const p = document.getElementById('rec-pointer'); p.style.transition = 'transform ${ms}ms cubic-bezier(.4,0,.2,1)'; p.style.transform = 'translate(${c}px,${d}px)'; })()`);
    for (let i = 1; i <= steps; i += 1) { await mouse('mouseMoved', a + ((c - a) * i) / steps, b + ((d - b) * i) / steps); await sleep(ms / steps); }
    await sleep(200); await mouse('mouseReleased', c, d); pos = { x: c, y: d }; await sleep(400);
  }
}
await sleep(400);
await send('Page.stopScreencast');
await evaluate(`document.getElementById('rec-pointer')?.remove()`);
ws.close();

const dir = `${process.cwd()}/rec-${name}`;
rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
const lines = [];
frames.forEach((f, i) => {
  const file = `${dir}/${String(i).padStart(5, '0')}.jpg`;
  writeFileSync(file, Buffer.from(f.data, 'base64'));
  const next = frames[i + 1]?.t ?? f.t + 1.2;
  lines.push(`file '${file}'\nduration ${Math.max(0.016, next - f.t).toFixed(3)}`);
});
lines.push(`file '${dir}/${String(frames.length - 1).padStart(5, '0')}.jpg'`);
writeFileSync(`${dir}/concat.txt`, lines.join('\n') + '\n');
const out = `${process.cwd()}/${name}.mp4`;
const run = spawnSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${dir}/concat.txt`,
  '-vf', `scale=1418:802:flags=lanczos:in_range=full:out_range=tv,crop=${crop.w}:${crop.h}:0:0,format=yuv420p,fps=30`,
  '-c:v', 'libx264', '-color_range', 'tv', '-crf', '22', '-movflags', '+faststart', out], { stdio: 'ignore' });
const total = frames.length ? frames.at(-1).t - frames[0].t + 1.2 : 0;
console.log(name, frames.length, 'frames', total.toFixed(1) + 's', run.status === 0 ? 'mp4 ok' : 'ffmpeg failed');
