---
title: "Where each kind of information goes"
description: "Instructions, Prompts, Data Tables, Knowledge Bases, sessions and Vector Stores: what each one is for, how an agent gets it, and how long it is kept."
sidebar:
  order: 9
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/introduction/where-does-it-go.md. Do not edit here: edit the source and publish again. -->

An agent can be given six kinds of things. They look alike, and people mix them up. This page says which one to use for what.

## The comparison

| You want the agent to… | Where it goes | How the agent gets it | How long it is kept |
|---|---|---|---|
| Always follow some rules, a tone, a role | **Its instructions**, in the window of the AI Agent | It reads them at every request | As long as the agent |
| Have instructions written and tried before | **The Prompts library**, in Prompt Studio | It does not read it. You copy the result into its instructions | As long as the Prompt |
| Look up or change facts kept in rows: prices, stock, orders, customers | **A Data Table** | A **Data Table** tool | Until the rows are changed |
| Know your texts: policies, guides, manuals, a website, a feed, the rows of a database seen as texts | **A Knowledge Base** | The **Knowledge Base** step, on the diamond **Knowledge Bases**. The agent searches by meaning | Kept, and kept up to date from its source |
| Remember the earlier messages of a conversation | **An Agent Session** | The diamond **Agent Session** | **In-Memory**: until the server restarts. **File**: kept |
| Keep texts while it works and find them again by meaning: notes, what it learned | **A Vector Store** | The **AI Agent Vector Store Tool**, or a **Vector Store** step in a workflow | **In-Memory**: the time of one run. **Qdrant**, **Pinecone**, **pgvector**: kept |

## An example, with the agent Reminder Writer

The agent `Reminder Writer` writes a payment reminder to a customer.

| What the agent needs | Where it goes |
|---|---|
| "Write a short, polite e-mail. Say the invoice, the amount and the date it was due." | Its **instructions** |
| The open invoices of the company: customer, number, amount, due date | A **Data Table** `invoices` |
| The payment terms and the reminder policy of the company, written as texts | A **Knowledge Base** `Payment terms` |
| What was said earlier with the person who is asking, in this conversation | An **Agent Session** |
| A note the agent wants to keep: "Northgate Bakery prefers to be called before 10" | A **Vector Store**, with the **AI Agent Vector Store Tool** |

## Which one?

### Knowledge Base or Data Table

- A **Data Table** holds **rows**: the same fields for each line. The agent looks up a value, or changes it. "What does invoice INV-2041 amount to?"
- A **Knowledge Base** holds **texts**. The agent finds the passage whose meaning fits. "What do our terms say about a late payment?"

If it fits in columns, use a table. If it is prose, use a base. A base can also read the rows of a database, but it turns them into texts: the agent finds them by meaning, and cannot change them.

### Knowledge Base or Vector Store

- A **Knowledge Base** is **what the agent must know**. You prepare it, it reads a source, and it stays up to date.
- A **Vector Store** is **what the agent collects while it works**: notes, answers found earlier. Something puts texts in it, a step or the agent itself, and something finds them later.

A Vector Store is never the way to give an agent its knowledge. Give it a Knowledge Base.

### Agent Session or Vector Store

- An **Agent Session** keeps **the conversation**, message by message, so that the agent remembers what was said just before.
- A **Vector Store** keeps **texts found by meaning**, whenever they were put there, whatever the conversation.

### Instructions or Prompts library

The Prompts library is a workbench. You write a prompt, try it, improve it. No step and no agent reads it: when it is good, you copy it where it is used. See [What Prompt Studio is for](/docs/prompts/what-prompt-studio-is/). Not to be confused with the step **LLM Prompt**, which is a step of a workflow, with a prompt written in it.

## What the Assistant does

The Assistant of the Studio follows the same rules when it builds a solution for you. It puts rows in a Data Table, texts in a Knowledge Base, and the conversation in a session. It never uses a Vector Store for what an agent must know.

The Assistant cannot create a Knowledge Base. When your texts are in no base yet, it tells you which base to create and what it should read, and it plugs the base in once it exists. See [What a Knowledge Base is for](/docs/knowledge-bases/what-a-knowledge-base-is/).

## Go further

- [Give an agent knowledge and a memory](/docs/agents/give-memory-and-knowledge/)
- [What a Data Table is for](/docs/data-tables/what-a-data-table-is/)
- [What a Knowledge Base is for](/docs/knowledge-bases/what-a-knowledge-base-is/)
- [Keep texts and find them by meaning](/docs/workflows/keep-texts-and-find-them-by-meaning/)
- [Write the role and the instructions of an agent](/docs/agents/write-the-instructions/)

## Next step

[Words we use](/docs/introduction/words-we-use/).
