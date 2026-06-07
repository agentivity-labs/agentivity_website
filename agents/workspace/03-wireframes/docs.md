# Wireframe — Docs `/docs`
> Agent 03 · UX & Wireframes — 2026-06-05

---

## Objectif de la page

Page minimaliste. Pas une documentation complète — un pont entre le site et GitHub. L'objectif est que Persona 1 soit en train de lancer Docker dans les 5 minutes suivant son arrivée sur cette page.

---

## Sections (ordre de build)

---

### Section 1 — PAGE HERO
**Position :** Above the fold
**Objectif :** Promettre la rapidité d'installation avant tout

| Élément | Détail |
|---|---|
| H1 | "Get started in 5 minutes" |
| Sous-titre | 1 ligne : "Self-host Agentivity with Docker. No cloud required." |
| Pas de nav secondaire | Pas de sidebar doc ici — c'est une page simple, pas une doc complète |

---

### Section 2 — QUICKSTART DOCKER
**Position :** Above the fold (suite) — visible sans scroller
**Objectif :** Les 5 étapes d'installation, copiables immédiatement

| Étape | Contenu |
|---|---|
| 1 | **Prerequisites** — Docker installé ([lien docker.com]) · Node 18+ (si applicable) |
| 2 | **Clone** — `git clone https://github.com/[repo]/agentivity` |
| 3 | **Configure** — Copier `.env.example` en `.env`, renseigner `ANTHROPIC_API_KEY` |
| 4 | **Run** — `docker compose up` |
| 5 | **Open** — Ouvrir `http://localhost:3000` dans ton navigateur |

**Layout :** Blocs de code avec bouton copier. Numérotation visible. Fond sombre (code block).

**⚠️ Règle absolue :** Ces 5 étapes doivent fonctionner sur une machine propre avant le lancement. Tester sur Mac, Linux, et Windows si possible. Un quickstart cassé est le kill factor numéro un de cette page.

**Anti-pattern :** Pas d'étapes conditionnelles ("si tu utilises Windows, alors...") dans le quickstart principal — ça casse le flow. Les variantes vont dans le README GitHub.

---

### Section 3 — LIEN README
**Position :** Below the fold
**Objectif :** Envoyer Persona 1 vers la documentation complète sans friction

| Élément | Détail |
|---|---|
| Layout | Card avec icône GitHub + titre + description + lien |
| Titre | "Full documentation on GitHub" |
| Description | "Architecture, configuration avancée, variables d'environnement, guides par cas d'usage." |
| CTA | [Open README →] — lien vers le README du repo |

**Raison du placement :** Le site ne remplace pas la doc. Il l'amorce. Tout ce qui dépasse 5 étapes va sur GitHub.

---

### Section 4 — DISCORD
**Position :** Below the fold
**Objectif :** Capturer ceux qui ont eu un problème d'installation ou qui veulent rejoindre la communauté

| Élément | Détail |
|---|---|
| Layout | Card avec icône Discord + titre + description + lien |
| Titre | "Stuck? Join the community." |
| Description | "Pose ta question, partage ce que tu construis, suis les updates." |
| CTA | [Join Discord →] |

**Raison du placement :** L'installation peut coincer. Donner un accès direct au support communautaire sur la page Docs réduit le taux d'abandon post-installation.

---

## Résumé de la structure

```
Hero (H1 + 1 ligne)
  ↓
Quickstart 5 étapes (blocs code copiables)
  ↓
Card README GitHub
  ↓
Card Discord
```

---

## Point de friction principal

> Le quickstart doit fonctionner au copier-coller. Chaque commande doit être testée sur une machine propre avant le lancement. **C'est la seule page du site où une erreur technique peut faire perdre définitivement Persona 1.**

---

## Note pour les versions futures

- V2 : sidebar navigation vers des guides thématiques (Configuration agents, Connecteurs, Multi-workspace)
- V2 : search dans la doc
- V2 : versioning (doc v1.0, v1.1...)

Pour le lancement : cette page suffit. La doc complète vit sur GitHub.
