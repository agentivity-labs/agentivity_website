---
title: "How a person stays in control"
description: "Where you decide in Agentivity. Drafts that you save yourself, steps that wait for your approval, executions you can stop, and a record of each step."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/introduction/how-a-person-stays-in-control.md. Do not edit here: edit the source and publish again. -->

An AI team does the repetitive work. The decisions stay with you. This page lists the places where Agentivity stops and lets a person decide.

## When you build

- **The Assistant works on a draft.** What it builds is not in your workspace until you select **Save**. Before you save, you see what will be added and where it will go. If you remove the draft, nothing in your workspace changes.
- **You publish your changes yourself.** In an editor, a change is saved when you select **Publish**.

## When a solution runs

- **A step can wait for a person.** In a workflow, you add a step that sends a question and stops. The workflow continues only when someone has answered. See [Ask a person to approve or answer](/docs/workflows/ask-a-person-to-decide/).
- **An agent can ask before it decides.** An agent that has a channel to reach a person can stop and ask for a choice or an approval.
- **You can stop an execution.** The bar above the canvas has **Pause**, **Resume** and **Stop**. The section **Executions** can stop several executions at once.
- **An execution starts when a person starts it.** Nothing starts by itself. Starting executions on a schedule is planned, and it is not available yet.

## After an execution

- **Every execution is listed.** The section **Executions** shows the executions of your workspace and their state. An execution that waits for a person has the label **ACTION REQUIRED**.
- **Every step can be read.** In the **Execution** view of an editor, the **Inspector** shows, for each step, what it received and what it produced.

## Fixed rules where you need them

An AI model can answer differently to the same request. When a rule must always give the same result, do not leave it to a model: put it in a workflow, as a fixed step. A condition, for example, always takes the same path for the same input. See [Add a condition to a workflow](/docs/workflows/add-a-condition/).

## One limit to know

Agentivity has no login today. It does not know who is in front of the screen, so it cannot check who approved a step. Anyone who can reach your server can build, run and answer. Keep the server on a network you trust, or behind your own access control.

## Next step

[What the Community edition includes](/docs/introduction/what-the-community-edition-includes/).
