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

This page lists 51 nodes. [How to read a node reference](/docs/reference/nodes/).

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

## Applications > Calendars

Events and meetings in shared calendars.

### Cal.com

Step · in the catalogue: Applications > Calendars · type `app.calcom`

Lists Cal.com event types and free slots, and makes, reads, lists, moves and cancels bookings. Uses no AI model and no tokens.

**When to use it.** To find a free time and book it for someone, or to move or cancel a booking, from a workflow. To start something when a booking is made, moved or canceled, use Cal.com's triggers.

**Example.** operation: booking.create, event_type_id: <type>, start: 2026-11-16T09:00:00Z, name: Anna, email: anna@acme.co

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Cal.com connection. Connection of type `calcom`. |
| `resource` | Choice | no | `event_type` | What the step works on. Choices: `event_type`, `slot`, `booking`. |
| `operation` | Choice | yes | `event_type.list` | What the step does. Choices: `event_type.list`, `slot.list`, `booking.list`, `booking.get`, `booking.create`, `booking.reschedule`, `booking.cancel`. |
| `eventTypeId` | Number | no |  | The event type: its ID. |
| `start` | Text | no |  | From this day or moment: 2026-11-16, or ISO 8601 in UTC. |
| `end` | Text | no |  | Until this day or moment. |
| `timeZone` | Text | no |  | The time zone the times are given in: Europe/Brussels. UTC when empty. |
| `status` | Choice | no |  | Which ones. Choices: `upcoming`, `past`, `cancelled`, `unconfirmed`, `recurring`. |
| `attendeeEmail` | Text | no |  | Only those with this attendee's email address. |
| `afterStart` | Text | no |  | Only those starting after this moment: ISO 8601. |
| `beforeEnd` | Text | no |  | Only those ending before this moment: ISO 8601. |
| `sortStart` | Choice | no | `asc` | Order. Choices: `asc`, `desc`. |
| `booking_uid` | Text | no |  | The booking: its uid. |
| `event_type_id` | Number | no |  | The event type: its ID. |
| `name` | Text | no |  | The attendee's name. |
| `email` | Text | no |  | The attendee's email address. |
| `time_zone` | Text | no | `UTC` | The attendee's time zone: Europe/Brussels. |
| `length_in_minutes` | Number | no |  | Its length, for an event type that offers several. |
| `guests` | Text | no |  | Other people invited: their email addresses, separated by commas. |
| `booking_fields` | Structured | no |  | Answers to the event type's booking questions, by their slug: {"notes": "About the offer"}. |
| `reschedulingReason` | Text | no |  | Why, as the attendees will read it. |
| `cancellationReason` | Text | no |  | Why, as the attendees will read it. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Cal.com refused or failed — see 'error')

### Calendly

Step · in the catalogue: Applications > Calendars · type `app.calendly`

Lists your Calendly event types and meetings, reads their invitees, cancels a meeting and makes one-time booking links. Uses no AI model and no tokens.

**When to use it.** To send someone a link to book a meeting, or to read and cancel meetings, from a workflow. To start something when a meeting is booked or canceled, use Calendly's triggers.

**Example.** operation: scheduling_link.create, event_type: https://api.calendly.com/event_types/<id>

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Calendly connection. Connection of type `calendly`. |
| `resource` | Choice | no | `event_type` | What the step works on. Choices: `event_type`, `event`, `scheduling_link`. |
| `operation` | Choice | yes | `event_type.list` | What the step does. Choices: `event_type.list`, `event.list`, `event.get`, `event.invitees`, `event.cancel`, `scheduling_link.create`. |
| `active` | Boolean | no |  | Only the active ones. |
| `status` | Choice | no |  | Which ones. Choices: `active`, `canceled`. |
| `min_start_time` | Text | no |  | Only those starting from this moment: ISO 8601 in UTC, 2026-11-12T00:00:00Z. |
| `max_start_time` | Text | no |  | Only those starting before this moment: ISO 8601 in UTC. |
| `invitee_email` | Text | no |  | Only those with this invitee's email address. |
| `event_id` | Text | no |  | The meeting: its ID, or its address (https://api.calendly.com/scheduled_events/…). |
| `reason` | Text | no |  | Why, as the invitees will read it. |
| `event_type` | Text | no |  | The event type: its address (uri), from List event types. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Calendly refused or failed — see 'error')

### Google Calendar

Step · in the catalogue: Applications > Calendars · type `app.google_calendar`

Lists, reads, creates, updates and deletes Google Calendar events. Uses no AI model and no tokens.

**When to use it.** To put meetings or deadlines in a Google calendar from a workflow, or to read what is planned. Without a calendar ID, it uses the account's own calendar.

**Example.** operation: event.create, title: Kick-off with Acme, start: 2026-11-12T10:00, end: 2026-11-12T11:00, time_zone: Europe/Brussels

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Calendar connection. Connection of type `google`. |
| `resource` | Choice | no | `event` | What the step works on. Choices: `event`. |
| `operation` | Choice | yes | `event.list` | What the step does. Choices: `event.list`, `event.get`, `event.create`, `event.update`, `event.delete`. |
| `calendar` | Text | no |  | The calendar's ID; the account's own calendar when empty. |
| `from` | Text | no |  | From when: 2026-11-12T00:00:00Z; now when empty. |
| `until` | Text | no |  | Until when, in the same format. |
| `search` | Text | no |  | Words the events must contain. |
| `event_id` | Text | no |  | The event's ID. |
| `title` | Text | no |  | The event's title. |
| `start` | Text | no |  | When it starts: 2026-11-12T10:00 (a time), or 2026-11-12 (all day). |
| `end` | Text | no |  | When it ends, in the same format. For an all-day event, give the day after the last day. |
| `time_zone` | Text | no |  | The time zone for times given without an offset, such as Europe/Brussels; UTC when empty. |
| `description` | Text | no |  | What it is about. |
| `location` | Text | no |  | Where it is. |
| `attendees` | Text | no |  | The guests' email addresses, separated by commas. Google sends them an invitation. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Google Calendar refused or failed — see 'error')

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

### Attio

Step · in the catalogue: Applications > CRM · type `app.attio`

Finds, creates, updates and deletes Attio records of any object (people, companies, deals…), and adds notes and tasks. Uses no AI model and no tokens.

**When to use it.** To keep Attio up to date from a workflow: a new lead, a company to enrich, a note after a call. To start something when a record is created or changes, use Attio's triggers.

**Example.** operation: record.upsert, object: people, matching_attribute: email_addresses, values: {"email_addresses": ["anna@acme.co"]}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Attio connection. Connection of type `attio`. |
| `resource` | Choice | no | `record` | What the step works on. Choices: `record`, `note`, `task`, `attribute`. |
| `operation` | Choice | yes | `record.query` | What the step does. Choices: `record.query`, `record.get`, `record.create`, `record.upsert`, `record.update`, `record.delete`, `note.create`, `task.create`, `attribute.list`. |
| `object` | Text | no |  | The object: people, companies, deals, or one of yours, by its slug. |
| `filter` | Structured | no |  | Attio's filter: {"email_addresses": "anna@acme.co"}, or {"name": {"$contains": "Acme"}}. All records when empty. |
| `sorts` | Structured | no |  | Attio's order: [{"attribute": "name", "direction": "asc"}]. |
| `record_id` | Text | no |  | The record: its ID. |
| `values` | Structured | no |  | Its values, by attribute slug: {"name": "Acme", "domains": ["acme.com"]}. List attributes to know them. |
| `matching_attribute` | Text | no |  | The attribute that finds the record: email_addresses, domains, or a unique one of yours. |
| `title` | Text | no |  | The note's title. |
| `content` | Text | no |  | The note, in plain text. |
| `deadline_at` | Text | no |  | When it is due: ISO 8601, 2026-11-20T17:00:00Z. |
| `assignee_email` | Text | no |  | Who does it: a workspace member's email address. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Attio refused or failed — see 'error')

