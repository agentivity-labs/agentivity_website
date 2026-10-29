---
title: "AI CV screening: how to keep a recruiter in charge"
description: "How AI CV screening works, step by step: AI reads the CV, a program computes the score, fixed rules route the case, and a recruiter decides. With the risks to watch."
pubDate: 2026-10-10
updated: 2026-10-29
author: "Agentivity Team"
tags: ["HR", "CV screening", "use case", "how-to"]
lang: en
faq:
  - q: "Does the AI reject candidates on its own?"
    a: "As delivered, the example workflow writes a \"rejected\" report for a very low score without a review step, and a \"shortlisted\" report for a very high one. Both are recommendations written for the recruiter: nothing is sent to a candidate. Before any real use, change it so that a recruiter confirms every rejection, or reviews every case."
  - q: "What can I give it: a file, a link, plain text?"
    a: "All three. The CV and the job description can each be a file, a link to a web page, or pasted text. If a document cannot be read, the workflow says so and asks to start again."
  - q: "Can I change the criteria?"
    a: "Yes. The workflow is drawn in the Agentivity Studio, step by step. The instructions of the AI steps are written in plain words, and the two thresholds that choose the route are in steps you can read and change."
  - q: "Where does the candidate data go?"
    a: "The workflow runs in your workspace: on your own server with the Community edition, or in a hosted workspace stored in the European Union. The text of the CV is sent to the AI model provider used for the assessment. Check that provider's terms, and tell candidates how their data is used."
  - q: "Is AI CV screening legal?"
    a: "It is regulated. In the European Union, the AI Act lists recruitment among high-risk uses of AI, and the GDPR gives people rights over decisions made only by automated means. Keep a person in the decision and ask your legal adviser before you go live."
---

<figure>
<video controls muted loop playsinline preload="none" poster="/media/cv-screening.jpg" width="1418" height="770">
<source src="/media/cv-screening.mp4" type="video/mp4" />
</video>
<figcaption>Demo: the CV Screening workflow in the Agentivity Studio, first up close, then in full. Recorded from the product.</figcaption>
</figure>

Forty applications for one role, and each CV needs the same careful read against the same job description. By the twentieth, attention drops, and the fortieth does not get the read the first one got.

AI CV screening hands that reading to AI, without handing over the decision. The example in this article splits the job the way a careful recruiting team would: **AI reads and judges, a program computes the score, fixed rules choose the route, and a recruiter decides** the cases that need a person. It is one of the ready-made solutions in Agentivity: you can open it, run it on fictitious CVs and change it. [Try it in a free trial, no card.](/start/?utm_source=blog&utm_medium=article&utm_campaign=cv-screening)

## What AI CV screening does, and what it does not

**It does:**

- read every CV in full, including the fortieth one at the end of the day;
- compare each CV with the same job description, in the same way;
- give a score and the reasons behind it;
- route each application: shortlist, rejection, or review by a recruiter.

**It does not:**

- know your company's culture beyond what you wrote down;
- understand what a CV leaves out;
- carry responsibility for the hiring decision. That stays with a person.

## How does it work, step by step?

The example is the **CV Screening** workflow that comes with Agentivity: one workflow of thirty-four elements, drawn in the Studio. The path is drawn in advance, and AI works only in some steps.

### 1. The documents

The recruiter gives two things: the CV and the job description. Each can be a file, a link or pasted text, so a job description published on your careers page works as well as a document. One step separates the three ways in, another joins them again, so the rest of the path is the same.

### 2. The reading

The workflow extracts the text of a file, or reads the web page behind a link. If it cannot read a document, it does not guess: it says so in the chat and asks to start again.

### 3. A regular structure

Two AI steps put the CV and the job description in the same regular structure. Both are told to keep only what is written, and to invent nothing.

### 4. The assessment, on six axes

An AI step scores the fit from 0 to 100 on six axes, and writes its reasons. Another notes career facts, such as the seniority.

### 5. One score, computed by a program

A small program makes a weighted average of the six axes, with weights taken from what the job description says matters. **The same six scores always give the same result**, and the report can show the formula.

### 6. The route, by fixed rules

Two fixed thresholds choose the route: **75 or more** goes to the shortlist, **less than 50** to a rejection, and everything in between to a recruiter. The thresholds are in steps you can read and change. An AI model does not choose the path.

### 7. The recruiter, then the report

