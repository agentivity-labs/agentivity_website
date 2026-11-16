---
title: "Use an application in a workflow or as a tool"
description: "Send an e-mail with Resend, add a card in Trello, open a GitHub issue or book a call: one step and one agent tool for each application, with no AI model."
sidebar:
  order: 11
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/workflows/use-an-application.md. Do not edit here: edit the source and publish again. -->

Agentivity talks to many online applications: Resend, GitHub, Trello, Asana, Calendly and others. Each application gives you two nodes, and neither uses an AI model or spends tokens:

- **A step**, in the category **Applications** of the **Nodes catalog**. Use it in a workflow.
- **An agent tool**, named **AI Agent … Tool** (for example **AI Agent Trello Tool**). Plug it into an agent so that the agent decides when to use it. See [Give tools to an agent](/docs/agents/give-tools-to-an-agent/).

Both do the same thing. The tool reads by default: you allow each change on the tool itself, so that an agent never writes or deletes anything you did not allow.

## What you need

- An account at the application.
- A connection to it, made in **Administration** › **Credentials**.

## Make the connection

1. In **Administration** › **Credentials**, select **New credentials** and choose the application.
2. Follow the guide shown in the window. It says where to find the key or the token in the application, and what each field is for.
3. Paste the key or the token, then save.

The key or the token acts for the person who made it, with their access in the application. A connection is a secret: it stays on your server and is shown as dots. See [Manage credentials](/docs/guides/manage-credentials/).

## Use the step

1. In the **Nodes catalog**, search for the application, or open **Applications**.
2. Drag the step onto the canvas and choose its connection.
3. Choose what it does (its **operation**), for example **Create** or **List**, then fill in its fields.
4. Link it in the workflow and select **Publish**.

What the step gives back can be used by the next steps, by name. Run it once and look at it in the **Inspector**: see [Run a workflow and follow each step](/docs/workflows/run-a-workflow/).

## The applications

Every field and every operation of each step is in the [reference of the nodes](/docs/reference/nodes/).

### E-mail and marketing

| Application | What you can do | Worth knowing |
|---|---|---|
| **Resend** | Send an e-mail, read a sent e-mail and its latest status (delivered, opened, bounced). Add, read, update, list and delete contacts. | The sender is an address on a domain verified in Resend. The key starts with `re_`. |
| **Brevo** | Send an e-mail, written here or from a Brevo template. Create or update, read, update, list and delete contacts and their lists. | The sender must be verified in Brevo (**Senders, Domains & Dedicated IPs**, then **Senders**). The key starts with `xkeysib-`. Brevo may limit sending from a new account until it has reviewed the account. |
| **MailerLite** | Create or update a subscriber, read and list subscribers, add to or remove from a group, delete one, or forget one and all its data for good. | |
| **Mailchimp** | Create or update a member of an audience, read and list members, tag, archive, delete for good. List campaigns. | The key acts for the person who made it and does not expire: delete it in Mailchimp to take the access back. |

### Messaging

