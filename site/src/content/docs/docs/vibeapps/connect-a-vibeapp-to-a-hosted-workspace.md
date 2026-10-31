---
title: "Connect a VibeApp to a hosted workspace"
description: "For developers. A VibeApp runs on your side and calls your hosted workspace. The address to give it, the key it sends, and the two kinds of key to choose between."
sidebar:
  order: 8
draft: true
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

## The key

A server that you install yourself has no sign-in, so the application sends nothing. A hosted workspace asks for a key with every call. Without one, it answers `sign_in_required`. The key goes in the header `Authorization: Bearer <key>`, and the SDK does that for you when you give it the key. There are two kinds of key for an application, and you make both under your name, in **Your API keys**.

| | Key for a website | Secret key |
|---|---|---|
| Starts with | `agp_` | `agv_` |
| Where it lives | In a web page. It is made to be seen. | On a server only: a back end, a script, a proxy. |
| What it can do | Start **one** agent, team or workflow, and follow what it started. Nothing else. | What the person who made it can do. **Read only** keys exist. |
| Limits | Only from the sites you list. A number of conversations a minute. | The rights of its maker. |

### A page that talks to one solution

1. Open your name at the bottom of the left menu, then **Your API keys**, then **New key**.
2. Choose **On a website**.
3. Choose the agent, team or workflow the page talks to.
4. List the sites that may use the key. Write each as the browser sends it, with the scheme and the port, for example `https://app.mydomain.com` or, while you develop, `http://localhost:5173`.
5. Choose how many conversations a site may start in a minute: 10, 30, 60 or 120.
6. Choose when the key ends, then create it and copy it. It is shown once.

Give it to the provider of the SDK:

```tsx
<AgentivityProvider baseUrl="https://yourname.agentivity.app" apiKey="agp_…">
  <YourScreens />
</AgentivityProvider>
```

What this key allows:

- It starts only the solution it was made for. Another one is refused with `publishable_scope`.
- It follows only the executions it started.
- It cannot list the solutions of the workspace. A page that lists solutions, like the portal of the examples, does not work with this key: give it the one solution to start.
- A call from a site that is not on the list is refused with `origin_not_allowed`. The check uses the address the browser sends, so a program outside a browser, such as a mobile or desktop app calling the workspace directly, cannot use this key.

### An application that lists solutions, or that is not in a browser

Put a small server of your own between the application and the workspace. The server holds a secret key and calls the workspace for the application. In the SDK, give the key to the client of your server code:

```ts
const client = new AgentivityPlatformClient({
  baseUrl: 'https://yourname.agentivity.app',
  apiKey: process.env.AGENTIVITY_API_KEY,
});
```

Never put a secret key in a web page or in an app that people install: anyone can read it there, and it does what you do.

## When the workspace is asleep

A hosted workspace that has been idle goes to sleep, and the first call wakes it. That can take most of a minute. By default the SDK shows a floating "Just a moment…" while a call waits, with a **Try again** button. You can change its words and its place, or turn it off with `waitNotice={false}`. See [Sleeping and updates](/docs/hosted/sleeping-and-updates/).

## If a call is refused

| Answer | What it means |
|---|---|
| `sign_in_required` | The workspace asks for a key and got none. |
| `invalid_key` | The key was revoked, has ended, or has a typo. |
| `origin_not_allowed` | A key for a website, used from a site that is not on its list. |
| `publishable_scope` | A key for a website, used for another solution than its own. |
| `too_many_starts` | Too many conversations started from one site. Try again in a minute. |
| `key_scope` | The key does not cover this call, for example a key made for MCP. |

## What was not checked

This page is written from the code of the server and of the SDK. No application was run against a hosted workspace for it. In particular, nobody checked which pages a hosted address lets call it from a browser, beyond the check of the key itself, nor the exact look of the window **New key** on a hosted workspace.

## Next step

[Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).
