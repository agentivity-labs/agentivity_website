---
title: "API reference: the routes of the server"
description: "The list of the HTTP routes of an Agentivity server, by area, with what each one does when the product says it."
sidebar:
  order: 8
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/api.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-20 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

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
| POST | `/api/v1/ai-assistant/chat` | Chat with the AI assistant |
| POST | `/api/v1/ai-assistant/chat-stream` | Stream an AI assistant reply as events |
| POST | `/api/v1/ai-assistant/configure-node` | Configure a node from a stated intent |
| GET | `/api/v1/ai-assistant/health` | Check that the AI assistant is up |
| POST | `/api/v1/ai-assistant/suggest-nodes` | Suggest nodes for a task description |

## Assistant

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/assistant/catalog` | Read the catalog text the assistant is given |
| GET | `/api/v1/assistant/changesets` | List the assistant changesets |
| POST | `/api/v1/assistant/changesets` | Start a new assistant changeset |
| DELETE | `/api/v1/assistant/changesets/{id}` | Discard a changeset |
| GET | `/api/v1/assistant/changesets/{id}` | Get the summary of a changeset |
| PUT | `/api/v1/assistant/changesets/{id}/agent-model` | Set the model connection of the built agents |
| POST | `/api/v1/assistant/changesets/{id}/build` | Build a changeset from a light description |
| GET | `/api/v1/assistant/changesets/{id}/conversation` | Read back the conversation of a changeset |
| GET | `/api/v1/assistant/changesets/{id}/entities/{entityId}` | Get the draft of one entity in a changeset |
| POST | `/api/v1/assistant/changesets/{id}/messages` | Continue the assistant conversation of a changeset |
| POST | `/api/v1/assistant/changesets/{id}/operations` | Apply edit operations to a changeset |
| POST | `/api/v1/assistant/changesets/{id}/revert` | Revert a changeset to an earlier revision |
| POST | `/api/v1/assistant/changesets/{id}/save` | Save a changeset to the workspace |
| POST | `/api/v1/assistant/changesets/{id}/validate` | Validate the drafts of a changeset |
| POST | `/api/v1/assistant/changesets/open` | Open a saved agent, team or workflow in a changeset |
| GET | `/api/v1/assistant/connections` | List the model connections for built agents |
| POST | `/api/v1/assistant/messages` | Start a conversation with the assistant |
| GET | `/api/v1/assistant/model` | Get the model connection the assistant uses |
| GET | `/api/v1/assistant/operations` | List the operations the assistant builder accepts |
| GET | `/api/v1/assistant/workspace` | Count and fingerprint the saved workspace |

## Capabilities

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/capabilities` | Get an overview of the platform capabilities |
| GET | `/api/v1/capabilities/{kind}` | List the capabilities of one kind |
| GET | `/api/v1/capabilities/{kind}/{id}` | Get the details of one capability |
| GET | `/api/v1/capabilities/search` | Search the platform capabilities |

## Configs

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/configs` | List the configuration files |
| GET | `/api/v1/configs/{path}` | Read a configuration file |
| PUT | `/api/v1/configs/{path}` | Save a configuration file |

## Credentials

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/credentials` | List the saved credentials |
| POST | `/api/v1/credentials` | Create a credential |
| DELETE | `/api/v1/credentials/{id}` | Delete a credential |
| GET | `/api/v1/credentials/{id}` | Get one credential with its secrets masked |
| PUT | `/api/v1/credentials/{id}` | Update a credential |
| POST | `/api/v1/credentials/{id}/test` | Test a model credential against its provider |
| POST | `/api/v1/credentials/models` | List the models a connection being typed can use |
| GET | `/api/v1/credentials/templates` | List the available credential templates |

## Datatables

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/datatables` | List the Data Tables of a folder |
| DELETE | `/api/v1/datatables/{id}` | Delete a Data Table and its rows |
| GET | `/api/v1/datatables/{id}` | Get the definition of a Data Table |
| PUT | `/api/v1/datatables/{id}` | Create or update the columns of a Data Table |
| POST | `/api/v1/datatables/{id}/move` | Move a Data Table to another folder |
| GET | `/api/v1/datatables/{id}/rows` | Search the rows of a Data Table |
| POST | `/api/v1/datatables/{id}/rows` | Add a row to a Data Table |
| DELETE | `/api/v1/datatables/{id}/rows/{rowId}` | Delete a row of a Data Table |
| PUT | `/api/v1/datatables/{id}/rows/{rowId}` | Update a row of a Data Table |
| GET | `/api/v1/datatables/{id}/versions` | List the saved versions of a Data Table |
| POST | `/api/v1/datatables/{id}/versions` | Save a new version of a Data Table |
| GET | `/api/v1/datatables/{id}/versions/{versionId}` | Get one saved version of a Data Table |
| POST | `/api/v1/datatables/{id}/versions/{versionId}/restore` | Restore an earlier version of a Data Table |
| GET | `/api/v1/datatables/browse` | Browse the Data Table folders and tables |
| GET | `/api/v1/datatables/folders` | List the Data Table folders |
| POST | `/api/v1/datatables/folders` | Create a Data Table folder |
| DELETE | `/api/v1/datatables/folders/{folderId}` | Delete a Data Table folder |
| PUT | `/api/v1/datatables/folders/{folderId}` | Rename a Data Table folder |
| POST | `/api/v1/datatables/folders/{folderId}/move` | Move a Data Table folder |

## Entities

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/entities` | List all executable entities (agents, teams, workflows) from the library, optionally filtered by tag |
| PUT | `/api/v1/entities/{kind}/{id}/tags` | Set the tags of an agent, a team or a workflow (to mark it as a Solution, say) |
| GET | `/api/v1/entities/using` | For each asset (a Knowledge Base, a Data Table…), the agents and workflows that use it |

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
| POST | `/api/v1/executions/{executionId}/threads/{threadId}/messages` | Write a message in a conversation of an execution |
| POST | `/api/v1/executions/{executionId}/unpause` | Unpause the active run of an execution |

