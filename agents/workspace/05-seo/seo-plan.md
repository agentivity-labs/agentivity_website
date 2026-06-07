# SEO Plan — Agentivity
> Agent 05 · SEO Stratège — 2026-06-05
> Domaine : agentivity.io · Statut : neuf, zéro autorité, zéro contenu indexé
> Marché cible : US-first, global anglophone
> Pages couvertes : Home, How it works, Use Cases, Pricing, Docs + 3 pages Compare (nouvelles)

---

## 1. Situation de départ — Honnêteté totale

| Indicateur | Valeur |
|---|---|
| Domain Authority | 0 (domaine neuf) |
| Backlinks | 0 |
| Pages indexées | 0 |
| Historique SEO | Aucun |

**Ce que ça signifie :**
Un domaine neuf ne peut pas ranker sur les head terms concurrentiels dans les 12 premiers mois. Les SERPs sur `AI agent builder`, `no-code AI agent platform`, `AI tools for small business` sont dominés par des marques établies (OpenAI, Vertex AI, n8n, Zapier, Lindy) et des roundup articles à forte autorité (Airtable, Cybernews, Lindy).

**Ce qui est réaliste :**
- Longue traîne à faible concurrence : 3-6 mois
- Pages compare (n8n, Dify, Make) : 3-6 mois
- Angle "build your AI team" (terme non contesté) : 3-6 mois
- Angle agences / white-label : 3-9 mois
- Head terms compétitifs : 12-18 mois minimum

---

## 2. Les 3 angles de trafic

### Angle 1 — Pages Compare (priorité haute, conversion maximale)

Les recherches `n8n alternative`, `Dify alternative`, `Make alternative AI agents` sont faites par des acheteurs déjà en décision. Le SERP est dominé par des articles de blog — pas par les produits eux-mêmes. Un domaine neuf avec un contenu honnête et structuré peut ranker en 3-6 mois.

**Pages à créer (V1 — simples, pas de mega-comparatif) :**
- `/compare/agentivity-vs-n8n`
- `/compare/agentivity-vs-dify`
- `/compare/agentivity-vs-make`

**Stratégie de contenu :** Honnête. Dire clairement ce qu'ils font mieux que nous (intégrations n8n, RAG Dify), et ce qu'on fait qu'eux ne font pas (métaphore équipe, topologie visuelle, agentic+deterministic hybrid).

### Angle 2 — "Build your AI team" (territoire libre)

Aucun acteur n'occupe cette formulation en SEO. Les plateformes "AI employee" (Sintra.ai, Ema.ai, Teammates.ai) vendent des agents packagés. Agentivity = tu construis ta propre équipe. C'est une différenciation à la fois marketing ET SEO.

**Termes à occuper :**
- `build your AI team` — quasi nul en concurrence aujourd'hui
- `create AI employees for your business` — faible concurrence
- `AI team for small business` — faible concurrence
- `AI team that works overnight` — quasi nul

### Angle 3 — Agences & white-label (sous-exploité)

Le marché "white label AI platform for agencies" existe (Lety.ai, Stammer.ai) mais se limite à des chatbots et voice agents. Personne n'offre un builder d'équipes multi-agents open source white-labelable. C'est un angle de recherche réel, en croissance, avec peu de compétition directe.

**Termes à occuper :**
- `white label AI agent platform` — faible concurrence
- `AI automation platform for agencies` — faible-moyen
- `resell AI agents to clients` — très faible concurrence

---

## 3. Mots-clés par page — Vue d'ensemble