### Google Contacts

Step · in the catalogue: Applications > CRM · type `app.google_contacts`

Lists, finds, creates, updates and deletes the contacts of a Google account. Uses no AI model and no tokens.

**When to use it.** To save the people a workflow deals with in the account's Google Contacts, or to find someone's email address or phone number.

**Example.** operation: contact.create, first_name: Anna, last_name: Martin, email: anna@acme.co, company: Acme

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Contacts connection. Connection of type `google`. |
| `resource` | Choice | no | `contact` | What the step works on. Choices: `contact`. |
| `operation` | Choice | yes | `contact.list` | What the step does. Choices: `contact.list`, `contact.search`, `contact.create`, `contact.update`, `contact.delete`. |
| `search_text` | Text | no |  | What to look for. |
| `first_name` | Text | no |  | The first name. |
| `last_name` | Text | no |  | The last name. |
| `email` | Text | no |  | The email address. |
| `phone` | Text | no |  | The phone number. |
| `company` | Text | no |  | The company. |
| `job_title` | Text | no |  | The job title. |
| `contact` | Text | no |  | The contact's ID, people/c…, as Google gives it. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Google Contacts refused or failed — see 'error')

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

### Pipedrive

Step · in the catalogue: Applications > CRM · type `app.pipedrive`

Creates, changes, reads and finds Pipedrive people, organizations and deals, and adds activities and notes. Uses no AI model and no tokens.

**When to use it.** To keep Pipedrive up to date from a workflow: a new lead, a deal moved to another stage, a call to plan.

**Example.** operation: deal.create, title: Acme - 20 seats, value: 4800, currency: EUR

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Pipedrive connection. Connection of type `pipedrive`. |
| `resource` | Choice | no | `person` | What the step works on. Choices: `person`, `organization`, `deal`, `activity`, `note`. |
| `operation` | Choice | yes | `person.create` | What the step does. Choices: `person.create`, `person.update`, `person.get`, `person.search`, `organization.create`, `organization.search`, `deal.create`, `deal.update`, `deal.get`, `deal.list`, `deal.search`, `activity.create`, `note.create`. |
| `name` | Text | no |  | The person's name. |
| `email` | Text | no |  | The email address. |
| `phone` | Text | no |  | The phone number. |
| `org_id` | Number | no |  | The organization's ID. |
| `owner` | Text | no |  | The user who owns it. |
| `person` | Text | no |  | The person's ID. |
| `search_text` | Text | no |  | What to look for, two letters at least. |
| `organization_name` | Text | no |  | The organization's name. |
| `title` | Text | no |  | The deal's title. |
| `value` | Number | no |  | The deal's value. |
| `currency` | Text | no |  | The value's currency: EUR, USD. |
| `stage` | Text | no |  | The pipeline stage. |
| `person_id` | Number | no |  | The person's ID. |
| `deal` | Text | no |  | The deal's ID. |
| `status` | Choice | no |  | Its status. Choices: `open`, `won`, `lost`. |
| `in_stage` | Text | no |  | Only the deals of this stage. |
| `subject` | Text | no |  | What it is. |
| `type` | Text | no | `task` | Its type, by Pipedrive's key: call, meeting, task, deadline, email, lunch. |
| `due_date` | Text | no |  | The day it is due: 2026-11-14. |
| `note` | Text | no |  | A note on it. |
| `deal_id` | Number | no |  | The deal's ID. |
| `content` | Text | no |  | The note, as text or HTML. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Pipedrive refused or failed — see 'error')

## Applications > Documents

Documents and presentations.

### Google Docs

Step · in the catalogue: Applications > Documents · type `app.google_docs`

Creates Google Docs documents, reads their text, adds text at their end and replaces words in them, to fill a template for instance. Uses no AI model and no tokens.

**When to use it.** To write a report or a letter into a Google document from a workflow, or to read one. Give the document by its address; the connection's Google account must be able to open it.

**Example.** operation: document.replace, document: https://docs.google.com/document/d/…, find: client, replace_with: Acme

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Docs connection. Connection of type `google`. |
| `resource` | Choice | no | `document` | What the step works on. Choices: `document`. |
| `operation` | Choice | yes | `document.create` | What the step does. Choices: `document.create`, `document.read`, `document.append`, `document.replace`. |
| `title` | Text | no |  | The document's title. |
| `text` | Text | no |  | The document's text. |
| `document` | Text | no |  | The document: its address (https://docs.google.com/document/d/…) or its ID. |
| `find` | Text | no |  | The text to find, for example name. |
| `replace_with` | Text | no |  | The new text; when empty, the text found is deleted. |
| `match_case` | Boolean | no | `true` | Match upper and lower case. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Google Docs refused or failed — see 'error')

### Google Slides

Step · in the catalogue: Applications > Documents · type `app.google_slides`

Creates Google Slides presentations, adds slides with a title and text, reads their text and replaces words in them. Uses no AI model and no tokens.

**When to use it.** To build a presentation from a workflow, or to fill a template presentation with a customer's details. Give the presentation by its address; the connection's Google account must be able to open it.

**Example.** operation: slide.add, presentation: https://docs.google.com/presentation/d/…, slide_title: Results, body: Sales up 12%

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Slides connection. Connection of type `google`. |
| `resource` | Choice | no | `presentation` | What the step works on. Choices: `presentation`, `slide`. |
| `operation` | Choice | yes | `presentation.create` | What the step does. Choices: `presentation.create`, `presentation.read`, `presentation.replace`, `slide.add`. |
| `title` | Text | no |  | The presentation's title. |
| `presentation` | Text | no |  | The presentation: its address (https://docs.google.com/presentation/d/…) or its ID. |
| `find` | Text | no |  | The text to find, for example name. |
| `replace_with` | Text | no |  | The new text; when empty, the text found is deleted. |
| `match_case` | Boolean | no | `true` | Match upper and lower case. |
| `slide_title` | Text | no |  | The slide's title. |
| `body` | Text | no |  | The slide's text: one line per point. |
| `position` | Number | no |  | Where it goes: 1 puts it first; at the end when empty. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Google Slides refused or failed — see 'error')

## Applications > E-commerce

Online stores: orders, products and customers.

### Shopify

Step · in the catalogue: Applications > E-commerce · type `app.shopify`

Lists and reads Shopify orders, products and customers, adds products and customers, changes products and tags orders and customers. Uses no AI model and no tokens.

**When to use it.** To work with a Shopify store from a workflow: read an order, add a product as a draft, tag a customer. To start something when an order is placed, paid or fulfilled, or a customer is added, use Shopify's triggers.

