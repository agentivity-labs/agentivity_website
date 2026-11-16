---
title: "AI nodes: the tools you give to an agent"
description: "Reference of the tools you can plug into an AI agent: Data Table, calculator, date, documents, e-mail, web search, web scraper and more."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-ai-tools.md. Do not edit here: edit the source and publish again. -->

<!-- Written from a running server by tools/reference.mjs. Do not edit this page by hand. -->

The tools an agent can call. Each one is a resource that you plug into the place for tools of an AI Agent.

This page lists 51 nodes. [How to read a node reference](/docs/reference/nodes/).

## AI > Tools

AI-callable tools and tool gateways.

### AI Agent HTTP Request Tool

Resource · in the catalogue: AI > Tools · type `ai.tools.http.request`

Lets an agent call a web API or read a web page: it reads by default (GET), and may also send (POST, PUT, PATCH, DELETE) when that is allowed on the node. A page is given as plain text, JSON as data.

**When to use it.** For an agent that works with a service that has a web API (looking up an order, creating a ticket), or that opens a web address it already has. Allow writing and limit the hosts to what the job needs. Not for finding pages: use a Web Search tool instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | no |  | The HTTP API connection whose key signs every call, when the API needs one. Connection of type `http_api`. |
| `allow_write` | Boolean | no | `false` | Let the agent send data (POST, PUT, PATCH, DELETE). Off: it only reads (GET, HEAD). |
| `allowed_hosts` | Text | no |  | The hosts the agent may call, separated by commas (api.shop.com, docs.shop.com). Empty = any public address. |
| `tool_name_prefix` | Text | no | `http` | Prefix of the tool's name, e.g. "shop" → shop_request. Needed when an agent has more than one HTTP Request tool connected: tool names must be unique per agent. |
| `max_chars` | Number | no | `12000` | The most characters of an answer handed to the agent. |
| `rate_limit_profile` | Choice | no | `medium` | How long to wait and try again when the service is busy (readings only). Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent JavaScript Tool

Resource · in the catalogue: AI > Tools · type `ai.tools.code_javascript`

Lets an AI agent run a JavaScript snippet (real, sandboxed Node.js) and use the result.

**When to use it.** To let an agent write and run a small piece of JavaScript for exact calculations or reshaping data (sorting, filtering, converting a list). The code cannot reach files or the internet: to read a web page, use AI Agent Web Scraper Tool (Direct) instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `timeout_seconds` | Number | no | `5` | Execution timeout per call, in seconds. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### MCP Server

Resource · in the catalogue: AI > Tools · type `ai.tools.mcp.server`

Connects AI agents to a remote MCP server over HTTP.

**When to use it.** To give an agent the tools of an outside service that offers an MCP server: every tool that server lists becomes available to the agent. You need the server's address (URL), and a token when the service asks for one.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `server_url` | Text | yes |  | Remote MCP HTTP endpoint URL. |
| `bearer_token` | Text | no |  | Optional bearer token. |
| `headers_json` | Text | no | `{}` | Optional extra HTTP headers as a JSON object. |
| `protocol_version` | Text | no | `2025-03-26` | MCP protocol version. |
| `client_name` | Text | no | `Agentivity` | Client name reported during MCP initialize. |
| `client_version` | Text | no |  | Client version reported during MCP initialize. |
| `timeout_seconds` | Number | no | `30` | HTTP timeout in seconds. |
| `cache_tools` | Boolean | no | `true` | Cache remote tool definitions during the workflow run. |

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Applications

Applications an agent can use.

### AI Agent Airtable Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.airtable`

Gives an agent Airtable: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Airtable. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Airtable step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Airtable connection. Connection of type `airtable`. |
| `tool_name_prefix` | Text | no | `airtable` | Prefix of this instance's tool names. Required when an agent has more than one Airtable tool connected. |
| `allow_record_list` | Boolean | no | `true` | Lists a table's records: all of them, or only those that match a formula or a view. |
| `allow_record_get` | Boolean | no | `true` | Reads a record by ID. |
| `allow_record_create` | Boolean | no | `false` | Adds a record to a table. |
| `allow_record_create_many` | Boolean | no | `false` | Adds several records to a table, sent to Airtable ten at a time. |
| `allow_record_update` | Boolean | no | `false` | Changes the fields given; the other fields keep their value. |
| `allow_record_upsert` | Boolean | no | `false` | Updates the record that matches on the fields in merge_on, or adds a new one if none does. Fails when several records match. |
| `allow_record_delete` | Boolean | no | `false` | Deletes a record. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Asana Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.asana`

Gives an agent Asana: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Asana. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Asana step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Asana connection. Connection of type `asana`. |
| `tool_name_prefix` | Text | no | `asana` | Prefix of this instance's tool names. Required when an agent has more than one Asana tool connected. |
| `allow_project_list` | Boolean | no | `true` | Lists a workspace's projects that are not archived: their gid and name. |
| `allow_task_list` | Boolean | no | `true` | Lists a project's tasks: their name, whether they are done, due day, assignee and address. |
| `allow_task_get` | Boolean | no | `true` | Reads a task: its name, description, assignee, due day, whether it is done, its projects and section. |
| `allow_task_create` | Boolean | no | `false` | Adds a task to a project. |
| `allow_task_update` | Boolean | no | `false` | Changes a task, or marks it done or not done. What is left empty stays as it is. |
| `allow_task_delete` | Boolean | no | `false` | Deletes a task. Asana keeps it in its trash for 30 days. |
| `allow_task_comment` | Boolean | no | `false` | Adds a comment to a task, in the name of the token's person. |
| `allow_user_list` | Boolean | no | `true` | Lists a workspace's people: their gid, name and email address, to assign a task. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Attio Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.attio`

