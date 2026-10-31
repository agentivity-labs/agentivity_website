---
title: "Settings, theme and the small controls of the Studio"
description: "Credentials and Configurations, the status bar, the light and dark themes, the accent colour, the Getting started button and the messages."
sidebar:
  order: 8
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/studio/settings-theme-and-controls.md. Do not edit here: edit the source and publish again. -->

This page covers the Credentials and Configurations panes, then the small controls that stay on screen in every section of the Studio.

## Credentials and Configurations

In the menu on the left, **Administration** opens with two panes, **Credentials** and **Configurations**. On a workspace with sign-in, they are in the group **Workspace** of **Administration**, with **Data** and **Network**: see [Workspace panes](/docs/administration/workspace-panes/).

### Credentials

Credentials are the keys and the accounts that your agents, teams and workflows connect with: an AI model, a mailbox, a search service.

![The screen Credentials, with one connection to an AI model: its name, its provider, and its key shown as dots](images/credentials.jpg)

- The connections are sorted by what they are for, for example **AI models**.
- A secret value, such as an API key, is shown as dots. It is never shown again after you save it.
- **Search credentials** finds a connection by its name.

| Control | What it does |
|---|---|
| **New credentials** | Opens the window **New connection**, where you choose what to connect to. |
| The pencil | Changes a connection. To replace a secret, type the new value. |
| The two sheets | Makes a copy of a connection. |
| The bin | Deletes a connection. The Studio asks you to confirm. |

To add the connection of an AI model, see [Connect an AI model](/docs/guides/connect-a-model/).

### Configurations

![The screen Configurations on a new installation: the message No configurations available](images/configurations.jpg)

**Configurations** lets you look at and change settings of the server. On a new installation the list is empty and says "No configurations available."

### Good to know

- This area was called **Settings** in earlier versions. It is now **Administration**, which also holds the panes for people, roles, spaces, usage and, on a hosted workspace, the subscription: see [Administration, who sees what](/docs/administration/what-administration-is/).
- In the Community edition there is no login. Anyone who can open the Studio can open these panes, and can add, change or delete connections. A secret that is already saved is not shown to them.
- On a workspace with sign-in, a person sees a pane only if their role allows it.

## The status bar

The bar at the bottom of the Studio shows the state of the live connection between your browser and the engine.

| Text | Meaning |
|---|---|
| **Realtime connected** | The Studio receives what happens in the engine as it happens. |
| **Realtime reconnecting** | The live connection is lost and the Studio tries to get it back. |

While the bar says **Realtime reconnecting**, the screens do not update by themselves. An execution can be further than what you see, and the chat of an execution can stay empty. Use the refresh buttons, or load the page again.

A security program or a company proxy that inspects the traffic of your machine can block this connection.

## The account menu: theme and guide

At the bottom of the menu on the left, select the card with your name. The account menu opens.

| Control | What it does |
|---|---|
| **Appearance**: the sun | Switches to the light theme. |
| **Appearance**: the moon | Switches to the dark theme. |
| **Appearance**: the list with a coloured dot | Changes the accent colour of the Studio. |
| **Getting started** | Opens the [welcome guide](/docs/getting-started/welcome-guide/) again. |

The theme and the colours of your drawings are independent. The theme gives the background, the text and the shapes. The colours of agents, members and steps come from their groups: see [Choose a colour](/docs/teams/set-up-a-member/#choose-a-colour).

## The menu on the left can fold

The two small arrows at the top of the menu fold it into a column of icons, and open it again. **Ctrl+B** (**Cmd+B** on a Mac) does the same. The Studio remembers your choice.

## Messages

When something went well or not, a message appears at the bottom of the screen, on a floating white card with a coloured mark: a green tick when it went well, an amber **!** for a warning, a red cross for an error. For example, "Workflow published".

## Next step

Back to [Find your way around the Studio](/docs/studio/find-your-way-in-the-studio/).
