# SEO Spec — Pricing `/pricing`
> Agent 05 · SEO Stratège — 2026-06-05

---

## Mot-clé primaire

**`open source AI agent platform free`**
- Intention : Commercial (évaluation, comparaison de prix)
- Concurrence estimée : Moyen (Dify, Flowise, n8n apparaissent — mais sur leurs propres pages, pas sur ce terme exact)
- Tendance : Croissant — "free self-hosted AI" explose en 2026
- Horizon réaliste : 6-12 mois

---

## Mots-clés secondaires

| Mot-clé | Intention | Difficulté | Usage sur la page |
|---|---|---|---|
| `self-hosted AI agent platform` | Commercial | Faible-moyen | Hero subhead + Free tier |
| `white label AI agent platform pricing` | Transactionnel | Très faible | Enterprise tier microcopy |
| `AI agent platform bring your own key` | Informationnel | Très faible | BYOK encart |
| `open source AI automation pricing` | Commercial | Faible | Hero H1 ou subhead |
| `AI agent platform for agencies` | Commercial | Faible | Enterprise + BYOK section |

---

## Réalité SERP

`open source AI agent platform free` : Dify (Apache 2.0), Flowise, n8n (Sustainable Use License) sont présents — mais sur leurs pages pricing respectives. Le terme exact n'est pas fortement contesté comme landing page optimisée. 6-12 mois réaliste.

`self-hosted AI agent platform` : Faible concurrence directe sur landing page. Les SERPs montrent des articles comparatifs, pas des pages pricing.

`white label AI agent platform pricing` : quasi vide. Stammer.ai, Lety.ai ont des pages pricing mais ne sont pas optimisés pour cette longue traîne. Opportunité.

---

## Title tag

```
Agentivity Pricing — Free Open Source, Cloud & Enterprise
```
*(57 caractères)*

---

## Meta description

```
Start free with Docker — unlimited agents, no time limit. Cloud plans coming soon. Enterprise includes SSO, audit logs, and white-label. Bring your own API key always.
```
*(166 caractères — couper à "white-label." pour 155)*

Version courte :
```
Start free with Docker — unlimited agents, no time limit. Cloud plans coming. Enterprise: SSO, audit logs, white-label. Bring your own API key.
```

---

## H1 — Confirmation copy Agent 04

```
Simple, transparent pricing.
```
⚠️ Court et propre en copy — mais aucun mot-clé SEO.

**Recommandation :** Conserver le H1 (clarté copy), enrichir la subhead.

Subhead actuel : *"Open source at the core. Cloud when you need it. You always own your API keys."*

**Subhead révisé :**
*"Open source at the core — self-host free, forever. Cloud when you need it. Your API keys, always."*
→ Intègre `open source` + `self-host free` sans modifier le sens ni le ton.

---

## Structure H2 avec mots-clés mappés

| H2 / Section actuelle | Mot-clé mappé | Action |
|---|---|---|
| Free tier tagline : "Self-host. Full control." | `self-hosted AI agent platform` | Ajouter bullet : *"The most flexible self-hosted AI agent platform — free, forever."* (une ligne, pas un H2) |
| Enterprise tagline : "Enterprise-grade." | `white label AI agent platform` | Ajouter bullet : *"White-label — build on Agentivity, deliver as your own."* |
| "You control your API keys. Always." (BYOK H3) | `AI agent platform bring your own key` | ✅ Déjà fort. Ajouter : *"Works with any OpenAI-compatible API — no lock-in."* |
| "A word on our licence." (H3) | *(branding)* | Pas de cible SEO directe |
| FAQ | PAA ciblés | Voir ci-dessous |

---

## Ajustements copy recommandés

**Free tier — ajouter bullet :**
```
- The only self-hosted AI team builder — free, forever, no usage cap
```

**Enterprise tier — ajouter bullet :**
```
- White-label available — sell Agentivity-powered products under your own brand
```
→ Remplace ou complète le microcopy actuel *"Need help setting up? We offer onboarding sessions."*

**BYOK encart — ajouter une ligne :**
Après *"Your data, your costs, your control."*, ajouter :
*"Compatible with any OpenAI-compatible provider — not just Anthropic and OpenAI."*
→ Capture les recherches `local LLM AI agent platform` et `ollama AI agent`.

**FAQ — ajouter une question :**
> **Q : Can I use Agentivity as a white-label platform for my clients?**
> Yes — the Enterprise plan includes white-label options. You build on Agentivity, deliver under your brand. [Contact us →]

---

## Questions PAA à adresser (FAQ)

| Question PAA | Réponse dans la page | Action |
|---|---|---|
| "Is the Free plan really free?" | ✅ Déjà dans FAQ | Conserver |
| "What's Docker?" | ✅ Déjà dans FAQ | Conserver |
| "Do I need an API key?" | ✅ Déjà dans FAQ | Conserver |
| "When do the cloud plans launch?" | ✅ Déjà dans FAQ | Conserver |
| "Can I white-label Agentivity for clients?" | ❌ Absent | **Ajouter** (voir ci-dessus) |
| "What's the difference between Free and Enterprise?" | ❌ Absent | **Ajouter** — 2 lignes suffisent |

---

## Liens internes recommandés

| Ancre | Destination | Contexte |
|---|---|---|
| "Full guide in the docs →" | `/docs` | FAQ Docker |
| "How to get an API key →" | `/docs` ou article blog futur | FAQ API key |
| "See how it works →" | `/how-it-works` | Intro page ou Free tier |
| Compare pages | `/compare/agentivity-vs-n8n` etc. | FAQ "How does Agentivity compare to n8n?" |

---

## Schema markup recommandé

```json
[
  {
    "@type": "Offer",
    "name": "Free — Self-hosted",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Open source, Docker, unlimited agents and teams. Bring your own API key."
  },
  {
    "@type": "Offer",
    "name": "Enterprise",
    "description": "SSO, RBAC, audit logs, budget management, white-label, dedicated support."
  }
]
```

+ `FAQPage` schema sur les 6 questions FAQ de la page.
