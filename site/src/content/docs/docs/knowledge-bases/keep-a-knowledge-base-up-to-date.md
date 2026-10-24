---
title: "Keep a Knowledge Base up to date"
description: "A Knowledge Base reads its source again by hand, after a delay, or when the source changes. How each way works, and how to synchronise a base now."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/knowledge-bases/keep-a-knowledge-base-up-to-date.md. Do not edit here: edit the source and publish again. -->

A Knowledge Base keeps a copy of what it read. When the source changes, the copy must be refreshed. This is a synchronisation. You choose how it happens, for each base.

## What you need

- A Knowledge Base. See [Create a Knowledge Base](/docs/knowledge-bases/create-a-knowledge-base/).

## The three ways

You choose the way in the field **Synchronised**, in the step **About it** of the window of the base.

| Way | When the base reads its source again |
|---|---|
| **By hand** | Only when you ask, and at its first search if it was never synchronised. |
| **After a delay** | At the next search once the delay has passed since the last synchronisation. You give the delay in hours (at least 1). |
| **When the source changes** | At the next search when its source changed: a file modified, a file added or removed. |

In the three ways, the base reads its source again **at a search**, not in the background. A base that nobody searches is not read again.

### A base that was never synchronised

A base is synchronised once when it is created. If it was never synchronised, for example because it was imported and waits for a setting, it is synchronised at its first search.

### "When the source changes" and the kinds of source

Only the kind **Files** can tell, without reading everything, that something changed: it compares the names, the sizes and the dates of the files. The other kinds cannot tell. A base of another kind that is set to **When the source changes** reads its source again after the delay of its base, which is 24 hours unless it was changed.

If you use another kind than **Files** and want a precise delay, choose **After a delay**.

## Synchronise a base now

1. In **Resources** > **Knowledge Bases**, double-click the base. Its window opens.
2. Select **Synchronise**.

The state goes to **Synchronising…**, then to **Synchronised**, or to **Failed** if something could not be read. Reading happens in the background: you can close the window.

## What the state says

| State | Meaning |
|---|---|
| **Never synchronised** | Nothing was read yet. |
| **Synchronising…** | The base is reading its source. |
| **Synchronised** | The last reading went well. |
| **Failed** | The last reading failed. Open the base: **What could not be read** says why. |

If the server stopped in the middle of a reading, the base does not stay at **Synchronising…** for ever. It shows **Failed**, and **What could not be read** says: "The synchronisation was cut off when the server stopped. What it had read is kept; synchronise it again to finish." Select **Synchronise** to finish. A search on such a base does it for you.

## How to know it worked

Open the base. **Last synchronised** shows a new date, and **Holds** shows the number of documents and passages. See [Look inside a Knowledge Base](/docs/knowledge-bases/look-inside-a-knowledge-base/).

## Good to know

- **A search waits for a base that is due.** The search synchronises the base first, then answers. With a large source, that search can take a while.
- **A reading only does what changed.** A document whose text did not change is not treated again. A document that disappeared from the source is removed from the base.
- **If the first reading fails and the base holds nothing**, a search says so, with the reason, instead of answering with nothing.
- **Emptying a base** removes what it holds and keeps its source and settings. It is read again at its next search. See [Change, empty or delete a Knowledge Base](/docs/knowledge-bases/change-empty-or-delete-a-knowledge-base/).

## Next step

[Look inside a Knowledge Base](/docs/knowledge-bases/look-inside-a-knowledge-base/).
