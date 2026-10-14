---
title: "API reference: the routes of the server"
description: "The list of the HTTP routes of an Agentivity server, by area, with what each one does when the product says it."
sidebar:
  order: 8
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/api.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-14 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The Studio, the SDKs and your own applications talk to an Agentivity server through these routes. Each path starts after the address of your server, for example `http://localhost:5005`.

## Before you call the API

- **There is no sign-in.** Anyone who can reach the server can call every route. See [Keep your server private](/docs/guides/keep-your-server-private/).
- **A path part between single curly braces is a value to replace**, for example the ID of a run.
- **A route with no text in the last column has no description in the product yet.**
- To build an application, use the SDK instead of calling the routes yourself. See [Start with the React SDK](/docs/vibeapps/start-with-the-react-sdk/).

## AG-UI

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/ag-ui/bundles` | Returns all registered AG-UI widget bundles |
| GET | `/api/v1/ag-ui/bundles/{bundleId}` | Returns the full widget descriptor list for a specific bundle |

## Agentic Library

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/agentic/browse` | Browse the agentic library tree |
| GET | `/api/v1/agentic/folders` | List folders in the agentic library |
| POST | `/api/v1/agentic/folders` | Create a folder in the agentic library |
| DELETE | `/api/v1/agentic/folders/{folderId}` | Delete a folder |
| POST | `/api/v1/agentic/folders/{folderId}/move` | Move a folder to another parent |
| POST | `/api/v1/agentic/folders/{folderId}/rename` | Rename a folder |
| GET | `/api/v1/agentic/orchestrators` | List all registered orchestrator IDs |
| GET | `/api/v1/agentic/orchestrators/{orchestratorId}/connection-schema` | Get the connection rules for a given orchestrator |

## Agents

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/agentic/agents` | List all agents in the library |
| POST | `/api/v1/agentic/agents` | Create a new agent |
| DELETE | `/api/v1/agentic/agents/{agentId}` | Delete an agent |
| GET | `/api/v1/agentic/agents/{agentId}` | Get an agent by ID |
| PUT | `/api/v1/agentic/agents/{agentId}` | Update an existing agent |
| POST | `/api/v1/agentic/agents/{agentId}/move` | Move an agent to a folder |
| GET | `/api/v1/agentic/agents/{agentId}/versions` | List saved versions of an agent |
| POST | `/api/v1/agentic/agents/{agentId}/versions` | Create a version snapshot of an agent |
| GET | `/api/v1/agentic/agents/{agentId}/versions/{versionId}` | Get a version snapshot of an agent |
| POST | `/api/v1/agentic/agents/{agentId}/versions/{versionId}/restore` | Restore an agent to a saved version snapshot |

## Ai-assistant

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/ai-assistant/chat` |  |
| POST | `/api/v1/ai-assistant/chat-stream` |  |
| POST | `/api/v1/ai-assistant/configure-node` |  |
| GET | `/api/v1/ai-assistant/health` |  |
| POST | `/api/v1/ai-assistant/suggest-nodes` |  |

## Assistant

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/assistant/catalog` |  |
| GET | `/api/v1/assistant/changesets` |  |
| POST | `/api/v1/assistant/changesets` |  |
| DELETE | `/api/v1/assistant/changesets/{id}` |  |
| GET | `/api/v1/assistant/changesets/{id}` |  |
| PUT | `/api/v1/assistant/changesets/{id}/agent-model` |  |
| POST | `/api/v1/assistant/changesets/{id}/build` |  |
| GET | `/api/v1/assistant/changesets/{id}/conversation` |  |
| GET | `/api/v1/assistant/changesets/{id}/entities/{entityId}` |  |
| POST | `/api/v1/assistant/changesets/{id}/messages` |  |
| POST | `/api/v1/assistant/changesets/{id}/operations` |  |
| POST | `/api/v1/assistant/changesets/{id}/revert` |  |
| POST | `/api/v1/assistant/changesets/{id}/save` |  |
| POST | `/api/v1/assistant/changesets/{id}/validate` |  |
| POST | `/api/v1/assistant/changesets/open` |  |
| GET | `/api/v1/assistant/connections` |  |
| POST | `/api/v1/assistant/messages` |  |
| GET | `/api/v1/assistant/model` |  |
| GET | `/api/v1/assistant/operations` |  |
| GET | `/api/v1/assistant/workspace` |  |

## Capabilities

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/capabilities` |  |
| GET | `/api/v1/capabilities/{kind}` |  |
| GET | `/api/v1/capabilities/{kind}/{id}` |  |
| GET | `/api/v1/capabilities/search` |  |

