---
title: "Connect an AI model to Agentivity"
description: "Add the API key of OpenAI, Anthropic, Google Gemini, xAI or DeepSeek so your agents and teams can run. Your key stays on your server."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/connect-a-model.md. Do not edit here: edit the source and publish again. -->

Agents need an AI model to think with. Agentivity does not provide one: you bring your own. You add the API key of the provider you use, and your agents run on that model.

## What you need

- Agentivity running. If it is not, start with [Install Agentivity with Docker](/docs/getting-started/install-community/).
- An API key from one provider, with credit on the provider's side. The provider bills you directly for what your agents use.

## Where to get a key

| Provider | Model family | Where to create the key |
|---|---|---|
| Anthropic | Claude | console.anthropic.com |
| OpenAI | GPT | platform.openai.com/api-keys |
| Google | Gemini | aistudio.google.com/apikey |
| xAI | Grok | console.x.ai |
| DeepSeek | DeepSeek | platform.deepseek.com |

## Connect your model the first time

![Step 1 of the welcome guide, Connect your AI model: five providers, a field for the API key, and the button Check and save](images/guide-step1.jpg)

1. Open the Studio. In the welcome guide, choose **Get started**, then the step **Connect your AI model**.
2. Choose your provider.
3. Paste your API key.
4. Select **Check and save**.

Agentivity checks the key with the provider right away, at no cost. When it works you see a green message, for example "Connected to Claude", with the number of models available.

**How to know it worked:** the step shows the green "Connected" message, and the guide lets you continue.

## Add another connection later

You can add or change a connection at any time:

![The screen Credentials, with one connection to an AI model: its name, its provider, and its key shown as dots](images/credentials.jpg)

1. In the Studio, open **Settings**, then **Credentials**.
2. Select **New credentials**. The window **New connection** asks "What do you want to connect to?"
3. Select **AI models**, then your provider.
4. Fill in the fields and save.

You can keep several connections, for example one per provider, and choose which one your agents run on.

This list has more providers than the welcome guide. For example, it also offers **AWS Bedrock** and **Cohere**.

## Your key

- The key is stored on your server and is never shown again after you save it.
- What your agents send goes to the provider you chose, under that provider's terms.

## If it does not work

- **"Paste your API key first."** The key field is empty.
- **"This key was refused by" your provider.** The provider did not accept the key. Check that you copied all of it, that the key is still active, and that your account has credit.
- **"Key saved, but" your provider "could not confirm it right now".** The key is saved, but the provider could not be reached at that moment. Try again a little later.

- **"The model did not answer"**, with a message about an SSL connection, when an agent or the Assistant runs. The machine where Agentivity runs cannot make a secure connection to the provider. This happens when a security program or a company proxy inspects the internet traffic of that machine. Ask the person who manages the machine or the network.

## Next step

[Build your first team with the Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/), or [try a ready-made solution](/docs/getting-started/try-a-ready-made-solution/) first.
