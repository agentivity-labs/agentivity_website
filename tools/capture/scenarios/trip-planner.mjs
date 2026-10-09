// Trip Planner (agentivity_sdk_showcase_tripagency): an app built for one job, connected to a team of specialists.
export default {
  url: 'http://localhost:5173/',
  // Tablet, landscape. Captured at 2x so the picture stays sharp.
  viewport: { width: 1024, height: 768, scale: 2 },

  // The app is loaded once this is on the page.
  ready: ['button', /^start/i],
  homeHoldMs: 900,
  // Clicks from the home screen to the chat with the team beside it: [selector, text, pause after].
  intro: [
    ['button', /^start/i, 900],
    ['button', /see team/i, 1600],
  ],
  inputPlaceholder: /destination/i,

  // Says everything up front so the team asks as little as possible, and still fits the two-line input.
  // It names each service on purpose: asked only for "a trip", the manager often books flights and a hotel
  // and goes straight to payment, and the clip shows two specialists instead of four.
  request: 'Lisbon for 2, 11-14 June 2027, from Brussels. 1500 EUR: flights, boutique hotel, a dinner, transfers.',
  dates: ['2027-06-11', '2027-06-14'],
  // Answers to the fields of a form, by its label. First match wins: the more specific questions come first.
  answers: [
    [/hotel|accommodation|stay|style/i, 'A cosy boutique hotel'],
    [/interest|activit|like to do|experience/i, 'Food and culture'],
    [/curren/i, 'EUR'],
    [/budget|spend/i, '1500 EUR'],
    [/depart|airport|fly|origin|from/i, 'Brussels (BRU)'],
    [/travell?er|people|guest|how many/i, '2'],
  ],
  defaultAnswer: 'Your best recommendation',
  // Reply to a question asked in plain text.
  openReply: 'Yes, all of it. Go with your best picks.',

  end: {
    // Far enough once this many specialists (anyone after the first speaker) have spoken;
    // the clip then ends when the screen has been still for quietMs.
    specialists: 4,
    quietMs: 3000,
    // Give up when nothing at all has happened for this long, or after this long in total.
    stalledMs: 45_000,
    timeoutMs: 330_000,
    maxAnswers: 14,
  },

  edit: {
    // The clip opens on the chat with the team beside it; the home screen before it is left out.
    startMarker: 'chat',
    // Extra stills: [file suffix, marker, milliseconds from it].
    stills: [['hotel', 'form:Choose this hotel', -700]],
  },
};
