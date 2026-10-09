// Turns a recorded frame sequence into a short clip: the time spent waiting for the team is cut,
// the rest keeps its pace, and the whole is sped up to fit a loop length.
//
//   node assemble.mjs <scenario>
//
// Writes <scenario>.mp4 (needs ffmpeg), <scenario>.webp (animated, no ffmpeg needed) and stills.
// It works from the frames already recorded: run it again after changing the settings, no new capture needed.
import { spawnSync } from 'node:child_process';
import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
// sharp is already a dependency of the site (Astro uses it); reuse it rather than installing it twice.
const sharp = (await import(pathToFileURL(join(HERE, '../../site/node_modules/sharp/lib/index.js')).href)).default;

const name = process.argv[2];
if (!name) {
  console.error('Usage: node assemble.mjs <scenario>');
  process.exit(1);
}
const scenario = (await import(pathToFileURL(join(HERE, 'scenarios', `${name}.mjs`)).href)).default;
const OUT = join(HERE, 'out', name);
const FRAMES = join(OUT, 'frames');
const { width, height, frames, markers } = JSON.parse(readFileSync(join(OUT, 'frames.json'), 'utf8'));

const edit = {
  // The clip starts just before this marker ("home" keeps the whole recording).
  startMarker: 'chat',
  startLeadMs: 500,
  // Only the time spent waiting for the team is shortened (between the "waiting" and "acting" markers):
  // what moves then (the team writing) is played this many times faster…
  waitSpeed: 5,
  // …and a stretch where nothing new appears is held this long at most, then skipped.
  maxStillMs: 300,
  // The script's own gestures (cursor, typing, clicks) are played a little faster than recorded.
  actSpeed: 1.4,
  // A loop is watched for 20 seconds or so: a longer edit is sped up as a whole to fit.
  targetMs: 24_000,
  // Moments played at real speed even though the script was only waiting: [marker prefix, for how long].
  dwell: [['lead:', 1200]],
  // Everything before this marker is played this many times faster again: [marker, factor].
  fastUntil: null,
  // The clip stops this long after a marker instead of at the end of the recording: [marker, ms].
  endAfter: null,
  // The last picture is held this long before the loop restarts.
  endHoldMs: 1400,
  stills: [],
  ...scenario.edit,
};
// Below this mean difference (0–255, on a 96×72 thumbnail) two frames count as the same picture.
// High enough to ignore the pulsing "is working on it…" dots, low enough to keep a line of new text.
const SAME_PICTURE = 0.08;
const MIN_DELAY_MS = 40;

const startAt = (markers.find((m) => m.name === edit.startMarker)?.t ?? 0) - edit.startLeadMs;
const waits = [];
for (const marker of markers) {
  if (marker.name === 'waiting') waits.push({ from: marker.t, to: Infinity });
  else if (marker.name === 'acting' && waits.length) waits.at(-1).to = marker.t;
}
const fastBefore = edit.fastUntil ? (markers.find((m) => m.name === edit.fastUntil[0])?.t ?? 0) : 0;
const endAt = edit.endAfter ? (markers.find((m) => m.name === edit.endAfter[0])?.t ?? Infinity) + edit.endAfter[1] : Infinity;
const dwelling = (t) => markers.some((m) => edit.dwell.some(([prefix, ms]) => m.name.startsWith(prefix) && t >= m.t && t < m.t + ms));
const isWaiting = (t) => !dwelling(t) && waits.some((w) => t >= w.from && t < w.to);

const thumbnails = await Promise.all(
  frames.map((f) => sharp(join(FRAMES, f.file)).resize(96, 72, { fit: 'fill' }).greyscale().raw().toBuffer()),
);
const difference = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
};