**Example.** operation: order.add_tags, order_id: 5551234567890, tags: gift, priority

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Shopify connection. Connection of type `shopify`. |
| `resource` | Choice | no | `order` | What the step works on. Choices: `order`, `product`, `customer`. |
| `operation` | Choice | yes | `order.list` | What the step does. Choices: `order.list`, `order.get`, `order.add_tags`, `product.list`, `product.get`, `product.create`, `product.update`, `customer.list`, `customer.get`, `customer.create`, `customer.add_tags`. |
| `query` | Text | no |  | Shopify's search: status:open, created_at:>2026-11-01, email:anna@acme.co, tag:vip. |
| `order_id` | Text | no |  | The order: its ID, as in its address in the admin. |
| `tags` | Text | no |  | Tags, separated by commas. |
| `product_id` | Text | no |  | The product: its ID, as in its address in the admin. |
| `title` | Text | no |  | The product's name. |
| `description_html` | Text | no |  | Its description, in HTML. |
| `vendor` | Text | no |  | Its vendor or brand. |
| `product_type` | Text | no |  | Its type, as the store sorts them. |
| `status` | Choice | no | `DRAFT` | Whether it is sold. Choices: `DRAFT`, `ACTIVE`, `ARCHIVED`. |
| `customer_id` | Text | no |  | The customer: its ID, as in its address in the admin. |
| `email` | Text | no |  | Their email address. |
| `first_name` | Text | no |  | Their first name. |
| `last_name` | Text | no |  | Their last name. |
| `phone` | Text | no |  | Their phone number, international: +33612345678. |
| `note` | Text | no |  | A note about them, seen in the admin. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Shopify refused or failed — see 'error')

## Applications > Email marketing

Contacts, lists and emails sent to customers.

### Brevo

Step · in the catalogue: Applications > Email marketing · type `app.brevo`

Sends emails through Brevo, written here or from a template, and creates, reads, updates and deletes contacts and their lists. Uses no AI model and no tokens.

**When to use it.** To send an email to a customer, or to keep Brevo's contacts and lists up to date, from a workflow. The sender's address must be verified in Brevo.

**Example.** operation: contact.upsert, email: anna@acme.co, attributes: {"FIRSTNAME": "Anna"}, list_ids: 7

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Brevo connection. Connection of type `brevo`. |
| `resource` | Choice | no | `email` | What the step works on. Choices: `email`, `contact`. |
| `operation` | Choice | yes | `email.send` | What the step does. Choices: `email.send`, `contact.upsert`, `contact.get`, `contact.update`, `contact.list`, `contact.delete`. |
| `to` | Text | no |  | The recipients' email addresses, separated by commas. |
| `sender_email` | Text | no |  | The sender, an address verified in Brevo; not needed with a template that has one. |
| `sender_name` | Text | no |  | The sender's name, as recipients see it. |
| `subject` | Text | no |  | The subject; not needed with a template. |
| `html` | Text | no |  | The email in HTML. |
| `text` | Text | no |  | The email as plain text. |
| `template_id` | Number | no |  | The number of a Brevo template, used instead of a subject and a text. |
| `params` | Structured | no |  | The values to put into the template, by name: {"ORDER": "A-1024"}. |
| `reply_to` | Text | no |  | The address replies go to. |
| `email` | Text | no |  | The contact's email address. |
| `attributes` | Structured | no |  | The contact's attributes, by their Brevo name in capitals: {"FIRSTNAME": "Anna", "LASTNAME": "Martin"}. |
| `list_ids` | Text | no |  | The lists to add the contact to: their IDs, separated by commas. |
| `remove_from_list_ids` | Text | no |  | The lists to remove the contact from: their IDs, separated by commas. |
| `list` | Text | no |  | Only the contacts of this list. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Brevo refused or failed — see 'error')

### Mailchimp

Step · in the catalogue: Applications > Email marketing · type `app.mailchimp`

Adds or updates the contacts of a Mailchimp audience, reads and lists them, tags them, archives or deletes them, and lists campaigns. Uses no AI model and no tokens.

**When to use it.** To keep a Mailchimp audience up to date from a workflow: a new customer subscribed, a tag after a purchase.

**Example.** operation: member.upsert, audience: <audience>, email: anna@acme.co, merge_fields: {"FNAME": "Anna"}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Mailchimp connection. Connection of type `mailchimp`. |
| `resource` | Choice | no | `member` | What the step works on. Choices: `member`, `campaign`. |
| `operation` | Choice | yes | `member.upsert` | What the step does. Choices: `member.upsert`, `member.get`, `member.list`, `member.tag`, `member.archive`, `member.delete`, `campaign.list`. |
| `audience` | Text | no |  | The audience (list). |
| `email` | Text | no |  | The member's email address. |
| `status_if_new` | Choice | no | `subscribed` | The status of a new member: pending sends a confirmation email first. Choices: `subscribed`, `pending`, `unsubscribed`, `transactional`. |
| `merge_fields` | Structured | no |  | The member's fields, by merge tag: {"FNAME": "Anna", "LNAME": "Martin"}. |
| `tags` | Text | no |  | Tags to give it, separated by commas. |
| `with_status` | Choice | no |  | Only the members with this status. Choices: `subscribed`, `unsubscribed`, `pending`, `cleaned`, `archived`. |
| `add_tags` | Text | no |  | Tags to add, separated by commas. |
| `remove_tags` | Text | no |  | Tags to take off, separated by commas. |
| `sort_dir` | Choice | no | `DESC` | The order. Choices: `DESC`, `ASC`. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Mailchimp refused or failed — see 'error')

### MailerLite

Step · in the catalogue: Applications > Email marketing · type `app.mailerlite`

Creates or updates MailerLite subscribers, reads and lists them, puts them in groups or takes them out, and removes or forgets them. Uses no AI model and no tokens.

**When to use it.** To keep MailerLite's subscribers and groups up to date from a workflow, for example after a form or a purchase.

**Example.** operation: subscriber.upsert, email: anna@acme.co, fields: {"name": "Anna"}, groups: 1234567

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The MailerLite connection. Connection of type `mailerlite`. |
| `resource` | Choice | no | `subscriber` | What the step works on. Choices: `subscriber`, `group`. |
| `operation` | Choice | yes | `subscriber.upsert` | What the step does. Choices: `subscriber.upsert`, `subscriber.get`, `subscriber.list`, `subscriber.delete`, `subscriber.forget`, `group.add`, `group.remove`. |
| `email` | Text | no |  | The subscriber's email address. |
| `fields` | Structured | no |  | The subscriber's fields, by MailerLite name: {"name": "Anna", "company": "Acme"}. |
| `groups` | Text | no |  | The groups to put it in: their IDs, separated by commas. |
| `status` | Choice | no |  | Its status. Choices: `active`, `unsubscribed`, `unconfirmed`. |
| `subscriber` | Text | no |  | The subscriber: its ID or its email address. |
| `with_status` | Choice | no |  | Only the subscribers with this status. Choices: `active`, `unsubscribed`, `unconfirmed`, `bounced`, `junk`. |
| `subscriber_id` | Text | no |  | The subscriber's ID, as MailerLite gives it. |
| `group` | Text | no |  | The group. |
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

**Exits.** **Out** (The operation succeeded), **Error** (MailerLite refused or failed — see 'error')

### Resend

