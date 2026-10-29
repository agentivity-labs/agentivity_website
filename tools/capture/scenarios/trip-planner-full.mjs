// Trip Planner to the end: the same demo as trip-planner.mjs, recorded until the team has nothing left to do (the bookings
// and the payment confirmed), for the films that end on the result. The clip of the website stops earlier (trip-planner.mjs).
import base from './trip-planner.mjs';

export default {
  ...base,
  // One plain answer that fits every question asked in text, the confirmation of the payment included.
  openReply: 'Yes, please go ahead with your best picks.',
  end: {
    ...base.end,
    // Never "far enough" by count: the recording ends when the screen has been still for stalledMs, or at timeoutMs.
    specialists: 99,
    stalledMs: 120_000,
    timeoutMs: 720_000,
    maxAnswers: 24,
  },
  // The clip of the website (2026-10-29): about 22 seconds up to the recap, each card held a moment once chosen, then the
  // recap of the bookings at real speed, which the loop ends on.
  edit: {
    ...base.edit,
    targetMs: 22_000,
    dwell: [['lead:', 1200], ['specialist:', 1000], ['form:', 1200]],
    realFrom: 'end',
    endHoldMs: 3500,
    stills: [...base.edit.stills, ['recap', 'end', 1500]],
  },
};
