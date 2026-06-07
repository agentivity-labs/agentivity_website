---
title: "How to automate your HR pipeline with AI agents (without reading a single CV)"
description: "From job description to shortlisted candidates — here's how to build an AI agent team that handles the full hiring pipeline overnight, and what to watch out for."
pubDate: 2026-06-06
author: "Agentivity Team"
tags: ["HR", "automation", "use case", "how-to"]
lang: en
---

Hiring is one of the most time-consuming processes in any organisation. A single role can mean:

- Writing the job description (2 hours)
- Publishing across 3–5 platforms (1 hour)
- Reading 40–200 CVs (4–20 hours)
- Scoring and shortlisting (2–4 hours)
- Preparing interview questions (1 hour)

That's 10–28 hours of work before a single conversation with a candidate. And most of it is process — not judgment.

AI agent teams can handle the process. Your job is the judgment.

## The HR agent team

Here's a 7-agent team that covers the full pipeline from job brief to shortlisted candidates:

```
JD Writer
  → Publisher
    → CV Parser (concurrent for each application)
    → Skills Matcher (concurrent)
    → Culture Fit Assessor (concurrent)
      → Question Generator
        → Report Formatter
```

Let's walk through each agent.

### Agent 1: JD Writer

**Role:** Write the job description from a brief.

**Input:** A short brief — role title, team, key responsibilities, must-haves, nice-to-haves, salary range.

**Output:** A structured job description in your company's tone, ready to publish.

**Prompt pattern:**
> You are a senior HR professional who writes compelling, bias-aware job descriptions. Given a brief, produce a JD that is clear, structured, and appeals to qualified candidates without using exclusionary language. Output in Markdown.

**Why it matters:** Most JDs are written by hiring managers who aren't writers. The result is vague requirements, inflated must-haves, and language that puts off qualified candidates. A trained agent writes tighter, fairer JDs faster.

---

### Agent 2: Publisher

**Role:** Distribute the JD to the right platforms.

**Tools:** LinkedIn API, Indeed API, internal careers page webhook, Slack (to notify the team).

**Output:** Confirmation of where the role was posted and the URLs.

This agent is mostly tool use — no complex reasoning. The value is removing the manual copy-paste across platforms.

---

### Agents 3–5: CV Parser, Skills Matcher, Culture Fit (Concurrent)

These three agents run simultaneously for each incoming application.

**CV Parser:**
- Extracts structured data from the CV (name, experience, skills, education, gaps)
- Normalises format so the next agents work from clean data

**Skills Matcher:**
- Compares extracted skills to the JD requirements
- Scores match on must-haves (0/1) and nice-to-haves (weighted)
- Flags missing critical skills

**Culture Fit Assessor:**
- Analyses career trajectory, project descriptions, and self-presentation
- Scores alignment with company values (defined in system prompt)
- Flags red flags or strong indicators

Running these concurrently cuts processing time per application from ~3 minutes (sequential) to ~45 seconds.

---

### Agent 6: Question Generator

**Role:** Produce tailored interview questions for shortlisted candidates.

**Input:** The candidate's parsed profile + their scores from agents 3–5.

**Output:** 5–8 role-specific questions, plus 2–3 questions targeting the specific gaps or uncertainties the scoring agents flagged.

This is where the agent moves beyond screening into real value-add. Generic interview questions are useless. Questions based on *this candidate's specific profile* — their career gap in 2022, the project they described but didn't quantify — are what good interviewers ask.

---

### Agent 7: Report Formatter

**Role:** Compile everything into a recruiter-ready report.

**Output per candidate:**
- Executive summary (3 sentences)
- Score breakdown (must-haves, nice-to-haves, culture fit)
- Key strengths
- Concerns to probe
- Suggested interview questions
- Recommended action (advance / hold / decline)

**Output overall:**
- Ranked shortlist of the top N candidates
- Distribution of the applicant pool by score

---

## The workflow in practice

1. **Monday 9am:** Hiring manager submits a 200-word brief.
2. **Monday 9:05am:** JD Writer produces the job description. Hiring manager reviews, approves with minor edits.
3. **Monday 9:10am:** Publisher posts to LinkedIn, Indeed, and the careers page. Team is notified in Slack.
4. **Applications arrive** over the next 3–5 days.
5. **Each application triggers** the concurrent pipeline: CV parsed, skills matched, culture assessed. Done in under a minute.
6. **Friday 7am:** Report Formatter compiles the week's applications into a ranked report.
7. **Friday 9am:** The hiring manager opens a clean shortlist. 40 CVs processed. 8 candidates recommended. Interview questions ready.

Total time from the hiring manager: ~30 minutes.

---

## What to watch out for

### Bias in, bias out
Your Skills Matcher and Culture Fit agents are only as fair as their prompts and the JD they're scoring against. Audit their outputs regularly. Add explicit bias checks to the Culture Fit agent's system prompt.

### False precision
A score of 87/100 feels precise. It isn't. Use scores as a filter and a conversation starter, not a final decision. The agent helps you focus — the decision is yours.

### Missing context
A CV is a marketing document. It doesn't capture what the candidate is actually like in a team, under pressure, or in a meeting. The agents screen for fit on paper. The interview is still essential.

### GDPR and data retention
If you're in the EU, you need a lawful basis for processing candidate data with AI tools. Make sure your Agentivity instance runs on your own infrastructure (BYOK, self-hosted) so candidate data never leaves your environment.

---

## Getting started

You don't need all 7 agents on day one. A minimal viable HR team is:

1. **CV Parser** — structured extraction from PDFs
2. **Skills Matcher** — scored against the JD
3. **Report Formatter** — clean output for the recruiter

That alone eliminates 80% of the manual work. Build from there.

[Try the HR pipeline template in Synergi →](/use-cases#hr)
