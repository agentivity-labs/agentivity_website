---
title: "Core nodes: conditions, loops, data and code"
description: "Reference of the Core nodes of the Node Catalog: If, Switch, For Each, First Of, data, variables, files, display and JavaScript."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-core.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-14 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The building blocks of a workflow that use no AI: conditions, loops, data, variables, files, display and code.

This page lists 16 nodes. [How to read a node reference](/docs/reference/nodes/).

## Core > Code

Custom script nodes.

### JavaScript

Step · in the catalogue: Core > Code · type `core.code.javascript`

Runs a JavaScript script (a real, sandboxed Node.js process) and returns its result.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `timeoutSeconds` | Number | no | `5` | Execution timeout in seconds. |
| `code` | Text | no | `1 + 1;` | JavaScript source. Reference a prior node's output directly, e.g. `some_node.field` — it's substituted into the script before it runs. The last evaluated expression becomes `output` — no `return` needed unless you wrap your own function. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

## Core > Control Flow

Loops, conditions, branching.

### First Of

Step · in the catalogue: Core > Control Flow · type `core.firstof`

Selects the first available value from multiple inputs. Does not wait for all connections.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `mode` | Text | no | `passThrough` | Selection mode: 'passThrough', 'preferFirst', 'preferNonNull'. |
| `wait_for_all` | Boolean | no | `false` | Wait for all connections before selecting. |
| `value1` | Text | no |  | Manual value for input1 (if not connected). |
| `value2` | Text | no |  | Manual value for input2 (if not connected). |
| `value3` | Text | no |  | Manual value for input3 (if not connected). |
| `value4` | Text | no |  | Manual value for input4 (if not connected). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `value` | Text | Selected value |
| `source` | Text | Which input provided the value |
| `inputs_received` | Number | Number of inputs that were received |

**Entries.** **Input 1** (First input), **Input 2** (Second input), **Input 3** (Third input (optional)), **Input 4** (Fourth input (optional))

**Exits.** **Out** (Selected output)

### For Each

Step · in the catalogue: Core > Control Flow · type `core.foreach`

Iterates over a collection, executing connected nodes for each item.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `collection` | Text | yes |  | JSON array or state key to iterate over. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `current_item` | Text | Current iteration item |
| `current_index` | Number | Current iteration index (0-based) |
| `total_count` | Number | Total number of items in collection |
| `is_first` | Boolean | True if this is the first item |
| `is_last` | Boolean | True if this is the last item |
| `results` | Text | All iteration results (after completion) |
| `count` | Number | Number of completed iterations |

**Entries.** **In** (Entry point to start iteration)

**Exits.** **Loop** (Execute for each item in collection), **Out** (Continue after all iterations complete)

### If

Step · in the catalogue: Core > Control Flow · type `core.if`

Evaluates a condition and branches execution to either the true or false path.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `conditions` | Structured | no | `{"combinator":"all","rows":[]}` | Structured conditions (field, operator, value rows) — used instead of `condition` when it has rows. Build it with the condition builder instead of writing an expression. |
| `condition` | Boolean | no |  | The condition to evaluate. Ignored when `conditions` has rows. |
| `true_branch_label` | Text | no |  | Optional label for the true branch (for debugging). |
| `false_branch_label` | Text | no |  | Optional label for the false branch (for debugging). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Boolean | The evaluated condition result |
| `branch_taken` | Text | The branch that was taken (true or false) |

**Entries.** **In** (Entry point)

**Exits.** **True** (Execute this path if condition is true), **False** (Execute this path if condition is false)

### Switch

Step · in the catalogue: Core > Control Flow · type `core.switch`

Evaluates a value and routes execution to different branches based on matching cases.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `value` | Text | yes |  | Value to evaluate. |
| `mode` | Text | no | `exact` | Matching mode: 'exact', 'contains', 'regex'. |
| `default_branch` | Text | no | `default` | Default branch if no case matches. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `matched_case` | Text | The case value that matched |
| `branch_taken` | Text | The branch port that was taken |

**Entries.** **In** (Entry point)

## Core > Data

Data manipulation.

### Collect

Step · in the catalogue: Core > Data · type `core.collect`

Collects items into an array across multiple executions.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `item` | Text | yes |  | Item to add to the collection. |
| `reset` | Boolean | no | `false` | Clear collection before adding. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `items` | Text | All collected items as an array |
| `count` | Number | Number of items in collection |