Gives an agent Attio: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Attio. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Attio step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Attio connection. Connection of type `attio`. |
| `tool_name_prefix` | Text | no | `attio` | Prefix of this instance's tool names. Required when an agent has more than one Attio tool connected. |
| `allow_record_query` | Boolean | no | `true` | Finds an object's records, with Attio's filter and order. Each record comes with its values as they are now. |
| `allow_record_get` | Boolean | no | `true` | Reads a record, with its values as they are now. |
| `allow_record_create` | Boolean | no | `false` | Adds a record. Attio refuses one whose unique value (an email address, a domain) another record has: use Create or update then. |
| `allow_record_upsert` | Boolean | no | `false` | Updates the record whose value of the matching attribute is the one given (email_addresses for people, domains for companies), or adds it when there is none. |
| `allow_record_update` | Boolean | no | `false` | Changes the values given of a record; a list of values gets those given added. |
| `allow_record_delete` | Boolean | no | `false` | Deletes a record, for good. |
| `allow_note_create` | Boolean | no | `false` | Adds a note to a record: a call's summary, an email's gist. |
| `allow_task_create` | Boolean | no | `false` | Adds a task, linked to a record when one is given. |
| `allow_attribute_list` | Boolean | no | `true` | Lists an object's attributes: their slug, title and type, which a record's values use. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Brevo Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.brevo`

Gives an agent Brevo: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Brevo. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Brevo step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Brevo connection. Connection of type `brevo`. |
| `tool_name_prefix` | Text | no | `brevo` | Prefix of this instance's tool names. Required when an agent has more than one Brevo tool connected. |
| `allow_email_send` | Boolean | no | `false` | Sends an email to one or more people, written here or from a Brevo template. |
| `allow_contact_upsert` | Boolean | no | `false` | Updates the contact with this email address, or creates it, and adds it to lists. |
| `allow_contact_get` | Boolean | no | `true` | Reads a contact by email address: its attributes and its lists. |
| `allow_contact_update` | Boolean | no | `false` | Changes a contact's attributes and the lists it belongs to. |
| `allow_contact_list` | Boolean | no | `true` | Lists the contacts of the account, or of one list. |
| `allow_contact_delete` | Boolean | no | `false` | Deletes a contact permanently. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Cal.com Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.calcom`

Gives an agent Cal.com: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Cal.com. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Cal.com step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Cal.com connection. Connection of type `calcom`. |
| `tool_name_prefix` | Text | no | `calcom` | Prefix of this instance's tool names. Required when an agent has more than one Cal.com tool connected. |
| `allow_event_type_list` | Boolean | no | `true` | Lists your event types: their ID, title, length and slug. |
| `allow_slot_list` | Boolean | no | `true` | Lists the free times of an event type between two dates, by day: what can be booked. |
| `allow_booking_list` | Boolean | no | `true` | Lists the bookings, the soonest first: their uid, title, start, end, attendees and status. |
| `allow_booking_get` | Boolean | no | `true` | Reads a booking: its title, start, end, attendees, place and status. |
| `allow_booking_create` | Boolean | no | `false` | Books a time of an event type for someone. Cal.com sends them the invitation. Take a free time from List free slots. |
| `allow_booking_reschedule` | Boolean | no | `false` | Moves a booking to another time. Cal.com makes it a new booking, with a new uid, and tells the attendees. |
| `allow_booking_cancel` | Boolean | no | `false` | Cancels a booking; Cal.com tells the attendees, with the reason given. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Calendly Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.calendly`

Gives an agent Calendly: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Calendly. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Calendly step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Calendly connection. Connection of type `calendly`. |
| `tool_name_prefix` | Text | no | `calendly` | Prefix of this instance's tool names. Required when an agent has more than one Calendly tool connected. |
| `allow_event_type_list` | Boolean | no | `true` | Lists your event types (30-minute call, demo…): their name, length, booking page and address (uri), which Create a booking link takes. |
| `allow_event_list` | Boolean | no | `true` | Lists your meetings, the soonest first: their name, start, end, place and status. |
| `allow_event_get` | Boolean | no | `true` | Reads a meeting: its name, start, end, place, status and hosts. |
| `allow_event_invitees` | Boolean | no | `true` | Lists the people who booked a meeting: their name, email, answers to the booking questions, and their links to cancel or move it. |
| `allow_event_cancel` | Boolean | no | `false` | Cancels a meeting for everyone in it; Calendly tells the invitees, with the reason given. |
| `allow_scheduling_link_create` | Boolean | no | `false` | Makes a booking link for one meeting of an event type, to send to one person: it works once, and ends unused after 90 days. Its address is in booking_url. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent ClickUp Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.clickup`

Gives an agent ClickUp: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use ClickUp. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the ClickUp step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The ClickUp connection. Connection of type `clickup`. |
| `tool_name_prefix` | Text | no | `clickup` | Prefix of this instance's tool names. Required when an agent has more than one ClickUp tool connected. |
| `allow_task_list` | Boolean | no | `true` | Lists a list's tasks: their ID, name, status, priority, assignees, due date and address. The closed ones only when asked. |
| `allow_task_get` | Boolean | no | `true` | Reads a task: its name, description, status, priority, assignees, dates, list and address. |
| `allow_task_create` | Boolean | no | `false` | Adds a task to a list. |
| `allow_task_update` | Boolean | no | `false` | Changes a task: its name, description, status (to close it: its closed status, such as complete), priority or due date. What is left empty stays as it is. |
| `allow_task_delete` | Boolean | no | `false` | Deletes a task. |
| `allow_task_comment` | Boolean | no | `false` | Adds a comment to a task, in the name of the token's person. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Discord Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.discord`

Gives an agent Discord: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Discord. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Discord step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Discord connection. Connection of type `discord`. |
| `tool_name_prefix` | Text | no | `discord` | Prefix of this instance's tool names. Required when an agent has more than one Discord tool connected. |
| `allow_message_send` | Boolean | no | `false` | Posts a message in a channel: text, rich blocks, or both. |
| `allow_message_edit` | Boolean | no | `false` | Changes a message the bot posted. |
| `allow_message_delete` | Boolean | no | `false` | Deletes a message. Deleting someone else's message needs the Manage Messages permission. |
| `allow_message_list` | Boolean | no | `true` | Reads a channel's messages, the newest first. |
| `allow_message_react` | Boolean | no | `false` | Adds the bot's reaction to a message. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Freshdesk Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.freshdesk`

