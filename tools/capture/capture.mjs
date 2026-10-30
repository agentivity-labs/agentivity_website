// Records an Agentivity showcase app running, as a numbered frame sequence with timestamps.
// The app is driven like a visitor would: the request is typed, forms are filled, choices are clicked.
//
//   node capture.mjs <scenario>          full run (calls the real agents: uses model credits)
//   node capture.mjs <scenario> --dry    stops before sending the request (checks the framing only)
//
// <scenario> is a file in ./scenarios. Prerequisites: the Agentivity API and the showcase are running.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launchChrome, sleep } from './cdp.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
if (!name || name.startsWith('--')) {
  console.error('Usage: node capture.mjs <scenario> [--dry]');
  process.exit(1);
}
const DRY = process.argv.includes('--dry');
const scenario = (await import(pathToFileURL(join(HERE, 'scenarios', `${name}.mjs`)).href)).default;

const OUT = join(HERE, 'out', name);
const FRAMES = join(OUT, 'frames');
const { width, height, scale } = scenario.viewport;

// What the Agentivity SDK renders, the same in every showcase.
const SDK = {
  speaker: '.ag-chat-speaker__name',
  widget: '.ag-chat-widget-block',
  // One per team member in the graph; its data-status leaves "idle" when the member starts working.
  graphNode: '.ag-team-graph__node',
  // The input's placeholder while the team waits for the visitor.
  awaiting: 'type your answer',
};
// In a form with several buttons, the one that moves things forward.
const GO_AHEAD = scenario.goAhead ?? /accept|confirm|approve|yes|book|choose|select|continue|create|search|send|submit|pay|proceed/i;

