---
title: "Connect a VibeApp to a hosted workspace"
description: "For developers. A VibeApp runs on your side and calls your hosted workspace. The address to give it, and the API key that stays on your server."
sidebar:
  order: 8
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/connect-a-vibeapp-to-a-hosted-workspace.md. Do not edit here: edit the source and publish again. -->

This page is for developers. A hosted workspace does not serve VibeApps: your application runs on your machine, on your own server or as an app on a phone or a desktop, and it calls the workspace. It uses the same React SDK as with a server you install yourself. Two things change: the address, and the key.

## The address

Give the SDK the address of your workspace, with no path after it. The SDK adds `/api/v1` itself.

```text
VITE_AGENTIVITY_BASE_URL=https://yourname.agentivity.app
```

`yourname` is the name you chose when you started the workspace. See [Start a hosted workspace](/docs/hosted/start-a-hosted-workspace/).

## The ID of what the app starts

An application that starts one agent, one team or one workflow needs its ID: it tells the app which one to start. The ID stays the same when you rename the agent, the team or the workflow, or move it to another folder.

You find it in two places:

- In the editor, in the **Info** panel: the ID is at the top, in full, with a copy button. The button shows a tick for two seconds once it has copied.
- In **Studio** > **Agents & Workflows**, in the menu of the line: **Copy ID** copies it and says "ID copied".

Under the ID, the link **Use it in a VibeApp** (and **Use in a VibeApp...** in the menu of the line) opens a window that explains the same steps, with a button **Read the guide** that opens this page.

Paste the ID where your app names what to start. In the example app of the coach team, it goes in the file `.env.local`:

```text
VITE_COACH_TEAM_ID=<the ID you copied>
```

## The key

A server that you install yourself has no sign-in, so the application sends nothing. A hosted workspace asks for an **API key** (`agv_…`) with every call. Without one, it answers `sign_in_required`. The key goes in the header `Authorization: Bearer <key>`.

The key stays on a server, never in a web page or in an app that people install: anyone can read it there. A page, a mobile app or a desktop app does not hold the key. It gets a short token for each of its users from your server, which holds the key.

An administrator makes the key in **Administration** › **API keys**: see [API keys](/docs/administration/api-keys/). For an application that has users, tick the permission **Users**, and choose who they are.

### Your server holds the key

In the SDK, give the key to the client of your server code:

```ts
const client = new AgentivityPlatformClient({
  baseUrl: 'https://yourname.agentivity.app',
  apiKey: process.env.AGENTIVITY_API_KEY,
});
```

On the server, `client.keys` asks for what the page needs:

- `userToken()`: a token of fifteen minutes for one of your users, who each have their own conversations.
- `visitor()`: a token for an anonymous visitor of a demo.

### The page

The page never sees the key. It gets the token from your server and gives it to the React SDK, which asks for a new one before it expires. In the page, `client.keys` has:

- `signIn()` and `signOut()`: for the people of the workspace, who sign in with their account.
- `visitDemo(getVisitor)`: for a demo. The prop `getDemoVisitor` of `AgentivityProvider` replaces `demoAppId`.

What a user token allows:

- It starts only the Solutions the key opens, and follows its own executions.
- It reaches no Data Table and no Knowledge Base: the assets stay with the key, on your server.
- A key opens only Solutions of its own space.

## When the workspace is asleep

A hosted workspace that has been idle goes to sleep, and the first call wakes it. That can take most of a minute. By default the SDK shows a floating "Just a moment…" while a call waits, with a **Try again** button. You can change its words and its place, or turn it off with `waitNotice={false}`. See [Sleeping and updates](/docs/hosted/sleeping-and-updates/).

## If a call is refused

| Answer | What it means |
|---|---|
| `sign_in_required` | The workspace asks for an API key and got none. |
| `invalid_key` | The key was deleted or renewed, or has a typo. |
| `key_scope` | The key does not have the permission for this call: run, assets, mcp or users. |
| `key_in_page` | An API key was used in a page. Keep it on your server and use a user token in the page. |
| `key_solutions` | The key can only use the Solutions it opens and the assets of its space. |
| `key_solution` | The key does not open this Solution. Add it in **Administration** › **API keys**. |

## What was not checked

This page is written from the description of the API keys given by the developers of the server and of the SDK, not from a run: no application was run against a hosted workspace for it, nor against the image that carries the API keys. In particular, nobody checked which pages a hosted address lets call it from a browser, beyond the check of the key itself, nor the exact look of the window **New key** on a hosted workspace.

## Next step

[Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).