| Application | What you can do | Worth knowing |
|---|---|---|
| **Telegram** | Send, edit and delete messages, photos and files with a bot. Read chats. | You make the bot with **@BotFather** (`/newbot`) and paste its token. A person must open the bot and press **Start** once. A group must add the bot. A channel must add it as an administrator allowed to post. To find the ID of a chat, send it a message, then open `https://api.telegram.org/bot<token>/getUpdates` in a browser: the ID is under `chat`, `id`. A public channel can also be given as `@its_name`. |
| **Discord** | Post, edit, read and delete messages in the channels of a server with a bot. Add reactions. | In the Discord Developer Portal, make an application, then a bot, and paste its token. To read messages, turn on **Message Content Intent**. Invite the bot with the permissions **View Channels**, **Send Messages**, **Read Message History** and **Add Reactions** (and **Manage Messages** to delete other people's messages). In the step, choosing the server lists its channels. |

### Tables and payments

| Application | What you can do | Worth knowing |
|---|---|---|
| **Airtable** | List the records of a table, all of them or those a formula or a view keeps. Read, create, create many (ten in each call), update, create or update (fails when several records match) and delete records. | Give the fields by their name in `fields`. The token needs the scopes `data.records:read`, `data.records:write` and `schema.bases:read`, and the bases the workflows may use. It starts with `pat`. Airtable accepts five calls a second per base: a step that writes many records waits when it needs to. |
| **Stripe** | Create, update, read, list, search and delete customers. List and read payments. Make a payment link. List invoices. Read the balance. | Start with a test key (`rk_test_` or `sk_test_`): workflows run on test data and no money moves. The connection test says whether the key is in test or live mode. A restricted key is recommended: allow only what the workflows need. Deleting a customer is for good and cancels its subscriptions. New customers can take a minute to be found. |

### Projects and tasks

| Application | What you can do | Worth knowing |
|---|---|---|
| **GitHub** | Create, update, read, list and comment on issues. Search issues and pull requests. List pull requests. | The search returns 1,000 results at most. A fine-grained token sees only the repositories it was given. The token starts with `github_pat_`. |
| **Linear** | Create, update, read, list and comment on issues, and move them to another state. | The key is a personal API key and starts with `lin_api_`. It acts with your access to the teams. |
| **Trello** | Add, update, move, read, list and delete cards, and comment on them. | The connection asks for a key and a token. You pick the board, then the list, from menus. |
| **Jira** | Create, read, update and search issues (with JQL), move them along their workflow, comment. | The connection asks for the site, for example `acme` for acme.atlassian.net, besides the token. |
| **Asana** | List projects, tasks and people. Read, create, update (or mark done), delete and comment on tasks. | A deleted task stays 30 days in Asana's trash. |
| **ClickUp** | List, read, create, update, delete and comment on tasks. Changing a task's status can close it. | You choose the list from the workspace, the space and the folder. A list outside any folder is given by its ID. The token starts with `pk_`. |
| **monday.com** | List boards, their columns and their groups. List, read, create, update the column values of, move to a group, archive and delete items. Add and list updates (comments). | The connection takes a personal API token. An item's columns are set by column ID, with JSON as monday writes them, for example `{"status": {"label": "Done"}}`. **List columns** gives the IDs. A missing status label is created. |
| **Todoist** | List projects. List, search (with Todoist's filters: today, overdue…), read, create, update, complete, reopen and delete tasks. Add a comment. | It has no trigger: Todoist's webhooks belong to a registered app, not to a personal token. |

### Sales and customers

| Application | What you can do | Worth knowing |
|---|---|---|
| **Pipedrive** | Create, update, read and find people, organizations and deals, and add activities and notes. | The connection asks for the company domain, for example `acme` for acme.pipedrive.com, besides the token. |
| **Attio** | Search, read, create, create or update (by a unique attribute), update and delete records of any object: people, companies, deals, your own. Add a note or a task. List attributes. | Values are given by attribute slug. |

### Customer support

These steps are in the category **Customer support**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Zendesk** | List, search (with Zendesk's search, up to 1,000 results), read, create, update and delete tickets. Reply or add a note, and list the comments of a ticket. Search, read and create people. | The connection asks for the account (`acme` for acme.zendesk.com), the e-mail address of the agent and an API token. The tags set by **Update** replace the tags the ticket has. |
| **Freshdesk** | List, search (with Freshdesk's query language, up to 300 results), read (with its conversation), create, update and delete tickets. Reply or add a note. List, find (by e-mail or phone), read, create and update contacts. | The connection asks for the help desk (`acme` for acme.freshdesk.com) and the API key of the agent. The list of tickets covers the last 30 days unless you give a date. It has no trigger. |
| **Intercom** | Search, read, create (a user or a lead) and update contacts, and add a note. Search (by state), read, reply to, add a note to, assign and close conversations. List teammates. | The token is the access token of an app, from Intercom's Developer Hub. Replies, notes, assignments and closings are written as a teammate, chosen from a list. Only workspaces hosted in the US are reached for now. It has no trigger. |

### E-commerce

This step is in the category **E-commerce**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Shopify** | List and read orders, and add tags. List, read, create (as a draft by default) and update products. List or search, read, create and tag customers. | Since 2026, a store connects an app made in Shopify's Dev Dashboard and installed on the store, with its client ID and client secret. Shopify gives the app a token that lasts a day, and Agentivity asks for a new one by itself. An app made in the store's admin before 2026 still works with its Admin API access token (`shpat_…`) and its API secret key. Lists of orders cover the last 60 days unless the app may read all orders. |

### Forms and bookings

| Application | What you can do | Worth knowing |
|---|---|---|
| **Typeform** | List and read forms. List the responses (since, until, words, sent or started) and delete one. | Answers come by question title. Webhooks, so the trigger, need a paid Typeform plan. |
| **Tally** | List and read forms and their questions. List and delete submissions. | A choice comes as its text and a file as its address. Hidden fields come apart. |
| **Calendly** | List event types. List, read and cancel meetings, and list their invitees. Create a booking link (one use, 90 days). | Works on Calendly's free plan. |
| **Cal.com** | List event types and free slots. List, read, create, move and cancel bookings. | **Create** books a time for someone: take it from the free slots. |

## How to know it worked

Run the workflow once. The step shows what the application gave back: in the **Inspector**, the outputs of the step. The change is visible in the application itself: the e-mail, the card, the issue.

## If it does not work

- **The step says it cannot connect.** The key or the token is wrong, has expired or lacks an access. Make a new one in the application and paste it in the connection.
- **An agent never changes anything.** The tool reads by default. Allow the change on the tool.
- **The application refuses an operation.** Your plan at the application may not include it. Typeform webhooks, for example, need a paid plan.

## Next step

[Start an agent, a team or a workflow on its own](/docs/workflows/start-on-its-own-with-triggers/): a new answer in a form, a booked call, a paid invoice.
