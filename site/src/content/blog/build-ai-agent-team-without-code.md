---
title: "How to build your first AI agent team without code"
description: "A step-by-step guide to building a team of AI agents with no code: pick a job, describe each role in plain words, choose how they work together, test and adjust."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["no-code", "AI agents", "how-to"]
lang: en
faq:
  - q: "Do I need to know how to code?"
    a: "No. You build the team in the Agentivity Studio with names, plain-word descriptions and drag and drop. Installing the Community edition on a server does need someone comfortable with Docker."
  - q: "How long does a first team take?"
    a: "A first working version of a small team takes an afternoon. Most of that time goes into describing the roles and testing on real cases, not into the tool."
  - q: "How many agents should a first team have?"
    a: "Two or three. For example one that gathers, one that writes, one that checks. Add a member only when a task clearly deserves its own specialist."
  - q: "Which AI model should I choose?"
    a: "Start with one capable general model from the provider you already use, for every member. Once the team works, move the routine steps to a lighter, cheaper model."
  - q: "Can I reuse an agent in another team?"
    a: "Yes. An agent you created is available when you build other teams, so a good researcher or reviewer can serve in several of them."
---

You can build a team of AI agents without writing code, in six steps: pick one job, list the roles, describe each role in plain words, choose how the members work together, test on real cases, and decide where a person approves. The tool is the easy part. The quality of the team comes from how clearly you describe the work.

This guide follows those six steps in the Agentivity Studio, with one example from start to finish.

## What you need before you start

- **Agentivity.** The Community edition is free and runs on your own machine or server. [Installing it](/community) takes one command, on a machine that runs Docker. If that is not for you, hosted plans are on the way: [join the waitlist](/pricing#waitlist).
- **An account with an AI provider.** Agentivity connects to OpenAI, Anthropic, Gemini, DeepSeek, xAI and AWS Bedrock. You add your key once, in the Studio.
- **A job you know well.** This matters more than the two points above.

One caution with the Community edition: it has no login yet, so anyone who can reach the server can use it. Keep it on a network you trust, and never expose it directly to the internet.

## Step 1: Pick one job

Choose a job that:

- comes back every week;
- takes real time;
- you could explain to a new colleague in ten minutes;
- produces something you can judge at a glance.

Do not start with your most important process. Start with a useful, low-risk one.

**Our example:** every week, someone prepares a one-page note on what three competitors published. It takes about three hours of reading and writing.

## Step 2: List the roles

Ask yourself who you would hire if you could staff this job. Two or three roles are enough.

For the competitor note:

1. **A researcher** who reads each competitor's site and gathers what is new.
2. **A writer** who turns the findings into a one-page note.
3. **A reviewer** who checks the note against the findings and flags anything unsupported.

Each role does one thing. That is the point: a member with one clear responsibility makes fewer mistakes than one asked to do everything.

## Step 3: Create each agent

In the Studio, an agent is one AI specialist. You give it a name, then you describe its role.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/studio-agent.jpg" width="1418" height="770">
<source src="/media/studio-agent.mp4" type="video/mp4" />
</video>
<figcaption>Creating an agent in the Studio: a name, then its role in plain words. Recorded from the product, played faster.</figcaption>
</figure>

The role is where the work is. Write it the way you would brief a new colleague, and cover four things:

- **What it is responsible for.**
- **What it receives**, and from whom.
- **What it must hand back**, and in what form.
- **What it must not do.**

Here is a role for the researcher:

> You research what a competitor has published recently. You receive the name of a company and the address of its website. Read its news, blog and product pages. Report only what is new since last week: product changes, prices, announcements. For each item, give one sentence and the address of the page where you found it. If you find nothing new, say so. Never guess, and never report something you could not find on the site.

Notice what makes it work: it says what to read, what counts as a finding, the form of the answer, and what to do when there is nothing. The last sentence prevents the most common failure, which is an agent filling a gap with something plausible.

Then give the agent the tools it needs, here reading web pages, and choose its AI model.

## Step 4: Put them in a team

Create a team, name it, and choose how its members work together. The Studio offers five ways: one after another, all at the same time, by handing the case to the right colleague, by discussing in turns, or under a manager.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/studio-team.jpg" width="1418" height="770">
<source src="/media/studio-team.mp4" type="video/mp4" />
</video>
<figcaption>Creating a team: naming it, choosing the way of working, dragging in the members. Recorded from the product, played faster.</figcaption>
</figure>

For a first team, choose **sequential**: researcher, then writer, then reviewer. It is the easiest to follow, and when the result is wrong you can see at which step it went wrong.

Then drag your three agents into the team, in that order.

If you want to understand the other four, read [the five ways AI agents work together](/blog/how-ai-agents-work-together). You can change later without rebuilding the members.

## Step 5: Test on real cases

Run the team on a real case, and read what each member produced, not only the final note.

Three things to check:

- **Did each member do its own job?** If the writer starts researching, its role is not clear enough.
- **Is anything unsupported?** Compare a few statements in the note with the pages the researcher cited.
- **Is the form right?** Length, tone, order. If not, say so in the role, with an example.

When something is wrong, resist adding a member. Nine times out of ten the fix is a clearer sentence in an existing role. Change one thing, run again on the same case, compare.

Run at least five different cases before you trust it. A team that works on one example has not been tested.

## Step 6: Decide where a person approves

Before the team does real work, decide where it must stop and ask.

For the competitor note, a sensible rule is that the note is sent to the team only after a person has read it. Later, once you trust it, you may only review the notes where the reviewer flagged something.

The general rule: a person approves anything that goes out, costs money, or affects someone. [Where a person should stay in charge](/blog/human-in-the-loop-ai) goes through this in detail.

## Five mistakes to avoid

1. **Starting too big.** Ten members on day one, and nobody can tell which one is wrong.
2. **Vague roles.** "You are a marketing expert" tells an agent nothing. Say what it receives and what it hands back.
3. **Testing on one case.** One success proves little.
4. **The best model everywhere.** It raises the bill without improving routine steps. See [what an AI team really costs](/blog/ai-team-cost).
5. **No approval step.** The first time the team is confidently wrong, you will wish there had been one.

## What comes next?

Once your first team does its job, you have three directions.

- **Make it stricter.** If part of the job must be identical every time, draw that part as a workflow. A workflow can call your team as one of its steps. [Chatbot, agent, team or workflow](/blog/chatbot-agent-team-or-workflow) explains when to use which.
- **Share it.** Publish the team so colleagues can use it from the ready-made portal, with nothing to install on their side.
- **Put it behind an app.** When the experience matters, a team can sit behind an application that adapts to each person: a [VibeApp](/blog/what-is-a-vibeapp).

## In short

Pick one job you know, list two or three roles, describe each one as you would to a new colleague, start with members working one after another, test on five real cases, and decide where a person approves. To watch these steps before you try them, see [how it works](/how-it-works).
