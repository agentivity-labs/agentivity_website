---
title: "What the Community edition includes"
description: "What you get in the free Agentivity Community edition, what is not in it, what is planned, and what the licence allows."
sidebar:
  order: 7
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/introduction/what-the-community-edition-includes.md. Do not edit here: edit the source and publish again. -->

The Community edition is the edition of Agentivity that you install yourself, on your own machine or server. It is free of charge. This page says what is in it and what is not.

## What is included

- **The Studio**, the visual editor in your browser.
- **The Assistant**, which builds an agent, a team or a workflow from your description.
- **Agents**, each with its role, its instructions and its model.
- **Teams**, with the five ways of working together: Sequential, Concurrent, Handoff, Group Chat and Manager-led. A member of a team can be another team or a workflow.
- **Workflows**, with conditions, loops, steps that wait for a person, and AI steps.
- **Data Tables**, to store what your agents and workflows read and fill.
- **Knowledge Bases**, to give your agents your documents, pages and feeds. Eight kinds of source are offered, among them files of the server, web pages and a SQLite or PostgreSQL database. The search runs on your server, with a small local model, and needs no account.
- **Vector Stores**, to keep texts and find them by meaning: one that is free and lasts an execution, and three that keep texts (Qdrant, Pinecone, pgvector).
- **Prompt Studio**, to write and test prompts.
- **Templates**: you can import a solution from a file, and save your own work as a file to share.
- **Folders**, to keep your agents, teams, workflows and tables in order.
- **A catalogue of more than one hundred nodes** for workflows and agents: AI models, tools, web search, storage, messages, and more.

The four showcase solutions are offered as Templates. They are downloaded from the Agentivity catalogue when you import them, so the machine needs an internet connection.

## What is not included

- **Versions.** Keeping earlier versions of a workflow, a table or a Knowledge Base, and going back to one, is not in the Community edition.
- **Plugins.**
- **Login, accounts and roles.** There is no login. One installation is one shared workspace: anyone who can reach the server can use everything on it. So there are no people, groups, roles or spaces, no Administration panes for them, and no audit journal.
- **Keys for a website** (publishable keys) and **Monitoring** to your own collector.
- **Limits.** The Community edition has no cap on executions, but it is for one person and one space.

## Hosted workspaces

If you do not want to install anything, a hosted workspace has sign-in, people, roles, spaces and an area of Administration, with the plan you choose. See [Start a hosted workspace](/docs/hosted/start-a-hosted-workspace/) and [Plans and their limits](/docs/hosted/plans-and-limits/).

## What is planned

- **Starting executions on a schedule.**

For the other editions and what each one is for, see [pricing and editions](/pricing).

## What the licence allows

The core of Agentivity is source available, under the [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license). In short:

- **You may** use it for your own business, in production, free of charge. You may read the source and modify it.
- **You may not** offer Agentivity to other people as a hosted or managed service.
- **You may not** remove or hide the licence and copyright notices.

This summary does not replace the licence. If your situation is not clear, for example if you run Agentivity for your clients on your own servers, ask before you start.

The Studio is delivered inside the Docker image in compiled form.

## What you bring yourself

- A machine or a server that runs Docker.
- An AI model from a provider, with your own API key. The provider bills you for what your agents use.

## Next step

[The words Agentivity uses](/docs/introduction/words-we-use/), then [Install Agentivity with Docker](/docs/getting-started/install-community/).