Step · in the catalogue: Applications > Email marketing · type `app.resend`

Sends emails through Resend and reads them, and adds, reads, changes and deletes contacts. Uses no AI model and no tokens.

**When to use it.** To send an email from a workflow, from an address of a domain checked in Resend, and to keep its contacts up to date.

**Example.** operation: email.send, from: Acme <hello@acme.co>, to: anna@acme.co, subject: Your report, html: <p>Hello Anna</p>

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Resend connection. Connection of type `resend`. |
| `resource` | Choice | no | `email` | What the step works on. Choices: `email`, `contact`. |
| `operation` | Choice | yes | `email.send` | What the step does. Choices: `email.send`, `email.get`, `contact.create`, `contact.get`, `contact.update`, `contact.list`, `contact.delete`. |
| `from` | Text | no |  | The sender: an address of a domain checked in Resend, with a name if wanted: Acme <hello@acme.co>. |
| `to` | Text | no |  | The recipients' email addresses, separated by commas, 50 at most. |
| `subject` | Text | no |  | The subject. |
| `html` | Text | no |  | The email in HTML. |
| `text` | Text | no |  | The email as plain text; made from the HTML when empty. |
| `reply_to` | Text | no |  | The address replies go to. |
| `cc` | Text | no |  | Copies to, separated by commas. |
| `bcc` | Text | no |  | Hidden copies to, separated by commas. |
| `scheduled_at` | Text | no |  | When to send it, if later: 2026-11-12T09:00:00Z. |
| `email_id` | Text | no |  | The email's ID, as Resend gave it when it was sent. |
| `email` | Text | no |  | The contact's email address. |
| `first_name` | Text | no |  | The first name. |
| `last_name` | Text | no |  | The last name. |
| `unsubscribed` | Boolean | no |  | Unsubscribed from every email. |
| `contact` | Text | no |  | The contact: its ID or its email address. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Resend refused or failed — see 'error')

## Applications > Files

Files and folders kept online.

### Google Drive

Step · in the catalogue: Applications > Files · type `app.google_drive`

Uploads files to Google Drive, creates folders, and lists, reads as text, shares or moves to the bin the files it made. Uses no AI model and no tokens.

**When to use it.** To keep the files a workflow makes in Google Drive and share them. It sees only the files this connection made or that were opened with Agentivity, never the rest of the Drive.

