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
    stalledMs: 60_000,
    timeoutMs: 720_000,
    maxAnswers: 24,
  },
};
