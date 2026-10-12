---
title: "Run a workflow and follow each step"
description: "Start a workflow from the Studio, watch its state, read the logs, and find the run again in the Executions section."
sidebar:
  order: 9
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/workflows/run-a-workflow.md. Do not edit here: edit the source and publish again. -->

A run is one execution of a workflow, from its first step to its last. This page shows how to start a run from the Studio and how to see what happened.

## What you need

- A workflow with at least one step, published. See [Create a workflow](/docs/workflows/create-a-workflow/).
- If the workflow has an AI step: a model connection that works. See [Connect an AI model](/docs/guides/connect-a-model/).

## Start a run

1. Open **Studio** > **Workflows** and open the workflow.
2. Select the tab **Execution**, at the top. When the workflow can run, you read **Ready to run** at the top right.
3. In the bar above the canvas, select the first button, **Run**.

The same bar has **Pause**, **Resume** and **Stop run**.

![The tab Execution of a workflow during a run: the bar with the buttons Run, Pause, Resume and Stop, the state at the top right, and the tab Logs with one line per event](images/run-in-progress.jpg)

## Follow the run

The state of the run is shown at the top right. When a step asks a person something, the state is **Waiting for human input**. See [Ask a person to approve or answer](/docs/workflows/ask-a-person-to-decide/).

Below the canvas, three tabs show what happens:

| Tab | What it shows |
|---|---|
| **Inspector** | The steps of the run. Select a step to see its inputs, its outputs and its logs. |
| **Errors** | What went wrong. When all is well, it says "No runtime errors detected." |
| **Logs** | One line for each event, with the time: the run started, the run waits for a person, and so on. |

On the right, a panel has three tabs: the earlier runs of this workflow, the forms that wait for an answer, and the **Chat** of the run.

## See a value on the canvas

To see a value without opening the **Inspector**, add a **Console** node at the end of the workflow. It is in the **Node Catalog**, under **Core** > **Display**. Before a run, it says "No value yet". After a run, it shows the value it received.

## Find a run again

1. In the menu on the left, select **Executions**. The page **Execution history** lists the latest runs of your whole workspace: workflows, agents and teams.
2. Use the list **All states** to keep only the runs in one state.
3. On the line of a run:
   - **Open workflow** opens the workflow in its editor;
   - **Details** shows the state of the run and the state of each step.

![The section Executions, titled Execution history: the list All states, the Batch action bar, and one run with the label ACTION REQUIRED](images/executions.jpg)

A run that waits for a person has the label **ACTION REQUIRED**.

To stop or delete several runs at once, tick them, choose the action in the list **Batch action**, then select **Apply**.

## How to know it worked

- In the tab **Logs**, you read that the run started.
- In **Executions**, the run is in the list. In **Details**, every step that ran is completed.

## If it does not work

- **A step failed.** Open the tab **Errors** to read the message. Then select the step in the **Inspector** and compare its inputs with what you expected.
- **The run stays in Waiting for human input.** A person must answer. Open the **Chat** of the run.

## Good to know

Runs start when a person starts them. Starting runs on a schedule is planned, and it is not available yet.

## Next step

[Add a condition to a workflow](/docs/workflows/add-a-condition/), [add an AI step](/docs/workflows/add-an-ai-step/), or [repeat steps for each item of a list](/docs/workflows/repeat-steps/).
