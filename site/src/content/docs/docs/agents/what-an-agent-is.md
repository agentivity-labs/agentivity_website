---
title: "What an agent is made of"
description: "An agent is one AI specialist. Its role, its instructions, its model, and the seven things you can plug into it, such as tools and knowledge."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/agents/what-an-agent-is.md. Do not edit here: edit the source and publish again. -->

An agent is one AI specialist with a role. This page explains what an agent is made of, so that the other pages of this section are easier to follow.

In these pages, the example is an agent named `Reminder Writer`. It writes a polite payment reminder for a customer who has not paid an invoice.

## The three things every agent needs

| Part | What it is | Where you set it |
|---|---|---|
| **Role** | One or two sentences on what the agent is good at. A team reads it to decide when to use this agent. | The panel **Info** of the editor. |
| **Instructions** | What the agent must do and how, in plain words. | The window of the **AI Agent** node, field **System instructions**. |
| **Model** | The AI model the agent thinks with. | A model node, linked to the agent. |

See [Create an agent](/docs/agents/create-an-agent/).

## What an agent looks like in the Studio

In its editor, an agent is drawn as one large box, **AI Agent**, with a row of seven diamonds under it. Each diamond is a place where you plug something into the agent. What you plug in is drawn as a circle, linked to the diamond by a dotted line.

## The seven diamonds, from left to right

| # | Name | What you plug in | Needed? |
|---|---|---|---|
| 1 | **LLM Model** | The AI model of the agent. One only. | Yes |
| 2 | **Knowledge Bases** | The documents the agent relies on, each with a **Knowledge Base** step. Several are possible. See [Give an agent knowledge and a memory](/docs/agents/give-memory-and-knowledge/). | No |
| 3 | **Human Loop Channel** | The way the agent reaches a person when it needs an answer. One only. | No |
| 4 | **Agent Session** | A place to keep the conversation, so the agent remembers what was said before. One only. | No |
| 5 | **AI Agent Tools** | Tools the agent can use: a calculator, a web search, a data table. Several are possible. | No |
| 6 | **AI Agent Policies** | Rules applied to the way the agent runs. | No |
| 7 | **AI Agent Guardrails** | Checks on what goes in and out of the agent, for example to block a word. | No |

To choose between instructions, a Data Table, a Knowledge Base, a session and a Vector Store, see [Where each kind of information goes](/docs/introduction/where-does-it-go/).

An agent with a model and good instructions is already useful. Add the rest only when the job needs it.

## How an agent works: the execution mode

The window of the **AI Agent** node has a setting, **Agent execution mode**. It has three values:

| Mode | How the agent works |
|---|---|
| **Tools** | It answers, and it may call the tools you plugged in, choosing which one to use. This is the default. |
| **Conversational** | It answers directly from the conversation, without using any tool. |
| **ReAct** | It thinks, uses a tool, looks at the result, and repeats until it can answer. |

## Where an agent is used

- **Alone.** You open it and give it a task. See [Run an agent and read its answer](/docs/agents/run-an-agent/).
- **In a team.** It becomes a member, next to other agents. See [Create a team of agents](/docs/teams/create-a-team/).
- **In a workflow.** It becomes one step among fixed steps. See [Add an AI step to a workflow](/docs/workflows/add-an-ai-step/).

## Next step

[Create an agent](/docs/agents/create-an-agent/).
