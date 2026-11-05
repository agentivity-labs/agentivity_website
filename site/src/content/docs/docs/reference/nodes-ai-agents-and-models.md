---
title: "AI nodes: agents, models, sessions and channels"
description: "Reference of the AI nodes for agents: AI Agent, Agent, Team, LLM Prompt, models, sessions, channels, policies, guardrails, media."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-ai-agents-and-models.md. Do not edit here: edit the source and publish again. -->

<!-- Written from a running server by tools/reference.mjs. Do not edit this page by hand. -->

The AI steps, and the resources you plug into them: models, sessions, channels to reach a person, policies and guardrails.

This page lists 25 nodes. [How to read a node reference](/docs/reference/nodes/).

## AI > Agents

Agent orchestration and execution.

### Agent

Step · in the catalogue: AI > Agents · type `agentic_node`

Calls an agent of your library with a message, and gives its answer.

**When to use it.** To reuse an agent saved in your library: send it a message and get its answer back. Not for an agent built only for this workflow: use AI Agent instead.

**Effects.** costs, runs other things.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `entity_id` | Text | yes |  | The agent of your library to call. |
| `input` | Text | yes |  | Message sent to the agent. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `output` | Text | The final answer of the agent. |

Any named output that the agent itself declares is added next to this one, under its own name.

**Entries.** **In** (Entry point)

**Exits.** **Out** (The answer of the agent), **Error** (Execution error if any)

### AI Agent

Step · in the catalogue: AI > Agents · type `ai.node`

Runs a multi-step LLM agent with native tool calling, and searches the Knowledge Bases connected to it.

**When to use it.** To have an AI work through a task step by step in this workflow, with the model, tools, knowledge and people you plug into it. Not for a single question and answer: use LLM Prompt instead; to reuse an agent saved in your library, use Agent.

**Effects.** costs, runs other things.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `agent_mode` | Choice | no | `tools` | Agent execution mode. Choices: `tools`, `conversational`, `react`. |
| `system_prompt` | Text | no |  | System instructions (optional). |
| `prompt` | Text | yes | `input` (a reference) | User prompt (required). |
| `images` | ImageRef | no |  | Optional image to attach to the initial prompt — only used by vision-capable models (GPT-4o, Claude, Gemini). Ignored by text-only models. |
| `temperature` | Number | no | `0.2` | Creativity (0-2). |
| `max_iterations` | Number | no |  | Maximum number of rounds — one call to the model, then the tools it asked for (leave empty for no limit). |
| `response_quality_threshold` | Number | no | `0` | Minimum response quality score before finalization (0 disables the quality pass). |
| `tool_choice_mode` | Choice | no | `auto` | Tool usage strategy. Choices: `auto`, `required`, `none`. |
| `allow_parallel_tool_calls` | Boolean | no | `false` | Allow the model to ask for several tools in the same round. |
| `response_schema` | Text | no |  | JSON Schema for the final response (optional). |
| `allows_human_questions` | Boolean | no | `true` | Allow this agent to ask the user a question and wait for a reply. Turn off to guarantee it always delivers its final answer directly instead of pausing the run. |
| `session_id` | Text | no |  | Session identifier (leave empty to create a new one when a session resource is connected). |
| `session_scope_hint` | Text | no |  | Optional scope hint used by forked session resources. |
| `restore_session` | Boolean | no | `true` | Restore previous conversation history from the connected session resource. |
| `persist_session` | Boolean | no | `true` | Persist the conversation history to the connected session resource. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `response` | Text | Final agent response |
| `finish_reason` | Text | Final LLM finish reason |
| `iterations` | Number | Number of rounds the agent took |
| `tool_calls` | Text | Executed tool calls as JSON |
| `guardrail_warnings` | Text | JSON array of non-blocking guardrail matches (guardrail_id, stage, message) — branch on this with an If/Switch to decide what to do (empty array when nothing matched) |
| `session_id` | Text | Resolved session identifier when a session resource is connected |
| `session_scope` | Text | Resolved session scope |
| `session_restored` | Boolean | Whether an existing session history was restored |
| `session_message_count` | Number | Number of conversation messages currently stored in the session |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **LLM Model** | yes | `llm.model.*` | 1 |
| **Knowledge Bases** | no | `ai.knowledge.*` | several |
| **Human Loop Channel** | no | `interaction.channel.*` | 1 |
| **Agent Session** | no | `ai.node.session.*` | 1 |
| **AI Agent Tools** | no | `ai.node.tool.*` | several |
| **AI Agent Policies** | no | `ai.node.policy.*` | several |
| **AI Agent Guardrails** | no | `ai.node.guardrail.*` | several |