## Configs

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/configs` |  |
| GET | `/api/v1/configs/{path}` |  |
| PUT | `/api/v1/configs/{path}` |  |

## Credentials

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/credentials` |  |
| POST | `/api/v1/credentials` |  |
| DELETE | `/api/v1/credentials/{id}` |  |
| GET | `/api/v1/credentials/{id}` |  |
| PUT | `/api/v1/credentials/{id}` |  |
| POST | `/api/v1/credentials/{id}/test` |  |
| GET | `/api/v1/credentials/templates` |  |

## Datatables

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/datatables` |  |
| DELETE | `/api/v1/datatables/{id}` |  |
| GET | `/api/v1/datatables/{id}` |  |
| PUT | `/api/v1/datatables/{id}` |  |
| POST | `/api/v1/datatables/{id}/move` |  |
| GET | `/api/v1/datatables/{id}/rows` |  |
| POST | `/api/v1/datatables/{id}/rows` |  |
| DELETE | `/api/v1/datatables/{id}/rows/{rowId}` |  |
| PUT | `/api/v1/datatables/{id}/rows/{rowId}` |  |
| GET | `/api/v1/datatables/{id}/versions` |  |
| POST | `/api/v1/datatables/{id}/versions` |  |
| GET | `/api/v1/datatables/{id}/versions/{versionId}` |  |
| POST | `/api/v1/datatables/{id}/versions/{versionId}/restore` |  |
| GET | `/api/v1/datatables/browse` |  |
| GET | `/api/v1/datatables/folders` |  |
| POST | `/api/v1/datatables/folders` |  |
| DELETE | `/api/v1/datatables/folders/{folderId}` |  |
| PUT | `/api/v1/datatables/folders/{folderId}` |  |
| POST | `/api/v1/datatables/folders/{folderId}/move` |  |

## Entities

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/entities` | List all executable entities (agents, teams, workflows) from the library, optionally filtered by tag |

## Executions

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/executions` | List execution history for any entity (agent, team, workflow) |
| POST | `/api/v1/executions` | Start a new execution (workflow, agent, or team) |
| GET | `/api/v1/executions/{executionId}` | Get execution detail for any entity kind (agent, team, workflow) |
| POST | `/api/v1/executions/{executionId}/cancel` | Cancel the active run of an execution |
| GET | `/api/v1/executions/{executionId}/hil/pending` | List all pending HIL requests for an execution |
| GET | `/api/v1/executions/{executionId}/inspector` | Debug/inspection snapshot for an execution |
| POST | `/api/v1/executions/{executionId}/pause` | Pause the active run of an execution |
| POST | `/api/v1/executions/{executionId}/respond` | Deliver a human-in-the-loop response to any pending request within an execution |
| GET | `/api/v1/executions/{executionId}/status` | Get live node/connection statuses for an execution |
| GET | `/api/v1/executions/{executionId}/threads` | List all interaction threads across all runs in an execution (session) |
| GET | `/api/v1/executions/{executionId}/threads/{threadId}/messages` | List messages in a thread, validated to belong to the execution |
| POST | `/api/v1/executions/{executionId}/unpause` | Unpause the active run of an execution |

## Features

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/features` |  |

