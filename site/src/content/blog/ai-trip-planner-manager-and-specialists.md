---
title: "AI trip planner: how a manager and twelve AI agents plan a whole trip with you"
description: "A trip means flights, a hotel, transfers, a dinner and a budget that holds. Here is how a manager and twelve AI experts plan it together, while the traveller decides at each step."
pubDate: 2026-10-29
author: "Agentivity Team"
tags: ["AI agents", "teams", "use case"]
image: "/media/blog/trip-manager/cover.jpg"
imageAlt: "Demo of the Trip Planner app: the hotel specialist proposes a hotel in Lisbon with its photo and price, and the team of thirteen is shown beside the chat."
lang: en
faq:
  - q: "Are the bookings and the payment real?"
    a: "No. Trip Manager Team is a demonstration. Each specialist plays the part of a booking service: no real flight, hotel or table is booked, and no money is charged. The confirmation codes are simulated too."
  - q: "Why a manager, and not a team that works in a fixed order?"
    a: "Because no two trips need the same specialists. A city weekend needs no rental car, a trip abroad may need visa advice. The manager reads the request and calls only the specialists it needs, in the order the trip calls for."
  - q: "Does the team choose for me?"
    a: "No. The specialists propose options and the traveller chooses: the flights, the hotel, how to get there, the table for dinner. The reservations are recorded only after the payment step reports an authorised payment."
  - q: "Can I use the same team for something other than travel?"
    a: "Yes. Keep the shape: one manager, specialists with narrow roles, and a clear rule for what happens last. It fits any request with several parts and one person who decides: an event, an offer for a client, the arrival of a new employee."
  - q: "Can I put this team behind my own app?"
    a: "Yes, with a developer. Trip Planner is an example app built on this team, and its code is public. Inside Agentivity, you use the team as it is, from the Studio."
---

<figure>
<video controls muted loop playsinline preload="none" poster="/media/blog/trip-manager/cover.jpg" width="1024" height="768">
<source src="/media/trip-planner.mp4" type="video/mp4" />
</video>
<figcaption>Demo: one request, a manager and its specialists, one trip. The specialists propose the flight, the hotel and the dinner, the traveller chooses each one, and the team lights up beside the chat as it works. Recorded from Trip Planner, an app built on this team. Bookings and payment are simulated.</figcaption>
</figure>

Three days in a city for two, in June, with a budget of 1,500 euros. That means flights at the right times, a hotel in the right district, a way from the airport, a dinner worth the trip, perhaps insurance. Five websites, a dozen tabs, and every new choice moves the total.

A travel agent would not do all of that alone. They would hand the flights to a colleague, the hotel to another, and keep an eye on the budget. **Trip Manager Team** works like that agency: a manager and twelve AI experts, each with its own job, who plan the trip together. The specialists propose, and **the traveller decides at each step**.

It is a demonstration: **bookings and payment are simulated**, and nothing is booked or charged. It is also one of the ready-made solutions in Agentivity, so you can open it, run it on your own trip and change it. [Try it in a free trial, no card.](/start/?utm_source=blog&utm_medium=article&utm_campaign=trip-manager)

## The team: a manager and twelve specialists

<figure>
<img src="/media/blog/trip-manager/editor.jpg" alt="The Trip Manager Team in the Studio editor: the manager, a dark hexagon, at the top, and the twelve specialists below in four tinted groups, Money, Booking, Advice and Support, with the pill Manager-led beside the name." width="1600" height="904" loading="lazy" decoding="async" />
<figcaption>Demo workspace: Trip Manager Team in its editor. The manager at the top, the twelve specialists in four groups.</figcaption>
</figure>

Each member has a role of one sentence and its own instructions. The manager chooses who works from those roles.

**The manager**

- **Trip Manager.** Talks with the traveller, splits the trip into parts, and sends each part to the right specialist. It does not search for flights or hotels itself: it knows who should.

**Six specialists who propose.** Each one comes back with options in its own field. They **only propose: they do not book**.

- **Flight Specialist**: the flights.
- **Hotel Specialist**: the hotel that fits best.
- **Car Rental Specialist**: a rental car, when it makes sense.
- **Restaurant & Dining Specialist**: restaurants.
- **Ground Transport Specialist**: airport transfers and local transport.
- **Travel Insurance Specialist**: an insurance policy.

