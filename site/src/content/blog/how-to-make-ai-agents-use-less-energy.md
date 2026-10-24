---
title: "How to make your AI agents use less energy: 6 practical habits"
description: "Every call to an AI model uses energy. Six habits that cut the calls you do not need: the right model size, AI only where it helps, short context, work kept instead of redone."
pubDate: 2026-10-24
author: "Agentivity Team"
tags: ["climate", "AI agents", "workflows", "best practices"]
lang: en
---

Every time an AI agent thinks, a model runs somewhere in a data centre, and that uses energy. Nobody can tell you the exact figure for your own agents: it depends on the provider, the model, the length of what you send and what you get back.

What you can control is simpler: how many calls you make, to which model, with how much text. Most AI teams make far more of those calls than the job needs. Here are six habits that cut them, without making the work worse.

## 1. Use AI only where judgment is needed

A lot of what an AI team does is not judgment at all. Checking that a form is complete, comparing an amount with a limit, sending the result to the right person: these are fixed steps, and a rule does them better than a model.

**In practice:** draw those steps in a workflow, and put AI only in the steps that need it, such as reading a document or writing a reply. In Agentivity, a form, a condition, a loop or an approval runs without calling any model.

## 2. Choose the model size for each job

The largest model is not the right one for every task. Sorting a message into one of five categories, pulling a date out of an e-mail or rewriting a sentence are well within the reach of a smaller, faster model. Keep the large model for the steps where reasoning really matters.

**In practice:** connect more than one model, and let each agent run on the one that fits its job. A team can have a small model for the agent that sorts requests and a larger one for the agent that writes the analysis.

## 3. Send less text

A model reads everything you send it, every time. An agent that receives a whole 80-page policy to answer one question works much harder than one that receives the two paragraphs that matter.

**In practice:** put your documents in a knowledge base, so that the agent asks a question and receives only the few passages that fit, instead of the whole text. Keep instructions short and precise too: a clear page of instructions beats three pages of repetitions.

## 4. Keep the work instead of doing it again

An agent forgets everything when its execution ends. If the next execution needs the same facts, it will look for them, read them and summarise them again.

**In practice:** keep what was done in a table: the invoices already read, the customers already checked, the reports already written. The next execution looks up a row instead of redoing the work.

## 5. Get the instructions right before running at scale

A badly written instruction costs twice: the agent gives a poor answer, and someone runs it again. Multiply that by hundreds of executions a week.

**In practice:** try the instructions on a few saved examples first, compare the answers, and improve the text until it works. Then put the agent in production.

## 6. Let what is not used rest

Software that runs all night to wait for a request that comes once a day uses energy for nothing.

**In practice:** a hosted Agentivity workspace that nobody uses is put to sleep, and wakes up at the next visit. If you run Agentivity yourself, the same idea applies to your own machine.

## Where we stand

These habits make the biggest difference, because they act on the calls themselves. On our side, we also put **1% of our revenue toward removing carbon from the atmosphere**. It is a first step, and we do not claim it makes Agentivity, or the AI models it calls, carbon neutral.

[Read our climate commitment](/climate), or [see how a team and a workflow fit together](/workflows).
