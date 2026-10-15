---
title: "Content, web, SEO and document nodes"
description: "Reference of the nodes that read web pages, search the web, extract text from documents, build content layouts and analyse SEO."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-content-and-web.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-15 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The steps that read the web and documents, and the steps that build content.

This page lists 20 nodes. [How to read a node reference](/docs/reference/nodes/).

## Content

Content creation.

### Content Generator

Step · in the catalogue: Content · type `content.content_generator`

Generates structured DSL content from diverse sources with LLM-powered content generation and deterministic layout.

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
| `dsl_content` | Text | Generated content in DSL format (PageNode JSON) |
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

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | PageNode JSON in DSL format. |
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

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | PageNode JSON in DSL format. |
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

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | PageNode JSON in DSL format. |
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

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `dsl_content` | Text | yes |  | PageNode JSON in DSL format. |
| `generate_toc_anchors` | Boolean | no | `true` | Generate anchor links for TOC (default: true). |
| `heading_prefix` | Text | no |  | Optional prefix for all headings (e.g., project name). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `markdown` | Text | Generated Markdown content |
| `metadata` | Text | Content metadata (heading count, word count, etc.) |

## Web

Web scraping and content extraction.

### Scrape Web Page

Step · in the catalogue: Web · type `web.scrape`

Reads a web page as Markdown, ready for an LLM prompt. Uses the connected web scraper, or the free Direct scraper when none is connected.

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `url` | Text | yes |  | The page to read (http or https). |
| `timeout_seconds` | Number | no | `30` | How long to wait for the page. |
| `max_content_length` | Number | no | `50000` | Longest content kept, in characters. |
| `allow_private_addresses` | Boolean | no | `false` | Allow links that point inside the backend's own network (localhost, private ranges). Leave off when the link comes from a person. |

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

**Effects.** reads outside.

**Plugs into** a place that accepts `web.scraper.*`.

### Firecrawl Scraper

Resource · in the catalogue: Web > Scrappers · type `web.scraper.firecrawl`

Scrape web pages using Firecrawl API (premium, JS rendering, clean markdown).

**Effects.** reads outside.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Firecrawl API credentials. Connection of type `firecrawl`. |

**Plugs into** a place that accepts `web.scraper.*`.

### Jina Reader Scraper

Resource · in the catalogue: Web > Scrappers · type `web.scraper.jina`

Scrape web pages using Jina AI Reader (free, clean markdown output).

**Effects.** reads outside.

**Plugs into** a place that accepts `web.scraper.*`.

## Web > Search

Web search nodes backed by external search providers.

### Web Search - SearXNG

Resource · in the catalogue: Web > Search · type `web.search.searxng`

Searches the web through a SearXNG instance and returns normalized organic results.

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
| `results_json` | Text | Normalized search results as JSON |
| `urls` | TextList | Returned result URLs |

**Plugs into** a place that accepts `ai.knowledge.*`.

### Web Search - SerpApi

Resource · in the catalogue: Web > Search · type `web.search.serpapi`

Searches the web through SerpApi and returns normalized organic results.

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
| `results_json` | Text | Normalized search results as JSON |
| `urls` | TextList | Returned result URLs |

**Plugs into** a place that accepts `ai.knowledge.*`.

### Web Search - Tavily

Resource · in the catalogue: Web > Search · type `web.search.tavily`

Searches the web through Tavily and returns normalized organic results.

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
| `results_json` | Text | Normalized search results as JSON |
| `urls` | TextList | Returned result URLs |

**Plugs into** a place that accepts `ai.knowledge.*`.

## SEO

SEO analysis and optimization.

### Internal Link Suggester

Step · in the catalogue: SEO · type `seo.links.suggest`

Suggests relevant internal links using structure-first selection with semantic scoring.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `article_topic` | Text | yes |  | Article topic or title. |
| `article_summary` | Text | no |  | Brief article summary/outline (optional). |
| `site_structure` | Text | yes |  | Site structure JSON (from SitemapStructureNode). |
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
| **RAG/Memory** | no | `llm.memory.*` | 1 |

### Sitemap Analyzer

Step · in the catalogue: SEO · type `seo.sitemap.analyze`

Parses XML sitemap and extracts page information for SEO analysis.

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

**Effects.** reads outside, costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `pages` | Text | yes |  | Sitemap pages JSON array (from SitemapAnalyzerNode). |
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
| **RAG/Memory** | no | `llm.memory.*` | 1 |
| **Scraper** | no | `web.scraper.*` | 1 |

## No named category: documents

### Extract Document Text

Step · in the catalogue: no named category · type `document.extract_text`

Reads a PDF, Word (.docx), or plain-text/Markdown file — an uploaded file (file_id) or raw bytes (file_base64) — and returns its content as Markdown, ready for an LLM prompt.

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
