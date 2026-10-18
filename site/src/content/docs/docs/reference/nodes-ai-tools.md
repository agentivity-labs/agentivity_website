---
title: "AI nodes: the tools you give to an agent"
description: "Reference of the tools you can plug into an AI agent: Data Table, calculator, date, documents, e-mail, web search, web scraper and more."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-ai-tools.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-18 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The tools an agent can call. Each one is a resource that you plug into the place for tools of an AI Agent.

This page lists 15 nodes. [How to read a node reference](/docs/reference/nodes/).

## AI > Tools

AI-callable tools and tool gateways.

### AI Agent JavaScript Tool

Resource · in the catalogue: AI > Tools · type `ai.tools.code_javascript`

Lets an AI agent run a JavaScript snippet (real, sandboxed Node.js) and use the result.

**When to use it.** To let an agent write and run a small piece of JavaScript for exact calculations or reshaping data (sorting, filtering, converting a list). The code cannot reach files or the internet: to read a web page, use the Web Fetch Tool instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `timeout_seconds` | Number | no | `5` | Execution timeout per call, in seconds. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Web Fetch Tool

Resource · in the catalogue: AI > Tools · type `ai.tools.webfetch`

Fetches a web resource over HTTP(S) and returns normalized HTML, JSON, or text content for AI agents.

**When to use it.** To let an agent open a web address it already has and read what is there: a page as plain text, or the data a JSON API returns. Not for finding pages: use a Web Search tool instead.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

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

## AI > Tools > Communication

AI tools that read and send messages (e-mail).

### AI Agent Email Tool

Resource · in the catalogue: AI > Tools > Communication · type `ai.tools.communication.email`

Gives an agent a mailbox: search and read e-mails (IMAP), answer or write e-mails (SMTP), and mark or file what it handled. What it may do, and who it may write to, is set on the node.

**When to use it.** For an agent that works from a mailbox: a support desk answering requests, an assistant sorting what arrived, an agent that sends its result by e-mail. Give only the permissions the job needs.

**Effects.** reads outside, changes something outside, sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `inbox` | Credentials | no |  | The mailbox the agent reads (IMAP connection). Needed for reading, answering and filing. Connection of type `imap`. |
| `outbox` | Credentials | no |  | The connection the agent sends with (SMTP). Needed for answering and writing. Connection of type `smtp`. |
| `folder` | Text | no | `INBOX` | The folder the agent works in. |
| `tool_name_prefix` | Text | no | `email` | Prefix for this instance's tool names, e.g. "support" → support_search, support_read, support_reply, support_send, support_update. Required when an agent has more than one Email tool connected: tool names must be unique per agent. |
| `allow_read` | Boolean | no | `true` | Let the agent search and read e-mails. |
| `allow_send` | Boolean | no | `true` | Let the agent send e-mails (answers and new ones). |
| `allow_update` | Boolean | no | `true` | Let the agent mark e-mails as read, flag them or move them to a folder. |
| `allowed_recipients` | Text | no |  | Who the agent may write to: addresses or domains separated by commas (anna@shop.com, @shop.com). Empty = anyone. An answer to an e-mail it read is always allowed. |
| `max_body_chars` | Number | no | `12000` | The most characters of an e-mail's text handed to the agent. |

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Data

AI tools that read and write Data Tables.

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

## AI > Tools > Documents

AI tools that read documents (PDF, Word, text).

### AI Agent Read Document Tool

Resource · in the catalogue: AI > Tools > Documents · type `ai.tools.documents.read`

Lets an AI agent read a document the user uploaded in the chat (PDF, Word, plain text) as Markdown.

**When to use it.** To let an agent read a file the user drops in the chat (PDF, Word or plain text) and work from its content: a contract to summarize, a CV to screen, an invoice to check. A scanned page with no text in it cannot be read.

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Scrappers

AI tools for provider-based web scraping.

### AI Tool - Web Scraper - Direct

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

### AI Tool - Web Scraper - Firecrawl

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

### AI Tool - Web Scraper - Jina

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

### AI Tool - Web Search - SearXNG

Resource · in the catalogue: AI > Tools > Search · type `ai.tools.web.search.searxng`

Exposes SearXNG web search to AI agents as a callable tool.

**When to use it.** To let an agent search the web and get a list of results (title, address, short extract) from a SearXNG server you run yourself; its address goes in the credentials. To read the pages found, also give the agent a Web Scraper tool.

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

### AI Tool - Web Search - SerpApi

Resource · in the catalogue: AI > Tools > Search · type `ai.tools.web.search.serpapi`

Exposes SerpApi web search to AI agents as a callable tool.

**When to use it.** To let an agent search the web and get a list of results (title, address, short extract) through SerpApi, a paid service that needs a SerpApi API key. To read the pages found, also give the agent a Web Scraper tool.

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

### AI Tool - Web Search - Tavily

Resource · in the catalogue: AI > Tools > Search · type `ai.tools.web.search.tavily`

Exposes Tavily web search to AI agents as a callable tool.

**When to use it.** To let an agent search the web and get a list of results (title, address, short extract) through Tavily, a paid service that needs a Tavily API key. To read the pages found, also give the agent a Web Scraper tool.

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