Gives an agent Freshdesk: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Freshdesk. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Freshdesk step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Freshdesk connection. Connection of type `freshdesk`. |
| `tool_name_prefix` | Text | no | `freshdesk` | Prefix of this instance's tool names. Required when an agent has more than one Freshdesk tool connected. |
| `allow_ticket_list` | Boolean | no | `true` | Lists the tickets, newest first: of the last 30 days, or changed since a date. Their number, subject, status, priority and requester. |
| `allow_ticket_search` | Boolean | no | `true` | Finds tickets with Freshdesk's query language: "status:2 AND priority:4", "tag:'refund'", "created_at:>'2026-11-01'". At most 300. |
| `allow_ticket_get` | Boolean | no | `true` | Reads a ticket with its conversation: replies and notes. |
| `allow_ticket_create` | Boolean | no | `false` | Opens a ticket for a customer, by their email address. |
| `allow_ticket_update` | Boolean | no | `false` | Changes a ticket: its status, priority, type, tags or agent. What is left empty stays as it is. |
| `allow_ticket_reply` | Boolean | no | `false` | Replies to the customer on a ticket: they get it by email. |
| `allow_ticket_note` | Boolean | no | `false` | Adds a note to a ticket, private to the agents unless said otherwise. |
| `allow_ticket_delete` | Boolean | no | `false` | Moves a ticket to Freshdesk's trash, where it can be restored. |
| `allow_contact_list` | Boolean | no | `true` | Lists the contacts, or finds one by email address or phone. |
| `allow_contact_get` | Boolean | no | `true` | Reads a contact. |
| `allow_contact_create` | Boolean | no | `false` | Adds a contact. Freshdesk refuses an email address another contact has. |
| `allow_contact_update` | Boolean | no | `false` | Changes a contact. What is left empty stays as it is. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent GitHub Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.github`

Gives an agent GitHub: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use GitHub. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the GitHub step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The GitHub connection. Connection of type `github`. |
| `tool_name_prefix` | Text | no | `github` | Prefix of this instance's tool names. Required when an agent has more than one GitHub tool connected. |
| `allow_issue_create` | Boolean | no | `false` | Opens an issue in a repository. |
| `allow_issue_update` | Boolean | no | `false` | Changes an issue, or closes or reopens it. What is left empty stays as it is. |
| `allow_issue_get` | Boolean | no | `true` | Reads an issue. |
| `allow_issue_list` | Boolean | no | `true` | Lists a repository's issues, the newest first. GitHub counts pull requests among them. |
| `allow_issue_comment` | Boolean | no | `false` | Adds a comment to an issue or a pull request. |
| `allow_issue_search` | Boolean | no | `true` | Finds issues and pull requests with GitHub's search words. GitHub gives at most 1,000. |
| `allow_pull_request_list` | Boolean | no | `true` | Lists a repository's pull requests, the newest first. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Calendar Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_calendar`

Gives an agent Google Calendar: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Calendar. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Calendar step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Calendar connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_calendar` | Prefix of this instance's tool names. Required when an agent has more than one Google Calendar tool connected. |
| `allow_event_list` | Boolean | no | `true` | Lists the events of a calendar between two moments, in time order. Each occurrence of a repeating event is listed on its own. |
| `allow_event_get` | Boolean | no | `true` | Reads an event. |
| `allow_event_create` | Boolean | no | `false` | Adds an event to a calendar. |
| `allow_event_update` | Boolean | no | `false` | Changes an event. What is left empty stays as it is. |
| `allow_event_delete` | Boolean | no | `false` | Deletes an event. Its guests are not notified. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Contacts Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_contacts`

Gives an agent Google Contacts: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Contacts. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Contacts step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Contacts connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_contacts` | Prefix of this instance's tool names. Required when an agent has more than one Google Contacts tool connected. |
| `allow_contact_list` | Boolean | no | `true` | Lists the account's contacts. |
| `allow_contact_search` | Boolean | no | `true` | Finds contacts by the start of a name, an email address, a phone number or a company. Google returns 30 at most. |
| `allow_contact_create` | Boolean | no | `false` | Adds a contact. |
| `allow_contact_update` | Boolean | no | `false` | Changes a contact. What is left empty stays as it is; a new email address or phone number replaces the old one. |
| `allow_contact_delete` | Boolean | no | `false` | Deletes a contact. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Docs Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_docs`

Gives an agent Google Docs: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Docs. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Docs step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Docs connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_docs` | Prefix of this instance's tool names. Required when an agent has more than one Google Docs tool connected. |
| `allow_document_create` | Boolean | no | `false` | Creates a document in the account's Drive, empty or with a first text. |
| `allow_document_read` | Boolean | no | `true` | Reads a document's title and its text, tab by tab. |
| `allow_document_append` | Boolean | no | `false` | Adds text at the end of a document, as a new paragraph. |
| `allow_document_replace` | Boolean | no | `false` | Replaces every occurrence of a text in a document, to fill in a template for example. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Drive Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_drive`

Gives an agent Google Drive: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Drive. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Drive step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Drive connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_drive` | Prefix of this instance's tool names. Required when an agent has more than one Google Drive tool connected. |
| `allow_file_upload` | Boolean | no | `false` | Uploads a file to the Drive, up to 5 MB, from a public address or from text you give. It can become a Google Docs, Sheets or Slides file. |
| `allow_file_list` | Boolean | no | `true` | Lists the files and folders this connection can see, in a folder or by name. |
| `allow_file_read_text` | Boolean | no | `true` | Reads a file's content as text, up to 10 MB: Docs and Slides as plain text, Sheets as CSV, text files as they are. |
| `allow_file_share` | Boolean | no | `false` | Gives a person, or anyone with the link, access to a file or folder. |
| `allow_file_trash` | Boolean | no | `false` | Moves a file or folder to the Drive's bin, where Google keeps it for 30 days. |
| `allow_folder_create` | Boolean | no | `false` | Creates a folder in the Drive. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Forms Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_forms`

Gives an agent Google Forms: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Forms. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Forms step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Forms connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_forms` | Prefix of this instance's tool names. Required when an agent has more than one Google Forms tool connected. |
| `allow_form_create` | Boolean | no | `false` | Creates a form with its questions, open to answers, and returns the address to send to people. |
| `allow_form_get` | Boolean | no | `true` | Reads a form: its title, its questions and the address where people answer it. |
| `allow_response_list` | Boolean | no | `true` | Lists the answers sent to a form, each one grouped by question title. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Sheets Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_sheets`

Gives an agent Google Sheets: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Sheets. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Sheets step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Sheets connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_sheets` | Prefix of this instance's tool names. Required when an agent has more than one Google Sheets tool connected. |
| `allow_rows_read` | Boolean | no | `true` | Reads the rows of a sheet. With a header row, each row becomes a record whose fields are named by the first row. |
| `allow_rows_append` | Boolean | no | `false` | Adds rows after the last row of a sheet. Records go under the columns named in the first row. |
| `allow_cells_update` | Boolean | no | `false` | Writes values into a range of cells, starting at its top-left cell. |
| `allow_cells_clear` | Boolean | no | `false` | Empties a range of cells and keeps their formatting. |
| `allow_spreadsheet_get` | Boolean | no | `true` | Reads the title of a spreadsheet and the names of its sheets. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Slides Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_slides`

Gives an agent Google Slides: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Slides. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Slides step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Slides connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_slides` | Prefix of this instance's tool names. Required when an agent has more than one Google Slides tool connected. |
| `allow_presentation_create` | Boolean | no | `false` | Creates a presentation in the account's Drive, with one title slide. |
| `allow_presentation_read` | Boolean | no | `true` | Reads the text of each slide of a presentation. |
| `allow_presentation_replace` | Boolean | no | `false` | Replaces every occurrence of a text on the slides, to fill in a template for example. |
| `allow_slide_add` | Boolean | no | `false` | Adds a slide with a title and text, using the presentation's "Title and body" layout. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Google Tasks Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.google_tasks`

