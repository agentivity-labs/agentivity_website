---
title: "Choose how a team works together"
description: "The five ways a team of agents can work in Agentivity (Sequential, Concurrent, Handoff, Group Chat and Manager-led), and when to use each."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/teams/choose-how-a-team-works.md. Do not edit here: edit the source and publish again. -->

When you create a team, the Studio asks you to **Choose an Orchestration Pattern**. The pattern is the way the members of the team work together. There are five.

## The five patterns

| Pattern | How the members work |
|---|---|
| **Sequential** | The members work one after another, in the order of the team. Each one receives what the previous one produced. |
| **Concurrent** | All the members work at the same time on the same request. Their results are gathered when everyone has finished. |
| **Handoff** | One member is active at a time. It can pass the request to another member, among those the team allows. |
| **Group Chat** | The members take turns in one shared conversation, up to a maximum number of turns. Each member reads what the others said. |
| **Manager-led** | A manager supervises the work. It sends the request to one member at a time, reads the result, then sends another member or gives the final answer. |

## When to use each one

**Sequential**: the work is a chain, and each step builds on the one before. Example: a researcher gathers facts, a writer writes the note, a reviewer corrects it. This is the simplest pattern, and a good first choice.

**Concurrent**: you want several independent opinions or parts at once. Example: three specialists each study the same contract, one for the legal side, one for the costs, one for the risks.

**Handoff**: the request must reach the right specialist, and you do not know in advance which one. Example: a front desk understands a customer request and passes it to a billing specialist or to a technical specialist.

**Group Chat**: the members must react to each other. Example: a writer and a critic improve a text over a few turns.

**Manager-led**: the work has many parts, and someone must decide what to do next. Example: the **Trip Manager Team** showcase, where a manager sends the flight, the hotel and the transfers to different specialists.

## What each pattern needs

| Pattern | Members | Order | Manager | Links to draw |
|---|---|---|---|---|
| **Sequential** | At least one | The order in which you added them | No | None |
| **Concurrent** | At least two | Does not matter | No | None |
| **Handoff** | At least one | The member that starts is chosen from the request | No | None, unless you want to limit who may pass the work to whom |
| **Group Chat** | At least two | They speak in the order in which you added them | No | None |
| **Manager-led** | At least two: the manager and one other | The manager decides | Yes: the member at the top position | None |

In every pattern, give each member a clear role. In **Handoff** and **Manager-led**, the choice of who works next is made from the roles.

## When not to use a pattern

- **Sequential**: not for work that needs a decision about who goes next.
- **Concurrent**: not for steps that need the result of another step.
- **Group Chat**: not for work with a clear sequence, or with one precise thing to deliver.
- **Manager-led**: choose **Handoff** instead when the specialists should decide among themselves who goes next.

## Positions on the canvas

In a team, each place on the canvas is a position, and the pattern gives each position its meaning. In a **Manager-led** team, the position at the top is the manager, and the positions below are the members it sends work to. In a **Sequential** team, the positions follow the order of the work.

- To put a member at a position, drag it from the list **Members** onto the canvas. In a **Manager-led** team, the first member you add takes the top position.
- To exchange two members, drag one onto the other: they swap places.

## A problem with Manager-led teams built by hand

In the version these pages were checked against, a **Manager-led** team built by hand was saved without its manager, even with a member at the top position. Such a team refuses to run, with the message "A manager-led team needs a manager: none of its members is named as the manager."

Until this is corrected, ask the [Assistant](/docs/getting-started/build-your-first-team-with-the-assistant/) to build a Manager-led team, or start from the **Trip Manager Team** showcase.

## Good to know

- The pattern of a team is shown at the top right of its editor.
- A member of a team can be an agent, another team or a workflow.
- Keep teams small. A team with many members is harder to follow, and each member that works uses the AI model.

## Next step

[Create a team of agents](/docs/teams/create-a-team/), or [run a team and read its work](/docs/teams/run-a-team/).