**Example.** operation: file.upload, name: report.html, text: <h1>Report</h1>…, convert: true

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Drive connection. Connection of type `google`. |
| `resource` | Choice | no | `file` | What the step works on. Choices: `file`, `folder`. |
| `operation` | Choice | yes | `file.upload` | What the step does. Choices: `file.upload`, `file.list`, `file.read_text`, `file.share`, `file.trash`, `folder.create`. |
| `name` | Text | no |  | The file's name, with its extension: report.pdf. |
| `file_url` | Text | no |  | The file's public address, to fetch it from. |
| `text` | Text | no |  | Or the file's content as text (a CSV, an HTML page, notes). |
| `mime_type` | Text | no |  | Its type, such as application/pdf; taken from the name's extension when empty. |
| `convert` | Boolean | no |  | Make it a Google file: Word, HTML and text become Docs, Excel and CSV become Sheets, PowerPoint becomes Slides. |
| `folder` | Text | no |  | The folder: its address or its ID, a folder this connection made; the top of the Drive when empty. |
| `name_contains` | Text | no |  | Only the files whose name contains these words. |
| `file` | Text | no |  | The file: its address (https://drive.google.com/file/d/…) or its ID. Only a file this connection made, or one opened with Agentivity. |
| `email` | Text | no |  | The person's email address; leave empty to share with anyone who has the link. |
| `role` | Choice | no | `reader` | What they may do. Choices: `reader`, `commenter`, `writer`. |
| `notify` | Boolean | no | `true` | Google sends the person an email. |
| `folder_name` | Text | no |  | The new folder's name. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Google Drive refused or failed — see 'error')

## Applications > Forms

Forms and the answers people send.

### Google Forms

Step · in the catalogue: Applications > Forms · type `app.google_forms`

Creates Google Forms with their questions, reads them, and reads the answers people sent, by question. Uses no AI model and no tokens.

**When to use it.** To create a form from a workflow and send its address, or to read the answers people sent. Give the form by the address of its editor.

**Example.** operation: response.list, form: https://docs.google.com/forms/d/…/edit, since: 2026-11-12T08:00:00Z

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Forms connection. Connection of type `google`. |
| `resource` | Choice | no | `form` | What the step works on. Choices: `form`, `response`. |
| `operation` | Choice | yes | `form.create` | What the step does. Choices: `form.create`, `form.get`, `response.list`. |
| `title` | Text | no |  | The form's title. |
| `description` | Text | no |  | The text under the title. |
| `questions` | Structured | no |  | The questions, as JSON: [{"title": "Your name", "kind": "text", "required": true}, {"title": "Size", "kind": "choice", "options": ["S", "M", "L"]}]. Kinds: text, paragraph, choice, checkboxes, dropdown. |
| `form` | Text | no |  | The form: the address of its editor (https://docs.google.com/forms/d/…/edit) or its ID. |
| `since` | Text | no |  | Only the answers sent after this moment: 2026-11-12T08:00:00Z. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Google Forms refused or failed — see 'error')

### Tally

Step · in the catalogue: Applications > Forms · type `app.tally`

Lists Tally forms and their questions, and reads and deletes their submissions. Uses no AI model and no tokens.

**When to use it.** To read a Tally form's submissions from a workflow. To start something when a form is submitted, use Tally's trigger.

**Example.** operation: submission.list, form_id: <form>, filter: completed

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Tally connection. Connection of type `tally`. |
| `resource` | Choice | no | `form` | What the step works on. Choices: `form`, `submission`. |
| `operation` | Choice | yes | `form.list` | What the step does. Choices: `form.list`, `form.get`, `form.questions`, `submission.list`, `submission.delete`. |
| `form_id` | Text | no |  | The form: its ID, as in its address (tally.so/r/wA1bCd). |
| `filter` | Choice | no |  | Which ones. Choices: `all`, `completed`, `partial`. |
| `startDate` | Text | no |  | Only those from this moment: ISO 8601. |
| `endDate` | Text | no |  | Only those until this moment: ISO 8601. |
| `afterId` | Text | no |  | Only those after this submission: its ID. |
| `submission_id` | Text | no |  | The submission's ID. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Tally refused or failed — see 'error')

### Typeform

Step · in the catalogue: Applications > Forms · type `app.typeform`

Lists Typeform forms and reads, lists and deletes their responses. Uses no AI model and no tokens.

**When to use it.** To read a form's responses from a workflow. To start something when a response comes in, use Typeform's trigger.

**Example.** operation: response.list, form_id: <form>, since: 2026-11-01T00:00:00Z

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Typeform connection. Connection of type `typeform`. |
| `resource` | Choice | no | `form` | What the step works on. Choices: `form`, `response`. |
| `operation` | Choice | yes | `form.list` | What the step does. Choices: `form.list`, `form.get`, `response.list`, `response.delete`. |
| `search` | Text | no |  | Only the forms whose title holds these words. |
| `form_id` | Text | no |  | The form: its ID, as in the form's address (form/AbC123xy). |
| `since` | Text | no |  | Only those sent from this moment: ISO 8601, 2026-11-01T00:00:00Z. |
| `until` | Text | no |  | Only those sent until this moment: ISO 8601. |
| `query` | Text | no |  | Only those whose answers hold this text. |
| `response_type` | Choice | no |  | Which ones. Choices: `completed`, `partial`, `started`. |
| `included_response_ids` | Text | no |  | The responses' IDs, separated by commas. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Typeform refused or failed — see 'error')

## Applications > Messaging

Team messaging applications.

### Discord

Step · in the catalogue: Applications > Messaging · type `app.discord`

Posts, edits, reads and deletes Discord messages in a server's channels with a bot, and adds reactions. Uses no AI model and no tokens.

**When to use it.** To post to a Discord community from a workflow, or to read what was said in a channel. The bot must be invited to the server; to read messages, it also needs the Message Content intent.

**Example.** operation: message.send, channel: 1234567890123456789, content: Version 2.4 is out

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Discord connection. Connection of type `discord`. |
| `resource` | Choice | no | `message` | What the step works on. Choices: `message`. |
| `operation` | Choice | yes | `message.send` | What the step does. Choices: `message.send`, `message.edit`, `message.delete`, `message.list`, `message.react`. |
| `server` | Text | no |  | The server, so you can pick its channel from a list. |
| `channel` | Text | no |  | The channel's ID. |
| `content` | Text | no |  | The message, up to 2,000 characters. |
| `embeds` | Structured | no |  | Rich blocks, as Discord's embeds in JSON: [{"title": "Report", "description": "…", "color": 5814783}]. |
| `message_id` | Text | no |  | The message's ID. |
| `emoji` | Text | no |  | The emoji itself (👍), or name:id for one of the server's own emoji. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Discord refused or failed — see 'error')

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

### Telegram

Step · in the catalogue: Applications > Messaging · type `app.telegram`

Sends, edits and deletes Telegram messages, photos and files with a bot, and reads a chat's details. Uses no AI model and no tokens.

**When to use it.** To send a result, an alert or a report to a Telegram chat, group or channel from a workflow. A person must start the bot first; a group or a channel must add it.

**Example.** operation: message.send, chat_id: -1001234567890, text: The weekly report is ready

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Telegram connection. Connection of type `telegram`. |
| `resource` | Choice | no | `message` | What the step works on. Choices: `message`, `file`, `chat`. |
| `operation` | Choice | yes | `message.send` | What the step does. Choices: `message.send`, `message.edit`, `message.delete`, `file.send_photo`, `file.send_document`, `chat.get`. |
| `chat_id` | Text | no |  | The chat: its numeric ID, or @username for a public channel. |
| `text` | Text | no |  | The message, up to 4,096 characters. |
| `parse_mode` | Choice | no |  | How the text is formatted: plain when empty. Choices: `HTML`, `MarkdownV2`. |
| `disable_notification` | Boolean | no |  | Send silently: no sound for the people who receive it. |
| `message_id` | Number | no |  | The message's ID, as Telegram gave it when the message was sent. |
| `photo` | Text | no |  | The image's public address. |
| `caption` | Text | no |  | The text under the photo or file, up to 1,024 characters. |
| `document` | Text | no |  | The file's public address, a PDF or a ZIP. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Telegram refused or failed — see 'error')

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

## Applications > Payments

Customers, payments and invoices.

### Stripe

Step · in the catalogue: Applications > Payments · type `app.stripe`

Creates, finds and changes Stripe customers, reads payments, invoices and the balance, and makes payment links. Uses no AI model and no tokens.

**When to use it.** To follow customers and payments in Stripe from a workflow, or to send a customer a link to pay. Use a test key (sk_test_ or rk_test_) to try a workflow without real money.

**Example.** operation: payment_link.create, price: price_1QxYz…, quantity: 1

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Stripe connection. Connection of type `stripe`. |
| `resource` | Choice | no | `customer` | What the step works on. Choices: `customer`, `payment`, `payment_link`, `invoice`, `balance`. |
| `operation` | Choice | yes | `customer.create` | What the step does. Choices: `customer.create`, `customer.update`, `customer.get`, `customer.list`, `customer.search`, `customer.delete`, `payment.list`, `payment.get`, `payment_link.create`, `invoice.list`, `balance.get`. |
| `email` | Text | no |  | The customer's email address. |
| `name` | Text | no |  | The customer's or the company's name. |
| `phone` | Text | no |  | The phone number. |
| `description` | Text | no |  | An internal note on the customer, for your team. |
| `metadata` | Structured | no |  | Your own keys and values stored on it, up to 50: {"plan": "pro"}. |
| `customer_id` | Text | no |  | The customer's ID, cus_…. |
| `search_query` | Text | no |  | Stripe's search syntax: email:'anna@acme.co', or name~'Acme' AND metadata['plan']:'pro'. |
| `customer` | Text | no |  | Only those of this customer: its ID, cus_…. |
| `payment_id` | Text | no |  | The payment's ID, pi_…. |
| `price` | Text | no |  | The price to pay: its ID, price_…. |
| `quantity` | Number | no | `1` | How many units. |
| `status` | Choice | no |  | Only the invoices with this status. Choices: `draft`, `open`, `paid`, `uncollectible`, `void`. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Stripe refused or failed — see 'error')

## Applications > Projects

Issues, cards and the work of a team.

### Asana

Step · in the catalogue: Applications > Projects · type `app.asana`

Lists Asana projects and people, and creates, changes, reads, lists, comments and deletes tasks. Uses no AI model and no tokens.

**When to use it.** To turn a request into an Asana task from a workflow, or to follow a project's tasks.

**Example.** operation: task.create, project: <project>, name: Call Acme back, due_on: 2026-11-20

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Asana connection. Connection of type `asana`. |
| `resource` | Choice | no | `project` | What the step works on. Choices: `project`, `task`, `user`. |
| `operation` | Choice | yes | `project.list` | What the step does. Choices: `project.list`, `task.list`, `task.get`, `task.create`, `task.update`, `task.delete`, `task.comment`, `user.list`. |
| `workspace` | Text | no |  | The workspace: its ID (gid). |
| `project` | Text | no |  | The project: its ID (gid), as in its address. |
| `open_only` | Boolean | no | `true` | Only the tasks not done yet. |
| `task_id` | Text | no |  | The task: its ID (gid), as in its address. |
| `name` | Text | no |  | The task's name. |
| `notes` | Text | no |  | Its description, in plain text. |
| `assignee` | Text | no |  | Who does it: an email address, a user's gid, or me. |
| `due_on` | Text | no |  | Its due day: 2026-11-20. |
| `completed` | Choice | no |  | Done. Choices: `true`, `false`. |
| `text` | Text | no |  | The comment, in plain text. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Asana refused or failed — see 'error')

### ClickUp

Step · in the catalogue: Applications > Projects · type `app.clickup`

Creates, changes, reads, lists, comments and deletes ClickUp tasks. Uses no AI model and no tokens.

**When to use it.** To put work in a ClickUp list from a workflow, or to follow a list's tasks. To start something when a task is created or changes status, use ClickUp's triggers.

