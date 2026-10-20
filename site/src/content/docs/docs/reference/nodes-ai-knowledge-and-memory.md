---
title: "AI nodes: knowledge, Vector Stores and embeddings"
description: "Reference of the Knowledge Base step, the Vector Stores and the Vector Store step, the embeddings and the rerank nodes."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-ai-knowledge-and-memory.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-20 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The step that gives an agent its Knowledge Bases, the Vector Stores that keep texts and find them by meaning, and the embeddings they use.

This page lists 9 nodes. [How to read a node reference](/docs/reference/nodes/).

## AI > Knowledge

The Knowledge Bases an agent or an LLM Prompt searches.

### Knowledge Base

Resource · in the catalogue: AI > Knowledge · type `ai.knowledge.base`

Searches a Knowledge Base of the workspace: the passages closest to a question, with the document each comes from.

**When to use it.** To let an AI Agent find what your documents, pages or feeds say (policies, guides, articles, manuals): plug it into the agent's Knowledge port and choose the base; the agent searches it whenever it needs to. For facts kept in rows (prices, stock, orders), use a Data Table tool instead; to remember the conversation, an AI Agent Session.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `knowledge_base_id` | AssetRef | yes |  | The Knowledge Base it searches. |
| `results` | Number | no | `5` | Most passages given for one search. |

**Plugs into** a place that accepts `ai.knowledge.*`.

## AI > Vector Stores

Texts kept with their vectors, found again by meaning.

### In-Memory Vector Store

Resource · in the catalogue: AI > Vector Stores · type `ai.vectorstore.inmemory`

Texts kept with their vectors for the time of one run, and found again by meaning; free, with no account.

**When to use it.** To keep texts while a run lasts and find them again by meaning, for free: what a step inserts, a later step or an agent of the same run finds. Nothing is kept after the run: to keep texts from one run to the next, use Qdrant, Pinecone or pgvector. For what an agent should know (documents, pages, feeds), use a Knowledge Base instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `memory_key` | Text | no | `default` | Names the collection: the steps of a run that use the same key share the same texts. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `ai.vectorstore.*`.

### pgvector Vector Store

Resource · in the catalogue: AI > Vector Stores · type `ai.vectorstore.pgvector`

Texts kept with their vectors in PostgreSQL (pgvector extension), and found again by meaning.

**When to use it.** To keep texts in your PostgreSQL database (with the pgvector extension) and find them again by meaning, from one run to the next. Needs a PostgreSQL connection string; the table is created at the first insert. For what an agent should know (documents, pages, feeds), use a Knowledge Base instead.

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `connection_string` | Text | yes |  | PostgreSQL connection string (the database must have the pgvector extension available). |
| `table_name` | Text | no | `agentivity_vectors` | Table name (created at the first insert). Letters, digits, underscore only. |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `ai.vectorstore.*`.

### Pinecone Vector Store

Resource · in the catalogue: AI > Vector Stores · type `ai.vectorstore.pinecone`

Texts kept with their vectors in a Pinecone index, and found again by meaning.

**When to use it.** To keep texts in your Pinecone index and find them again by meaning, from one run to the next. Needs your Pinecone connection and an index whose size matches the Embeddings model; for a free option without any account, use In-Memory Vector Store. For what an agent should know (documents, pages, feeds), use a Knowledge Base instead.

**Effects.** reads outside, changes something outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `pinecone_credentials` | Credentials | yes |  | Pinecone index connection. Connection of type `pinecone`. |
| `namespace` | Text | no |  | Pinecone namespace: the collection within the index (leave empty for the default namespace). |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `ai.vectorstore.*`.

### Qdrant Vector Store

Resource · in the catalogue: AI > Vector Stores · type `ai.vectorstore.qdrant`

Texts kept with their vectors in a Qdrant database, and found again by meaning.

**When to use it.** To keep texts in your Qdrant database and find them again by meaning, from one run to the next. Needs your Qdrant connection; the collection is created at the first insert. For what an agent should know (documents, pages, feeds), use a Knowledge Base instead.

**Effects.** reads outside, changes something outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `qdrant_credentials` | Credentials | yes |  | Qdrant instance connection. Connection of type `qdrant`. |
| `collection_name` | Text | no | `agentivity` | Qdrant collection name (created at the first insert). |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Embeddings** | no | `ai.embeddings.*` | 1 |

**Plugs into** a place that accepts `ai.vectorstore.*`.

### Vector Store

Step · in the catalogue: AI > Vector Stores · type `ai.vectorstore.step`

Inserts texts in the connected Vector Store, finds the closest to a question, or deletes texts by id.

**When to use it.** To keep texts during a workflow and find them again by meaning: insert product sheets, notes or answers, then find the closest to a question in a later step. Connect a Vector Store (In-Memory is free and lasts one run). For what an agent should know (documents, pages, feeds), use a Knowledge Base instead.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `operation` | Choice | yes | `get_many` | What to do. Choices: `insert_documents`, `get_many`, `delete_documents`. |
| `documents` | Text | no |  | Insert Documents: one text, a JSON list of texts, or a JSON list of { "text": "...", "metadata": { ... }, "id": "..." }. A text inserted again with the same id replaces it. |
| `metadata` | Text | no |  | Insert Documents: what is said of every text, as a JSON object (e.g. { "source": "catalog" }). |
| `split_long_texts` | Boolean | no | `false` | Insert Documents: split long texts into passages, each found on its own. |
| `clear_first` | Boolean | no | `false` | Insert Documents: empty the collection before inserting. |
| `query` | Text | no |  | Get Many: the question to find the closest texts to. |
| `limit` | Number | no | `4` | Get Many: the most texts to give. |
| `metadata_filter` | Text | no |  | Get Many: only the texts whose metadata has every value of this JSON object (e.g. { "kind": "laptop" }). |
| `ids` | Text | no |  | Delete Documents: the ids to delete, as a JSON list or separated by commas. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `documents` | Structured | Get Many: the texts found, the closest first — each with its id, text, score (the higher, the closer) and metadata |
| `count` | Number | Get Many: how many texts were found |
| `inserted` | Number | Insert Documents: how many texts were inserted |
| `ids` | TextList | Insert Documents: the ids of the texts inserted |
| `deleted` | Number | Delete Documents: how many ids were deleted |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Vector Store** | yes | `ai.vectorstore.*` | 1 |

## AI > Embeddings

Text-to-vector models — plug into the Embeddings port of a vector store or of a step that compares texts by meaning.

### Local Embeddings

Resource · in the catalogue: AI > Embeddings · type `ai.embeddings.local`

Free, offline embeddings (all-MiniLM-L6-v2) — no credentials, no external API calls.

**When to use it.** To compare texts by meaning for free, offline: plug it into the Embeddings port of a vector store or of an SEO step (Sitemap Structure, Internal Link Suggester). Vector stores already use this model when nothing else is set.

**Plugs into** a place that accepts `ai.embeddings.*`.

### OpenAI Embeddings

Resource · in the catalogue: AI > Embeddings · type `ai.embeddings.openai`

Embeddings via the OpenAI API — usable standalone or plugged into any vector store's "embeddings" input.

**When to use it.** To compare texts by meaning with an OpenAI model instead of the free local one: plug it into the Embeddings port of a vector store or of an SEO step (Sitemap Structure, Internal Link Suggester).

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
