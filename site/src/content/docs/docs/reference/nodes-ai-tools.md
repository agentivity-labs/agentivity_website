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

This page lists 17 nodes. [How to read a node reference](/docs/reference/nodes/).

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
