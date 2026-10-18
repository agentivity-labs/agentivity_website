---
title: "AI nodes: knowledge, memory and embeddings"
description: "Reference of the knowledge sources, memory resources, embeddings and rerank nodes that give an AI agent documents to work from."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-ai-knowledge-and-memory.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-18 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The resources that give an agent something to read: knowledge sources, and the memory that ranks them.

This page lists 21 nodes. [How to read a node reference](/docs/reference/nodes/).

## AI > Knowledge

Connectable knowledge corpus resources.

### AI Knowledge - SearXNG

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.search.searxng`

Builds a knowledge corpus from a SearXNG search and scrapes the returned URLs.

**When to use it.** To give an AI Agent the pages found by a search on your SearXNG instance, for a query you set, read in full. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory; to let the agent search by itself, use a web search tool instead.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SearXNG credentials. Connection of type `searxng`. |
| `query` | Text | yes |  | Search query used to discover the knowledge URLs. |
| `top_k` | Number | no | `5` | Maximum number of search results to scrape. |
| `language` | Text | no |  | Optional language hint passed to the search provider. |
| `site` | Text | no |  | Optional site/domain filter passed to the search provider. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile for search requests. Choices: `none`, `fast`, `medium`, `slow`. |
| `timeout_seconds` | Number | no | `30` | Maximum time allowed for each scraped result URL. |
| `max_content_length` | Number | no | `50000` | Maximum amount of content kept from each scraped URL. |
| `extract_metadata` | Boolean | no | `true` | Extract page metadata when supported by the scraper. |
| `render_javascript` | Boolean | no | `false` | Enable JavaScript rendering when supported by the connected scraper. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Web Scraper** | no | `web.scraper.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge - SerpApi

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.search.serpapi`

Builds a knowledge corpus from SerpApi search results and scrapes the returned URLs.

**When to use it.** To give an AI Agent the pages found by a SerpApi search, for a query you set, read in full. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory; to let the agent search by itself, use a web search tool instead.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SerpApi credentials. Connection of type `serpapi`. |
| `query` | Text | yes |  | Search query used to discover the knowledge URLs. |
| `top_k` | Number | no | `5` | Maximum number of search results to scrape. |
| `language` | Text | no |  | Optional language hint passed to the search provider. |
| `site` | Text | no |  | Optional site/domain filter passed to the search provider. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile for search requests. Choices: `none`, `fast`, `medium`, `slow`. |
| `timeout_seconds` | Number | no | `30` | Maximum time allowed for each scraped result URL. |
| `max_content_length` | Number | no | `50000` | Maximum amount of content kept from each scraped URL. |
| `extract_metadata` | Boolean | no | `true` | Extract page metadata when supported by the scraper. |
| `render_javascript` | Boolean | no | `false` | Enable JavaScript rendering when supported by the connected scraper. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Web Scraper** | no | `web.scraper.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge - Tavily

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.search.tavily`

Builds a knowledge corpus from Tavily search results and scrapes the returned URLs.

**When to use it.** To give an AI Agent the pages found by a Tavily search, for a query you set, read in full. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory; to let the agent search by itself, use a web search tool instead.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Tavily API credentials. Connection of type `tavily`. |
| `query` | Text | yes |  | Search query used to discover the knowledge URLs. |
| `top_k` | Number | no | `5` | Maximum number of search results to scrape. |
| `language` | Text | no |  | Optional language hint passed to the search provider. |
| `site` | Text | no |  | Optional site/domain filter passed to the search provider. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile for search requests. Choices: `none`, `fast`, `medium`, `slow`. |
| `timeout_seconds` | Number | no | `30` | Maximum time allowed for each scraped result URL. |
| `max_content_length` | Number | no | `50000` | Maximum amount of content kept from each scraped URL. |
| `extract_metadata` | Boolean | no | `true` | Extract page metadata when supported by the scraper. |
| `render_javascript` | Boolean | no | `false` | Enable JavaScript rendering when supported by the connected scraper. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Web Scraper** | no | `web.scraper.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (API)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.api`

Loads a knowledge corpus from an HTTP endpoint with explicit text or JSON mapping modes.

**When to use it.** To give an AI Agent reference content read from a web address that returns text or JSON, such as one of your own services. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `url` | Text | yes |  | HTTP endpoint URL returning the knowledge payload. |
| `headers_json` | Text | no | `{}` | Optional extra HTTP headers as a JSON object. |
| `response_mode` | Choice | no | `text` | How the HTTP response is converted to knowledge documents. Choices: `text`, `json-value`, `json-array`. |
| `selector` | Text | no |  | Optional dot-path selector used for JSON modes (for example: data.items or data.summary). |
| `item_text_field` | Text | no | `text` | Field containing the document text for `json-array` object items. |
| `timeout_seconds` | Number | no | `30` | HTTP timeout in seconds. |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (File)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.file`