## Features

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/features` | List the features available on this server |

## Icons

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/icons` | List the icons a user can choose from, optionally filtered by set (type) or by name (q) |

## Interactions

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/interactions/slack/events` | Receive a Slack reply and resume the waiting run |

## Knowledge-bases

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/knowledge-bases` | List the Knowledge Bases |
| DELETE | `/api/v1/knowledge-bases/{id}` | Delete a Knowledge Base and what it holds |
| GET | `/api/v1/knowledge-bases/{id}` | Get a Knowledge Base |
| PUT | `/api/v1/knowledge-bases/{id}` | Create or change a Knowledge Base |
| GET | `/api/v1/knowledge-bases/{id}/documents` | The documents a Knowledge Base holds, with how many passages each gave |
| POST | `/api/v1/knowledge-bases/{id}/empty` | Empty a Knowledge Base: its documents go, its source and settings stay |
| POST | `/api/v1/knowledge-bases/{id}/move` | Move a Knowledge Base to another folder |
| POST | `/api/v1/knowledge-bases/{id}/retrieve` | Search a Knowledge Base: the passages closest to a question |
| GET | `/api/v1/knowledge-bases/{id}/status` | What a Knowledge Base holds, and how its last synchronisation went |
| POST | `/api/v1/knowledge-bases/{id}/sync` | Synchronise a Knowledge Base with its source (in the background) |
| GET | `/api/v1/knowledge-bases/{id}/versions` | List the saved versions of a Knowledge Base |
| POST | `/api/v1/knowledge-bases/{id}/versions` | Save a new version of a Knowledge Base |
| GET | `/api/v1/knowledge-bases/{id}/versions/{versionId}` | Get one saved version of a Knowledge Base |
| POST | `/api/v1/knowledge-bases/{id}/versions/{versionId}/restore` | Restore an earlier version of a Knowledge Base |
| GET | `/api/v1/knowledge-bases/browse` | Browse the Knowledge Base folders and their content |
| GET | `/api/v1/knowledge-bases/folders` | List the Knowledge Base folders |
| POST | `/api/v1/knowledge-bases/folders` | Create a Knowledge Base folder |
| DELETE | `/api/v1/knowledge-bases/folders/{folderId}` | Delete a Knowledge Base folder |
| PUT | `/api/v1/knowledge-bases/folders/{folderId}` | Rename a Knowledge Base folder |
| POST | `/api/v1/knowledge-bases/folders/{folderId}/move` | Move a Knowledge Base folder |
| GET | `/api/v1/knowledge-bases/source-types` | The types of data source a Knowledge Base can read here, with their settings |

## Llm-connections

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/llm-connections/default` | Get the default model credential |
| POST | `/api/v1/llm-connections/replace` | Point model connections at another credential |

## Metadata

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/metadata/categories` | List the node categories |
| GET | `/api/v1/metadata/nodes` | List the available node types with their ports |
| GET | `/api/v1/metadata/nodes/{nodeType}/icon.svg` | Get the SVG icon of a node type |

