---
title: "How a VibeApp talks to Agentivity"
description: "For developers. What an application can ask the Agentivity server, how a run is followed, and why the app must be on the same address."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/how-a-vibeapp-talks-to-agentivity.md. Do not edit here: edit the source and publish again. -->

This page is for developers. It explains what an application does with the Agentivity server, before you write any code.

## The boundary

An application **reads, runs and watches**. It does not build.

| An application can | An application cannot |
|---|---|
| List the agents, teams and workflows of the workspace. | Create or change an agent, a team or a workflow. |
| Start a run and send it a request. | Change credentials. |
| Follow the run as it happens. | Change the columns of a Data Table. |
| Send the answer of a person when the run waits. | |
| Read and write the rows of a Data Table. | |

Creating and changing stay in the Studio. This is by design: the person who knows the job changes the team, and the application does not need to be rebuilt.

## The four calls an application makes

1. **List what can be launched.** The application asks for the entities of the workspace. An entity is an agent, a team or a workflow. It can ask only for those that carry a tag, for example `solution`.
2. **Start a run.** The application sends the identifier of the entity and the request of the person. The server answers with the identifier of the run and the address of its event stream.
3. **Follow the run.** The application listens to the event stream. Events arrive as the run goes: a message being written, a member starting to work, a screen to show, a question for the person.
4. **Answer.** When the run waits for a person, the application sends the answer, and the run continues.

All the calls are under the path `/api/v1/` of your Agentivity server.

## The screens come from the run

A team does not only send text. It can ask the application to show something: a choice, a form, a date, a table, a chart. The SDK has a ready-made component for each. The application shows it in the conversation, and sends back what the person chose.

This is what makes a VibeApp different from a chat window. The application does not decide in advance which screen comes next: the run does.

## The application and the server must share one address

The Agentivity server accepts browser calls only from pages of its own address. The Studio works because the server delivers it itself.

An application delivered from another address, for example another port or another domain, is blocked by the browser. So an application must be reached through the same address as the server. The usual way is a reverse proxy: one address in front of both, which sends the paths that start with `/api/` to Agentivity and everything else to your application.

During development, your tool can do this for you: most development servers have a proxy setting.

## There is no login

The server does not ask who is calling. Every call is accepted. See [Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).

## The SDKs

- **React**: `@agentivity-labs/sdk-react`, in TypeScript. These pages use it.
- **Flutter**: `agentivity_sdk_flutter`, with the same parts.

Both are published with their source under the MIT licence, at github.com/agentivity-labs.

## Next step

[What the React SDK offers, and how to work with it](/docs/vibeapps/what-the-react-sdk-offers/).