Loads a knowledge corpus from a file or a directory pattern and exposes normalized documents for AI consumers.

**When to use it.** To give an AI Agent reference content from text files on the server (plain text, Markdown, HTML, JSON): one file or a whole folder. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `path` | Text | yes |  | Absolute or relative file path, or a directory path to scan for knowledge files. |
| `pattern` | Text | no | `*` | Search pattern used when 'path' points to a directory. |
| `include_patterns` | Text | no |  | Optional additional directory patterns separated by commas, semicolons, or new lines. |
| `recursive` | Boolean | no | `false` | When enabled, scans subdirectories when 'path' points to a directory. |
| `json_selector` | Text | no |  | Optional selector used when reading JSON files (for example: items[0].content). |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (Inline)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.inline`

Provides an inline knowledge corpus as normalized documents for AI consumers.

**When to use it.** To give an AI Agent a few reference texts typed directly in the step, as a JSON list such as [{"text": "...", "metadata": {"source": "..."}}]. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `documents` | Text | no | `[]` | Knowledge documents as JSON array of {text, metadata}. |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (PostgreSQL)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.postgres`

Loads a knowledge corpus from PostgreSQL-compatible databases by executing an explicit query and mapping rows to normalized documents.

**When to use it.** To give an AI Agent reference content stored in a PostgreSQL database: an SQL query returns one row per document, with its text in one column. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `connection_string` | Text | yes |  | PostgreSQL connection string for this knowledge source. |
| `query` | Text | yes |  | SQL query returning one row per knowledge document. |
| `content_column` | Text | no | `content` | Column containing the document text. |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (RSS/Atom)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.rss`

Loads a knowledge corpus from an RSS or Atom feed and maps entries to normalized documents.

**When to use it.** To give an AI Agent the latest entries of a news feed or a blog (RSS or Atom). Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `feed_url` | Text | yes |  | RSS or Atom feed URL. |
| `headers_json` | Text | no | `{}` | Optional extra HTTP headers as a JSON object. |
| `max_items` | Number | no | `20` | Maximum number of feed items to load. |
| `timeout_seconds` | Number | no | `30` | HTTP timeout in seconds. |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (Sitemap)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.sitemap`

Loads a knowledge corpus from a sitemap and scrapes the listed pages into normalized documents.

**When to use it.** To give an AI Agent the content of a whole website, page by page, from the address of its sitemap. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory; for a few pages only, use AI Knowledge (Web).

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `sitemap_url` | Text | yes |  | Sitemap URL to expand. |
| `headers_json` | Text | no | `{}` | Optional extra HTTP headers as a JSON object for sitemap fetches. |
| `max_urls` | Number | no | `50` | Maximum number of page URLs loaded from the sitemap. |
| `timeout_seconds` | Number | no | `30` | Maximum time allowed for sitemap and page fetches. |
| `max_content_length` | Number | no | `50000` | Maximum amount of content kept from each page. |
| `extract_metadata` | Boolean | no | `true` | Extract page metadata when supported by the scraper. |
| `render_javascript` | Boolean | no | `false` | Enable JavaScript rendering when supported by the connected scraper. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Web Scraper** | no | `web.scraper.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (SQLite)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.sqlite`

Loads a knowledge corpus from a SQLite file by executing an explicit query and mapping rows to normalized documents.

**When to use it.** To give an AI Agent reference content stored in a SQLite database file: an SQL query returns one row per document, with its text in one column. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `database_path` | Text | yes |  | Absolute or relative path to the SQLite database file. |
| `query` | Text | yes |  | SQL query returning one row per knowledge document. |
| `content_column` | Text | no | `content` | Column containing the document text. |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (Storage)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.storage`

Loads a knowledge corpus from an existing storage resource and exposes normalized documents for AI consumers.

**When to use it.** To give an AI Agent documents already kept in a storage plugged into this step, chosen by a name pattern. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `pattern` | Text | no | `*` | Storage key pattern used to select documents. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Storage** | yes | `storage.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

