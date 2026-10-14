---
title: "Keep your Agentivity server private"
description: "Agentivity has no login. Who can reach it, what they can do, and how to keep the server on a network you trust."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/keep-your-server-private.md. Do not edit here: edit the source and publish again. -->

Agentivity has no login today. The Studio opens for anyone who can reach its address. This page explains what this means and what to do about it.

## What anyone who reaches the server can do

- Open the Studio, and change or delete agents, teams, workflows and tables.
- Start any run, with your AI model and at your cost.
- Read the rows of your Data Tables.
- Add, change and delete credentials. A secret that is already saved is shown as dots and is not given back.
- Answer a question that a run asks a person.

Agentivity does not record who did what.

## Who can reach the server

The start command of the install page has `-p 5005:5005`. It opens port 5005 of your machine to every network the machine is connected to.

- **On your own computer, at home or behind an office firewall**: people on the same network can reach it, with the address of your machine.
- **On a server with a public address**: the whole internet can reach it, unless a firewall stops it.

## Keep it to your own machine

If only you use Agentivity, from the machine where it runs, make the port reachable from that machine only. Use this start command instead of the usual one:

```bash
docker run -d --name agentivity -p 127.0.0.1:5005:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
```

The Studio then opens at `http://localhost:5005` on that machine, and nowhere else.

## Share it with a team

When several people must reach the Studio:

- **Keep the server on your private network.** Do not give it a public address.
- **From outside, go through your VPN**, the secure connection your company already uses to reach its network.
- **Or put your own access control in front**: a reverse proxy that asks people to sign in before it lets them through. Ask the person who manages your network.
- **Use a firewall** to allow only the machines that need it.

## Limit the web pages that may call it

By default, the server accepts calls from any web page. That is made to be easy while you build. It means that any website opened by a person who can reach your server could call it in the background.

If other people reach your server, start it with the addresses of your own applications only:

```text
-e Cors__AllowedOrigins__0=https://app.mydomain.com
```

Add `__1`, `__2` for more addresses. This does not replace the protections above: it stops other websites, not scripts. The Studio is not concerned, since the server delivers it itself. See [Who can call the API](/docs/getting-started/install-community/#who-can-call-the-api).

## Do not

- Do not open port 5005 on a router or on a cloud firewall "just to test".
- Do not put the address of the Studio in a public place.

## Limit the damage

- **Back up often.** See [Update Agentivity and back up your data](/docs/guides/update-and-back-up/).
- **Set a spending limit** with your AI model provider, if it offers one.
- **Use a key that is only for Agentivity.** If you must replace it, nothing else breaks.

## If other people must use what you built

Do not give them the Studio. Give them a portal or an application, with your own access control in front. See [Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).

## Planned

Accounts, roles and rights are planned, and they are not available yet.

## Next step

[Fix a failed installation](/docs/guides/if-the-install-fails/).