**Three advisers who inform.**

- **Activity Planner**: a day-by-day programme around the traveller's interests.
- **Visa & Documents Specialist**: the visa, passport and vaccination requirements.
- **Currency & Budget Advisor**: the currency, and whether the budget holds across all the parts.

**Two members for the money and the bookings.**

- **Payment Agent**: handles the simulated payment and says whether it was authorised.
- **Reservation Agent**: records every reservation with a confirmation code, **only once the payment is authorised**.

**One member for later.**

- **On-Trip Assistant**: handles changes once the trip is confirmed. It is not used during planning.

### Why thirteen experts and not one assistant

- **One job each.** "Propose flights that fit the budget" is a role an expert can do well and you can check. "Plan the whole trip" is not.
- **The traveller stays in charge.** The specialists propose, the traveller chooses. No part of the trip is decided for them.
- **A rule for the last step.** Nothing is recorded before the payment step says yes. That order is written in the roles and the instructions, not left to chance.
- **Only the experts the trip needs.** A city weekend does not call the car rental specialist. The others wait.

## How they pass the work

The team is **Manager-led**: the manager sends the request to one specialist at a time, reads what comes back, then decides who works next or gives the final answer. It is one of the [five ways AI experts work together](/blog/how-ai-agents-work-together), and the right one when no two requests need the same steps.

That is the difference with [Shopping Lab](/blog/ai-agents-compare-products-shopping-lab), whose nine experts always work in the same order: the comparison of a product always has the same steps, a trip does not. A weekend away and a month abroad do not call on the same specialists, and the manager adapts the plan to each request.

The team keeps the trip in **two data tables**: one row per trip (destination, dates, travellers, budget, itinerary), and one row per booking with its kind and its status. After an execution, you can open them and see what was planned and recorded.

## Where the traveller decides

Every member of the team can show something to the traveller or ask a question. In practice, a trip goes like this:

1. **The request.** One sentence: a city, the dates, the number of travellers and a budget.
2. **The flights.** The flight specialist proposes an option; the traveller accepts it or asks for another.
3. **The hotel.** The hotel specialist shows options; the traveller chooses one.
4. **Getting there, and dinner.** The transfer and the table for dinner, each one proposed and then chosen.
5. **Payment, then reservations.** The payment agent handles a simulated payment. Once it is authorised, the reservation agent records each booking, and the traveller gets a recap of the trip.

The team does the searching and the arithmetic; the person keeps every choice that matters to them. Where a person should stay in the loop, and where they need not, is covered in [human in the loop](/blog/human-in-the-loop-ai).

## What you would change for your own case

Trip Manager Team is a shape as much as a demo: **one manager, specialists with narrow roles, and a clear rule for what happens last.** It fits any request that has several parts and one person who decides.

- **A travel agency.** Point the specialists at your own offers, kept in a data table, instead of simulated ones.
- **An event.** A venue specialist, a catering specialist, a speakers specialist, and the same manager.
- **An offer for a client.** Specialists for each part of the offer, a budget adviser, and an approval before anything is sent.
- **The arrival of a new employee.** Equipment, accounts, a first-week programme, each handled by its own expert.

Keep the roles narrow and clear: the manager chooses who works from them, so a vague role is handed work badly. If you are not sure your job needs a team at all, start with [chatbot, agent, team or workflow: which one do you need?](/blog/chatbot-agent-team-or-workflow)

## Good to know

- **Bookings and payment are simulated.** Each specialist plays the part of a booking service. No real flight, hotel or table is booked, no money is charged, and the confirmation codes are invented.
- **It costs model calls.** The manager and each specialist that works use the AI model, so a trip uses more calls than one question to an assistant.
- **It is an example.** Read its roles and instructions before you adapt it to real work.
- **It can become an app.** Trip Planner is an example app built on this team, with a card for each choice. Its code is public for developers; see [what a VibeApp is](/blog/what-is-a-vibeapp).

## Try it

The free trial includes the ready-made solutions. Add **Trip Manager Team** from the welcome guide, open it in **Studio** > **Agents**, switch to **Execution**, and ask for a trip in one sentence: a city, the dates, the number of travellers and a budget. Then answer when a specialist shows you options.

**[Start a free trial](/start/?utm_source=blog&utm_medium=article&utm_campaign=trip-manager)**: 14 days, no card.
