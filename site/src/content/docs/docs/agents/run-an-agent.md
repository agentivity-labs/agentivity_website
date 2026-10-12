---
title: "Run an agent and read its answer"
description: "Give a task to an agent in the Studio, read its answer, answer its questions, run it again, and find the run later."
sidebar:
  order: 8
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/agents/run-an-agent.md. Do not edit here: edit the source and publish again. -->

Running an agent alone is the fastest way to test it: you give it a task, you read the answer, you adjust the instructions, you try again.

## What you need

- An agent with a model and instructions, published. See [Create an agent](/docs/agents/create-an-agent/).
- A model connection that works. Each run uses the AI model, and your provider bills you for it.

## Give a task

1. Open **Studio** > **Agents** and open the agent.
2. Select the tab **Execution**, at the top. The panel on the right asks "What would you like the agent to do?"
3. In the field **Describe the task for the agent…**, type the task. For the `Reminder Writer`:

   ```text
   Customer: Northgate Bakery. Invoice INV-2041, 1,250 euros, due on 15 September. Write the reminder.
   ```

4. Send it.

The answer arrives in the same panel, as it is written.

## Answer when the agent asks

If the agent has a channel, it can stop and ask you something. The field at the bottom then says **Type your response…** Type your answer and send it. See [Let an agent ask a person before it decides](/docs/agents/let-an-agent-ask-a-person/).

## Control the run

The panel has buttons to **Pause run**, **Resume run** and **Cancel run**. After a run, it also has **Run again** and **Reset**.

## Read what happened

Below the canvas, three tabs show the run:

| Tab | What it shows |
|---|---|
| **Inspector** | The steps of the run. Select a step to see its inputs, its outputs and its logs. |
| **Errors** | What went wrong. When all is well, it says "No runtime errors detected." |
| **Logs** | The technical record of the run. |

## Improve and try again

1. Read the answer as the person who will receive it.
2. Go back to the tab **Editor** and change the instructions.
3. Select **Publish**.
4. Go to the tab **Execution** and give the same task again.

Change one thing at a time. You then know which change improved the answer.

## Find a run again

The section **Executions**, in the menu on the left, lists the runs of your whole workspace, with their state. See [Run a workflow and follow each step](/docs/workflows/run-a-workflow/) for what this page shows.

## How to know it worked

- The panel shows the answer of the agent.
- The tab **Errors** says "No runtime errors detected."

## If it does not work

- **The run fails at once.** The agent has no model, or the credentials of its model are not chosen. See [Choose or change the model of an agent](/docs/agents/choose-the-model/).
- **The answer ignores your documents or your tools.** Say in the instructions when to use them.
- **The agent asks a question you did not expect.** Change its instructions, or stop it from asking. See [Let an agent ask a person before it decides](/docs/agents/let-an-agent-ask-a-person/).

## Next step

Put the agent in a team: [Create a team of agents](/docs/teams/create-a-team/).
