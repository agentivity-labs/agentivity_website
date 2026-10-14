---
title: "Use an agent or a team as a step"
description: "Call an agent, a team or another workflow of your library from a workflow, with the steps Agent, Team and Workflow. What to fill in, and what they refuse."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/workflows/use-an-agent-or-a-team.md. Do not edit here: edit the source and publish again. -->

You have built an agent or a team, and it works. To use it inside a workflow, you do not rebuild it: you add one step that calls it. The example calls the agent `Reminder Writer` from a workflow.

## Three steps, one for each kind

| Step | What it calls | Where it is in the **Node Catalog** |
|---|---|---|
| **Agent** | An agent of your library. | **AI** > **Agents** |
| **Team** | A team of your library. | **AI** > **Agents** |
| **Workflow** | Another workflow of your library. | **Core** > **Workflow** |

The three work the same way. You choose what the step calls, you write the message it sends, and the next steps use the answer.

## AI Agent step, or Agent step

| | **AI Agent** step | **Agent** step |
|---|---|---|
| Where the agent is defined | In the workflow. You write its instructions and plug its model there. | In **Studio** > **Agents**. The workflow only calls it. |
| Use it when | The agent serves this workflow only. | The agent exists already, or serves several workflows. |

See [Add an AI step to a workflow](/docs/workflows/add-an-ai-step/) for the first one. This page is about the steps that call your library.

## What you need

- A workflow open in the editor. See [Create a workflow](/docs/workflows/create-a-workflow/).
- An agent, a team or a workflow that works on its own. Try it first: see [Run an agent](/docs/agents/run-an-agent/), [Run a team](/docs/teams/run-a-team/) or [Run a workflow](/docs/workflows/run-a-workflow/).

## Add the step

1. Open the **Node Catalog** and search for `Agent`, `Team` or `Workflow`.
2. Drag the step onto the canvas.
3. Link the step before it to its left dot.
4. Right-click the step and select **Edit**.

## Choose what it calls

1. Select **Choose an agent…** (or **Choose a team…**, **Choose a workflow…**).
2. A window opens on your library, with its folders and a search field. It shows only what this step can call: the agents for **Agent**, the teams for **Team**, the workflows for **Workflow**.
3. Select the one you want. Its name now shows in the window of the step.

The step keeps the identifier of what you chose, not its name. You can rename the agent later: the step still calls it.

## Write the message

In **Message**, write what to ask, as you would type it in the chat of the agent. For example:

```text
Write a payment reminder for Northgate Bakery, invoice INV-2041, 1,250 euros.
```

To put a value from an earlier step in the message, write the reference of its output: the node name of the step, a dot, the name of the output, between two pairs of curly braces. The panel **Outputs**, on the right, lists the names you can use.

The step sends only this message. Put in it everything the agent, the team or the workflow needs to know.

Then select **Apply**, and **Publish**.

## Use the answer

| Output | What it holds |
|---|---|
| `output` | The answer. For an agent or a team: its final answer. For a workflow: see below. |
| Named outputs | If what you call declares outputs of its own, they come next to `output`, under their own names. |

Use the answer in a later step with its reference: the node name of the step, a dot, then `output`.

The step has two exits on its right side: **Out**, where the workflow goes on, and **Error**.

### What a workflow gives back

A called workflow gives back the text of its last step that produced one. The engine looks, from the last step that ran back to the first, for an output named `output`, `result`, `response` or `content`.

So make the last useful step of the called workflow produce one of these names. An **AI Agent** step does: its answer is named `response`. A **Console** step does not: its output is named `value`.

## When what you call waits

What you call may stop to wait: an agent that asks a person a question, a workflow with an approval step. Your workflow then waits with it. When the answer comes, what you called goes on from where it stopped, and your workflow goes on when it has finished.

This is not possible inside a loop. If a step of a **For Each** loop calls something that waits, the run fails, and the message says that a loop cannot wait. See [Repeat steps for each item of a list](/docs/workflows/repeat-steps/).

## What the step refuses

- **Something of another kind.** Each step calls only its own kind. Given a team, the step **Agent** stops the run, with a message that names the chosen item and says that it is a team. Use the step **Team** for a team.
- **Nothing chosen.** A step with nothing chosen stops the run, with a message that says no agent (or team, or workflow) is chosen.

## If Agent and Team are not in the catalogue

The library of agents and teams can be turned off on a server, with the setting `Features__AgenticLibrary__Enabled`. It is on by default. When it is off, the steps **Agent** and **Team** are not offered, and only **Workflow** is. The **AI Agent** step keeps working.

## How to know it worked

Run the workflow. In the tab **Execution**, the step turns to completed, and the next step receives the answer. See [Run a workflow and follow each step](/docs/workflows/run-a-workflow/).

## If it does not work

- **The run fails at this step, and the message says what the chosen item is.** The step and what it calls are not of the same kind. Use the step that matches.
- **The answer is empty, and the step called a workflow.** No step of that workflow produced an output named `output`, `result`, `response` or `content`. See "What a workflow gives back".
- **The run fails at this step, and the rest of the workflow is not done.** Today, a failure of the step stops the run.
- **The agent answers beside the point.** The step sends only the message. Put the facts the agent needs in it.

## Good to know

- **Each call costs.** An agent or a team uses the AI model each time the step runs. A team uses it many times.
- **A workflow is called by its identifier.** Renaming the called workflow does not break the step.

## Reference

[Agent and Team](/docs/reference/nodes-ai-agents-and-models/), and [Workflow](/docs/reference/nodes-core/), in the node reference.

## Next step

[Repeat steps for each item of a list](/docs/workflows/repeat-steps/), to call the agent once per customer.
