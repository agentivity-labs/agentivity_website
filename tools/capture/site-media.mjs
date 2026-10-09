// Prepares the home page media in site/public/media from the capture outputs.
import sharp from 'file:///C:/Dev/agentivity/agentivity_website/site/node_modules/sharp/lib/index.js';
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'fs';
import { spawnSync } from 'child_process';
const W = 'C:/Dev/agentivity/agentivity_website';
const CAP = `${W}/tools/capture/out/`;
const OUT = `${W}/site/public/media/`;
const TMP = process.argv[2];

// 1. The two app clips, as recorded, plus a poster each.
for (const [src, dst, poster] of [
  ['trip-planner/trip-planner.mp4', 'trip-planner.mp4', 'trip-planner/trip-planner-hotel.jpg'],
  ['solutions-portal/solutions-portal.mp4', 'shopping-lab.mp4', 'solutions-portal/solutions-portal-products.jpg'],
]) {
  copyFileSync(CAP + src, OUT + dst);
  await sharp(CAP + poster).resize({ width: 1280 }).jpeg({ quality: 78, mozjpeg: true }).toFile(OUT + dst.replace('.mp4', '.jpg'));
}

// 2. The team graph alone, as short loops (MP4, so that reduced-motion visitors get a still poster).
const jobs = [
  { name: 'trip-planner', out: 'team-manager', crop: { left: 1180, top: 466, width: 546, height: 680 } },
  { name: 'solutions-portal', out: 'team-chain', crop: { left: 1285, top: 570, width: 456, height: 560 } },
];
for (const job of jobs) {
  const { frames, markers } = JSON.parse(readFileSync(`${CAP}${job.name}/frames.json`, 'utf8'));
  const members = markers.filter((m) => m.name.startsWith('member:'));
  const end = markers.find((m) => m.name === 'end').t;
  const nearest = (t) => frames.reduce((best, x) => (Math.abs(x.t - t) < Math.abs(best.t - t) ? x : best));
  const picked = [];
  for (const [i, m] of members.entries()) {
    const stop = Math.min(m.t + 2600, (members[i + 1]?.t ?? end) - 300);
    for (let t = m.t - 500; t <= stop; t += 110) {
      const f = nearest(t);
      if (picked.at(-1)?.file !== f.file) picked.push({ file: f.file, delay: 75 });
    }
    picked.at(-1).delay = 550;
  }
  picked.push({ file: nearest(end).file, delay: 1800 });
  const dir = `${TMP}/${job.out}`;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const list = [];
  for (const [i, f] of picked.entries()) {
    const file = `${dir}/${String(i).padStart(4, '0')}.png`;
    await sharp(`${CAP}${job.name}/frames/${f.file}`).extract(job.crop).png({ compressionLevel: 1 }).toFile(file);
    list.push(`file '${file}'\nduration ${(f.delay / 1000).toFixed(3)}`);
  }
  list.push(`file '${dir}/${String(picked.length - 1).padStart(4, '0')}.png'`);
  writeFileSync(`${dir}/concat.txt`, list.join('\n') + '\n');
  const run = spawnSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', `${dir}/concat.txt`,
    '-vf', 'scale=iw:ih:flags=lanczos:in_range=full:out_range=tv,format=yuv420p,fps=30',
    '-c:v', 'libx264', '-color_range', 'tv', '-crf', '21', '-movflags', '+faststart', `${OUT}${job.out}.mp4`], { stdio: 'ignore' });
  if (run.status !== 0) throw new Error('ffmpeg failed for ' + job.out);
  await sharp(`${dir}/${String(picked.length - 1).padStart(4, '0')}.png`).jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}${job.out}.jpg`);
  console.log(job.out, picked.length, 'frames');
}

// 3. Studio captures already in the site, lighter.
const sc = `${W}/site/public/studio-canvas.png`;
const m = await sharp(sc).metadata();
await sharp(sc).extract({ left: 118, top: 40, width: m.width - 138, height: m.height - 60 }).webp({ quality: 82 }).toFile(OUT + 'studio-workflow.webp');
await sharp(`${W}/site/public/team-canvas.png`).webp({ quality: 86 }).toFile(OUT + 'team-canvas.webp');
