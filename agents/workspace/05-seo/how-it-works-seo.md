# SEO Spec — How it works `/how-it-works`
> Agent 05 · SEO Stratège — 2026-06-05

---

## Mot-clé primaire

**`how to build AI agents without coding`**
- Intention : Informationnel (quelqu'un qui évalue si c'est possible pour lui)
- Concurrence estimée : Moyen (Dust, n8n blog, Relevance AI ont des articles)
- Tendance : Croissant fortement
- Horizon réaliste : 6-12 mois

---

## Mots-clés secondaires

| Mot-clé | Intention | Difficulté | Usage sur la page |
|---|---|---|---|
| `agentic workflow builder` | Commercial | Faible (terme émergent) | H2 ou subtext section AGENTIC+DET |
| `AI agent topology` | Informationnel | Très faible | Section TEAMS — liste des topologies |
| `visual AI agent builder` | Commercial | Faible-moyen | PAGE HERO subhead |
| `multi-agent workflow no code` | Commercial | Moyen | Section TEAMS |
| `agentic and deterministic workflow` | Informationnel | Très faible (quasi nul) | Section "Not everything needs to think" |

---

## Réalité SERP

`how to build AI agents without coding` : SERP dominé par des articles de blog (Dust blog, Lindy blog, n8n blog). Aucune landing page produit ne domine. Le contenu qui gagne = tutoriel structuré avec étapes claires. Notre page How it works a exactement ce format.

`agentic workflow builder` : quasi aucune concurrence directe sur ce terme exact — opportunité court terme.

`agentic and deterministic workflow` : article Medium + Salesforce blog. Personne n'a de landing page sur ce terme. Première page possible rapidement.

---

## Title tag

```
How Agentivity Works — Build AI Agent Teams Without Code
```
*(56 caractères)*

---

## Meta description

```
Place agents on a visual canvas, choose a team topology, and run. No code required. See how Agentivity combines agentic and deterministic steps in one flow.
```
*(156 caractères)*

---

## H1 — Confirmation copy Agent 04

```
How Agentivity works.
```
⚠️ Faible en SEO seul — le H1 ne contient pas le mot-clé primaire.

**Recommandation :** Garder le H1 tel quel (il est fort en copy), mais s'assurer que le premier paragraphe visible contient `build AI agents without code` ou `build your AI team without writing code`.

La subhead actuelle *"You don't write code. You build a team."* couvre cet angle — ✅ à conserver.

---

## Structure H2 avec mots-clés mappés

| H2 actuel | Mot-clé mappé | Action |
|---|---|---|
| "The Canvas" | `visual AI agent builder` | Ajouter "Your visual AI workspace" dans le sous-texte |
| "Agents" | *(branding)* | Pas de cible SEO directe — section de définition |
| "Teams" | `AI agent topology`, `multi-agent workflow no code` | Ajouter "topology" dans le H2 ou sous-titre : "Teams & Topologies" |
| "Start faster with Synergi." | *(branding)* | Pas de cible SEO directe |
| "Not everything needs to think." | `agentic and deterministic workflow` | **Modifier le H2** → "Agentic and deterministic — in one flow." (intègre le terme recherché) |
| "Who does what?" | *(branding)* | Pas de cible SEO directe |

---

## Ajustements copy recommandés

**Section TEAMS — H2 ajusté :**
Remplacer : *"Teams"*
Par : *"Teams & Topologies"*
→ Intègre `AI agent topology` naturellement, sans changer le sens.

**Section AGENTIC+DETERMINISTIC — H2 ajusté :**
Remplacer : *"Not everything needs to think."*
Par : *"Agentic and deterministic — in one flow."*
→ Ce terme est recherché, quasi non contesté, et décrit exactement ce que fait la section.

**Subhead PAGE HERO — ajout micro-signal :**
Remplacer : *"You don't write code. You build a team."*
Par : *"You don't write code. You build a team — visually."*
→ Ajoute `visually` qui supporte `visual AI agent builder`.

**Encart honnêteté Agents — conserver tel quel :**
*"It's low-code, not no-code. Builders love it."* — honnête ET différenciateur SEO sur les recherches "low-code AI agent builder".

---

## Questions PAA à adresser

1. "What is an AI agent topology?" → répondre dans la section Teams & Topologies (ajouter 1 phrase de définition)
2. "What's the difference between agentic and deterministic workflows?" → répondre dans la section AGENTIC+DET (déjà couvert, renforcer)
3. "Can I build AI agents without Python?" → à ajouter dans l'encart Builder vs User
4. "How do multiple AI agents work together?" → répondre dans la section Teams

---

## Liens internes recommandés

| Ancre | Destination | Contexte |
|---|---|---|
| "Browse Synergi →" | `synergi.agentivity.io` | Section Synergi |
| "See it in action →" / Use case examples | `/use-cases` | Section Teams ou CTA |
| "Star on GitHub" | GitHub + `/docs` | CTA final |
| "Ready to build your first team?" | `/docs` | CTA final |

---

## Schema markup recommandé

```json
{
  "@type": "HowTo",
  "name": "How to build an AI agent team with Agentivity",
  "step": [
    { "@type": "HowToStep", "name": "Compose", "text": "Place agents on your canvas. Give each one a role, tools, and instructions." },
    { "@type": "HowToStep", "name": "Structure", "text": "Choose your team topology — sequential, group chat, or concurrent." },
    { "@type": "HowToStep", "name": "Run", "text": "Launch your team. They collaborate and deliver automatically." }
  ]
}
```

→ Éligible aux rich snippets "How to" dans les SERPs.
