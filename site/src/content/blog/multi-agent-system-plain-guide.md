---
title: "What is a multi-agent system? A plain-words guide"
description: "A multi-agent system is a team of AI specialists that share one job. How it works, the five ways agents collaborate, and when a single agent is enough."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["AI agents", "multi-agent", "explainer"]
lang: en
draft: true
faq:
  - q: "Is a multi-agent system the same as agentic AI?"
    a: "Agentic AI is the broad idea of AI that acts to reach a goal instead of only answering. A multi-agent system is one way to do it: several AI agents, each with a role, working as a team."
  - q: "How many agents does a team need?"
    a: "As few as the job allows. Two or three is a good start: one that does the work and one that checks it, or a manager and two specialists. Add a member only when a task clearly deserves its own specialist."
  - q: "Do I need to code to build a multi-agent system?"
    a: "Not with a no-code platform. In Agentivity you create each agent by naming it and describing its role in plain words, then you drag agents into a team and choose how they work together."
  - q: "Can each agent use a different AI model?"
    a: "Yes. In Agentivity you choose the model for each agent, among OpenAI, Anthropic, Gemini, DeepSeek, xAI and AWS Bedrock. A demanding task can use a stronger model and a routine one a cheaper model."
  - q: "Does a multi-agent system work without people?"
    a: "It can run on its own for routine work, but a well-built team stops and asks when a decision belongs to a person. Deciding where those stops are is part of building the team."
---

A multi-agent system is a team of AI specialists that share one job. Instead of asking one AI to do everything, you give each specialist a role, and you decide how they work together. It is the same idea as a team of people: a job gets done better by several focused colleagues than by one person doing everything at once.

This guide explains the idea without jargon: what an agent is, why several work better than one, the five ways they can collaborate, and when you do not need a team at all.

## What is an AI agent?

An AI agent is an AI model that has been given a job. Three things turn a general-purpose model into an agent:

- **A role.** A description, in plain words, of what it is responsible for, the way you would brief a new colleague.
- **Tools.** What it is allowed to use: searching the web, reading a document, sending an email, writing a file.
- **A goal.** What it must deliver, and to whom.

A chatbot answers a question. An agent works towards a result: it reads, looks things up, checks, and tries again until the job is done or until it needs to ask.

## What makes a system "multi-agent"?

Several agents, each with its own role, and a rule for how they work together.

Take a team that plans a trip. One agent would have to know flights, hotels, transfers, restaurants, visas, insurance and budgets, all at once. A team splits that: a manager reads the request and hands each part to a specialist, and each specialist does one thing and reports back.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/team-manager.jpg" width="546" height="680" style="max-width: 440px;">
<source src="/media/team-manager.mp4" type="video/mp4" />
</video>
<figcaption>A manager handing work to specialists and collecting their answers. Recorded from the product.</figcaption>
</figure>

That is a real example: the [Trip Planner team](/use-cases/trip-planner) has thirteen members, and only the manager talks to all the others.

## Why use several agents instead of one?

For the same reasons you would not hire one person to be your accountant, your lawyer and your designer.

- **Focus.** An agent with one clear role makes fewer mistakes than one with twenty instructions pulling in different directions.
- **Checkability.** When each step belongs to one member, you can see who did what, and find where something went wrong.
- **The right model for each task.** A demanding analysis can use a stronger AI model, and a routine step a cheaper one.
- **Reuse.** A good specialist, once built, can serve in several teams.

There is a cost. More agents means more exchanges with AI models, so more time and more spend. A team should be as small as the job allows.

## The five ways agents work together

How the members collaborate matters as much as who they are. These are the five ways of working you can choose from in the Agentivity Studio.

| Way of working | In plain words | A good fit for |
|---|---|---|
| Sequential | One after another | A fixed chain: research, then draft, then review |
| Concurrent | All at the same time | Independent tasks: reading five sources at once |
| Handoff | Each passes the case to the right colleague | Requests that must reach the right specialist |
| Group chat | They discuss in turns | Questions that benefit from several points of view |
| Manager-led | A manager plans and hands out the work | Jobs where the steps depend on the request |

### Sequential: one after another

The simplest. The first agent finishes and passes its work to the second, and so on. It is predictable and easy to follow. Use it when the order of the steps never changes.

### Concurrent: all at the same time

Several agents work in parallel on separate parts, and their results are brought together at the end. Use it when the parts do not depend on each other, and when speed matters.

### Handoff: passing the case along

An agent that receives a request it should not handle passes it to the colleague who should, the way a receptionist sends you to the right department. Use it when requests arrive mixed and need to find their specialist.

### Group chat: a discussion in turns

The agents speak in turns, each one reacting to what the others said. Use it when a question gains from being challenged: a plan, a diagnosis, a piece of writing.

### Manager-led: a manager plans the work

A manager reads the request, decides which specialists are needed, hands out the work and assembles the result. Use it when no two requests need exactly the same steps. This is how Trip Planner works: a weekend away and a month abroad do not call on the same specialists.

## Where do people fit in?

At every point where a decision is theirs.

A well-built team does not decide everything on its own. It stops and asks: which hotel, whether this invoice is a duplicate, whether this candidate goes forward. The question can arrive in the app the person is using, by email, on Slack or in a form, and the team waits for the answer before going on.

Choosing those stops is part of the design. Too many, and the team saves no time. Too few, and it makes choices it should not make.

## When is one agent enough?

Often. A team is not always the right answer.

One agent is enough when the job is a single, well-defined task: reading invoices and checking their figures, summarising a document, answering questions from a known set of information. Adding members to a job like that adds cost without adding quality.

Move to a team when the job has distinct parts that need different know-how, when one part should check another, or when the steps depend on the request.

## Team or workflow?

They solve different problems, and you can mix them.

A **workflow** follows the path you drew, the same way every time. It suits processes that must be consistent and easy to audit. The [CV screening example](/use-cases/cv-screening) is a workflow: every CV goes through the same steps.

A **team** decides its own path, within the roles you gave it. It suits work where each request is different.

A common mix is a workflow with a team as one of its steps: the workflow guarantees the overall process, and the team handles the part that needs judgement.

## How do you start?

1. **Pick one repetitive job** that takes real time each week and that you know well.
2. **Write down who would do it** if you could hire for it: two or three roles are enough to begin.
3. **Build those roles as agents**, describing each one in plain words.
4. **Choose how they work together.** If in doubt, start sequential: it is the easiest to follow.
5. **Decide where a person approves**, then run it on real cases and adjust.

[How it works](/how-it-works) shows these steps in the Agentivity Studio, in three short clips. When the team is ready, you can also put it behind an application: that is what we call a [VibeApp](/blog/what-is-a-vibeapp).