const HELPERS = `
window.__cap = (() => {
  const cursor = document.createElement('div');
  cursor.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;' +
    'background:rgba(20,24,34,.30);border:2px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.35);z-index:99999;' +
    'pointer-events:none;transform:translate(${width / 2}px,${height + 40}px);transition:transform .5s cubic-bezier(.2,.7,.2,1)';
  document.body.appendChild(cursor);
  document.documentElement.style.overflow = 'hidden';
  const text = (el) => (el.getAttribute('aria-label') || el.textContent || el.placeholder || '').trim();
  const find = (selector, pattern) => [...document.querySelectorAll(selector)].find((el) => pattern.test(text(el)));
  const center = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; };
  const setValue = (el, value) => {
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const lastWidget = () => [...document.querySelectorAll('${SDK.widget}')].at(-1);
  return {
    find, center,
    moveTo(x, y) { cursor.style.transform = 'translate(' + x + 'px,' + y + 'px)'; },
    pulse() { cursor.animate([{ scale: 1 }, { scale: .65 }, { scale: 1 }], { duration: 280 }); },
    state() {
      const speakers = [...document.querySelectorAll('${SDK.speaker}')].map((el) => el.textContent.trim());
      const widgets = document.querySelectorAll('${SDK.widget}').length;
      const last = lastWidget();
      // A choice list (options to pick, then a submit that stays disabled until one is picked) counts as live too.
      const liveButtons = !!last && ([...last.querySelectorAll('button')].some((b) => !b.disabled) || !!last.querySelector('[role="button"]'));
      const awaiting = (document.querySelector('textarea')?.placeholder ?? '').toLowerCase().startsWith('${SDK.awaiting}');
      const nodes = [...document.querySelectorAll('${SDK.graphNode}')];
      // A node's title reads "Quill Scout — working now": keep the name, or every change of status looks like a new member.
      const memberName = (n) => (n.querySelector('title')?.textContent ?? n.textContent ?? '').split(' — ')[0].trim();
      const engaged = nodes.filter((n) => n.dataset.status !== 'idle').map(memberName);
      // A member still at work, per its title ("… — working now"): the team has not finished.
      const busy = nodes.some((n) => /working/i.test(n.querySelector('title')?.textContent ?? ''));
      // Changes whenever anything happens: a new message, more text, a form, a member starting or finishing.
      const activity = [speakers.length, widgets, nodes.map((n) => n.dataset.status).join(','), document.body.innerText.length].join('|');
      return { lastSpeaker: speakers.at(-1) ?? null, widgets, liveButtons, awaiting, engaged, busy, activity };
    },
    targets: [],
    // A button is brought to the bottom of the chat so that the card it belongs to (photo, name, price) shows above it.
    reveal(i) {
      const el = __cap.targets[i];
      el.style.scrollMarginBottom = '28px';
      el.scrollIntoView({ block: el.tagName === 'BUTTON' ? 'end' : 'center', behavior: 'smooth' });
    },
    pointOf(i) { return center(__cap.targets[i]); },
    // The closing shot: bring the last speaker's message (the report) to the top of the chat, then read down it.
    finaleStart() {
      const last = [...document.querySelectorAll('${SDK.speaker}')].at(-1);
      let box = last?.parentElement;
      while (box && !(box.scrollHeight > box.clientHeight + 40 && /auto|scroll/.test(getComputedStyle(box).overflowY))) box = box.parentElement;
      if (!box) return null;
      __cap.chat = box;
      const from = Math.max(0, last.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 16);
      box.scrollTo({ top: from, behavior: 'smooth' });
      return { from, to: box.scrollHeight - box.clientHeight, page: box.clientHeight };
    },
    finaleScroll(top) { __cap.chat.scrollTo({ top, behavior: 'smooth' }); },
    // The closing hold: bring the last line of text that matches (a report's heading above its product cards) to the
    // top of the chat. The last match, because the same words can appear earlier in the conversation.
    finaleFocus(source, flags) {
      const pattern = new RegExp(source, flags);
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let hit = null;
      while (walker.nextNode()) if (pattern.test(walker.currentNode.textContent.trim())) hit = walker.currentNode.parentElement;
      let box = hit?.parentElement;
      while (box && !(box.scrollHeight > box.clientHeight + 40 && /auto|scroll/.test(getComputedStyle(box).overflowY))) box = box.parentElement;
      if (!box) return false;
      __cap.chat = box;
      const top = Math.max(0, hit.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 12);
      box.scrollTo({ top, behavior: 'smooth' });
      return true;
    },
    // Where the card titled by the last line that matches starts and ends in the chat (after finaleFocus): the card is the
    // first block around that title that holds a picture, e.g. the "Top picks" card and its product sheets.
    finaleCard(source, flags) {
      const pattern = new RegExp(source, flags);
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let hit = null;
      while (walker.nextNode()) if (pattern.test(walker.currentNode.textContent.trim())) hit = walker.currentNode.parentElement;
      let card = hit;
      while (card && !(card.querySelector('img') && card.getBoundingClientRect().height > 200)) card = card.parentElement;
      const box = __cap.chat;
      if (!card || !box) return null;
      const r = card.getBoundingClientRect();
      const offset = box.scrollTop - box.getBoundingClientRect().top;
      return { from: Math.max(0, r.top + offset - 12), to: Math.min(box.scrollHeight - box.clientHeight, r.bottom + offset - box.clientHeight + 16), page: box.clientHeight };
    },
    press(i) { const el = __cap.targets[i]; el.focus?.(); el.click(); },
    // The pictures of the last widget that are on screen: 'none' while there is no image yet, then whether
    // they have all arrived. Off-screen ones are ignored: lazy images only load once scrolled to.
    picturesOnScreen() {
      const seen = [...(lastWidget()?.querySelectorAll('img') ?? [])].filter((img) => {
        const r = img.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      });
      if (seen.length === 0) return 'none';
      return seen.every((img) => img.complete && img.naturalWidth > 0) ? 'loaded' : 'loading';
    },
    form(dates) {
      const block = lastWidget();
      [...block.querySelectorAll('input[type="date"]')].forEach((input, i) => {
        if (!input.value && dates[i]) setValue(input, dates[i]);
      });
      __cap.targets = [];
      const remember = (el) => __cap.targets.push(el) - 1;
      const fields = [...block.querySelectorAll('input[type="text"], input:not([type]), textarea')]
        .filter((el) => !el.value)
        .map((el) => ({
          index: remember(el),
          label: [el.getAttribute('aria-label'), el.closest('label')?.textContent, el.previousElementSibling?.textContent,
            el.parentElement?.previousElementSibling?.textContent, el.placeholder].filter(Boolean).join(' '),
        }));
      const buttons = [...block.querySelectorAll('button')].filter((b) => !b.disabled).map((b) => ({ index: remember(b), text: text(b) }));
      // A document box (upload, then a submit): its drop zone is pointed at, never clicked (that opens the system's
      // file chooser); the file is handed to its hidden input instead.
      const fileInput = block.querySelector('input[type="file"]');
      const upload = fileInput ? remember(fileInput.closest('[role="button"]') ?? fileInput) : null;
      // The options of a choice list: rows to click, not buttons.
      const options = [...block.querySelectorAll('[role="button"]')]
        .filter((el) => !el.querySelector('input[type="file"]'))
        .map((el) => ({ index: remember(el), text: text(el) }));
      return { fields, buttons, options, upload };
    },
    fileInput() { return lastWidget()?.querySelector('input[type="file"]') ?? null; },
  };
})();
`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

