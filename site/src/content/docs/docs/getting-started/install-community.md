---
title: "Install Agentivity with Docker"
description: "Run the free Agentivity Community edition on your own machine or server with one Docker command, then open the Studio in your browser."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/getting-started/install-community.md. Do not edit here: edit the source and publish again. -->

This page gets Agentivity running on your own machine or server. It takes a few minutes.

## What you need

- A computer or a server that can run Docker: Docker Desktop on Windows or macOS, Docker Engine on Linux. If you do not have it yet, [get Docker](https://docs.docker.com/get-started/get-docker/).
- An API key from an AI model provider. You can add it after the install: see [Connect an AI model](/docs/guides/connect-a-model/).

## Start Agentivity

Run this command in a terminal:

```bash
docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
```

What the command does:

- `-p 5005:5005` makes Agentivity reachable on port 5005 of your machine. If that port is already used, change the first number, for example `-p 8080:5005`, and open port 8080 instead.
- `-v agentivity-data:/app/_data` keeps your data in a Docker volume named `agentivity-data`, so it survives a restart or an update.
- `--name agentivity` gives the container a name, so you can stop and start it easily.

## Open the Studio

In your browser, on the machine where Agentivity runs, open:

```text
http://localhost:5005
```

The Studio opens with a short welcome guide. This is where you build your agents, teams and workflows.

**How to know it worked:** you see the Studio in your browser. If the page does not load, check that the container is running with `docker ps`.

## Who can call the API

Agentivity has no sign-in, no password and no token yet. Anyone who can reach the server can use it. Sign-in will come with the cloud versions.

**To try it and to develop, there is nothing to set.** By default, the server accepts calls from any web page: a VibeApp or a sample served from another port, another machine or another domain works at once. Calls that do not come from a browser (a script, a mobile application, another server) have always been accepted.

This is easy, and it is not secure. Do it on your own machine, or on a network you trust.

**For a real production, do two things.**

1. **Limit the pages that may call the server to those of your VibeApp.** Give their addresses when you start the container, one setting for each address:

   ```bash
   docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data \
     -e Cors__AllowedOrigins__0=https://app.mydomain.com \
     agentivitylabs/agentivity
   ```

   For another address, add `Cors__AllowedOrigins__1`, then `__2`, and so on. Without this setting, any website opened by a visitor who can reach your server can call it in the background.

2. **Do not expose the server without protection**, since it has no sign-in. Put it behind a proxy in HTTPS that controls who gets in, or limit it with a firewall to the people and machines that must use it.

The Studio is not concerned: the server delivers it itself, so it always calls the server from its own address.

## Good to know

- **There is no login yet.** Anyone who can reach the server can use it. See [Who can call the API](#who-can-call-the-api).
- **Your data stays with you.** Agents, teams, workflows, tables and settings are stored in the `agentivity-data` volume. Back it up like any other data. What you send in an AI step goes to the model provider you chose.
- **Stop and start.** Use `docker stop agentivity` to stop it and `docker start agentivity` to start it again. Your data is kept.
- **Updating.** Pull the new image, remove the container, then run the start command again. The volume keeps your data.

  ```bash
  docker pull agentivitylabs/agentivity
  docker rm -f agentivity
  ```

- **Licence.** The Community edition is source available under the [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license): you can use it for your own business, on your own server, free of charge.

## If something goes wrong

See [Fix a failed installation](/docs/guides/if-the-install-fails/). To keep your data safe and to update, see [Update Agentivity and back up your data](/docs/guides/update-and-back-up/). Before other people reach your server, read [Keep your Agentivity server private](/docs/guides/keep-your-server-private/).

## Next step

[Connect an AI model](/docs/guides/connect-a-model/), so that your agents have something to think with.
