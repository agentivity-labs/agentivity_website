---
title: "Fix a failed installation"
description: "What to check when Agentivity does not start or the Studio does not open. The Docker messages you may see, and what each one means."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/if-the-install-fails.md. Do not edit here: edit the source and publish again. -->

This page lists the problems you can meet when you install Agentivity, with the message you see and what to do.

## First, look at the state of the container

```bash
docker ps -a --filter name=agentivity
```

The column **STATUS** says whether the container is running ("Up") or stopped ("Exited").

To read what Agentivity wrote when it started:

```bash
docker logs agentivity
```

## Docker is not running

**Message:** "failed to connect to the docker API", or "the docker daemon is not running".

Docker itself is not started. On Windows and macOS, start Docker Desktop and wait until it says it is running. Then run the command again.

## The port is already used

**Message:** "Bind for 0.0.0.0:5005 failed: port is already allocated".

Another program uses port 5005 on your machine.

1. Remove the container that failed to start.

   ```bash
   docker rm -f agentivity
   ```

2. Start Agentivity on another port. Change only the first number:

   ```bash
   docker run -d --name agentivity -p 8080:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
   ```

3. Open `http://localhost:8080`.

## The name is already used

**Message:** "Conflict. The container name "/agentivity" is already in use".

A container named `agentivity` exists already, running or stopped.

- To start the one you have: `docker start agentivity`.
- To replace it: `docker rm -f agentivity`, then run the start command again. Your data is in the volume and is kept.

## The page does not open

The container is running, but `http://localhost:5005` shows nothing.

- **Wait a few seconds** after the start, then load the page again.
- **Check the port.** In the result of `docker ps`, the column **PORTS** must show `0.0.0.0:5005->5005`. If the first number is different, open that port instead.
- **Open it on the right machine.** `localhost` means the machine where your browser is. If Agentivity runs on another machine, use the address of that machine.

## The Studio opens, but it is empty after a restart

The container was started without the volume. Check that the start command has `-v agentivity-data:/app/_data`. See [Update Agentivity and back up your data](/docs/guides/update-and-back-up/).

## The model does not answer

**Message in the Studio:** "The model did not answer", with a text about an SSL connection.

Agentivity runs, but it cannot make a secure connection to your AI model provider. The logs then show lines such as "The SSL connection could not be established".

This happens when a security program or a company proxy inspects the internet traffic of the machine. Ask the person who manages the machine or the network to let the Docker containers reach the internet without this inspection.

Other signs of the same cause:

- The **Test** button of a model connection says "The provider could not be reached", although the internet works in your browser.
- The logs show "The remote certificate is invalid because of errors in the certificate chain: PartialChain".
- Just after the start, the logs say "Failed to download ONNX model. Local embeddings will not be available."

### If an antivirus inspects the traffic

To keep the antivirus on and make the container trust its certificate, see [If an antivirus blocks the connections of Agentivity](/docs/guides/if-an-antivirus-inspects-your-connections/). The quick way, for a test, is below.

Many antivirus programs (Avast, AVG, Kaspersky, ESET, Bitdefender…) read the secure connections of the machine, with a certificate of their own. Your browser trusts that certificate, because the antivirus added it to Windows or macOS. The Agentivity container does not know it, so it refuses the connection.

If the machine is yours:

1. Open the antivirus settings and find the option that scans secure connections. It is called "HTTPS scanning", "SSL/TLS scanning" or "Encrypted connections scanning". In Avast and AVG, it is in **Protection**, **Core Shields**, **Web Shield**.
2. Turn this option off, or add an exception for Docker if the antivirus allows one.
3. Restart Agentivity: `docker restart agentivity`.
4. In the Studio, open your model connection and press **Test** again.

Pausing the whole antivirus also works, for a test. Turn it back on afterwards.

On a company machine, do not change the antivirus yourself: ask the person who manages it.

## The bar at the bottom says Realtime reconnecting

The Studio works, but its screens do not update by themselves, and the chat of an execution stays empty. The live connection between your browser and Agentivity is blocked. The cause is often the same as above: a security program or a proxy that holds back the connection. See [Settings, theme and the small controls of the Studio](/docs/studio/settings-theme-and-controls/#the-status-bar).

## The ready-made solutions do not load

**Message in the welcome guide:** "The marketplace could not be reached."

The machine cannot reach the Agentivity marketplace over the internet. You can skip this step and import a Template later.

## Still stuck

Copy the result of `docker logs agentivity` before you ask for help. Remove any key or password from it first.

## Next step

[Connect an AI model](/docs/guides/connect-a-model/).