### Team

Step · in the catalogue: AI > Agents · type `team_node`

Calls a team of your library with a message, and gives its answer.

**When to use it.** To hand a task to a team of agents saved in your library and get its answer back. For a single agent, use Agent instead.

**Effects.** costs, runs other things.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `entity_id` | Text | yes |  | The team of your library to call. |
| `input` | Text | yes |  | Message sent to the team. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `output` | Text | The final answer of the team. |

Any named output that the team itself declares is added next to this one, under its own name.

**Entries.** **In** (Entry point)

**Exits.** **Out** (The answer of the team), **Error** (Execution error if any)

## AI > LLM

Text generation and prompting nodes.

### LLM Prompt

Step · in the catalogue: AI > LLM · type `ai.llm.prompt`

Executes a prompt using an LLM with optional structured output, answering from the Knowledge Bases connected to it.

**When to use it.** To get a single answer from a model for one prompt (summarize, classify, extract, write), as text, or as JSON when you give a JSON Schema. Not for work that needs tools or several steps: use AI Agent instead.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `system_prompt` | Text | no |  | System instructions (optional). |
| `prompt` | Text | yes |  | User prompt (required). |
| `images` | ImageRef | no |  | Optional image to analyze — only used by vision-capable models (GPT-4o, Claude, Gemini). Ignored by text-only models. |
| `response_schema` | Text | no |  | JSON Schema for structured output (optional). |
| `temperature` | Number | no | `0.7` | Creativity (0-2). |
| `max_tokens` | Number | no |  | Max response tokens (leave empty to let the model decide). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `response` | Text | LLM response |
| `knowledge_used` | Text | What the Knowledge Bases gave for this prompt (empty when none is connected) |

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **LLM Model** | yes | `llm.model.*` | 1 |
| **Knowledge Bases** | no | `ai.knowledge.*` | several |

## AI > Models

LLM and image generation model resources.

### Anthropic Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.anthropic`

Anthropic Claude models (claude-opus-4, claude-sonnet-4, etc.).

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a Claude model, with a key from your Anthropic account. If your company reaches Claude through AWS, use AWS Bedrock Model instead.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Provider credentials. Connection of type `anthropic`. |
| `model` | Text | no |  | Model override (leave empty to use credential default): chosen in the list of the models the connection can use, or typed. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |
| `frequency_penalty` | Number | no | `0` | Reduce repetition –2.0 to 2.0 (default: 0.0). |
| `presence_penalty` | Number | no | `0` | Encourage new topics –2.0 to 2.0 (default: 0.0). |
| `context_length` | Number | no |  | Context window override in tokens (LM Studio / Ollama only). |

**Plugs into** a place that accepts `llm.model.*`.

### AWS Bedrock Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.bedrock`

Anthropic Claude models via AWS Bedrock — SigV4-signed requests through the official AWS SDK, no bearer token.

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a Claude model through your company's AWS account, with AWS access keys. With a key from an Anthropic account, use Anthropic Model instead.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | AWS credentials used to sign Bedrock requests. Connection of type `aws_bedrock`. |
| `model` | Text | no | `anthropic.claude-3-5-sonnet-20241022-v2:0` | Bedrock model id. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |

