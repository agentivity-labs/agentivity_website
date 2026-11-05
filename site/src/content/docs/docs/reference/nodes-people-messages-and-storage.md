---
title: "People, messages, storage and application nodes"
description: "Reference of the nodes that ask a person, send and read messages, store values, and connect to outside applications."
sidebar:
  order: 7
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-people-messages-and-storage.md. Do not edit here: edit the source and publish again. -->

<!-- Written from a running server by tools/reference.mjs. Do not edit this page by hand. -->

The steps that ask a person, send and read messages, store values, and work with outside applications.

This page lists 17 nodes. [How to read a node reference](/docs/reference/nodes/).

## Interactions

Human-in-the-loop workflow nodes and approvals.

### Card

Step · in the catalogue: Interactions · type `interaction.card`

Shows a card to a person through the connected channel: a title, rows of label and value, and buttons when a choice is wanted.

**When to use it.** To show a recap as a clean card in the chat (what is about to be done, the settings that will be used, a result), and, with choices, wait for the button the person clicks before going on: Continue or Change, Approve or Reject. Without choices it shows the card and goes on. For an answer typed in fields, use Form Interaction; for a free message, Human Interaction.

**Effects.** sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `title` | Text | yes |  | The title of the card. |
| `message` | Text | no |  | A short text under the rows. |
| `rows` | Structured | no |  | The rows of the card, in their order. |
| `choices` | TextList | no |  | The choices offered, one button each (Continue, Change). None: the card is only shown and the workflow goes on. |
| `timeout_minutes` | Number | no | `0` | How long to wait for the choice, in minutes (0 = the channel's own). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `choice` | Text | The choice clicked, as written in choices; empty when the card offers none, or the person wrote something else. |
| `reply` | Text | What the person answered, as given. |
| `responded_by` | Text | Who answered. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The card was shown, and the choice made when it offers some)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Channel** | yes | `interaction.channel.*` | 1 |

### Form Interaction

Step · in the catalogue: Interactions · type `interaction.form`

Collects structured form input through the connected channel

**When to use it.** To ask a person to fill in a few fields, described as a JSON list of fields, and wait for the answer before going on, for example an approval with a comment. For a free-text message, use Human Interaction instead.

**Effects.** sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `title` | Text | no |  | Title shown to the user. |
| `description` | Text | no |  | Description/instructions. |
| `fields` | Structured | yes |  | The fields the person fills in, in their order. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `response_data` | Text | User response as JSON |
| `responded_by` | Text | Who responded |
| `outcome` | Text | Response outcome |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The answer was given)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Channel** | yes | `interaction.channel.*` | 1 |

### Human Interaction

Step · in the catalogue: Interactions · type `interaction.human`

Performs a generic human interaction through the connected channel

**When to use it.** To send a message to a person through the connected channel and, if needed, wait for the reply; it can also update, delete or search messages there. To collect precise answers in fields, use Form Interaction instead.

**Effects.** sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `operation` | Choice | no | `send` | Interaction operation. Choices: `send`, `send_and_wait`, `receive`, `update`, `delete`, `search`. |
| `message` | Text | no |  | Free-text message body. |
| `message_id` | Text | no |  | Existing message identifier for update/delete. |
| `thread_id` | Text | no |  | Conversation thread identifier. |
| `conversation_id` | Text | no |  | Conversation identifier. |
| `query` | Text | no |  | Search query. |
| `timeout_minutes` | Number | no | `0` | Optional wait timeout in minutes (0 = channel default). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `success` | Boolean | Whether the interaction operation succeeded |
| `outcome` | Text | Interaction outcome |
| `response_text` | Text | Free-text response received from the human or channel |
| `responded_by` | Text | Who responded |
| `message_id` | Text | Message identifier |
| `thread_id` | Text | Thread identifier |
| `conversation_id` | Text | Conversation identifier |
| `messages` | Text | Search results or returned messages as JSON |
| `error` | Text | Error message if the operation failed |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Channel** | yes | `interaction.channel.*` | 1 |

## Communication

Messaging and communication workflow nodes.

### Get Email

Step · in the catalogue: Communication · type `communication.email.get`

Reads one e-mail of a mailbox in full, by its id: who, when, subject, the whole text and the list of its attachments.

**When to use it.** After Read Emails listed e-mails without their text, or inside a loop over its ids, to work on one e-mail at a time.

