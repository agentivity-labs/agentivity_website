// Builds short loops of the team graph alone, cropped from frames already recorded.
import sharp from 'file:///C:/Dev/agentivity/agentivity_website/site/node_modules/sharp/lib/index.js';
import { readFileSync } from 'fs';
const OUT = process.argv[2];
const ROOT = 'C:/Dev/agentivity/agentivity_website/tools/capture/out/';
const jobs = [
  { name: 'trip-planner', crop: { left: 1180, top: 466, width: 546, height: 680 }, lead: 'member:Trip Manager' },
  { name: 'solutions-portal', crop: { left: 1285, top: 570, width: 456, height: 560 }, lead: 'member:Needs Analyst' },
];
for (const job of jobs) {
  const { frames, markers } = JSON.parse(readFileSync(`${ROOT}${job.name}/frames.json`, 'utf8'));
  const members = markers.filter((m) => m.name.startsWith('member:'));
  const end = markers.find((m) => m.name === 'end').t;
  // Around each member joining: a little before, the lighting-up, then a short look at the new state.
  const picked = [];
  const stepMs = 110;
  for (const [i, m] of members.entries()) {
    const stop = Math.min(m.t + 2600, (members[i + 1]?.t ?? end) - 300);
    for (let t = m.t - 500; t <= stop; t += stepMs) {
      const f = frames.reduce((best, x) => (Math.abs(x.t - t) < Math.abs(best.t - t) ? x : best));
      if (picked.at(-1)?.file !== f.file) picked.push({ file: f.file, delay: 75 });
    }
    picked.at(-1).delay = 550;
  }
  // Last state, everyone done.
  const last = frames.reduce((best, x) => (Math.abs(x.t - end) < Math.abs(best.t - end) ? x : best));
  picked.push({ file: last.file, delay: 1800 });
  const bufs = await Promise.all(picked.map((f) => sharp(`${ROOT}${job.name}/frames/${f.file}`).extract(job.crop).png({ compressionLevel: 1 }).toBuffer()));
  await sharp(bufs, { join: { animated: true } }).webp({ quality: 80, effort: 4, loop: 0, delay: picked.map((f) => f.delay) }).toFile(`${OUT}/team-${job.name}.webp`);
  await sharp(bufs.at(-1)).jpeg({ quality: 88 }).toFile(`${OUT}/team-${job.name}-last.jpg`);
  await sharp(bufs[Math.floor(bufs.length / 2)]).jpeg({ quality: 88 }).toFile(`${OUT}/team-${job.name}-mid.jpg`);
  console.log(job.name, picked.length, 'frames', (picked.reduce((s, f) => s + f.delay, 0) / 1000).toFixed(1) + 's');
}