### AI Knowledge (Web)

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.web`

Loads a knowledge corpus from one or more URLs and exposes normalized documents for AI consumers.

**When to use it.** To give an AI Agent the content of a few web pages you list, one address per line. Plug it into the Knowledge Sources of an AI Agent or LLM Prompt that also has a memory; for a whole website, use AI Knowledge (Sitemap).

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `urls` | Text | yes |  | One URL per line. |
| `timeout_seconds` | Number | no | `30` | Maximum time allowed for each URL. |
| `max_content_length` | Number | no | `50000` | Maximum amount of content kept from each URL. |
| `extract_metadata` | Boolean | no | `true` | Extract page metadata when supported by the scraper. |
| `render_javascript` | Boolean | no | `false` | Enable JavaScript rendering when supported by the connected scraper. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Web Scraper** | no | `web.scraper.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

### Text Splitter

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.splitter`

Splits an upstream knowledge source's documents into smaller chunks, sized for embedding/vector-store use.

**When to use it.** To cut the long documents of a knowledge source into smaller passages, so that a memory finds the precise part that answers. Put it between the knowledge source and the AI Agent or LLM Prompt.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `strategy` | Choice | no | `recursive_character` | Splitting strategy. Choices: `recursive_character`, `token`. |
| `chunk_size` | Number | no | `1000` | Maximum chunk size — characters for Recursive Character, approximate tokens (words) for Token. |
| `chunk_overlap` | Number | no | `150` | Overlap between consecutive chunks, same unit as chunk size. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Source** | yes | `ai.knowledge.*` | 1 |

**Plugs into** a place that accepts `ai.knowledge.*`.

## AI > Memory

Embedding and retrieval resources.

### OpenAI Memory

Resource · in the catalogue: AI > Memory · type `ai.memory.openai`

RAG with dedicated OpenAI credentials for embeddings and vector storage.

**When to use it.** To let an AI Agent or LLM Prompt find the relevant passages of its knowledge sources, with an OpenAI model comparing texts by meaning. The documents are compared again at each run: for large or lasting collections, use Qdrant, Pinecone or pgvector Memory.

**Effects.** writes in the workspace, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | OpenAI credentials for embeddings — leave unset to fall back to the free local embedding. Connection of type `openai`. |
| `embedding_model` | Choice | no | `text-embedding-3-small` | Embedding model. Choices: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`. |
| `vector_store` | Choice | no | `local` | Vector store backend. Choices: `local`, `pinecone`, `weaviate`. |
| `namespace` | Text | no | `default` | Namespace for vector storage. |
| `max_clusters` | Number | no | `30` | Max clusters for local mode. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `llm.memory.*`.

### pgvector Memory

Resource · in the catalogue: AI > Memory · type `ai.memory.pgvector`

RAG backed by PostgreSQL's pgvector extension — persists embeddings once and queries a real ANN-ready index instead of re-ranking locally on every run.

**When to use it.** To let an AI Agent or LLM Prompt search large knowledge sources stored once in your PostgreSQL database (with the pgvector extension) and reused across runs. Needs a PostgreSQL connection string; the table is created on first use.

**Effects.** reads outside, changes something outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `embedding_credentials` | Credentials | yes |  | OpenAI credentials used to embed text — leave unset to fall back to the free local embedding. Connection of type `openai`. |
| `connection_string` | Text | yes |  | PostgreSQL connection string (must have the pgvector extension available). |
| `embedding_model` | Choice | no | `text-embedding-3-small` | Embedding model. Choices: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`. |
| `table_name` | Text | no | `agentivity_knowledge` | Table name (created automatically on first use). Letters, digits, underscore only. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `llm.memory.*`.

### Pinecone Memory

Resource · in the catalogue: AI > Memory · type `ai.memory.pinecone`

RAG backed by a real Pinecone index — persists embeddings once and queries a real ANN index instead of re-ranking locally on every run.

**When to use it.** To let an AI Agent or LLM Prompt search large knowledge sources stored once in a Pinecone index and reused across runs. Needs your Pinecone connection; for a free option without any account, use Simple LLM Memory.

**Effects.** reads outside, changes something outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `embedding_credentials` | Credentials | yes |  | OpenAI credentials used to embed text — leave unset to fall back to the free local embedding. Connection of type `openai`. |
| `pinecone_credentials` | Credentials | yes |  | Pinecone index connection. Connection of type `pinecone`. |
| `embedding_model` | Choice | no | `text-embedding-3-small` | Embedding model. Choices: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`. |
| `namespace` | Text | no |  | Pinecone namespace (leave empty for the default namespace). |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `llm.memory.*`.

