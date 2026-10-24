---
title: "Update Agentivity and back up your data"
description: "Keep a copy of your Agentivity data in one file, restore it, and move to a newer version of the Docker image without losing anything."
sidebar:
  order: 2
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/update-and-back-up.md. Do not edit here: edit the source and publish again. -->

This page is for the Community edition, which you install yourself. In a hosted workspace Agentivity updates the product for you, and announces it in the Studio: see [When your workspace sleeps or is updated](/docs/hosted/sleeping-and-updates/). To keep a copy of a hosted workspace, the owner uses **Administration** > **Data** > **Export**: see [Workspace panes](/docs/administration/workspace-panes/).

Everything you build in Agentivity is kept in one Docker volume. This page shows how to copy it to a file, how to bring it back, and how to update Agentivity.

A Docker volume is a storage space that Docker keeps apart from the container. It stays when the container is removed.

## What you need

- Agentivity installed as in [Install Agentivity with Docker](/docs/getting-started/install-community/): a container named `agentivity`, and a volume named `agentivity-data`.
- A terminal on the machine where Agentivity runs.

## What the volume holds

| In the volume | What it is |
|---|---|
| Agents and teams | What you see in **Studio** > **Agents**. |
| Workflows | What you see in **Studio** > **Workflows**. |
| Data Tables and their rows | What you see in **Resources** > **Data Tables**. |
| Knowledge Bases | What you see in **Resources** > **Knowledge Bases**: their source and their settings, and what they hold. |
| Prompts | What you see in **Studio** > **Prompts**. |
| The drafts of the Assistant | The conversations of the section **Assistant**. |
| Credentials | Your keys and accounts. |

The backup file holds your credentials. Keep it as carefully as a password.

## Back up

1. Stop Agentivity, so that nothing changes during the copy.

   ```bash
   docker stop agentivity
   ```

2. Copy the volume into a file in the current folder.

   ```bash
   docker run --rm -v agentivity-data:/data:ro -v "$(pwd):/backup" alpine tar czf /backup/agentivity-data.tar.gz -C /data .
   ```

3. Start Agentivity again.

   ```bash
   docker start agentivity
   ```

The second command starts a small temporary container that reads the volume and writes the file `agentivity-data.tar.gz`. On Windows, run it in PowerShell or in Git Bash.

**How to know it worked:** the file `agentivity-data.tar.gz` is in the current folder, and it is not empty.

## Restore

To bring a backup back, on the same machine or on another one:

1. Stop and remove the container, if there is one.

   ```bash
   docker rm -f agentivity
   ```

2. Fill the volume from the file. Run this in the folder that holds the file.

   ```bash
   docker run --rm -v agentivity-data:/data -v "$(pwd):/backup" alpine tar xzf /backup/agentivity-data.tar.gz -C /data
   ```

3. Start Agentivity with the usual command.

   ```bash
   docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
   ```

If the volume already holds data, the files of the backup replace the files that have the same name. To start clean, remove the volume first with `docker volume rm agentivity-data`. This deletes what it holds.

## Update Agentivity

1. Back up, as above.
2. Get the new image.

   ```bash
   docker pull agentivitylabs/agentivity
   ```

3. Remove the old container. The volume is kept.

   ```bash
   docker rm -f agentivity
   ```

4. Start Agentivity with the usual command.

   ```bash
   docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
   ```

**How to know it worked:** open the Studio. Your agents, teams and workflows are in their lists.

## If it does not work

- **"The container name "/agentivity" is already in use."** The old container still exists. Run `docker rm -f agentivity`, then start again.
- **The Studio is empty after an update.** The container was started without the volume, or with another volume name. Check that the command has `-v agentivity-data:/app/_data`.

## Good to know

- Removing the container does not remove your data. Removing the volume does.
- What is not in the volume is not kept across an update: the log files. The execution history, the conversations of past executions and the uploaded files are in the volume. See [Configuration reference of the server](/docs/reference/configuration/).

## Next step

[Keep your Agentivity server private](/docs/guides/keep-your-server-private/).
