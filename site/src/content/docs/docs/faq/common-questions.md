---
title: "Common questions about Agentivity"
description: "Short answers to the first questions people ask. What Agentivity is, who it is for, what you need, what you pay, and where your data goes."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/faq/common-questions.md. Do not edit here: edit the source and publish again. -->

Short answers to the questions people ask first. Each answer links to the page that explains it.

## What it is

### What is Agentivity?

A platform to build and run AI agents, AI teams and workflows, without writing code. You build in the Studio, a visual editor in your browser. See [What Agentivity is](/docs/introduction/what-agentivity-is/).

### How is it different from a chatbot?

A chatbot answers a question, and you do the rest. With Agentivity you build specialists with a role, you organise them in teams, and the work comes back finished. A person is asked only when a decision is theirs.

### What can I do with it?

Work with several steps that needs judgement on the way: read documents and file them, prepare and write a note, compare options, handle a request from start to finish. Four examples are ready to import. See [What you can do with Agentivity](/docs/introduction/what-you-can-do-with-it/).

### Does it replace my team?

No. It takes the repetitive work and comes back to your people for the decisions. See [How a person stays in control](/docs/introduction/how-a-person-stays-in-control/).

## Who it is for

### Do I need to know how to code?

No, to build. You describe what you need to the Assistant, or you build in the Studio with names, descriptions in plain words, and drag and drop.

Two things need a technical colleague: installing the Community edition on a server, and building an application of your own on top of it.

### I am not technical. Can I install it?

If you can copy a command into a terminal, yes: the install is one command, once Docker is on your machine. See [Install Agentivity with Docker](/docs/getting-started/install-community/). If that is not for you, hosted editions with nothing to install are planned.

### Is the Studio in my language?

The Studio is in English. Your agents can work in any language that your AI model handles: write their instructions in the language you want them to use.

## What you need and what you pay

### What do I need to start?

A computer or a server that runs Docker, and an account with an AI model provider.

### Is the Community edition free?

Yes. It is free of charge, with no time limit. See [What the Community edition includes](/docs/introduction/what-the-community-edition-includes/).

### Do I pay for the AI model?

Yes, separately. You connect your own account with the provider you choose, and that provider bills you directly for what your agents use. Agentivity adds nothing to it.

### Which AI models can I use?

Models from Anthropic, OpenAI, Google, xAI and DeepSeek, and Claude models through AWS Bedrock. You can connect several and choose which one each agent uses. See [Connect an AI model](/docs/guides/connect-a-model/).

### What does a request cost me?

It depends on your provider and on the model. As a rule: each agent that works calls the model at least once, so a team with many members costs more for one request than a single agent. Start small, and set a spending limit with your provider if it offers one.

## Your data

### Where is my data kept?

On the machine where you installed Agentivity, in one Docker volume. See [Update Agentivity and back up your data](/docs/guides/update-and-back-up/).

### Is what I write sent to Agentivity?

What you build stays on your server: agents, teams, workflows, tables and credentials are not sent to Agentivity.

One thing does leave it by default. The image is delivered with a telemetry address, and the server sends its technical logs, traces and measures there. You can turn this off with one setting when you start the container. See [Telemetry](/docs/reference/configuration/).

### What goes to the AI model provider?

What an agent sends when it works: its instructions, the request, and the documents or rows it uses for that request. It goes to the provider you connected, under that provider's terms. Do not give an agent what must not leave your server.

### Does Agentivity need the internet?

Your agents need it to reach the AI model. The Studio needs it to show the ready-made solutions of the marketplace. Building and running workflows that have no AI step and no outside service work without it.

## More questions

- [Questions about building and running](/docs/faq/building-and-running/)
- [Questions about the licence, security and editions](/docs/faq/licence-and-security/)
