---
title: "Use Google Sheets, Calendar, Docs and the other Google steps"
description: "Read and write Google Sheets, Calendar, Docs, Drive, Slides, Forms, Contacts and Tasks from a workflow or as tools of an agent, with one Google connection."
sidebar:
  order: 10
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/workflows/use-google-sheets-and-google-calendar.md. Do not edit here: edit the source and publish again. -->

Eight steps talk to Google, with no AI model and no tokens spent: **Google Sheets**, **Google Calendar**, **Google Docs**, **Google Drive**, **Google Slides**, **Google Forms**, **Google Contacts** and **Google Tasks**. An agent can use the same operations as tools. Both use a [Google connection](/docs/guides/connect-google/).

## What you need

- A Google connection, made by signing in with Google.
- For a spreadsheet: the account of the connection can open it. If not, share it with that account in Google Sheets.

## Google Sheets

The step is in the **Nodes catalog**, in the category **Spreadsheets**. Choose the connection, then:

- **spreadsheet**: its address (`https://docs.google.com/spreadsheets/d/…`) or its ID.
- **range**: the tab, or a range in A1 notation: `Sheet1`, or `Sheet1!A1:D20`. The name of a tab depends on the language of the spreadsheet (`Sheet1`, `Feuille 1`).

| Operation | What it does |
|---|---|
| **Rows › Read** | Reads the rows of a sheet. With a header row (**header**, on by default), each row becomes a record whose fields are named by the first row. Without a header, rows come as lists. Empty cells at the end of a row come back as "". |
| **Rows › Add** | Adds rows after the last row of a sheet. **rows** are records by column name, `[{"Name": "Anna", "Score": 42}]`, or JSON rows, `[["Anna", 42]]`. They are written as a person would type them: a date stays a date and a formula is computed. |
| **Cells › Update** | Writes **values**, as JSON rows, starting at the top-left cell of the range: `[["Anna", 42], ["Ben", 17]]`. |
| **Cells › Clear** | Empties a range of cells and keeps their formatting. |
| **Spreadsheet › Read** | Reads the title of a spreadsheet and the names of its sheets. |

The step gives `result`, `count` and `has_more`. When it fails, the port **error** carries the message.

A name that is not a column is an error, never a lost value: "'Phone' is not a column of 'Sheet1'. Its columns are: …". **rows** must be all records or all JSON rows, not both. A sheet whose first row names no column refuses records: give the rows as JSON rows, or write the column names in the first row.

## Google Calendar

The step is in the category **Calendars**. Choose the connection, then **calendar**: the ID of a calendar, or nothing for the own calendar of the account.

| Operation | What it does |
|---|---|
| **Event › List** | Lists the events of a calendar between two moments, in time order. Each occurrence of a repeating event is listed on its own. **from** is now when empty, **until** ends the period, and **search** keeps the events that contain these words. |
| **Event › Read** | Reads an event, by its **event_id**. |
| **Event › Create** | Adds an event: **title**, **start**, **end**, and if you want **time_zone**, **description**, **location** and **attendees**. |
| **Event › Update** | Updates an event. What is left empty stays as it is. |
| **Event › Delete** | Deletes an event. Its guests are not notified. |

How to write the dates:

- **start** and **end**: `2026-11-12T10:00` for a time, or `2026-11-12` for an all-day event. For an all-day event, **end** is the day after the last day.
- A time with no offset is read in **time_zone**, for example `Europe/Brussels`, and in UTC when it is empty.
- **from** and **until** can be written `2026-11-12T00:00:00Z`.
- **attendees**: e-mail addresses separated by commas. Google sends them an invitation.

## Google Docs

Give the document by its address. The account of the connection must be able to open it.

| Operation | What it does |
|---|---|
| **Create** | Creates a document in the Drive of the account, empty or with a first text. |
| **Read** | Reads the title of a document and its text, tab by tab. |
| **Add text** | Adds text at the end of a document, as a new paragraph. |
| **Replace text** | Replaces every place where a text appears, to fill in a template for instance. |

## Google Drive

The step sees only the files this connection made, or that were opened with Agentivity. It never sees the rest of the Drive.

| Operation | What it does |
|---|---|
| **Upload** | Puts a file in the Drive, up to 5 MB, from a public address or from a text. It can become a Google Docs, Sheets or Slides file. |
| **List** | Lists the files and folders the connection can see, in a folder or by name. |
| **Read as text** | Reads the content of a file as text, up to 10 MB: Docs and Slides as plain text, Sheets as CSV, text files as they are. |
| **Share** | Gives a person, or anyone with the link, access to a file or a folder. |
| **Move to the bin** | Moves a file or a folder to the bin of the Drive, where it stays 30 days. |
| **Create** | Creates a folder. |

## Google Slides

Give the presentation by its address.

| Operation | What it does |
|---|---|
| **Create** | Creates a presentation, with one title slide. |
| **Read** | Reads the text of each slide. |
| **Replace text** | Replaces every place where a text appears on the slides, to fill in a template for instance. |
| **Add** | Adds a slide with a title and a text, on the layout "Title and body". |

## Google Forms

Give the form by the address of its editor.

| Operation | What it does |
|---|---|
| **Create** | Creates a form with its questions, open to answers, and gives the address to send people. |
| **Read** | Reads a form: its title, its questions and the address people answer it at. |
| **List** | Lists the answers sent to a form, each one by question title. |

## Google Contacts

| Operation | What it does |
|---|---|
| **List** | Lists the contacts of the account. |
| **Search** | Finds contacts by the start of a name, an e-mail address, a phone number or a company. Google gives at most 30. |
| **Create** | Adds a contact. |
| **Update** | Updates a contact. What is left empty stays as it is. An e-mail address or a phone number given replaces the one of the contact. |
| **Delete** | Deletes a contact. |

## Google Tasks

Without a list, the step uses the default list of the account.

| Operation | What it does |
|---|---|
| **List** | Lists the tasks of a list, those to do or all of them. |
| **Create** | Adds a task to a list, with a due day if you want. |
| **Update** | Updates a task. What is left empty stays as it is. |
| **Mark done** | Marks a task as done. |
| **Delete** | Deletes a task. |

## As tools of an agent

An agent can use the same operations as tools. See [Give tools to an agent](/docs/agents/give-tools-to-an-agent/).

## How to know it worked

In a Google Sheets step, **Spreadsheet › Read** returns the title and the tabs. In a Google Calendar step, the test of the connection says "Connected to Google as" followed by the calendar.

## If it does not work

- **"This Google connection was not allowed to use Google Sheets"** (or Google Calendar). A box was left unticked when you signed in. Open the connection in the Studio, sign in again and allow the service.
- **"The Google account of this connection has no access to it."** In Google Sheets, share the spreadsheet with that account.
- **"Google Sheets cannot find this."** Check the ID or the address.
- **"Google refused this connection."** Open it in the Studio and sign in again.
- **"… is receiving too many requests from this connection."** Try again in a few minutes.
- **"'…' is not a date or a time."** Write `2026-11-12T10:00` or `2026-11-12`.

## Next step

[Give tools to an agent](/docs/agents/give-tools-to-an-agent/).
