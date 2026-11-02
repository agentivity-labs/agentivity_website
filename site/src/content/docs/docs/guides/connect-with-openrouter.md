---
title: "Connect with OpenRouter"
description: "Give your agents a model in one click with an OpenRouter account, add credit, choose a model, and see what happens when credit runs out."
sidebar:
  order: 40
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/connect-with-openrouter.md. Do not edit here: edit the source and publish again. -->

OpenRouter gives your agents access to models from several providers with one account. There is no key to create or to copy. You pay OpenRouter directly: Agentivity takes no part in the payment. If you already pay an AI provider, you can connect your own key instead: see [Connect an AI model to Agentivity](/docs/guides/connect-a-model/).

## What you need

- Agentivity open in your browser. On your own server, open it at `localhost` or at an `https` address.
- A browser that allows a pop-up window for this page. The sign-in opens in a small window beside the Studio.

## Connect your account

1. In the welcome guide, **Step 1 of 3**, keep **One OpenRouter account** and select **Connect with OpenRouter**. If you skipped the guide, select the same button in **Administration** > **Credentials**. When you start a run with no model connected, the Studio offers it in a window.
2. In the window that opens at OpenRouter, sign up or sign in, then select **Authorize**. If a new account first shows you a key and some code, ignore them and select **Continue** until you see **Authorize**.
3. The window closes and the Studio says "Connected to OpenRouter. You are ready."

The key is kept on your server with your other credentials, and it is never shown. If you close the window, or the sign-in takes more than ten minutes, the Studio says so and offers **Try again**.

## Add credit

A new account has no credit. The Studio says so and shows **Add credit**. Select it, choose an amount at OpenRouter (it shows its minimum and its fee before you pay), then come back. Agentivity notices the credit by itself, or you can select **I've added credit**.

## Choose a model

Agentivity starts with a balanced model, so you do not have to choose. To change it, open **Administration** > **Credentials**. On your OpenRouter account, use the list **Model your agents use**. Only models that work well with Agentivity are offered.

The same card has **Add credit**, **Change account** (what uses the connection keeps working) and **Disconnect** (agents that used it stop working until you connect a model again).

## If credit runs out

A run stops with a clear message and an **Add credit** button. After you add credit, select **Run again** in a chat of an agent or of a team, or send your message again.

If your OpenRouter key has a spending limit, a box appears in the sidebar when you are close to it. OpenRouter does not tell Agentivity the balance of an account, so a key with no limit shows no warning before a run stops. OpenRouter can warn you by e-mail.
