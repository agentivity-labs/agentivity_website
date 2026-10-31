// Films the graph of a team or a workflow with the <agentivity-graph> web component, the one the Synergi pages use: the same
// drawing as the product, at twice the resolution, the members lighting up one after the other (the component's own playback,
// not an execution).
//   node graph-clips.mjs <name> <source.json> [--width 760] [--step-ms 900] [--ms 12000] [--still [--at 5000]]
// --ms is one turn of the playback, (members + 2) x step: the clip then loops without a jump. --at takes the still that long
// into the playback, the steps lit; without it the graph is at rest.
// Output in out/graph-clips: <name>.mp4 and <name>.jpg, or <name>.png with --still. Needs ffmpeg.
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launchChrome, sleep } from './cdp.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'out', 'graph-clips');
const GRAPH = join(HERE, '..', '..', '..', 'agentivity_synergi', 'public', 'vendor', 'agentivity-graph', 'agentivity-graph.js');
const PORT = 9391;
const args = process.argv.slice(2);
const [name, sourceFile] = args;
const value = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const still = args.includes('--still'), at = Number(value('at', '0'));
// A screencast comes at the size of the page, whatever the device scale: for a clip, the page itself is twice as large.
const width = Number(value('width', '760')) * (still ? 1 : 2), stepMs = value('step-ms', '900'), ms = Number(value('ms', '12000'));
if (!name || !sourceFile) { console.error('Usage: node graph-clips.mjs <name> <source.json> [--width 760] [--step-ms 900] [--ms 12000] [--still [--at 5000]]'); process.exit(1); }

mkdirSync(OUT, { recursive: true });
const page = join(OUT, 'page.html');
// The workflow graph names its icons with Google's code points while its font is Flutter's, where they are other icons (a bed, a
// snowflake): the right ones are set in a copy, until the SDK has them.
const graph = join(OUT, 'agentivity-graph.js');
writeFileSync(graph, readFileSync(GRAPH, 'utf8').replace('start:"E037",decision:"E254",human:"E0B7",ai:"E322",end:"E5CA",action:"E8B8"', 'start:"E4CB",decision:"E12D",human:"E153",ai:"E3DB",end:"E156",action:"E57F"'));
copyFileSync(join(dirname(GRAPH), 'material-icons.woff2'), join(OUT, 'material-icons.woff2'));
// The colors and the font are those of the Synergi pages.
writeFileSync(page, `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
html,body{margin:0;background:#fff;font-family:'Hanken Grotesk',sans-serif}
:root{--ag-surface:#fff;--ag-surface-container-low:#F1F3F8;--ag-surface-container-highest:#DDE1EA;--ag-on-surface:#101A2E;--ag-outline:#5B6B85;--ag-outline-variant:#C9D0DD;--ag-primary:#152844;--ag-on-primary:#fff;--ag-tertiary:#B7791F}
#g{display:block;width:${width}px;margin:0 auto}
</style><agentivity-graph id="g" theme="light" ${still && !at ? '' : `autoplay step-ms="${stepMs}"`}></agentivity-graph>
<script src="${pathToFileURL(graph).href}"></script>`);

const chrome = await launchChrome({ profileDir: join(OUT, '.profile'), width: width + 20, height: still ? 1000 : 2000, scale: still ? 2 : 1, port: PORT });
try {
  await chrome.send('Page.navigate', { url: pathToFileURL(page).href });
  await sleep(1200);
  await chrome.evaluate(`document.fonts.load("600 20px 'Hanken Grotesk'")`);
  await chrome.evaluate(`new Promise((done) => { const g = document.getElementById('g'); customElements.whenDefined('agentivity-graph').then(() => { g.source = ${JSON.stringify(JSON.parse(readFileSync(sourceFile, 'utf8')))}; setTimeout(done, 700); }); })`);
  const box = await chrome.evaluate(`(() => { const r = document.getElementById('g').getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; })()`);
  console.log(name, Math.round(box.width), 'x', Math.round(box.height));
  if (still) {
    if (at) await sleep(at);
    const shot = await chrome.send('Page.captureScreenshot', { format: 'png', clip: { ...box, scale: 2 } });
    writeFileSync(join(OUT, name + '.png'), Buffer.from(shot.data, 'base64'));
  } else {
    // A screencast of the page: far more frames than one screenshot after another at this resolution.
    const dir = join(OUT, name);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
    let id = 0;
    const send = (method, params = {}) => { id += 1; ws.send(JSON.stringify({ id, method, params })); };
    const frames = [];
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.method !== 'Page.screencastFrame') return;
      frames.push({ data: m.params.data, t: m.params.metadata.timestamp });
      send('Page.screencastFrameAck', { sessionId: m.params.sessionId });
    });
    send('Page.enable');
    send('Page.startScreencast', { format: 'jpeg', quality: 92, everyNthFrame: 1 });
    await sleep(ms);
    send('Page.stopScreencast');
    await sleep(200);
    ws.close();
    const lines = [];
    frames.forEach((f, i) => {
      const file = join(dir, String(i).padStart(5, '0') + '.jpg').replaceAll('\\', '/');
      writeFileSync(file, Buffer.from(f.data, 'base64'));
      lines.push(`file '${file}'`, `duration ${Math.max(0.016, (frames[i + 1]?.t ?? f.t + 0.1) - f.t).toFixed(3)}`);
    });
    writeFileSync(join(dir, 'concat.txt'), lines.join('\n') + '\n');
    const crop = `crop=${Math.round(box.width)}:${Math.round(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`;
    const run = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(dir, 'concat.txt'), '-vf', `${crop},scale=1000:-2:flags=lanczos,fps=30,format=yuv420p`, '-t', String(ms / 1000), '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-movflags', '+faststart', '-an', join(OUT, name + '.mp4')], { encoding: 'utf8' });
    if (run.status !== 0) throw new Error(run.stderr);
    console.log(frames.length, 'frames →', join(OUT, name + '.mp4'));
  }
} finally {
  await chrome.close();
}
