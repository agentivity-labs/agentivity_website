---
title: "Node reference: every step and resource"
description: "The list of the 109 nodes of the Node Catalog, and how to read the reference of a node: fields, outputs, exits, effects."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-12 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The Node Catalog of the Studio holds 109 nodes. This reference lists each one with its fields, its outputs and its exits. It is read from the product itself.

## How to read a node

| Part | What it means |
|---|---|
| **Step**, **Resource**, **Display step** | A step runs in the order of the links. A resource does not run by itself: you plug it into a step. A display step shows a value on the canvas. |
| **type** | The technical name of the node. You see it in an exported Template. |
| **Fields** | What you fill in, in the window of the node. **Name** is the technical name of the field. In the Studio, the label of a field is the text of the column **What it is**. |
| **Outputs** | What the node produces. You use an output in a later step by its reference: the node name of the step, a dot, the name of the output, between two pairs of curly braces. |
| **Entries**, **Exits** | The dots on the left and on the right of a step, where the links go. |
| **Places for resources** | The places under a step where you plug resources. |
| **Plugs into** | For a resource: the kind of place it fits. A place accepts a resource when the kinds match. A star at the end of a kind means "any ending". |
| **Effects** | What the node does besides computing its outputs. A node with no effect listed has none declared. |

In this reference, a reference inside a description or a default value is printed without its curly braces.

## The effects

| Effect | What it means |
|---|---|
| reads outside | It reads from outside Agentivity: the web, a service, a mailbox. It changes nothing there, but it needs the network. |
| writes in the workspace | It writes inside the workspace: a Data Table, a stored file, a session. |
| changes something outside | It changes something outside Agentivity: it publishes a post, writes in a database, uploads a file. |
| sends a message | It sends a message to a person or a system. This cannot be taken back. |
| costs | It spends money or quota at a provider: a model call, an image, a search. |
| runs other things | It runs an agent, a team or a workflow, and so does whatever they do. |

## The pages

| Page | Nodes |
|---|---|
| [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) | 16 |
| [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) | 24 |
| [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) | 15 |
| [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) | 21 |
| [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) | 20 |
| [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) | 13 |

## Every node, by name