Gives an agent Google Tasks: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Google Tasks. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Google Tasks step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Google Tasks connection. Connection of type `google`. |
| `tool_name_prefix` | Text | no | `google_tasks` | Prefix of this instance's tool names. Required when an agent has more than one Google Tasks tool connected. |
| `allow_task_list` | Boolean | no | `true` | Lists the tasks of a list: only those to do, or all of them. |
| `allow_task_create` | Boolean | no | `false` | Adds a task to a list. |
| `allow_task_update` | Boolean | no | `false` | Changes a task. What is left empty stays as it is. |
| `allow_task_complete` | Boolean | no | `false` | Marks a task as done. |
| `allow_task_delete` | Boolean | no | `false` | Deletes a task. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent HubSpot Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.hubspot`

Gives an agent HubSpot: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use HubSpot. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the HubSpot step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The HubSpot connection. Connection of type `hubspot`. |
| `tool_name_prefix` | Text | no | `hubspot` | Prefix of this instance's tool names. Required when an agent has more than one HubSpot tool connected. |
| `allow_contact_create` | Boolean | no | `false` | Creates a contact. |
| `allow_contact_upsert` | Boolean | no | `false` | Updates the contact with this email, or creates it. |
| `allow_contact_update` | Boolean | no | `false` | Changes the properties of a contact. |
| `allow_contact_get` | Boolean | no | `true` | Reads a contact by ID. |
| `allow_contact_list` | Boolean | no | `true` | Lists contacts. |
| `allow_contact_search` | Boolean | no | `true` | Finds contacts by words or by filters. HubSpot gives at most 10,000 results. |
| `allow_contact_delete` | Boolean | no | `false` | Moves a contact to HubSpot's recycling bin. |
| `allow_company_create` | Boolean | no | `false` | Creates a company. |
| `allow_company_update` | Boolean | no | `false` | Changes the properties of a company. |
| `allow_company_get` | Boolean | no | `true` | Reads a company by ID. |
| `allow_company_list` | Boolean | no | `true` | Lists companies. |
| `allow_company_search` | Boolean | no | `true` | Finds companies by words or by filters. HubSpot gives at most 10,000 results. |
| `allow_company_delete` | Boolean | no | `false` | Moves a company to HubSpot's recycling bin. |
| `allow_deal_create` | Boolean | no | `false` | Creates a deal. |
| `allow_deal_update` | Boolean | no | `false` | Changes the properties of a deal. |
| `allow_deal_get` | Boolean | no | `true` | Reads a deal by ID. |
| `allow_deal_list` | Boolean | no | `true` | Lists deals. |
| `allow_deal_search` | Boolean | no | `true` | Finds deals by words or by filters. HubSpot gives at most 10,000 results. |
| `allow_deal_delete` | Boolean | no | `false` | Moves a deal to HubSpot's recycling bin. |
| `allow_ticket_create` | Boolean | no | `false` | Creates a ticket. |
| `allow_ticket_update` | Boolean | no | `false` | Changes the properties of a ticket. |
| `allow_ticket_get` | Boolean | no | `true` | Reads a ticket by ID. |
| `allow_ticket_list` | Boolean | no | `true` | Lists tickets. |
| `allow_ticket_search` | Boolean | no | `true` | Finds tickets by words or by filters. HubSpot gives at most 10,000 results. |
| `allow_ticket_delete` | Boolean | no | `false` | Moves a ticket to HubSpot's recycling bin. |
| `allow_list_members` | Boolean | no | `true` | Lists the records in a contact list. |
| `allow_activity_note` | Boolean | no | `false` | Adds a note to a contact, a company, a deal or a ticket. |
| `allow_activity_task` | Boolean | no | `false` | Adds a task to a contact, a company, a deal or a ticket. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Intercom Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.intercom`

Gives an agent Intercom: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Intercom. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Intercom step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Intercom connection. Connection of type `intercom`. |
| `tool_name_prefix` | Text | no | `intercom` | Prefix of this instance's tool names. Required when an agent has more than one Intercom tool connected. |
| `allow_contact_search` | Boolean | no | `true` | Finds contacts by email address, or with an Intercom search query: their ID, role, name, email address and attributes. |
| `allow_contact_get` | Boolean | no | `true` | Reads a contact: their name, email address, role, company, tags and attributes. |
| `allow_contact_create` | Boolean | no | `false` | Adds a contact: a user (who signed up) or a lead. |
| `allow_contact_update` | Boolean | no | `false` | Changes a contact. What is left empty stays as it is. |
| `allow_contact_note` | Boolean | no | `false` | Adds a note to a contact, seen by the teammates only. |
| `allow_conversation_search` | Boolean | no | `true` | Finds conversations by their state (open, snoozed, closed), or with an Intercom search query. |
| `allow_conversation_get` | Boolean | no | `true` | Reads a conversation with its messages, as plain text. |
| `allow_conversation_reply` | Boolean | no | `false` | Replies to the customer in a conversation, as a teammate. |
| `allow_conversation_note` | Boolean | no | `false` | Adds a note to a conversation, seen by the teammates only. |
| `allow_conversation_assign` | Boolean | no | `false` | Assigns a conversation to a teammate. |
| `allow_conversation_close` | Boolean | no | `false` | Closes a conversation, with a last message to the customer when one is given. |
| `allow_admin_list` | Boolean | no | `true` | Lists the teammates: their ID, name and email address, to write or assign as one. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Jira Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.jira`

Gives an agent Jira: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Jira. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Jira step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Jira connection. Connection of type `jira`. |
| `tool_name_prefix` | Text | no | `jira` | Prefix of this instance's tool names. Required when an agent has more than one Jira tool connected. |
| `allow_issue_create` | Boolean | no | `false` | Creates an issue in a project. |
| `allow_issue_get` | Boolean | no | `true` | Reads an issue. |
| `allow_issue_update` | Boolean | no | `false` | Changes an issue's summary, description, labels or other fields. What is left empty stays as it is. |
| `allow_issue_search` | Boolean | no | `true` | Finds issues with JQL, Jira's query language. |
| `allow_issue_transition` | Boolean | no | `false` | Moves an issue along its workflow, by the transition's name: Start progress, Done. |
| `allow_issue_comment` | Boolean | no | `false` | Adds a comment to an issue. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Linear Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.linear`

