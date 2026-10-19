---
title: "Give an agent knowledge and a memory"
description: "Let an agent rely on your own documents with a Knowledge Base, and remember the earlier messages of a conversation with a session."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/agents/give-memory-and-knowledge.md. Do not edit here: edit the source and publish again. -->

An AI model knows general things. It does not know your company: your payment terms, your tone, your earlier exchanges. This page shows the two ways to give an agent what it lacks.

| You want the agent to | Plug in | Diamond |
|---|---|---|
| Rely on your own documents | A **Knowledge Base** step | **Knowledge Bases** |
| Remember the earlier messages of a conversation | A **session** | **Agent Session** |

Other things look alike: a Data Table, a Vector Store, the instructions. See [Where each kind of information goes](/docs/introduction/where-does-it-go/) to choose.

## What you need

- An agent with a model. See [Create an agent](/docs/agents/create-an-agent/).

## Give it documents

A Knowledge Base reads your documents, your pages or your feeds, keeps them cut into passages, and lets the agent find the right passage by meaning. The agent does not read everything for each request: it asks, and receives only the passages that fit.

1. Create the base once, in **Resources** > **Knowledge Bases**. See [Create a Knowledge Base](/docs/knowledge-bases/create-a-knowledge-base/).
2. Plug it into the agent with the step **Knowledge Base**, on the diamond **Knowledge Bases**. See [Give a Knowledge Base to an agent or a prompt](/docs/knowledge-bases/give-a-knowledge-base-to-an-agent/).

In our example, the `Reminder Writer` must follow the payment terms of the company. They are in a base `Payment terms`.

You can plug several bases into the same agent.

## Let it remember the conversation

Without a session, an agent starts from nothing at each request. A session keeps the messages, so the agent can use what was said before.

The nodes are under **AI** > **Sessions**.

| Node | Where the conversation is kept |
|---|---|
| **AI Agent Session (In-Memory)** | In the memory of the server. It is lost when Agentivity restarts. |
| **AI Agent Session (File)** | In files on the server. It is kept when Agentivity restarts. |

1. Drag the session node onto the canvas.
2. Drag from its diamond to the diamond of the agent named **Agent Session**.

In the window of the **AI Agent** node, the tab **Session Binding** says whether the agent reads the earlier conversation and whether it saves the new one. Both are on at the start.

## Let it keep notes while it works

An agent can also keep notes of its own while it works: notes on a customer, what it learned. It does so with the **AI Agent Vector Store Tool**. This is not how you give it documents: for that, use a Knowledge Base. See [Keep texts and find them by meaning](/docs/workflows/keep-texts-and-find-them-by-meaning/).

## Save

Select **Publish**.

## How to know it worked

Run the agent with a request whose answer is only in your documents. For the `Reminder Writer`: ask for a reminder, and check that the e-mail gives your payment terms, as written in the base. See [Run an agent and read its answer](/docs/agents/run-an-agent/).

For a session, send a second request that refers to the first one ("the same customer, with the second invoice"). The agent must understand it.

## Good to know

- What an agent finds in a base is sent to the AI model when the agent needs it. Do not put in a base what must not leave your server.
- Say in the instructions how the agent must use its documents. For example: "Follow the payment terms given in your knowledge base. If they do not cover the case, say so."
- The old steps **AI Knowledge**, **LLM Memory**, **Text Splitter** and **OpenAI Memory** no longer exist. A document source is now the kind of source of a Knowledge Base.

## Next step

[Let an agent ask a person before it decides](/docs/agents/let-an-agent-ask-a-person/).