| Page | Primaire | Secondaires | Horizon |
|---|---|---|---|
| Home | `build your AI team` | `visual AI agent platform`, `white label AI agent platform` | 3-6 mois |
| How it works | `how to build AI agents without coding` | `agentic workflow builder`, `AI agent topology` | 6-12 mois |
| Use Cases | `AI team for small business` | `AI finance team automation`, `AI HR screening agent` | 3-6 mois |
| Pricing | `open source AI agent platform free` | `self-hosted AI agent platform`, `white label AI agent pricing` | 6-12 mois |
| Docs | `install AI agent platform docker` | `self-host AI agents docker`, `agentivity quickstart` | 3-6 mois |
| Compare n8n | `n8n alternative open source AI teams` | `n8n vs agentivity`, `n8n alternative with visual canvas` | 3-6 mois |
| Compare Dify | `dify alternative open source` | `dify vs agentivity`, `dify alternative multi-agent` | 3-6 mois |
| Compare Make | `make alternative AI agents` | `make.com alternative open source`, `zapier make alternative` | 6-9 mois |

---

## 4. Structure de liens internes recommandée

```
Home
├── → How it works
├── → Use Cases (3 cards)
├── → Pricing
├── → Docs (quickstart)
└── → Compare (footer ou nav secondaire)

How it works
├── → Use Cases ("See examples →")
├── → Docs ("Get started →")
└── → Synergi / Pricing

Use Cases
├── → Pricing ("Join waitlist")
├── → Docs ("Try it yourself")
└── → How it works ("How does it work?")

Pricing
├── → Docs (Free plan CTA)
├── → Use Cases (social proof)
└── → Compare pages (FAQ section)

Docs
├── → GitHub (external)
├── → Discord (external)
└── → How it works ("What can I build?")

Compare pages
├── → Home
├── → Pricing
└── → Docs
```

---

## 5. Schema markup recommandé (global)

| Page | Schema type | Raison |
|---|---|---|
| Home | `SoftwareApplication` | Produit logiciel — éligible aux rich results |
| Home | `Organization` | Backlinks futurs, Knowledge Panel potentiel |
| Pricing | `Offer` + `PriceSpecification` | Rich results pricing dans certains SERPs |
| Docs | `HowTo` | Eligible aux rich snippets pour les tutoriels |
| Use Cases | `ItemList` | Cards de use cases = liste structurée |
| Compare pages | `FAQPage` | Les questions de comparaison = PAA cibles |

---

## 6. Backlink strategy (hors SEO on-page)

*Non dans le périmètre immédiat — noté pour la roadmap.*

Actions à fort impact pour un nouveau domaine :
1. **Lancement Product Hunt** — 1 backlink DA élevé + visibilité organique
2. **GitHub README → site** — backlink automatique dès que le repo est public
3. **Hacker News Show HN** — backlink DA très élevé si upvoté
4. **Être listé dans les roundups** : contacter les auteurs de "best AI agent builders 2026" pour être ajouté
5. **Comparatif n8n** : si notre page `/compare/agentivity-vs-n8n` est bonne, les blogs qui citent n8n peuvent la linker

---

## 7. Ce qu'on ne fait PAS au lancement

- ❌ Pas de balises canonical cross-domaine (pas de sous-domaines indexés sauf `synergi.agentivity.io` — à noindex ou traiter séparément)
- ❌ Pas de ciblage fr/en simultané — anglais uniquement au lancement, hreflang quand le français arrive
- ❌ Pas d'achat de liens — trop tôt, risque de pénalité sur domaine neuf

---

## 8. Roadmap blog (quand disponible)

Articles à fort potentiel basés sur les PAA réels identifiés :

1. "How to automate your Monday morning briefing with AI" — cible Sarah (finance)
2. "How I screened 40 job applications in one hour with an AI team" — cible Marcus (HR)
3. "n8n vs Agentivity: when workflows aren't enough" — compare organique
4. "What's the difference between agentic and deterministic AI workflows?" — éducatif, PAA fréquent
5. "How to build a white-label AI product for your clients" — cible AI specialists

---

## Handoff

> Plan SEO prêt. L'Agent 06 (Design Brief) va maintenant définir l'identité visuelle — en s'appuyant sur le positionnement établi et les angles SEO identifiés. Les pages Compare sont nouvelles : à intégrer dans la nav secondaire ou le footer.
