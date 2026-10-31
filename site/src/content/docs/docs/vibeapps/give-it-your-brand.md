---
title: "Give the app your brand"
description: "For developers. One theme object sets the colours, shapes and font of every chat and widget piece of the SDK. Start from a ready-made theme."
sidebar:
  order: 12
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/give-it-your-brand.md. Do not edit here: edit the source and publish again. -->

This page is for developers. An application built with the SDK should look like yours, not like a demo. One object, the theme, sets the look of every piece of the SDK: chat bubbles, cards, charts, forms.

## What a theme sets

| Part of the theme | What it changes |
|---|---|
| `colors` | A short list of named colours: `primary`, `surface`, `outline` and a few more. Every piece draws from them. |
| `fontFamily` | The font of the pieces of the SDK. |
| `cardRadius`, `cardShadow`, `cardPadding`, the border | The shape of the cards: round or square, flat or raised. |
| `chartPalette` | The colours of the bars, lines and slices of the charts. |

A colour you leave out keeps its default value. So a theme can be two lines long.

## Start from a ready-made theme

The SDK includes ready-made themes: `light`, `dark`, `neutral`, `glacier`, `paper`, `noir`, `riviera`, `techno`, `ledger` and others. Each is a full recipe of colours, shapes and type.

Wrap your application in `ArtifactsThemeProvider`, inside the provider of the client:

```tsx
import { AgentivityProvider, ArtifactsThemeProvider, riviera } from '@agentivity-labs/sdk-react';
import '@agentivity-labs/sdk-react/styles.css';

export function App() {
  return (
    <AgentivityProvider baseUrl="https://agentivity.example.com">
      <ArtifactsThemeProvider theme={riviera}>
        <YourScreens />
      </ArtifactsThemeProvider>
    </AgentivityProvider>
  );
}
```

## Make it yours

Copy a ready-made theme and change what your brand needs.

```tsx
import { light, type ArtifactsThemeData } from '@agentivity-labs/sdk-react';

export const brandTheme: ArtifactsThemeData = {
  ...light,
  fontFamily: '"Inter", sans-serif',
  cardRadius: 14,
  colors: { ...light.colors, primary: '#0b6e4f', onPrimary: '#ffffff' },
  chartPalette: ['#0b6e4f', '#f2a541', '#3d5a80', '#e76f51'],
};
```

Then give `brandTheme` to `ArtifactsThemeProvider`.

## Your own screens

The theme covers the pieces of the SDK. Your own screens, your header and your buttons are yours to style.

To keep both in step, read the same colours. The provider publishes each colour as a CSS variable whose name starts with `--ag-`, for example `--ag-primary` and `--ag-surface`. Use them in your own style sheet.

## The colours of a drawing

The groups you chose in the Studio reach your application with no code: the people who use it see the same parts of the work, with the same names and colours. See [Organise a team or a workflow with groups](/docs/teams/organise-with-groups/).

The theme and the colours of a team, a workflow or an agent are independent. The theme gives the background, the text and the shape. The colours of the drawing come from its groups.

The SDK has no list of palettes: the palettes exist only in the Studio, to help choose. The SDK shows the colours that are stored. A group with no colour chosen takes a default colour.

| Where | What is stored |
|---|---|
| A step of a workflow | `node.metadata.group`: the name of its group. |
| A workflow | `workflow.metadata.groupColors`: the colour of each group, as `#RRGGBB`. The key is the name of the group in lower case. |
| An agent | `graph.metadata.group` and `graph.metadata.groupColor`. |

A type of step has no colour. A step without a group takes the neutral colour: `--ag-workflow-node` in React, `AgUiWorkflowPalette.node` in Flutter. The variables `--ag-workflow-start`, `--ag-workflow-decision`, `--ag-workflow-human`, `--ag-workflow-ai`, `--ag-workflow-action` and `--ag-workflow-end` no longer exist: remove them from your style sheets.

The colours of the states stay: `--ag-workflow-working`, `--ag-workflow-waiting`, `--ag-workflow-done` and `--ag-workflow-failed` in React, and the fields `working`, `waiting`, `done` and `failed` of `AgUiWorkflowPalette` in Flutter.

## Light and dark, or several looks

A theme is an object, so changing the look is changing the object you give to the provider. The two example applications have a theme switcher built this way: see `src/theme` in `agentivity_sdk_showcase_tripagency`.

## Good to know

- **Import the style sheet once**: `@agentivity-labs/sdk-react/styles.css`.
- **Without a provider, the pieces still work**, with the default look.
- **A custom widget should read the same variables**, so that it follows the theme like the ready-made ones. See [Add your own widgets](/docs/vibeapps/add-your-own-widgets/).
- **In the portal example**, the default theme is one setting: `themeId` in `src/config.ts`. See [Start a VibeApp with the React SDK](/docs/vibeapps/start-with-the-react-sdk/).

## Where to read more

`src/artifacts/theme.ts` in the SDK lists every field of a theme, with a comment for each. `src/artifacts/theme-presets.ts` holds the ready-made themes: read one to see a full recipe.

## Next step

[Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).