| Node | Kind | Type | Page |
|---|---|---|---|
| Add Block | Step | `layout.add_block` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| AI Agent | Step | `ai.node` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| AI Agent Calculator Tool | Resource | `ai.tools.utils.calculator` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Data Table Tool | Resource | `ai.tools.data.datatable` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Date & Time Tool | Resource | `ai.tools.utils.datetime` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Email Tool | Resource | `ai.tools.communication.email` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Guardrail | Resource | `ai.guardrails.keyword` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| AI Agent JavaScript Tool | Resource | `ai.tools.code_javascript` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Read Document Tool | Resource | `ai.tools.documents.read` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Session (File) | Resource | `ai.sessions.file` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| AI Agent Session (Memory) | Resource | `ai.sessions.memory` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| AI Agent Weather Tool | Resource | `ai.tools.utils.weather` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Agent Web Fetch Tool | Resource | `ai.tools.webfetch` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Image Generator | Step | `ai.media.ai_image_gen` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| AI Knowledge - SearXNG | Resource | `ai.knowledge.search.searxng` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge - SerpApi | Resource | `ai.knowledge.search.serpapi` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge - Tavily | Resource | `ai.knowledge.search.tavily` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (API) | Resource | `ai.knowledge.api` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (File) | Resource | `ai.knowledge.file` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (Inline) | Resource | `ai.knowledge.inline` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (PostgreSQL) | Resource | `ai.knowledge.postgres` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (RSS/Atom) | Resource | `ai.knowledge.rss` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (Sitemap) | Resource | `ai.knowledge.sitemap` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (SQLite) | Resource | `ai.knowledge.sqlite` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (Storage) | Resource | `ai.knowledge.storage` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Knowledge (Web) | Resource | `ai.knowledge.web` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| AI Semantic Guardrail | Resource | `ai.guardrails.moderation` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| AI Tool - Web Scraper - Direct | Resource | `ai.tools.web.scraper.direct` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Tool - Web Scraper - Firecrawl | Resource | `ai.tools.web.scraper.firecrawl` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Tool - Web Scraper - Jina | Resource | `ai.tools.web.scraper.jina` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Tool - Web Search - SearXNG | Resource | `ai.tools.web.search.searxng` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Tool - Web Search - SerpApi | Resource | `ai.tools.web.search.serpapi` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| AI Tool - Web Search - Tavily | Resource | `ai.tools.web.search.tavily` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| ai.policies.layer | Resource | `ai.policies.layer` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Anthropic Model | Resource | `ai.llm.model.anthropic` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Audio Player | Display step | `core.display.audio` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| AWS Bedrock Model | Resource | `ai.llm.model.bedrock` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Chat Channel | Resource | `ai.interactions.chat` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Cohere Rerank | Step | `ai.rerank.cohere` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| Collect | Step | `core.collect` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Composable | Step | `composable_node` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Console | Display step | `core.display.console` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Content Generator | Step | `content.content_generator` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Data Table | Resource | `workspace.datatable` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| DataTable | Step | `core.datatable` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| DeepSeek Model | Resource | `ai.llm.model.deepseek` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Direct Scraper | Resource | `web.scraper.direct` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| DSL to Elementor | Step | `content.layoutadapters.dsl_to_elementor` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| DSL to Email HTML | Step | `content.layoutadapters.dsl_to_email_html` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| DSL to HTML | Step | `content.layoutadapters.dsl_to_html` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| DSL to Markdown | Step | `content.layoutadapters.dsl_to_markdown` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Email Channel | Resource | `ai.interactions.email` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Extract Document Text | Step | `document.extract_text` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| File Exists | Step | `core.file.exists` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| File Is Fresh | Step | `core.file.is_fresh` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| File Storage | Resource | `storage.file` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Firecrawl Scraper | Resource | `web.scraper.firecrawl` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| First Of | Step | `core.firstof` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| For Each | Step | `core.foreach` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Form Interaction | Step | `interaction.form` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Forms Channel | Resource | `ai.interactions.forms` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Get Email | Step | `communication.email.get` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Google Gemini Model | Resource | `ai.llm.model.gemini` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Human Interaction | Step | `interaction.human` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| If | Step | `core.if` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Image Gen Model | Resource | `imagegen.model` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Image Viewer | Display step | `core.display.image` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Internal Link Suggester | Step | `seo.links.suggest` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| JavaScript | Step | `core.code.javascript` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Jina Reader Scraper | Resource | `web.scraper.jina` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Library Agent | Step | `agentic_node` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| LLM Prompt | Step | `ai.llm.prompt` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Local Embeddings | Resource | `ai.embeddings.local` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| MCP Server | Resource | `ai.tools.mcp.server` | [AI nodes: the tools you give to an agent](/docs/reference/nodes-ai-tools/) |
| Merge | Step | `core.merge` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Move Block | Step | `layout.move_block` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| OpenAI Embeddings | Resource | `ai.embeddings.openai` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| OpenAI Memory | Resource | `ai.memory.openai` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| OpenAI Model | Resource | `ai.llm.model.openai` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| pgvector Memory | Resource | `ai.memory.pgvector` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| Pinecone Memory | Resource | `ai.memory.pinecone` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| Publish Media to WordPress | Step | `app.cms.wordpress.publish_media` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Publish to WordPress | Step | `wordpress.publish` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Qdrant Memory | Resource | `ai.memory.qdrant` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| Read Emails | Step | `communication.email.read` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Remove Block | Step | `layout.remove_block` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Replace Block | Step | `layout.replace_block` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Run Workflow | Step | `workflow.run` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Scrape Web Page | Step | `web.scrape` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Send Email | Step | `communication.email.send` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Set Variables | Step | `core.set` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Simple LLM Memory | Resource | `ai.memory.simple` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| Sitemap Analyzer | Step | `seo.sitemap.analyze` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Sitemap Structure | Step | `seo.sitemap.structure` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Slack Channel | Resource | `ai.interactions.slack` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Speech to Text | Step | `ai.media.speech_to_text` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Storage Delete | Step | `storage.delete` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Storage Read | Step | `storage.read` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Storage Write | Step | `storage.write` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Supabase Storage | Resource | `storage.database.supabase` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Switch | Step | `core.switch` | [Core nodes: conditions, loops, data and code](/docs/reference/nodes-core/) |
| Team | Step | `team_node` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Text Splitter | Resource | `ai.knowledge.splitter` | [AI nodes: knowledge, memory and embeddings](/docs/reference/nodes-ai-knowledge-and-memory/) |
| Text to Speech | Step | `ai.media.text_to_speech` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
| Update Emails | Step | `communication.email.update` | [People, messages, storage and application nodes](/docs/reference/nodes-people-messages-and-storage/) |
| Web Search - SearXNG | Resource | `web.search.searxng` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Web Search - SerpApi | Resource | `web.search.serpapi` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| Web Search - Tavily | Resource | `web.search.tavily` | [Content, web, SEO and document nodes](/docs/reference/nodes-content-and-web/) |
| xAI / Grok Model | Resource | `ai.llm.model.xai` | [AI nodes: agents, models, sessions and channels](/docs/reference/nodes-ai-agents-and-models/) |
