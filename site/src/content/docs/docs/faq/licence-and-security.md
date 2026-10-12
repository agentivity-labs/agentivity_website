---
title: "Questions about licence, security and editions"
description: "Short answers about what the licence allows, the missing login, backups, the editions of Agentivity, and the SDKs."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/faq/licence-and-security.md. Do not edit here: edit the source and publish again. -->

Short answers on the licence, on security and on the editions. For the licence, these answers are a plain-language guide: if anything here differs from the licence itself, the licence wins.

## The licence

### Under which licence is Agentivity published?

The core of Agentivity is source available, under the [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license). The SDKs and the example applications are under the MIT licence.

### Can my company use it in production?

Yes. Running Agentivity for your own business is free of charge and needs no agreement.

### Can I read and change the source?

Yes, for the core. Keep the licence and copyright notices. If you distribute a changed copy, say clearly that you changed it.

### What does the licence forbid?

Three things:

1. Offering Agentivity to other people as a hosted or managed service.
2. Removing or going around the licence-key checks.
3. Removing or hiding the licence and copyright notices.

### I am an agency. Can I install Agentivity for my clients?

- **Installed on the client's own machines and used by the client**: yes.
- **Run on your machines and operated for the client**: that is a managed service. It needs a commercial licence.

If you are not sure, ask before you start.

### Can I use the SDKs in an application I sell?

Yes. The React and Flutter SDKs are under the MIT licence. They talk to an Agentivity server, and that server stays under its own licence.

### May I use the Studio that comes in the Docker image?

Yes, together with an Agentivity server, under the same conditions as the server. The Studio is delivered in compiled form. You may not take it out of the image to redistribute it on its own, or modify it.

## Security

### Is there a login?

No, not today. Anyone who can reach the address of your server can open the Studio and use everything. See [Keep your Agentivity server private](/docs/guides/keep-your-server-private/).

### Can I put it on the internet?

Not directly. Keep it on a private network, or put your own access control in front.

### Are my API keys safe?

They are stored on your server. Once saved, a key is shown as dots and is never given back. But anyone who reaches the server can use your connections to run agents, and can replace or delete them.

### Does Agentivity record who did what?

No. It has no accounts, so it does not know who built, ran or approved something.

### How do I back up?

Copy the Docker volume into a file. See [Update Agentivity and back up your data](/docs/guides/update-and-back-up/). The backup holds your credentials: keep it safe.

## Editions

### What is in the Community edition?

The Studio, the Assistant, agents, teams with the five ways of working, workflows, Data Tables, Prompt Studio, Templates and folders. See [What the Community edition includes](/docs/introduction/what-the-community-edition-includes/).

### What is not in it?

Keeping earlier versions of your work and going back to one, plugins, and accounts with roles and rights.

### Is there a hosted edition, with nothing to install?

Not yet. Hosted editions are planned. See [pricing and editions](/pricing).

### What is planned?

Hosted editions, starting runs on a schedule, and accounts with roles and rights. These pages describe only what works today.

## More questions

- [Common questions about Agentivity](/docs/faq/common-questions/)
- [Questions about building and running](/docs/faq/building-and-running/)
