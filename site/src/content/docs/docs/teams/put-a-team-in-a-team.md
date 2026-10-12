---
title: "Use a team or a workflow as a member"
description: "A member of a team can be an agent, another team or a workflow. How to add one, and when it is a good idea."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/teams/put-a-team-in-a-team.md. Do not edit here: edit the source and publish again. -->

A member of a team does not have to be an agent. It can be another team, or a workflow. This lets you build large solutions from small parts that you have already tested.

## What you need

- A team open in its editor. See [Create a team of agents](/docs/teams/create-a-team/).
- Another team or a workflow in your workspace, published.

## Add a team or a workflow as a member

1. In the panel on the right, select the second tab. The list **Members** opens.
2. Select **Teams** or **Workflows** to see only those. The list is sorted by folder.
3. Drag the team or the workflow onto the canvas.
4. Select **Publish**.

The new member is drawn as a hexagon, like an agent. Its icon shows whether it is a team or a workflow.

## Give it a clear role

A team chooses who does what from the roles of its members. This is true for a member that is a team or a workflow too.

1. Open the team or the workflow that you use as a member.
2. In its panel **Info**, fill in **Role**. For example, for a team `Payment Reminders`:

   ```text
   Writes and reviews a payment reminder for one unpaid invoice.
   ```

3. Select **Publish**.

## When to use a team as a member

- **A part of the work is a job in itself.** Writing and reviewing a reminder is one job. Deciding which invoices need a reminder is another. Build each as its own team, test it alone, then put them together.
- **Several larger teams need the same part.** Build it once and use it as a member wherever it is needed.

## When to use a workflow as a member

- **A part of the work must follow fixed steps.** For example, a step where a person must approve, or a rule that must always give the same result. Put those steps in a workflow, and use the workflow as a member.

## Good to know

- A team inside a team makes more calls to the AI model for one request. Keep the levels few.
- Do not add a team to itself. The list **Members** shows every team of your workspace, including the one you are editing.
- Test each part alone before you put it in a larger team. A problem is easier to find in a small team.

## How to know it worked

- On the canvas, the team or the workflow is a hexagon among the other members.
- In the list **Members**, it has a check mark.

## Next step

[Run a team and read its work](/docs/teams/run-a-team/).