**Example.** id: read.id

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Mailbox (IMAP connection) to read. Connection of type `imap`. |
| `folder` | Text | no | `INBOX` | Folder the e-mail is in. |
| `id` | Text | yes |  | The id of the e-mail, as Read Emails gave it. |
| `max_body_chars` | Number | no | `0` | The most characters kept of the text (0 = all of it). |
| `mark_as_read` | Boolean | no | `false` | Mark the e-mail as read. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `email` | Text | The e-mail as a JSON object |
| `message_id` | Text | Its message_id (to answer it with Send Email) |
| `from` | Text | Who sent it |
| `reply_to` | Text | The address to answer to (the sender's unless the e-mail says otherwise) |
| `to` | Text | Who it was sent to |
| `subject` | Text | Its subject |
| `date` | Text | When it was sent |
| `body` | Text | Its text |
| `attachments` | TextList | The names of its attachments |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Read Emails

Step · in the catalogue: Communication · type `communication.email.read`

Reads the e-mails of a mailbox (IMAP) that match: unread only, from someone, with words in the subject or the text, since a date. Newest first, with their text.

**When to use it.** To fetch what arrived in a mailbox: unread requests to sort, invoices received, answers to a campaign. It reads what is there when it runs: it does not wait for an e-mail to arrive.

**Example.** unread_only: true, subject_contains: invoice, limit: 10, mark_as_read: true

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Mailbox (IMAP connection) to read. Connection of type `imap`. |
| `folder` | Text | no | `INBOX` | Folder to read. |
| `unread_only` | Boolean | no | `true` | Only the e-mails not read yet. |
| `from` | Text | no |  | Only from an address or a name containing this. |
| `subject_contains` | Text | no |  | Only with this in the subject. |
| `text_contains` | Text | no |  | Only with this in the text. |
| `since` | Text | no |  | Only received on or after this date (2026-01-31). |
| `limit` | Number | no | `20` | How many e-mails at most (newest first). |
| `include_body` | Boolean | no | `true` | Read the text of each e-mail (slower); otherwise only who, when, subject and a short preview. |
| `max_body_chars` | Number | no | `8000` | The most characters kept of each text. |
| `mark_as_read` | Boolean | no | `false` | Mark the e-mails returned as read, so the next reading does not return them again. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `emails` | Text | The e-mails as a JSON list: id, message_id, from, to, cc, subject, date, is_read, preview, body, attachments |
| `count` | Number | How many e-mails were returned |
| `ids` | TextList | The ids of the e-mails returned (for Get Email and Update Emails) |
| `id` | Text | The id of the newest one, empty when there is none |
| `message_id` | Text | The message_id of the newest one (to answer it with Send Email) |
| `from` | Text | Who sent the newest one |
| `subject` | Text | The subject of the newest one |
| `body` | Text | The text of the newest one |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Send Email

Step · in the catalogue: Communication · type `communication.email.send`

Sends an e-mail through an SMTP connection: one or several recipients, optional copies, plain text or HTML. Can answer an e-mail that was read, so that both show as one conversation.

**When to use it.** To send a message to people outside the platform, or to answer an e-mail read with Read Emails. Not for asking a person something and waiting for the answer: use an interaction for that.

**Example.** to: read.from, subject: Re: read.subject, body: write.text, in_reply_to: read.message_id

**Effects.** sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SMTP connection the e-mail is sent with. Connection of type `smtp`. |
| `to` | Text | yes |  | Recipient address(es), separated by commas. |
| `cc` | Text | no |  | Addresses that receive a copy. |
| `bcc` | Text | no |  | Addresses that receive a copy the others do not see. |
| `reply_to` | Text | no |  | Address the answers go to, when it is not the sender's. |
| `subject` | Text | yes |  | Subject. |
| `body` | Text | yes |  | Body. |
| `is_html` | Boolean | no | `false` | Whether the body is HTML. |
| `in_reply_to` | Text | no |  | The message_id of the e-mail this one answers (from Read Emails or Get Email): both then show as one conversation. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `sent` | Boolean | Whether the e-mail was handed to the server |
| `message_id` | Text | The id the e-mail was given |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Update Emails

Step · in the catalogue: Communication · type `communication.email.update`

Marks e-mails of a mailbox as read or unread, flags or unflags them, or moves them to another folder. It never deletes an e-mail.

**When to use it.** Once e-mails have been handled: mark them read so they are not read again, or file them in a folder (Processed, Invoices…).

**Example.** ids: read.ids, action: move, target_folder: Processed

**Effects.** changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Mailbox (IMAP connection). Connection of type `imap`. |
| `folder` | Text | no | `INBOX` | Folder the e-mails are in. |
| `ids` | TextList | yes |  | The ids of the e-mails, as Read Emails gave them. |
| `action` | Choice | yes | `mark_read` | What to do with them. Choices: `mark_read`, `mark_unread`, `flag`, `unflag`, `move`. |
| `target_folder` | Text | no |  | The folder to move them to (for Move to a folder); it must exist in the mailbox. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `updated` | Number | How many e-mails were found and updated |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

## Storage

Key-value storage operations.

### File Storage

Resource · in the catalogue: Storage · type `storage.file`

Provides a key-value store kept in the workspace, named by file_path.

**When to use it.** To keep values from one run to the next inside the workspace, with nothing to set up. Connect it to Storage Read, Storage Write or Storage Delete; for rows with columns, use a Data Table instead.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `file_path` | Text | no | `data` | Name of the store, kept in the workspace (a path names the store by its file name: _data/storage/data.json is the store data). |

**Plugs into** a place that accepts `storage.file.*`.

### Storage Delete

Step · in the catalogue: Storage · type `storage.delete`

Deletes a value from any storage provider

**When to use it.** To remove a value saved under a name (a key), for example so that it is made again on the next run. Connect the same File Storage or Supabase Storage step used to save it.

**Effects.** writes in the workspace, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `key` | Text | yes |  | Storage key to delete. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `success` | Boolean | Operation success |
| `key` | Text | The storage key deleted |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Storage** | yes | `storage.*` | 1 |

### Storage Read

Step · in the catalogue: Storage · type `storage.read`

Reads a value from any storage provider (file, database, etc.)

**When to use it.** To get back a value saved earlier under a name (a key), for example a result kept from a previous run, and take another path when nothing is saved under that name. Connect a File Storage or Supabase Storage step to say where to read.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `key` | Text | yes |  | Storage key to read. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `value` | Text | The stored value. Empty when the key does not exist, in which case the not_found port is taken. |

**Entries.** **In** (Entry point)

**Exits.** **Found** (Execute this path if key exists), **Not Found** (Execute this path if key does not exist)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Storage** | yes | `storage.*` | 1 |

### Storage Write

Step · in the catalogue: Storage · type `storage.write`

Writes a value to any storage provider (file, database, etc.)

**When to use it.** To save a value under a name (a key) so a later step or a later run can read it back with Storage Read, for good or for a number of minutes. Connect a File Storage or Supabase Storage step to say where to save it.

**Effects.** writes in the workspace, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `key` | Text | yes |  | Storage key. |
| `value` | Text | yes |  | Value to store. |
| `overwrite` | Boolean | no | `true` | Allow overwriting existing key. |
| `expiration_minutes` | Number | no |  | Optional expiration in minutes. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `success` | Boolean | Operation success |
| `key` | Text | The storage key used |
| `value` | Text | The value that was written (pass-through) |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Storage** | yes | `storage.*` | 1 |

### Supabase Storage

Resource · in the catalogue: Storage · type `storage.database.supabase`

Provides access to Supabase database key-value storage.

**When to use it.** To keep values in your own Supabase project, where other tools can read them too. It needs Supabase credentials (project URL and API key) and a table made for it; connect it to Storage Read, Storage Write or Storage Delete.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Supabase project credentials (URL + API key). Connection of type `supabase`. |
| `table_name` | Text | no | `storage_items` | Database table name. |

**Plugs into** a place that accepts `storage.database.*`.

## Applications > CMS > WordPress

WordPress publishing.

### Publish Media to WordPress

Step · in the catalogue: Applications > CMS > WordPress · type `app.cms.wordpress.publish_media`

Uploads media files to WordPress media library.

**When to use it.** To upload an image made or received by the workflow to the media library of a WordPress site, for example before Publish to WordPress uses it as the featured image. It needs WordPress site credentials.

**Effects.** changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | WordPress site credentials. Connection of type `wordpress`. |
| `image` | ImageRef | yes |  | Workflow image reference to upload. |
| `title` | Text | no |  | Media title. |
| `altText` | Text | no |  | Alt text. |
| `description` | Text | no |  | Description. |
| `caption` | Text | no |  | Caption. |
| `max_retries` | Number | no | `4` | Maximum upload retry attempts. |
| `retry_delay_seconds` | Number | no | `10` | Initial delay between retries in seconds. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `media` | Text | WordPress media upload result with mediaId and mediaUrl |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Publish to WordPress

Step · in the catalogue: Applications > CMS > WordPress · type `wordpress.publish`

Publishes content as a WordPress post with optional Elementor layout.

**When to use it.** To put an article on a WordPress site, as a draft unless you set another status, from HTML or from an Elementor layout made by DSL to Elementor. It needs WordPress site credentials.

**Effects.** changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | WordPress site credentials. Connection of type `wordpress`. |
| `title` | Text | yes |  | Post title. |
| `content` | Text | no |  | HTML content (optional if elementorData provided). |
| `elementorData` | Text | no |  | Elementor layout data. |
| `metaTags` | Text | no |  | Meta tags / keywords. |
| `metaDescription` | Text | no |  | Meta description. |
| `slug` | Text | no |  | Post slug (auto-generated from title if not provided). |
| `categories` | Text | no |  | Categories. |
| `status` | Text | no | `draft` | Post status. |
| `featuredMediaId` | Number | no |  | Featured image media id. |
| `updateFeaturedImage` | Boolean | no | `true` | Whether to update featured image. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Text | Result of the WordPress post publication |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

## Applications > CRM

Customer records and sales pipelines.

### HubSpot

Step · in the catalogue: Applications > CRM · type `app.hubspot`

Creates, reads, finds and changes HubSpot contacts, companies, deals and tickets, and adds notes and tasks, with no model and no tokens spent.

**When to use it.** To keep HubSpot up to date from a workflow, or to read customers and deals from it. Properties HubSpot adds or a team creates go in 'properties', by internal name.

**Example.** operation: contact.upsert, email: anna@acme.co, first_name: Anna, properties: {"lifecyclestage": "lead"}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The HubSpot connection. Connection of type `hubspot`. |
| `resource` | Choice | no | `contact` | What the step works on. Choices: `contact`, `company`, `deal`, `ticket`, `list`, `activity`. |
| `operation` | Choice | yes | `contact.create` | What the step does. Choices: `contact.create`, `contact.upsert`, `contact.update`, `contact.get`, `contact.list`, `contact.search`, `contact.delete`, `company.create`, `company.update`, `company.get`, `company.list`, `company.search`, `company.delete`, `deal.create`, `deal.update`, `deal.get`, `deal.list`, `deal.search`, `deal.delete`, `ticket.create`, `ticket.update`, `ticket.get`, `ticket.list`, `ticket.search`, `ticket.delete`, `list.members`, `activity.note`, `activity.task`. |
| `email` | Text | no |  | The email address. |
| `first_name` | Text | no |  | The first name. |
| `last_name` | Text | no |  | The last name. |
| `phone` | Text | no |  | The phone number. |
| `owner` | Text | no |  | The person who owns the record. |
| `properties` | Structured | no |  | Any other properties, by internal name, custom ones included: {"lifecyclestage": "lead"}. |
| `record_id` | Text | no |  | The record's ID. |
| `properties_to_read` | Text | no |  | Which properties to read, by internal name, separated by commas. |
| `search_text` | Text | no |  | The words to look for. |
| `filter_groups` | Structured | no |  | HubSpot filters: [{"filters":[{"propertyName":"email","operator":"EQ","value":"anna@acme.co"}]}]. |
| `company_name` | Text | no |  | The company's name. |
| `domain` | Text | no |  | The company's web domain. |
| `deal_name` | Text | no |  | The deal's name. |
| `amount` | Text | no |  | The deal's amount. |
| `deal_stage` | Text | no |  | The deal's stage, by internal ID. |
| `subject` | Text | no |  | The ticket's subject. |
| `ticket_stage` | Text | no |  | The ticket's stage, by internal ID. |
| `description` | Text | no |  | The ticket's text. |
| `list_id` | Text | no |  | The list's ID. |
| `activity_text` | Text | no |  | The note, or the task's title. |
| `attach_to` | Choice | no | `contact` | What it goes on. Choices: `contact`, `company`, `deal`, `ticket`. |
| `attach_to_id` | Text | no |  | The ID of that record. |
| `return_all` | Boolean | no | `false` | Read every page, up to what the service can give. |
| `limit` | Number | no | `50` | The most items read. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (HubSpot refused or failed — see 'error')

## Applications > Messaging

Team messaging applications.

### Slack

Step · in the catalogue: Applications > Messaging · type `app.slack`

Sends, changes and reads Slack messages, shares files and reads channels and people, with no model and no tokens spent.

**When to use it.** To post to Slack, read a channel or wait for someone's reply in a thread from a workflow. For an agent asking people in Slack, use a Slack Channel on the agent.

**Example.** operation: message.send, channel: C0123456789, text: The report is ready

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Slack connection. Connection of type `slack`. |
| `resource` | Choice | no | `message` | What the step works on. Choices: `message`, `channel`, `file`, `user`. |
| `operation` | Choice | yes | `message.send` | What the step does. Choices: `message.send`, `message.send_and_wait`, `message.update`, `message.delete`, `message.react`, `channel.list`, `channel.history`, `file.send`, `user.get`. |
| `channel` | Text | no |  | The channel, by name in the list or by ID. |
| `text` | Text | no |  | The message, in Slack's own formatting. |
| `thread_ts` | Text | no |  | Reply in this thread: the 'ts' of its first message. |
| `timeout_minutes` | Number | no | `60` | How long to wait, in minutes (0 waits without limit). |
| `ts` | Text | no |  | The message: the 'ts' Slack gave it. |
| `emoji` | Text | no |  | The emoji's name, without colons: thumbsup. |
| `channel_types` | Text | no | `public_channel,private_channel` | Which kinds, separated by commas. |
| `oldest` | Text | no |  | Only messages after this 'ts'. |
| `file_name` | Text | no |  | The file's name, with its extension. |
| `file_content` | Text | no |  | The file's content, as text. Leave empty to use the address. |
| `file_url` | Text | no |  | A public address to fetch the file from. |
| `comment` | Text | no |  | A message posted with the file. |
| `user` | Text | no |  | The person. |
| `return_all` | Boolean | no | `false` | Read every page, up to what the service can give. |
| `limit` | Number | no | `50` | The most items read. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Slack refused or failed — see 'error')

