---
title: "Add an AI step to a workflow"
description: "Put an AI Agent node in a workflow, give it an AI model and a prompt, so that AI works in this step only and the other steps stay fixed."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/workflows/add-an-ai-step.md. Do not edit here: edit the source and publish again. -->

In a workflow, AI works only in the steps you choose. This page adds one such step: an **AI Agent** node, with its model and its prompt. A prompt is the text of the request that is sent to the AI model.

## What you need

- A workflow open in its editor. See [Create a workflow](/docs/workflows/create-a-workflow/).
- A model connection. See [Connect an AI model](/docs/guides/connect-a-model/).

## Add the AI Agent node

1. In the **Nodes catalog**, open **AI**, then **Agents**.
2. Drag **AI Agent** onto the canvas.
3. Link it to the step before it: drag from the dot on the right of that step to the dot on the left of **AI Agent**.

## Give it a model

1. In the **Nodes catalog**, open **AI**, then **Models**.
2. Drag the model of your provider onto the canvas, below the **AI Agent** node. It appears as a circle.
3. Drag from the diamond of the model to the first diamond under **AI Agent**. A dotted line links them.
4. Right-click the model and select **Edit**.
5. In **Provider credentials**, choose your model connection.
6. Select **Apply**.

## Write the prompt

1. Right-click **AI Agent** and select **Edit**.
2. Fill in **User prompt**. This is the request of this step. It is required.
3. Fill in **System instructions**: how the agent must behave in this step. This field is optional.
4. Select **Apply**.

To use the result of an earlier step in the prompt, look at the panel **Outputs**, on the right of the window. It lists what the earlier steps produce, with the exact name of each output. The fields say "Enter value or drop an output": you can type a value, or use one of these outputs.

## Give the answer a format

The tab **General** of **AI Agent** has the field **JSON Schema for the final response (optional)**, in the group **Response**. When you fill it in, the model is asked to answer in that format, and the output `response` holds the answer, as a text, in that format.

In this step, the fields of the format are not separate outputs. To have each field as an output, save the agent in **Studio** > **Agents** and call it with the step **Agent**. See [Write the role and the instructions of an agent](/docs/agents/write-the-instructions/).

## Save

1. Select **Publish**.

## How to know it worked

- On the canvas, **AI Agent** has an arrow coming in from the step before it, and a dotted line coming from its model.
- When you [run the workflow](/docs/workflows/run-a-workflow/), the step **AI Agent** reaches the state completed, and its output holds the answer of the model.

## If it does not work

- **The list Provider credentials is empty.** You have no connection for this provider. Add one in **Administration** > **Credentials**.
- **The panel Outputs says "No outputs available yet."** The node is not linked to an earlier step, or no earlier step produces an output.
- **The step fails when the workflow runs.** Check that the model is linked, that its credentials are chosen, and that **User prompt** is not empty.

## Good to know

- Each execution of this step uses the AI model. Your provider bills you for it.
- Keep AI for the steps that need judgement or writing. Use fixed steps, such as [a condition](/docs/workflows/add-a-condition/), for rules that must always give the same result.

## Reuse an agent you already built

If the agent exists already in **Studio** > **Agents**, or if you want a whole team, call it with one step. See [Use an agent or a team as a step](/docs/workflows/use-an-agent-or-a-team/).

## Next step

[Ask a person to approve or answer](/docs/workflows/ask-a-person-to-decide/), so that a person checks what the AI step produced.
