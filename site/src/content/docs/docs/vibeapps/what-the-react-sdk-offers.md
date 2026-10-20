---
title: "What the React SDK offers, and how to work with it"
description: "For developers. The parts of the Agentivity React SDK, where to find the information, and a way of working that includes an AI coding assistant."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/what-the-react-sdk-offers.md. Do not edit here: edit the source and publish again. -->

This page is for developers. It is a map: what the SDK gives you, and where to look when you need more. The pages after it go into each part, with a starting point and a few lines of code.

The source code is the reference. These pages do not list every function.

## The idea in one minute

Your application does three things: it lists what can be launched, it starts an execution, and it shows what the execution sends. The SDK gives you a ready-made piece for each, so that most of your code is your own screens.

## What you get

| Part | What it does for you | Read |
|---|---|---|
| **The client** | Calls the server: list agents, teams and workflows, start an execution, answer a question, stop an execution, read past conversations, upload a file, read and write the rows of a Data Table. | [List solutions and start an execution](/docs/vibeapps/run-a-solution-from-your-app/) |
| **The chat** | A complete conversation: messages as they are written, the input box, a stop button, who is working, questions to the person, a notice when the connection is lost. | [List solutions and start an execution](/docs/vibeapps/run-a-solution-from-your-app/) |
| **The team and the workflow, drawn** | Shows the members of a team or the steps of a workflow, and lights them up as they work. | [Show the team at work](/docs/vibeapps/show-the-team-at-work/) |
| **Widgets** | What an agent can show in the conversation besides text: charts, cards, a form, a choice, a date, a confirmation. Twenty-two are ready. | [The widgets an agent can show](/docs/vibeapps/the-widgets-an-agent-can-show/) |
| **Your own widgets** | A screen of your own that the agent fills in and the person answers: a hotel picker, a payment card, an order summary. | [Add your own widgets](/docs/vibeapps/add-your-own-widgets/) |
| **Themes** | One object sets the colours, the shapes and the font of every piece of the SDK. Ready-made themes are included. | [Give the app your brand](/docs/vibeapps/give-it-your-brand/) |

The SDK has no screen to create or change an agent, a team or a workflow. That stays in the Studio. See [How a VibeApp talks to Agentivity](/docs/vibeapps/how-a-vibeapp-talks-to-agentivity/).

## Where to find the information

Everything is in three public repositories at `github.com/agentivity-labs`.

| You look for | Open |
|---|---|
| The list of everything the SDK exports | `agentivity_sdk_react`, file `src/index.ts`. It is sorted by part, with a title for each. |
| What a component or a function does | The comment above it in the source. Your editor shows it when you point at the name. |
| An example of use | The folder `test` of the SDK: one file per component, with small, working cases. |
| A complete application for one job | `agentivity_sdk_showcase_tripagency`: the Trip Planner. Chat, team view, three custom widgets, themes. |
| A complete application for any solution | `agentivity_sdk_showcase_solutions`: the portal. List of solutions, chat, past conversations, team and workflow views. |
| What the server accepts | [The routes of the API](/docs/reference/api/). The SDK calls them for you. |

The two example applications are the best starting point. Each is small: a handful of files.

## A way of working

1. **Build the solution in the Studio first.** Make the agent or the team work in the tab **Execution** before you write any code. An application cannot fix a team that does not work.
2. **Start from an example application.** Copy the portal, or the Trip Planner if your application does one job. See [Start a VibeApp with the React SDK](/docs/vibeapps/start-with-the-react-sdk/).
3. **Point it at your server and your solution.** Check that the conversation works with the ready-made pieces.
4. **Change what the person sees.** Your layout, your brand, then your own widgets where the ready-made ones do not fit.
5. **Change the team, not the code, when the job changes.** A new step or a new specialist is added in the Studio. The application follows.
6. **Read the checks before you put it online.** See [Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).

## Work with an AI coding assistant

The SDK and the two example applications are published with their source. That makes them easy to use with an AI coding assistant: it can read the real code instead of guessing.

- **Give it the repositories.** Clone the SDK and one example application next to your project, and let the assistant read them.
- **Tell it where to start.** `src/index.ts` for what exists, the example application for how the pieces fit, the folder `test` for small cases.
- **Give it the three rules of this section.** The application reads, runs and watches, and does not build. The application and the server share one address. The server has no login.
- **Ask for one screen at a time**, and run it against your server after each change.

The assistant writes the code. You still check the result against a real execution: only an execution shows what your team really sends.

## The SDK for Flutter

`agentivity_sdk_flutter` has the same parts for Flutter applications. These pages use the React SDK.

## Next step

[Start a VibeApp with the React SDK](/docs/vibeapps/start-with-the-react-sdk/).
