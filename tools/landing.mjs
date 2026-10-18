// Landing pages of the site: site/src/content/landings/<lang>/<slug>.yaml, served at /lp/<slug>.
//   node tools/landing.mjs new <slug>   a new English page from the template below
//   node tools/landing.mjs check        checks every page: wording, pictures and clips, anchors, lengths
// The shape of a page (its sections and fields) is checked by Astro itself when the site is built (site/src/content.config.ts).
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const dir = join(root, 'src', 'content', 'landings');
const yaml = createRequire(join(root, 'package.json'))('js-yaml');

// What a landing page must not say: the same rules as the documentation, and no other product named.
const FORBIDDEN = [
  { re: /open[- ]?source/i, why: 'Agentivity is source available (Elastic License 2.0), never "open source"' },
  { re: /\b24\/7\b/, why: 'no "24/7" claim' },
  { re: /\{\{|\bTODO\b|\bTBD\b|lorem ipsum/i, why: 'unfinished placeholder' },
  { re: /[€$£]\s?\d|\d\s?(€|EUR|USD|\$)/, why: 'no prices on a landing page: link to /pricing' },
  { re: /\b(n8n|zapier|make\.com|dify|langflow|flowise|crewai|autogen)\b/i, why: 'no other product named' },
];

const [command = 'check', slug] = process.argv.slice(2);

if (command === 'new') {
  if (!slug || !/^[a-z0-9][a-z0-9-]{0,47}$/.test(slug)) {
    console.error('Usage: node tools/landing.mjs new <slug>   (lower case, digits and dashes, 48 characters at most)');
    process.exit(1);
  }
  const file = join(dir, 'en', slug + '.yaml');
  if (existsSync(file)) {
    console.error(`${file} exists already.`);
    process.exit(1);
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `# Landing page: https://www.agentivity.io/lp/${slug}
# Sections: banner, hero (with the sign-up form, anchor #get-access), home (values | ladder), offer, clips, steps, faq, cta.
# See producthunt.yaml for every one of them.
title: Write the title of the page, 70 characters at most
description: Write what the page offers, between 50 and 160 characters, the way a search result would show it.
noindex: true
header:
  label: Get early access
  href: "#get-access"

sections:
  - type: hero
    eyebrow: AI teams for your business, no code
    title: Your next hire is
    accent: an AI team.
    sub: Compose agents that collaborate, delegate and deliver, with the authority structure of a real team. You stay in charge. Your AI team does the work.
    form:
      submit: Get early access
    secondary:
      label: Install the Community edition
      href: /community

  - type: home
    block: values

  - type: cta
    title: Your team is ready
    accent: to work.
    sub: Start free, or join the waitlist and be first on the cloud.
    fine: No spam. First access when the cloud launches.
`);
  console.log(`Created ${file}\nSee it with the site running (npm run dev in site/): http://localhost:4321/lp/${slug}`);
  process.exit(0);
}

if (command !== 'check') {
  console.error('Commands: new <slug>, check');
  process.exit(1);
}

const problems = [];
let count = 0;
for (const lang of existsSync(dir) ? readdirSync(dir) : []) {
  for (const name of readdirSync(join(dir, lang)).filter((f) => /\.ya?ml$/.test(f))) {
    count += 1;
    const where = `${lang}/${name}`;
    const report = (why) => problems.push(`${where}: ${why}`);
    let page;
    try {
      page = yaml.load(readFileSync(join(dir, lang, name), 'utf8'));
    } catch (error) {
      report(`not readable YAML (${error.message.split('\n')[0]})`);
      continue;
    }
    if (!/^[a-z0-9][a-z0-9-]{0,47}\.ya?ml$/.test(name)) report('the file name must be lower case, digits and dashes (it becomes the address)');
    if (lang !== 'en') report('only English pages are served for now (/lp/<slug>); add a route under src/pages/<lang>/lp first');

    const text = JSON.stringify(page);
    for (const rule of FORBIDDEN) {
      const found = text.match(rule.re);
      if (found) report(`"${found[0]}": ${rule.why}`);
    }
    if ((page.title ?? '').length > 70) report(`title of ${page.title.length} characters, 70 at most`);
    const d = (page.description ?? '').length;
    if (d < 50 || d > 160) report(`description of ${d} characters, between 50 and 160`);

    // Every picture and clip is in site/public; every anchor of the page leads to a section of the page.
    const anchors = new Set((page.sections ?? []).filter((s) => s.type === 'offer' || s.type === 'cta').map((s) => s.id ?? s.type));
    if ((page.sections ?? []).some((s) => s.type === 'hero' && s.form)) anchors.add('get-access');
    const walk = (value) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (value && typeof value === 'object') return Object.values(value).forEach(walk);
      if (typeof value !== 'string') return;
      if (/^\/[^/].*\.(mp4|webm|jpe?g|png|webp|gif|svg)$/i.test(value) && !existsSync(join(root, 'public', value))) report(`${value} is not in site/public`);
      if (/^#/.test(value) && !anchors.has(value.slice(1))) report(`${value} leads to no section of the page`);
    };
    walk(page);
    if (page.ogImage && !existsSync(join(root, 'public', page.ogImage))) report(`ogImage ${page.ogImage} is not in site/public`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => '✖ ' + p).join('\n'));
  console.error(`\n${problems.length} problem(s) in ${count} page(s).`);
  process.exit(1);
}
console.log(`OK: ${count} landing page(s) checked.`);
