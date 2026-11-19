---
title: "Use an application in a workflow or as a tool"
description: "Send an e-mail with Resend, add a card in Trello, open a GitHub issue or book a call: one step and one agent tool for each application, with no AI model."
sidebar:
  order: 11
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/workflows/use-an-application.md. Do not edit here: edit the source and publish again. -->

Agentivity talks to many online applications: Resend, WooCommerce, GitHub, Trello, Webflow, Calendly and others. Each application gives you two nodes, and neither uses an AI model or spends tokens:

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
2. Drag the step onto the canvas and choose its connection. **No connection** takes it off again: the step is saved without it, and you complete it later.
3. Choose what it does (its **operation**), for example **Create** or **List**, then fill in its fields.
4. Link it in the workflow and select **Publish**.

What the step gives back can be used by the next steps, by name. Run it once and look at it in the **Inspector**: see [Run a workflow and follow each step](/docs/workflows/run-a-workflow/).

## The applications

Every field and every operation of each step is in the [reference of the nodes](/docs/reference/nodes/).

### E-mail and marketing

| Application | What you can do | Worth knowing |
|---|---|---|
| **Resend** | Send an e-mail, read a sent e-mail and its latest status (delivered, opened, bounced). Add, read, update, list and delete contacts. | The sender is an address on a domain verified in Resend. The key starts with `re_`. |
| **lemlist** | List campaigns. Add a lead to a campaign, find one by e-mail, pause, resume, remove it from a campaign. List activities. | The connection takes the API key of the team. Adding a lead to a campaign starts the e-mails and steps of that campaign, sent by lemlist. A person already in another campaign stays there unless the step says otherwise. The triggers need a user allowed to edit the integrations of the team. |
| **Brevo** | Send an e-mail, written here or from a Brevo template. Create or update, read, update, list and delete contacts and their lists. | The sender must be verified in Brevo (**Senders, Domains & Dedicated IPs**, then **Senders**). The key starts with `xkeysib-`. Brevo may limit sending from a new account until it has reviewed the account. |
| **MailerLite** | Create or update a subscriber, read and list subscribers, add to or remove from a group, delete one, or forget one and all its data for good. | |
| **Mailchimp** | Create or update a member of an audience, read and list members, tag, archive, delete for good. List campaigns. | The key acts for the person who made it and does not expire: delete it in Mailchimp to take the access back. |
| **Klaviyo** | Find or list profiles, read one, create or update one, subscribe a profile to a list. List the lists and the campaigns. Track an event (a metric such as Placed Order), which Klaviyo's flows and segments can start from. | The key is a private API key (`pk_…`) with the access the guide lists. **Subscribe to a list** records the consent of the person to marketing: use it only for people who agreed. It has no trigger: Klaviyo opens its webhooks only to some accounts. |
| **ActiveCampaign** | List contacts (by e-mail, words or list), read one, create or update one, add a tag (made when it is new), add to a list or unsubscribe, add a note. List, read, create and update deals, or mark one won or lost. | The connection asks for the account (`acme` for acme.api-us1.com) and the API key, both in **Settings** › **Developer**. A contact is given by ID or by e-mail address. A deal's value is in the units of the currency (1200.50), EUR by default. |

### Messaging

