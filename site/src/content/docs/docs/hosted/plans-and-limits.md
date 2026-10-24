---
title: "Plans and their limits"
description: "What Personal, Pro and Business include, and the limits of each: people, spaces, executions, keys, disk. How the Community edition differs."
sidebar:
  order: 2
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/hosted/plans-and-limits.md. Do not edit here: edit the source and publish again. -->

A hosted workspace has a plan. This page says what each plan includes and where its limits are. It gives no price: see [pricing](/pricing). A plan is chosen at sign-up for the trial, and kept or changed in [Subscription](/docs/administration/subscription/).

## The three plans

| | Personal | Pro | Business |
|---|---|---|---|
| People | 1 | 3 | 15 |
| Spaces | 1 | 3 | 15 |
| Executions a month | 1 000 | 5 000 | 25 000 |
| Executions at the same time | 2 | 5 | 20 |
| Longest execution | 15 minutes | 60 minutes | 240 minutes |
| Disk | 2 GB | 10 GB | 50 GB |
| API keys | 5 | 20 | 100 |
| Several spaces | no | yes | yes |
| Groups | no | no | yes |
| Audit journal | no | no | yes |
| Monitoring | no | no | yes |

Every plan includes sign-in with roles, API keys, keys for a website and the connection of AI assistants. A larger plan is available on request: see [pricing](/pricing). On a hosted workspace, the kinds of Knowledge Base source that read the server itself (Files and SQLite) are not offered.

## What each limit means

- **People** counts the active people and the invitations not yet accepted. A person you deactivate no longer counts.
- **Spaces** counts the spaces in use. An archived space does not count.
- **Executions a month** counts the executions started in the calendar month. When it is reached, a new execution is refused until the month starts again, unless you buy a pack: see [Subscription](/docs/administration/subscription/).
- **Executions at the same time** counts the executions running now. One that waits for a person does not count.
- **Longest execution**: a longer execution is stopped, as if you had selected **Cancel**. Waiting for a person does not count.
- **Disk**: what the workspace holds, in GB. When it is full, a new execution is refused.
- **API keys** counts the keys neither revoked nor ended, of everyone.

Where you are against each limit is in **Administration** > **Usage**: see [Usage, monitoring and the audit journal](/docs/administration/usage-monitoring-and-audit-journal/).

A feature a plan does not include is not shown in the Studio. If something calls it anyway, the answer says: "The Business edition does not include" what you asked for.

## The trial

The trial has the features of the plan you chose, for 14 days, and is limited to 200 executions in all.

## What the Community edition has

The Community edition is the one you install yourself, free of charge. It has one person and one space, and no sign-in: anyone who reaches the server uses everything. It has no groups, audit journal, monitoring or keys for a website. It has no cap on executions. See [What the Community edition includes](/docs/introduction/what-the-community-edition-includes/).

## If you go beyond a plan

See [If you go beyond your plan](/docs/hosted/beyond-your-plan/) and [Why did my execution not start?](/docs/hosted/why-did-my-execution-not-start/).

## Next step

[A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/).
