---
title: "Human in the loop: where a person should stay in charge"
description: "Human in the loop means AI stops and asks a person before certain steps. Where to put those stops, how to ask well, and the mistakes that make approval useless."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["human in the loop", "AI agents", "governance"]
lang: en
faq:
  - q: "What does human in the loop mean?"
    a: "It means an AI system stops at chosen points and waits for a person to approve, choose or correct before it continues. The AI does the preparation, and the person keeps the decision."
  - q: "Does human in the loop slow everything down?"
    a: "Only if the stops are badly placed. Stops belong where a mistake would be costly or cannot be undone. Routine steps run on their own, so the person's time goes to the few cases that deserve it."
  - q: "How does the question reach the person?"
    a: "Where the person already works. In Agentivity an approval can arrive in the app the person is using, by email, on Slack or in a form, and the work waits for the answer."
  - q: "Can I remove an approval step later?"
    a: "Yes. A sensible path is to approve everything at first, then only the doubtful cases once you have seen enough good results. Keep approval on anything that cannot be undone."
  - q: "Is human oversight required by law?"
    a: "For some uses, yes. In the European Union, the AI Act requires human oversight for high-risk uses, and the GDPR gives people rights over decisions made only by automated means. Ask your legal adviser how this applies to you."
---

Human in the loop means that an AI system stops at chosen points and waits for a person before going on. The AI prepares, the person decides. Done well, it is what makes AI usable for real work: the routine runs on its own, and a person's attention goes exactly where a mistake would matter.

This guide explains where those stops belong, how to ask a good question, and what makes approval a formality nobody reads.

## Why keep a person in the loop?

For three reasons that do not depend on how good the AI is.

**AI can be wrong with confidence.** It does not hesitate the way a person does when unsure. A stop at the right place catches the error before it leaves the building.

**Some decisions belong to people.** Rejecting a candidate, refusing a refund, signing off a payment. Someone must be able to answer for them.

**Trust is built case by case.** People accept a system they can correct. A system that acts alone is switched off after its first serious mistake.

## The three kinds of stop

Not every stop is an approval.

| Kind | The AI asks | Example |
|---|---|---|
| Approve | "Here is what I prepared. Shall I go ahead?" | Sending a reply to a customer |
| Choose | "Here are the options. Which one?" | Picking a hotel among three |
| Complete | "I am missing something. Can you help?" | A document that could not be read |

The third kind is the most overlooked, and one of the most useful. A system that says "I could not read this file" is far safer than one that guesses what the file contained.

## Where should the stops go?

Put a stop wherever the answer to one of these questions is yes.

**Can it be undone?** Sending a message, making a payment, publishing a page, deleting a record. If not, a person approves first.

**Does it affect someone?** A candidate, a customer, an employee. Decisions about people deserve a person.

**Does it commit money or the organisation?** A quote, an order, a contractual answer.

**Is the AI unsure?** A case that does not fit the usual pattern should go to a person rather than be forced into one.

**Is something missing?** Unreadable input, contradictory information, a question the instructions did not foresee.

## Where should there be no stop?

Everywhere else, and this matters just as much.

If a person must approve every step, the team saves no time, and the approvals stop being read. Gathering information, reading documents, comparing, drafting, formatting: these steps should run without interruption. Their result will be judged at the next stop anyway.

A useful test: if the person would say yes without looking, in ninety-nine cases out of a hundred, the stop is in the wrong place.

## What does it look like in practice?

Three real examples, from simple to strict.

**Choosing, in an app.** In the [Trip Planner example](/use-cases/trip-planner), a team of specialists plans a trip. It never books on its own initiative: the app shows the flights, the hotel, the transfers and the dinner, and the traveller chooses each one.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/trip-planner.jpg" width="1024" height="768">
<source src="/media/trip-planner.mp4" type="video/mp4" />
</video>
<figcaption>Trip Planner: the team proposes, the traveller chooses. Recorded from the product, played faster. Bookings and payment are simulated in this demonstration.</figcaption>
</figure>

**Confirming before the work starts.** In the [Shopping Lab example](/use-cases/shopping-lab), one member turns a vague wish into a precise brief and has the shopper confirm it before eight others start. A two-line confirmation avoids a long search in the wrong direction.

**Reviewing the doubtful cases.** In the [CV screening example](/use-cases/cv-screening), the clear cases are sorted, and the ones the workflow is not sure about go to a recruiter. The workflow also asks for help when it cannot read a document. More on this in [AI CV screening: how to keep a recruiter in charge](/blog/ai-cv-screening).

## How should the question reach the person?

Where that person already works, and without making them open one more tool.

In Agentivity an approval can arrive in four ways: in the app the person is using, by email, on Slack, or in a form. The work waits for the answer, then carries on from where it stopped.

Choose the channel by who must answer and how fast. A recruiter who reviews applications twice a day is well served by email. A team lead who must unblock something quickly is better served by Slack.

## What makes a good approval request?

A person should be able to decide in a few seconds, without opening anything else. A good request gives:

1. **What is proposed**, in one sentence.
2. **Why**, with the two or three facts that led there.
3. **What happens next** if the answer is yes.
4. **The choices**: approve, refuse, or correct.

Compare:

- *Weak:* "Please validate candidate 42."
- *Better:* "Proposed: reject. Reason: the role requires five years of experience in payroll, the CV shows one. Approve the rejection, send to interview instead, or review the CV."

The second one can be answered at a glance, and it can be disagreed with, which is the whole purpose.

## Four mistakes that make approval useless

**Rubber-stamping.** Too many requests, all alike, and people click yes without reading. Fewer and better requests solve it.

**Approving without the reasons.** A score or a verdict with no explanation cannot be checked. It can only be trusted or not.

**No way to correct.** If the only choices are yes and no, people say yes to avoid redoing the work themselves. Offer a way to adjust.

**Nobody in particular.** A request sent to "the team" belongs to no one. Each stop needs a named person, and someone who takes over when they are away.

## How do you loosen the loop over time?

Start strict, then relax where the results allow.

1. **Approve everything** for the first weeks. You learn where the system is reliable.
2. **Approve the doubtful cases only**, once the clear ones have proved right often enough.
3. **Check a sample** of what runs on its own, regularly, to see that it stays right.

Never relax the stops on what cannot be undone or on decisions about people. Those are not there because the AI is weak. They are there because someone must answer for the decision.

Keep a record as well. In Agentivity every step of an execution is recorded, so you can see what ran, when and why.

## A checklist before you go live

- Every irreversible action has an approval before it.
- Every decision about a person can be reviewed by a person.
- The system asks when input is missing or unreadable, instead of guessing.
- Each request says what is proposed, why, and what happens next.
- Each stop has a named owner and a backup.
- Routine steps run without interruption.

## In short

Human in the loop is not a brake on AI. It is what lets you hand over the routine with confidence: stops where a mistake would cost, none where it would not, and questions a person can answer in seconds. To see where the stops go when you build a team, read [how to build your first AI agent team](/blog/build-ai-agent-team-without-code), or [watch one being built](/how-it-works).