const chrome = await launchChrome({ profileDir: join(HERE, '.chrome-profile'), width, height, scale });
const { send, evaluate, type } = chrome;

const frames = [];
const markers = [];
const startedAt = Date.now();
const mark = (label) => markers.push({ name: label, t: Date.now() - startedAt });

// Chrome never answers a screenshot that a navigation interrupts, so every shot has a deadline
// and the loop only starts once the app has loaded.
const SHOT_TIMEOUT_MS = 3000;
// While the script only waits for the team, the edit plays several times faster: fewer frames are enough.
const WAITING_SHOT_GAP_MS = 160;
let waitingForTeam = false;
let capturing = false;
let captureLoop = Promise.resolve();
function startCapture() {
  capturing = true;
  captureLoop = (async () => {
    while (capturing) {
      const t = Date.now() - startedAt;
      const shot = await Promise.race([
        send('Page.captureScreenshot', { format: 'jpeg', quality: 88 }),
        sleep(SHOT_TIMEOUT_MS).then(() => null),
      ]);
      if (!shot) continue;
      const file = `${String(frames.length).padStart(5, '0')}.jpg`;
      frames.push({ t, file });
      await writeFile(join(FRAMES, file), Buffer.from(shot.data, 'base64'));
      if (waitingForTeam) await sleep(WAITING_SHOT_GAP_MS);
    }
  })();
}

// Clicks are fired in the page: a synthetic mouse press is cancelled whenever a screenshot lands
// between press and release, and the capture loop takes one every 60 ms.
async function pointAndClick(target) {
  await evaluate(`__cap.moveTo(${target.x}, ${target.y})`);
  await sleep(560);
  await evaluate('__cap.pulse()');
  await evaluate(`(() => { const el = document.elementFromPoint(${target.x}, ${target.y}); el?.focus?.(); el?.click(); })()`);
  await sleep(220);
}

// A form element may sit below the visible part of the chat: scroll to it, then point at it and press it.
async function revealAndPoint(index) {
  await evaluate(`__cap.reveal(${index})`);
  await sleep(650);
  const target = await evaluate(`__cap.pointOf(${index})`);
  await evaluate(`__cap.moveTo(${target.x}, ${target.y})`);
  await sleep(560);
  await evaluate('__cap.pulse()');
}

async function revealAndPress(index) {
  await revealAndPoint(index);
  await evaluate(`__cap.press(${index})`);
  await sleep(220);
}

// Hands a file to the document box of the last widget, as if it had been dropped there.
async function dropFile(path) {
  const { result } = await send('Runtime.evaluate', { expression: '__cap.fileInput()' });
  if (!result?.objectId) throw new Error('No file input in the last widget');
  await send('DOM.setFileInputFiles', { objectId: result.objectId, files: [path] });
}

const locate = (selector, pattern) =>
  evaluate(`(() => { const el = __cap.find(${JSON.stringify(selector)}, ${pattern}); return el ? __cap.center(el) : null; })()`);

async function waitFor(selector, pattern, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const found = await locate(selector, pattern);
    if (found) return found;
    await sleep(200);
  }
  throw new Error(`Not found on the page: ${selector} ${pattern}`);
}

const INPUT = 'textarea, input[type="text"]';
const answerFor = (label) => scenario.answers.find(([pattern]) => pattern.test(label))?.[1] ?? scenario.defaultAnswer;

