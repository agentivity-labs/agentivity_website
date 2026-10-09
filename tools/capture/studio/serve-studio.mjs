// Serves the compiled Studio (release build, no debug banner) and forwards API calls to the local API. For captures only.
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
const ROOT = 'C:/Dev/agentivity/agentivity_studio/build/web';
const API = { host: '127.0.0.1', port: 5005 };
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.wasm': 'application/wasm', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.otf': 'font/otf', '.bin': 'application/octet-stream', '.frag': 'text/plain' };
http.createServer((req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]);
  if (path.startsWith('/api/') || path.startsWith('/hubs') || path.startsWith('/ag-ui') || path.startsWith('/health')) {
    const proxy = http.request({ ...API, path: req.url, method: req.method, headers: { ...req.headers, host: `${API.host}:${API.port}` } }, (up) => { res.writeHead(up.statusCode, up.headers); up.pipe(res); });
    proxy.on('error', () => { res.writeHead(502); res.end(); });
    req.pipe(proxy);
    return;
  }
  let file = normalize(join(ROOT, path));
  if (!file.startsWith(normalize(ROOT)) || !existsSync(file) || statSync(file).isDirectory()) file = join(ROOT, 'index.html');
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(file).pipe(res);
}).listen(5960, '127.0.0.1', () => console.log('studio build on http://127.0.0.1:5960'));
