// Edits the Studio recording of the Trip Manager Team (live.mjs trip-live) into a short clip: the camera moves over the
// real screen between three framings (the whole team and the chat; the team close up when a member starts; the chat when
// the traveller chooses), the waits are played faster, and the moves are eased.
//   node montage-trip.mjs [--still <seconds>]     → trip-live/studio-trip.mp4 (or one still)
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const sharp = (await import(pathToFileURL(join(HERE, '../../../site/node_modules/sharp/lib/index.js')).href)).default;
const SRC = join(HERE, 'trip-live');
const { frames } = JSON.parse(readFileSync(join(SRC, 'frames.json'), 'utf8'));
const OUT_W = 1920, OUT_H = 1080, FPS = 30, MOVE = 0.8;
const SRC_W = 2836, SRC_H = 1604;

// Framings, in pixels of the recording (2836 x 1604, twice the CSS size of the Studio).
const VIEW = {
  wide: { x: 180, y: 70, w: 2656, h: 1494 },   // the team and the chat, with the sequence below
  team: { x: 250, y: 400, w: 1180, h: 664 },   // the manager and the booking and money specialists, close up
  chat: { x: 600, y: 96, w: 2236, h: 1258 },   // the chat, with the booking specialists beside it
  docs: { x: 1485, y: 470, w: 1351, h: 760 },   // the last question of the chat, close up (the recap above it stays out)
};

// The story: [from, to] in seconds of the recording, the speed (1.5 at most: faster reads badly), the framing.
// The waits between two moments (the team thinking) are cut, with a short cross-fade under the camera move.
const SHOTS = [
  [4, 9, 1.4, 'chat'],     // the traveller types the trip
  [31, 35, 1.5, 'team'],   // the manager hands the flights to the flight specialist
  [42, 51, 1.5, 'chat'],   // its proposal, accepted
  [80, 84, 1.5, 'team'],   // the hotel specialist starts
  [182, 192, 1.5, 'chat'], // three hotels, the first one chosen
  [198, 204, 1.5, 'team'], // the transfers specialist starts
  [240, 250, 1.5, 'chat'], // a private car, chosen
  [280, 285, 1.5, 'team'], // the restaurant specialist starts
  [320, 330, 1.5, 'chat'], // a tavern, chosen
  [359, 371, 1.5, 'docs'], // travel documents, confirmed
  [384, 388, 1.5, 'team'], // the payment agent starts
  [424, 431, 1.5, 'chat'], // the payment, authorised
  [446, 451, 1.5, 'team'], // the reservation agent books everything
  [468, 478, 1.3, 'chat'], // the bookings and their codes
];
const FADE = 0.3; // seconds of cross-fade at a cut

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const mix = (a, b, k) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, w: a.w + (b.w - a.w) * k, h: a.h + (b.h - a.h) * k });

// The output timeline: for each output frame, the time in the recording and the framing.
const timeline = [];
let prev = VIEW[SHOTS[0][3]];
for (const [from, to, speed, view] of SHOTS) {
  const target = VIEW[view];
  const start = prev;
  const n = Math.round(((to - from) / speed) * FPS);
  const cutFrom = timeline.length ? timeline.at(-1) : null;
  for (let i = 0; i < n; i += 1) {
    const t = from + (i / FPS) * speed;
    const k = start === target ? 1 : ease(Math.min(1, i / FPS / MOVE));
    const rect = mix(start, target, k);
    // At a cut, the frame before it fades out over the first frames, framed like the new one.
    const fade = cutFrom && i < FADE * FPS ? { t: cutFrom.t, a: 1 - i / (FADE * FPS) } : null;
    timeline.push({ t, rect, fade });
  }
  prev = target;
}

const nearest = (t) => {
  let lo = 0, hi = frames.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (frames[mid].t / 1000 < t) lo = mid + 1; else hi = mid; }
  return frames[lo].file;
};

async function render(item, file) {
  if (item.fade) {
    const [a, b] = await Promise.all([crop(item.fade.t, item.rect), crop(item.t, item.rect)]);
    const out = Buffer.alloc(b.length);
    for (let i = 0; i < b.length; i += 1) out[i] = Math.round(a[i] * item.fade.a + b[i] * (1 - item.fade.a));
    await sharp(out, { raw: { width: OUT_W, height: OUT_H, channels: 3 } }).jpeg({ quality: 92 }).toFile(file);
    return;
  }
  await sharp(await crop(item.t, item.rect), { raw: { width: OUT_W, height: OUT_H, channels: 3 } }).jpeg({ quality: 92 }).toFile(file);
}

function crop(t, r) {
  return sharp(join(SRC, 'frames', nearest(t)))
    // Rounding an eased rectangle can step one pixel past the picture: keep it inside.
    .extract({ left: Math.round(r.x), top: Math.round(r.y), width: Math.min(Math.round(r.w), SRC_W - Math.round(r.x)), height: Math.min(Math.round(r.h), SRC_H - Math.round(r.y)) })
    .resize(OUT_W, OUT_H, { kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer();
}

const stillAt = process.argv.indexOf('--still');
if (stillAt > 0) {
  const s = Number(process.argv[stillAt + 1]);
  const item = timeline[Math.min(timeline.length - 1, Math.round(s * FPS))];
  await render(item, join(SRC, `still-${s}.jpg`));
  console.log(`still at ${s}s (recording ${item.t.toFixed(1)}s) → ${join(SRC, `still-${s}.jpg`)}`);
  process.exit(0);
}

const OUT = join(SRC, 'out');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (let i = 0; i < timeline.length; i += 1) await render(timeline[i], join(OUT, `${String(i).padStart(5, '0')}.jpg`));
const mp4 = join(SRC, 'studio-trip.mp4');
spawnSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', join(OUT, '%05d.jpg'),
  '-vf', 'scale=1600:900:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slower', '-crf', '27', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
let at = 0;
for (const [from, to, speed, view] of SHOTS) { console.log(`${at.toFixed(1)}s  ${view.padEnd(5)}  recording ${from}-${to}s ×${speed}`); at += (to - from) / speed; }
console.log(`${timeline.length} frames, ${(timeline.length / FPS).toFixed(1)} s → ${mp4}`);
