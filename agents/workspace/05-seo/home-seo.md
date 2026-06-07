# SEO Spec — Home `/`
> Agent 05 · SEO Stratège — 2026-06-05

---

## Mot-clé primaire

**`build your AI team`**
- Intention : Informationnel + découverte produit
- Concurrence estimée : Très faible (terme émergent, non contesté)
- Tendance : Croissant (l'angle "équipe IA" remplace progressivement "AI workflow")
- Horizon réaliste : 3-6 mois

---

## Mots-clés secondaires

| Mot-clé | Intention | Difficulté | Usage sur la page |
|---|---|---|---|
| `visual AI agent platform` | Commercial | Faible-moyen | H2 HOW IT WORKS, meta |
| `white label AI agent platform` | Commercial | Faible | Section PRICING RÉSUMÉ, footer |
| `open source AI agent builder` | Commercial | Moyen | PROOF BAR, CTA final |
| `AI team for small business` | Commercial | Faible | USE CASES PREVIEW cards |
| `create AI employees for your business` | Informationnel | Faible | Subhead ou encart |

---

## Réalité SERP

Les SERPs sur `build your AI team` ne sont pas encore structurés — aucune landing page de produit ne domine. C'est l'angle à occuper en premier.

Sur `visual AI agent platform` : n8n, Flowise, Dify apparaissent dans des roundups mais aucun n'a de page optimisée sur ce terme exact. Opportunité.

Sur `open source AI agent builder` : Dify, Flowise, Langflow sont présents. Terme à 12+ mois pour un nouveau domaine.

---

## Title tag

```
Build Your AI Team — Visual, Open Source | Agentivity
```
*(59 caractères — dans la limite)*

---

## Meta description

```
Compose AI agent teams visually. No code. Finance teams, HR teams, personal assistants — built in minutes. Self-host free with Docker or join the cloud waitlist.
```
*(160 caractères — légèrement long, à couper après "minutes." si besoin)*

Version courte (155 caractères) :
```
Compose AI agent teams visually. No code. Finance, HR, marketing teams built in minutes. Self-host free with Docker or join the cloud waitlist.
```

---

## H1 — Confirmation copy Agent 04

```
Build your AI team. A finance team, an HR team, a personal assistant. Assembled visually, in minutes.
```
✅ Valide SEO — contient `build your AI team` + `AI team` + `visually` + contexte métier.

---

## Structure H2 avec mots-clés mappés

| H2 actuel (copy Agent 04) | Mot-clé mappé | Action |
|---|---|---|
| "How it works" | `visual AI agent platform` | Ajouter "visually" ou "visual" dans le H2 ou le sous-texte immédiat |
| "The building blocks" | *(branding pur)* | Pas de changement — section de définition, pas de cible SEO |
| "What will your team do?" | `AI team for small business` | Ajouter "for your business" dans le sous-titre de section |
| "Simple, transparent pricing." | `open source AI agent builder free` | Ajouter "open source" dans le texte du bloc Free |
| "Your team is ready to build." | `build your AI team` | ✅ Déjà optimisé |

---

## Ajustements copy recommandés (mineurs)

**PROOF BAR — ajouter :**
```
⭐ [N] stars on GitHub  ·  Open source · free to self-host  ·  Docker-ready · up in minutes  ·  Bring your own API key
```
→ Intègre `open source` et `bring your own API key` — deux termes recherchés.

**USE CASES PREVIEW — sous-titre de section :**
Remplacer : *"Real teams, real deliverables."*
Par : *"AI teams for small business — finance, HR, marketing and more."*
→ Intègre `AI teams for small business` naturellement.

**PRICING RÉSUMÉ — microcopy Enterprise :**
Ajouter sous la colonne Enterprise :
*"White-label available. Build on Agentivity, sell as your own."*
→ Intègre `white label AI agent platform` sans forcer.

---

## Questions PAA à adresser (FAQ ou contenu)

*Issues des SERPs observés — à intégrer en FAQ sur Home ou dans How it works :*

1. "What is an AI agent team?" → répondu par la section Building Blocks
2. "Can I self-host AI agents for free?" → répondu par Pricing + PROOF BAR
3. "Do I need to code to build AI agents?" → répondu par How it works steps
4. "What's the difference between AI agents and AI workflows?" → à ajouter dans How it works ou FAQ Pricing

---

## Liens internes recommandés

| Ancre | Destination | Contexte |
|---|---|---|
| "See how it works →" | `/how-it-works` | Section HOW IT WORKS résumé |
| "See all use cases →" | `/use-cases` | USE CASES PREVIEW |
| "See full pricing →" | `/pricing` | PRICING RÉSUMÉ |
| "Get started →" / "Star on GitHub" | `/docs` + GitHub | CTA FINAL |
| "Browse Synergi →" | `synergi.agentivity.io` | USE CASES cards |

---

## Schema markup recommandé

```json
{
  "@type": "SoftwareApplication",
  "name": "Agentivity",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Docker, Linux, macOS, Windows",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free self-hosted plan — open source"
  },
  "url": "https://agentivity.io",
  "description": "Visual platform for composing AI agent teams. Build finance teams, HR teams, and personal assistants without code."
}
```

+ `Organization` schema dans le footer (nom, URL, logo, sameAs GitHub).
