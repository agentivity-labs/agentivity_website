---
title: "Find your way around the Studio"
description: "A tour of the Agentivity Studio. What each entry of the menu is for, and what the home page shows: shortcuts, counters, executions that need you."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/studio/find-your-way-in-the-studio.md. Do not edit here: edit the source and publish again. -->

The Studio is the visual editor of Agentivity. It runs in your browser. This page shows where things are, so that the other pages are easier to follow.

## What you need

- Agentivity running, with the Studio open in your browser. See [Install Agentivity with Docker](/docs/getting-started/install-community/).

![The home page of the Studio: the menu on the left, four shortcuts at the top, the counters, and the panel Active and needs attention](images/home.jpg)

## The menu on the left

At the top of the menu, the logo and two small arrows (**«**) fold the menu into a column of icons. Select **»**, or the logo of the folded menu, to open it again. **Ctrl+B** (**Cmd+B** on a Mac) does the same. The Studio remembers your choice.

Under the logo, the **Space** switcher says which space you work in: see [People, groups, roles and spaces](/docs/administration/people-groups-roles-spaces/). It is there in every edition: the Community edition has one space, **General**.

| Entry | What you do there |
|---|---|
| **Home** | See what is running and what is waiting for you, and start something new. |
| **Assistant** | Describe what you need in your own words. The Assistant builds an agent, a team or a workflow as a draft. See [Build your first team with the Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/). |
| **Templates** | Ready-made solutions to import, and **Import from file** for a Template you received. |
| **Studio** > **Agents** | The list of your agents and your teams. Open one to change it or to run it. |
| **Studio** > **Workflows** | The list of your workflows. |
| **Studio** > **Prompts** | The prompts you write and test. A prompt is the text of instructions that is sent to an AI model. |
| **Studio** > **Executions** | The executions: each time an agent, a team or a workflow worked on a request. |
| **Resources** > **Data Tables** | Tables of data that your agents and workflows can read and fill. |
| **Resources** > **Knowledge Bases** | Your documents, pages and feeds, kept so that agents can search them by meaning. See [What a Knowledge Base is for](/docs/knowledge-bases/what-a-knowledge-base-is/). |
| **Administration** | **Credentials**, where you keep the keys and accounts your agents connect with, **Configurations**, and, when the workspace asks for a sign-in, the people, the roles and more. See [Administration, who sees what](/docs/administration/what-administration-is/). |

If you do not know the difference between an agent, a team and a workflow, read [Choose between an agent, a team and a workflow](/docs/introduction/agent-team-or-workflow/).

At the bottom of the menu, a card shows your name and your edition (for example **Business · Owner**). Select it to open your account menu:

- **Your account** and **Your API keys**: see [Your account and API keys](/docs/administration/your-account-and-api-keys/);
- **Appearance**: the sun and the moon switch between a light and a dark screen, and a list changes the accent colour;
- **Getting started** opens the [welcome guide](/docs/getting-started/welcome-guide/) again;
- **Sign out**, on a workspace that asks for a sign-in.

## The home page

The home page is the first screen of the Studio. It greets you by your first name ("Good morning, Alex") and says in one sentence what the week looked like, for example "Your workspace ran 2 executions this week and saved about 15 minutes. One thing waits for you." It lets you start something new, and it shows what your workspace did recently.

### The two buttons

At the top right:

- **Ask the Assistant** opens the Assistant, to build from a description. See [Build your first team with the Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/).
- **New** opens a menu: **Agent**, **Team** or **Workflow**. Each one asks for a name.

### The four cards

| Card | What it does |
|---|---|
| **A workflow** | Asks for a name, then opens a new workflow in its editor. See [Create a workflow](/docs/workflows/create-a-workflow/). |
| **An agent** | Asks for a name, then opens a new agent in its editor. See [Create an agent](/docs/agents/create-an-agent/). |
| **A team** | Asks for a name, then asks how the members work together. See [Create a team of agents](/docs/teams/create-a-team/). |
| **From a template** | Opens the [Templates screen](/docs/studio/templates/). |

### The counters

| Counter | What it counts |
|---|---|
| **Executions this week**, **Executions this year** | The number of executions of your agents, teams and workflows. |
| **Saved this week**, **Saved this year** | An estimate of the time these executions saved, in minutes. |

### The recent activity

- **Recent activity · last 14d** is a chart with one bar per day, for the last fourteen days.
- The grid next to it shows the activity over a longer period, one square per day. Move the pointer over a square to read the date and the time saved. The small **i** at its corner explains the grid.

### Active & needs attention

This block lists the executions that are in progress and the executions that need you. A running execution and a failed one carry a label, **Running** or **Failed**. An execution that waits for a person has the button **Answer**, which opens it so that you can reply. When there is nothing, it says "Nothing running and nothing waiting on you right now." For the complete list, open the [Executions screen](/docs/studio/executions/).

## The list of agents and teams

![The list of agents and teams: the title and the buttons New agent and New team on the first row, the search field and the tools on the second, and one line per agent or team with its type and its description](images/agents-list.jpg)

**Studio** > **Agents** shows agents and teams in the same list. The column **Type** says which one each line is.

- **New agent** and **New team** create one, at the top right.
- The search field, on the second row, finds an agent or a team by its name.
- The panel on the left holds folders, to keep your work in order.

## An editor

When you open an agent or a team, its editor takes the place of the list. Every editor has the same parts:

- a bar at the top: on the left, the path (for example **Workflows** > the name), in the middle a switch **Editor** | **Execution** (**Editor** to build, **Execution** to run and to see what happened), and on the right the state of the work and **Publish**, which saves your changes;
- a canvas in the middle, a white box where the agent, the team or the workflow is drawn;
- a panel on the right, with icon tabs: **Info** has the name and the role.

## Each screen in detail

- [The lists of agents, teams and workflows](/docs/studio/lists-of-agents-teams-and-workflows/)
- [An editor, its canvas, panels and buttons](/docs/studio/editor/)
- [The Executions screen](/docs/studio/executions/)
- [The Templates screen](/docs/studio/templates/)
- [Settings, theme and the small controls of the Studio](/docs/studio/settings-theme-and-controls/)

## How to know it worked

You can open **Home**, **Assistant**, **Studio** > **Agents** and **Administration** from the menu, and each one shows the screen described above.

## Next step

[Build your first team with the Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/), or [try a ready-made solution](/docs/getting-started/try-a-ready-made-solution/) first.