async function converse() {
  const { specialists: wantedSpecialists, members: wantedMembers, quietMs = 3000, stalledMs, timeoutMs, maxAnswers } = scenario.end;
  const seenSpeakers = new Set();
  const engagedMembers = new Set();
  let activity = '';
  let handledWidgets = 0;
  let answers = 0;
  let awaitingSince = 0;
  let lastChange = Date.now();
  // Documents to hand over, one per document box the agent shows (scenario.files: absolute paths).
  const files = scenario.files ?? [];
  let filesSent = 0;
  let filesDone = false;
  const deadline = Date.now() + timeoutMs;

  // "waiting" … "acting" brackets the time spent waiting for the team: the only time the edit shortens.
  let waiting = false;
  const setWaiting = (value) => {
    if (value !== waiting) mark(value ? 'waiting' : 'acting');
    waiting = value;
    waitingForTeam = value;
  };

  while (Date.now() < deadline) {
    setWaiting(true);
    await sleep(400);
    const state = await evaluate('__cap.state()');
    if (state.activity !== activity) {
      activity = state.activity;
      lastChange = Date.now();
    }
    // Some teams work without a word in the chat (a chain of agents reading stores): the graph tells who is on.
    for (const member of state.engaged) {
      if (engagedMembers.has(member)) continue;
      engagedMembers.add(member);
      mark(`member:${member}`);
    }
    const reached =
      (wantedSpecialists && seenSpeakers.size - 1 >= wantedSpecialists) ||
      // A chain is finished when every member has started and none is still working: the last one's output is in.
      (wantedMembers && engagedMembers.size >= wantedMembers && !state.busy) ||
      // A document job is finished when every file has been handed over and the agent asks for one more.
      (scenario.end.files && filesDone);
    // Once far enough, the clip ends as soon as the screen has settled.
    if (reached && Date.now() - lastChange > quietMs) break;
    if (Date.now() - lastChange > stalledMs) break;

    if (state.lastSpeaker && !seenSpeakers.has(state.lastSpeaker)) {
      setWaiting(false);
      seenSpeakers.add(state.lastSpeaker);
      // The first to speak leads the conversation; everyone after is a specialist taking over.
      mark(`${seenSpeakers.size > 1 ? 'specialist' : 'lead'}:${state.lastSpeaker}`);
      await sleep(1200);
      continue;
    }
    if (reached) continue;

    // An answered form can keep live buttons (photo arrows, the other choices): only a new widget is a pending form.
    const formPending = state.liveButtons && state.widgets > handledWidgets;

    if (formPending && answers < maxAnswers) {
      setWaiting(false);
      handledWidgets = state.widgets;
      lastChange = Date.now();
      const dates = JSON.stringify(scenario.dates ?? []);
      const form = await evaluate(`__cap.form(${dates})`);
      // A document box once every file is handed over: the job is done, the box is left as it is.
      if (form.upload !== null && filesSent >= files.length) {
        filesDone = true;
        continue;
      }
      const firstChoice = form.buttons.find((b) => GO_AHEAD.test(b.text)) ?? form.buttons.at(-1);
      if (firstChoice) await evaluate(`__cap.reveal(${firstChoice.index})`);
      await sleep(700);
      // A card's photo arrives well after the card (first its address, then the picture): it is the point of
      // the shot, so wait for what is on screen — as waiting time, which the edit shortens.
      setWaiting(true);
      for (let waited = 0, none = 0; waited < 8000; waited += 300) {
        const pictures = await evaluate('__cap.picturesOnScreen()');
        if (pictures === 'loaded') break;
        none = pictures === 'none' ? none + 300 : 0;
        if (none >= 1500) break;
        await sleep(300);
      }
      setWaiting(false);
      await sleep(1800);
      for (const field of form.fields) {
        await revealAndPress(field.index);
        await type(answerFor(field.label), 22);
        await sleep(200);
      }
      // A document box: point at its drop zone and hand it the next file, which enables its submit button.
      if (form.upload !== null) {
        await revealAndPoint(form.upload);
        await dropFile(files[filesSent]);
        mark(`file:${basename(files[filesSent])}`);
        filesSent += 1;
        await sleep(1100);
      } else if (form.options.length) {
        // A choice list: pick its first option, which enables its submit button.
        await revealAndPress(form.options[0].index);
        await sleep(700);
      }
      // Re-read: filling the fields can enable the submit button. The first "go ahead" button is the first
      // option offered, which is also the one on screen.
      const ready = await evaluate(`__cap.form(${dates})`);
      const submit = ready.buttons.find((b) => GO_AHEAD.test(b.text)) ?? ready.buttons.at(-1);
      if (submit) {
        answers += 1;
        mark(`form:${submit.text}`);
        await revealAndPress(submit.index);
      }
      awaitingSince = 0;
      continue;
    }

    // A question asked in plain text (no form): answer it once the team has clearly stopped writing.
    if (state.awaiting && !formPending && answers < maxAnswers) {
      awaitingSince ||= Date.now();
      if (Date.now() - awaitingSince > 3500) {
        setWaiting(false);
        answers += 1;
        awaitingSince = 0;
        lastChange = Date.now();
        mark('reply');
        await pointAndClick(await locate('textarea', new RegExp(SDK.awaiting, 'i')));
        await type(scenario.openReply, 22);
        await sleep(350);
        await pointAndClick(await locate('button', /^send$/i));
      }
      continue;
    }
    awaitingSince = 0;
  }
  setWaiting(false);
  if (scenario.finale) await finale(scenario.finale);
  mark('end');
  await sleep(2200);
}

