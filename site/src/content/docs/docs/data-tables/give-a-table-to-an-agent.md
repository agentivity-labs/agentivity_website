---
title: "Let an agent read and fill a Data Table"
description: "Give an agent a tool for one Data Table, and choose what it may do with it. Read rows, add rows, change rows or delete rows."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/data-tables/give-a-table-to-an-agent.md. Do not edit here: edit the source and publish again. -->

An agent can work with a Data Table by itself: look up a row, add one, change one. You give it a tool for one table, and you decide what it may do with it.

## What you need

- An agent with a model. See [Create an agent](/docs/agents/create-an-agent/).
- A Data Table with its columns. See [Create a Data Table](/docs/data-tables/create-a-data-table/).

## A workflow step or an agent tool

Both can read and fill a table. They are not the same.

| | Step in a workflow | Tool of an agent |
|---|---|---|
| **Who decides when to use the table** | You. The step always runs at its place. | The agent, from the request and its instructions. |
| **What is written** | Exactly what you set. | What the agent decides to write. |
| **Good for** | Keeping a record that must always be made. | Looking things up, and work where the agent must judge. |

When a row must be written every time, use a workflow step. See [Read and write a Data Table from a workflow](/docs/data-tables/use-a-table-in-a-workflow/).

## Give the tool to the agent

1. Open the agent in its editor.
2. In the **Node Catalog**, open **AI** > **Tools**, or search for `Data Table`.
3. Drag **AI Agent Data Table Tool** onto the canvas, below the agent.
4. Drag from the diamond of the tool to the sixth diamond of the agent, **AI Agent Tools**.

## Choose the table and the permissions

1. Right-click the tool and select **Edit**.
2. Choose the table the tool works on.
3. Choose what the agent may do:

| Setting | What it allows |
|---|---|
| Read rows | The agent can look up rows. |
| Insert rows | The agent can add rows. |
| Update rows | The agent can change rows. |
| Delete rows | The agent can delete rows. |

4. Select **Apply**, then **Publish**.

Give only what the job needs. An agent that looks up customers needs to read, and nothing else.

To give the agent several tables, add one tool for each table. In each tool you can set a prefix for the names of its actions, so that the agent tells the tables apart.

## Tell the agent how to use the table

The agent sees the name of the table and of its columns. Say in its instructions when to read and when to write. For the `Reminder Writer`:

```text
Before you write a reminder, look in the table reminders whether a reminder was already sent for this invoice. If one was sent less than seven days ago, say so and do not write a new one.
```

## How to know it worked

Run the agent with a request that needs the table. Then open the table: a row that the agent added is there. See [Run an agent and read its answer](/docs/agents/run-an-agent/).

## Good to know

- An agent can make mistakes. Before you allow it to change or delete rows, decide whether a person must approve first. See [Let an agent ask a person before it decides](/docs/agents/let-an-agent-ask-a-person/).
- The rows that an agent reads are sent to the AI model. Do not give an agent a table that holds data which must not leave your server.

## Next step

[Give tools to an agent](/docs/agents/give-tools-to-an-agent/), for the other tools.
