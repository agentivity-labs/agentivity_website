---
title: "Connect an AI assistant (MCP)"
description: "Let an AI assistant such as Claude Code or Cursor run your agents, teams and workflows as tools, with a key made for it and the address of your workspace."
sidebar:
  order: 8
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/connect-an-ai-assistant.md. Do not edit here: edit the source and publish again. -->

An AI assistant can use your agents, teams and workflows as tools. You ask the assistant for something in its own window, and it asks Agentivity to run the right solution and brings the answer back. Agentivity does this over MCP, the protocol that assistants use to connect to tools.

## What Agentivity offers

- **One address.** The server is at `/mcp` on your workspace. On a hosted workspace that is `https://yourname.agentivity.app/mcp`, with your own workspace name. It uses streamable HTTP.
- **A key.** On a workspace with sign-in, the assistant gives a key made for it, as `Authorization: Bearer <key>`. A key made for MCP opens this server and nothing else.
- **Your rights.** What the assistant starts is started as the person who made the key, and it is kept in the history of executions like any other.
- **Nothing kept between two calls.** Each call is answered on its own.

The MCP server is not an extra to buy. On the hosted plans it is part of the workspace. The Community edition has no sign-in, so there it asks for no key: anyone who can reach the server can use it, as with the rest of it. See [Keep your server private](/docs/guides/keep-your-server-private/).

## Make the key

1. Open your name at the bottom of the left menu, then **Your API keys**.
2. Select **New key** and choose **AI assistant (MCP)**.
3. Choose when the key ends: **In 30 days**, **In 90 days**, **In a year** or **Never**.
4. Create the key and copy it. It is shown once. The window also shows the address to give to the assistant, and the header to send with it.

**Revoke** stops a key at once. How many keys a plan allows is in [Plans and their limits](/docs/hosted/plans-and-limits/). More about keys: [Your account and API keys](/docs/administration/your-account-and-api-keys/).

## Add the server to the assistant

Each assistant has its own way. For Claude Code, one command adds it:

```bash
claude mcp add --transport http agentivity https://yourname.agentivity.app/mcp --header "Authorization: Bearer <key>"
```

Replace the address with your own, and `<key>` with the key you copied. Cursor and other assistants that can reach an HTTP server ask for the same two things: the address and the header.

This page was written from the code. No assistant was run against a workspace to write it, so check the command with the version of your assistant.

## The tools the assistant sees

- **One tool for each agent, team or workflow** you may run. The tool takes one text, `input`: what to ask or give it. Its name comes from the name of the solution, with the start of its id, so two solutions with the same name stay two tools. Its description is the role you wrote for it. Write a clear role: it is what the assistant reads to choose.
- **More than 50 of them:** the assistant sees two tools instead. **find** lists the ones whose name or role holds the words asked, with their id, and **run** runs the one with that id.
- **The answer.** The tool gives the answer of what it ran, and its named outputs if it has any. If the execution fails, the assistant gets the reason as an error.

## What to know

- **A sleeping workspace is slow to answer.** A hosted workspace that has been idle goes to sleep. The first call wakes it, and that took about 28 seconds on a workspace we measured. An assistant that gives up sooner will fail on that call: send it again. See [Sleeping and updates](/docs/hosted/sleeping-and-updates/).
- **An execution that waits for a person does not wait for the assistant.** If a solution asks a person, the tool answers only that it waits, with the number of the execution. The question is answered in the Studio, as for any execution. See [Let an agent ask a person](/docs/agents/let-an-agent-ask-a-person/).
- **The assistant waits for the end.** A long execution keeps the call open until it finishes. If your assistant limits how long a tool may take, start with short solutions.
- **A web page cannot call it.** A page of another site is refused. An assistant outside a browser is not.
- **No sign-in through OAuth.** The server takes a key, not an OAuth sign-in. An assistant that can only connect with OAuth, ChatGPT for example, cannot connect yet. This was read in the code, and not tried with such an assistant.