Gives an agent Linear: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Linear. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Linear step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Linear connection. Connection of type `linear`. |
| `tool_name_prefix` | Text | no | `linear` | Prefix of this instance's tool names. Required when an agent has more than one Linear tool connected. |
| `allow_issue_create` | Boolean | no | `false` | Creates an issue in a team, in its first backlog state. |
| `allow_issue_update` | Boolean | no | `false` | Changes an issue's title, description, priority or state. What is left empty stays as it is. |
| `allow_issue_get` | Boolean | no | `true` | Reads an issue. |
| `allow_issue_list` | Boolean | no | `true` | Lists issues, the most recently changed first, of a team or all of them. |
| `allow_issue_comment` | Boolean | no | `false` | Adds a comment to an issue. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Mailchimp Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.mailchimp`

Gives an agent Mailchimp: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Mailchimp. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Mailchimp step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Mailchimp connection. Connection of type `mailchimp`. |
| `tool_name_prefix` | Text | no | `mailchimp` | Prefix of this instance's tool names. Required when an agent has more than one Mailchimp tool connected. |
| `allow_member_upsert` | Boolean | no | `false` | Updates the member with this email address, or adds it to the audience. |
| `allow_member_get` | Boolean | no | `true` | Reads a member of an audience by email address. |
| `allow_member_list` | Boolean | no | `true` | Lists the members of an audience, all or those with a status. |
| `allow_member_tag` | Boolean | no | `false` | Adds tags to a member, or takes them off. |
| `allow_member_archive` | Boolean | no | `false` | Archives a member: it leaves the audience and can be added back. |
| `allow_member_delete` | Boolean | no | `false` | Deletes a member and its personal data for good: it can never be imported again. |
| `allow_campaign_list` | Boolean | no | `true` | Lists the campaigns, the newest first. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent MailerLite Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.mailerlite`

Gives an agent MailerLite: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use MailerLite. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the MailerLite step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The MailerLite connection. Connection of type `mailerlite`. |
| `tool_name_prefix` | Text | no | `mailerlite` | Prefix of this instance's tool names. Required when an agent has more than one MailerLite tool connected. |
| `allow_subscriber_upsert` | Boolean | no | `false` | Updates the subscriber with this email address, or adds it, and puts it in groups. Fields left out keep their value. |
| `allow_subscriber_get` | Boolean | no | `true` | Reads a subscriber by ID or email address. |
| `allow_subscriber_list` | Boolean | no | `true` | Lists the subscribers, all or those with a status. |
| `allow_subscriber_delete` | Boolean | no | `false` | Removes a subscriber from the account; MailerLite keeps its data. |
| `allow_subscriber_forget` | Boolean | no | `false` | Deletes a subscriber and its data for good, within 30 days, as the GDPR asks. |
| `allow_group_add` | Boolean | no | `false` | Puts a subscriber in a group. |
| `allow_group_remove` | Boolean | no | `false` | Takes a subscriber out of a group. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent monday.com Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.monday`

Gives an agent monday.com: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use monday.com. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the monday.com step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The monday.com connection. Connection of type `monday`. |
| `tool_name_prefix` | Text | no | `monday` | Prefix of this instance's tool names. Required when an agent has more than one monday.com tool connected. |
| `allow_board_list` | Boolean | no | `true` | Lists the active boards, the most used first: their ID, name and the items' count. |
| `allow_board_columns` | Boolean | no | `true` | Lists a board's columns and groups: their ID, title and type, which an item's values and groups use. |
| `allow_item_list` | Boolean | no | `true` | Lists a board's items, with their group and every column's value as text. |
| `allow_item_get` | Boolean | no | `true` | Reads an item: its name, group, board, every column's value and its address. |
| `allow_item_create` | Boolean | no | `false` | Adds an item to a board, in a group when one is given (the first group otherwise), with column values. |
| `allow_item_update` | Boolean | no | `false` | Changes an item's column values, and its name when one is given. The columns not given stay as they are. |
| `allow_item_move` | Boolean | no | `false` | Moves an item to another group of its board. |
| `allow_item_archive` | Boolean | no | `false` | Archives an item: monday.com keeps it 30 days among the archived, where it can be restored. |
| `allow_item_delete` | Boolean | no | `false` | Deletes an item. monday.com keeps it 30 days in its trash. |
| `allow_update_create` | Boolean | no | `false` | Writes an update on an item, as the token's person: a comment the item's subscribers see. |
| `allow_update_list` | Boolean | no | `true` | Lists an item's updates, the newest first, with who wrote them. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Notion Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.notion`

Gives an agent Notion: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Notion. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Notion step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Notion connection. Connection of type `notion`. |
| `tool_name_prefix` | Text | no | `notion` | Prefix of this instance's tool names. Required when an agent has more than one Notion tool connected. |
| `allow_database_page_create` | Boolean | no | `false` | Adds a page to a database, with its fields and content. |
| `allow_database_page_get` | Boolean | no | `true` | Reads a page and its fields. |
| `allow_database_page_list` | Boolean | no | `false` | Lists the pages of a database, filtered and sorted if asked. |
| `allow_database_page_update` | Boolean | no | `false` | Changes the fields of a database page. |
| `allow_database_fields` | Boolean | no | `true` | Reads a database's fields and their types. |
| `allow_page_create` | Boolean | no | `false` | Adds a page under another page. |
| `allow_page_search` | Boolean | no | `true` | Finds pages shared with the connection, by title. |
| `allow_page_archive` | Boolean | no | `false` | Moves a page to Notion's trash. It can be restored there. |
| `allow_content_add` | Boolean | no | `false` | Adds text or blocks at the end of a page. |
| `allow_content_read` | Boolean | no | `true` | Reads the blocks of a page. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Pipedrive Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.pipedrive`

Gives an agent Pipedrive: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Pipedrive. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Pipedrive step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Pipedrive connection. Connection of type `pipedrive`. |
| `tool_name_prefix` | Text | no | `pipedrive` | Prefix of this instance's tool names. Required when an agent has more than one Pipedrive tool connected. |
| `allow_person_create` | Boolean | no | `false` | Adds a person. |
| `allow_person_update` | Boolean | no | `false` | Changes a person. An email address or a phone number given replaces the old one. |
| `allow_person_get` | Boolean | no | `true` | Reads a person. |
| `allow_person_search` | Boolean | no | `true` | Finds people by name, email address or phone number. |
| `allow_organization_create` | Boolean | no | `false` | Adds an organization. |
| `allow_organization_search` | Boolean | no | `true` | Finds organizations by name or address. |
| `allow_deal_create` | Boolean | no | `false` | Adds a deal, for a person or an organization. |
| `allow_deal_update` | Boolean | no | `false` | Changes a deal, moves it to another stage, or marks it won or lost. |
| `allow_deal_get` | Boolean | no | `true` | Reads a deal. |
| `allow_deal_list` | Boolean | no | `true` | Lists the deals, all or those of a stage. |
| `allow_deal_search` | Boolean | no | `true` | Finds deals by title. |
| `allow_activity_create` | Boolean | no | `false` | Adds an activity (a call, a meeting, a task…) to a deal or a person. |
| `allow_note_create` | Boolean | no | `false` | Adds a note to a deal, a person or an organization. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Resend Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.resend`