const timeline = [];
let stillFor = 0;
for (let i = 0; i < frames.length; i += 1) {
  if (frames[i].t < startAt || frames[i].t > endAt) continue;
  const real = i + 1 < frames.length ? frames[i + 1].t - frames[i].t : 120;
  const rush = frames[i].t < fastBefore ? edit.fastUntil[1] : 1;
  const duration = real / ((isWaiting(frames[i].t) ? edit.waitSpeed : edit.actSpeed) * rush);
  const moving = i === 0 || difference(thumbnails[i], thumbnails[i - 1]) >= SAME_PICTURE;
  if (moving || !isWaiting(frames[i].t)) stillFor = 0;
  else stillFor += real;
  if (stillFor > edit.maxStillMs) continue;

  const previous = timeline.at(-1);
  if (previous && previous.delay < MIN_DELAY_MS) previous.delay += duration;
  else timeline.push({ file: frames[i].file, t: frames[i].t, delay: duration });
}

timeline.at(-1).delay += edit.endHoldMs;
const edited = timeline.reduce((sum, f) => sum + f.delay, 0);
if (edited > edit.targetMs) for (const f of timeline) f.delay *= edit.targetMs / edited;
const total = timeline.reduce((sum, f) => sum + f.delay, 0);

// Where each recorded moment lands in the edited clip, to check the pacing without watching it.
console.log(`${frames.length} frames / ${(frames.at(-1).t / 1000).toFixed(1)}s recorded → ${timeline.length} frames / ${(total / 1000).toFixed(1)}s`);
let clock = 0;
const landed = new Set();
for (const f of timeline) {
  for (const m of markers) {
    if (landed.has(m) || m.t > f.t || ['waiting', 'acting'].includes(m.name)) continue;
    landed.add(m);
    console.log(`  ${(clock / 1000).toFixed(1)}s  ${m.name}`);
  }
  clock += f.delay;
}

const frameAt = (t) => frames.reduce((best, f) => (Math.abs(f.t - t) < Math.abs(best.t - t) ? f : best));
const stills = [['final', 'end', 1500], ...edit.stills];
for (const [suffix, markerName, offsetMs] of stills) {
  const marker = markers.find((m) => m.name === markerName);
  if (!marker) {
    console.log(`still "${suffix}" skipped: no "${markerName}" in this recording`);
    continue;
  }
  copyFileSync(join(FRAMES, frameAt(marker.t + offsetMs).file), join(OUT, `${name}-${suffix}.jpg`));
}

if (spawnSync('ffmpeg', ['-version']).status === 0) {
  const path = (file) => join(FRAMES, file).replaceAll('\\', '/');
  const list = timeline.map((f) => `file '${path(f.file)}'\nduration ${(f.delay / 1000).toFixed(3)}`).join('\n');
  const listFile = join(OUT, 'concat.txt');
  writeFileSync(listFile, `${list}\nfile '${path(timeline.at(-1).file)}'\n`);
  const mp4 = join(OUT, `${name}.mp4`);
  const run = spawnSync(
    'ffmpeg',
    [
      '-y', '-f', 'concat', '-safe', '0', '-i', listFile,
      // The frames are JPEGs (full-range colour); web players expect limited range, or the picture looks too contrasty.
      '-vf', `scale=${width}:${height}:flags=lanczos:in_range=full:out_range=tv,format=yuv420p,fps=30`,
      '-c:v', 'libx264', '-color_range', 'tv', '-crf', '20', '-movflags', '+faststart', mp4,
    ],
    { stdio: 'ignore' },
  );
  rmSync(listFile, { force: true });
  console.log(run.status === 0 ? `video     → ${mp4}` : 'ffmpeg failed to write the MP4');
} else {
  console.log('ffmpeg is not installed: no MP4 written.');
}

const resized = await Promise.all(
  timeline.map((f) => sharp(join(FRAMES, f.file)).resize(width, height, { kernel: 'lanczos3' }).png({ compressionLevel: 1 }).toBuffer()),
);
const webp = join(OUT, `${name}.webp`);
await sharp(resized, { join: { animated: true } })
  .webp({ quality: 82, effort: 4, loop: 0, delay: timeline.map((f) => Math.round(f.delay)) })
  .toFile(webp);
console.log(`animation → ${webp}`);
