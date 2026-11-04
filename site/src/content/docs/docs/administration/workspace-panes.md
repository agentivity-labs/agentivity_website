---
title: "Workspace panes: credentials, data and network"
description: "The panes of the group Workspace. Credentials, AI Assistant, Voice dictation, Configurations, Data to export or import a workspace, and Network."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/administration/workspace-panes.md. Do not edit here: edit the source and publish again. -->

The group **Workspace** of [Administration](/docs/administration/what-administration-is/) has six panes.

## Credentials

The keys and accounts that your agents, teams and workflows connect with: an AI model, a mailbox, a search service. The pane is the one described in [The Settings screen](/docs/studio/settings-theme-and-controls/) and in [Manage credentials](/docs/guides/manage-credentials/). When spaces are on, a credential is for **Every space** or **Only in** one space.

## AI Assistant

The model that the [Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/) thinks with when it builds agents, teams and workflows with you. It uses one of your model connections, and that provider bills what it costs, on that key.

- **Automatic**, the choice by default, takes the first model connection of **Credentials** that holds a key. The pane says which one it is now. When the first connection changes, so does the model of the Assistant.
- Choose a connection in the list to keep it, whatever you add later.
- With no model connection that holds a key, the pane says "No model connection yet": add one in **Credentials**, and it is used here at once.
- If the connection you chose has been deleted or has lost its key, the Assistant cannot work until you choose another one.

After the Assistant changes something that exists, its last message says what it changed.

## Voice dictation

A microphone in the chats, in the Studio and in your own apps: what is said is turned into text, then sent like a typed message. It uses OpenAI on one of your OpenAI connections, and OpenAI bills it on that key. It can be the connection of your models or the one of your images: the pane says which is which.

1. Open **Voice dictation** and turn on **Offer the mic in the chats**. The pane says "On: the mic shows next to the message field."
2. Choose the **OpenAI connection** to use. By default, the first one that holds a key.

The mic is offered only when dictation is on and a connection with a key is chosen. With no OpenAI connection, the pane says "No OpenAI connection yet". If the connection you chose is deleted or loses its key, the mic is hidden until you choose another one.

The first time, the browser asks to use the microphone. If it is refused, the chat shows how to allow it again, for the browser, for Windows and for macOS. When the device has no microphone, the chat says "No mic found".

## Configurations

![The Configurations pane](images/configurations.jpg)

**Configurations** lets you look at and change settings of the server. On a new workspace the list may be empty and say "No configurations available."

## Data

![The Data pane with Export and Import](images/data.jpg)

**Data** takes everything the workspace holds away in one file, or brings such a file into a new workspace: from your machine to the cloud, or back. Only the owner sees it.

**Export** gives a zip of readable files:

- workflows, agents, teams and prompts;
- Data Tables and their rows;
- people, roles and spaces;
- the journal.

The file never holds a secret: your credentials are not in it.

**Import** works on an empty workspace only. Everything comes back in its space and its folder. What cannot come back whole is said when it is done:

- the credentials come back empty: the message says how many to fill again in **Credentials**;
- the people are not copied with their password: the message lists those to invite again in **People**;
- Knowledge Bases read their sources again;
- what the edition of the new workspace does not have is left in the file, and the message says what.

**How to know it worked:** an import ends with a message that starts with **Brought in:** and lists what came in.

## Network

![The Network pane with the list of calls refused](images/network.jpg)

**Network** is about the calls that your steps and agents make to the outside. It shows the addresses your workspace refused, in a list **Calls refused**, so that you can see what an agent tried to reach. An address of the internal network is allowed only where the person who runs the workspace allows it. On a hosted workspace, the internal network is the host's: only Agentivity can allow an internal address.

The pane needs a sign-in and the right to manage settings.

## Next step

[Your account and API keys](/docs/administration/your-account-and-api-keys/).
