---
title: "Questions about building and running"
description: "Short answers about the Assistant, agents, teams and workflows, about runs, and about what Agentivity does not do yet."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/faq/building-and-running.md. Do not edit here: edit the source and publish again. -->

Short answers about building in the Studio and running what you built.

## The Assistant

### What is the Assistant?

The part of the Studio where you describe what you need, and it builds an agent, a team or a workflow for you. It asks questions, shows a plan, and builds a draft that you review and save. See [Build your first team with the Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/).

### Is the Assistant in the Community edition?

Yes. It needs a connection to an AI model, which you set up once.

### Can the Assistant change something without asking me?

No. It works on a draft. Nothing is added to your workspace, and nothing in it is changed, until you save.

### Can I use it on something I already built?

Yes. Open the Assistant and choose to work on an existing one, or start it from the editor of your agent, team or workflow. It opens in a new conversation.

### Does it replace building by hand?

No. The Assistant is the fast way to a first version, to a change, or to a second opinion. What it builds is an ordinary agent, team or workflow, which you can open and change by hand.

### Is a first draft good enough to use?

Rarely as it is. Read the plan, look at the result, and try it on a real case, as you would with the work of a new colleague.

## Agents, teams and workflows

### Should I build an agent, a team or a workflow?

One clear job: an agent. Several skills, or work that another specialist must check: a team. The same steps every time, with rules and approvals: a workflow. See [Choose between an agent, a team and a workflow](/docs/introduction/agent-team-or-workflow/).

### How many agents can a team have?

There is no fixed limit. A team with many members is harder to follow and costs more for each request. Start with a few members, each with a clear role.

### Can a team use another team?

Yes. A member of a team can be an agent, another team or a workflow. See [Use a team or a workflow as a member](/docs/teams/put-a-team-in-a-team/).

### Can I reuse an agent in several teams?

Yes. An agent is built once and can be a member of several teams.

### How do I make sure a person approves before something is sent?

Put an approval step in a workflow: the workflow stops there every time. An agent can also ask before it decides, but it chooses when from its instructions. See [Ask a person to approve or answer](/docs/workflows/ask-a-person-to-decide/).

### My agent gives a different answer each time. Is that normal?

Yes, an AI model can vary. Clear instructions reduce it, and so does a low value of the creativity setting. Recent Claude models (from 4.7) ignore this setting: only the instructions then reduce the variation. For a rule that must always give the same result, use a fixed step in a workflow. See [Write the role and the instructions of an agent](/docs/agents/write-the-instructions/).

## Running

### How does a run start?

A person starts it in the Studio, or an application asks for it.

### Can a run start by itself, every morning for example?

Not yet. Starting runs on a schedule is planned.

### Can a run be started by an incoming e-mail?

Not today. A run starts from the Studio or from an application.

### Where do I see what happened?

In the tab **Execution** of the editor, and in the section **Executions** for the whole workspace. See [The Executions screen](/docs/studio/executions/).

### A run is waiting. What do I do?

It waits for the answer of a person. In **Executions** it has the label **ACTION REQUIRED**. Open it in its editor and answer in the tab **Execution**.

### The screens do not update, and the bar at the bottom says Realtime reconnecting.

The live connection between your browser and Agentivity is blocked. See [Fix a failed installation](/docs/guides/if-the-install-fails/).

## Sharing

### How do I give my work to a colleague?

As a Template: one file that holds the solution and everything it needs, except your keys. See [Share your work as a Template](/docs/guides/share-a-template/).

### How do people who are not builders use a solution?

Through a portal, or an application built for the job. See [One app for one job, or one portal for all](/docs/vibeapps/one-app-or-one-portal/).

## More questions

- [Common questions about Agentivity](/docs/faq/common-questions/)
- [Questions about the licence, security and editions](/docs/faq/licence-and-security/)
