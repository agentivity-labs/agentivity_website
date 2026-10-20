---
title: "BYOK: why your AI platform shouldn't touch your tokens"
description: "Most AI platforms sit between you and your LLM provider, marking up your usage and logging your prompts. Here's why that matters, and what BYOK actually means in practice."
pubDate: 2026-06-05
author: "Agentivity Team"
tags: ["BYOK", "privacy", "architecture", "self-hosted"]
lang: en
---

When you use an AI platform that "includes AI", there's a question worth asking: whose AI is it, exactly?

Most SaaS AI tools work like this: you pay a subscription, the platform calls an LLM on your behalf, and you get the result. Simple — but there are three things happening that most users don't think about.

1. **Your data flows through their servers.** Your prompts, your documents, your outputs — all processed by infrastructure you don't control.
2. **You're paying a markup.** The platform pays the LLM provider at cost, then charges you more. That margin is invisible.
3. **You have no control over the model.** When the platform switches providers, updates their prompt engineering, or changes their rate limits — you find out when it breaks.

BYOK — Bring Your Own Key — is the alternative.

## What BYOK means

BYOK means you connect your own API key from your LLM provider (Anthropic, OpenAI, Google Gemini, xAI, DeepSeek or AWS Bedrock) directly to your AI platform. The platform orchestrates the agents and the workflow. But every token goes from your environment to your provider. The platform never touches it.

In concrete terms:

- **Your prompts** go from your Agentivity instance → directly to Anthropic/OpenAI
- **Your outputs** come back the same way
- **Your costs** appear on your LLM provider invoice, at cost, with no markup
- **Your data** never transits through a third-party AI platform

## Why it matters more than you think

### For data privacy

If you're using AI to process anything sensitive — customer data, financial information, HR records, legal documents — the routing of that data matters.

A self-hosted BYOK platform processes data on your infrastructure. A cloud-based platform with "enterprise privacy guarantees" still means data leaving your environment. Those are different risk profiles, and your legal and compliance teams know the difference.

### For cost predictability

Token costs are already variable. Adding a platform markup on top makes them doubly unpredictable. With BYOK, you know exactly what you're paying — because you pay the provider directly. There are no mystery fees, no "AI usage" line items on your invoice that you can't decompose.

### For model flexibility

LLM providers release new models constantly. With BYOK, moving to a newer model means choosing it in your connection: the list shows the models your key can use. No waiting for your SaaS provider to upgrade their integration. You can also keep several connections and run different models for different agents. Use a fast, cheap model for the data extraction step. Use a more capable model for the reasoning step. The cost profile is yours to optimise.

### For vendor independence

If you're paying a platform to call Anthropic on your behalf, you have two dependencies: the platform *and* Anthropic. If either changes their terms, raises prices, or goes down — you're affected. With BYOK and a self-hosted platform, you own the orchestration layer. Swap providers by changing a key. Self-host on any infrastructure that runs Docker.

## The providers you can connect

Agentivity connects to these providers, each with your own key:

- **Anthropic** (the Claude models)
- **OpenAI** (the GPT models)
- **Google Gemini**
- **xAI** (the Grok models)
- **DeepSeek**
- **AWS Bedrock**, if your company reaches its models through AWS

Each connection names the exact model it uses. For most providers, the Studio asks the provider which models your key can use and shows them in a list. Each connection also has the address of the provider's API, already filled in with the official one: change it only to go through a proxy of your own.

## What BYOK doesn't solve

BYOK is about the data path between your platform and your LLM provider. It doesn't cover:

- **The LLM provider's data practices.** When you send a prompt to Anthropic, Anthropic sees it. Review their data usage policies — most enterprise-tier agreements include no-training commitments.
- **The outputs you store.** If you log agent outputs to a database, that data is wherever your database is.
- **The tools your agents call.** If an agent calls an external API, that API sees the data it receives.

BYOK narrows the attack surface significantly. It doesn't eliminate it. A proper data privacy posture combines BYOK with self-hosting, appropriate LLM provider agreements, and sensible output handling.

## How to set it up in Agentivity

1. Get an API key from your LLM provider (Anthropic, OpenAI, Google, xAI or DeepSeek), with credit on your account there.
2. In the Studio, open **Settings**, then **Credentials**, and select **New credentials**. Choose **AI models**, then your provider. (The first time, the welcome guide offers the same step: **Connect your AI model**.)
3. Paste your key, then choose the **model**: the list shows the models your key can use.
4. Save. Keep several connections if you want different models for different agents, and choose which one each agent runs on.

That's it. Your agents now call your provider directly, from your own server. No Agentivity server sits in between, and your provider bills you directly.

---

*Agentivity is self-hosted and BYOK by design. [Star on GitHub](https://github.com/agentivity-labs/agentivity) or [read how to connect a model](/docs/guides/connect-a-model).*