## Icons

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/icons` | List the icons a user can choose from, optionally filtered by set (type) or by name (q) |

## Interactions

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/interactions/slack/events` |  |

## Llm-connections

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/llm-connections/default` |  |
| POST | `/api/v1/llm-connections/replace` |  |

## Metadata

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/metadata/categories` |  |
| GET | `/api/v1/metadata/nodes` |  |
| GET | `/api/v1/metadata/nodes/{nodeType}/icon.svg` |  |

## Nodes

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/nodes/reconfigure` |  |

## Prompt Engine

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/prompts` |  |
| POST | `/api/v1/prompts` |  |
| DELETE | `/api/v1/prompts/{id}` |  |
| GET | `/api/v1/prompts/{id}` |  |
| PUT | `/api/v1/prompts/{id}` |  |
| POST | `/api/v1/prompts/{id}/analyze` |  |
| GET | `/api/v1/prompts/{id}/versions` |  |
| POST | `/api/v1/prompts/{id}/versions` |  |
| GET | `/api/v1/prompts/{id}/versions/{versionId}` |  |
| POST | `/api/v1/prompts/{promptId}/optimizations` |  |
| POST | `/api/v1/prompts/{promptId}/playground/execute` |  |
| GET | `/api/v1/prompts/{promptId}/playground/executions` |  |
| GET | `/api/v1/prompts/{promptId}/testcases` |  |
| POST | `/api/v1/prompts/{promptId}/testcases` |  |
| POST | `/api/v1/prompts/{promptId}/testcases/execute-all` |  |
| GET | `/api/v1/prompts/{promptId}/testcases/executions` |  |
| GET | `/api/v1/prompts/browse` |  |
| GET | `/api/v1/prompts/optimizations/{id}` |  |
| POST | `/api/v1/prompts/optimizations/{id}/cancel` |  |
| GET | `/api/v1/prompts/playground/executions/{id}` |  |
| DELETE | `/api/v1/prompts/testcases/{id}` |  |
| GET | `/api/v1/prompts/testcases/{id}` |  |
| PUT | `/api/v1/prompts/testcases/{id}` |  |
| POST | `/api/v1/prompts/testcases/{id}/execute` |  |
| GET | `/api/v1/prompts/testcases/executions/{id}` |  |

## Resources

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/resources/{id}` |  |

## Runs

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/runs` | List runs — unscoped (all entity kinds) or scoped to a single entity via entityId |
| DELETE | `/api/v1/runs/{runId}` | Delete a run for any entity kind (agent, team, workflow) |
| GET | `/api/v1/runs/{runId}` | Get run status for any entity kind (agent, team, workflow) |
| POST | `/api/v1/runs/{runId}/cancel` | Cancel a run for any entity kind (agent, team, workflow) |
| GET | `/api/v1/runs/{runId}/entities/{entityId}/trace` | Get the trace for a specific step/entity in a run |
| GET | `/api/v1/runs/{runId}/entities/traces` | Get all step/entity traces for a run |
| GET | `/api/v1/runs/{runId}/inspector` | Debug/inspection snapshot for a run (workflow, agent, team) |
| POST | `/api/v1/runs/{runId}/interactions` | Send a message or respond to a HIL for a run (in-app, channel-agnostic) |
| POST | `/api/v1/runs/{runId}/pause` | Pause a run for any entity kind |
| POST | `/api/v1/runs/{runId}/recover` | Re-enter an interrupted run from its last checkpoint |
| POST | `/api/v1/runs/{runId}/resume` | Respond to a HIL interrupt and resume a run (AG-UI resume endpoint) |
| GET | `/api/v1/runs/{runId}/status` | Get live node/connection statuses for any entity kind (agent, team, workflow) |
| GET | `/api/v1/runs/{runId}/threads` | List conversation threads for a run |
| GET | `/api/v1/runs/{runId}/threads/{threadId}/messages` | List messages in a run thread |
| POST | `/api/v1/runs/{runId}/unpause` | Unpause a paused run for any entity kind (/resume is reserved for HIL) |
| GET | `/api/v1/runs/metrics/summary` | Aggregate ROI (time-saved) metrics for the home page |

