---
title: "Before you put a VibeApp online"
description: "Agentivity has no login. What an application that reaches your server can do, and what to put in place before other people use it."
sidebar:
  order: 13
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/before-you-put-it-online.md. Do not edit here: edit the source and publish again. -->

Agentivity has no login today. The server does not ask who is calling, and it accepts every call. This is fine on a network you trust. It needs care before people outside your team use an application.

## What anyone who reaches the server can do

A person who can reach the address of your Agentivity server, through an application or directly, can:

- open the Studio and change or delete your agents, teams and workflows;
- start any solution, as many times as they want, with your AI model and at your cost;
- read, change and delete the rows of your Data Tables;
- add, change and delete credentials. Saved secrets are not shown.

An application does not limit this by itself. The portal lists only tagged solutions, but the server behind it answers every call.

## What to put in place

**1. Do not expose the Agentivity server directly to the internet.** Keep it on a private network.

**2. Put your own access control in front.** A reverse proxy, or your own small server, that:

- asks people to sign in, with the system your company already uses;
- lets through only the calls your application needs: listing solutions, starting an execution, following it, answering it, and the rows of the tables it uses;
- blocks everything else, including the Studio, for people who are not builders.

**3. Limit the pages that may call the server.** By default, the server accepts calls from any web page. Start it with the address of your application only, with the setting `Cors__AllowedOrigins__0=https://app.mydomain.com`. Without it, any website opened by a visitor who can reach your server can call it in the background. This helps against other sites. It does not replace the access control of the step above: a script is not a web page, and it is not stopped. See [Who can call the API](/docs/getting-started/install-community/#who-can-call-the-api).

**4. Keep the Studio for the builders.** Reach it from the private network only.

**5. Limit the cost.** Each request uses your AI model. Limit how many requests one person can send, in your proxy or in your application. Set a spending limit with your model provider if it offers one.

**6. Be careful with what agents can do.** A solution open to other people should not have tools that send messages or change data without an approval. See [Give tools to an agent](/docs/agents/give-tools-to-an-agent/).

## What Agentivity does not record

Agentivity does not know who made a request or who approved a step. If you need this record, keep it in your application or in your proxy.

## Planned

Accounts, roles and rights are planned, and they are not available yet.

## Next step

Back to [What a VibeApp is](/docs/vibeapps/what-a-vibeapp-is/).
