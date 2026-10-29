---
title: "Content, web, SEO and document nodes"
description: "Reference of the nodes that read web pages, search the web, extract text from documents, build content layouts and analyse SEO."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-content-and-web.md. Do not edit here: edit the source and publish again. -->

<!-- Written from a running server by tools/reference.mjs. Do not edit this page by hand. -->

The steps that read the web and documents, and the steps that build content.

This page lists 21 nodes. [How to read a node reference](/docs/reference/nodes/).

## Content

Content creation.

### Content Generator

Step · in the catalogue: Content · type `content.content_generator`

Generates structured DSL content from diverse sources with LLM-powered content generation and deterministic layout.

**When to use it.** To have an AI write a structured page, such as an article or a landing page, from a description, with an optional brief, SEO data and links that must all appear in the text. It needs an LLM model connected; its page layout in DSL format then goes to DSL to HTML, DSL to Markdown or DSL to Elementor.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `content_description` | Text | yes |  | Description of the content to generate (user prompt - what, why, for whom). |
| `seo_strategy` | Text | no |  | SEO strategy data (from SEO Advisor or manual). |
| `links` | Text | no |  | URLs to include (internal/external/references) - MANDATORY integration with link-first approach. |
| `content_brief` | Text | no |  | Detailed content brief with specific requirements. |
| `tone` | Text | no | `professional` | Writing tone: professional, casual, educational, conversational, etc. |
| `word_count` | Number | no | `1000` | Target word count (approximate). |
| `structure_hints` | TextList | no |  | Structure guidance: sections to include, flow suggestions. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `dsl_content` | Text | Generated content, as a page layout in DSL format (JSON) |
| `metadata` | Text | Content metadata: topics, keywords, estimated reading time |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **LLM Model** | yes | `llm.model.*` | 1 |

## Content > Layout

Layout manipulation.

### Add Block

Step · in the catalogue: Content > Layout · type `layout.add_block`

Adds one or more blocks to the layout at a specified position. Supports single block object or array of blocks.

**When to use it.** To add one or more blocks, such as a call to action or an extra section, to a page layout in DSL format, at a place named by its path (such as main). Give the block as JSON, or a JSON list of blocks.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `layout` | Text | yes |  | DSL layout JSON. |
| `target` | Text | yes |  | Target path (e.g., 'main'). |
| `position` | Choice | no | `append` | Insert position. Choices: `append`, `prepend`, `before`, `after`, `replace`. |
| `block` | Text | yes |  | Block(s) to add - single object or array of blocks (DSL JSON). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `layout` | Text | Updated DSL layout JSON |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Move Block

Step · in the catalogue: Content > Layout · type `layout.move_block`

Moves a block from source to target position in the layout.

**When to use it.** To move one block of a page layout in DSL format to another place, both named by their path (such as main.block[1] and main).

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `layout` | Text | yes |  | DSL layout JSON. |
| `source` | Text | yes |  | Source path (e.g., 'main.block[1]'). |
| `target` | Text | yes |  | Target path (e.g., 'main'). |
| `position` | Choice | no | `append` | Insert position. Choices: `append`, `prepend`, `before`, `after`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `layout` | Text | Updated DSL layout JSON |

### Remove Block

Step · in the catalogue: Content > Layout · type `layout.remove_block`

Removes a block from the layout at the specified path.

**When to use it.** To take one block out of a page layout in DSL format, named by its path (such as root.main.section[2]).

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `layout` | Text | yes |  | DSL layout JSON. |
| `target` | Text | yes |  | Target path to remove (e.g., 'root.main.section[2]'). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `layout` | Text | Updated DSL layout JSON |

### Replace Block

Step · in the catalogue: Content > Layout · type `layout.replace_block`

Replaces a block at the specified path with one or more new blocks.

**When to use it.** To swap one block of a page layout in DSL format, named by its path, for one or more new blocks given as JSON. To keep the block and add next to it, use Add Block instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `layout` | Text | yes |  | DSL layout JSON. |
| `target` | Text | yes |  | Target path to replace (e.g., 'root.main.block[1]'). |
| `block` | Text | yes |  | New block(s) - single object or array of blocks (DSL JSON). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `layout` | Text | Updated DSL layout JSON |

## Content > Layout Adapters

Layout format conversion nodes.

### DSL to Elementor

Step · in the catalogue: Content > Layout Adapters · type `content.layoutadapters.dsl_to_elementor`