**Example.** operation: task.create, list_id: <list>, name: Call Acme back, priority: 2

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The ClickUp connection. Connection of type `clickup`. |
| `resource` | Choice | no | `task` | What the step works on. Choices: `task`. |
| `operation` | Choice | yes | `task.list` | What the step does. Choices: `task.list`, `task.get`, `task.create`, `task.update`, `task.delete`, `task.comment`. |
| `workspace` | Text | no |  | The workspace, to choose its list. |
| `space` | Text | no |  | The space, to choose its list. |
| `folder` | Text | no |  | The folder, to choose its list. |
| `list_id` | Text | no |  | The list: its ID, as in its address. |
| `include_closed` | Boolean | no |  | With the closed tasks. |
| `statuses` | Text | no |  | Only these statuses, by name, separated by commas. |
| `task_id` | Text | no |  | The task: its ID, as in its address. |
| `name` | Text | no |  | The task's name. |
| `description` | Text | no |  | Its description, in Markdown. |
| `status` | Text | no |  | Its status, by name as in the list: to do, in progress, complete. |
| `priority` | Choice | no |  | Its priority. Choices: `1`, `2`, `3`, `4`. |
| `due_date` | Text | no |  | When it is due: 2026-11-20, or ISO 8601 with a time. |
| `assignees` | Text | no |  | Who does it: ClickUp user IDs, separated by commas. |
| `tags` | Text | no |  | Tags, separated by commas. |
| `comment_text` | Text | no |  | The comment. |
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

**Exits.** **Out** (The operation succeeded), **Error** (ClickUp refused or failed — see 'error')

### GitHub

Step · in the catalogue: Applications > Projects · type `app.github`

Opens, changes, reads, lists, comments and searches GitHub issues, and lists pull requests. Uses no AI model and no tokens.

**When to use it.** To turn a request, a bug report or an agent's finding into a GitHub issue, or to read what is open in a repository.

**Example.** operation: issue.create, repository: acme/website, title: Broken link on the pricing page, labels: bug

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The GitHub connection. Connection of type `github`. |
| `resource` | Choice | no | `issue` | What the step works on. Choices: `issue`, `pull_request`. |
| `operation` | Choice | yes | `issue.create` | What the step does. Choices: `issue.create`, `issue.update`, `issue.get`, `issue.list`, `issue.comment`, `issue.search`, `pull_request.list`. |
| `repository` | Text | no |  | The repository, as owner/name. |
| `title` | Text | no |  | The title. |
| `body` | Text | no |  | The text, in Markdown. |
| `labels` | Text | no |  | Labels, separated by commas. |
| `assignees` | Text | no |  | The people it is assigned to: their GitHub logins, separated by commas. |
| `issue_number` | Number | no |  | The issue's number. |
| `new_state` | Choice | no |  | Open or close it. Choices: `open`, `closed`. |
| `state` | Choice | no | `open` | Which ones. Choices: `open`, `closed`, `all`. |
| `comment` | Text | no |  | The comment, in Markdown. |
| `search_query` | Text | no |  | GitHub's search words: repo:acme/website is:issue is:open label:bug. |
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

**Exits.** **Out** (The operation succeeded), **Error** (GitHub refused or failed — see 'error')

### Jira

Step · in the catalogue: Applications > Projects · type `app.jira`

Creates, reads, changes, searches (JQL), moves along its workflow and comments Jira issues, on the company's own Jira site. Uses no AI model and no tokens.

**When to use it.** To turn a request or a bug report into a Jira issue from a workflow, or to follow the issues a JQL query finds.

**Example.** operation: issue.search, jql: project = ENG AND status != Done ORDER BY updated DESC

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Jira connection. Connection of type `jira`. |
| `resource` | Choice | no | `issue` | What the step works on. Choices: `issue`. |
| `operation` | Choice | yes | `issue.create` | What the step does. Choices: `issue.create`, `issue.get`, `issue.update`, `issue.search`, `issue.transition`, `issue.comment`. |
| `project` | Text | no |  | The project. |
| `issue_type` | Text | no |  | The issue's type: Task, Bug, Story…. |
| `summary` | Text | no |  | The summary. |
| `description` | Text | no |  | The description: each line a paragraph. |
| `labels` | Text | no |  | Labels, separated by commas (no spaces in a label). |
| `fields` | Structured | no |  | Any other fields, by Jira ID: {"priority": {"name": "High"}, "customfield_10010": 5}. |
| `issue` | Text | no |  | The issue's key, such as ENG-42. |
| `jql` | Text | no |  | The JQL: project = ENG AND status != Done ORDER BY updated DESC. |
| `transition` | Text | no |  | The transition's name, as Jira shows it on the issue, or its ID. |
| `comment` | Text | no |  | The comment: each line a paragraph. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Jira refused or failed — see 'error')

### Linear

Step · in the catalogue: Applications > Projects · type `app.linear`

Creates, changes, reads, lists and comments Linear issues, and moves them to another state. Uses no AI model and no tokens.

**When to use it.** To turn a request or a bug report into a Linear issue from a workflow, or to follow the issues of a team.

**Example.** operation: issue.update, issue: ENG-123, state: In Progress

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Linear connection. Connection of type `linear`. |
| `resource` | Choice | no | `issue` | What the step works on. Choices: `issue`. |
| `operation` | Choice | yes | `issue.create` | What the step does. Choices: `issue.create`, `issue.update`, `issue.get`, `issue.list`, `issue.comment`. |
| `team` | Text | no |  | The team. |
| `title` | Text | no |  | The title. |
| `description` | Text | no |  | The description, in Markdown. |
| `priority` | Choice | no |  | Its priority. Choices: `1`, `2`, `3`, `4`, `0`. |
| `issue` | Text | no |  | The issue: its identifier, such as ENG-123. |
| `state` | Text | no |  | The state to move it to, by its name in the team: In Progress, Done. |
| `comment` | Text | no |  | The comment, in Markdown. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Linear refused or failed — see 'error')

### monday.com

Step · in the catalogue: Applications > Projects · type `app.monday`

Lists monday.com boards, their columns and items, and adds, changes, moves, archives and deletes items and their updates. Uses no AI model and no tokens.

**When to use it.** To keep a monday.com board up to date from a workflow: an item for each new lead, a status to change, an update to post. To start something when an item is added, changes or gets an update, use monday.com's triggers.

**Example.** operation: item.create, board_id: 1234567890, item_name: Acme - onboarding, column_values: {"status": {"label": "Working on it"}}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The monday.com connection. Connection of type `monday`. |
| `resource` | Choice | no | `board` | What the step works on. Choices: `board`, `item`, `update`. |
| `operation` | Choice | yes | `board.list` | What the step does. Choices: `board.list`, `board.columns`, `item.list`, `item.get`, `item.create`, `item.update`, `item.move`, `item.archive`, `item.delete`, `update.create`, `update.list`. |
| `board_id` | Text | no |  | The board. |
| `item_id` | Text | no |  | The item: its ID. |
| `item_name` | Text | no |  | The item's name. |
| `group_id` | Text | no |  | The group: its ID, as List columns gives it. |
| `column_values` | Structured | no |  | Column values, by column ID: {"status": {"label": "Done"}, "date4": {"date": "2026-11-20"}}. |
| `new_name` | Text | no |  | Its new name. |
| `text` | Text | no |  | The update; HTML is allowed. |
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

