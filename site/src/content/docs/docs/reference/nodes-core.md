---
title: "Core nodes: conditions, loops, data and code"
description: "Reference of the Core nodes of the Node Catalog: If, Switch, For Each, First Of, data, variables, files, display and JavaScript."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-core.md. Do not edit here: edit the source and publish again. -->

Generated on 2026-10-20 from a running server by `tools/reference.mjs`. Do not edit this page by hand.

The building blocks of a workflow that use no AI: conditions, loops, data, variables, files, display and code.

This page lists 16 nodes. [How to read a node reference](/docs/reference/nodes/).

## Core > Code

Custom script nodes.

### JavaScript

Step · in the catalogue: Core > Code · type `core.code.javascript`

Runs a JavaScript script (a real, sandboxed Node.js process) and returns its result.

**When to use it.** To compute something no other step does, such as a total, a date or a reshaped JSON, with a short JavaScript script. Each field of the object the script returns becomes an output of the step.

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

**When to use it.** To go on with whichever branch has run, when only one of several branches runs, for example a value read from storage or else computed. Not for choosing a path: use If or Switch instead.

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

Goes through a list one item at a time, and runs the steps connected to Loop for each of them.

**When to use it.** To repeat the same steps for every item of a list: a JSON list, or a list given by an earlier step. To gather what each item produces into one list, add a Collect step in the loop.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `collection` | Text | yes |  | The list to go through: a JSON list, or a list given by an earlier step. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `current_item` | Text | The item being handled |
| `current_index` | Number | Its place in the list, counting from 0 |
| `total_count` | Number | How many items the list has |
| `is_first` | Boolean | Whether it is the first item |
| `is_last` | Boolean | Whether it is the last item |
| `count` | Number | How many items are done |

**Entries.** **In** (Starts going through the list)

**Exits.** **Loop** (Runs once for each item of the list), **Out** (Goes on once every item is done)

### If

Step · in the catalogue: Core > Control Flow · type `core.if`

Evaluates a condition and branches execution to either the true or false path.

**When to use it.** To take one of two paths depending on a condition, for example whether a value is empty or above a threshold. For more than two paths, use Switch instead.

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

**When to use it.** To send the flow down one of several paths depending on a value, for example a category chosen by an AI step, with a default path when nothing matches. For a simple yes or no, use If instead.

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

**When to use it.** To gather into one list what the steps inside a For Each produce for each item, for example one summary per document. Each time it runs it adds one item and gives the whole list so far.

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

**When to use it.** To choose which Data Table, created under Resources, a DataTable step works on. It does nothing by itself: connect it to a DataTable step.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `table_id` | AssetRef | yes |  | The shared Data Table asset to bind to. |

**Plugs into** a place that accepts `data.table.*`.

### DataTable

Step · in the catalogue: Core > Data · type `core.datatable`

Provides CRUD operations on a shared Data Table asset.

**When to use it.** To add, change, delete or look up rows of a Data Table during a run, or to compute totals on it with one read-only SQL SELECT. Connect a Data Table step to say which table.

**Effects.** writes in the workspace.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `operation` | Choice | yes | `select` | Operation to perform. Choices: `insert`, `update`, `delete`, `select`, `find`, `query`. |
| `sql` | Text | no |  | One read-only SQL SELECT on the table, which it names datatable (query): totals, groups, averages… e.g. SELECT customer, SUM(amount) AS total FROM datatable GROUP BY customer. Done by the database, on this table only; at most 'limit' rows, with the total. |
| `data` | Text | no |  | Data for insert/update (object). |
| `id` | Number | yes |  | Row ID for update/delete/find. |
| `where` | Text | no |  | Conditions a row must all meet (select), as JSON: [{ "column": "amount", "op": ">", "value": 100 }]. Operators: =, !=, contains, starts_with, >, >=, <, <=, between, is_empty, is_not_empty; 'between' takes [lowest, highest]. |
| `where_column` | Text | no |  | Column name for where clause (select). |
| `where_value` | Text | no |  | Value for where clause (select). |
| `order_by` | Text | no |  | How to sort the rows found (select), e.g. "amount desc, customer" — by id when empty. |
| `limit` | Number | no |  | The most rows to give (select, query) — 1000 at most, and when empty; 0 gives only the total (select). |
| `offset` | Number | no |  | How many rows found to skip (select), to read the next page. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `row` | Text | Affected row (insert/update/find) |
| `rows` | Text | Selected rows (select) |
| `success` | Boolean | Operation succeeded |
| `count` | Number | Number of affected/selected rows |
| `total` | Number | Number of rows the select found in all, even beyond its limit |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Data Table** | yes | `data.table.*` | 1 |

### Merge

Step · in the catalogue: Core > Data · type `core.merge`

Merges two objects into one, with overlay properties overriding base.

**When to use it.** To combine two JSON objects into one, the fields of the second replacing those of the first, for example default settings and the values of the current item. Not for lists: use Collect to build a list.

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

**When to use it.** To listen to audio made by an earlier step, such as text-to-speech, right on the canvas. It passes the audio on unchanged.

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

**When to use it.** To see a value (text, number or JSON) right on the canvas while building or checking a workflow. It passes the value on unchanged.

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

**When to use it.** To see an image made by an earlier step, such as an image generator, right on the canvas. It passes the image on unchanged.

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

**When to use it.** To check whether a file is on the server's disk at a given path, for example to skip work already done. For a file that must also be recent, use File Is Fresh instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `file_path` | Text | yes |  | Path to the file to check. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `exists` | Boolean | Whether the file exists |
| `file_path` | Text | The file path that was checked |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### File Is Fresh

Step · in the catalogue: Core > File · type `core.file.is_fresh`

Checks if a file exists and was modified within the specified time window.

**When to use it.** To reuse a file saved earlier on the server's disk only while it is recent enough (24 hours unless you set a maximum age in minutes), and make it again otherwise. To only check that it is there, use File Exists instead.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `file_path` | Text | yes |  | Path to the file to check. |
| `max_age_minutes` | Number | no |  | Maximum age in minutes for the file to be considered fresh. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `isFresh` | Boolean | Whether the file exists and is not older than the maximum age |
| `exists` | Boolean | Whether the file exists |
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

**When to use it.** To give names to values, typed in the step or taken from earlier steps, so later steps can use them under those names. Handy at the start of a workflow to gather its settings in one place.

**Outputs**

One output per field configured in the node, named after the field.

**Exits.** **Out** (Default output port)

## Core > Workflow

Sub-workflow orchestration.

### Workflow

Step · in the catalogue: Core > Workflow · type `workflow_node`

Calls another workflow of your library with a message, and gives what it produced.

**When to use it.** To run another workflow of your library as one step of this one, and use what it produced. If that workflow waits for a person, this one waits with it.

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