**Plugs into** a place that accepts `llm.model.*`.

### DeepSeek Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.deepseek`

DeepSeek AI models (deepseek-chat, deepseek-reasoner, etc.).

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a DeepSeek model, with a key from your DeepSeek account.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Provider credentials. Connection of type `deepseek`. |
| `model` | Text | no |  | Model override (leave empty to use credential default): chosen in the list of the models the connection can use, or typed. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |
| `frequency_penalty` | Number | no | `0` | Reduce repetition –2.0 to 2.0 (default: 0.0). |
| `presence_penalty` | Number | no | `0` | Encourage new topics –2.0 to 2.0 (default: 0.0). |
| `context_length` | Number | no |  | Context window override in tokens (LM Studio / Ollama only). |

**Plugs into** a place that accepts `llm.model.*`.

### Google Gemini Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.gemini`

Google Gemini models via AI Studio (gemini-2.0-flash, gemini-2.5-pro, etc.).

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a Google Gemini model, with an API key from Google AI Studio.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Provider credentials. Connection of type `gemini`. |
| `model` | Text | no |  | Model override (leave empty to use credential default): chosen in the list of the models the connection can use, or typed. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |
| `frequency_penalty` | Number | no | `0` | Reduce repetition –2.0 to 2.0 (default: 0.0). |
| `presence_penalty` | Number | no | `0` | Encourage new topics –2.0 to 2.0 (default: 0.0). |
| `context_length` | Number | no |  | Context window override in tokens (LM Studio / Ollama only). |

**Plugs into** a place that accepts `llm.model.*`.

### Image Gen Model

Resource · in the catalogue: AI > Models · type `imagegen.model`

An image provider that speaks the OpenAI images API (OpenAI, Recraft…), its model and settings.

**When to use it.** To choose the image provider, model, quality and style used by the AI Image Generator. Plug it into the AI Image Generator.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The provider's connection: its key, and its base URL for a provider other than OpenAI (Recraft: https://external.api.recraft.ai/v1). Connection of type `openai_image`. |
| `model` | Text | no | `gpt-image-1.5` | The model to draw with: gpt-image-1.5 at OpenAI; at another provider, one of its own (Recraft: recraftv3), or empty for its default. |
| `quality` | Choice | no | `medium` | Image quality. Choices: `low`, `medium`, `high`. |
| `style` | Choice | no | `none` | Look of the image, said to the model with the description. Choices: `none`, `vivid`, `natural`. |
| `extra_parameters` | Text | no |  | Parameters of the provider itself, as a JSON object put in the request as it is: e.g. {"style": "digital_illustration"} at Recraft. Over the settings above. |

**Plugs into** a place that accepts `imagegen.model.*`.

### OpenAI Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.openai`

OpenAI GPT models (and compatible: LM Studio, Ollama, Groq, Azure OpenAI…).

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a GPT model to work with. Also for services that follow the OpenAI API, such as Azure OpenAI, Groq, or a model on your own machine with LM Studio or Ollama.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Provider credentials. Connection of type `openai`. |
| `model` | Text | no |  | Model override (leave empty to use credential default): chosen in the list of the models the connection can use, or typed. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |
| `frequency_penalty` | Number | no | `0` | Reduce repetition –2.0 to 2.0 (default: 0.0). |
| `presence_penalty` | Number | no | `0` | Encourage new topics –2.0 to 2.0 (default: 0.0). |
| `context_length` | Number | no |  | Context window override in tokens (LM Studio / Ollama only). |

**Plugs into** a place that accepts `llm.model.*`.

### OpenRouter Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.openrouter`

Models of many providers through one OpenRouter account.

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a model through your OpenRouter account.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Provider credentials. Connection of type `openrouter`. |
| `model` | Text | no |  | Model override (leave empty to use credential default): chosen in the list of the models the connection can use, or typed. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |
| `frequency_penalty` | Number | no | `0` | Reduce repetition –2.0 to 2.0 (default: 0.0). |
| `presence_penalty` | Number | no | `0` | Encourage new topics –2.0 to 2.0 (default: 0.0). |
| `context_length` | Number | no |  | Context window override in tokens (LM Studio / Ollama only). |

