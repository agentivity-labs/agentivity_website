---
title: "Create a Data Table"
description: "How to create a Data Table in the Studio and give it its first columns."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/data-tables/create-a-data-table.md. Do not edit here: edit the source and publish again. -->

This page shows how to create a Data Table in the Studio and give it its first columns.

## What you need

- Agentivity running, with the Studio open.

## Create the table

1. In the menu on the left, open **Resources** > **Data Tables**.
2. Select **New Data Table**.
3. In **Table name**, type a name, for example `reminders`.
4. Select **Create**.

The table appears in the list.

## Give it its columns

1. Double-click the table to open it. A new table already has three columns that Agentivity fills itself: **id**,
   **createdAt** and **updatedAt**. It says "No rows yet".
2. Select **Add column**, at the top right.
3. In **Column name**, type the name, for example `customer`. In **Type**, choose the kind of value, for example
   **Text**. Select **Save**.
4. Add the other columns the same way.

The details of each setting of a column are in [Look at a Data Table and change its columns](/docs/data-tables/view-and-change-a-table/).

A table can also come ready-made: a Template that carries tables adds them to your workspace when you import it. For
example, **Trip Manager Team** adds two tables. See [Try a ready-made solution](/docs/getting-started/try-a-ready-made-solution/).

## Name tables and columns well

- Use short names in lower case, with an underscore between words: `reminders`, `invoice_number`, `sent_on`.
- Name a table after what one row is: `reminders`, not `data`.
- Agents read these names to understand the table. A clear name is a better instruction than a long explanation.

## How to know it worked

The table is in the list of **Resources** > **Data Tables**, and it opens with its columns.

## Next step

[Look at a Data Table and change its columns](/docs/data-tables/view-and-change-a-table/).
