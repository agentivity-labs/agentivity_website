---
title: "If an antivirus blocks the connections of Agentivity"
description: "Agentivity cannot reach your AI model because an antivirus or a company proxy replaces the security certificate. How to make the container trust it."
sidebar:
  order: 5
draft: true
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/if-an-antivirus-inspects-your-connections.md. Do not edit here: edit the source and publish again. -->

Some antivirus programs and company proxies read your secure internet connections. To do it, they put their own security certificate in place of the real one. Your browser accepts it, because the antivirus added it to Windows or macOS. The Agentivity container does not know it, so it refuses the connection.

## What you see

- In the Studio, an agent or the Assistant stops with **The model did not answer**, with a text about an SSL connection.
- The check of your key says that the provider could not be reached, although your browser reaches it: **Check the key** in the welcome guide, or the button **Test** of a connection.
- The list of models stays empty. You can still type the ID of your model by hand, but the agents will not run until the certificate is trusted.
- In the logs (`docker logs agentivity`): "The SSL connection could not be established".

Only the calls that the server makes are concerned: to AI models, to web pages and to services. The Studio itself opens as usual.

## Choose a way

| Way | Use it when | The antivirus stays on |
|---|---|---|
| **1. Make the container trust the certificate** | The machine is yours, or the person who manages it gave you the certificate. This is the way to keep. | Yes |
| **2. Turn off the scanning of secure connections** | A quick test on your own machine. | No, for this feature |
| **3. Build an image that carries the certificate** | You deploy the same image on several machines. | Yes |

## Way 1: make the container trust the certificate

### Get the certificate of the antivirus

On Windows:

1. Press the Windows key, type `certmgr.msc` and open it.
2. Open **Trusted Root Certification Authorities**, then **Certificates**.
3. Find the line whose name has the name of your antivirus in it.
4. Right-click it, then **All Tasks**, then **Export…**.
5. Choose the format **Base-64 encoded X.509 (.CER)**, and save the file, for example as `C:\certs\antivirus.crt`.

Open the file in a text editor. It must start with `-----BEGIN CERTIFICATE-----`. If it looks like unreadable characters, the export used the wrong format: export it again.

On a company machine, ask the person who manages it for the certificate of the proxy instead. If there are several certificates, paste them one after the other in the same file.

### Start Agentivity with it

Remove the container, and start it again with the certificate. Your data stays in the volume.

```bash
docker rm -f agentivity
docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data -v C:\certs\antivirus.crt:/certs/antivirus.crt:ro -e SSL_CERT_FILE=/certs/antivirus.crt agentivitylabs/agentivity
```

What the two new parts do:

- `-v C:\certs\antivirus.crt:/certs/antivirus.crt:ro` gives the file to the container, in read-only mode. Replace `C:\certs\antivirus.crt` with the place of your file.
- `-e SSL_CERT_FILE=/certs/antivirus.crt` tells the server to trust this certificate, in addition to the usual ones.

The certificate is added to the others: the secure connections that work today keep working.

Keep the file where it is. The container reads it at each start.

### How to know it worked

1. In the Studio, check your key again (**Check the key** in the guide, or **Test** on the connection). It no longer says that the provider could not be reached, and the list of models loads.
2. Run an agent. It answers instead of stopping with "The model did not answer".

We tried this way with a stand-in certificate on a local test page: by default the server failed with "The SSL connection could not be established", and it reached the page once the certificate was given. A public site was still reached. We did not try it with a real antivirus.

## Way 2: turn off the scanning of secure connections

Open the settings of the antivirus and find the option that scans secure connections. It is called "HTTPS scanning", "SSL/TLS scanning" or "Encrypted connections scanning". In Avast and AVG, it is in **Protection**, **Core Shields**, **Web Shield**.

Turn it off, or add an exception for Docker if the antivirus allows one. Then restart Agentivity with `docker restart agentivity`, and select **Test** on your model connection again.

Pausing the whole antivirus also works, for a test. Turn it back on afterwards.

This lowers your protection on every program of the machine, not only for Agentivity. Prefer way 1 for a machine that you use every day.

## Way 3: build an image that carries the certificate

Create a file named `Dockerfile` next to the certificate, with these lines:

```text
FROM agentivitylabs/agentivity:latest
USER root
COPY antivirus.crt /usr/local/share/ca-certificates/antivirus.crt
RUN update-ca-certificates
USER app
```

Build it and start it:

```bash
docker build -t agentivity-with-certificate .
docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data agentivity-with-certificate
```

We tried this too, with the same result. The image is yours: when a new version of Agentivity comes out, build it again from the new one.

## On a company machine

Do not turn the antivirus off yourself, and do not export a certificate without asking. The person who manages the machine knows the policy. Ask for the certificate of the proxy or of the antivirus, and use way 1 or way 3.

## If it does not work

- **Docker refuses to start the container, or it does not start.** The path of the file is probably wrong. Check the path on your machine, and read the message of Docker and `docker logs agentivity`.
- **The message is still the same.** The file is not a certificate in text form, or it is not the one that your antivirus uses. Export the one whose name is the name of the antivirus, in the format Base-64.
- **It worked, then stopped.** Some antivirus programs renew their certificate. Export it again and restart the container.
- **The bar at the bottom of the Studio says Realtime reconnecting.** The same kind of program can hold back the live connection of the browser. This is another problem, with other steps: see [Fix a failed installation](/docs/guides/if-the-install-fails/).

## Next step

[Connect an AI model](/docs/guides/connect-a-model/), and check your key again.
