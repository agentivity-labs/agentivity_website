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