**Plugs into** a place that accepts `llm.model.*`.

### Recraft Model

Resource · in the catalogue: AI > Models · type `imagegen.recraft`

Recraft as the image provider of an AI Image Generator: model, style, brand style, colours, vector output.

**When to use it.** To draw with Recraft: illustrations, brand-consistent images, vector art (SVG). Connect it to an AI Image Generator.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Your Recraft API key. Connection of type `recraft`. |
| `model` | Choice | no | `recraftv4_1` | The model. A vector one draws an SVG. Choices: `recraftv4_1`, `recraftv4_1_vector`, `recraftv4_1_pro`, `recraftv4_1_pro_vector`, `recraftv4_1_flash`, `recraftv4_styles`, `recraftv4_styles_vector`, `recraftv4_styles_pro`, `recraftv4_styles_pro_vector`, `recraftv3`, `recraftv3_vector`, `recraftv2`, `recraftv2_vector`. |
| `aspect_ratio` | Choice | no | `auto` | Shape of the image. Over the size of the generator. Choices: `auto`, `1:1`, `16:9`, `9:16`, `3:2`, `2:3`, `4:3`, `3:4`, `5:4`, `4:5`, `2:1`, `1:2`, `14:10`, `10:14`, `6:10`. |
| `style` | Text | no |  | A style of Recraft, for the V3 and V2 models: e.g. Photorealism, Illustration, Hand-drawn, Vector art, Line art. |
| `style_id` | Text | no |  | Your own style, made from reference images: choose it in the list of your Recraft account, or make one there from images; an ID (36 characters) can also be typed. A style works only with the model it was made for (V4 Styles when made here without saying), and not with Flash nor together with a style. |
| `colors` | Text | no |  | Colours to use, as hex codes separated by commas: #1B2B3C, #F5A623 (10 at most). |
| `background_color` | Text | no |  | Background colour, as a hex code: #FFFFFF. |
| `negative_prompt` | Text | no |  | What not to draw, for the V3 and V2 models. |
| `image_format` | Choice | no | `png` | File format of a raster image (a vector one is SVG). Choices: `webp`, `png`. |
| `extra_parameters` | Text | no |  | Other parameters of Recraft, as a JSON object put in the request as it is: e.g. {"controls": {"artistic_level": 2}}. Over the fields above. |

**Plugs into** a place that accepts `imagegen.model.*`.

### xAI / Grok Model

Resource · in the catalogue: AI > Models · type `ai.llm.model.xai`

xAI Grok models (grok-3, grok-3-mini, etc.).

**When to use it.** To give an AI Agent, an LLM Prompt or another AI step a Grok model, with a key from your xAI account.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Provider credentials. Connection of type `xai`. |
| `model` | Text | no |  | Model override (leave empty to use credential default): chosen in the list of the models the connection can use, or typed. |
| `max_tokens` | Number | no |  | Maximum tokens in response (leave empty to let the model decide). |
| `top_p` | Number | no | `1` | Nucleus sampling 0.0–1.0 (default: 1.0). |
| `frequency_penalty` | Number | no | `0` | Reduce repetition –2.0 to 2.0 (default: 0.0). |
| `presence_penalty` | Number | no | `0` | Encourage new topics –2.0 to 2.0 (default: 0.0). |
| `context_length` | Number | no |  | Context window override in tokens (LM Studio / Ollama only). |

**Plugs into** a place that accepts `llm.model.*`.

## AI > Sessions

Persistent agent session resources.

### AI Agent Session (File)

Resource · in the catalogue: AI > Sessions · type `ai.sessions.file`

Stores AI agent conversation sessions as JSON files so they survive application restarts.