**Exits.** **Out** (The operation succeeded), **Error** (monday.com refused or failed — see 'error')

### Trello

Step · in the catalogue: Applications > Projects · type `app.trello`

Adds, changes, moves, reads, lists, comments and deletes Trello cards. Uses no AI model and no tokens.

**When to use it.** To put work on a Trello board from a workflow, or to read what a list holds. The board and its list are chosen from lists.

**Example.** operation: card.create, list: <list>, name: Call Acme back, due: 2026-11-14T17:00:00Z

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Trello connection. Connection of type `trello`. |
| `resource` | Choice | no | `card` | What the step works on. Choices: `card`. |
| `operation` | Choice | yes | `card.create` | What the step does. Choices: `card.create`, `card.update`, `card.get`, `card.list`, `card.comment`, `card.delete`. |
| `board` | Text | no |  | The board, to choose its list from a list. |
| `list` | Text | no |  | The list. |
| `name` | Text | no |  | The card's title. |
| `description` | Text | no |  | Its description. |
| `due` | Text | no |  | When it is due: 2026-11-14T17:00:00Z. |
| `position` | Choice | no |  | Where it goes in the list. Choices: `top`, `bottom`. |
| `card_id` | Text | no |  | The card's ID, or the short ID in its address. |
| `done` | Boolean | no |  | Its due date is done. |
| `archived` | Boolean | no |  | Archive it. |
| `comment` | Text | no |  | The comment. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Trello refused or failed — see 'error')

## Applications > Spreadsheets

Rows, cells and records in online spreadsheets and tables.

### Airtable

Step · in the catalogue: Applications > Spreadsheets · type `app.airtable`

Lists, reads, adds, updates and deletes the records of an Airtable table. Uses no AI model and no tokens.

**When to use it.** To keep an Airtable table up to date from a workflow, or to read its records. Give the fields by their name in 'fields'; the base must be in the token's access.

**Example.** operation: record.upsert, base: appXXXXXXXXXXXXXX, table: Leads, merge_on: Email, fields: {"Email": "anna@acme.co", "Status": "Lead"}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Airtable connection. Connection of type `airtable`. |
| `resource` | Choice | no | `record` | What the step works on. Choices: `record`. |
| `operation` | Choice | yes | `record.list` | What the step does. Choices: `record.list`, `record.get`, `record.create`, `record.create_many`, `record.update`, `record.upsert`, `record.delete`. |
| `base` | Text | no |  | The base's ID, app…. |
| `table` | Text | no |  | The table: its name or its ID, tbl…. |
| `formula` | Text | no |  | An Airtable formula; a record is kept when it is true: {Status} = 'Lead'. |
| `view` | Text | no |  | A view of the table, by name or ID: its filters and its sort order apply. |
| `record_id` | Text | no |  | The record's ID, rec…. |
| `fields` | Structured | no |  | The record's fields, by name: {"Name": "Anna", "Status": "Lead"}. |
| `typecast` | Boolean | no |  | Let Airtable convert text to the field's type: a date, a choice, a link to another record. |
| `records` | Structured | no |  | The records, each one as its fields by name: [{"Name": "Anna"}, {"Name": "Ben"}]. |
| `merge_on` | Text | no |  | The fields used to find the record, by name, one to three, separated by commas. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Airtable refused or failed — see 'error')

### Google Sheets

Step · in the catalogue: Applications > Spreadsheets · type `app.google_sheets`

Reads the rows of a Google Sheets sheet as records, adds rows, and updates or clears cells. Uses no AI model and no tokens.

**When to use it.** To read a table kept in Google Sheets from a workflow, or to write results into one. Give the spreadsheet by its address; the connection's Google account must be able to open it.

**Example.** operation: rows.append, spreadsheet: https://docs.google.com/spreadsheets/d/…, range: Leads, rows: [{"Name": "Anna", "Email": "anna@acme.co"}]

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Sheets connection. Connection of type `google`. |
| `resource` | Choice | no | `rows` | What the step works on. Choices: `rows`, `cells`, `spreadsheet`. |
| `operation` | Choice | yes | `rows.read` | What the step does. Choices: `rows.read`, `rows.append`, `cells.update`, `cells.clear`, `spreadsheet.get`. |
| `spreadsheet` | Text | no |  | The spreadsheet: its address (https://docs.google.com/spreadsheets/d/…) or its ID. |
| `range` | Text | no |  | The sheet, or a range of it in A1 notation: Sheet1, or Sheet1!A1:D20. |
| `header` | Boolean | no | `true` | The first row names the columns. |
| `rows` | Structured | no |  | The rows: records by column name ([{"Name": "Anna", "Score": 42}]) or JSON rows ([["Anna", 42]]). |
| `values` | Structured | no |  | The cells, as JSON rows: [["Anna", 42], ["Ben", 17]]. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Structured | What the service answered: an object, or a list for an operation that lists |
| `count` | Number | How many items came back |
| `has_more` | Boolean | True when more items exist than were read |
| `status` | Number | The HTTP status of a failed call |
| `error` | Text | Why the operation failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The operation succeeded), **Error** (Google Sheets refused or failed — see 'error')

## Applications > Customer support

Tickets, conversations and the customers who ask.

### Freshdesk

Step · in the catalogue: Applications > Customer support · type `app.freshdesk`

Lists, finds, opens, updates, replies to and notes Freshdesk tickets, and reads and keeps contacts. Uses no AI model and no tokens.

**When to use it.** To handle support tickets in Freshdesk from a workflow: open one, reply to the customer, add a private note, close it.

**Example.** operation: ticket.reply, ticket_id: 42, body: Thanks, it is fixed.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Freshdesk connection. Connection of type `freshdesk`. |
| `resource` | Choice | no | `ticket` | What the step works on. Choices: `ticket`, `contact`. |
| `operation` | Choice | yes | `ticket.list` | What the step does. Choices: `ticket.list`, `ticket.search`, `ticket.get`, `ticket.create`, `ticket.update`, `ticket.reply`, `ticket.note`, `ticket.delete`, `contact.list`, `contact.get`, `contact.create`, `contact.update`. |
| `filter` | Choice | no |  | Only these. Choices: `new_and_my_open`, `watching`, `spam`, `deleted`. |
| `updated_since` | Text | no |  | Only those changed since: 2026-11-01T00:00:00Z. |
| `requester_email` | Text | no |  | Only this requester's, by email address. |
| `query` | Text | no |  | The query, without the outer quotes. |
| `ticket_id` | Text | no |  | The ticket: its number. |
| `email` | Text | no |  | The requester's email address. |
| `subject` | Text | no |  | The ticket's subject. |
| `description` | Text | no |  | What the customer asks, in HTML. |
| `status` | Choice | no | `2` | Its status. Choices: `2`, `3`, `4`, `5`. |
| `priority` | Choice | no | `1` | Its priority. Choices: `1`, `2`, `3`, `4`. |
| `type` | Text | no |  | Its type, by name as set in Freshdesk: Question, Incident, Problem…. |
| `tags` | Text | no |  | Tags, separated by commas. |
| `responder_id` | Number | no |  | The agent it is assigned to: their ID. |
| `body` | Text | no |  | The text, in HTML. |
| `private` | Boolean | no | `true` | Seen by the agents only. |
| `contact_email` | Text | no |  | Only this email address. |
| `phone` | Text | no |  | Only this phone number. |
| `contact_id` | Text | no |  | The contact: its ID. |
| `name` | Text | no |  | Their name. |
| `job_title` | Text | no |  | Their job title. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Freshdesk refused or failed — see 'error')

