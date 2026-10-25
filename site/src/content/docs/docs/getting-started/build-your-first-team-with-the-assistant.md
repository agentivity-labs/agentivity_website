---
title: "Build your first team with the Assistant"
description: "Describe the team you need in your own words. The Assistant asks questions, shows a plan and builds a draft that you check and save."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/getting-started/build-your-first-team-with-the-assistant.md. Do not edit here: edit the source and publish again. -->

The Assistant is the part of the Studio that builds for you. You describe what you need, as you would to a colleague. The Assistant asks what it needs to know, shows a plan, then builds a draft. Nothing is added to your workspace until you save.

This page builds a team of three: a researcher, a writer and a reviewer. A team is several agents that work together. An agent is one AI specialist with a role.

## What you need

- Agentivity running, with the Studio open. See [Install Agentivity with Docker](/docs/getting-started/install-community/).
- A model connection. The Assistant uses an AI model to work, and so do the agents it builds. See [Connect an AI model](/docs/guides/connect-a-model/).

## Describe the team

1. In the menu on the left, select **Assistant**.
2. Select **New solution**. The screen asks **What would you like to build?** and proposes three examples. You can select one to start from it.
3. At the top of the conversation, **Agents run on** shows the model connection that is used. Choose another one in the list if you have several.
4. In the field at the bottom, describe the team. For example:

   ```text
   A team of three that writes a one-page note about a topic I give: a researcher, a writer and a reviewer.
   ```

5. Send your message.

## Answer and agree on a plan

1. The Assistant may ask a question, with choices. Select a choice, or type your own answer.
2. The Assistant shows its plan in plain words. Read it. Tell it to go ahead, or tell it what to change.

## Look at the draft

When you agree, the Assistant builds. The right side of the screen draws what it builds, live: the team, its members and how they are linked. Below the drawing, a list shows everything the draft is made of.

At this point the draft is marked **Draft · not saved**. Your workspace has not changed.

You can keep talking in the same conversation: ask for a change, add a member, or ask the Assistant what could go wrong with this team.

## Save the team

1. Select **Save**, at the top right.
2. The window shows **What is added** to your workspace and **Where it goes**. Check both.
3. Select **Save** to add the draft to your workspace, or **Not yet** to go back to the conversation.

## How to know it worked

- The Assistant shows **Saved to your workspace**.
- Select **Open in the editor**. The team opens in its editor, with its three members on the canvas.
- The team and its agents are in **Studio** > **Agents**.

## If it does not work

- **"The model did not answer."** The Assistant could not reach the AI model. Check your model connection in **Administration** > **Credentials**: the key, and the credit on the provider's side. Also check that the machine where Agentivity runs can reach the internet.
- **"The assistant is not available: its module is not loaded in this platform."** This installation does not include the Assistant. Install the current image again: see [Install Agentivity with Docker](/docs/getting-started/install-community/).
- **You do not like the draft.** Ask for a change, or remove the conversation. Removing a draft changes nothing in your workspace.

## Good to know

- The conversations stay in the list **Solutions**, on the left. Select one to continue it.
- **Work on an existing one** opens something you already have in the Assistant, in a new conversation. Nothing changes until you save.
- When the Assistant needs a connection, only its name is shared with the Assistant, never its secrets.
- What the Assistant builds is an ordinary team. You can change it by hand afterwards: see [Create a team of agents](/docs/teams/create-a-team/).

## Next step

[Run a team and read its work](/docs/teams/run-a-team/).
