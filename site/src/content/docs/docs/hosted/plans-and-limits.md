---
title: "Plans and their limits"
description: "What Personal, Pro and Business include, and the limits of each: seats, spaces, executions, keys, disk. How the Community edition differs."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/hosted/plans-and-limits.md. Do not edit here: edit the source and publish again. -->

A hosted workspace has a plan. This page says what each plan includes and where its limits are. It gives no price: see [pricing](/pricing). A plan is chosen at sign-up for the trial, and kept or changed in [Subscription](/docs/administration/subscription/).

## The three plans

| | Personal | Pro | Business |
|---|---|---|---|
| Studio seats | 1 | 3 | 5, more to add |
| Agentivity Desk seats | none | 5 | 25, more to add |
| Spaces | 1 | 3 | 15 |
| Executions a month | 1 000 | 5 000 | 25 000 |
| Executions at the same time | 2 | 5 | 20 |
| Longest execution | 15 minutes | 60 minutes | 240 minutes |
| Disk | 2 GB | 10 GB | 50 GB |
| API keys | 5 | 20 | 100 |
| Backups kept | 7 days | 14 days | 30 days |
| History kept | 7 days | 14 days | 30 days |
| Support | E-mail | Priority e-mail | Priority e-mail and a kick-off video call |
| Several spaces | no | yes | yes |
| Permissions (groups of people) | no | no | yes |
| Audit journal | no | no | yes |
| Monitoring | no | no | yes |
| [Agentivity Desk](/docs/desk/agentivity-desk/) | no | yes | yes |

[Observation](/docs/studio/observation/), the tab that reads a team or a workflow over a period, comes with the Pro, Business and Enterprise plans.

Every plan includes sign-in with roles, API keys, keys for a website and the connection of AI assistants. A larger plan is available on request: see [pricing](/pricing). On a hosted workspace, the kinds of Knowledge Base source that read the server itself (Files and SQLite) are not offered.

## What each limit means

- **Studio seats** count the people who build in the Studio, and the invitations to the Studio not yet accepted. A person you deactivate no longer counts.
- **Agentivity Desk seats** count, apart, the people who only use what is built, on the Desk, and the invitations to it. See [Agentivity Desk](/docs/desk/agentivity-desk/).
- On Business, you can add seats in [Subscription](/docs/administration/subscription/#seats): up to 25 Studio seats and 500 Desk seats in all. Each Studio seat added gives 500 more executions a month, each Desk seat 50.
- **Spaces** counts the spaces in use. An archived space does not count.
- **Executions a month** counts the jobs of the calendar month: each conversation started, and each further job finished in it. See [What counts as one execution](/docs/studio/executions/#what-counts-as-one-execution). When it is reached, a new execution is refused until the month starts again, unless you buy a pack: see [Subscription](/docs/administration/subscription/).
- **Executions at the same time** counts the executions running now. One that waits for a person does not count.
- **Longest execution**: a longer execution is stopped, as if you had selected **Cancel**. Waiting for a person does not count.
- **Disk**: what the workspace holds, in GB. When it is full, a new execution is refused.
- **API keys** counts the keys neither revoked nor ended, of everyone.

Where you are against each limit is in **Administration** > **Usage**: see [Usage, monitoring and the audit journal](/docs/administration/usage-monitoring-and-audit-journal/).

A feature a plan does not include is not shown in the Studio. If something calls it anyway, the answer says: "The Business edition does not include" what you asked for.

## The trial

The trial has the features of the plan you chose, for 14 days, and is limited to 200 executions in all. There is one trial for each e-mail address. Choosing a paid plan ends the trial: the days left are not carried over.

## Backups

The storage of your workspace is backed up every day, and the backups are kept for the number of days of your plan. To restore your workspace from a backup, write to security@agentivity.io.

## How long the history is kept

The history is what the workspace keeps of its past work: the calls to models, the executions, and the images, audio and uploaded files. Older items are removed by themselves. The time depends on the contract:

| Contract | History kept |
|---|---|
| Personal | 7 days |
| Pro | 14 days |
| Business | 30 days |
| Enterprise | No limit |

The history is not the same thing as the backups, and it does not touch what you built: agents, teams, workflows, Data Tables and Knowledge Bases stay.

## What the Community edition has

The Community edition is the one you install yourself, free of charge. It has no sign-in: anyone who reaches the server uses everything. It has no groups of people, audit journal, monitoring or keys for a website. It has no [Observation](/docs/studio/observation/) tab. It has no cap on executions. By default it keeps the calls to models 365 days, the executions 30 days, and images, audio and uploaded files 7 days: see [Configuration reference of the server](/docs/reference/configuration/). See [What the Community edition includes](/docs/introduction/what-the-community-edition-includes/).

## If you go beyond a plan

See [If you go beyond your plan](/docs/hosted/beyond-your-plan/) and [Why did my execution not start?](/docs/hosted/why-did-my-execution-not-start/).

## Next step

[A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/).
