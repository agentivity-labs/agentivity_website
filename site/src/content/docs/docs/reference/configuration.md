---
title: "Configuration reference of the server"
description: "The settings of an Agentivity server and their default values, how to change one when you start the container, and which folders hold your data."
sidebar:
  order: 30
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/reference/configuration.md. Do not edit here: edit the source and publish again. -->

An Agentivity server works without any setting. This page is for the day you need to change one: limit who can call it, send telemetry to your own collector, accept larger files.

Connections to AI models and other services are not here. You manage them in the Studio: see [Add, change or remove credentials](/docs/guides/manage-credentials/).

## How to change a setting

A setting is given when the container is created, with `-e`. Its name is the group, two underscores, then the setting.

```bash
docker run -d --name agentivity -p 5005:5005 \n  -v agentivity-data:/app/_data \n  -e UploadCache__MaxFileSizeMb=25 \n  agentivitylabs/agentivity
```

To change a setting on a server that already runs, remove the container and create it again with the new `-e`. Your data stays in the volume. See [Update Agentivity and back up your data](/docs/guides/update-and-back-up/).

## The folders the server writes

| Folder in the container | What it holds | On the volume of the install page |
|---|---|---|
| `/app/_data` | What you build: agents, teams, workflows, prompts, Data Tables and their rows, credentials, settings, the drafts of the Assistant. | Yes |
| `/app/_data/_cache` | What the executions leave: the execution history, the executions that wait for a person, the conversations with agents and teams, the uploaded files, pictures and sounds. | Yes, it is inside `/app/_data` |
| `/app/_logs` | The log files of the server. | No |

The execution history is in the volume. An update that replaces the container keeps it: the screen **Executions** and the executions that wait for a person are still there.

Only the log files are lost when the container is removed. To keep them, add a volume on `/app/_logs`, or read them with `docker logs agentivity`.

## Telemetry

The image sends nothing to a telemetry service. The settings of the image hold no telemetry address.

To send the logs, the traces and the measures of the server to your own collector, give its address:

```bash
docker run -d --name agentivity -p 5005:5005   -v agentivity-data:/app/_data   -e OpenTelemetry__Endpoint=https://collector.mycompany.com   agentivitylabs/agentivity
```

The collector must accept the OpenTelemetry protocol (OTLP). If it asks for a key, add it as `OpenTelemetry__Headers__Authorization`. `OpenTelemetry__Protocol` is `HttpProtobuf` by default; the other value is `Grpc`. The logs of a server can contain parts of what your executions handle: send them only to a place you control.

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
docker run -d --name agentivity -p 5005:5005 \n  -v agentivity-data:/app/_data \n  -e Cors__AllowedOrigins__0=https://app.mydomain.com \n  agentivitylabs/agentivity
```

An address is written as the page shows it: the scheme, the name and the port if there is one, with nothing after. This is not a sign-in: there is none. See [Who can call the API](/docs/getting-started/install-community/#who-can-call-the-api).

## Files that people upload

| Setting | Default | What it is |
|---|---|---|
| `UploadCache__MaxFileSizeMb` | `10` | The largest file a person can give to an execution, in megabytes. A larger file is refused. |
| `UploadCache__RetentionDays` | `7` | The number of days an uploaded file is kept. |
| `UploadCache__CleanupIntervalMinutes` | `60` | How often the old files are removed. |

## How long the execution history is kept

The server removes old runs by itself.

| Setting | Default | What it is |
|---|---|---|
| `WorkflowRunRetention__KeepCompletedDays` | `7` | Days a completed run is kept. |
| `WorkflowRunRetention__KeepFailedDays` | `30` | Days a failed run is kept. |
| `WorkflowRunRetention__KeepCancelledDays` | `3` | Days a cancelled run is kept. |
| `WorkflowRunRetention__MaxRunsToKeep` | `1000` | The largest number of runs kept. |
| `WorkflowRunRetention__CleanupIntervalMinutes` | `60` | How often the old runs are removed. |

## Pictures and sounds made by the executions

| Setting | Default | What it is |
|---|---|---|
| `ImageCache__RetentionDays` | `7` | Days a picture is kept. |
| `ImageCache__ConvertToWebP` | `false` | Stores the pictures in the WebP format, which is lighter. |
| `ImageCache__WebPQuality` | `85` | The quality of the WebP pictures. |
| `AudioCache__RetentionDays` | `7` | Days a sound is kept. |

## The logs

| Setting | Default | What it is |
|---|---|---|
| `Logs__Path` | `_logs/log-.log` | Where the log files are written. The date is added to the name: `log-` then the day as year, month and day, then `.log`. |
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
