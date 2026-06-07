---
title: "BYOK: why your AI platform shouldn't touch your tokens"
description: "Most AI platforms sit between you and your LLM provider, marking up your usage and logging your prompts. Here's why that matters, and what BYOK actually means in practice."
pubDate: 2026-06-05
author: "Agentivity Team"
tags: ["BYOK", "privacy", "architecture", "open source"]
lang: en
---

When you use an AI platform that "includes AI", there's a question worth asking: whose AI is it, exactly?

Most SaaS AI tools work like this: you pay a subscription, the platform calls an LLM on your behalf, and you get the result. Simple — but there are three things happening that most users don't think about.

1. **Your data flows through their servers.** Your prompts, your documents, your outputs — all processed by infrastructure you don't control.
2. **You're paying a markup.** The platform pays the LLM provider at cost, then charges you more. That margin is invisible.
3. **You have no control over the model.** When the platform switches providers, updates their prompt engineering, or changes their rate limits — you find out when it breaks.

BYOK — Bring Your Own Key — is the alternative.

## What BYOK means

BYOK means you connect your own API key from your LLM provider (Anthropic, OpenAI, Mistral, or any OpenAI-compatible endpoint) directly to your AI platform. The platform orchestrates the agents and the workflow. But every token goes from your environment to your provider. The platform never touches it.

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

LLM providers release new models constantly. With BYOK, switching from Claude 3.5 to Claude 4.0 is changing a dropdown — not waiting for your SaaS provider to upgrade their integration. You can also run different models for different agents. Use a fast, cheap model for the data extraction step. Use a more capable model for the reasoning step. The cost profile is yours to optimise.

### For vendor independence

If you're paying a platform to call Anthropic on your behalf, you have two dependencies: the platform *and* Anthropic. If either changes their terms, raises prices, or goes down — you're affected. With BYOK and a self-hosted platform, you own the orchestration layer. Swap providers by changing a key. Self-host on any infrastructure that runs Docker.

## The compatible providers

Any OpenAI-compatible endpoint works with BYOK. That includes:

- **Anthropic** (Claude 3.5, Claude 4, Opus, Haiku)
- **OpenAI** (GPT-4o, o1, o3)
- **Mistral** (Mistral Large, Codestral)
- **Groq** (for fast inference)
- **Ollama** (for local models — completely air-gapped)
- **LM Studio** (for local models)
- Any provider with an OpenAI-compatible API

Running local models via Ollama deserves a mention. For the highest-sensitivity workloads, you can run your entire AI team — Agentivity + local LLMs — on a single server with no external API calls. Zero data leaves your network.

## What BYOK doesn't solve

BYOK is about the data path between your platform and your LLM provider. It doesn't cover:

- **The LLM provider's data practices.** When you send a prompt to Anthropic, Anthropic sees it. Review their data usage policies — most enterprise-tier agreements include no-training commitments.
- **The outputs you store.** If you log agent outputs to a database, that data is wherever your database is.
- **The tools your agents call.** If an agent calls an external API, that API sees the data it receives.

BYOK narrows the attack surface significantly. It doesn't eliminate it. A proper data privacy posture combines BYOK with self-hosting, appropriate LLM provider agreements, and sensible output handling.

## How to set it up in Agentivity

1. Get an API key from your LLM provider (Anthropic, OpenAI, etc.)
2. In Agentivity, go to Settings → API Keys
3. Add your key and select the provider
4. Choose which model each agent uses (you can mix models per agent)

That's it. Your agents now call your provider directly. Agentivity never sees your tokens.

---

*Agentivity is self-hosted and BYOK by design. [Star on GitHub](https://github.com/agentivity-labs/agentivity) or [read the docs](/docs).*
