---
title: "How a VibeApp talks to Agentivity"
description: "For developers. What an application can ask the Agentivity server, how an execution is followed, and which web pages may call the server."
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
| Start an execution and send it a request. | Change credentials. |
| Follow the execution as it happens. | Change the columns of a Data Table. |
| Send the answer of a person when the execution waits. | |
| Read and write the rows of a Data Table. | |

Creating and changing stay in the Studio. This is by design: the person who knows the job changes the team, and the application does not need to be rebuilt.

## The four calls an application makes

1. **List what can be launched.** The application asks for the entities of the workspace. An entity is an agent, a team or a workflow. It can ask only for those that carry a tag, for example `solution`.
2. **Start an execution.** The application sends the identifier of the entity and the request of the person. The server answers with the identifier of the execution and the address of its event stream.
3. **Follow the execution.** The application listens to the event stream. Events arrive as the execution goes: a message being written, a member starting to work, a screen to show, a question for the person.
4. **Answer.** When the execution waits for a person, the application sends the answer, and the execution continues.

All the calls are under the path `/api/v1/` of your Agentivity server.

## The screens come from the execution

A team does not only send text. It can ask the application to show something: a choice, a form, a date, a table, a chart. The SDK has a ready-made component for each. The application shows it in the conversation, and sends back what the person chose.

This is what makes a VibeApp different from a chat window. The application does not decide in advance which screen comes next: the execution does.

## Which pages may call the server

By default, the server accepts calls from any web page. An application served from another port, another machine or another domain works with no setting. Calls that do not come from a browser (a script, a mobile application, another server) have always been accepted.

This is made to be easy while you build. It is not secure, because there is no login. For a real production, limit the pages that may call the server to the address of your application, with the setting `Cors__AllowedOrigins`. See [Who can call the API](/docs/getting-started/install-community/#who-can-call-the-api).

The Studio is not concerned: the server delivers it itself.

## There is no login, on a server you install

On a hosted workspace, an application sends a key: see [Connect a VibeApp to a hosted workspace](/docs/vibeapps/connect-a-vibeapp-to-a-hosted-workspace/). The rest of this section is about a server you install yourself. It does not ask who is calling. Every call is accepted, from a browser or not. Limiting the pages that may call it does not replace a sign-in: a script is not a page. See [Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).

## The SDKs

- **React**: `@agentivity-labs/sdk-react`, in TypeScript. These pages use it.
- **Flutter**: `agentivity_sdk_flutter`, with the same parts.

Both are published with their source under the MIT licence, at github.com/agentivity-labs.

## Next step

[What the React SDK offers, and how to work with it](/docs/vibeapps/what-the-react-sdk-offers/).
