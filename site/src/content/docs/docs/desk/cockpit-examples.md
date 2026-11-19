---
title: "Cockpit ideas by department"
description: "Three cockpits you can copy for Finance, Sales and Support: which blocks to use, in which order and width, and which Solutions to publish."
sidebar:
  order: 13
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/desk/cockpit-examples.md. Do not edit here: edit the source and publish again. -->

A cockpit is not a dashboard to look at. It is a page to start from. Here are three, built with the [blocks](/docs/desk/cockpit-blocks/) of the designer. Change the names to yours.

![The Finance cockpit in the Desk.](images/cockpit-example-finance.jpg)

## What you need

- The Solutions of the department, [published to the Desk](/docs/desk/publish-solutions-to-the-desk/).
- For figures, a Data Table filled by your workflows, and the right to read the Data Tables.

## Finance: the invoices

**Solutions:** the agent that reads invoices, the workflow that checks them against orders, the approval of payments.

| Block | Width | Setting |
|---|---|---|
| **Top of the page** | Full | "Finance: what to pay, what to check" |
| **Ask** | Full | |
| **Indicator** | 1/3 | Invoices to approve: how many rows of the table `Invoices`, with the condition status is `to approve` |
| **Indicator** | 1/3 | Total of the column `Amount` of those rows |
| **Waiting for you** | 1/3 | |
| **Launch button** | 1/2 | "Check today's invoices" |
| **Announcement** | 1/2 | A warning colour: "Closing on the 28th" with a date when it stops |
| **Table** | Full | The last rows of `Invoices`, **Latest first** |

Why it works: the person sees what waits, starts the daily work in one click, and sees the figures that matter.

## Sales: the follow-up

**Solutions:** the agent that writes follow-up e-mails, the team that prepares a visit.

| Block | Width | Setting |
|---|---|---|
| **Top of the page** | Full | "Sales: today's follow-ups" |
| **Ask** | 2/3 | |
| **Suggestions** | 1/3 | "Write a follow-up to the client of yesterday" |
| **Indicator** | 1/3 | Open opportunities |
| **Time saved** | 1/3 | |
| **Card** | 1/2 | The CRM, with its link |
| **Links** | 1/2 | The price policy, the contract model |

## Support: the queue

**Solutions:** the agent that drafts replies, the workflow that sorts tickets.

| Block | Width | Setting |
|---|---|---|
| **Top of the page** | Full | "Support: answer faster" |
| **Waiting for you** | 1/2 | Replies to approve |
| **Conversations** | 1/2 | The conversations in progress |
| **Indicator** | 1/3 | Tickets of the day: the last 7 days, with **Say how it moved** |
| **Chart** | 1/2 | Tickets by category, **Ranking** |
| **Announcement** | 2/3 | A news colour: the incident of the morning |
| **Text** | Full | The tone of a reply: three short rules |

## How to build yours

1. List what the department does every day: those are its Solutions.
2. Put first what people do first: the **Ask** and the **Launch button**.
3. Add what waits, then the figures, then the news.
4. Preview on a phone, remove what is not needed, and [publish](/docs/desk/build-a-cockpit/).

## How to know it worked

A person of the department opens the Desk and starts their day from the cockpit, without asking you where things are.

## Next step

[Desk by Agentivity](/docs/desk/agentivity-desk/): the map of the section.
