---
title: "Subscription: plan, packs and invoices"
description: "Choose, change or cancel the plan of a hosted workspace, buy execution packs, set the automatic recharge, and find your invoices."
sidebar:
  order: 6
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/administration/subscription.md. Do not edit here: edit the source and publish again. -->

**Subscription** is the pane of a hosted workspace where you manage the plan, its payment and its invoices. It is in the group **Billing** of [Administration](/docs/administration/what-administration-is/), and shows to the people who have the right to manage billing: the owner and the administrators. Stripe takes the payment: Agentivity never sees your card. Prices are not given in this documentation: see [pricing](/pricing).

## Your plan

The top block says which plan the workspace has, and where it stands, with a label:

| Label | What it means |
|---|---|
| **Trial · N days left** | The 14-day trial is running. It ends on the date given. |
| **Active** | The plan is paid and running. The block says whether it is billed yearly or monthly. |
| **Ends on** a date | You cancelled. Everything works as today until that date. |
| **Trial ended**, **Ended**, **No plan** | The workspace has no plan in force. See [A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/). |
| **Payment due** | The last payment failed. Update your card in **Payment and invoices**, or the workspace stops. |
| **Set by Agentivity** | The plan was given to the workspace by Agentivity. |

A bar, **Executions this month**, shows the executions used against what the plan allows. When the pace of the month would use them all, the pane says on which day they would run out: "a pack or a bigger plan keeps you going."

## Choose a plan

Under **Plans**, a switch chooses **Monthly** or **Yearly · 2 months free**. Yearly is the choice offered first. Each card shows what the plan gives: Personal for one person, Pro for up to 3 people, Business for up to 15 and with groups and the audit journal. The full limits are in [Plans and their limits](/docs/hosted/plans-and-limits/). Prices shown are without VAT.

**Choosing a plan during the trial ends the trial.** The plan starts at once, and so does its payment. Everything you built stays. You pay on a page of Stripe, by card. Payment by card is the only way today.

## Change plan, cancel

- **Change plan** switches to another plan, or between yearly and monthly. The change is prorated: you pay the difference for the rest of the period.
- **Cancel subscription** first opens a window, **Before you go**, with the subtitle "Cancelling" and the name of your plan. Nothing is cancelled yet. See below.
- Once the subscription is cancelled, it ends at the end of the period you paid and does not renew. Until then everything works. Change your mind with **Keep my subscription**.
- **Payment and invoices** opens the customer area of Stripe, where you change your card and download your invoices.

### Before you go

The window **Before you go** says what cancelling means, so that you can decide:

- When the workspace ran executions this month, it says "Your workspace ran N executions this month."
- "Your plan stays until" the end date of the period you paid, "everything works until then."
- "After that, your workspace is read only: everyone still signs in and sees everything, nothing new runs."
- "30 days later it is paused, and your data is kept for 120 days in all."
- "You can export everything at any time, in Administration › Data, and come back by choosing a plan."

These dates are those of [A workspace without a plan](/docs/hosted/a-workspace-without-a-plan/).

Three buttons close the window:

| Button | What it does |
|---|---|
| **Keep my plan** | Closes the window. Nothing happens. |
| An offer | Goes to the page of Stripe to switch. If you pay by month, it is the same plan by year, for example **Switch to yearly · save** an amount. If you pay by year, it is the plan below yours, for example **Switch to Pro** with its price a month. On the smallest plan paid by year, there is no offer. |
| **Cancel anyway** | Goes to the confirmation of Stripe, as before. The subscription is cancelled only there. |

## Execution packs

A pack adds executions to a paid plan. The sizes are 1 000, 5 000 and 20 000 executions. A pack is used once the executions of the month are used, and is kept until used: it has no end date. A pack is not refunded. Choose a plan first: a pack adds to a paid plan.

### Automatic recharge

**Recharge automatically** is on by default. When the month is about to run out, a pack is bought with the card of the subscription, with its invoice and an e-mail. By default the pack is 1 000 executions and it is bought at most 3 times a month: you can choose the pack, and a limit from once to ten times a month. If there is no card, or the card is declined, you get an e-mail "Automatic recharge could not be paid".

## Alerts about the month

- E-mails to the owner when 50 %, 80 % and 100 % of the executions of the month are used, and when the pace of the month would use them all. You get one e-mail for each alert and each month: the most serious only.
- A message when a person with the right to manage billing signs in: **No executions left this month**, **At this pace, no executions left on** a date, or **N % of the executions of the month used**. Choose **Remind me tomorrow** or **See packs and plans**.

## How to know it worked

This page was written from the code, and none of it was tried on a hosted workspace. After a choice of plan, the pane should show **Active** and the plan you chose; the invoice is in **Payment and invoices**.

## Next step

[Hosted workspaces: start one](/docs/hosted/start-a-hosted-workspace/).
