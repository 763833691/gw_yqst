import { writeFile } from 'node:fs/promises';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const tabs = await fetch('http://127.0.0.1:9223/json/list').then((response) => response.json());
const page = tabs.find((item) => item.type === 'page');

if (!page) throw new Error('No Chrome page target found');

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 0;

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 1200,
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.navigate', { url: 'http://127.0.0.1:5174/' });
await sleep(2400);
await send('Runtime.evaluate', {
  expression: "document.querySelector('.logic-system')?.scrollIntoView({block:'start'}); window.scrollBy(0, -70);",
});
await sleep(1400);
const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await writeFile('/private/tmp/ignis-logic-check.png', Buffer.from(capture.data, 'base64'));
socket.close();
