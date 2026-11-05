---
title: "Core nodes: conditions, loops, data and code"
description: "Reference of the Core nodes of the Node Catalog: If, Switch, For Each, First Of, data, variables, files, display and JavaScript."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/nodes-core.md. Do not edit here: edit the source and publish again. -->

<!-- Written from a running server by tools/reference.mjs. Do not edit this page by hand. -->

The building blocks of a workflow that use no AI: conditions, loops, data, variables, files, display and code.

This page lists 24 nodes. [How to read a node reference](/docs/reference/nodes/).

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

Displays a generated or referenced image directly on the node, and in the chat when a channel is connected.

**When to use it.** To see an image made by an earlier step, such as an image generator, right on the canvas, or in the run's chat. It passes the image on unchanged.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `value` | ImageRef | yes |  | The image to display: an image generator's output (`some_node.image`), an address (https://…), or an image in base64. |
| `caption` | Text | no |  | Optional: the text under the image in the chat. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `value` | ImageRef | The same image reference, passed through unchanged. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

**Places for resources**

| Place | Required | Accepts | How many |
|---|---|---|---|
| **Channel** | yes | `interaction.channel.*` | 1 |

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

## Core > Image

Steps that change an image on the server: crop, resize, text, logo.

### Image Adjust

Step · in the catalogue: Core > Image · type `core.image.adjust`

Changes the brightness, contrast and saturation of an image, blurs or sharpens it, on the server.

**When to use it.** To retouch an image: lighter, more contrast, black and white (saturation -100), a soft blur behind a text, a sharper photo. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `brightness` | Number | no | `0` | From -100 (darker) to 100 (lighter); 0 changes nothing. |
| `contrast` | Number | no | `0` | From -100 to 100; 0 changes nothing. |
| `saturation` | Number | no | `0` | From -100 (black and white) to 100 (vivid); 0 changes nothing. |
| `blur` | Number | no | `0` | Blur radius in pixels; 0 for none. |
| `sharpen` | Number | no | `0` | Sharpening, from 0 (none) to 100. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Crop

Step · in the catalogue: Core > Image · type `core.image.crop`

Crops an image to a shape around its subject, or to a rectangle in pixels, on the server.

**When to use it.** To keep the part of an image that matters: a square or a portrait cut around its subject, or an exact rectangle. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `shape` | Choice | no | `1:1` | The shape kept: the largest part of it around the focus, or the rectangle below. Choices: `1:1`, `4:5`, `3:4`, `2:3`, `9:16`, `16:9`, `3:2`, `4:3`, `area`. |
| `focus_x` | Number | no | `50` | Where the crop centres across, in percent of the width. |
| `focus_y` | Number | no | `50` | Where the crop centres down, in percent of the height. |
| `x` | Number | no | `0` | Left of the rectangle, in pixels. |
| `y` | Number | no | `0` | Top of the rectangle, in pixels. |
| `width` | Number | no |  | Width of the rectangle, in pixels; the rest of the image when empty. |
| `height` | Number | no |  | Height of the rectangle, in pixels; the rest of the image when empty. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Edit

Step · in the catalogue: Core > Image · type `core.image.edit`

Crops, resizes, fits to a platform's format, adjusts, writes a text and lays a logo on an image, on the server.

**When to use it.** To make an image ready to post without another tool: fit it to an Instagram post, a story or LinkedIn, crop it on its subject, add a title or a logo, change its file format. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `operations` | Text | no | `[]` | The operations, as a JSON list done in its order: crop, resize, fit, rotate, flip, adjust, blur, sharpen, text, overlay, border, round. For example [{"op": "fit", "size": "story"}, {"op": "text", "text": "5 tips", "position": "top", "size": 7}, {"op": "overlay", "image": "https://…/logo.png", "width": 15}]. Sizes: "1080x1350" or instagram_square, instagram_portrait, story, linkedin, linkedin_square, x, facebook, youtube_thumbnail, pinterest. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Fit

Step · in the catalogue: Core > Image · type `core.image.fit`

Puts an image to a platform's format (Instagram, story, LinkedIn, X…) or to a size, on the server.

**When to use it.** To make an image the size a platform asks for: the whole image with the space left filled by itself blurred, or filling the format cropped around its subject. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `size` | Choice | no | `instagram_square` | The format: a platform's, or custom for the width and height below. Choices: `instagram_square`, `instagram_portrait`, `story`, `linkedin`, `linkedin_square`, `x`, `facebook`, `youtube_thumbnail`, `pinterest`, `custom`. |
| `width` | Number | no |  | Width in pixels, for a custom size. |
| `height` | Number | no |  | Height in pixels, for a custom size. |
| `mode` | Choice | no | `pad` | How the image takes the format. Choices: `pad`, `cover`, `contain`, `stretch`. |
| `fill` | Choice | no | `blur` | What fills the space left, in the Whole image mode. Choices: `blur`, `color`, `transparent`. |
| `fill_color` | Text | no | `#FFFFFF` | The colour of the space left, as a hex code: #FFFFFF. |
| `focus_x` | Number | no | `50` | Where the crop centres across, in percent of the width (Fill mode). |
| `focus_y` | Number | no | `50` | Where the crop centres down, in percent of the height (Fill mode). |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Frame

Step · in the catalogue: Core > Image · type `core.image.frame`

Puts a border around an image and rounds its corners, on the server.

**When to use it.** To frame an image: a white or coloured border, rounded corners as on a card. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `border_width` | Number | no | `20` | Width of the border, in pixels; 0 for none. The border makes the image larger. |
| `border_color` | Text | no | `#FFFFFF` | Colour of the border, as a hex code: #FFFFFF. |
| `corner_radius` | Number | no | `0` | Radius of the rounded corners, in pixels; 0 for square corners. Kept by PNG and WebP, not JPEG. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Overlay

Step · in the catalogue: Core > Image · type `core.image.overlay`

Lays another image over an image (a logo, a watermark), at a place and a width, on the server.

**When to use it.** To put a logo or a watermark on an image. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `overlay` | ImageRef | yes |  | The image to lay: a logo's address (https://…), a step's image, or an image in base64. A PNG keeps its transparency. |
| `position` | Choice | no | `bottom-right` | Where it goes. Choices: `top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`. |
| `width` | Number | no | `20` | Its width, in percent of the image's width. |
| `margin` | Number | no | `4` | Space from the edges, in percent of the image's shorter side. |
| `opacity` | Number | no | `100` | Its opacity, from 0 (invisible) to 100. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Text

Step · in the catalogue: Core > Image · type `core.image.text`

Writes a text over an image (a title, a caption), wrapped to its width, on the server.

**When to use it.** To put a title or a caption on an image itself, in the words given, exactly: an image model would misspell it. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `text` | Text | yes |  | The text to write. A new line starts a new line. |
| `position` | Choice | no | `bottom` | Where the text goes. Choices: `top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`. |
| `size` | Number | no | `6` | Size of the letters, in percent of the image's height. |
| `bold` | Boolean | no | `true` | Bold letters. |
| `color` | Text | no | `#FFFFFF` | Colour of the letters, as a hex code: #FFFFFF. |
| `background` | Text | no |  | A band behind the text, as a hex code with its transparency last (#00000080); empty for none. |
| `shadow` | Boolean | no | `true` | A shadow under the letters, when there is no band. |
| `margin` | Number | no | `5` | Space from the edges, in percent of the image's shorter side. |
| `max_width` | Number | no | `90` | Widest a line may be, in percent of the image's width. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

**Entries.** **In** (Entry point)

**Exits.** **Out** (Default output port)

### Image Transform

Step · in the catalogue: Core > Image · type `core.image.transform`

Rotates an image by an angle and flips it as in a mirror, on the server.

**When to use it.** To turn a photo the right way up, or mirror it. Nothing is sent to any provider.

**Fields**

| Name | Type | Required | Default | What it is |
|---|---|---|---|---|
| `image` | ImageRef | yes |  | The image: an image generator's output (`some_node.image`), another image step's, an address (https://…), or an image in base64. |
| `rotate` | Number | no | `0` | Angle to turn, in degrees, clockwise; 0 for none. |
| `background` | Text | no |  | Colour of the corners an angle leaves, as a hex code; empty for transparent. |
| `flip` | Choice | no | `none` | Flips it as in a mirror, after turning it. Choices: `none`, `horizontal`, `vertical`. |
| `format` | Choice | no | `auto` | File format of the image made. Choices: `auto`, `png`, `jpeg`, `webp`. |
| `quality` | Number | no | `90` | Quality of a JPEG or WebP, from 1 to 100. |

**Outputs**

| Name | Type | What it holds |
|---|---|---|
| `image` | ImageRef | The edited image. |
| `width` | Number | Its width in pixels. |
| `height` | Number | Its height in pixels. |

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