## Applications > Notes

Pages, databases and shared notes.

### Notion

Step · in the catalogue: Applications > Notes · type `app.notion`

Creates, finds and changes Notion pages and database pages, and adds or reads their content, with no model and no tokens spent.

**When to use it.** To write results into Notion or read a database from a workflow. Each page or database must be shared with the connection in Notion. Give database fields as plain values in 'values'.

**Example.** operation: database_page.create, database: <data source ID>, values: {"Name": "Launch", "Status": "Done"}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Notion connection. Connection of type `notion`. |
| `resource` | Choice | no | `database_page` | What the step works on. Choices: `database_page`, `database`, `page`, `content`. |
| `operation` | Choice | yes | `database_page.create` | What the step does. Choices: `database_page.create`, `database_page.get`, `database_page.list`, `database_page.update`, `database.fields`, `page.create`, `page.search`, `page.archive`, `content.add`, `content.read`. |
| `database` | Text | no |  | The database, by name in the list or by its data source ID. |
| `values` | Structured | no |  | The fields by their names, as plain values: {"Name": "Launch", "Status": "Done", "Tags": ["Q4"]}. |
| `properties` | Structured | no |  | Fields in Notion's own format, for what plain values cannot say. |
| `content` | Text | no |  | The text. Each line becomes a paragraph. |
| `page_id` | Text | no |  | The page's ID. |
| `filter` | Structured | no |  | A Notion filter, as JSON. |
| `sorts` | Structured | no |  | Notion sorts, as JSON. |
| `parent_page_id` | Text | no |  | The ID of the page it goes under. |
| `title` | Text | no |  | The page's title. |
| `search_text` | Text | no |  | The words to look for. |
| `blocks` | Structured | no |  | Notion blocks, as JSON, for headings, lists and the like. |
| `return_all` | Boolean | no | `false` | Read every page, up to what the service can give. |
| `limit` | Number | no | `50` | The most items read. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Notion refused or failed — see 'error')
