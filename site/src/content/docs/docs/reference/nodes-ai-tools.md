---
title: "AI nodes: the tools you give to an agent"
description: "Reference of the tools you can plug into an AI agent: Data Table, calculator, date, documents, e-mail, web search, web scraper and more."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-ai-tools.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-14 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The tools an agent can call. Each one is a resource that you plug into the place for tools of an AI Agent.

This page lists 15 nodes. [How to read a node reference](/docs/reference/nodes/).

## AI > Tools

AI-callable tools and tool gateways.

### AI Agent JavaScript Tool

Resource · in the catalogue: AI > Tools · type `ai.tools.code_javascript`

Lets an AI agent run a JavaScript snippet (real, sandboxed Node.js) and use the result.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `timeout_seconds` | Number | no | `5` | Execution timeout per call, in seconds. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Web Fetch Tool

Resource · in the catalogue: AI > Tools · type `ai.tools.webfetch`

Fetches a web resource over HTTP(S) and returns normalized HTML, JSON, or text content for AI agents.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Plugs into** a place that accepts `ai.node.tool.*`.

### MCP Server

Resource · in the catalogue: AI > Tools · type `ai.tools.mcp.server`

Connects AI agents to a remote MCP server over HTTP.

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

## No named category: ai.tools.data

### AI Agent Data Table Tool

Resource · in the catalogue: no named category · type `ai.tools.data.datatable`

Exposes CRUD on a shared Data Table asset as LLM-callable tools.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `table_id` | AssetRef | yes |  | The shared Data Table asset this tool reads and writes. |
| `tool_name_prefix` | Text | no | `datatable` | Prefix for this instance's tool names, e.g. "trips" → trips_select, trips_insert, trips_update, trips_delete, trips_find. Required whenever an agent has more than one Data Table tool connected — tool names must be unique per agent. |
| `allow_read` | Boolean | no | `true` | Expose reading rows (select/find) to the agent. |
| `allow_insert` | Boolean | no | `true` | Expose inserting new rows to the agent. |
| `allow_update` | Boolean | no | `true` | Expose updating existing rows to the agent. |
| `allow_delete` | Boolean | no | `true` | Expose deleting rows to the agent. |

**Plugs into** a place that accepts `ai.node.tool.*`.

## No named category: ai.tools.documents

### AI Agent Read Document Tool

Resource · in the catalogue: no named category · type `ai.tools.documents.read`

Lets an AI agent read a document the user uploaded in the chat (PDF, Word, plain text) as Markdown.

**Plugs into** a place that accepts `ai.node.tool.*`.

## AI > Tools > Scrappers

AI tools for provider-based web scraping.

### AI Tool - Web Scraper - Direct

Resource · in the catalogue: AI > Tools > Scrappers · type `ai.tools.web.scraper.direct`

Exposes the direct web scraper to AI agents as a callable tool.

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

## AI > Tools > Utils

Small AI utility tools.

### AI Agent Calculator Tool

Resource · in the catalogue: AI > Tools > Utils · type `ai.tools.utils.calculator`

Evaluates arithmetic expressions for AI agent tool calling.

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Date & Time Tool

Resource · in the catalogue: AI > Tools > Utils · type `ai.tools.utils.datetime`

Returns the current date/time in UTC or local time for AI agent tool calling.

**Plugs into** a place that accepts `ai.node.tool.*`.

### AI Agent Weather Tool

Resource · in the catalogue: AI > Tools > Utils · type `ai.tools.utils.weather`

Retrieves the current weather for a location using the free Open-Meteo API.

**Effects.** reads outside.

**Plugs into** a place that accepts `ai.node.tool.*`.

## No named category: ai.tools.web.search

### AI Tool - Web Search - SearXNG

Resource · in the catalogue: no named category · type `ai.tools.web.search.searxng`

Exposes SearXNG web search to AI agents as a callable tool.

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

Resource · in the catalogue: no named category · type `ai.tools.web.search.serpapi`

Exposes SerpApi web search to AI agents as a callable tool.

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

Resource · in the catalogue: no named category · type `ai.tools.web.search.tavily`

Exposes Tavily web search to AI agents as a callable tool.

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
