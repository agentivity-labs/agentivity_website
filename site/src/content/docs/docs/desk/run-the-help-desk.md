---
title: "Run the help desk"
description: "Answer the requests of the people of the Desk in the Studio, write internal notes, pass a request to Agentivity, and set up the teams and categories."
sidebar:
  order: 15
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/desk/run-the-help-desk.md. Do not edit here: edit the source and publish again. -->

The help desk is where the requests of the people of the Desk arrive. They ask in the Desk, see [Ask for help in the Desk](/docs/desk/ask-for-help-in-the-desk/). The agents of the help desk answer in the Studio, in **Help desk**. This page is for those agents, and for the leads who set the help desk up.

## What you need

- The role **Helpdesk agent** to answer, or **Helpdesk lead** to answer and to set the help desk up. An administrator gives them in **Administration** › **People**. These roles give no other right on the workspace: no administration comes with them.
- A help desk set up by a lead. Until then, the page says "Your lead has not set up the help desk yet. Its requests show here once people may ask."

## Open the inbox

In the side bar of the Studio, under **Desk**, select **Help desk**. The page says what it is for: "What the people of the Desk ask, answered by your teams. Pass to Agentivity what is beyond them."

The views are tabs, each with its count:

| View | What it shows |
|---|---|
| **Open** | Requests still to handle. |
| **Mine** | Those assigned to you. |
| **My teams** | Those of the categories your teams answer. |
| **Nobody on it** | Those nobody took yet. |
| **Late** | Those with no answer past the target of a first answer. |
| **Waiting for the person** | Those that wait for the reply of the person. |
| **With Agentivity** | Those you passed to the support of Agentivity. |
| **Resolved**, **Closed**, **All** | The rest. |

The search field finds a request by its number (for example `HD-1001`), a subject or a person. A request shows the time it has left before it is late.

## Answer a request

Select a request. Its thread opens, with its properties beside it: the person and their other requests, its **Status**, its **Priority** (**Low**, **Normal**, **High** or **Urgent**), its **Assignee** and its team.

- **Take it** or **Assign to me** puts you on it.
- Write your answer and select **Reply**, or **Send and resolve** to answer and close at once. **Saved replies** inserts a reply your lead prepared.
- **Add note** writes an **internal note**, in amber: "The person does not see it". Only the help desk reads it.
- **Resolve** closes it. **Reopen** brings it back.
- If the conversation of the person is joined, you can open it to look at what happened: copy its ID and find it in **Executions**.

The person is told by e-mail when you answer, and you are told by e-mail when they reply.

## Pass a request to Agentivity

When a request is beyond your teams, select **Escalate to Agentivity**. Say what you need from them, and choose whether to join the conversation with the person. Notes are never joined. The request moves to **With Agentivity**, and you follow the thread and the status of the support of Agentivity in it.

Only a workspace hosted by Agentivity can pass requests to its support. On another workspace, the action says it is unavailable.

**Ask Agentivity**, at the top, is for your own questions to the support: see [Get help from Agentivity](/docs/studio/help-and-support/).

## Set up the help desk (leads)

The first time, a lead selects **Set up the help desk**. Later, **Set up** is at the top of the page. It holds:

- **Teams.** A team answers the categories given to it, and its members see them in **My teams**. Without a team, every agent sees what is asked in a category. Members are people who have the role Helpdesk agent.
- **Categories.** What people choose from when they ask, in the order you give: a name, a short description shown to people, and a colour. A help desk set for the first time starts with four: a Solution gives a wrong answer, request a new Solution, an access, and something else. The lead changes them or takes them away before saving.
- **Saved replies.** Answers the agents use often, each with a title and a text.
- **Target of a first answer.** A target, never a promise: a request without an answer past it shows as late.

Select **Save**. The page says "The help desk is set up." People can ask once it is.

## How to know it worked

A request made in the Desk shows in the inbox, in **Open** and in the views of its category. Your answer shows in the thread of the person, and they get an e-mail.

## If it does not work

- **"The help desk is for its agents."** You do not have the role. Ask an administrator to give you **Helpdesk agent**, in **Administration** › **People**.
- **A team cannot be saved.** Give every team and every category a name, and make sure its members have the role Helpdesk agent.
- **"The support of Agentivity cannot be reached right now."** Its thread shows again as soon as it answers.

## Next step

[Find and manage your conversations](/docs/desk/find-and-manage-conversations/), or [Build a cockpit](/docs/desk/build-a-cockpit/).
