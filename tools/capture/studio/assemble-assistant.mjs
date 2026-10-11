// Assembles the Assistant clips for the website from the takes recorded by rec.mjs.
//   node assemble-assistant.mjs
// Each clip is a list of parts { file, from, to, speed }: the typing and the waiting for the model are sped up,
// the moments to read (plan, result) are kept at normal speed. Output: ../../../site/public/media/assistant-*.mp4 and .jpg.
import { spawnSync } from 'node:child_process';
import { copyFileSync } from 'node:fs';

const OUT = 'C:/Dev/agentivity/agentivity_website/site/public/media';
const clips = {
  'assistant-create': [
    { file: 'create-1', from: 0, to: 17.6, speed: 1.6 },
    { file: 'create-2', from: 0, to: 8.2, speed: 1.3 },
    { file: 'create-3', from: 0, to: 8, speed: 1 },
    { file: 'create-3', from: 8, to: 24, speed: 1.6 },
    { file: 'create-3', from: 24, to: 28.5, speed: 1 },
  ],
  'assistant-change': [
    { file: 'change-1', from: 0, to: 9, speed: 1.5 },
    { file: 'change-1', from: 9, to: 20.5, speed: 1.3 },
    { file: 'change-1', from: 20.5, to: 25, speed: 1 },
  ],
  'assistant-challenge': [
    { file: 'challenge-1', from: 0, to: 9, speed: 1.5 },
    { file: 'challenge-1', from: 9, to: 18, speed: 1.3 },
    { file: 'challenge-1', from: 18, to: 26, speed: 1 },
  ],
  'assistant-hand': [
    { file: 'hand-1', from: 0, to: 11.5, speed: 1.2 },
    { file: 'hand-3', from: 0, to: 9.5, speed: 1 },
    { file: 'hand-4', from: 0, to: 6.5, speed: 1 },
  ],
};

for (const [name, parts] of Object.entries(clips)) {
  const files = [...new Set(parts.map((p) => p.file))];
  const args = ['-v', 'error', '-y'];
  for (const f of files) args.push('-i', `${f}.mp4`);
  const chains = parts.map((p, i) => {
    const input = files.indexOf(p.file);
    return `[${input}:v]trim=start=${p.from}:end=${p.to},setpts=(PTS-STARTPTS)/${p.speed},fps=30,scale=1418:770,setsar=1[v${i}]`;
  });
  const join = parts.map((_, i) => `[v${i}]`).join('') + `concat=n=${parts.length}:v=1:a=0[out]`;
  args.push('-filter_complex', [...chains, join].join(';'), '-map', '[out]', '-an', '-c:v', 'libx264', '-crf', '25', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${name}.mp4`);
  const r = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (r.status !== 0) { console.error(name, 'failed:', r.stderr.slice(-400)); process.exit(1); }
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size', '-of', 'csv=p=0', `${name}.mp4`], { encoding: 'utf8' });
  console.log(name, probe.stdout.trim());
}
