---
title: "What does an AI team really cost?"
description: "The three costs of an AI team: the software, the AI models and the machine. What makes the bill go up, how to keep it under control, and what to compare it with."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["cost", "AI agents", "explainer"]
lang: en
faq:
  - q: "Is Agentivity free?"
    a: "The Community edition is free, with no time limit, and runs on your own server. Hosted plans are coming, and their prices will be announced when they open. In both cases the AI models are paid separately, to the provider you choose."
  - q: "Why are AI models billed separately?"
    a: "Because Agentivity does not resell AI. You connect your own account with the provider you choose and pay them directly, at their price, with no margin added. You see exactly what you spend, and you can change provider."
  - q: "How can I know the cost before I start?"
    a: "Run the team on a handful of real cases and look at the spending in your provider's account. Multiply by your expected volume. A small test tells you more than any estimate."
  - q: "Can I set a spending limit?"
    a: "On the provider's side. AI providers let you set a budget, an alert or a monthly limit on your account, depending on the provider. Set one before you run a team on real volumes."
  - q: "Does a bigger team always cost more?"
    a: "In general, yes. Each member that works means more calls to AI models. That is why a team should be as small as the job allows, with cheaper models on routine steps."
---

An AI team has three costs: the software that runs it, the AI models it calls, and the machine it runs on. The software can be free. The models are billed by use, and that is the part that varies. The machine is small. The real question is what you compare the total with, and the honest answer is the hours of work the team gives back.

This guide goes through each cost, shows what makes the bill go up, and gives six ways to keep it under control. It contains no price list, on purpose: providers change their prices often, and a figure printed here would soon be wrong.

## The three costs at a glance

| Cost | What it is | How it is billed |
|---|---|---|
| The software | The platform where you build and run your teams | Free, or a subscription, depending on the edition |
| The AI models | The "brains" the agents call to read, reason and write | By use, by the AI provider |
| The machine | The computer or server the platform runs on | Yours, or included in a hosted plan |

## 1. The software

This is the platform: the place where you create agents, put them in teams, draw workflows and follow what they do.

With Agentivity, the Community edition costs nothing, with no time limit, and runs on your own server. Hosted plans, where nothing has to be installed, are on the way, and their prices will be announced when they open. The [pricing page](/pricing) lists the editions.

## 2. The AI models

This is the cost people know least, and the one that matters most.

Each time an agent reads something, reasons or writes, it calls an AI model. The provider of that model bills by the amount of text the model reads and the amount it writes. The unit is called a token, which is roughly a piece of a word. You do not need to count tokens. You need to know two things:

- **Reading costs, not only writing.** An agent that reads a forty-page contract to answer one question pays for the forty pages.
- **Models do not cost the same.** The most capable models cost many times more than the lighter ones, for the same amount of text.

With Agentivity you connect your own account with the provider you choose (OpenAI, Anthropic, Gemini, DeepSeek, xAI or AWS Bedrock) and you pay that provider directly. Agentivity adds no margin. The bill you receive is the provider's, so you can see exactly what was spent, and set a budget or an alert on your account.

## 3. The machine

The platform has to run somewhere.

With the Community edition, that is your machine: your own computer to try it, a server to share it with colleagues. The AI models do not run on it, they run at the provider's, so an ordinary machine is enough. With a hosted plan, running the platform is taken care of for you.

## What makes the bill go up?

Almost always one of these five.

**The number of members that work.** Each member called means at least one call to a model. A team of ten costs more to run than a team of three.

**The number of exchanges.** Some ways of working involve more back and forth. A discussion in several rounds, or a manager who checks and asks again, multiplies the calls. See [the five ways agents work together](/blog/how-ai-agents-work-together).

**The length of what is read.** Long documents, long histories, large web pages. This is often the largest part of the bill, and the least visible.

**The model chosen.** A top model on every member, including the one that only reformats a date, is the classic waste.

**Work done twice.** A member that fails and starts again, or a team run twice on the same case.

## Six ways to keep it under control

1. **Keep the team small.** Add a member only when a task clearly deserves its own specialist.
2. **Choose the model member by member.** In Agentivity each agent has its own model. Put a strong one where judgement matters, and a lighter one on routine steps.
3. **Give each member only what it needs to read.** The member that checks an amount does not need the whole file.
4. **Prefer the simplest way of working.** One after another is the cheapest. Use a discussion only when debate improves the result.
5. **Test small first.** Ten real cases tell you the cost per case. Multiply before you scale.
6. **Set a budget or an alert on the provider's side.** It turns a surprise into a notification.

## What should you compare the cost with?

With the time the team gives back.

A team that prepares in minutes what took a person three hours does not need to be free to be worth it. It needs to cost less than three hours of that person's time, and to leave that person free for work that needs them.

So measure both sides:

- **The cost per case**: what the provider billed, divided by the number of cases handled.
- **The time saved per case**: what the same work took before.

The Agentivity Studio shows, on its home screen, the number of executions and the time saved this week and this year. Put that next to your provider's bill, and you have your answer in your own figures.

## The costs people forget

Three are not on any invoice.

**Setting up.** Describing the roles well, testing on real cases, adjusting. Count a few hours for a first team, and less for the next ones.

**Reviewing.** A person still approves what matters. That time is part of the cost, and it is well spent. See [where a person should stay in charge](/blog/human-in-the-loop-ai).

**Maintaining.** Your process changes, a provider retires a model, a source moves. A team needs a little attention from time to time, like any tool.

## Is it cheaper to pay the provider yourself?

It is clearer, which is what makes it controllable.

Many tools include the AI in their subscription. That is convenient, but you cannot see what the AI part costs, and you cannot choose the model. When you connect your own provider account:

- you see the real cost, case by case;
- you choose the model, and you can change it when a better or cheaper one appears;
- you set your own budget or alert;
- the text you send goes to the provider you chose, under terms you can read.

The trade-off is that you have one more account to open. For most organisations, that is a small price for knowing where the money goes.

## In short

The software can be free, the machine is modest, and the AI models are billed by use. Keep the team small, choose the model member by member, test on ten cases, set a budget, and compare the cost per case with the time it saves. To see what each edition includes, read the [pricing page](/pricing). To see a team being built, go to [how it works](/how-it-works).