For the cases in between, a form shows the recruiter the score, the reasons, and the skills found and missing, and waits for the decision. Then an AI step writes the report for that outcome.

The [CV Screening page](/use-cases/cv-screening) shows the same steps with the building blocks used.

## Where does the recruiter stay in charge?

At three points, and it is worth being deliberate about each.

**When a document cannot be read.** A scanned CV, a broken link: the workflow says so instead of inventing.

**When the case is doubtful.** A strong profile that misses one requirement, a career change, an unusual path. These are the cases where judgement matters most, and they go to a person.

**On rejections.** As delivered, the example writes a "rejected" report for a score under 50 without a review step. It is a recommendation for the recruiter, and nothing goes to the candidate, but **the first change to make before any real use is to send rejections, or every case, to the review form**. Reading a short explanation and agreeing or disagreeing takes seconds, and it means no candidate is turned down by software alone.

The recruiter's time moves from reading every CV to reviewing the ones that deserve attention. Where else a person should stay in charge is covered in [human in the loop](/blog/human-in-the-loop-ai).

## Why a workflow and not a free-roaming AI?

Because candidates must be treated the same way.

A workflow follows the path you drew, identically for every application. That gives you two things recruiting needs: consistency, because each CV goes through the same steps against the same criteria, and a trail, because you can show which steps an application went through and why it ended where it did.

A team of AI experts, which decides how the work moves between its members, suits work where each request is different, like [the nine experts of Shopping Lab comparing a product across two stores](/blog/ai-agents-compare-products-shopping-lab): see [the five ways AI experts work together](/blog/how-ai-agents-work-together). Screening is the opposite: the value is in doing it the same way every time. If you are unsure which one a job calls for, [chatbot, agent, team or workflow](/blog/chatbot-agent-team-or-workflow) compares them.

## Four risks to watch

### Bias in, bias out

An AI model reflects the texts it learned from, and your instructions reflect your habits. If a job description favours one kind of profile without reason, the screening will too.

What helps: write criteria that describe the work, not the person. Keep out of the assessment anything unrelated to the job. Review a sample of rejections regularly and look for patterns.

### False precision

A score of 82 looks exact. It is not. It is a summary of a judgement, and two close scores do not mean one candidate is better.

What helps: read the reasons, not only the number. Use the score to sort, never to decide between two close candidates.

### Missing context

A CV does not say why there is a two-year gap, or what someone learned in a job with an unimpressive title. Software reads what is written.

What helps: send unusual paths to review rather than to rejection. This is where a person adds the most.

### Personal data and the law

A CV is personal data. In the European Union, the AI Act lists recruitment among the high-risk uses of AI, and the GDPR gives people rights over decisions made only by automated means.

What helps: tell candidates that AI assists the screening, keep a person in the decision, decide how long you keep applications, and ask your legal adviser or data protection officer before you start.

## The same shape, beyond CVs

Take away the CV and the job description, and the shape stays: **AI to read, a program to compute, fixed rules to route, a person to decide.** It fits any work where a document is compared with criteria:

- an offer compared with a call for tenders;
- an invoice compared with an order;
- a request compared with a policy.

The three ways in, the six axes and the two thresholds become whatever your own criteria are.

## How much time does it save?

It depends on your volume, so beware of any fixed figure. What changes is where the time goes.

Without screening, time is spent reading: every CV, start to finish, to find the handful worth a conversation. With screening, the reading is done before you arrive, and your time goes to the doubtful cases and to the candidates themselves.

The Agentivity Studio shows the time saved on its home screen, so you can check on your own figures rather than ours.

## How do you try it?

CV Screening is one of the ready-made solutions included in the free trial.

1. **[Start a free trial](/start/?utm_source=blog&utm_medium=article&utm_campaign=cv-screening)**: 14 days, no card.
2. Add **CV Screening** from the welcome guide, then open it in **Studio** > **Workflows**.
3. Select **Execution**, then **Run**, and give a CV and a job description when the workflow asks. Use fictitious ones.
4. Run it on a few cases for a role you know well, and compare its routes with your own judgement.
5. Change the thresholds and the instructions until the cases it sends you are the ones you would want to see.

Start with a role you have hired for before. You already know what a good candidate looks like, which makes it easy to tell whether the screening agrees with you, and to correct it when it does not.

Prefer your own server? The same workflow comes with the free [Community edition](/community).
