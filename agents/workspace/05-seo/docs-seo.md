# SEO Spec — Docs `/docs`
> Agent 05 · SEO Stratège — 2026-06-05

---

## Mot-clé primaire

**`install AI agent platform docker`**
- Intention : Transactionnel (quelqu'un qui veut faire tourner le produit maintenant)
- Concurrence estimée : Faible — n8n domine "install n8n docker" mais pas le terme générique
- Tendance : Croissant — self-hosting AI explose
- Horizon réaliste : 3-6 mois

---

## Mots-clés secondaires

| Mot-clé | Intention | Difficulté | Usage sur la page |
|---|---|---|---|
| `self-host AI agents docker compose` | Transactionnel | Faible | Step 4 label + intro |
| `agentivity quickstart` | Navigational | Nul (brand) | H1 alternatif ou titre onglet |
| `how to self-host AI agent platform` | Informationnel | Faible | Hero subhead |
| `open source AI agent self-hosted setup` | Informationnel | Faible | Intro texte avant quickstart |
| `docker compose AI agent` | Transactionnel | Faible-moyen | Step 4 code block label |

---

## Réalité SERP

`install AI agent platform docker` : pas de résultat dominant sur ce terme exact. Les SERPs montrent des tutoriels pour n8n, Dify, Flowise spécifiquement — pas le terme générique. Opportunité directe.

`self-host AI agents docker compose` : plusieurs articles Medium et DEV.to rankent, mais aucune page de documentation officielle d'un produit n'est optimisée pour ce terme. Page docs officielle avec ce terme = avantage fort (Google préfère les sources primaires).

`how to self-host AI agent platform` : terme informationnel, quelques articles. Une doc produit bien structurée peut ranker à 3-6 mois.

---

## Title tag

```
Agentivity Docs — Self-Host in 5 Minutes with Docker
```
*(52 caractères)*

---

## Meta description

```
Clone the repo, copy .env, run docker compose up. Your Agentivity instance is live at localhost:3000. Full guide, README, and community inside.
```
*(144 caractères)*

---

## H1 — Confirmation copy Agent 04

```
Up and running in 5 minutes.
```
✅ Fort en copy et suffisamment explicite — la promesse "5 minutes" est un signal de requête transactionnelle. Conserver.

Subhead actuel : *"Self-host Agentivity with Docker. No cloud required."*
✅ Contient `self-host` et `Docker` — deux mots-clés primaires. Conserver tel quel.

---

## Structure H2 avec mots-clés mappés

| H2 / Section actuelle | Mot-clé mappé | Action |
|---|---|---|
| "Quickstart" | `install AI agent platform docker` | Ajouter sous le H2 : *"Install Agentivity on any machine with Docker Compose — Mac, Linux, or Windows."* |
| Step 1 — Prerequisites | *(structurel)* | Ajouter lien `docker.com` avec ancre descriptive : "Install Docker →" |
| Step 2 — Clone | `agentivity github` | ✅ URL déjà présente |
| Step 4 — Run | `docker compose AI agent` | Ajouter label au-dessus du bloc code : *"Start your AI agent platform with one command:"* |
| "Full documentation on GitHub" (Card) | `open source AI agent documentation` | Ajouter dans la description : *"...for your self-hosted AI agent platform."* |
| "Stuck? Join the community." (Card) | *(branding)* | Pas de cible SEO directe |

---

## Ajustements copy recommandés

**Intro avant Quickstart — ajouter 2 lignes :**
```
Agentivity runs on Docker. No cloud account required — just your machine, 
your API key, and 5 minutes. Works on Mac, Linux, and Windows.
```
→ Intègre `self-host AI agents`, `docker`, contexte OS — signal thématique fort pour Google.

**Card README — enrichir description :**
Remplacer : *"Architecture, advanced configuration, environment variables, topology guides, and use case walkthroughs."*
Par : *"Full documentation for your self-hosted AI agent platform — architecture, configuration, topology guides, and use case walkthroughs."*
→ Intègre `self-hosted AI agent platform` naturellement.

**Step labels — ajouter des titres descriptifs au-dessus des blocs code :**
- Step 3 : *"Configure your API key (Anthropic, OpenAI, or compatible):"*
- Step 4 : *"Launch your AI agent platform:"*
→ Micro-signaux thématiques, utiles aussi pour les utilisateurs.

---

## Questions PAA à adresser

1. "How do I install an AI agent on my own server?" → répondu par le Quickstart
2. "Can I run AI agents locally with Docker?" → répondu par Step 4
3. "What do I need to self-host AI agents?" → répondu par Step 1 Prerequisites
4. "Is Agentivity free to self-host?" → lien vers `/pricing` — à ajouter dans la page

**Recommandation :** Ajouter une ligne sous le CTA Discord :
*"Free to self-host, forever. [See pricing →](/pricing)*
→ Lien interne + répond à la PAA #4 sans allonger la page.

---

## Liens internes recommandés

| Ancre | Destination | Contexte |
|---|---|---|
| "See pricing →" | `/pricing` | Après CTA Discord |
| "What can I build?" | `/use-cases` | Intro ou card bas de page |
| "Learn how it works →" | `/how-it-works` | Card bas de page optionnelle |

## Liens externes

| Ancre | Destination |
|---|---|
| "Install Docker →" | `https://docker.com` |
| "Open the README →" | `https://github.com/agentivity-labs/agentivity#readme` |
| "Join the community →" | Discord (URL à ajouter) |

---

## Schema markup recommandé

```json
{
  "@type": "HowTo",
  "name": "How to self-host Agentivity with Docker",
  "totalTime": "PT5M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Prerequisites", "text": "Install Docker and prepare your API key (Anthropic, OpenAI, or compatible)." },
    { "@type": "HowToStep", "position": 2, "name": "Clone the repository", "text": "git clone https://github.com/agentivity-labs/agentivity && cd agentivity" },
    { "@type": "HowToStep", "position": 3, "name": "Configure", "text": "Copy .env.example to .env and add your API key." },
    { "@type": "HowToStep", "position": 4, "name": "Run", "text": "docker compose up" },
    { "@type": "HowToStep", "position": 5, "name": "Open", "text": "Navigate to http://localhost:3000 — your instance is live." }
  ]
}
```

→ Rich snippet "How to" dans les SERPs — forte visibilité sur les recherches transactionnelles Docker.
