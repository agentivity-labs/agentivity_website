# Brief Stratégique — Agentivity
> Produit par l'Agent 01 · Strategy
> Date : 2026-06-05
> Statut : Validé en session collaborative

---

## 1. Positionnement

**Catégorie créée :** Plateforme de composition d'équipes d'agents IA — ni workflow builder, ni outil de scripting, ni simple chatbot. On compose des équipes d'employés IA visuellement, comme on monterait une org chart.

**Différenciateur central :** La métaphore est l'équipe, pas le pipeline. L'utilisateur crée une finance team, une HR team, une personal coaching team — des équipes qui collaborent, reportent, et produisent des résultats. Pas des workflows techniques.

**Ce qu'on n'est pas :**
- Pas n8n (plomberie technique, pas des équipes)
- Pas Make / Zapier (automation d'apps, pas d'agents)
- Pas Relevance AI (trop entreprise, pas de canvas visuel)
- Pas AutoGen / CrewAI (framework développeur, pas de produit)

**Espace occupé :** Le seul outil qui combine canvas visuel + métaphore équipe + accessibilité non-technique + open source.

---

## 2. Personas

### Persona 1 — L'AI Specialist / Consultant indépendant
- **Profil :** Freelance ou petite agence spécialisée IA. Comprend la techno, facture sa valeur, cherche une plateforme à proposer à ses clients ou à revendre sous sa marque.
- **Douleur :** Les outils existants sont soit trop techniques (frameworks Python), soit trop fermés (SaaS propriétaire sans white-label).
- **Ce qu'il cherche :** Une base solide, open source, qu'il peut customiser, déployer pour ses clients, et positionner comme son propre produit.
- **Rôle dans l'écosystème :** Builder + futur partenaire accrédité (programme phase 2).
- **Message clé :** "Build on Agentivity. Deliver as your own."

### Persona 2 — Le Manager / Opérationnel PME
- **Profil :** Responsable ops, marketing, RH dans une PME 10-200 personnes. Non-technique. Veut automatiser des tâches répétitives sans dépendre de l'IT.
- **Douleur :** Les outils no-code existants automatisent des apps, pas des processus qui "réfléchissent".
- **Ce qu'il cherche :** Un template prêt à l'emploi (Agent Roster), personnalisable en quelques clics, qui produit des résultats lisibles.
- **Rôle dans l'écosystème :** Utilisateur end-user — arrive via les templates ou via un consultant Persona 1.
- **Message clé :** "Your team is ready. Just add your context."

### Persona 3 — L'Indépendant / Solopreneur
- **Profil :** Créateur de contenu, coach, consultant solo. Veut déléguer des tâches à des agents IA sans gérer une infrastructure.
- **Douleur :** ChatGPT fait des choses one-shot mais ne "travaille pas" de façon continue. Il lui faut une équipe qui tourne sans lui.
- **Ce qu'il cherche :** Des agents simples, combinables, qui gèrent des workflows récurrents (recherche, rédaction, suivi client).
- **Rôle dans l'écosystème :** Utilisateur du plan de base ou free tier.
- **Message clé :** "Your personal AI team. Working while you sleep."

### Persona 4 — La Grande Entreprise / DSI
- **Profil :** Équipe IT ou innovation dans un groupe. Cherche à déployer des agents IA à l'échelle, avec gouvernance, sécurité, et intégration SSO.
- **Douleur :** Les solutions enterprise sont des boîtes noires ou demandent des mois d'intégration.
- **Ce qu'il cherche :** Une solution open source auditable + un plan Enterprise avec SLA, support dédié, déploiement on-premise.
- **Rôle dans l'écosystème :** Cible du plan Enterprise.
- **Message clé :** "Open source core. Enterprise-grade when you need it."

---

## 3. Modèle de distribution

**Open source (BSL-style) :**
- Le core est public et auditable
- Licence protégée : impossible de forker pour créer une plateforme concurrente
- Crée la confiance, alimente la communauté, attire les Persona 1

**Monétisation :**
- Plan gratuit / open source : fonctions de base, usage personnel
- Plan Pro : fonctions avancées (analytics, multi-workspace, intégrations premium)
- Plan Enterprise : SSO, on-premise, SLA, support dédié, white-label
- Programme partenaire accrédité (phase 2) : les consultants certifiés peuvent vendre Agentivity à leurs clients

---

## 4. Architecture produit (pour le site)

**Concepts clés à expliquer sur le site :**
- **Canvas** — l'espace de travail visuel où on compose les équipes
- **Agent** — un employé IA avec un rôle, des outils, et des instructions
- **Team** — une équipe d'agents qui collaborent sur un objectif
- **Team Studio** — l'éditeur de composition d'équipes
- **Agent Roster** — la bibliothèque de templates d'agents et d'équipes prêts à l'emploi

**Niveau technique honnête :**
- Pour les Builders (Persona 1 & 4) : nécessite de comprendre les instructions d'agents, les connecteurs, les variables — pas de Python/JS, mais c'est "low-code"
- Pour les Users (Persona 2 & 3) : utilise des équipes pré-construites par des Builders — vraiment no-code

---

## 5. Concurrence

| Concurrent | Positionnement | Ce qu'ils font bien | Ce qui manque |
|---|---|---|---|
| n8n | Workflow automation open source | Communauté, intégrations | Métaphore équipe absente, technique |
| Make | Automation visuelle | UX fluide | Pas d'agents IA, pas de collaboration |
| Relevance AI | AI agents pour entreprise | Cas d'usage enterprise | Trop fermé, pas de canvas, sales-gated |
| AutoGen / CrewAI | Frameworks multi-agents | Puissance technique | Pas de produit, réservé aux devs |
| Zapier | Automation grand public | Distribution massive | Pas d'IA native, pas d'agents |

**Espace libre identifié :** Canvas visuel + métaphore équipe + accessibilité non-technique + open source. Personne n'occupe cette intersection.

---

## 6. Hero Copy (validé en session)

**H1 :**
> Build your AI team — a finance team, an HR team, a personal coaching team. Assembled visually, in minutes.

**Subhead :**
> Drag agents onto your canvas, connect them together. Your team collaborates, reports back, and gets things done — in real time.

---

## 7. Pages du site (périmètre recommandé)

1. **Home** — Positionnement + Hero + Démo + Features + Pricing + CTA
2. **Features / How it works** — Canvas, Agents, Teams, Roster expliqués
3. **Use Cases** — Finance team / HR team / Marketing team / Personal assistant
4. **Pricing** — Free / Pro / Enterprise + comparaison transparente
5. **Docs / Get Started** — Onboarding Builders
6. **About** — Vision, open source, équipe

---

## 8. Ton de voix

- **Direct et concret** — pas de jargon IA inutile
- **Ambitieux sans être arrogant** — on crée une catégorie, on ne prétend pas avoir tout inventé
- **Honnête sur la technicité** — on ne ment pas sur le niveau requis pour les Builders
- **Humain** — on parle d'équipes, pas de workflows ni de pipelines
- **Verbes d'action** — "Drag, connect, run, ship." Phrases courtes.

---

## Handoff

> Brief validé. L'Agent 02 (CRO) prend le relais pour définir la structure de navigation, les pages prioritaires, et les parcours utilisateurs — en s'appuyant sur ce positionnement et ces personas.