These steps are in the category **Messaging**, named **Messages between people: team chats, SMS, WhatsApp**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Telegram** | Send, edit and delete messages, photos and files with a bot. Read chats. | You make the bot with **@BotFather** (`/newbot`) and paste its token. A person must open the bot and press **Start** once. A group must add the bot. A channel must add it as an administrator allowed to post. To find the ID of a chat, send it a message, then open `https://api.telegram.org/bot<token>/getUpdates` in a browser: the ID is under `chat`, `id`. A public channel can also be given as `@its_name`. |
| **Discord** | Post, edit, read and delete messages in the channels of a server with a bot. Add reactions. | In the Discord Developer Portal, make an application, then a bot, and paste its token. To read messages, turn on **Message Content Intent**. Invite the bot with the permissions **View Channels**, **Send Messages**, **Read Message History** and **Add Reactions** (and **Manage Messages** to delete other people's messages). In the step, choosing the server lists its channels. |

| **Twilio** | Send a message by SMS, or by WhatsApp (write `whatsapp:+33…` on both numbers). List and read messages. List the phone numbers of the account. | The connection takes the **Account SID** and the **Auth Token** from the Twilio Console. An API key cannot replace the Auth Token, because Twilio signs the incoming messages with it. WhatsApp through Twilio needs a number enabled for WhatsApp, or Twilio's WhatsApp sandbox to try it. |
| **WhatsApp Business** | Send a text, send a template approved by Meta, mark a message as read. List the templates. | The connection needs a Meta app with WhatsApp and a system user token, and asks for the phone number ID, the WhatsApp Business Account ID (for the templates and the trigger) and the app secret (for the trigger). Its guide gives the steps. A free text reaches only someone who wrote to you in the last 24 hours. Outside that, only a template approved by Meta does, to people who agreed to get messages. |

### Email sending

These steps are in the category **Email sending**. A send only says the e-mail was accepted: what became of it (delivered, opened, bounced) comes through [triggers](/docs/workflows/start-on-its-own-with-triggers/).

| Application | What you can do | Worth knowing |
|---|---|---|
| **SendGrid** | Send an e-mail, written here or from a dynamic template. Create or update a contact (with a list) and find one by e-mail. List the lists and the templates. | The key (`SG.…`) is a restricted key with the access the guide lists. The connection asks for a region: `us`, or `eu` for an EU subuser. A contact is saved within a few minutes. |
| **Postmark** | Send an e-mail, written here or from a template. List the sent messages, the bounces and the templates. | The connection takes the API token of one server. |
| **Mailgun** | Send an e-mail, written here or from a template. List the domains. Add or update a member of a mailing list. | The connection takes an API key, the sending domain (`mg.acme.co`) and the region (`us`, or `eu` when you open Mailgun at app.eu.mailgun.com). |

### Tables and payments

The payment steps are in the category **Payments**. **A refund is made only by a step of a workflow, never by an agent:** Mollie and PayPal never offer a refund to an agent, even when changes are allowed on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Airtable** | List the records of a table, all of them or those a formula or a view keeps. Read, create, create many (ten in each call), update, create or update (fails when several records match) and delete records. | Give the fields by their name in `fields`. The token needs the scopes `data.records:read`, `data.records:write` and `schema.bases:read`, and the bases the workflows may use. It starts with `pat`. Airtable accepts five calls a second per base: a step that writes many records waits when it needs to. |
| **Stripe** | Create, update, read, list, search and delete customers. List and read payments. Make a payment link. List invoices. Read the balance. | Start with a test key (`rk_test_` or `sk_test_`): workflows run on test data and no money moves. The connection test says whether the key is in test or live mode. A restricted key is recommended: allow only what the workflows need. Deleting a customer is for good and cancels its subscriptions. New customers can take a minute to be found. |
| **Mollie** | Create a payment (it gives the address where the buyer pays), list and read payments, refund a payment (a workflow step only). Create a payment link. List and create customers. | The connection takes the API key of a website profile: `live_…`, or `test_…` to try. The triggers need an organization access token (`access_…`) instead, with the ID of the profile and whether it is for test mode, because Mollie makes webhooks only with such a token. Amounts are given with their cents (49.90). |
| **PayPal** | Create an order (it gives the address where the buyer approves it), read it, capture it. Refund a capture (a workflow step only). List transactions, 31 days at most. Create a draft invoice, send, read and list invoices. | The connection takes the client ID and the secret of an app, and its environment: live or sandbox. PayPal gives a token that lasts some hours, and Agentivity asks for a new one by itself. In the app, turn on **Invoicing**, **Transaction search** and **Webhooks**. An order is paid once the buyer has approved it at its address and it has been captured. Transactions can show up to 3 hours late. |

### Accounting and banking

These steps are in the category **Accounting and banking**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Pennylane** | List and read customer invoices, create a draft, finalize it, mark it as paid. List customers, create a company or a person. List supplier invoices, products and bank transactions. | The connection takes a company API token (Essential plan or higher). Choose **Read and write** to draft invoices or add customers. Prices on an invoice line are before tax, and the VAT rate is given by its code: `FR_200` is 20 %. A draft gets its number when it is finalized. |
| **Qonto** | List the bank accounts, with their balances. List transactions (money in or out, since a date, or those without a receipt), read one, attach a receipt to it. List labels and members. | **Qonto never moves money here.** It reads the accounts and attaches receipts; transfers stay in Qonto, where they are approved. The connection takes the login of the organization and its secret key. A receipt is given by its public address (PDF, JPEG or PNG). |

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
| **Zoho CRM** | List, search (by e-mail, words or Zoho's criteria), read, create or update, update records of leads, contacts, accounts and deals, and add a note. Convert a lead into a contact, an account and a deal. | The connection is a **Self Client** made in Zoho's API Console (client ID and secret), with the ID of the organization and the data center (`eu` by default; `us`, `in`, `au`, `jp`, `ca` or `cn`). The fields of a record are given by their API name: `{"Last_Name": "Martin"}`. **Create or update** finds the same record by e-mail address unless you name other fields. |
| **Close** | List, read, create (with its first contact) and update leads. Create an opportunity. Add a note and a task. | The connection takes an API key, which belongs to your user. The value of an opportunity is in the units of the currency (4800.00). The triggers need the right to manage webhooks. |
| **Copper** | Search, read, create and update people, companies, leads and opportunities, and add a note. Add a task. | The connection takes an API key and the e-mail address of the user who made it. |
| **folk** | List people or find one by e-mail, read, create (with its company and group) and update. List and create companies. List groups. Add a note. | The connection takes the API key of the workspace. folk may merge a person you add with one already there. |

### Customer support

These steps are in the category **Customer support**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Zendesk** | List, search (with Zendesk's search, up to 1,000 results), read, create, update and delete tickets. Reply or add a note, and list the comments of a ticket. Search, read and create people. | The connection asks for the account (`acme` for acme.zendesk.com), the e-mail address of the agent and an API token. The tags set by **Update** replace the tags the ticket has. |
| **Freshdesk** | List, search (with Freshdesk's query language, up to 300 results), read (with its conversation), create, update and delete tickets. Reply or add a note. List, find (by e-mail or phone), read, create and update contacts. | The connection asks for the help desk (`acme` for acme.freshdesk.com) and the API key of the agent. The list of tickets covers the last 30 days unless you give a date. It has no trigger. |
| **Intercom** | Search, read, create (a user or a lead) and update contacts, and add a note. Search (by state), read, reply to, add a note to, assign and close conversations. List teammates. | The token is the access token of an app, from Intercom's Developer Hub. Replies, notes, assignments and closings are written as a teammate, chosen from a list. The connection asks for the region of the workspace: US (the default), EU or Australia. It has no trigger. |

### E-commerce

These steps are in the category **E-commerce**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **WooCommerce** | List and read orders, change the status of one, add a note (private, or sent to the customer). List, read, create (as a draft by default) and update products. List customers or find one by e-mail, read and create customers. | The connection asks for the address of the store (`shop.acme.com`) and a REST API key: its consumer key and its consumer secret, made in **WooCommerce** › **Settings** › **Advanced** › **REST API**. The store must answer over https on the public web: an address on a private network is refused. A key with **Read/Write** is needed for the changes and for the triggers. Setting an order to completed makes WooCommerce e-mail the customer, as it always does. A refund is made in WooCommerce, not here. |
| **Shopify** | List and read orders, and add tags. List, read, create (as a draft by default) and update products. List or search, read, create and tag customers. | Since 2026, a store connects an app made in Shopify's Dev Dashboard and installed on the store, with its client ID and client secret. Shopify gives the app a token that lasts a day, and Agentivity asks for a new one by itself. An app made in the store's admin before 2026 still works with its Admin API access token (`shpat_…`) and its API secret key. Lists of orders cover the last 60 days unless the app may read all orders. |

### Sites and the content they publish

These steps are in the category **CMS**, named **Sites and the content they publish**.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Webflow** | List the sites. List collections and read their fields. List items (drafts included, or only the live ones), read, create (a draft by default), update and publish them. List the submissions of a form. | The connection takes a site API token, which reaches one site, with the scopes the guide lists. A new item is a draft until published, and publishing it does not publish the whole site again. The fields other than the name and the slug are given by their slug, which **Read** on the collection shows. |
| **Contentful** | List content types. List (by content type or words), read, create (a draft), update, publish and unpublish entries. List assets. | The connection takes a personal access token (`CFPAT-…`). Fields are given plainly with a locale (`en-US` by default), or per locale. **Update** changes only the fields given. The connection asks for the region of the space: US (the default) or EU. |

### Meetings, files and boards

| Application | What you can do | Worth knowing |
|---|---|---|
| **Zoom** | List meetings (to come, past, live), read, create (it gives the address to join), update and delete one, list its participants, read its transcript as text. List and read recordings, a month at most. | These steps are in the category **Video meetings**. The connection is a **Server-to-Server OAuth** app made by the admin of the account in the Zoom App Marketplace: its account ID, client ID and client secret, and the e-mail address of a default user. Such an app works for the whole account, not as one person: a step names whose meetings by e-mail address, or uses the default user. The triggers also need the secret token of the app, from its **Features** page. A transcript exists only for a meeting with a cloud recording and audio transcripts turned on, and Zoom makes it some minutes after the meeting. |
| **Dropbox** | List a folder, search, read the details of a file or a folder, read a text file, upload (a text, or a file from a public address), create a folder, move or rename, delete, make a share link. | It is connected by **signing in with Dropbox**, with a button, as for [Google](/docs/guides/connect-google/): Agentivity never sees your password, and you can remove its access in Dropbox, under **Settings** › **Connected apps**. When the installation has no Agentivity app for Dropbox, make one in Dropbox's App Console (**Scoped access**) and give its app key and secret in the connection. Its guide gives the permissions and the redirect address. **Read text** reads text files only (`.txt`, `.md`, `.csv`, `.json`…), 2 MB at most: a PDF is read by a Document step. It has no trigger: Dropbox sets its webhooks only in the console of an app. |
| **Box** | List and create folders. Search files, read their details and their text, upload, make a share link, comment. | The connection is a **Custom App** with Client Credentials Grant (client ID, client secret and enterprise ID), approved by a Box admin. It works as its own service account: share with it the folders it uses. The triggers need the signature keys of the app, from the Developer Console. Box cannot watch the root folder. |
| **Miro** | List, read and create boards, invite people. List items, add a sticky note, a card or a frame. | The step is in the category **Documents, presentations and whiteboards**. The connection takes the token given by **Install app and get OAuth token** in the Miro app, which must be made with **Expire user authorization token** unticked so that the token lasts. It has no trigger: Miro removed its webhooks on 5 December 2025. |

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
