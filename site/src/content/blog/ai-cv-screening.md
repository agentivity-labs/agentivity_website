---
title: "AI CV screening: how to keep a recruiter in charge"
description: "How AI CV screening works, step by step: reading the CV, scoring the fit, explaining why, and sending doubtful cases to a recruiter. With the risks to watch."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["HR", "CV screening", "use case", "how-to"]
lang: en
faq:
  - q: "Does the AI reject candidates on its own?"
    a: "It depends on how you set it up. The workflow can route a CV to a shortlist, a rejection or a review by a recruiter. We recommend that a person confirms rejections and reviews every case the workflow is not sure about."
  - q: "What can I give it: a file, a link, plain text?"
    a: "All three. The CV and the job description can each be a file, a link to a web page, or pasted text. If a document cannot be read, the workflow stops and asks a person."
  - q: "Can I change the criteria?"
    a: "Yes. The workflow is drawn in the Agentivity Studio, step by step, and the instructions of each step are written in plain words. You adapt them to your roles and to your way of assessing candidates."
  - q: "Where does the candidate data go?"
    a: "With the Community edition, the workflow runs on your own server. The text of the CV is sent to the AI model provider you connected, for the assessment. Check that provider's terms, and tell candidates how their data is used."
  - q: "Is AI CV screening legal?"
    a: "It is regulated. In the European Union, the AI Act lists recruitment among high-risk uses of AI, and the GDPR gives people rights over decisions made only by automated means. Keep a person in the decision and ask your legal adviser before you go live."
---

AI CV screening means using AI to read each CV against a job description, score how well it fits, and explain why. Done well, it does not replace the recruiter. It reads everything, sorts the clear cases, and sends the doubtful ones to a person who decides.

This article shows how that works step by step, using a real example you can install, and lists the risks to keep in view.

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

The example below is the CV Screening workflow that comes with Agentivity. It is a workflow of 34 steps, drawn in the Studio.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/cv-screening.jpg" width="1418" height="770">
<source src="/media/cv-screening.mp4" type="video/mp4" />
</video>
<figcaption>The CV Screening workflow in the Agentivity Studio, first up close, then in full. Recorded from the product.</figcaption>
</figure>

### 1. The documents

The recruiter gives two things: the CV and the job description. Each can be a file, a link or pasted text, so a job description published on your careers page works as well as a document.

### 2. The reading

The workflow extracts the text of a file, or reads the web page behind a link. If it cannot read a document, it does not guess: it stops and asks a person to help.

### 3. The assessment

AI steps compare the CV with the job description. They produce a score for the fit, and they bring out what a recruiter looks for: the level of experience and the signals in the career path. The reasons are written out, so the score can be checked.

### 4. The route

Each application goes one of three ways: to the shortlist, to a rejection, or to a review by a recruiter when the workflow is not sure.

The [CV Screening page](/use-cases/cv-screening) shows the same steps with the building blocks used.

## Where does the recruiter stay in charge?

At three points, and it is worth being deliberate about each.

**When a document cannot be read.** A scanned CV, a broken link: the workflow asks instead of inventing.

**When the case is doubtful.** A strong profile that misses one requirement, a career change, an unusual path. These are the cases where judgement matters most, and they go to a person.

**On rejections.** Our advice is to have a recruiter confirm them. Reading a short explanation and agreeing or disagreeing takes seconds, and it means no candidate is turned down by software alone.

The recruiter's time moves from reading every CV to reviewing the ones that deserve attention.

## Why a workflow and not a free-roaming AI?

Because candidates must be treated the same way.

A workflow follows the path you drew, identically for every application. That gives you two things recruiting needs: consistency, because each CV goes through the same steps against the same criteria, and a trail, because you can show which steps an application went through and why it ended where it did.

A team of AI specialists, which decides its own path, suits work where each request is different. Screening is the opposite: the value is in doing it the same way every time. If you are unsure which one a job calls for, [this guide to multi-agent systems](/blog/what-is-a-multi-agent-system) compares the two.

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

## How much time does it save?

It depends on your volume, so beware of any fixed figure. What changes is where the time goes.

Without screening, time is spent reading: every CV, start to finish, to find the handful worth a conversation. With screening, the reading is done before you arrive, and your time goes to the doubtful cases and to the candidates themselves.

The Agentivity Studio shows the time saved by each team and workflow on its home screen, so you can check on your own figures rather than ours.

## How do you try it?

The CV Screening workflow comes with the ready-made examples of the Community edition, which is free and runs on your own server.

1. [Install the Community edition](/community). It takes a machine that runs Docker.
2. Connect the AI model provider you choose.
3. Open the CV Screening workflow in the Studio and read its steps.
4. Run it on a few CVs for a role you know well, and compare its routes with your own judgement.
5. Adjust the instructions until the doubtful cases it sends you are the ones you would want to see.

Start with a role you have hired for before. You already know what a good candidate looks like, which makes it easy to tell whether the screening agrees with you, and to correct it when it does not.
