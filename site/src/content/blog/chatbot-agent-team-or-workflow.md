---
title: "Chatbot, agent, team or workflow: which one do you need?"
description: "A chatbot answers, an agent does a task, a team shares a job, a workflow follows a fixed path. How to tell them apart and choose the right one for your work."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["AI agents", "chatbot", "workflow", "explainer"]
lang: en
faq:
  - q: "What is the difference between a chatbot and an AI agent?"
    a: "A chatbot answers what you ask, in text. An AI agent is given a role and tools, and works towards a result: it looks things up, reads documents, checks, and delivers something you can use."
  - q: "When do I need a team instead of one agent?"
    a: "When the job has distinct parts that need different know-how, when one part should check another, or when the steps depend on the request. For a single well-defined task, one agent is enough."
  - q: "Is a workflow better than a team?"
    a: "Neither is better. A workflow follows the path you drew, identically each time, which suits processes that must be consistent. A team decides its own path, which suits work where each request is different."
  - q: "Can I combine a workflow and a team?"
    a: "Yes. A common set-up is a workflow with a team as one of its steps: the workflow guarantees the overall process, and the team handles the part that needs judgement."
  - q: "Do any of these need code?"
    a: "Not in Agentivity. Agents, teams and workflows are all built in the Studio, with names, plain-word descriptions and drag and drop."
---

A chatbot answers a question. An agent does a task. A team shares a job between several specialists. A workflow follows a path you drew, the same way every time. They are four different tools, and most disappointments with AI at work come from using one where another was needed.

This guide tells them apart in plain words and helps you choose.

## The four at a glance

| | What it does | You get | Use it when |
|---|---|---|---|
| Chatbot | Answers what you ask | Text to read | You need an answer or a first draft |
| Agent | Carries out one task with tools | A result you can use | The task is well defined and repeats |
| Team | Shares a job between specialists | A finished piece of work | The job has several parts and varies |
| Workflow | Follows a fixed path, step by step | The same process every time | Consistency matters more than flexibility |

## What is a chatbot?

A chatbot is one AI model that replies to what you type. You ask, it answers, and what you do with the answer is up to you.

It is very good at explaining, summarising, rewriting and getting you started on a blank page. Its limit is that the work stays with you: you copy the answer, check it, paste it somewhere, and come back with the next question. Ten steps of a job mean ten exchanges, with you in the middle of each.

**Choose a chatbot when** you want help thinking or writing, one question at a time.

## What is an AI agent?

An agent is an AI model that has been given a job. Three things make the difference:

- **a role**, described in plain words, the way you would brief a new colleague;
- **tools** it may use: search the web, read a document, send an email, write a file;
- **a goal**: what it must deliver.

Where a chatbot answers, an agent works towards a result. An agent in charge of supplier invoices does not explain how to check an invoice. It reads the invoices you give it, files each one, checks the figures and reports the totals.

**Choose an agent when** the task is single, well defined and comes back often.

## What is a team of agents?

A team is several agents, each with its own role, and a rule for how they work together. One job, shared between specialists.

Planning a trip is a good example. One agent would have to master flights, hotels, transfers, restaurants, visas and budgets at once. A team splits that: a manager reads the request and hands each part to a specialist, and each specialist does one thing and reports back.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/team-manager.jpg" width="546" height="680" style="max-width: 440px;">
<source src="/media/team-manager.mp4" type="video/mp4" />
</video>
<figcaption>A manager handing work to specialists and collecting their answers. Recorded from the product.</figcaption>
</figure>

A team also adapts. The manager decides which specialists a request needs, so two different requests do not go through the same steps.

**Choose a team when** the job has distinct parts, when one part should check another, or when each request is a little different. There are [five ways a team can be organised](/blog/how-ai-agents-work-together).

## What is a workflow?

A workflow is a path drawn in advance, box by box: do this, then that, if this condition holds go here, otherwise go there. It runs the same way every time.

Some of its boxes can use AI, such as reading a document or assessing a text. Others are plain logic: a condition, a calculation, a pause to ask a person.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/cv-screening.jpg" width="1418" height="770">
<source src="/media/cv-screening.mp4" type="video/mp4" />
</video>
<figcaption>A workflow in the Agentivity Studio: the CV Screening example, first up close, then in full. Recorded from the product.</figcaption>
</figure>

Its strength is predictability. In the [CV screening example](/use-cases/cv-screening), every application goes through the same steps against the same criteria, and you can show afterwards which path each one took.

**Choose a workflow when** the process must be identical for everyone, and when you need to be able to explain what happened.

## Team or workflow: how do you decide?

This is the choice people hesitate over most. One question settles it: **who decides what happens next?**

In a workflow, you decided, when you drew it. The path is fixed.

In a team, the team decides, within the roles you gave it. The path depends on the request.

So:

- **Same steps every time, and fairness or audit matters:** workflow. Screening CVs, processing a form, checking a document against rules.
- **Steps that depend on the request:** team. Planning, researching, advising, handling requests with exceptions.

## Can you mix them?

Yes, and it is often the best answer.

A workflow can have a team as one of its steps. The workflow guarantees the overall process: receive the request, check it is complete, hand it over, ask for approval, send the result. The team handles the one step that needs judgement.

You get the predictability of a workflow where you need it, and the flexibility of a team where it helps.

## And where does an app come in?

An agent, a team or a workflow does its work on a server. How people reach it is a separate choice.

Much of the time no app is needed: you start it, it works, and it reaches you by email, on Slack or in a form when a decision is yours. When the experience matters, a team can sit behind an application that adapts to each person. We call that a [VibeApp](/blog/what-is-a-vibeapp).

## A quick way to choose

Go down this list and stop at the first "yes".

1. **Do you only need an answer or a draft?** A chatbot.
2. **Is it one clear task that repeats?** An agent.
3. **Must it run identically every time?** A workflow.
4. **Does it have several parts, or change with each request?** A team.
5. **Does it need both a fixed process and some judgement?** A workflow with a team inside.

If you hesitate between two, start with the simpler one. An agent that does one task well is a better beginning than a team you cannot follow.

## What they have in common

Whichever you choose, two things hold.

**A person stays in charge.** A well-built agent, team or workflow stops and asks when a decision belongs to a person. Where those stops go is yours to decide: see [where a person should stay in charge](/blog/human-in-the-loop-ai).

**The result depends on the brief.** A vague role gives vague work, exactly as it would with a new colleague. Time spent describing the job clearly is never wasted.

## In short

Use a chatbot for answers, an agent for a task, a team for a job with several parts, and a workflow for a process that must not vary. Mix a workflow and a team when you need both. You can [see an agent, a team and a workflow being built](/how-it-works) in three short clips, without a line of code.