### Qdrant Memory

Resource · in the catalogue: AI > Memory · type `ai.memory.qdrant`

RAG backed by a real Qdrant vector database — persists embeddings once and queries a real ANN index instead of re-ranking locally on every run.

**When to use it.** To let an AI Agent or LLM Prompt search large knowledge sources stored once in a Qdrant database and reused across runs. Needs your Qdrant connection; the collection is created on first use.

**Effects.** reads outside, changes something outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `embedding_credentials` | Credentials | yes |  | OpenAI credentials used to embed text — leave unset to fall back to the free local embedding. Connection of type `openai`. |
| `qdrant_credentials` | Credentials | yes |  | Qdrant instance connection. Connection of type `qdrant`. |
| `embedding_model` | Choice | no | `text-embedding-3-small` | Embedding model. Choices: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`. |
| `collection_name` | Text | no | `agentivity_knowledge` | Qdrant collection name (created automatically on first use). |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `llm.memory.*`.

### Simple LLM Memory

Resource · in the catalogue: AI > Memory · type `ai.memory.simple`

Enables RAG and vector clustering using a local ONNX model (no credentials needed).

**When to use it.** To let an AI Agent or LLM Prompt find, in its knowledge sources, the passages relevant to each request, for free and without any account. The documents are compared again at each run: for large or lasting collections, use Qdrant, Pinecone or pgvector Memory.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `mode` | Choice | no | `local_clustering` | Memory mode. Choices: `local_clustering`, `embedding_only`. |
| `max_clusters` | Number | no | `30` | Maximum clusters for k-means. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `llm.memory.*`.

## AI > Embeddings

Standalone text-to-vector providers — plug into any memory node's optional Embeddings port.

### Local Embeddings

Resource · in the catalogue: AI > Embeddings · type `ai.embeddings.local`

Free, offline embeddings (all-MiniLM-L6-v2) — no credentials, no external API calls.

**When to use it.** To make visible, or share between several memories, the free offline model that compares texts by meaning. Plug it into the Embeddings of a memory; memories already use this model when nothing else is set.

**Plugs into** a place that accepts `ai.embeddings.*`.

### OpenAI Embeddings

Resource · in the catalogue: AI > Embeddings · type `ai.embeddings.openai`

Embeddings via the OpenAI API — usable standalone or plugged into any vector store's "embeddings" input.

**When to use it.** To have a memory compare texts by meaning with an OpenAI model instead of the free local one, or to share the same OpenAI settings between several memories. Plug it into the Embeddings of a memory.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | OpenAI credentials used to embed text. Connection of type `openai`. |
| `embedding_model` | Choice | no | `text-embedding-3-small` | Embedding model. Choices: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`. |

**Plugs into** a place that accepts `ai.embeddings.*`.

## AI > Rerank

Re-order retrieved documents by true relevance after a vector store's initial retrieval.

### Cohere Rerank

Step · in the catalogue: AI > Rerank · type `ai.rerank.cohere`

Re-ranks documents against a query using Cohere's Rerank API — reorders a vector store's candidate results by true relevance.

**When to use it.** To put a list of texts in order of relevance to a question and keep only the best, for example the results of a search. Give the texts as a JSON list of strings, such as ["first text", "second text"]; needs a Cohere account.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Cohere API credentials. Connection of type `cohere`. |
| `model` | Choice | no | `rerank-v3.5` | Rerank model. Choices: `rerank-v3.5`, `rerank-english-v3.0`, `rerank-multilingual-v3.0`. |
| `query` | Text | yes |  | The query to rank documents against. |
| `documents` | Text | no | `[]` | JSON array of document strings to rank. |
| `top_n` | Number | no |  | Maximum number of ranked results to return (leave empty for all). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `ranked` | Text | JSON array of {text, score, original_index}, sorted by score descending |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)