**When to use it.** To let an AI Agent remember the conversation from one run to the next, kept on disk so it survives a restart of the application. Plug it into the Agent Session of an AI Agent; give the same session ID to continue a conversation.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `mode` | Choice | no | `isolated` | How the session is shared between connected agents. Choices: `isolated`, `shared`, `forked`. |
| `max_messages` | Number | no | `50` | Maximum number of conversation messages kept in the session. |
| `compaction_mode` | Choice | no | `none` | Optional compaction strategy applied before persistence. Choices: `none`, `summary`. |
| `tool_state_reuse_mode` | Choice | no | `none` | Optional reuse strategy for deterministic tool results stored in session state. Choices: `none`, `exact_match`. |
| `tool_state_reuse_ttl_seconds` | Number | no | `3600` | Maximum age in seconds for reusable tool-state entries. |
| `expiration_minutes` | Number | no | `0` | Optional session expiration in minutes (0 disables expiration). |

**Plugs into** a place that accepts `ai.node.session.*`.

### AI Agent Session (In-Memory)

Resource · in the catalogue: AI > Sessions · type `ai.sessions.inmemory`

Keeps AI agent conversations in memory until the application restarts.

**When to use it.** To let an AI Agent remember the conversation from one run to the next, until the application restarts. Plug it into the Agent Session of an AI Agent; to keep conversations after a restart, use AI Agent Session (File).

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `mode` | Choice | no | `isolated` | How the session is shared between connected agents. Choices: `isolated`, `shared`, `forked`. |
| `max_messages` | Number | no | `50` | Maximum number of conversation messages kept in the session. |
| `compaction_mode` | Choice | no | `none` | Optional compaction strategy applied before persistence. Choices: `none`, `summary`. |
| `tool_state_reuse_mode` | Choice | no | `none` | Optional reuse strategy for deterministic tool results stored in session state. Choices: `none`, `exact_match`. |
| `tool_state_reuse_ttl_seconds` | Number | no | `3600` | Maximum age in seconds for reusable tool-state entries. |
| `expiration_minutes` | Number | no | `0` | Optional session expiration in minutes (0 disables expiration). |

**Plugs into** a place that accepts `ai.node.session.*`.

## AI > Interactions

Human-in-the-loop channels and interaction resources.

### AI Assistant Channel

Resource · in the catalogue: AI > Interactions · type `ai.interactions.assistant`

Lets the AI assistant that started an execution over MCP (Claude, ChatGPT…) answer its questions from the conversation it is in.

**When to use it.** When an execution is started from an AI assistant and what it asks can come from there: a document, a detail. For a decision that belongs to a person, use another channel: the assistant cannot answer those.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `default_thread_title` | Text | no | `Main` | Default thread title for newly created workflow conversations. |
| `workflow_author_name` | Text | no | `Workflow` | Display name used for workflow-authored messages. |
| `timeout_minutes` | Number | no | `0` | Response timeout in minutes (0 = no timeout). |
| `widget_bundles` | TextList | no | `["agentivity_artifacts"]` | Platform widget bundle IDs to activate for this run. |

**Plugs into** a place that accepts `interaction.channel.*`.

### Chat Channel

Resource · in the catalogue: AI > Interactions · type `ai.interactions.chat`

Internal local chat channel for workflow conversations, human-in-the-loop responses, and AG-UI rich widgets.

**When to use it.** To let an AI Agent talk with the user in the app's chat: send messages, ask a question and wait for the reply, show rich cards. Plug it into the Human Loop Channel of an AI Agent, or use it with an interaction step.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `default_thread_title` | Text | no | `Main` | Default thread title for newly created workflow conversations. |
| `workflow_author_name` | Text | no | `Workflow` | Display name used for workflow-authored messages. |
| `respondent` | Text | no |  | Expected respondent name for traceability. |
| `timeout_minutes` | Number | no | `0` | Response timeout in minutes (0 = no timeout). |
| `widget_bundles` | TextList | no | `["agentivity_artifacts"]` | Platform widget bundle IDs to activate for this run. |
| `custom_widgets` | Structured | no | `[]` | Application-specific widget definitions the LLM can invoke as tool calls. |