Converts DSL content to Elementor-compatible format for WordPress

**When to use it.** To turn a page layout in DSL format, such as the one Content Generator gives, into an Elementor page for Publish to WordPress. To show images already uploaded, give a JSON list linking each image to its WordPress media ID.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | Page layout in DSL format (JSON), as Content Generator gives it. |
| `title` | Text | no |  | Optional page/post title. |
| `image_mappings` | Text | no |  | JSON array mapping image IDs to WordPress media IDs: [{image_id, media_id, media_url}]. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `elementor_data` | Text | Elementor-compatible JSON data |
| `metadata` | Text | Content metadata |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### DSL to Email HTML

Step · in the catalogue: Content > Layout Adapters · type `content.layoutadapters.dsl_to_email_html`

Converts DSL content to email-compatible HTML with table layout and inline styles

**When to use it.** To turn a page layout in DSL format into the HTML of an e-mail, such as a newsletter, that displays well in mail apps, in your brand colors. For a web page, use DSL to HTML instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | Page layout in DSL format (JSON), as Content Generator gives it. |
| `email_width` | Number | no | `600` | Email width in pixels (default: 600). |
| `brand_color` | Text | no | `#2563EB` | Primary brand color in hex (default: #2563EB). |
| `background_color` | Text | no | `#F3F4F6` | Background color in hex (default: #F3F4F6). |
| `text_color` | Text | no | `#1F2937` | Text color in hex (default: #1F2937). |
| `font_family` | Text | no | `Arial, Helvetica, sans-serif` | Font family (default: Arial, Helvetica, sans-serif). |
| `include_responsive` | Boolean | no | `true` | Include media queries for mobile responsive (default: true). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `email_html` | Text | Generated email-compatible HTML |
| `preview_text` | Text | Preview text (first 100 characters of content) |
| `metadata` | Text | Content metadata |

### DSL to HTML

Step · in the catalogue: Content > Layout Adapters · type `content.layoutadapters.dsl_to_html`

Converts DSL content to semantic HTML with optional CSS framework support

**When to use it.** To turn a page layout in DSL format into HTML for a web page, plain or styled for Tailwind or Bootstrap. For an e-mail, use DSL to Email HTML instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | Page layout in DSL format (JSON), as Content Generator gives it. |
| `css_framework` | Text | no | `none` | CSS framework: 'tailwind', 'bootstrap', or 'none' (default: 'none'). |
| `include_inline_styles` | Boolean | no | `false` | Include basic inline styles for spacing (default: false). |
| `wrapper_class` | Text | no |  | CSS class for the root wrapper div. |
| `generate_toc_anchors` | Boolean | no | `true` | Generate ID attributes for headings (default: true). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `html` | Text | Generated HTML content |
| `metadata` | Text | Content metadata (heading count, word count, etc.) |

### DSL to Markdown

Step · in the catalogue: Content > Layout Adapters · type `content.layoutadapters.dsl_to_markdown`

Converts DSL content to Markdown format

**When to use it.** To turn a page layout in DSL format into Markdown, for a documentation page, a README or any tool that takes Markdown. For a web page, use DSL to HTML instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | Page layout in DSL format (JSON), as Content Generator gives it. |
| `generate_toc_anchors` | Boolean | no | `true` | Generate anchor links for TOC (default: true). |
| `heading_prefix` | Text | no |  | Optional prefix for all headings (e.g., project name). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `markdown` | Text | Generated Markdown content |
| `metadata` | Text | Content metadata (heading count, word count, etc.) |

## Web

Web scraping and content extraction.

### HTTP Request

Step · in the catalogue: Web · type `http.request`

Calls a web API: GET, POST, PUT, PATCH, DELETE or HEAD, with parameters, headers and a body, and gives the status and the answer (as JSON when it is JSON).

**When to use it.** To use a service that has a web API but no step of its own in the catalog: create or read a record, send data to another tool, call a webhook. Only public addresses can be called, never the local machine or a private network. To read a web page as text, use Scrape Web Page instead.

**Example.** method: POST, url: https://api.example.com/orders, body: {"customer": "form.email"}

**Effects.** reads outside, changes something outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `method` | Choice | no | `GET` | The HTTP method. Choices: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`. |
| `url` | Text | yes |  | The address to call, in full (https://…). |
| `query` | Structured | no |  | Parameters added to the address, as a JSON object: {"page": "2"}. |
| `headers` | Structured | no |  | Headers sent with the call, as a JSON object: {"Accept": "application/json"}. Put a key in an HTTP API connection rather than here. |
| `body` | Text | no |  | What is sent with POST, PUT, PATCH or DELETE — usually JSON. |
| `content_type` | Choice | no |  | How the body is written (guessed from the body when left empty). Choices: `json`, `text`, `form`. |
| `credentials` | Credentials | no |  | The HTTP API connection whose key signs the call, when the API needs one. Connection of type `http_api`. |
| `timeout_seconds` | Number | no | `30` | How long to wait for the answer, in seconds. |
| `max_response_chars` | Number | no | `100000` | The most characters of the answer kept. |
| `rate_limit_profile` | Choice | no | `medium` | How long to wait and try again when the service is busy (readings only: a call that changes something is never sent twice). Choices: `none`, `fast`, `medium`, `slow`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `status` | Number | The HTTP status the service answered (empty when it could not be called) |
| `body` | Text | The answer, as text |
| `json` | Structured | The answer read as JSON, when it is JSON |
| `headers` | Structured | The headers of the answer, as a JSON object |
| `url` | Text | The address that answered (after any redirect) |
| `error` | Text | Why the call failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Out** (The service answered 2xx), **Error** (The service answered with an error, or could not be called — see 'error')

### Scrape Web Page

Step · in the catalogue: Web · type `web.scrape`

Reads a web page as Markdown, ready for an LLM prompt. Uses the connected web scraper, or the free Direct scraper when none is connected.

**When to use it.** To read the content of one web page from its link, for example a link a person gave, so an AI step can work on it. Not for finding pages on a subject: use a web search instead.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `url` | Text | yes |  | The page to read (http or https). |
| `timeout_seconds` | Number | no | `30` | How long to wait for the page. |
| `max_content_length` | Number | no | `50000` | Longest content kept, in characters. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `markdown` | Text | The page content as Markdown |
| `text` | Text | The same content as plain text |
| `url` | Text | The URL that was read |
| `metadata` | Structured | Page details (title, description…) as a JSON object, when the scraper provides them |
| `structured_data` | Structured | The data the page embeds for machines (JSON-LD, page state, meta tags, microdata), compacted — often holds exact values (prices, ratings, dates) that the readable content only shows in passing |
| `cleaning` | Structured | What cleaning took out of the page: sizes before and after, and what was removed |
| `error` | Text | Why reading failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Scraped** (The page was read successfully), **Failed** (The page could not be read — see 'error')

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Web Scraper** | no | `web.scraper.*` | 1 |

## Web > Scrappers

Web scraping resource nodes and providers.

### Direct Scraper

Resource · in the catalogue: Web > Scrappers · type `web.scraper.direct`

Scrape web pages using direct HTTP requests (free, simple, limited features).

**When to use it.** To read web pages for free, with no account, from a step that reads pages such as Scrape Web Page. For pages that only show their content once scripts run in the browser, use Firecrawl Scraper instead.

**Effects.** reads outside.

**Plugs into** a place that accepts `web.scraper.*`.

### Firecrawl Scraper

Resource · in the catalogue: Web > Scrappers · type `web.scraper.firecrawl`

Scrape web pages using Firecrawl API (premium, JS rendering, clean markdown).

**When to use it.** To read pages the free scrapers cannot, such as pages built by scripts in the browser, with your own Firecrawl account (an API key). Connect it to a step that reads pages, such as Scrape Web Page.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Firecrawl API credentials. Connection of type `firecrawl`. |

**Plugs into** a place that accepts `web.scraper.*`.

### Jina Reader Scraper

Resource · in the catalogue: Web > Scrappers · type `web.scraper.jina`

Scrape web pages using Jina AI Reader (free, clean markdown output).

**When to use it.** To read web pages as clean text for free through Jina AI Reader, with no account, from a step that reads pages such as Scrape Web Page. Useful when the Direct Scraper keeps too much clutter.

**Effects.** reads outside.

**Plugs into** a place that accepts `web.scraper.*`.

## Web > Search

Web search nodes backed by external search providers.

### Web Search (SearXNG)

Step · in the catalogue: Web > Search · type `web.search.searxng`

Searches the web through a SearXNG instance and returns normalized organic results.

**When to use it.** To search the web in a workflow through a SearXNG server you run or trust, given by its address, with no paid account; the results go to the next steps. For an agent that searches by itself, use AI Agent Web Search Tool (SearXNG).

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SearXNG credentials. Connection of type `searxng`. |
| `query` | Text | yes |  | Search query. |
| `top_k` | Number | no | `5` | Maximum number of results. |
| `language` | Text | no |  | Optional language hint. |
| `site` | Text | no |  | Optional site/domain filter. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `provider` | Text | Search provider identifier |
| `query` | Text | Original search query |
| `effective_query` | Text | Executed search query including filters |
| `result_count` | Number | Number of search results returned |
| `results_json` | Text | The results (rank, title, URL, snippet) as JSON |
| `urls` | TextList | Returned result URLs |
| `error` | Text | Why the search failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Found** (The search ran — its results are in the outputs (there can be none)), **Failed** (The search could not run — see 'error')

### Web Search (SerpApi)

Step · in the catalogue: Web > Search · type `web.search.serpapi`

Searches the web through SerpApi and returns normalized organic results.

**When to use it.** To search the web in a workflow through your own SerpApi account (an API key); the results go to the next steps. For an agent that searches by itself, use AI Agent Web Search Tool (SerpApi).

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | SerpApi credentials. Connection of type `serpapi`. |
| `query` | Text | yes |  | Search query. |
| `top_k` | Number | no | `5` | Maximum number of results. |
| `language` | Text | no |  | Optional language hint. |
| `site` | Text | no |  | Optional site/domain filter. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `provider` | Text | Search provider identifier |
| `query` | Text | Original search query |
| `effective_query` | Text | Executed search query including filters |
| `result_count` | Number | Number of search results returned |
| `results_json` | Text | The results (rank, title, URL, snippet) as JSON |
| `urls` | TextList | Returned result URLs |
| `error` | Text | Why the search failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Found** (The search ran — its results are in the outputs (there can be none)), **Failed** (The search could not run — see 'error')

### Web Search (Tavily)

Step · in the catalogue: Web > Search · type `web.search.tavily`

Searches the web through Tavily and returns normalized organic results.

**When to use it.** To search the web in a workflow through your own Tavily account (an API key); the results go to the next steps. For an agent that searches by itself, use AI Agent Web Search Tool (Tavily).

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Tavily API credentials. Connection of type `tavily`. |
| `query` | Text | yes |  | Search query. |
| `top_k` | Number | no | `5` | Maximum number of results. |
| `language` | Text | no |  | Optional language hint. |
| `site` | Text | no |  | Optional site/domain filter. |
| `rate_limit_profile` | Choice | no | `medium` | Rate limiting and retry profile. Choices: `none`, `fast`, `medium`, `slow`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `provider` | Text | Search provider identifier |
| `query` | Text | Original search query |
| `effective_query` | Text | Executed search query including filters |
| `result_count` | Number | Number of search results returned |
| `results_json` | Text | The results (rank, title, URL, snippet) as JSON |
| `urls` | TextList | Returned result URLs |
| `error` | Text | Why the search failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Found** (The search ran — its results are in the outputs (there can be none)), **Failed** (The search could not run — see 'error')

## SEO

SEO analysis and optimization.

### Internal Link Suggester

Step · in the catalogue: SEO · type `seo.links.suggest`

Suggests relevant internal links using structure-first selection with semantic scoring.

**When to use it.** To choose which pages of your own site a new article should link to, with link texts written by an AI, from the site structure Sitemap Structure gives. Not for links to other sites: it only suggests pages of your site.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `article_topic` | Text | yes |  | Article topic or title. |
| `article_summary` | Text | no |  | Brief article summary/outline (optional). |
| `site_structure` | Text | yes |  | Site structure (JSON), as the Sitemap Structure step gives it. |
| `max_links` | Number | no | `10` | Maximum links to suggest. |
| `parent_pillar_url` | Text | no |  | Parent pillar URL (required for best results). |
| `quota_parent_pillar` | Number | no | `1` | Links to parent pillar. |
| `quota_sibling_pillars` | Number | no | `2` | Links to sibling pillars. |
| `quota_same_pillar_leaves` | Number | no | `4` | Links to leaves in same pillar. |
| `quota_other_pillars` | Number | no | `2` | Links to other relevant pillars. |
| `quota_cross_pillar_leaves` | Number | no | `1` | Links to leaves in other pillars. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `suggested_links` | Text | List of suggested links (JSON array) |
| `total_suggestions` | Number | Number of links suggested |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **LLM Model** | yes | `llm.model.*` | 1 |
| **Embeddings** | no | `ai.embeddings.*` | 1 |

### Sitemap Analyzer

Step · in the catalogue: SEO · type `seo.sitemap.analyze`

Parses XML sitemap and extracts page information for SEO analysis.

**When to use it.** To list the pages of a website from its XML sitemap (such as https://example.com/sitemap.xml), optionally with each page's title and description, as the start of an SEO workflow. Give its pages to Sitemap Structure.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `sitemap_url` | Text | yes |  | Sitemap XML URL (e.g., https://example.com/sitemap.xml). |
| `fetch_content` | Boolean | no | `false` | Fetch page content (title, H1, meta description, excerpt). |
| `max_pages` | Number | no | `0` | Maximum pages to analyze (0 = all). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `pages` | Text | List of sitemap pages (JSON array) |
| `total_pages` | Number | Total number of pages found |

### Sitemap Structure

Step · in the catalogue: SEO · type `seo.sitemap.structure`

Analyzes sitemap pages using LLM to create hierarchical content structure (pillars & clusters).

**When to use it.** To group a site's pages into main topics (pillars) and topic clusters with an AI, from the page list Sitemap Analyzer gives. Its result feeds Internal Link Suggester.

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `pages` | Text | yes |  | Sitemap pages (JSON array), as the Sitemap Analyzer step gives it. |
| `site_name` | Text | no | `Website` | Website name/brand. |
| `max_pillars` | Number | no | `10` | Maximum content pillars to identify. |
| `scrape_pages` | Boolean | no | `true` | Scrape pages to analyze content and internal links (slower but more accurate). |
| `max_pages_to_scrape` | Number | no | `50` | Maximum pages to scrape for analysis (0 = all). |
| `max_topics_per_page` | Number | no | `8` | Maximum topics to extract per page. |
| `min_topic_similarity` | Number | no | `0.3` | Minimum similarity threshold for topic edges (0.0-1.0). |
| `max_topics_after_reduction` | Number | no | `100` | Maximum topics after set-cover reduction. |
| `cluster_cohesion_threshold` | Number | no | `0.5` | λ₂ threshold for cluster cohesion (0.0-1.0). |
| `min_cluster_size` | Number | no | `2` | Minimum cluster size. |
| `assignment_margin` | Number | no | `0.1` | Minimum gap between best/2nd cluster for assignment (0.0-0.3). |
| `min_child_support` | Number | no | `0.1` | Minimum fraction of cluster pages pillar must link to (0.0-1.0). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `site_structure` | Text | Site structure with pillars, topic clusters, and orphan pages (JSON) |
| `total_pillars` | Number | Number of content pillars identified |
| `total_clusters` | Number | Number of topic clusters identified |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **LLM Model** | yes | `llm.model.*` | 1 |
| **Embeddings** | yes | `ai.embeddings.*` | 1 |
| **Scraper** | no | `web.scraper.*` | 1 |

## Documents

Read the text of documents (PDF, Word, text).

### Extract Document Text

Step · in the catalogue: Documents · type `document.extract_text`

Reads a PDF, Word (.docx), or plain-text/Markdown file — an uploaded file (file_id) or raw bytes (file_base64) — and returns its content as Markdown, ready for an LLM prompt.

**When to use it.** To get the text of a PDF, Word (.docx), text or Markdown file a person uploaded, so an AI step can read it. Not for web pages: use Scrape Web Page instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `file_id` | Text | yes |  | Reference of an uploaded file (the fileId a SourceInput upload returns) — use this OR file_base64. The file name and format come from the upload. |
| `file_base64` | Text | yes |  | The document's raw bytes, base64-encoded — use this OR file_id. |
| `file_name` | Text | yes |  | Original file name, including its extension (e.g. 'resume.pdf') — the extension is what selects PDF, Word, or plain-text reading. Required with file_base64; taken from the upload when file_id is given. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `markdown` | Text | The document's content as Markdown — headings, lists and emphasis preserved where the source format carries them |
| `text` | Text | The same content with Markdown syntax stripped, for word counts or search |
| `format` | Text | Which extractor read the file: 'pdf', 'docx', or 'text' |
| `metadata` | Structured | Extraction details (e.g. page_count, word_count) as a JSON object |
| `error` | Text | Why extraction failed, when it did |

**Entries.** **In** (Entry point)

**Exits.** **Extracted** (The document's text was read successfully), **Failed** (The document could not be read — see 'error')
