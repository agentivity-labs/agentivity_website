// Invoice Clerk in the Solutions Portal (agentivity_sdk_showcase_solutions): one agent, no team graph. The visitor
// uploads supplier invoices one by one; the agent files each one, checks its figures and charts the spending.
// The invoices are the fictitious demo set of C:\Dev\agentivity\demo_invoices, in an order that tells the story:
// a first invoice filed, one whose printed total does not add up (flagged, not corrected), a third category,
// then a reminder of the first one (recognised as a duplicate, nothing added).
const INVOICES = 'C:\\Dev\\agentivity\\demo_invoices\\';

export default {
  url: 'http://localhost:5174/',
  viewport: { width: 1024, height: 768, scale: 2 },

  ready: ['button', /invoice clerk/i],
  homeHoldMs: 1800,
  intro: [['button', /invoice clerk/i, 1400]],
  inputPlaceholder: /type a message/i,

  request: 'Hi, I have a few supplier invoices to file.',
  files: [
    `${INVOICES}1-northwind-cloud.pdf`,
    `${INVOICES}3-atelier-papier.pdf`,
    `${INVOICES}2-air-lumiere.pdf`,
    `${INVOICES}5-northwind-cloud-reminder.pdf`,
  ],
  // The document box submits with "Read it".
  goAhead: /read it|continue|send|submit/i,
  answers: [],
  defaultAnswer: 'Yes',
  openReply: 'Here is the next one.',

  end: {
    // Finished once every invoice is handed over and the agent asks for another one.
    files: true,
    quietMs: 3000,
    stalledMs: 120_000,
    timeoutMs: 540_000,
    maxAnswers: 8,
  },
  // The results are spread over the conversation: the clip ends by going back to them, one after the other. The warning
  // on the invoice whose total does not add up, the reminder recognised as a duplicate, then the last chart of the
  // spending (founder, 2026-10-29: dwell on the rich screens, end on the result).
  finale: {
    stops: [
      [/^total does not add up$/i, 3800],
      [/^duplicate/i, 3800],
      [/^spending by category/i, 3800],
    ],
  },

  edit: {
    startMarker: 'home',
    // Each invoice handed over gets its moment at real speed.
    dwell: [['file:', 1400]],
    actSpeed: 1,
    waitSpeed: 3.5,
    // About 24 seconds up to the last invoice's answer, then the three results at real speed.
    targetMs: 24_000,
    realFrom: 'focus',
    endAfter: ['stop:3', 3600],
    stills: [['warning', 'stop:1', 1500], ['duplicate', 'stop:2', 1500], ['chart', 'stop:3', 1500]],
  },
};