**Plugs into** a place that accepts `interaction.channel.*`.

### Email Channel

Resource · in the catalogue: AI > Interactions · type `ai.interactions.email`

Connects an agent or an interaction step to e-mail: it tells people by e-mail that their answer is needed, and gives an agent a mailbox to search, read, answer, write and file e-mails, with the permissions you allow on this node.

**When to use it.** For an agent that works from a mailbox: a support desk answering requests, an assistant sorting what arrived, an agent that sends its result by e-mail. Also to tell someone by e-mail that a workflow needs their answer: the e-mail only notifies, the answer is still given in the app. An agent does not ask questions through it: to ask a person, use the Chat, Forms or Slack channel. Give only the permissions the job needs. In a fixed workflow, use the e-mail steps instead.

**Effects.** reads outside, changes something outside, sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | The connection e-mails are sent with (SMTP): the notices of an interaction step, and the agent's answers and new e-mails. Connection of type `smtp`. |
| `inbox` | Credentials | no |  | The mailbox the agent reads (IMAP connection). Needed for reading, answering and filing. Connection of type `imap`. |
| `folder` | Text | no | `INBOX` | The folder the agent works in. |
| `to` | Text | no |  | Who is told by e-mail that an interaction step needs an answer: address(es). |
| `reply_to` | Text | no |  | Reply-to address for responses. |
| `timeout_minutes` | Number | no | `1440` | Response timeout in minutes (0 = no timeout). |
| `tool_name_prefix` | Text | no | `email` | Prefix for the names of the agent's e-mail tools, e.g. "support" → support_search, support_read, support_reply, support_send, support_update. |
| `max_body_chars` | Number | no | `12000` | The most characters of an e-mail's text handed to the agent. |
| `allow_read` | Boolean | no | `true` | Let the agent search and read e-mails. |
| `allow_send` | Boolean | no | `true` | Let the agent send e-mails (answers and new ones). |
| `allow_update` | Boolean | no | `true` | Let the agent mark e-mails as read, flag them or move them to a folder. |
| `allowed_recipients` | Text | no |  | Who the agent may write to: addresses or domains separated by commas (anna@shop.com, @shop.com). Empty = anyone. An answer to an e-mail it read is always allowed. |

**Plugs into** a place that accepts `interaction.channel.*`.

### Slack Channel

Resource · in the catalogue: AI > Interactions · type `ai.interactions.slack`

Connects an agent or an interaction step to Slack: it asks people there and takes their reply, and gives an agent the Slack operations you allow on this node.

**When to use it.** To ask people in Slack and take their reply from there, for an AI Agent or an interaction step, or to let an agent read and post in Slack by itself. Reading is allowed by default; allow only the changes the job needs. In a fixed workflow, use the Slack step instead.

**Effects.** reads outside, changes something outside, sends a message.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | Slack API credentials (Bot token). Connection of type `slack`. |
| `tool_name_prefix` | Text | no | `slack` | Prefix of this instance's tool names. Required when an agent has more than one Slack tool connected. |
| `allow_message_send` | Boolean | no | `false` | Posts a message to a channel or a thread. |
| `allow_message_update` | Boolean | no | `false` | Replaces the text of a message the bot posted. |
| `allow_message_delete` | Boolean | no | `false` | Deletes a message the bot posted. |
| `allow_message_react` | Boolean | no | `false` | Adds an emoji reaction to a message. |
| `allow_channel_list` | Boolean | no | `true` | Lists the channels the bot can see. |
| `allow_channel_history` | Boolean | no | `true` | Reads the latest messages of a channel, newest first. The bot must be a member. |
| `allow_file_send` | Boolean | no | `false` | Shares a file in a channel, from text or from a public address. |
| `allow_user_get` | Boolean | no | `true` | Reads a person's profile. |
| `default_channel` | Text | yes |  | Default Slack channel for HIL interactions. |
| `mention_users` | Text | no |  | Users to mention (@user1, @user2). |
| `allowed_user_ids` | Text | no |  | Optional Slack user IDs allowed to answer (comma-separated). |
| `send_initial_message` | Boolean | no | `true` | Send the initial HIL prompt to Slack before waiting for a reply. |
| `timeout_minutes` | Number | no | `60` | Response timeout in minutes (0 = no timeout). |

