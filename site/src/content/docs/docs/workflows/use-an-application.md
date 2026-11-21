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

### Spreadsheets and databases

These steps are in the category **Spreadsheets and databases**, beside Airtable and [Google Sheets](/docs/workflows/use-google-sheets-and-google-calendar/). Adding, changing and deleting rows are changes: an agent does them only when you allow them on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Supabase** | List tables. List rows (with PostgREST's filters, columns and order), insert (or upsert), update, delete rows. Call a function. | It uses the same Supabase connection as the Supabase storage node: the address of the project and an API key. A **secret key** (`sb_secret_…`) reaches every table; a publishable or anon key reaches only what the row level security of the tables allows. Filters are written as PostgREST's: `status=eq.active&age=gte.18`. An update or a delete needs a filter. It changes one row at most, unless you give a higher number: a filter written too wide changes nothing and says so. It works on supabase.co, or on a Supabase of your own reachable on the public web. It has no trigger: Supabase makes its webhooks in its dashboard or in SQL only. |
| **Baserow** | List tables and fields. List rows (search, filters, order, view), read, create, create many, update, delete. | The connection takes a database token, with the tables and permissions it is given. It works on baserow.io, or on a Baserow of your own reachable on the public web. Rows are read and written by field name. It has no trigger: a database token cannot make a webhook in Baserow. |
| **NocoDB** | List bases and tables. List records (filter, order), read, create, create or update, update, delete. | The connection takes an API token. The triggers need its webhooks permission. It works on app.nocodb.com, or on a NocoDB of your own reachable on the public web. Filters are written as NocoDB's: `(Status,eq,Lead)~and(Age,gte,18)`. |
| **Coda** | List docs and tables. List rows (by the value of a column), read, add or update (by key columns), update, delete, push a button. | The connection takes an API token, which can be limited to some docs or tables. Coda now calls itself Superhuman Docs; its API is the same. Coda applies a change a few seconds after the step ends. **Push button** does what the maker of the doc set the button to do. It has no trigger: Coda has no webhooks for a change. |
| **SmartSuite** | List solutions and tables. List records (filter, order), read, create, update, delete. | The connection takes the API key of a user and the ID of the workspace; it acts as that user. Values are given by the slug of each field, which **Table: list** shows. SmartSuite takes five calls a second at most. |

### Product analytics

These steps are in the category **Product analytics**. Sending events and setting the properties of a person are changes: an agent does them only when you allow them on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **PostHog** | Run a query in HogQL. List insights and people. List feature flags, evaluate one for a person. Capture an event. | The connection takes a personal API key with its scopes, and the ID of the project. The token of the project (`phc_…`) is also needed to capture events or evaluate flags. It works on PostHog's US cloud (the default), on its EU cloud (give `eu.posthog.com` as the host), or on a PostHog of your own reachable on the public web. **Run HogQL** lets an agent answer questions on the use of the product in PostHog's SQL. It gives 100 rows unless the `LIMIT` of the query says more. |
| **Mixpanel** | List event names, today's top events, count an event (or segment it by a property), send an event. Read an Insights report. List and read funnels. Find a profile, read its activity, set its properties. | The connection takes a service account (username and secret), the ID of the project and its data residency (`us`, `eu` or `in`). The token of the project is also needed to set profiles. Mixpanel answers 60 queries an hour per project. When no days are given, a count covers the last 30 days. It has no trigger: its webhooks are made in its own settings only. |
| **Plausible** | List sites. Query the stats (metrics, broken down, filtered), see the visitors now. Send an event. | The connection takes a Stats API key, a Business plan feature. It works on plausible.io, or on a Plausible of your own reachable on the public web. The period is `day`, `7d`, `30d`, `month`, `year`, or two days. An event sent from a workflow counts as a visitor's: the server's. It has no trigger: Plausible's alerts are e-mails. |
| **Amplitude** | List and count events (segmented), send an event. Count active users, find a user, read their activity, set their properties. Read a chart. | The connection takes the API key and the secret key of the project, and the region (`us` or `eu`). When no days are given, a count covers the last 30 days. **Find** gives the Amplitude ID of a user, which **Read activity** takes. It has no trigger: its webhooks are made in its own settings only. |
| **Umami** | List websites. Summary of the stats, pageviews by day, the top (pages, sources, countries…), the visitors now. Send an event. | The connection takes an API key. It works on Umami Cloud, or on an Umami of your own reachable on the public web. When no days are given, the stats cover the last 30 days. It has no trigger: Umami has no webhooks. |

### Tables and payments

The payment steps are in the category **Payments**. **A refund is made only by a step of a workflow, never by an agent:** Mollie and PayPal never offer a refund to an agent, even when changes are allowed on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Airtable** | List the records of a table, all of them or those a formula or a view keeps. Read, create, create many (ten in each call), update, create or update (fails when several records match) and delete records. | Give the fields by their name in `fields`. The token needs the scopes `data.records:read`, `data.records:write` and `schema.bases:read`, and the bases the workflows may use. It starts with `pat`. Airtable accepts five calls a second per base: a step that writes many records waits when it needs to. |
| **Stripe** | Create, update, read, list, search and delete customers. List and read payments. Make a payment link. List invoices. Read the balance. | Start with a test key (`rk_test_` or `sk_test_`): workflows run on test data and no money moves. The connection test says whether the key is in test or live mode. A restricted key is recommended: allow only what the workflows need. Deleting a customer is for good and cancels its subscriptions. New customers can take a minute to be found. |
| **Mollie** | Create a payment (it gives the address where the buyer pays), list and read payments, refund a payment (a workflow step only). Create a payment link. List and create customers. | The connection takes the API key of a website profile: `live_…`, or `test_…` to try. The triggers need an organization access token (`access_…`) instead, with the ID of the profile and whether it is for test mode, because Mollie makes webhooks only with such a token. Amounts are given with their cents (49.90). |
| **PayPal** | Create an order (it gives the address where the buyer approves it), read it, capture it. Refund a capture (a workflow step only). List transactions, 31 days at most. Create a draft invoice, send, read and list invoices. | The connection takes the client ID and the secret of an app, and its environment: live or sandbox. PayPal gives a token that lasts some hours, and Agentivity asks for a new one by itself. In the app, turn on **Invoicing**, **Transaction search** and **Webhooks**. An order is paid once the buyer has approved it at its address and it has been captured. Transactions can show up to 3 hours late. |

### Accounting and banking

These steps are in the category **Accounting and banking**, which also holds quotes. **Making an invoice, and writing the answer of a customer to a quote (accepted or refused), are made only by a step of a workflow, never by an agent.**

| Application | What you can do | Worth knowing |
|---|---|---|
| **Pennylane** | List and read customer invoices, create a draft, finalize it, mark it as paid. List customers, create a company or a person. List supplier invoices, products and bank transactions. | The connection takes a company API token (Essential plan or higher). Choose **Read and write** to draft invoices or add customers. Prices on an invoice line are before tax, and the VAT rate is given by its code: `FR_200` is 20 %. A draft gets its number when it is finalized. |
| **Qonto** | List the bank accounts, with their balances. List transactions (money in or out, since a date, or those without a receipt), read one, attach a receipt to it. List labels and members. | **Qonto never moves money here.** It reads the accounts and attaches receipts; transfers stay in Qonto, where they are approved. The connection takes the login of the organization and its secret key. A receipt is given by its public address (PDF, JPEG or PNG). |
| **Sellsy** | List, read and create companies. List and create contacts. List, read and create quotes, and change the status of one (a step only). List and read invoices, and create one (a step only). List opportunities. | The connection takes a personal API client (client ID and secret), made on Sellsy's Developer page. It acts as you. Setting the status of a quote to "sent" only marks it so: Sellsy does not e-mail it. The lines of a quote take one tax for all, given by its ID in Sellsy. It has no trigger: Sellsy's webhooks can be made by its API, but how it signs their calls is not documented. |
| **Axonaut** | List, read and create companies. List and create contacts. List, read and create quotes, and mark one accepted or refused (a step only). List and read invoices, and create one (a step only). List payments. | The connection takes the API key of the account (**Settings** › **API**), which reaches the whole account. It has no trigger: Axonaut's webhooks are made in its own settings only. |

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

These steps are in the category **Customer support**. Replying to a customer, writing in a chat, closing or resolving a conversation are changes: an agent does them only when you allow them on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Zendesk** | List, search (with Zendesk's search, up to 1,000 results), read, create, update and delete tickets. Reply or add a note, and list the comments of a ticket. Search, read and create people. | The connection asks for the account (`acme` for acme.zendesk.com), the e-mail address of the agent and an API token. The tags set by **Update** replace the tags the ticket has. |
| **Freshdesk** | List, search (with Freshdesk's query language, up to 300 results), read (with its conversation), create, update and delete tickets. Reply or add a note. List, find (by e-mail or phone), read, create and update contacts. | The connection asks for the help desk (`acme` for acme.freshdesk.com) and the API key of the agent. The list of tickets covers the last 30 days unless you give a date. It has no trigger. |
| **Intercom** | Search, read, create (a user or a lead) and update contacts, and add a note. Search (by state), read, reply to, add a note to, assign and close conversations. List teammates. | The token is the access token of an app, from Intercom's Developer Hub. Replies, notes, assignments and closings are written as a teammate, chosen from a list. The connection asks for the region of the workspace: US (the default), EU or Australia. It has no trigger. |
| **Help Scout** | List conversations (of a mailbox, by status, with Help Scout's search), read one with its threads, create one, reply, add a note, change the status. List customers or find one by e-mail. List mailboxes. | The connection takes an app of your own (**Your Profile** › **My apps**): its App ID and App Secret. Agentivity asks Help Scout for a token with them, and again when it ends, every two days. What it does is written as the user of the app: replies and notes are yours. A reply goes to the customer of the conversation by e-mail, and can close the conversation at once. |
| **Crisp** | List conversations (those not resolved, or by words), read one and its messages, send a message (to the visitor, or a note), change the state (resolve). Read and create people. | The connection takes a workspace API token, made by the owner of the workspace (its identifier and its key), and the website ID. If the token has an IP allowlist, the address of this instance must be on it. It has no trigger: Crisp's webhooks are made in its own settings, or through a Crisp plugin. |
| **Gorgias** | List tickets, read one with its messages, create one, reply (by e-mail, or as an internal note), update (close, reopen, priority, tags). List customers or find one by e-mail, create one. | The connection takes the account (`acme` for acme.gorgias.com), the e-mail address of an admin and their API key. Replies are written as that person and sent by e-mail to the customer of the ticket. |
| **Front** | List conversations (by status), search (with Front's search), read one and its messages, update (archive, reopen, assign), comment, reply. List contacts and teammates. | The connection takes an API token made by an admin, with the scopes of what it does (read, write, send). A reply archives the conversation unless **Keep the conversation open** is set. It has no trigger: Front's webhooks are made in its own settings only. |
| **LiveChat** | List the chats going on now, search past chats (by words, between two days), read one, send a message (to the customer, or to agents only), end a chat. | The connection takes the Account ID and a personal access token, from LiveChat's Developer Console. For an account hosted in Europe, give `fra` as the region. The triggers also need the Client ID of an app made in the Developer Console, because LiveChat's webhooks belong to an app. Messages are written as the agent of the token. |

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

### Signatures and proposals

These steps are in the category **Signatures and proposals**. Sending a document to be signed, voiding or canceling it, and making a quote are changes: an agent does them only when you allow them on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Yousign** | List and read signature requests, send a document for signature, remind the signers, cancel a request. | The connection takes an API key and its environment: `production`, or `sandbox` to try it out. A key reaches its own environment only. Yousign's API needs a Plus, Pro or Scale plan, and its triggers a production key. **Send for signature** fetches the document (PDF or Word) from its address. Each signer gets it by e-mail and signs with a code sent by e-mail. The signature fields go at the foot of the last page, or where the anchors of the document say. Yousign now calls itself Youtrust; its API is the same. |
| **DocuSign** | List templates. List and read envelopes, send one from a template, send a document, resend, void. | It is connected by **signing in with DocuSign**, with a button, as for [Dropbox](/docs/workflows/use-an-application/#meetings-files-and-boards): Agentivity never sees your password, and you can remove its access in DocuSign, under **My Profile** › **Connected Apps**. Your default account is used, unless you give an account ID. When the installation has no Agentivity app for DocuSign, make one in **Apps and Keys** (its guide gives the redirect address). **Send a document** fetches it from its address; the signers sign in turn, where the document has the anchor text, or where they choose. A DocuSign developer (demo) account cannot be connected. The triggers need an admin of the account and a Connect key made in DocuSign (**Settings** › **Connect** › **Connect Keys**), given on the connection: DocuSign makes none by its API. |
| **PandaDoc** | List templates. List and read documents, create one from a template (and send it), send one. | The connection takes an API key. A sandbox key marks its documents `[DEV]` and sends them only to e-mail addresses of your own domain. A production key needs PandaDoc's Enterprise plan. A document made from a template takes a few seconds to be ready: **Create** waits for it before sending, when asked to send. |

**How to write the signers and the lines**
- **Signers and recipients**, one per line: `Anna Lee <anna@acme.co>`. For the role of a template, add it after: `Anna Lee <anna@acme.co> as Client`.
- **Lines of a quote or an invoice**, one per line: `2 x Consulting day @ 600 (20%)`, that is the quantity, the product, the price before tax and the tax rate. Only the product and the price are needed.

### Development and operations

These steps are in the category **Development and operations**. Running a pipeline, deploying or resolving an incident are changes: an agent does them only when you allow them on its tool.

| Application | What you can do | Worth knowing |
|---|---|---|
| **GitLab** | List projects. List, read, create, update (or close and reopen) and comment on issues. List, read and comment on merge requests. List and run pipelines. | The connection takes an access token with the **api** scope. It works on gitlab.com, or on a GitLab of your own if it is reachable on the public web: a GitLab on a private network is refused. The triggers need a Maintainer of the project, because they make its webhook. |
| **Sentry** | List projects. List issues (with Sentry's search), read one, read its latest event with the stack trace, update it (resolve, ignore, assign). | The connection takes the token of an internal integration, the slug of the organization and the region (`us`, or `de` for Europe). A list gives its first page, 100 at most. |
| **Vercel** | List projects. List, read, redeploy, promote to production and cancel deployments. List the environment variables of a project. | The connection takes an access token, and the ID of the team for a team. Environment variables are listed by name only: their values are never read. The triggers need a Pro or Enterprise plan. |
| **PagerDuty** | List, read, create, acknowledge and resolve incidents, and add a note. Send an alert. List who is on call, services and users. | The connection takes an API key (full access to change incidents, read-only otherwise), the e-mail address of the PagerDuty user the changes are made as, and the region (`us` or `eu`). **Send an alert** takes the routing key of a service integration: PagerDuty then opens or groups incidents by the rules of the service. |
| **Bitbucket** | List repositories. List, read, create and comment on pull requests. List and run pipelines. | The connection takes an access token of a workspace or a repository, because app passwords no longer exist, and the slug of the workspace. The token needs the scopes of what it does, with webhooks for the triggers. |

### People and recruiting

These steps are in the category **People and recruiting**. They hold the data of employees and candidates. **An agent reads by default and changes nothing unless you allow it on its tool. Disqualifying a Workable candidate is made only by a step of a workflow, never by an agent.** Lucca only reads.

| Application | What you can do | Worth knowing |
|---|---|---|
| **Lucca** | List and read people. List absences (of some people or a department, between two days) and leave requests. List departments and legal entities. | It only reads: nothing is changed in Lucca. The connection takes an API key and the account (`acme` for acme.ilucca.net). In Lucca, the role of the key says what it may read: give it the **Directory** and **Absences**. It has no trigger yet: Lucca's newer API, which has webhooks, gives no absences. |
| **BambooHR** | List the directory, read, create and update employees. List time-off requests, see who is out, request time off. List jobs and applications. | The connection takes an API key and the domain of the company (`acme` for acme.bamboohr.com). The triggers need a user allowed to manage webhooks. |
| **Personio** | List people or find one by e-mail, read. List absences and their kinds, request an absence. List applications. | The connection takes API credentials (client ID and secret) with the access of what they do. Personio gives a token that lasts a day, and Agentivity asks for a new one by itself. |
| **Greenhouse** | List candidates or find one by e-mail, read, create (with their application to a job, or as a prospect), add a note. List applications and move them. List jobs and users. | The connection takes **Harvest V3** credentials (client ID and secret). To write notes and moves as a person rather than as the integration, give the Greenhouse ID of that user too. Greenhouse's older Harvest API, with a key, was removed in August 2026. A list gives its first page, 500 at most. It has no trigger: Greenhouse sets its webhooks only in its own settings. |
| **Workable** | List jobs. List, read, create, move and comment on candidates, and disqualify one (a workflow step only). List members. | The connection takes an access token and the account (`acme` for acme.workable.com). A change, such as a move or a comment, is written as a member, given by their ID from **List members**. A candidate you add is "sourced", with no e-mail to them, unless you say "as if they applied". |

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
