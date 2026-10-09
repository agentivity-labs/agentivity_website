// Solutions Portal (agentivity_sdk_showcase_solutions): the generic app. It lists the Solutions published
// in Agentivity (an agent, a team, a workflow) and runs whichever one the visitor picks.
export default {
  url: 'http://localhost:5174/',
  viewport: { width: 1024, height: 768, scale: 2 },

  ready: ['button', /shopping lab/i],
  // The list of Solutions is the point of this app: it stays on screen a moment before one is picked.
  homeHoldMs: 1800,
  intro: [
    ['button', /shopping lab/i, 900],
    ['button', /see team/i, 1600],
  ],
  inputPlaceholder: /type a message/i,

  // Says who it is for and what matters, so the first agent has less to ask.
  request: 'Wireless noise-cancelling headphones under 300 dollars, for travel and calls. Any brand.',
  answers: [
    [/budget|price|spend/i, 'Under 300 dollars'],
    [/brand/i, 'No preference'],
    [/use|purpose|need|priorit/i, 'Travel and office calls'],
  ],
  defaultAnswer: 'No preference',
  openReply: 'No preference. Go with your best picks.',

  end: {
    // Shopping Lab is a chain of nine agents that mostly work in silence (they read the stores one by one):
    // it is finished once all nine have started in the team graph and none is still working.
    members: 9,
    quietMs: 5000,
    stalledMs: 180_000,
    timeoutMs: 840_000,
    maxAnswers: 10,
  },
  // The report with its product cards is the point of this demo: the clip closes by reading down it.
  finale: { holdMs: 2000, stepMs: 1400, maxSteps: 7 },

  edit: {
    // Unlike Trip Planner, the clip opens on the home screen: picking a Solution is part of the story.
    startMarker: 'home',
    // The first agent asks several questions before the chain starts: that part is played faster.
    fastUntil: ['member:Query Planner', 2.2],
    // Each agent of the chain lighting up gets its moment at real speed.
    dwell: [['lead:', 1000], ['member:', 800]],
    targetMs: 27_000,
    // The report ends with its method and sources: the clip stops earlier, on the product cards.
    endAfter: ['finale', 9200],
    stills: [['report', 'finale', 1500], ['products', 'finale', 9000]],
  },
};
