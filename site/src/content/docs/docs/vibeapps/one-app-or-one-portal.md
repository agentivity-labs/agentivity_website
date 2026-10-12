---
title: "One app for one job, or one portal for all"
description: "Three ways to let people use your solutions. Straight from the Studio, in a ready-made portal, or in an application of your own."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/vibeapps/one-app-or-one-portal.md. Do not edit here: edit the source and publish again. -->

Once a solution works in the Studio, other people can use it. There are three ways to give it to them.

## The three ways

| Way | What people see | What it takes |
|---|---|---|
| **No app** | You, or a colleague who knows the Studio, start the solution from the Studio. It comes back to a person only when a decision is needed. | Nothing more. |
| **The portal** | One web page that lists the solutions you chose. A person picks one and talks to it. | Setting up the portal application once. |
| **An application of your own** | An application built for one job, with its own screens. Trip Planner is the example. | A developer and the Agentivity SDK. |

Start with the first one. Move to the next only when the people who use the solution should not see the Studio.

## The portal

The portal is a ready-made web application. It shows a welcome screen with one card per solution.

![The portal: a welcome screen titled What can we help you with, and one card for the solution Trip Manager Team](images/portal-solutions.jpg)

A person selects a card and writes a request. The conversation is on the left. When the solution is a team, the team is drawn on the right.

![The portal after a solution is chosen: the conversation with a field to type a message on the left, and the team with its members drawn on the right](images/portal-chat.jpg)

- **What it lists.** The agents, teams and workflows that carry the tag `solution` in your Studio. See [Show a team in the portal](/docs/vibeapps/show-a-solution-in-the-portal/).
- **Your brand.** A developer sets the name, the logo and the colours in one file.
- **A history.** The portal keeps the list of past conversations.

The portal is an example application, published with its source. A developer installs it next to your Agentivity server. See [Start a VibeApp with the React SDK](/docs/vibeapps/start-with-the-react-sdk/).

## An application of your own

When a job deserves its own application, a developer builds it with the SDK. The application decides which solution it talks to, and adds its own screens around the conversation: a list of trips, a detail page, a payment step.

Trip Planner is published as an example, with its source. It talks to one team, the **Trip Manager Team** showcase, and reads two data tables to list the trips.

## How to choose

- **A few colleagues, who can open the Studio**: no app.
- **Several solutions, for colleagues or customers who must not see the Studio**: the portal.
- **One job that people do often, and that needs its own screens**: an application of your own.

## One thing to know before you share

Agentivity has no login. An application that talks to your server can start any solution and read any table. Before people outside your team use a portal or an application, read [Before you put a VibeApp online](/docs/vibeapps/before-you-put-it-online/).

## Next step

[Show a team in the portal](/docs/vibeapps/show-a-solution-in-the-portal/).
