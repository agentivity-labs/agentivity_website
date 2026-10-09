import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const DEFAULT_CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

/**
 * Starts a headless Chrome and returns a minimal DevTools-protocol client for its first page.
 * Uses the Chrome already installed and Node's built-in WebSocket: nothing to install.
 */
export async function launchChrome({ profileDir, width, height, scale = 2, port = 9333 }) {
  const chromePath = process.env.CHROME_PATH ?? DEFAULT_CHROME;
  const proc = spawn(
    chromePath,
    [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      '--headless=new',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      // The SDK labels its default buttons in the browser's language.
      '--lang=en-US',
      `--window-size=${width},${height}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  let target;
  for (let attempt = 0; attempt < 60 && !target; attempt += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find((t) => t.type === 'page');
    } catch {
      // Chrome is still starting.
    }
    if (!target) await sleep(250);
  }
  if (!target) {
    proc.kill();
    throw new Error(`Chrome did not start (${chromePath})`);
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.method) {
      listeners.get(message.method)?.(message.params);
      return;
    }
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      nextId += 1;
      pending.set(nextId, { resolve, reject });
      ws.send(JSON.stringify({ id: nextId, method, params }));
    });

  const on = (method, handler) => listeners.set(method, handler);

  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
    }
    return result.result.value;
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile: false });
  await send('Emulation.setLocaleOverride', { locale: 'en-US' });

  const click = async (x, y) => {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  };

  const type = async (text, delayMs = 18) => {
    for (const char of text) {
      await send('Input.insertText', { text: char });
      await sleep(delayMs);
    }
  };

  const close = async () => {
    try {
      ws.close();
    } catch {
      // Already closed.
    }
    proc.kill();
  };

  return { send, on, evaluate, click, type, close };
}

export { sleep };