**Plugs into** a place that accepts `interaction.channel.*`.

## AI > Policies

Composable AI agent policy resources.

### AI Agent Policy

Resource · in the catalogue: AI > Policies · type `ai.policies.layer`

A layer of rules and preferences an AI agent follows, with its scope and its priority. Plug it into the Policies of an AI Agent.

**When to use it.** To give an AI Agent rules and preferences to follow, kept apart from its instructions so they can be reused. Plug it into the Policies of an AI Agent; when several layers apply, their scope and priority decide which comes first.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `scope` | Choice | no | `run` | Policy scope. Choices: `platform`, `resource`, `agent`, `mode`, `run`. |
| `priority` | Number | no | `1000` | Priority used during policy resolution. |
| `source_id` | Text | no |  | Optional policy source identifier. |
| `textual_policy_tree` | Structured | no |  | Structured textual policy tree for groups and policies. |

**Plugs into** a place that accepts `ai.node.policy.*`.

## AI > Guardrails

Composable AI agent guardrail resources.

### AI Agent Guardrail

Resource · in the catalogue: AI > Guardrails · type `ai.guardrails.keyword`

Produces a simple keyword-based guardrail that can warn, rewrite, or block selected AI-agent runtime surfaces.

**When to use it.** To catch an exact word or phrase in what an AI Agent reads or writes, then warn, replace that text, or block. Plug it into the Guardrails of an AI Agent; to judge the meaning rather than exact words, use AI Semantic Guardrail.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `stage` | Choice | no | `final_response` | Guardrail stage. Choices: `planning_prompt`, `execution_prompt`, `task_batch_prompt`, `join_prompt`, `replanning_prompt`, `plan_quality_assessment_prompt`, `response_quality_assessment_prompt`, `response_quality_refinement_prompt`, `tool_failure_recovery_prompt`, `human_loop_duplicate_prompt`, `structured_response_finalization_prompt`, `conversational_finalization_prompt`, `agent_workspace_consolidation_prompt`, `human_loop_prompt`, `agent_workspace_prompt`, `final_response`. |
| `action` | Choice | no | `warn` | Guardrail action. Choices: `warn`, `block`, `rewrite`. |
| `priority` | Number | no | `1000` | Evaluation priority (lower first). |
| `guardrail_id` | Text | no |  | Optional guardrail identifier. |
| `match_text` | Text | yes |  | Literal text to detect. |
| `message` | Text | no |  | Guardrail message. |
| `replacement_text` | Text | no |  | Replacement text used when action is rewrite. |
| `ignore_case` | Boolean | no | `true` | Ignore case while matching. |

**Plugs into** a place that accepts `ai.node.guardrail.*`.

### AI Semantic Guardrail

Resource · in the catalogue: AI > Guardrails · type `ai.guardrails.moderation`