## Settings

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/settings` |  |
| PUT | `/api/v1/settings` |  |

## Streams

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/streams/{streamId}/events` | Primary SSE channel for an execution — full AG-UI content, one channel per execution chain |
| POST | `/api/v1/streams/{streamId}/interactions` | Respond to a HIL gate using streamId + requestId (no runId needed) |
| GET | `/api/v1/streams/runs/{runId}/events` | Unified SSE stream for a specific run (workflow, team, agent) — supports replay via Last-Event-ID |
| GET | `/api/v1/streams/runs/events` | Global SSE stream across all runs — supports replay via Last-Event-ID |

## Teams

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/agentic/teams` | List all teams in the library |
| POST | `/api/v1/agentic/teams` | Create a new team |
| DELETE | `/api/v1/agentic/teams/{teamId}` | Delete a team |
| GET | `/api/v1/agentic/teams/{teamId}` | Get a team by ID |
| PUT | `/api/v1/agentic/teams/{teamId}` | Update an existing team |
| POST | `/api/v1/agentic/teams/{teamId}/move` | Move a team to a folder |
| GET | `/api/v1/agentic/teams/{teamId}/runs/{runId}` | Get team run status |
| POST | `/api/v1/agentic/teams/{teamId}/runs/{runId}/cancel` | Cancel a running team run |
| GET | `/api/v1/agentic/teams/{teamId}/versions` | List saved versions of a team |
| POST | `/api/v1/agentic/teams/{teamId}/versions` | Create a version snapshot of a team |
| GET | `/api/v1/agentic/teams/{teamId}/versions/{versionId}` | Get a version snapshot of a team |
| POST | `/api/v1/agentic/teams/{teamId}/versions/{versionId}/restore` | Restore a team to a saved version snapshot |

## Templates

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/templates/cover` |  |
| POST | `/api/v1/templates/export` |  |
| POST | `/api/v1/templates/import` |  |

## Uploads

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/uploads` |  |

## Voice

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/voice/status` |  |
| POST | `/api/v1/voice/transcribe` |  |

## Workflow-node-sessions

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/workflow-node-sessions/delete` |  |
| POST | `/api/v1/workflow-node-sessions/list` |  |
| POST | `/api/v1/workflow-node-sessions/open` |  |
| POST | `/api/v1/workflow-node-sessions/purge-expired` |  |

## Workflows

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/workflows` |  |
| DELETE | `/api/v1/workflows/{id}` |  |
| GET | `/api/v1/workflows/{id}` |  |
| PUT | `/api/v1/workflows/{id}` |  |
| GET | `/api/v1/workflows/{id}/stale-inputs` |  |
| GET | `/api/v1/workflows/{id}/version` |  |
| POST | `/api/v1/workflows/{workflowId}/move` |  |
| GET | `/api/v1/workflows/{workflowId}/versions` |  |
| POST | `/api/v1/workflows/{workflowId}/versions` |  |
| GET | `/api/v1/workflows/{workflowId}/versions/{versionId}` |  |
| POST | `/api/v1/workflows/{workflowId}/versions/{versionId}/restore` |  |
| GET | `/api/v1/workflows/browse` |  |
| GET | `/api/v1/workflows/folders` |  |
| POST | `/api/v1/workflows/folders` |  |
| DELETE | `/api/v1/workflows/folders/{folderId}` |  |
| PUT | `/api/v1/workflows/folders/{folderId}` |  |
| POST | `/api/v1/workflows/folders/{folderId}/move` |  |
| POST | `/api/v1/workflows/validate` |  |
