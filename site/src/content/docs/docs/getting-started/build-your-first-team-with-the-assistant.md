---
title: "Build your first team with Winston"
description: "Describe the team you need in your own words. Winston, your AI builder, asks questions, shows a plan and builds a draft that you check and publish."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/getting-started/build-your-first-team-with-the-assistant.md. Do not edit here: edit the source and publish again. -->

Winston, your AI builder, is the part of the Studio that builds for you. You describe what you need, as you would to a colleague. He asks what he needs to know, shows a plan, then builds a draft. Nothing is added to your workspace until you publish.

This page builds a team of three: a researcher, a writer and a reviewer. A team is several agents that work together. An agent is one AI specialist with a role.

## What you need

- Agentivity running, with the Studio open. See [Install Agentivity with Docker](/docs/getting-started/install-community/).
- A model connection. Winston uses an AI model to work, and so do the agents he builds. See [Connect an AI model](/docs/guides/connect-a-model/).

## Describe the team

1. In the menu on the left, select **Winston**. On the home, you can also tell him what you want to automate, in the field, or select **Ask Winston**.
2. Select **New solution**. The screen asks **What would you like to build?** and proposes three examples. You can select one to start from it.
3. At the top of the conversation, **Agents run on** shows the model connection that is used. Choose another one in the list if you have several.
4. In the field at the bottom, describe the team. For example:

   ```text
   A team of three that writes a one-page note about a topic I give: a researcher, a writer and a reviewer.
   ```

5. Send your message.

## Answer and agree on a plan

1. Winston may ask a question, with choices. Select a choice, or type your own answer.
2. He shows his plan in plain words. Read it. Tell him to go ahead, or tell him what to change.

## Look at the draft

When you agree, Winston builds. The right side of the screen draws what he builds, live: the team, its members and how they are linked. Below the drawing, a list shows everything the draft is made of.

At this point the draft is marked **Draft · not published**. Your workspace has not changed.

You can keep talking in the same conversation: ask for a change, add a member, or ask Winston what could go wrong with this team.

## Publish the team

1. Select **Publish**, at the top right.
2. The window shows **What is published** and **Where it goes**. Check both.
3. Select **Publish** to add the draft to your workspace, or **Keep as draft** to go back to the conversation and finish it later with Winston.

**Publish and open** does both: it publishes, then opens the team in its editor. If something you built was changed in your workspace after Winston started the draft, the window says so, and you choose between keeping the draft and overwriting.

## How to know it worked

- The conversation shows **Published to your workspace**.
- Select **Open in the editor**. The team opens in its editor, with its three members on the canvas.
- The team and its agents are in **Studio** > **Agents & Workflows**.

After a change, the draft says **Published · changes not published yet**. Ask for the change, then publish again.

## If it does not work

- **"The model did not answer."** Winston could not reach the AI model. Check your model connection in **Administration** > **Credentials**: the key, and the credit on the provider's side. Also check that the machine where Agentivity runs can reach the internet.
- **"Winston is not available: his module is not loaded on this platform."** This installation does not include Winston. Install the current image again: see [Install Agentivity with Docker](/docs/getting-started/install-community/).
- **You do not like the draft.** Ask for a change, or discard the conversation. Discarding a draft changes nothing in your workspace.

## Good to know

- The conversations stay in the list **Solutions**, on the left. Select one to continue it.
- **Work on an existing one**, or **Improve with Winston**, opens something you already have, in a new conversation. Nothing changes until you publish. Winston works on what is saved: changes of the editor that are not saved yet are not seen by him.
- When Winston needs a connection, only its name is shared with him, never its secrets.
- A connection you did not ask for stays empty: Winston says it is yours to choose, and you choose it in the step. When the work needs to tell a team something, he offers the applications you could use (Slack, Teams or e-mail) and you decide which.
- Winston does not build cockpits and does not publish to the Desk: that is yours to do. See [Publish Solutions to the Desk](/docs/desk/publish-solutions-to-the-desk/).
- What Winston builds is an ordinary team. You can change it by hand afterwards: see [Create a team of agents](/docs/teams/create-a-team/).
- Which model Winston thinks with is set in **Administration** > **Winston**. See [The panes of Workspace](/docs/administration/workspace-panes/).

## Next step

[Run a team and read its work](/docs/teams/run-a-team/).
