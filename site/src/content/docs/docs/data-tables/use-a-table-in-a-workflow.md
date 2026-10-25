---
title: "Read and write a Data Table from a workflow"
description: "Add a step that adds, finds, selects, changes or deletes rows of a Data Table, so that a workflow keeps what it did."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/data-tables/use-a-table-in-a-workflow.md. Do not edit here: edit the source and publish again. -->

A workflow can keep what it did in a Data Table, and read from it. In our example, each time a payment reminder is approved, the workflow adds a row to the table `reminders`.

## What you need

- A workflow open in its editor. See [Create a workflow](/docs/workflows/create-a-workflow/).
- A Data Table with its columns. See [Create a Data Table](/docs/data-tables/create-a-data-table/).

## The two nodes

Both are in the **Nodes catalog**, under **Core** > **Data**.

| Node | Shape | What it is |
|---|---|---|
| **Data Table** | A circle | The table itself. You choose which table of your workspace it stands for. |
| **DataTable** | A box | A step that does one operation on the table. |

## Add the table and the step

1. Drag **DataTable** onto the canvas, and link it to the step before it.
2. Drag **Data Table** onto the canvas, below the step.
3. Right-click the circle **Data Table**, select **Edit**, choose your table, and select **Apply**.
4. Drag from the diamond of the circle to the diamond of the step **DataTable**. A dotted line links them.

Until a table is linked, the window of the step says "No Data Table connected".

## Choose the operation

1. Right-click the step **DataTable** and select **Edit**.
2. In **Operation**, choose what the step does.

| Operation | What it does | What you give |
|---|---|---|
| **Insert** | Adds a row. | A value for each column you want to fill. |
| **Find** | Gets one row. | The id of the row. |
| **Select** | Gets several rows. | Nothing, to get every row. Or a column and a value, to get only the rows that match. |
| **Update** | Changes a row. | The id of the row, and the new values. |
| **Delete** | Deletes a row. | The id of the row. |

3. For **Insert** and **Update**, add the values under **Column values**: select the plus button, choose a column, and give its value. A value can be typed, or it can be an output of an earlier step.
4. Select **Apply**, then **Publish**.

## Use what the step returns

The step produces outputs that the next steps can use.

| Output | What it holds |
|---|---|
| `row` | The row that was added, changed or found. |
| `rows` | The rows that were selected. |
| `count` | The number of rows concerned. |
| `success` | Whether the operation worked. |

For example, after a **Select**, a **For Each** step can repeat the next steps for each row.

## How to know it worked

1. Run the workflow. See [Run a workflow and follow each step](/docs/workflows/run-a-workflow/).
2. Open the table in **Resources** > **Data Tables**. After an **Insert**, the new row is there.

## If it does not work

- **"No Data Table connected."** The circle **Data Table** is not linked to the diamond of the step.
- **"Data Table not found."** The table was deleted, or the circle points to no table. Open the circle and choose a table.
- **"Column not found in current table."** A column was renamed or deleted since the step was set up. Open the step and choose the column again.
- **"ID is required for this operation."** **Find**, **Update** and **Delete** need the id of a row.

## Next step

[Let an agent read and fill a Data Table](/docs/data-tables/give-a-table-to-an-agent/).