Gives an agent Resend: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Resend. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Resend step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Resend connection. Connection of type `resend`. |
| `tool_name_prefix` | Text | no | `resend` | Prefix of this instance's tool names. Required when an agent has more than one Resend tool connected. |
| `allow_email_send` | Boolean | no | `false` | Sends an email from an address of a domain checked in Resend, as HTML or plain text. |
| `allow_email_get` | Boolean | no | `true` | Reads an email sent: its recipients, its subject and what happened to it last (delivered, opened, bounced). |
| `allow_contact_create` | Boolean | no | `false` | Adds a contact. |
| `allow_contact_get` | Boolean | no | `true` | Reads a contact. |
| `allow_contact_update` | Boolean | no | `false` | Changes a contact. What is left empty stays as it is. |
| `allow_contact_list` | Boolean | no | `true` | Lists the contacts. |
| `allow_contact_delete` | Boolean | no | `false` | Deletes a contact. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Shopify Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.shopify`

Gives an agent Shopify: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Shopify. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Shopify step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Shopify connection. Connection of type `shopify`. |
| `tool_name_prefix` | Text | no | `shopify` | Prefix of this instance's tool names. Required when an agent has more than one Shopify tool connected. |
| `allow_order_list` | Boolean | no | `true` | Lists the orders, newest first: their name (#1001), date, customer, total, payment and fulfillment status. Shopify gives the last 60 days unless the app may read all orders. |
| `allow_order_get` | Boolean | no | `true` | Reads an order: its customer, address, lines, totals and statuses. |
| `allow_order_add_tags` | Boolean | no | `false` | Adds tags to an order, keeping those it has. |
| `allow_product_list` | Boolean | no | `true` | Lists the products, by name: their status, vendor, type, tags and stock. |
| `allow_product_get` | Boolean | no | `true` | Reads a product: its description and its variants with their price, SKU and stock. |
| `allow_product_create` | Boolean | no | `false` | Adds a product, a draft unless another status is set. Its price and stock are set on its variant in Shopify. |
| `allow_product_update` | Boolean | no | `false` | Changes a product: its name, description, vendor, type, tags (they replace those it has) or status. What is left empty stays as it is. |
| `allow_customer_list` | Boolean | no | `true` | Lists the customers, or finds them with a search (email:anna@acme.co, tag:vip): their name, email address, orders and amount spent. |
| `allow_customer_get` | Boolean | no | `true` | Reads a customer, with their addresses and last orders. |
| `allow_customer_create` | Boolean | no | `false` | Adds a customer. Shopify refuses an email address or a phone number another customer has. |
| `allow_customer_add_tags` | Boolean | no | `false` | Adds tags to a customer, keeping those they have. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Stripe Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.stripe`