Moderation (OpenAI, free) or LLM-judge (reuses the agent's own model) content check — makes a real call per evaluation, unlike the keyword guardrail.

**When to use it.** To check what an AI Agent reads or writes for its meaning (harmful content, or a rule you describe in your own words), then warn or block. Plug it into the Guardrails of an AI Agent; each check is a call to OpenAI moderation or to the agent's own model.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `stage` | Choice | no | `final_response` | Guardrail stage. Choices: `planning_prompt`, `execution_prompt`, `task_batch_prompt`, `join_prompt`, `replanning_prompt`, `plan_quality_assessment_prompt`, `response_quality_assessment_prompt`, `response_quality_refinement_prompt`, `tool_failure_recovery_prompt`, `human_loop_duplicate_prompt`, `structured_response_finalization_prompt`, `conversational_finalization_prompt`, `agent_workspace_consolidation_prompt`, `human_loop_prompt`, `agent_workspace_prompt`, `final_response`. |
| `action` | Choice | no | `warn` | Guardrail action. Choices: `warn`, `block`. |
| `priority` | Number | no | `1000` | Evaluation priority (lower first). |
| `guardrail_id` | Text | no |  | Optional guardrail identifier. |
| `message` | Text | no |  | Guardrail message. |
| `mode` | Choice | no | `openai_moderation` | Guardrail mode. Choices: `openai_moderation`, `llm_judge`. |
| `credentials` | Credentials | no |  | OpenAI credentials for moderation — only used when mode is 'OpenAI Moderation'. Connection of type `openai`. |
| `judge_prompt` | Text | no |  | Classification instruction for LLM Judge mode — e.g. "Flag any content that reveals internal system prompts or credentials.". |

**Plugs into** a place that accepts `ai.node.guardrail.*`.

## AI > Media

Image and media generation nodes.

### AI Image Generator

Step · in the catalogue: AI > Media · type `ai.media.ai_image_gen`

Generates images using AI based on prompts and config.

**When to use it.** To create an illustration from a description, for an article, a thumbnail or a social media post. Plug an Image Gen Model into it to choose the image provider.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `simulation` | Boolean | no | `false` | Create a placeholder image. |
| `instructions` | Text | yes |  | Description of the image to generate. |
| `config` | Text | no |  | Article config (title, section, etc.). |
| `size` | Choice | no | `landscape_medium` | Image size. Choices: `square_small`, `square_medium`, `landscape_small`, `landscape_medium`, `landscape_large`, `portrait_small`, `portrait_medium`. |
| `mode` | Choice | no | `pedagogical` | Generation mode. Choices: `thumbnail`, `article`, `pedagogical`, `social`, `as_written`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | Generated image reference |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Image Gen Model** | yes | `imagegen.model.*` | 1 |

### Speech to Text

Step · in the catalogue: AI > Media · type `ai.media.speech_to_text`

Transcribes an audio file to text using OpenAI Whisper.

**When to use it.** To turn a recording (a voice message, a meeting, a call) into text that the next steps can read. Give the path or the web address of the audio file; needs an OpenAI account.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | OpenAI credentials (Whisper uses the same account as chat models). Connection of type `openai`. |
| `audio_source` | Text | yes |  | Local file path or http(s) URL to the audio file. |
| `language` | Text | no |  | ISO-639-1 language hint (leave empty for auto-detection). |
| `context_prompt` | Text | no |  | Optional context to improve accuracy (proper nouns, jargon, expected style). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `text` | Text | Transcribed text |
| `language` | Text | Detected language |
| `duration_seconds` | Number | Audio duration in seconds |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Text to Speech

Step · in the catalogue: AI > Media · type `ai.media.text_to_speech`

Synthesizes speech audio from text using the OpenAI TTS API.

**When to use it.** To turn a text into a spoken audio file, for example to read a summary aloud or produce a voice message. Not for transcribing a recording: use Speech to Text instead.

**Effects.** costs.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `credentials` | Credentials | yes |  | OpenAI credentials (TTS uses the same account as chat models). Connection of type `openai`. |
| `text` | Text | yes |  | Text to synthesize. |
| `voice` | Choice | no | `alloy` | Voice. Choices: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`. |
| `model` | Choice | no | `tts-1` | Model. Choices: `tts-1`, `tts-1-hd`. |
| `response_format` | Choice | no | `mp3` | Audio format. Choices: `mp3`, `opus`, `aac`, `flac`, `wav`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `audio` | AudioRef | Synthesized audio reference |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)