## Nodes

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/nodes/reconfigure` | Refresh the inputs of a workflow node |

## Prompt Engine

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/prompts` | List the prompts |
| POST | `/api/v1/prompts` | Create a prompt |
| DELETE | `/api/v1/prompts/{id}` | Delete a prompt |
| GET | `/api/v1/prompts/{id}` | Get a prompt |
| PUT | `/api/v1/prompts/{id}` | Update a prompt |
| POST | `/api/v1/prompts/{id}/analyze` | Analyze the quality of a prompt |
| GET | `/api/v1/prompts/{id}/versions` | List the saved versions of a prompt |
| POST | `/api/v1/prompts/{id}/versions` | Save a named version of a prompt |
| GET | `/api/v1/prompts/{id}/versions/{versionId}` | Get one saved version of a prompt |
| POST | `/api/v1/prompts/{promptId}/optimizations` | Start an optimization run for a prompt |
| POST | `/api/v1/prompts/{promptId}/playground/execute` | Try a prompt in the playground |
| GET | `/api/v1/prompts/{promptId}/playground/executions` | List the playground executions of a prompt |
| GET | `/api/v1/prompts/{promptId}/testcases` | List the test cases of a prompt |
| POST | `/api/v1/prompts/{promptId}/testcases` | Add a test case to a prompt |
| POST | `/api/v1/prompts/{promptId}/testcases/execute-all` | Run all the test cases of a prompt |
| GET | `/api/v1/prompts/{promptId}/testcases/executions` | List the test case executions of a prompt |
| GET | `/api/v1/prompts/browse` | Browse the prompt folders and prompts |
| GET | `/api/v1/prompts/optimizations/{id}` | Get the status of a prompt optimization run |
| POST | `/api/v1/prompts/optimizations/{id}/cancel` | Cancel a prompt optimization run |
| GET | `/api/v1/prompts/playground/executions/{id}` | Get one playground execution |
| DELETE | `/api/v1/prompts/testcases/{id}` | Delete a test case |
| GET | `/api/v1/prompts/testcases/{id}` | Get a test case |
| PUT | `/api/v1/prompts/testcases/{id}` | Update a test case |
| POST | `/api/v1/prompts/testcases/{id}/execute` | Run one test case against its prompt |
| GET | `/api/v1/prompts/testcases/executions/{id}` | Get one test case execution |

## Resources

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/resources/{id}` | Download a generated image or audio file |

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
| POST | `/api/v1/runs/{runId}/pause` | Pause a run for any entity kind |
| POST | `/api/v1/runs/{runId}/recover` | Re-enter an interrupted run from its last checkpoint |
| GET | `/api/v1/runs/{runId}/status` | Get live node/connection statuses for any entity kind (agent, team, workflow) |
| POST | `/api/v1/runs/{runId}/unpause` | Unpause a paused run for any entity kind |
| GET | `/api/v1/runs/metrics/summary` | Aggregate ROI (time-saved) metrics for the home page |

## Settings

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/settings` | Read the application settings |
| PUT | `/api/v1/settings` | Save the application settings |

## Streams

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/streams/{streamId}/events` | Primary SSE channel for an execution — full AG-UI content, one channel per execution chain |
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
| POST | `/api/v1/templates/cover` | Generate a cover picture for a Template |
| POST | `/api/v1/templates/export` | Export an agent, team or workflow as a Template |
| POST | `/api/v1/templates/import` | Import a Template file |

## Uploads

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/uploads` | Upload a file for a run to read |

## Voice

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/voice/status` | Check whether voice dictation is available |
| POST | `/api/v1/voice/transcribe` | Transcribe a recorded audio clip to text |

## Workflow-node-sessions

| Method | Path | What it does |
|---|---|---|
| POST | `/api/v1/workflow-node-sessions/delete` | Delete one stored agent session |
| POST | `/api/v1/workflow-node-sessions/list` | List the agent sessions of a session node |
| POST | `/api/v1/workflow-node-sessions/open` | Open one stored agent session |
| POST | `/api/v1/workflow-node-sessions/purge-expired` | Purge the expired sessions of a session node |

## Workflows

| Method | Path | What it does |
|---|---|---|
| GET | `/api/v1/workflows` | List all workflows |
| DELETE | `/api/v1/workflows/{id}` | Delete a workflow |
| GET | `/api/v1/workflows/{id}` | Get a workflow definition |
| PUT | `/api/v1/workflows/{id}` | Create or update a workflow |
| GET | `/api/v1/workflows/{id}/stale-inputs` | List the obsolete inputs of each workflow node |
| GET | `/api/v1/workflows/{id}/version` | Get when a workflow was last updated |
| POST | `/api/v1/workflows/{workflowId}/move` | Move a workflow to another folder |
| GET | `/api/v1/workflows/{workflowId}/versions` | List the saved versions of a workflow |
| POST | `/api/v1/workflows/{workflowId}/versions` | Save a new version of a workflow |
| GET | `/api/v1/workflows/{workflowId}/versions/{versionId}` | Get one saved version of a workflow |
| POST | `/api/v1/workflows/{workflowId}/versions/{versionId}/restore` | Restore an earlier version of a workflow |
| GET | `/api/v1/workflows/browse` | Browse the workflow folders and workflows |
| GET | `/api/v1/workflows/folders` | List the workflow folders |
| POST | `/api/v1/workflows/folders` | Create a workflow folder |
| DELETE | `/api/v1/workflows/folders/{folderId}` | Delete a workflow folder |
| PUT | `/api/v1/workflows/folders/{folderId}` | Rename a workflow folder |
| POST | `/api/v1/workflows/folders/{folderId}/move` | Move a workflow folder |
| POST | `/api/v1/workflows/validate` | Validate a workflow without saving it |
