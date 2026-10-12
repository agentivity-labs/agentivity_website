---
title: "Give an agent documents and a memory"
description: "Let an agent rely on your own documents, find the right passage in them, and remember the earlier messages of a conversation."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/agents/give-memory-and-knowledge.md. Do not edit here: edit the source and publish again. -->

An AI model knows general things. It does not know your company: your payment terms, your tone, your earlier exchanges. This page shows three ways to give an agent what it lacks.

| You want the agent to | Plug in | Diamond |
|---|---|---|
| Rely on your own documents | A knowledge source | 3, **Knowledge Sources** |
| Find the right passage in many documents | A memory | 2, **LLM Memory** |
| Remember the earlier messages of a conversation | A session | 5, **Agent Session** |

## What you need

- An agent with a model. See [Create an agent](/docs/agents/create-an-agent/).

## Give it documents

A knowledge source is a set of documents the agent can rely on. The nodes are in the **Node Catalog**, under **AI** > **Knowledge**.

| Node | Where the documents come from |
|---|---|
| **AI Knowledge (Inline)** | A text that you type in the node. |
| **AI Knowledge (File)** | A file, or the files of a folder, on the server. |
| **AI Knowledge (Web)** | One or several web addresses. It needs a web scraper node plugged into it. |
| **AI Knowledge (Sitemap)** | The pages listed in the sitemap of a website. |
| **AI Knowledge (RSS/Atom)** | The entries of a news feed. |
| **AI Knowledge (SQLite)**, **AI Knowledge (PostgreSQL)** | The result of a query on a database. For a developer. |

In our example, the `Reminder Writer` must follow the payment terms of the company.

1. Drag **AI Knowledge (Inline)** onto the canvas, below the agent.
2. Drag from its diamond to the third diamond of the agent, **Knowledge Sources**.
3. Right-click the node, select **Edit**, and fill in the documents.
4. Select **Apply**.

You can plug several knowledge sources into the same diamond.

A file path in **AI Knowledge (File)** is a path on the machine where Agentivity runs, inside its container. It is not a path on your own computer.

## Help it find the right passage

When the documents are long, the agent should not read everything for each request. A memory node finds the passages that fit the request, and gives only those to the agent.

The nodes are under **AI** > **Memory**. **Simple LLM Memory** works on your server and needs no account elsewhere. It uses a small model that Agentivity downloads from the internet, so the machine needs an internet connection for that download.

1. Drag **Simple LLM Memory** onto the canvas.
2. Drag from its diamond to the second diamond of the agent, **LLM Memory**.

An agent has one memory only.

In the window of the **AI Agent** node, the tab **Memory** has one setting: the number of passages given to the agent for each request. The value at the start is 3.

The other memory nodes of the catalogue keep the documents in a separate database, such as Qdrant, pgvector or Pinecone. They are for larger sets of documents and need that database.

## Let it remember the conversation

Without a session, an agent starts from nothing at each request. A session keeps the messages, so the agent can use what was said before.

The nodes are under **AI** > **Sessions**.

| Node | Where the conversation is kept |
|---|---|
| **AI Agent Session (Memory)** | In the memory of the server. It is lost when Agentivity restarts. |
| **AI Agent Session (File)** | In files on the server. It is kept when Agentivity restarts. |

1. Drag the session node onto the canvas.
2. Drag from its diamond to the fifth diamond of the agent, **Agent Session**.

In the window of the **AI Agent** node, the tab **Session Binding** says whether the agent reads the earlier conversation and whether it saves the new one. Both are on at the start.

## Save

Select **Publish**.

## How to know it worked

Run the agent with a request whose answer is only in your documents. For the `Reminder Writer`: ask for a reminder, and check that the e-mail gives your payment terms, as written in the knowledge source. See [Run an agent and read its answer](/docs/agents/run-an-agent/).

## Good to know

- What is in a knowledge source is sent to the AI model when the agent needs it. Do not put there what must not leave your server.
- Say in the instructions how the agent must use its documents. For example: "Follow the payment terms given in your documents. If they do not cover the case, say so."

## Next step

[Let an agent ask a person before it decides](/docs/agents/let-an-agent-ask-a-person/).
