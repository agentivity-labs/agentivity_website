---
title: "List solutions and start a run from your app"
description: "For developers. With the React SDK, list the solutions of a workspace, start a run, show the conversation and send the answers of the person."
sidebar:
  order: 8
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/run-a-solution-from-your-app.md. Do not edit here: edit the source and publish again. -->

This page is for developers. It shows the three things an application does with the React SDK: list what can be launched, start a run, and show the conversation.

## What you need

- An application wrapped in `AgentivityProvider`. See [Start a VibeApp with the React SDK](/docs/vibeapps/start-with-the-react-sdk/).
- At least one solution with a tag in your workspace.

## List the solutions

`useAgentivityClient` gives the client. `entities.fetchEntities` returns the agents, teams and workflows of the workspace. With `tags`, it returns only those that carry a tag.

```tsx
import { useEffect, useState } from 'react';
import { useAgentivityClient } from '@agentivity-labs/sdk-react';

export function Solutions({ onPick }: { onPick: (id: string) => void }) {
  const client = useAgentivityClient();
  const [solutions, setSolutions] = useState<{ id: string; displayName: string }[]>([]);

  useEffect(() => {
    client.entities.fetchEntities({ tags: ['solution'] }).then(setSolutions);
  }, [client]);

  return (
    <ul>
      {solutions.map((s) => (
        <li key={s.id}>
          <button onClick={() => onPick(s.id)}>{s.displayName}</button>
        </li>
      ))}
    </ul>
  );
}
```

Each entity also has a `kind` (agent, team or workflow) and a `role`, which you can show as a description.

## Start a run and show the conversation

`runs.startExecution` starts a run. It returns an `executionId` and a `streamUrl`. `useRunStream` listens to the stream. `ChatController` turns the events into a conversation, and `ChatDiscussion` shows it.

```tsx
import { useEffect, useMemo, useState } from 'react';
import { useAgentivityClient, useRunStream, ChatController, ChatDiscussion } from '@agentivity-labs/sdk-react';

export function SolutionChat({ solutionId }: { solutionId: string }) {
  const client = useAgentivityClient();
  const [streamUrl, setStreamUrl] = useState<string>();
  const [executionId, setExecutionId] = useState<string>();
  const controller = useMemo(() => new ChatController({ contextId: solutionId }), [solutionId]);

  const { events } = useRunStream(streamUrl);
  useEffect(() => {
    events.forEach(controller.feedEvent);
  }, [events, controller]);

  async function handleSend(text: string) {
    const session = await client.runs.startExecution({ entityId: solutionId, input: text, executionId, enableHil: true });
    setExecutionId(session.executionId);
    setStreamUrl(session.streamUrl);
  }

  return (
    <ChatDiscussion
      controller={controller}
      onSend={handleSend}
      onHilResponse={(gate, text, source) =>
        client.runs.submitHilResponse({ executionId: executionId!, requestId: gate.requestId, response: text, source })
      }
    />
  );
}
```

What each part does:

| Part | Role |
|---|---|
| `entityId` | The identifier of the agent, the team or the workflow to run. |
| `input` | The request of the person. |
| `executionId` | Give the one you received to continue the same conversation. Leave it empty to start a new one. |
| `enableHil` | Lets the run stop and ask the person. HIL stands for "human in the loop". |
| `onHilResponse` | Called when the person answers a question of the run. `submitHilResponse` sends the answer, and the run continues. |

## The screens sent by the team

When a team asks the application to show a choice, a form or a chart, `ChatDiscussion` shows the matching widget in the conversation, if you give it the widgets in `widgetRegistry`. See [The widgets an agent can show](/docs/vibeapps/the-widgets-an-agent-can-show/) and [Add your own widgets](/docs/vibeapps/add-your-own-widgets/).

## Read and write Data Table rows

The client also reads and writes the rows of a Data Table, for example to list past requests without starting a run.

```tsx
const rows = await client.dataTables.listRows(tableId);
await client.dataTables.insertRow(tableId, { customer: 'Northgate Bakery', invoice: 'INV-2041' });
```

The columns of a table are set in the Studio, not from an application.

## How to know it worked

- The list shows your solutions.
- After a message is sent, the conversation fills in as the run goes.
- When the run asks a question, the person can answer in the conversation, and the run continues.

## If it does not work

- **The list is empty.** No entity carries the tag you asked for.
- **Nothing arrives after a message.** The event stream is not reached. Check that the application and the server share one address, and that nothing in between holds the stream back.
- **The run fails at once.** The solution itself does not work. Run it in the Studio first.

## Next step

[Show the team at work in your app](/docs/vibeapps/show-the-team-at-work/).
