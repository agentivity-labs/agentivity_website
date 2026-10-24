---
title: "Run a team and read its work"
description: "Give a task to a team in the Studio, follow each member while it works, answer when the team asks you something, and find the execution again later."
sidebar:
  order: 7
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/teams/run-a-team.md. Do not edit here: edit the source and publish again. -->

An execution is one request handled by a team, from the task you give to the finished work. This page shows how to start an execution and how to read what happened.

## What you need

- A team in your workspace. To get one, [try a ready-made solution](/docs/getting-started/try-a-ready-made-solution/), [build one with the Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/) or [create one by hand](/docs/teams/create-a-team/).
- A model connection that works. See [Connect an AI model](/docs/guides/connect-a-model/). Each execution uses the AI model, and your provider bills you for it.

## Give a task to the team

1. Open **Studio** > **Agents** and open the team.
2. Select the tab **Execution**, at the top. The team is drawn in the middle. The panel **Chat**, on the right, asks "What task would you like the team to perform?"
3. In the field **Describe the task for the team…**, type the request. For example, for a team that writes notes:

   ```text
   Write a one-page note on the advantages and the limits of remote work for a company of 50 people.
   ```

4. Send your message.

## Follow the work

Below the drawing, three tabs show what happens:

| Tab | What it shows |
|---|---|
| **Inspector** | The steps of the execution. Select a step to see what the member received, what it produced and its logs. |
| **Errors** | What went wrong. When all is well, it says "No runtime errors detected." |
| **Logs** | The technical record of the execution. |

The buttons above the drawing control the execution: **Run**, **Pause**, **Resume** and **Stop**. **Pause** shows while the execution runs, and **Resume** only once you paused it: it undoes your pause. An execution that waits for a person is not paused: you answer it, there is no **Resume** to select.

## Answer when the team asks

A team can stop and ask you something: a choice, an approval or a missing detail. The execution waits for you.

1. Read the question in the panel **Chat**.
2. Type your answer in the field **Type your response…**
3. Select **Send response**. The execution continues.

An execution that waits for you is listed in the section **Executions**, with the label **ACTION REQUIRED**.

## Find an execution again

In the tab **Execution**, the panel on the right has a list **Executions**. Each execution has a state:

| State | What it means |
|---|---|
| **Running** | The team is working. |
| **Awaiting input** | The team waits for your answer. |
| **Completed** | The work is finished. |
| **Failed** | The execution stopped on an error. |
| **Cancelled** | The execution was stopped by a person. |

The section **Executions**, in the menu on the left, lists the executions of your whole workspace.

## How to know it worked

- The execution reaches the state **Completed**.
- The panel **Chat** shows the finished work of the team.
- The tab **Errors** says "No runtime errors detected."

## If it does not work

- **The execution fails at the first step.** The model connection of the agents does not work. For an imported team, see "The model of the imported agents" in [Try a ready-made solution](/docs/getting-started/try-a-ready-made-solution/). Otherwise, check your key in **Settings** > **Credentials**.
- **The execution does not move.** Look at its state. If it is **Awaiting input**, the team waits for your answer.
- **The result is not what you wanted.** Open the tab **Inspector** and read the steps one by one, to find which member went wrong. Then change the role or the instructions of that member.

## Good to know

Executions start when a person starts them. Starting executions on a schedule is planned, and it is not available yet.

## Next step

[Choose how a team works together](/docs/teams/choose-how-a-team-works/), to see when another pattern would give a better result.
