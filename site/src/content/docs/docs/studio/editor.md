---
title: "An editor, its canvas, panels and buttons"
description: "The parts that the agent editor, the team editor and the workflow editor have in common. Tabs, canvas, side panel, menus and Publish."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/studio/editor.md. Do not edit here: edit the source and publish again. -->

Agents, teams and workflows each open in an editor. The three editors are built the same way. This page names their parts.

![The editor of an agent: the tabs Editor and Execution at the top, the agent drawn on the canvas, the bar of execution buttons, and the Node Catalog on the right](images/agent-editor.jpg)

## At the top

- **The path.** It shows where you are, for example Workflow Studio, then the name of what you edit. In a workflow, a star after the name means there are changes that are not saved.
- **The tabs Editor and Execution.** **Editor** is where you build. **Execution** is where you run and see what happened.
- **Publish**, at the top right. It saves your changes. It is highlighted when there is something to save.
- In a team, the pattern of the team is shown next to **Publish**.

## The canvas

The canvas is the large area in the middle, where the agent, the team or the workflow is drawn.

- **Drag** an element to move it.
- **Right-click** an element to open its menu. **Edit** opens its settings.
- **Drag from one dot to another** to link two steps. **Drag from one diamond to another** to plug something into a step.

## The buttons at the bottom left

| Button | What it does |
|---|---|
| The first one | Brings the whole drawing into view. |
| The magnifier with a plus | Zooms in. |
| The magnifier with a minus | Zooms out. |

In the agent and workflow editors, a small map at the bottom right shows the whole drawing and the part you are looking at.

## The bar of execution buttons

Above the canvas, a small bar has four buttons: **Run**, **Pause**, **Resume** and **Stop**.

## The two buttons next to the panel

| Button | What it does |
|---|---|
| The box | Opens **Create a Template**, to pack what you are editing into one file. |
| The sparkle | Opens the Assistant on what you are editing. |

## The panel on the right

The panel has two tabs.

| Tab | Agent and workflow | Team |
|---|---|---|
| The first tab, **Info** | The name, the role and the tags. | The same, and **Max agent iterations**. |
| The second tab | The **Node Catalog**: everything you can add to the canvas. | **Members**: the agents, teams and workflows you can add to the team. |

![The editor of a workflow, with the Node Catalog open: the categories of nodes, and a search field](images/workflow-editor.jpg)

## The menu of an element

Right-click an element of the canvas. The menu has, depending on the element:

| Entry | What it does |
|---|---|
| **Explain with the assistant** | Asks the Assistant what this element does. |
| **Improve with the assistant…** | Asks the Assistant to change it. |
| **Improve its instructions…** | For an agent: asks the Assistant to make its instructions clearer. |
| **Edit** | Opens the settings of the element. |
| **Inspect...** | Opens the inspection of the element. |
| **Duplicate**, **Copy** | Make a copy. |
| **Bring to front**, **Send to back**, **Bring forward**, **Send backward** | Change which element is drawn above the others. |
| **Delete** | Removes the element. |

## The window of settings

**Edit** opens a window with the settings of the element.

- Each field can hold a **Fixed value**, which you type, or an **Expression**, which is computed when it runs.
- The panel **Outputs**, on the right, lists what the earlier steps produce, with their exact names.
- **Apply** keeps your changes and closes the window. **Cancel** closes it without keeping them.

Changes are saved in your workspace only when you select **Publish**.

## When you leave an editor

- **A workflow with changes that are not saved**: the Studio asks what to do. **Keep editing** stays in the editor, **Discard** loses the changes, **Publish** saves them.
- **A team**: the Studio does not ask. Publish before you leave.

## In the tab Execution

Below the canvas, three tabs show an execution: **Inspector**, **Errors** and **Logs**. See [Run a workflow and follow each step](/docs/workflows/run-a-workflow/).

## Next step

[The Executions screen](/docs/studio/executions/).
