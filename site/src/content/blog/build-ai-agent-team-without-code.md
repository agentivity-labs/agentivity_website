---
title: "How to Build an AI Agent Without Code (Step by Step)"
description: "Build an AI agent without code in five steps, then turn it into a team. A step-by-step guide with an AI agent builder, a real example and screenshots."
pubDate: 2026-10-10
updated: 2026-11-08
author: "Agentivity Team"
tags: ["basics", "teams"]
thumb: "/media/blog/thumbs/build-ai-agent-team-without-code.jpg"
lang: en
faq:
  - q: "What is an AI agent builder?"
    a: "An AI agent builder is a tool where you create an AI agent without writing code: you give it a role and instructions in plain words, connect its tools and knowledge, and choose the AI model it uses. Agentivity's Studio is one, and it also lets you put several agents together in a team."
  - q: "Do I need to code to build an AI agent?"
    a: "No. In a no-code AI agent builder you write the agent's instructions in plain words and connect its tools by drag and drop. Code is needed only if you choose a developer framework, or if you install the Community edition yourself, which needs someone comfortable with Docker."
  - q: "How many agents should a first team have?"
    a: "Start with one agent that does its job well. When the work clearly has separate parts, such as gathering, writing and checking, make it a team of two or three. Add a member only when a task deserves its own specialist."
  - q: "Which AI model should I choose?"
    a: "Start with one capable general model from the provider you already use. Once the agent works, you can move routine steps to a lighter, cheaper model."
  - q: "Can I reuse an agent in another team?"
    a: "Yes. An agent you created is available when you build other teams, so a good researcher or reviewer can serve in several of them."
---

To build an AI agent without code, you need three things: a job you know well, an account with an AI provider, and a no-code AI agent builder. The steps are always the same: pick the job, write the agent's instructions, give it tools and knowledge, choose its model, and test it on real cases.

This guide follows those steps in the Agentivity Studio with one example from start to finish. Then it goes one step further than most guides: when one agent is not enough, it turns the agent into a team.

## Three ways to build an AI agent

Before you start, it helps to know your options. There are three, and they suit different people.

### With a no-code AI agent builder

You create the agent in a visual tool. You write its role and instructions in plain words, connect its tools, and choose its model from a list. It is the fastest way to start, and the person who knows the work can do it themselves. The limit is that you work with what the tool offers.

### With a code framework

Code frameworks, such as CrewAI, LangGraph or AutoGen, give developers libraries to define agents, their tools and how they pass work to each other. They let a developer control every step. In return, a developer has to write, host and maintain the code, and build a screen if colleagues are to use the agent.

### With your own code

A developer calls an AI model directly and writes everything else: the loop, the tools, the memory, the checks. It gives the most control and takes the most work.

**Where Agentivity fits:** it is a no-code AI agent builder, the Studio, where you build agents and also teams of agents and workflows, in a workspace your colleagues share. Developers can still connect their own applications to what you build.

## What you need before you start

- **Agentivity.** A hosted plan starts with a 14-day trial, no card, and AI usage billed by your provider: [build your first team](/start). Or install the [Community edition](/community) on your own server with one command, on a machine that runs Docker.
- **An account with an AI provider.** Agentivity connects to the main providers, for example OpenAI, Anthropic or Google Gemini. You add your connection once, in the Studio.
- **A job you know well.** This matters more than the two points above.

One caution with the Community edition: it has no sign-in yet, so anyone who can reach the server can use it. Keep it on a network you trust, and never expose it directly to the internet.

## Step 1: Pick one job

Choose a job that:

- comes back every week;
- takes real time;
- you could explain to a new colleague in a few minutes;
- produces something you can judge at a glance.

Do not start with your most important process. Start with a useful, low-risk one.

**Our example:** every week, someone reads what a few competitors published and writes a one-page note about it. It takes hours of reading. We start with one agent that does the reading.

## Step 2: Write the agent's role and instructions

In the Studio, select **New**, then **Agent**, and give it a name: `Competitor Researcher`. An agent is one AI specialist. If you want the difference between an agent, a chatbot and a workflow first, read [chatbot, agent, team or workflow](/blog/chatbot-agent-team-or-workflow).

The agent has two texts. The **role** is one or two sentences on what it is good at. The **instructions** are where the work is. Write them the way you would brief a new colleague, and cover four things:

- **What it is responsible for.**
- **What it receives**, and from whom.
- **What it must hand back**, and in what form.
- **What it must not do.**

Here are the instructions of our researcher:

> You research what a competitor has published recently. You receive the name of a company and the address of its website. Read its news, blog and product pages. Report only what is new since last week: product changes, prices, announcements. For each item, give one sentence and the address of the page where you found it. If you find nothing new, say so. Never guess, and never report something you could not find on the site.

<figure>
<img src="/media/blog/build-ai-agent/agent-instructions.jpg" width="1600" height="801" alt="The AI Agent window of Competitor Researcher in the Studio, with its system instructions written in plain words." />
<figcaption>The instructions of the agent, in plain words. Demo workspace.</figcaption>
</figure>

Notice what makes it work: it says what to read, what counts as a finding, the form of the answer, and what to do when there is nothing. The last sentence prevents the most common failure: an agent filling a gap with something that sounds right.