### Intercom

Step · in the catalogue: Applications > Customer support · type `app.intercom`

Finds, reads, creates and updates Intercom contacts, and finds, replies to, notes, assigns and closes conversations. Uses no AI model and no tokens.

**When to use it.** To keep Intercom up to date from a workflow, or to answer a conversation as a teammate: a lead to add, a reply, a note, a conversation to close.

**Example.** operation: conversation.reply, conversation_id: 123456, admin_id: 789, body: Thanks for waiting!

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Intercom connection. Connection of type `intercom`. |
| `resource` | Choice | no | `contact` | What the step works on. Choices: `contact`, `conversation`, `admin`. |
| `operation` | Choice | yes | `contact.search` | What the step does. Choices: `contact.search`, `contact.get`, `contact.create`, `contact.update`, `contact.note`, `conversation.search`, `conversation.get`, `conversation.reply`, `conversation.note`, `conversation.assign`, `conversation.close`, `admin.list`. |
| `email` | Text | no |  | Only this email address. |
| `search_query` | Structured | no |  | Intercom's search query as JSON, for what the other fields cannot say: {"field": "created_at", "operator": ">", "value": 1767225600}. |
| `contact_id` | Text | no |  | The contact: its Intercom ID. |
| `role` | Choice | no | `user` | What they are. Choices: `user`, `lead`. |
| `name` | Text | no |  | Their name. |
| `phone` | Text | no |  | Their phone number. |
| `external_id` | Text | no |  | Their ID in your own system. |
| `custom_attributes` | Structured | no |  | Custom attributes, by name: {"plan": "pro"}. |
| `body` | Text | no |  | The text; HTML is allowed. |
| `admin_id` | Text | no |  | The teammate it is written as. |
| `state` | Choice | no |  | Only those in this state. Choices: `open`, `snoozed`, `closed`. |
| `conversation_id` | Text | no |  | The conversation: its ID, as in its address. |
| `assignee_id` | Text | no |  | The teammate it goes to. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Intercom refused or failed — see 'error')

### Zendesk

Step · in the catalogue: Applications > Customer support · type `app.zendesk`

Lists, finds, opens, updates and comments Zendesk tickets, and finds and adds people. Uses no AI model and no tokens.

**When to use it.** To handle support tickets in Zendesk from a workflow: open one from a form, reply or add a note, change its status. To start something when a ticket is opened, moves or gets a comment, use Zendesk's triggers.

**Example.** operation: ticket.comment, ticket_id: 14038, comment: Thanks, it is fixed., public: true, status: solved

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Zendesk connection. Connection of type `zendesk`. |
| `resource` | Choice | no | `ticket` | What the step works on. Choices: `ticket`, `user`. |
| `operation` | Choice | yes | `ticket.list` | What the step does. Choices: `ticket.list`, `ticket.search`, `ticket.get`, `ticket.create`, `ticket.update`, `ticket.comment`, `ticket.comments`, `ticket.delete`, `user.search`, `user.get`, `user.create`. |
| `query` | Text | no |  | What to look for, as typed in Zendesk's search. |
| `ticket_id` | Text | no |  | The ticket: its number. |
| `requester_email` | Text | no |  | The customer's email address. |
| `requester_name` | Text | no |  | The customer's name, for one Zendesk does not know yet. |
| `subject` | Text | no |  | The ticket's subject. |
| `comment` | Text | no |  | What the customer asks: the ticket's first comment. |
| `status` | Choice | no |  | Its status. Choices: `new`, `open`, `pending`, `hold`, `solved`, `closed`. |
| `priority` | Choice | no |  | Its priority. Choices: `low`, `normal`, `high`, `urgent`. |
| `tags` | Text | no |  | Its tags, separated by commas: they replace those it has. |
| `assignee_email` | Text | no |  | The agent it is assigned to, by email address. |
| `public` | Boolean | no | `true` | Seen by the customer (sent by email); a private note otherwise. |
| `user_query` | Text | no |  | A name or an email address. |
| `user_id` | Text | no |  | The person: their ID. |
| `name` | Text | no |  | Their name. |
| `email` | Text | no |  | Their email address. |
| `phone` | Text | no |  | Their phone number. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Zendesk refused or failed — see 'error')

## Applications > Tasks

To-do lists and their tasks.

### Google Tasks

Step · in the catalogue: Applications > Tasks · type `app.google_tasks`

Lists, creates, updates, completes and deletes tasks in Google Tasks. Uses no AI model and no tokens.

**When to use it.** To put to-dos in a Google task list from a workflow, or to read what is left to do. Without a list, it uses the account's default list.

**Example.** operation: task.create, title: Call Acme back, due: 2026-11-14

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Tasks connection. Connection of type `google`. |
| `resource` | Choice | no | `task` | What the step works on. Choices: `task`. |
| `operation` | Choice | yes | `task.list` | What the step does. Choices: `task.list`, `task.create`, `task.update`, `task.complete`, `task.delete`. |
| `list` | Text | no |  | The task list; the account's default list when empty. |
| `include_done` | Boolean | no |  | Include the tasks already done. |
| `title` | Text | no |  | What to do. |
| `notes` | Text | no |  | Notes on the task. |
| `due` | Text | no |  | The day it is due: 2026-11-12. Google keeps only the day, not the time. |
| `task_id` | Text | no |  | The task's ID. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Google Tasks refused or failed — see 'error')

### Todoist

Step · in the catalogue: Applications > Tasks · type `app.todoist`

Lists Todoist projects, and adds, changes, finds, completes, reopens, deletes and comments tasks. Uses no AI model and no tokens.

**When to use it.** To add a task to someone's Todoist from a workflow, or to read what is due today.

**Example.** operation: task.create, content: Call Acme back, due_string: tomorrow at 9

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Todoist connection. Connection of type `todoist`. |
| `resource` | Choice | no | `project` | What the step works on. Choices: `project`, `task`, `comment`. |
| `operation` | Choice | yes | `project.list` | What the step does. Choices: `project.list`, `task.list`, `task.filter`, `task.get`, `task.create`, `task.update`, `task.close`, `task.reopen`, `task.delete`, `comment.create`. |
| `project_id` | Text | no |  | Only this project's. |
| `section_id` | Text | no |  | Only this section's. |
| `label` | Text | no |  | Only those with this label. |
| `query` | Text | no |  | The filter, as typed in Todoist. |
| `task_id` | Text | no |  | The task: its ID. |
| `content` | Text | no |  | The task, as it reads in the list. |
| `description` | Text | no |  | Its description. |
| `labels` | Text | no |  | Labels, by name, separated by commas. |
| `priority` | Choice | no |  | Its priority. Choices: `4`, `3`, `2`, `1`. |
| `due_string` | Text | no |  | When it is due, in words: tomorrow at 9, every monday. |
| `due_date` | Text | no |  | When it is due, as a day: 2026-11-20. |
| `comment` | Text | no |  | The comment, in Markdown. |
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

**Exits.** **Out** (The operation succeeded), **Error** (Todoist refused or failed — see 'error')
