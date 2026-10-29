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

This page lists 13 nodes. [How to read a node reference](/docs/reference/nodes/).

## Interactions

Human-in-the-loop workflow nodes and approvals.

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
| `fields` | Text | yes |  | JSON array of field definitions. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `response_data` | Text | User response as JSON |
| `responded_by` | Text | Who responded |
| `outcome` | Text | Response outcome |

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
