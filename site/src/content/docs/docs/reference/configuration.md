---
title: "Configuration reference of the server"
description: "The settings of an Agentivity server and their default values, how to change one when you start the container, and which folders hold your data."
sidebar:
  order: 30
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/configuration.md. Do not edit here: edit the source and publish again. -->

An Agentivity server works without any setting. This page is for the day you need to change one: keep the history across updates, send no telemetry, accept larger files.

Connections to AI models and other services are not here. You manage them in the Studio: see [Add, change or remove credentials](/docs/guides/manage-credentials/).

## How to change a setting

A setting is given when the container is created, with `-e`. Its name is the group, two underscores, then the setting.

```bash
docker run -d --name agentivity -p 5005:5005 \
  -v agentivity-data:/app/_data \
  -e UploadCache__MaxFileSizeMb=25 \
  agentivitylabs/agentivity
```

To change a setting on a server that already runs, remove the container and create it again with the new `-e`. Your data stays in the volume. See [Update Agentivity and back up your data](/docs/guides/update-and-back-up/).

## The folders the server writes

| Folder in the container | What it holds | On the volume of the install page |
|---|---|---|
| `/app/_data` | What you build: agents, teams, workflows, prompts, Data Tables and their rows, credentials, settings, the drafts of the Assistant. | Yes |
| `/app/_cache` | What the runs leave: the run history, the runs that wait for a person, the conversations with agents and teams, the uploaded files, pictures and sounds. | No |
| `/app/_logs` | The log files of the server. | No |

A folder that is not on a volume survives a stop and a start. It is lost when the container is removed, and an update removes the container.

## Keep the run history across updates

With the command of the install page, an update empties the screen **Executions**: we tested it. The runs that wait for a person are kept in the same folder.

To keep them, add a second volume on `/app/_cache`:

```bash
docker run -d --name agentivity -p 5005:5005 \
  -v agentivity-data:/app/_data \
  -v agentivity-cache:/app/_cache \
  agentivitylabs/agentivity
```

We tested this too: the run was still listed after the container was replaced.

## Telemetry

The image is delivered with a telemetry address set. When it is set, the server sends its logs, its traces and its measures to that address, which is outside your machine. The logs of a server can contain parts of what your runs handle.

To send nothing, start the container with an empty address:

```bash
docker run -d --name agentivity -p 5005:5005 \
  -v agentivity-data:/app/_data \
  -e OpenTelemetry__Endpoint= \
  agentivitylabs/agentivity
```

To send to your own collector instead, give its address in `OpenTelemetry__Endpoint`. It must accept the OpenTelemetry protocol (OTLP). `OpenTelemetry__Protocol` is `HttpProtobuf` by default; the other value is `Grpc`.

## The port and the address

The server listens on port 5005 inside the container. To reach it on another port of your machine, change the left number of `-p`: `-p 8080:5005` gives `http://localhost:8080`.

To reach it from your machine only, see [Keep your server private](/docs/guides/keep-your-server-private/).

You rarely need to change the port inside the container. The setting is `Kestrel__Endpoints__Http__Url`, with the default `http://0.0.0.0:5005`.

## Which web pages may call the server

By default, a web page served from any address may call the server. Calls that do not come from a browser are always accepted.

| Setting | Default | What it is |
|---|---|---|
| `Cors__AllowedOrigins__0`, `__1`, `__2`… | none: any page | The addresses of the pages that may call the server, one setting for each. With no setting, or with `*` among them, any page may. |

```bash
docker run -d --name agentivity -p 5005:5005 \
  -v agentivity-data:/app/_data \
  -e Cors__AllowedOrigins__0=https://app.mydomain.com \
  agentivitylabs/agentivity
```

An address is written as the page shows it: the scheme, the name and the port if there is one, with nothing after. This is not a sign-in: there is none. See [Who can call the API](/docs/getting-started/install-community/#who-can-call-the-api).

## Files that people upload

| Setting | Default | What it is |
|---|---|---|
| `UploadCache__MaxFileSizeMb` | `10` | The largest file a person can give to a run, in megabytes. A larger file is refused. |
| `UploadCache__RetentionDays` | `7` | The number of days an uploaded file is kept. |
| `UploadCache__CleanupIntervalMinutes` | `60` | How often the old files are removed. |

## How long the run history is kept

The server removes old runs by itself.

| Setting | Default | What it is |
|---|---|---|
| `WorkflowRunRetention__KeepCompletedDays` | `7` | Days a completed run is kept. |
| `WorkflowRunRetention__KeepFailedDays` | `30` | Days a failed run is kept. |
| `WorkflowRunRetention__KeepCancelledDays` | `3` | Days a cancelled run is kept. |
| `WorkflowRunRetention__MaxRunsToKeep` | `1000` | The largest number of runs kept. |
| `WorkflowRunRetention__CleanupIntervalMinutes` | `60` | How often the old runs are removed. |

## Pictures and sounds made by the runs

| Setting | Default | What it is |
|---|---|---|
| `ImageCache__RetentionDays` | `7` | Days a picture is kept. |
| `ImageCache__ConvertToWebP` | `false` | Stores the pictures in the WebP format, which is lighter. |
| `ImageCache__WebPQuality` | `85` | The quality of the WebP pictures. |
| `AudioCache__RetentionDays` | `7` | Days a sound is kept. |

## The logs

| Setting | Default | What it is |
|---|---|---|
| `Logs__Path` | `_logs/flows-agency-.log` | Where the log files are written. The date is added to the name. |
| `Logs__RollingInterval` | `Day` | A new file each day. |
| `Logs__RetainedFileCountLimit` | `15` | The number of log files kept. |
| `Logs__FileSizeLimitBytes` | `52428800` | The largest size of one file: 50 megabytes. |
| `Serilog__MinimumLevel__Default` | `Information` | The level of detail of the logs. |

To read the logs without opening the files: `docker logs agentivity`.

## JavaScript steps

The **JavaScript** step of a workflow runs in separate worker processes.

| Setting | Default | What it is |
|---|---|---|
| `CodeExecution__PoolSize` | `2` | The number of worker processes, so the number of scripts that run at the same time. |
| `CodeExecution__MaxOldSpaceSizeMb` | `64` | The memory one worker can use, in megabytes. |

The time one script can take is set on the step itself, not here.

## When the machine is busy

The engine slows itself down when the machine is under load.

| Setting | Default | What it is |
|---|---|---|
| `WorkflowEngine__ThrottleCpuPercent` | `90` | The processor use from which the engine slows down. |
| `WorkflowEngine__ThrottleMemoryPercent` | `80` | The memory use from which the engine slows down. |
| `LlmRecovery__MaxRetries` | `2` | How many times a call to an AI model is tried again after a failure. |

## What is not a setting

- **A login.** The server has none. See [Keep your server private](/docs/guides/keep-your-server-private/).
- **The edition.** It is fixed in the image.

## If it does not work

- **The setting has no effect.** Check the two underscores between the group and the setting, and that the `-e` comes before the name of the image.
- **The Studio is empty after you changed a setting.** The new container was created without `-v agentivity-data:/app/_data`.