**A faster way in:** the Studio's Assistant can build the agent for you. You describe what you need, it asks a few questions, shows a plan and builds a draft. Nothing is added to your workspace until you save. The steps below still help you judge and improve what it builds.

## Step 3: Give it tools and knowledge

By itself, an agent can only read and write text. Tools let it do more: read a web page, read a document, compute, know the date, read and fill a table. The agent decides when to use a tool, from the request and its instructions.

Our researcher needs one tool: one that reads a web page. In the Studio, you drag it onto the canvas and link it to the agent.

<figure>
<img src="/media/blog/build-ai-agent/agent-tools.jpg" width="1600" height="801" alt="Competitor Researcher on the Studio canvas, linked to its model, a web page reader tool and its session memory." loading="lazy" />
<figcaption>The researcher with its model, a tool that reads web pages, and its memory. Demo workspace.</figcaption>
</figure>

Knowledge is different from tools. A Knowledge Base holds your own documents, for example a sheet describing your own products, so the agent can search them when it needs to. Give an agent only what its job requires: every extra tool is one more thing it can misuse.

## Step 4: Choose its model

The model is the AI that does the thinking. Add the model of your provider, link it to the agent, and choose your connection.

Start with one capable general model. Once the agent works, you can try a lighter, cheaper one for routine jobs. See [what an AI team really costs](/blog/ai-team-cost).

## Step 5: Test it on real cases

Run the agent on a real case, and read the whole answer. Three things to check:

- **Did it do only its job?** If it starts writing opinions, its instructions are not clear enough.
- **Is anything unsupported?** Open a few of the pages it cited and compare.
- **Is the form right?** Length, tone, order. If not, say so in the instructions, with an example.

When something is wrong, the fix is usually a clearer sentence in the instructions. Change one thing, run it again on the same case, and compare. Then try several different cases before you trust it: an agent that works on one example has not been tested.

## When one agent is not enough: make it a team

Our researcher now finds what is new. But the job was a one-page note, checked before it goes out. You could add all of that to the researcher's instructions, and many guides stop there. It works less well: an agent asked to do everything makes more mistakes than one with a single, clear responsibility.

So we add two members, each with its own instructions:

1. **A writer** who turns the findings into a one-page note.
2. **A reviewer** who checks the note against the findings and flags anything unsupported.

In the Studio, select **New**, then **Team**, and name it `Competitor Note`. The Studio asks how the members will work together. There are five ways: one after another, all at the same time, handing the case to the right colleague, discussing in turns, or under a manager. [The five ways AI agents work together](/blog/how-ai-agents-work-together) explains each one.

For a first team, choose **Sequential**: researcher, then writer, then reviewer. It is the easiest to follow, and when the result is wrong you can see at which step it went wrong. Drag the three agents onto the canvas, in that order, and publish.

<figure>
<img src="/media/blog/build-ai-agent/team-sequential.jpg" width="1600" height="801" alt="The Competitor Note team in the Studio: three agents, researcher, writer and reviewer, joined one after another, with the Sequential label." loading="lazy" />
<figcaption>The same researcher, now the first member of a team. Demo workspace.</figcaption>
</figure>

Test the team the way you tested the agent, but read what each member produced, not only the final note. If the writer starts researching, its instructions are not clear enough. You can change the way of working later without rebuilding the members.

## Human in the loop: decide where a person approves

Before the team does real work, decide where it must stop and ask a person. This is called human in the loop.

For the competitor note, a sensible rule is that the note goes to your colleagues only after a person has read it. In the Studio, you give the reviewer a chat channel and write in its instructions when to ask. The execution waits for the answer, then goes on.

<figure>
<img src="/media/blog/build-ai-agent/approval.jpg" width="1600" height="801" alt="An execution of the Competitor Note team: the reviewer has checked the note and asks &quot;The note is ready. Can it go to the team?&quot;, waiting for the answer." loading="lazy" />
<figcaption>The team stops and asks before the note goes out. Demo workspace, with an invented competitor.</figcaption>
</figure>

The general rule: a person approves anything that goes out, costs money, or affects someone. [Human in the loop: where a person should stay in charge](/blog/human-in-the-loop-ai) goes through this in detail.

## Five mistakes to avoid

1. **Starting too big.** Many members on day one, and nobody can tell which one is wrong. Start with one agent.
2. **Vague instructions.** "You are a marketing expert" tells an agent nothing. Say what it receives and what it hands back.
3. **Testing on one case.** One success proves little.
4. **The most powerful model everywhere.** It raises the bill without improving routine steps.
5. **No approval step.** The first time the team is confidently wrong, you will wish there had been one.

## What comes next?

Once your agent or team does its job, you have three directions.

- **Make it stricter.** If part of the job must be identical every time, draw that part as a workflow. A workflow can call your team as one of its steps.
- **Share it.** Mark the team as a Solution, and your colleagues can use it from the [Desk](/desk), with nothing to build on their side.
- **Put it behind an app.** When the experience matters, a team can sit behind an application that adapts to each person: a [VibeApp](/blog/what-is-a-vibeapp).

## In short

To build an AI agent without code: pick one job you know, write its instructions as you would brief a new colleague, give it only the tools and knowledge it needs, choose its model, and test it on real cases. When the job has separate parts, turn the agent into a small team, members working one after another, and decide where a person approves. For the detailed steps in the product, see [create an agent](/docs/agents/create-an-agent/) in the docs.
