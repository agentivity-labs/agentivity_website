---
title: "When your workspace sleeps or is updated"
description: "Why a hosted workspace can take a few seconds to open, what the yellow update banner and the update screen mean, and what happens to your executions."
sidebar:
  order: 3
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/hosted/sleeping-and-updates.md. Do not edit here: edit the source and publish again. -->

## A workspace that sleeps

A hosted workspace is stopped when nobody uses it, and wakes at the next visit. This keeps the service light. It has one effect you can see: the first visit after a quiet moment shows a page that says **Your workspace is starting…** It says that the workspace was asleep, or is starting for the first time, and that it opens by itself as soon as it is ready, usually in a few seconds. You do nothing: the page reloads itself.

A call made through the API wakes the workspace in the same way. It waits for the workspace instead of failing.

Nothing is lost when a workspace sleeps. What you built, your data and your people are kept.

## An update

Agentivity updates your workspace to the new versions of the product. You do not do anything, and you do not install anything. The update is announced in the Studio, usually a few minutes ahead. For an urgent fix, it may start at once, with no notice: nothing going on is cut. It goes in three steps.

1. **A yellow banner with a countdown**, for example "Update in 10 min (at 14:30)". It is usually 10 minutes, and sometimes 2. It says that the workspace moves to a new version, that executions going on finish, and that new ones wait a few minutes. Save what you are doing; nothing is lost. For an urgent fix, there is no yellow banner: the Studio shows the dark blue one straight away.
2. **A dark blue banner**, "Update under way". New executions wait. Those going on finish, then the workspace restarts on its new version, in a few minutes.
3. **A screen** that says **Your workspace is being updated**. It says that the workspace is moving to a new version and is back in a few minutes, by itself, and that what was going on resumes. The Studio loads itself again when the workspace is back: you do not have to refresh the page.

### What happens to your executions

- An execution going on is never cut. The update waits for it. If it takes too long, the update is postponed and tried again later.
- An execution that waits for a person is kept. It is still there after the update, and you can answer it.
- A call made through the API while the update is under way gets the answer "The workspace is being updated: it is back in a few minutes." Try again a little later.
- A new execution started during the update is refused, with the message "The workspace is being updated: a new execution can start again in a few minutes. Nothing going on is lost." Start it again a few minutes later. See [Why did my execution not start?](/docs/hosted/why-did-my-execution-not-start/).

## If the workspace does not come back

- **This workspace is paused.** The workspace has no plan and was paused: see [A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/).
- **This workspace is unavailable.** It has been stopped. If it is yours, write to hello@agentivity.io.
- **No workspace at this address.** Check the address, or find it again at `www.agentivity.io/find`.

## Next step

[A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/).
