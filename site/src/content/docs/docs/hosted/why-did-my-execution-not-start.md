---
title: "Why did my execution not start?"
description: "The reasons a hosted workspace refuses a new execution, the message you get for each, and what to do: wait, free something, or choose a bigger plan."
sidebar:
  order: 6
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/hosted/why-did-my-execution-not-start.md. Do not edit here: edit the source and publish again. -->

A workspace can refuse to start a new execution, and always says why. The message is the one in the left column below.

| Message | Why | What to do |
|---|---|---|
| "This workspace has no plan in force: choose one in Administration > Subscription. Everything in it is still here." | The trial ended or the subscription stopped. | Choose a plan: see [A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/). |
| "The workspace is being updated: a new execution can start again in a few minutes. Nothing going on is lost." | An update is under way. | Wait a few minutes: see [When your workspace sleeps or is updated](/docs/hosted/sleeping-and-updates/). |
| "The Pro edition runs 5 executions at the same time: wait for one to finish, or choose a bigger plan." | Your plan's limit of simultaneous executions is reached. | Wait for one to finish, or choose a bigger plan. |
| "The Pro edition holds 10 GB, and the workspace holds 10.2 GB: delete what you no longer need, or choose a bigger plan." | The disk is full. | Delete data you no longer need, or choose a bigger plan. |
| "The Pro edition allows 5000 executions a month: this would be one more." | The executions of the month are used. | Buy a pack, choose a bigger plan, or wait for the next month: see [Subscription](/docs/administration/subscription/). |
| "The Pro edition does not include" something | The plan does not have a feature that was asked for. | Choose a plan that has it: see [Plans and their limits](/docs/hosted/plans-and-limits/). |

The edition and the figures in the messages above are examples. The message names your own.

## Good to know

- An execution that waits for a person does not count as running.
- Answering an execution that waits for a person is never refused by these limits.
- An execution that goes on too long is not refused but stopped, as if you had selected **Cancel**: see [Plans and their limits](/docs/hosted/plans-and-limits/).
- **Administration** > **Usage** shows where you stand against each limit: see [Usage, monitoring and the audit journal](/docs/administration/usage-monitoring-and-audit-journal/).

## Next step

[Plans and their limits](/docs/hosted/plans-and-limits/).
