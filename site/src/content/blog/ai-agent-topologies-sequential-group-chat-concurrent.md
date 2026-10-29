---
title: "Sequential, Group Chat, Concurrent: 3 of the 5 AI team topologies to know"
description: "How you structure your AI agents matters as much as what they do. Here's a practical guide to three of the five collaboration topologies and when to use each one."
pubDate: 2026-06-04
author: "Agentivity Team"
tags: ["AI agents", "topology", "architecture", "how-to"]
lang: en
---

When you build a team of AI agents, the first question isn't "which agents do I need?" It's "how should they work together?"

The answer — the *topology* — determines whether your agents collaborate efficiently or create a tangled mess. Get it right and the team hums. Get it wrong and agents produce contradictory outputs, loop indefinitely, or deliver results that none of them actually owns.

Here are three of the five topologies, with concrete guidance on when to use each. The other two, Handoff (the request is passed to the right specialist) and Manager-led (a manager decides who works next), are explained with all five in [5 ways AI agents work together](/blog/how-ai-agents-work-together).

---

## 1. Sequential

**What it is:** Agents work in a strict chain. Agent A completes its task and passes the full output to Agent B. Agent B passes to Agent C. And so on until the final agent delivers the result.

**Mental model:** A production line. Each station does one thing and hands the part to the next.

**When to use it:**
- The task has a natural order that can't be parallelised
- Each agent's output depends entirely on the previous agent's output
- You need the process to be fully auditable — every step traceable
- Consistency matters more than speed

**Example — Financial Report Pipeline:**
```
Market Data Collector
  → Sentiment Analyst
    → Financial Modeller
      → Risk Assessor
        → Report Writer
          → Email Formatter
```

Each agent builds on the last. The Report Writer can't do its job without the Risk Assessor's findings. The Sentiment Analyst needs the raw data first. The order is not optional — it's the logic of the task.

**Tradeoffs:** Sequential is predictable and easy to debug. It's also the slowest topology — each agent must wait for the previous one to finish. For time-sensitive pipelines, consider whether any steps can be parallelised.

---

## 2. Group Chat

**What it is:** Multiple agents share a conversation context and reason together. Each agent can read what others have said, respond, challenge, and build on the emerging answer. They take turns in the order of the team, up to a maximum number of turns, and the team's answer is the last answer of the discussion.

**Mental model:** A meeting. Everyone is in the room, everyone can speak, and the goal is a shared decision — not a relay race.

**When to use it:**
- The task is ambiguous or requires judgment, not just execution
- Multiple domain perspectives improve the output
- You want agents to catch each other's errors or blind spots
- The process benefits from iteration before a final answer is produced

**Example — Strategic Content Brief:**
```
Trend Scout:        "Gen Z is moving to short-form video for financial content"
Audience Researcher: "Our data shows 45-55yo professionals are the actual buyers"
Competitor Analyst:  "Competitors are all targeting Gen Z — blue ocean for professionals"
Strategist:          → synthesises into positioning recommendation
```

No single agent has the full picture. The Group Chat lets them surface and reconcile their views before the Strategist commits to a direction.

**Tradeoffs:** Group Chat produces richer, more nuanced outputs than sequential. It also takes longer and is harder to control — agents can go in circles. Give each agent a clear role and set a maximum number of turns.

---

## 3. Concurrent

**What it is:** Multiple agents run simultaneously, each working on an independent subtask. When all have finished, the team gathers their answers, each one after the name of its agent.

**Mental model:** A parallel research sprint. Three people go research three different topics at the same time, then their findings are put side by side in one report.

**When to use it:**
- The task has clearly independent subtasks that don't depend on each other
- Speed is important and the subtasks can genuinely run in parallel
- The final output is an aggregation or synthesis of multiple inputs

**Example — Candidate Screening Pipeline:**
```
CV Parser        ──┐
Skills Matcher   ──┤ → answers gathered → Ranking Report
Culture Fit      ──┘
```

The CV Parser, Skills Matcher, and Culture Fit agents can all analyse the candidate simultaneously. If you want one recommendation rather than three answers, add a Ranking Report agent after the team, for example as the next member of a sequential team that contains it. Same quality, fraction of the time.

**Tradeoffs:** Concurrent is the fastest topology for parallelisable tasks. The team gives every answer as it is: nobody inside it resolves contradictions. If you need one coherent result, the agent that comes after it does that work, so write its instructions carefully.

---

## Choosing the right topology

Here's a simple decision framework:

| Question | Answer → Topology |
|---|---|
| Does step B depend on step A's output? | Yes → **Sequential** |
| Do multiple experts need to debate before a decision? | Yes → **Group Chat** |
| Can the subtasks run independently and be merged? | Yes → **Concurrent** |
| Do you need full auditability of every step? | Yes → **Sequential** |
| Is speed the primary constraint? | Yes → **Concurrent** |

In practice, complex workflows combine topologies. You might run a Concurrent phase (three research agents in parallel), feed their outputs into a Sequential chain (analysis → writing → formatting), with a Group Chat phase in the middle for a strategic decision.

Start with Sequential — it's the easiest to build, debug, and explain. Add Group Chat when judgment is needed. Add Concurrent when speed matters and the subtasks are truly independent.

---

*These three, and Handoff and Manager-led, are all available in Agentivity. Read [5 ways AI agents work together](/blog/how-ai-agents-work-together) for all five, or [see how it works →](/how-it-works)*