Gives an agent Stripe: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Stripe. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Stripe step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Stripe connection. Connection of type `stripe`. |
| `tool_name_prefix` | Text | no | `stripe` | Prefix of this instance's tool names. Required when an agent has more than one Stripe tool connected. |
| `allow_customer_create` | Boolean | no | `false` | Creates a customer. |
| `allow_customer_update` | Boolean | no | `false` | Changes a customer. |
| `allow_customer_get` | Boolean | no | `true` | Reads a customer by ID. |
| `allow_customer_list` | Boolean | no | `true` | Lists customers, the newest first, or only those with a given email address. |
| `allow_customer_search` | Boolean | no | `true` | Finds customers with Stripe's search syntax. A new customer can take a minute to appear in the results. |
| `allow_customer_delete` | Boolean | no | `false` | Deletes a customer permanently and cancels their subscriptions. |
| `allow_payment_list` | Boolean | no | `true` | Lists payments (Stripe's PaymentIntents), the newest first. |
| `allow_payment_get` | Boolean | no | `true` | Reads a payment by ID: its amount, its status and its customer. |
| `allow_payment_link_create` | Boolean | no | `false` | Creates a link to a Stripe payment page for a price, to send to a customer. |
| `allow_invoice_list` | Boolean | no | `true` | Lists invoices, the newest first, for a customer or with a given status. |
| `allow_balance_get` | Boolean | no | `true` | Reads the account's balance: what is available and what is pending, by currency. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Tally Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.tally`

Gives an agent Tally: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Tally. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Tally step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Tally connection. Connection of type `tally`. |
| `tool_name_prefix` | Text | no | `tally` | Prefix of this instance's tool names. Required when an agent has more than one Tally tool connected. |
| `allow_form_list` | Boolean | no | `true` | Lists the forms: their ID, name, status and how many submissions each has. |
| `allow_form_get` | Boolean | no | `true` | Reads a form: its blocks and settings. |
| `allow_form_questions` | Boolean | no | `true` | Reads a form's questions: their ID, type and title. |
| `allow_submission_list` | Boolean | no | `true` | Lists a form's submissions. Each answer names its question by ID: the answer's questionId is a question of Read its questions. |
| `allow_submission_delete` | Boolean | no | `false` | Deletes a submission, for good. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Telegram Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.telegram`

Gives an agent Telegram: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Telegram. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Telegram step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Telegram connection. Connection of type `telegram`. |
| `tool_name_prefix` | Text | no | `telegram` | Prefix of this instance's tool names. Required when an agent has more than one Telegram tool connected. |
| `allow_message_send` | Boolean | no | `false` | Sends a text message to a chat, a group or a channel. |
| `allow_message_edit` | Boolean | no | `false` | Changes the text of a message the bot sent. |
| `allow_message_delete` | Boolean | no | `false` | Deletes a message. Telegram allows it only within 48 hours of sending. |
| `allow_file_send_photo` | Boolean | no | `false` | Sends an image from its public address, up to 5 MB, with an optional caption. |
| `allow_file_send_document` | Boolean | no | `false` | Sends a file from its public address. By address, Telegram takes only PDF and ZIP files, up to 20 MB. |
| `allow_chat_get` | Boolean | no | `true` | Reads a chat: its title, its type and its description. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Todoist Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.todoist`

Gives an agent Todoist: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Todoist. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Todoist step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Todoist connection. Connection of type `todoist`. |
| `tool_name_prefix` | Text | no | `todoist` | Prefix of this instance's tool names. Required when an agent has more than one Todoist tool connected. |
| `allow_project_list` | Boolean | no | `true` | Lists the projects: their ID and name. |
| `allow_task_list` | Boolean | no | `true` | Lists the tasks not done yet: of a project, a section or a label, or all of them. |
| `allow_task_filter` | Boolean | no | `true` | Finds the tasks not done yet with a Todoist filter: today, overdue, #Work & p1, search: invoice. |
| `allow_task_get` | Boolean | no | `true` | Reads a task: its content, description, project, labels, priority and due date. |
| `allow_task_create` | Boolean | no | `false` | Adds a task: to the Inbox, or to a project and section. |
| `allow_task_update` | Boolean | no | `false` | Changes a task. What is left empty stays as it is. |
| `allow_task_close` | Boolean | no | `false` | Marks a task done. A recurring task moves to its next date. |
| `allow_task_reopen` | Boolean | no | `false` | Marks a done task not done again. |
| `allow_task_delete` | Boolean | no | `false` | Deletes a task, for good. |
| `allow_comment_create` | Boolean | no | `false` | Adds a comment to a task. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Trello Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.trello`

Gives an agent Trello: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Trello. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Trello step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Trello connection. Connection of type `trello`. |
| `tool_name_prefix` | Text | no | `trello` | Prefix of this instance's tool names. Required when an agent has more than one Trello tool connected. |
| `allow_card_create` | Boolean | no | `false` | Adds a card to a list. |
| `allow_card_update` | Boolean | no | `false` | Changes a card, moves it to another list, marks it done or archives it. What is left empty stays as it is. |
| `allow_card_get` | Boolean | no | `true` | Reads a card. |
| `allow_card_list` | Boolean | no | `true` | Lists the cards of a list, up to 1,000. |
| `allow_card_comment` | Boolean | no | `false` | Adds a comment to a card. |
| `allow_card_delete` | Boolean | no | `false` | Deletes a card for good. To keep it out of sight, archive it instead. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Typeform Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.typeform`

Gives an agent Typeform: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Typeform. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Typeform step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Typeform connection. Connection of type `typeform`. |
| `tool_name_prefix` | Text | no | `typeform` | Prefix of this instance's tool names. Required when an agent has more than one Typeform tool connected. |
| `allow_form_list` | Boolean | no | `true` | Lists the forms, the last changed first: their ID, title and address. |
| `allow_form_get` | Boolean | no | `true` | Reads a form: its questions (fields, with their ID and title), its hidden fields and its settings. |
| `allow_response_list` | Boolean | no | `true` | Lists a form's responses, the newest first. Each answer names its question by field ID: read the form to have their titles. Typeform can take up to 30 minutes to list a new response. |
| `allow_response_delete` | Boolean | no | `false` | Deletes responses of a form, for good: up to 1,000 at a time, by their response IDs. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Zendesk Tool

Resource · in the catalogue: AI > Tools > Applications · type `ai.tools.app.zendesk`

Gives an agent Zendesk: one tool per operation you allow on this node.

**When to use it.** For an agent that decides by itself when to use Zendesk. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Zendesk step instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The Zendesk connection. Connection of type `zendesk`. |
| `tool_name_prefix` | Text | no | `zendesk` | Prefix of this instance's tool names. Required when an agent has more than one Zendesk tool connected. |
| `allow_ticket_list` | Boolean | no | `true` | Lists the tickets, the most recently changed first: their number, subject, status, priority, requester and assignee. |
| `allow_ticket_search` | Boolean | no | `true` | Finds tickets with Zendesk's search: status:open priority:urgent, requester:anna@acme.co, tags:refund, created>2026-11-01. At most 1,000. |
| `allow_ticket_get` | Boolean | no | `true` | Reads a ticket: its subject, description, status, priority, tags, requester and assignee. |
| `allow_ticket_create` | Boolean | no | `false` | Opens a ticket for a customer, by their email address: Zendesk adds them as a person when they are new. |
| `allow_ticket_update` | Boolean | no | `false` | Changes a ticket: its subject, status, priority, tags or agent. What is left empty stays as it is. |
| `allow_ticket_comment` | Boolean | no | `false` | Adds a comment to a ticket: a reply the customer gets by email, or a private note for the agents. A status may be set with it. |
| `allow_ticket_comments` | Boolean | no | `true` | Lists a ticket's comments, oldest first: replies and private notes, with who wrote them. |
| `allow_ticket_delete` | Boolean | no | `false` | Deletes a ticket. Zendesk keeps it 30 days among the deleted tickets, where it can be restored. |
| `allow_user_search` | Boolean | no | `true` | Finds people by name or email address: customers and agents. |
| `allow_user_get` | Boolean | no | `true` | Reads a person: their name, email address, role and organization. |
| `allow_user_create` | Boolean | no | `false` | Adds a customer (an end user). |

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Data

AI tools that read and write Data Tables and Vector Stores.

### AI Agent Data Table Tool

Resource · in the catalogue: AI > Tools > Data · type `ai.tools.data.datatable`

Exposes CRUD on a shared Data Table asset as LLM-callable tools.

**When to use it.** To let an agent search, add, change or delete rows of a Data Table, for example bookings or leads shared by several agents. Turn off what the agent must not do; questions in SQL (totals, averages) stay off unless you turn them on.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `table_id` | AssetRef | yes |  | The shared Data Table asset this tool reads and writes. |
| `tool_name_prefix` | Text | no | `datatable` | Prefix for this instance's tool names, e.g. "trips" → trips_select, trips_insert, trips_update, trips_delete, trips_find. Required whenever an agent has more than one Data Table tool connected — tool names must be unique per agent. |
| `max_rows` | Number | no | `100` | The most rows one select gives the agent (default 100; 0 for no limit). When a search finds more, the agent is told how many there are and how to get the next ones. |
| `allow_read` | Boolean | no | `true` | Expose reading rows (select/find) to the agent. |
| `allow_insert` | Boolean | no | `true` | Expose inserting new rows to the agent. |
| `allow_update` | Boolean | no | `true` | Expose updating existing rows to the agent. |
| `allow_delete` | Boolean | no | `true` | Expose deleting rows to the agent. |
| `allow_query` | Boolean | no | `false` | Expose read-only SQL on this table to the agent (one SELECT at a time: totals, groups, averages…). Off unless turned on. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Vector Store Tool

Resource · in the catalogue: AI > Tools > Data · type `ai.tools.vectorstore`

Lets an AI agent search the connected Vector Store by meaning, and keep texts there when allowed.

**When to use it.** To give an agent a memory it searches by meaning, and fills itself when storing is allowed: notes on customers, what it learned, answers it found. Connect a Vector Store to it (In-Memory lasts one run; Qdrant, Pinecone or pgvector keep the texts). For what an agent should know from documents, pages or feeds, use a Knowledge Base instead.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `name` | Text | yes | `documents` | Names the agent's tools: "Customer notes" gives search_customer_notes (and store_customer_notes). |
| `description` | Text | no |  | What the texts are, said to the agent so it knows when to search them. |
| `limit` | Number | no | `4` | The most texts one search gives. |
| `allow_storing` | Boolean | no | `false` | Also let the agent keep texts in the Vector Store. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Vector Store** | yes | `ai.vectorstore.*` | 1 |

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Documents

AI tools that read documents (PDF, Word, text).

### AI Agent Read Document Tool

Resource · in the catalogue: AI > Tools > Documents · type `ai.tools.documents.read`

Lets an AI agent read a document the user uploaded in the chat (PDF, Word, plain text) as Markdown.

**When to use it.** To let an agent read a file the user drops in the chat (PDF, Word or plain text) and work from its content: a contract to summarize, a CV to screen, an invoice to check. A scanned page with no text in it cannot be read.

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Scrappers

AI tools for provider-based web scraping.

### AI Agent Web Scraper Tool (Direct)

Resource · in the catalogue: AI > Tools > Scrappers · type `ai.tools.web.scraper.direct`

Exposes the direct web scraper to AI agents as a callable tool.

**When to use it.** To let an agent read a web page from its address and get its main content as clean text, its title and description, and the links to other pages of the same site. Free and needs no account; a page that only shows its content once scripts have run may come back nearly empty.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `default_render_javascript` | Boolean | no | `false` | Default JavaScript rendering behavior. |
| `default_extract_markdown` | Boolean | no | `true` | Default markdown extraction behavior. |
| `default_extract_metadata` | Boolean | no | `true` | Default metadata extraction behavior. |
| `default_include_html` | Boolean | no | `false` | Return the page's raw HTML to the agent as well. Off by default: the cleaned markdown and structured data hold what the agent needs, and raw HTML can fill its context with up to 50 KB of markup per call. |
| `default_timeout_seconds` | Number | no | `30` | Default timeout in seconds. |
| `default_max_content_length` | Number | no | `50000` | Default maximum content length. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Web Scraper Tool (Firecrawl)

Resource · in the catalogue: AI > Tools > Scrappers · type `ai.tools.web.scraper.firecrawl`

Exposes the Firecrawl web scraper to AI agents as a callable tool.

**When to use it.** To let an agent read a web page from its address through Firecrawl, a paid service that returns the page's main content cleaned up. Needs a Firecrawl API key: try the free Direct scraper first.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Firecrawl API credentials. Connection of type `firecrawl`. |
| `default_render_javascript` | Boolean | no | `false` | Default JavaScript rendering behavior. |
| `default_extract_markdown` | Boolean | no | `true` | Default markdown extraction behavior. |
| `default_extract_metadata` | Boolean | no | `true` | Default metadata extraction behavior. |
| `default_include_html` | Boolean | no | `false` | Return the page's raw HTML to the agent as well. Off by default: the cleaned markdown and structured data hold what the agent needs, and raw HTML can fill its context with up to 50 KB of markup per call. |
| `default_timeout_seconds` | Number | no | `30` | Default timeout in seconds. |
| `default_max_content_length` | Number | no | `50000` | Default maximum content length. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Web Scraper Tool (Jina)

Resource · in the catalogue: AI > Tools > Scrappers · type `ai.tools.web.scraper.jina`

Exposes the Jina Reader web scraper to AI agents as a callable tool.

**When to use it.** To let an agent read a web page from its address through the Jina Reader service, which returns the page as clean text. Needs no account, but the page address is sent to Jina: for a page the Direct scraper reads well, prefer Direct.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `default_render_javascript` | Boolean | no | `false` | Default JavaScript rendering behavior. |
| `default_extract_markdown` | Boolean | no | `true` | Default markdown extraction behavior. |
| `default_extract_metadata` | Boolean | no | `true` | Default metadata extraction behavior. |
| `default_include_html` | Boolean | no | `false` | Return the page's raw HTML to the agent as well. Off by default: the cleaned markdown and structured data hold what the agent needs, and raw HTML can fill its context with up to 50 KB of markup per call. |
| `default_timeout_seconds` | Number | no | `30` | Default timeout in seconds. |
| `default_max_content_length` | Number | no | `50000` | Default maximum content length. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Search

AI tools for provider-based web search.

### AI Agent Web Search Tool (SearXNG)

Resource · in the catalogue: AI > Tools > Search · type `ai.tools.web.search.searxng`

Exposes SearXNG web search to AI agents as a callable tool.

**When to use it.** To let an agent search the web and get a list of results (title, address, short extract) from a SearXNG server you run yourself; its address goes in the credentials. To read the pages found, also give the agent an AI Agent Web Scraper Tool.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SearXNG credentials. Connection of type `searxng`. |
| `default_top_k` | Number | no | `5` | Default maximum number of results. |
| `default_language` | Text | no |  | Default language hint. |
| `default_site` | Text | no |  | Default site/domain filter. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Web Search Tool (SerpApi)

Resource · in the catalogue: AI > Tools > Search · type `ai.tools.web.search.serpapi`

Exposes SerpApi web search to AI agents as a callable tool.

**When to use it.** To let an agent search the web and get a list of results (title, address, short extract) through SerpApi, a paid service that needs a SerpApi API key. To read the pages found, also give the agent an AI Agent Web Scraper Tool.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SerpApi credentials. Connection of type `serpapi`. |
| `default_top_k` | Number | no | `5` | Default maximum number of results. |
| `default_language` | Text | no |  | Default language hint. |
| `default_site` | Text | no |  | Default site/domain filter. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Web Search Tool (Tavily)

Resource · in the catalogue: AI > Tools > Search · type `ai.tools.web.search.tavily`

Exposes Tavily web search to AI agents as a callable tool.

**When to use it.** To let an agent search the web and get a list of results (title, address, short extract) through Tavily, a paid service that needs a Tavily API key. To read the pages found, also give the agent an AI Agent Web Scraper Tool.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Tavily API credentials. Connection of type `tavily`. |
| `default_top_k` | Number | no | `5` | Default maximum number of results. |
| `default_language` | Text | no |  | Default language hint. |
| `default_site` | Text | no |  | Default site/domain filter. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Utils

Small AI utility tools.

### AI Agent Calculator Tool

Resource · in the catalogue: AI > Tools > Utils · type `ai.tools.utils.calculator`

Evaluates arithmetic expressions for AI agent tool calling.

**When to use it.** To let an agent get exact results for plain arithmetic (totals, percentages, prices with tax) instead of working them out itself. Not for longer logic or reshaping data: use the JavaScript Tool instead.

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Date & Time Tool

Resource · in the catalogue: AI > Tools > Utils · type `ai.tools.utils.datetime`

Returns the current date/time in UTC or local time for AI agent tool calling.

**When to use it.** To let an agent know today's date and the current time, for example to work out a deadline, a delay or the age of a request. Give it to any agent that has to reason about dates.

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Weather Tool

Resource · in the catalogue: AI > Tools > Utils · type `ai.tools.utils.weather`

Retrieves the current weather for a location using the free Open-Meteo API.

**When to use it.** To let an agent check the weather right now in a city, for example to suggest activities on a trip. It gives the current weather only, not a forecast, and needs no account.

**Effects.** reads outside.

**Plugs into** a place that accepts `ai.node.tool.*`.