### Data Table

Resource · in the catalogue: Core > Data · type `workspace.datatable`

References a shared Data Table asset (schema and rows managed under Resources).

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `table_id` | AssetRef | yes |  | The shared Data Table asset to bind to. |

**Plugs into** a place that accepts `data.table.*`.

### DataTable

Step · in the catalogue: Core > Data · type `core.datatable`

Provides CRUD operations on a shared Data Table asset.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `operation` | Choice | yes | `select` | Operation to perform. Choices: `insert`, `update`, `delete`, `select`, `find`. |
| `data` | Text | no |  | Data for insert/update (object). |
| `id` | Number | yes |  | Row ID for update/delete/find. |
| `where_column` | Text | no |  | Column name for where clause (select). |
| `where_value` | Text | no |  | Value for where clause (select). |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `row` | Text | Affected row (insert/update/find) |
| `rows` | Text | Selected rows (select) |
| `success` | Boolean | Operation succeeded |
| `count` | Number | Number of affected/selected rows |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Data Table** | yes | `data.table.*` | 1 |

### Merge

Step · in the catalogue: Core > Data · type `core.merge`

Merges two objects into one, with overlay properties overriding base.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `base` | Text | no |  | Base object to merge into. |
| `overlay` | Text | yes |  | Object whose properties override base. |
| `deep` | Boolean | no | `false` | Deep merge nested objects. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `result` | Text | Merged object |

## Core > Display

Nodes that render a value directly on the canvas.

### Audio Player

Display step · in the catalogue: Core > Display · type `core.display.audio`

Displays a generated or referenced audio file directly on the node.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `value` | AudioRef | yes |  | The audio to display. Bind it to a text-to-speech node's output, e.g. `some_node.audio`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `value` | AudioRef | The same audio reference, passed through unchanged. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Console

Display step · in the catalogue: Core > Display · type `core.display.console`

Displays a value — text, numbers, or JSON — directly on the node.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `value` | Text | yes |  | The value to display. Bind it to any prior node's output, e.g. `some_node.output`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `value` | Text | The same value, passed through unchanged. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Viewer

Display step · in the catalogue: Core > Display · type `core.display.image`

Displays a generated or referenced image directly on the node.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `value` | ImageRef | yes |  | The image to display. Bind it to an image generator's output, e.g. `some_node.image`. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `value` | ImageRef | The same image reference, passed through unchanged. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

## Core > File

File-related workflow nodes.

### File Exists

Step · in the catalogue: Core > File · type `core.file.exists`

Checks if a file exists at the specified path.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `file_path` | Text | yes |  | Path to the file to check. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `exists` | Boolean | True if the file exists, false otherwise |
| `file_path` | Text | The file path that was checked |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### File Is Fresh

Step · in the catalogue: Core > File · type `core.file.is_fresh`

Checks if a file exists and was modified within the specified time window.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `file_path` | Text | yes |  | Path to the file to check. |
| `max_age_minutes` | Number | no |  | Maximum age in minutes for the file to be considered fresh. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `isFresh` | Boolean | True if the file exists and is fresh, false otherwise |
| `exists` | Boolean | True if the file exists |
| `file_path` | Text | The file path that was checked |
| `age_minutes` | Number | Age of the file in minutes (if it exists) |
| `last_modified` | Text | Last modification time (ISO 8601 format) |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

## Core > Variables State

Variable and workflow state management.

### Set Variables

Step · in the catalogue: Core > Variables State · type `core.set`

Sets workflow variables from parameters or state values.

**Outputs**

One output per field configured in the node, named after the field.

**Exits.** **Out** (Default output port)

## Core > Workflow

Sub-workflow orchestration.

### Workflow

Step · in the catalogue: Core > Workflow · type `workflow_node`

Calls another workflow of your library with a message, and gives what it produced.

**Effects.** costs, runs other things.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `entity_id` | Text | yes |  | The workflow of your library to call. |
| `input` | Text | yes |  | Message sent to the workflow. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `output` | Text | The final answer of the workflow. |

Any named output that the workflow itself declares is added next to this one, under its own name.

**Entries.** **In** (Entry point)

**Exits.** **Out** (The answer of the workflow), **Error** (Execution error if any)