// Reads down the final message at a steady pace, so that a long result (a report with product cards) is seen.
// With `focus` (a pattern), it goes instead to the last line that matches and holds there for `focusHoldMs`, marked
// "focus": a result whose best part is at its top, with its method and sources below, ends on that best part.
// With `card` too (a pattern for a card's title), it then reads down that card from its top to its end, `stepMs` per step,
// and holds `cardHoldMs` on its last part, marked "card-end": every product sheet of a "Top picks" card is seen.
// With `stops` (a list of [pattern, holdMs]), it goes back to each of these lines in turn and holds on each, the first
// marked "focus" and every one "stop:<n>": a result spread over the conversation (a warning earlier, the last card now).
async function finale({ holdMs = 1800, stepMs = 1300, maxSteps = 8, focus = null, focusHoldMs = 6000, card = null, cardHoldMs = 3000, stops = null }) {
  await evaluate(`__cap.moveTo(${width / 2}, ${height + 40})`);
  if (stops) {
    mark('finale');
    let first = true;
    for (const [i, [pattern, hold]] of stops.entries()) {
      if (!(await evaluate(`__cap.finaleFocus(${JSON.stringify(pattern.source)}, ${JSON.stringify(pattern.flags)})`))) continue;
      await sleep(900);
      if (first) mark('focus');
      first = false;
      mark(`stop:${i + 1}`);
      await sleep(hold);
    }
    return;
  }
  if (focus && (await evaluate(`__cap.finaleFocus(${JSON.stringify(focus.source)}, ${JSON.stringify(focus.flags)})`))) {
    mark('finale');
    await sleep(900);
    mark('focus');
    await sleep(focusHoldMs);
    const range = card ? await evaluate(`__cap.finaleCard(${JSON.stringify(card.source)}, ${JSON.stringify(card.flags)})`) : null;
    if (range && range.to > range.from) {
      const steps = Math.min(maxSteps, Math.max(1, Math.ceil((range.to - range.from) / (range.page * 0.55))));
      for (let i = 0; i <= steps; i += 1) {
        await evaluate(`__cap.finaleScroll(${Math.round(range.from + ((range.to - range.from) * i) / steps)})`);
        await sleep(stepMs);
      }
      mark('card-end');
      await sleep(cardHoldMs);
    }
    return;
  }
  const range = await evaluate('__cap.finaleStart()');
  if (!range) return;
  mark('finale');
  await sleep(holdMs);
  const steps = Math.min(maxSteps, Math.ceil((range.to - range.from) / (range.page * 0.6)));
  for (let i = 1; i <= steps; i += 1) {
    await evaluate(`__cap.finaleScroll(${Math.round(range.from + ((range.to - range.from) * i) / steps)})`);
    await sleep(stepMs);
  }
}

try {
  await send('Page.navigate', { url: process.env.SHOWCASE_URL ?? scenario.url });
  await sleep(1500);
  await evaluate(HELPERS);
  await waitFor(scenario.ready[0], scenario.ready[1]);
  startCapture();
  mark('home');
  await sleep(scenario.homeHoldMs ?? 900);

  for (const [selector, pattern, pauseMs = 900] of scenario.intro) {
    await pointAndClick(await waitFor(selector, pattern));
    await sleep(pauseMs);
  }
  mark('chat');

  await pointAndClick(await waitFor(INPUT, scenario.inputPlaceholder));
  await type(scenario.request);
  await sleep(500);
  mark('typed');

  if (DRY) {
    await sleep(1200);
  } else {
    await pointAndClick(await locate('button', /^send$/i));
    mark('sent');
    await converse();
  }
} finally {
  capturing = false;
  await Promise.race([captureLoop.catch(() => {}), sleep(SHOT_TIMEOUT_MS + 500)]);
  writeFileSync(join(OUT, 'frames.json'), JSON.stringify({ width, height, scale, frames, markers }, null, 1));
  await chrome.close();
}

const seconds = ((frames.at(-1)?.t ?? 0) / 1000).toFixed(1);
console.log(`${frames.length} frames over ${seconds}s → ${OUT}`);
for (const m of markers) if (!['waiting', 'acting'].includes(m.name)) console.log(`  ${(m.t / 1000).toFixed(1)}s  ${m.name}`);
process.exit(0);
