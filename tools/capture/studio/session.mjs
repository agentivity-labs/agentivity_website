// Keeps one headless Chrome open on the Studio between commands.
//   node session.mjs start [url]            launch Chrome and open the Studio
//   node session.mjs do '<json actions>'    e.g. [["click",120,300],["wait",800],["shot","home"]]
//   node session.mjs stop
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
const PORT = 9360, W = 1440, H = 900;
const [cmd, arg] = process.argv.slice(2);

async function connect() {
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target = list.find((t) => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.addEventListener('open', res, { once: true }); ws.addEventListener('error', rej, { once: true }); });
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); const w = pending.get(m.id); if (!w) return; pending.delete(m.id); m.error ? w.reject(new Error(m.error.message)) : w.resolve(m.result); });
  const send = (method, params = {}) => new Promise((resolve, reject) => { id += 1; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  return { send, close: () => ws.close() };
}

if (cmd === 'start') {
  const proc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [`--remote-debugging-port=${PORT}`, `--user-data-dir=${process.cwd()}/.profile`, '--headless=new', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--lang=en-US', '--force-device-scale-factor=2', `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore', detached: true });
  proc.unref();
  for (let i = 0; i < 60; i += 1) { try { await fetch(`http://127.0.0.1:${PORT}/json/list`); break; } catch { await sleep(250); } }
  const c = await connect();
  await c.send('Page.enable');
  await c.send('Page.navigate', { url: arg || 'http://localhost:5959/' });
  await sleep(9000);
  c.close();
  console.log('started');
} else if (cmd === 'stop') {
  const c = await connect(); await c.send('Browser.close').catch(() => {}); console.log('stopped');
} else if (cmd === 'do') {
  const c = await connect();
  const mouse = (type, x, y, extra = {}) => c.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1, ...extra });
  for (const [name, a, b, d, e] of JSON.parse(arg)) {
    if (name === 'click') { await mouse('mouseMoved', a, b, { button: 'none' }); await sleep(60); await mouse('mousePressed', a, b); await sleep(40); await mouse('mouseReleased', a, b); await sleep(350); }
    else if (name === 'dblclick') { await mouse('mouseMoved', a, b, { button: 'none' }); await mouse('mousePressed', a, b); await mouse('mouseReleased', a, b); await mouse('mousePressed', a, b, { clickCount: 2 }); await mouse('mouseReleased', a, b, { clickCount: 2 }); await sleep(350); }
    else if (name === 'move') { await mouse('mouseMoved', a, b, { button: 'none' }); await sleep(200); }
    else if (name === 'drag') { await mouse('mouseMoved', a, b, { button: 'none' }); await mouse('mousePressed', a, b); for (let i = 1; i <= 12; i += 1) { await mouse('mouseMoved', a + ((d - a) * i) / 12, b + ((e - b) * i) / 12); await sleep(25); } await mouse('mouseReleased', d, e); await sleep(300); }
    else if (name === 'wheel') { await c.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: a, y: b, deltaX: 0, deltaY: d }); await sleep(300); }
    else if (name === 'type') { for (const ch of a) { await c.send('Input.insertText', { text: ch }); await sleep(12); } }
    else if (name === 'key') { await c.send('Input.dispatchKeyEvent', { type: 'keyDown', key: a, code: b || a, windowsVirtualKeyCode: d || 0 }); await c.send('Input.dispatchKeyEvent', { type: 'keyUp', key: a, code: b || a, windowsVirtualKeyCode: d || 0 }); await sleep(200); }
    else if (name === 'wait') { await sleep(a); }
    else if (name === 'nav') { await c.send('Page.navigate', { url: a }); await sleep(b || 8000); }
    else if (name === 'shot') { const s = await c.send('Page.captureScreenshot', { format: 'jpeg', quality: a === 'hq' ? 92 : 70, ...(typeof b === 'object' ? { clip: { ...b, scale: 1 } } : {}) }); writeFileSync(`${typeof a === 'string' && a !== 'hq' ? a : d || 'shot'}.jpg`, Buffer.from(s.data, 'base64')); }
    else if (name === 'png') { const s = await c.send('Page.captureScreenshot', { format: 'png', ...(b ? { clip: { ...b, scale: 1 } } : {}) }); writeFileSync(`${a}.png`, Buffer.from(s.data, 'base64')); }
  }
  c.close();
}
