---
title: "API keys"
description: "Make an API key for an outside system (a SaaS, a script, a website's server, an AI assistant), choose its space, what it opens and what it may do."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/administration/api-keys.md. Do not edit here: edit the source and publish again. -->

An **API key** (`agv_…`) lets an outside system run the Solutions of a space and use its assets. The outside system can be a SaaS, a script, the server of a website or of a mobile app, or an AI assistant. It keeps the key on its server and does only what you allow. You make keys in **Administration** › **API keys**.

<!-- IMAGE images/api-keys.jpg: Administration, API keys pane: the list of keys, with their space, their permissions and what they open. -->

## What a key is

There is one kind of key. Personal keys, keys "On a website" and the secrets of Apps no longer exist, and keys made before are not carried over: make new API keys.

- **A key is never a person.** An administrator makes it and owns it. The owner can change, and the key keeps working when its owner leaves. It never has the rights of whoever made it.
- **It belongs to a space.** It reaches nothing of another space.
- **It opens only Solutions.** The ones you choose one by one, or every Solution of the space, including ones added later. See [What a Solution is, and how to mark one](/docs/introduction/what-a-solution-is/).
- **It stays on a server.** Never put it in a web page or in an app that people install: anyone can read it there.
- **It builds nothing.** Agents, teams and workflows are made in the Studio only.

## What you need

- A workspace with a sign-in, and the right "Manage the API keys".
- Solutions in the space the key will reach.

How many keys a plan allows is in [Plans and their limits](/docs/hosted/plans-and-limits/).

## Make a key

1. In **Administration** › **API keys**, select **New key**.
2. Give it a **Name**: the system that uses it, so you can recognize the key. For example `Client portal of Acme`.
3. Choose its **Space**. The key reaches this space only: its Solutions and its assets.
4. Under **What it may do**, tick what the key is for:

   | Permission | What it lets the system do |
   |---|---|
   | **Run** | Start the Solutions it opens and follow their executions: answer, pause, resume, stop. |
   | **Assets** | Read and write the rows of the space's Data Tables, and search its Knowledge Bases. It never creates them or changes their structure. |
   | **MCP** | Let an AI assistant (Claude, ChatGPT, Cursor…) use the Solutions it opens. |
   | **Users** | Your server gets a short-lived token for each of its users. Each user has their own conversations. |

5. Under **What it opens**, tick **Every Solution of the space, including ones added later**, or select **Choose Solutions** and pick them. To choose Solutions one by one in another space, switch to that space first.
6. If you ticked **Users**, say who its users are:

   | Choice | For |
   |---|---|
   | **The users of your system** | A SaaS, a client site, a mobile app with its own accounts. Your server vouches for each user, who never signs in here. |
   | **People of this workspace** | An internal app (HR, Finance…). Its users sign in with their account here and find their conversations in the Studio. |
   | **Visitors of a demo** | A showcase or a public page. Anyone can use it without signing in, with their own conversations: a few a day, erased after a few days. |

7. Set the limits. **Executions a minute** (above this, the system is asked to wait a minute). For a demo: **Executions a day, for each visitor**, **Executions a day, all visitors together** (above this, the demo asks visitors to come back tomorrow, so its cost per day has a limit), and **Conversations of visitors erased after** a number of days.
8. Select **Make the key**.

<!-- IMAGE images/api-key-new.jpg: The window New API key, with its name, space, permissions and what it opens. -->

## The key is shown once

A window shows the key. Put it on the server of the system that uses it, never in a page or an app. **Copy it now: it is shown only this once.** The instance keeps only a fingerprint of the key, so it cannot show it again.

The window then says what to do, depending on the permissions:

- **Run.** Your server sends the key with each call, in the header `Authorization: Bearer <key>`.
- **MCP.** Add the MCP server to your AI assistant with that header. See [Connect an AI assistant](/docs/guides/connect-an-ai-assistant/).
- **Users, the users of your system.** Your server asks for a token for each of its users, with `POST /api/v1/keys/user-tokens` and `{ userId, name, email }`. Your page gives it to the React SDK, which asks for a new one before it expires.
- **Users, visitors of a demo.** Your server asks for a visitor token for each new page, with `POST /api/v1/keys/visitors`. Your page gives it to the React SDK, which keeps it between visits.
- **Users, people of this workspace.** Your page signs its users in with their account in this workspace, with `POST /api/v1/keys/{id}/sign-in`.

A user token lasts fifteen minutes. A user token can only run the Solutions the key opens. The assets stay with the key, on your server: a user token reaches no Data Table and no Knowledge Base.

## Change, renew or delete a key

The row of a key shows its owner and when it was last used, and offers:

- **Copy the id of the key.**
- **Change.** Its name, space, permissions, what it opens, its limits and its owner. The owner is the person responsible for the key, who must be a current member of the workspace.
- **Renew.** The current key stops working at once: put the new one on the server that uses it. Its users keep working until their token expires.
- **Delete.** The system that uses it, and its users, can no longer reach your Solutions. Their conversations and executions are kept. This cannot be undone.

## How to know it worked

The key shows in the list with its space, its permissions and what it opens, and the row says when it was last used. The system that uses it starts a Solution with the key.

## If a call is refused

| Answer | What it means |
|---|---|
| `sign_in_required` | This instance requires an API key (`agv_…`). An administrator makes one in the Studio, under **API keys**. Keep it on your server. |
| `invalid_key` | This API key is not valid: it was deleted or renewed, or it is mistyped. |
| `key_scope` | This API key may not do this. In the Studio, give it the permission it needs: run, assets, mcp or users. |
| `key_in_page` | An API key must stay on your server. Your pages use a user token, which your server gets with the key. |
| `key_solutions` | This API key can only use the Solutions it opens and the assets of its space. |
| `key_solution` | This API key does not open this Solution. In the Studio, add it to the Solutions the key opens. |

A user token that is not valid or has expired is refused too: ask your server for a new one. "Too many new visitors this hour" asks the page to come back later.

## Next step

[Connect a VibeApp to a hosted workspace](/docs/vibeapps/connect-a-vibeapp-to-a-hosted-workspace/).
