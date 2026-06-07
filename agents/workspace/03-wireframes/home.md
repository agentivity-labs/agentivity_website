# Wireframe — Home `/`
> Agent 03 · UX & Wireframes — 2026-06-05

---

## Sections (ordre de build)

---

### Section 1 — NAV
**Position :** Above the fold — fixe au scroll
**Objectif :** Orientation instantanée + CTAs toujours accessibles

| Élément | Détail |
|---|---|
| Gauche | Logo Agentivity |
| Centre | How it works · Use Cases · Pricing · Docs |
| Droite | [⭐ GitHub] (bouton outline) · [Get early access] (bouton primaire) |

**Anti-pattern :** Ne pas mettre plus de 4 items de nav — chaque item supplémentaire dilue l'attention vers les CTAs.

---

### Section 2 — HERO
**Position :** Above the fold
**Objectif :** Qualifier Persona 1 (comprend immédiatement) + capturer Personas 2/3 (résonne émotionnellement)

| Élément | Détail |
|---|---|
| Layout | 2 colonnes : texte gauche (60%) · screenshot droite (40%) |
| H1 | "Build your AI team — a finance team, an HR team, a personal coaching team. Assembled visually, in minutes." |
| Subhead | "Drag agents onto your canvas, connect them together. Your team collaborates, reports back, and gets things done — in real time." |
| CTA 1 | [⭐ GitHub] — bouton primaire large |
| CTA 2 | [Get early access] — lien texte ou bouton secondaire |
| Visuel | Screenshot canvas (UI propre) — montrer agents posés sur le canvas avec connexions visibles |

**Raison du placement :** Le screenshot à droite du texte est le pattern SaaS dominant (Linear, Vercel, Raycast) — l'œil lit le texte, valide avec l'image. Inverse sur mobile (image au-dessus).
**Anti-pattern :** Pas de tagline abstraite au-dessus du H1 ("The future of AI", etc.) — ça dilue le message principal.

---

### Section 3 — PROOF BAR
**Position :** Juste sous le hero, full-width, fond légèrement différent
**Objectif :** Répondre immédiatement à "est-ce sérieux ?" avant que Persona 1 scrolle

| Élément | Détail |
|---|---|
| Signal 1 | ⭐ [N] GitHub stars (badge live, lien vers repo) |
| Signal 2 | Licence BSL — Open source core |
| Signal 3 | Docker-ready — Self-host in minutes |
| Layout | 3 éléments centrés, séparés par un séparateur vertical · |

**Raison du placement :** Les utilisateurs techniques vérifient la crédibilité avant d'investir du temps. Cette barre répond à la question sans qu'ils aient à chercher.
**Anti-pattern :** Pas de logos clients fictifs ou "500+ users" inventés — ça se voit et détruit la confiance.

---

### Section 4 — HOW IT WORKS (résumé)
**Position :** Below the fold — 1er scroll
**Objectif :** Expliquer le mécanisme en 3 étapes, sans envoyer l'utilisateur ailleurs

| Élément | Détail |
|---|---|
| Titre section | "How it works" (H2) |
| Layout | 3 colonnes avec icône + titre + 1-2 lignes |
| Étape 1 | **Compose** — Pose tes agents sur le canvas. Chacun a un rôle, des outils, des instructions. |
| Étape 2 | **Connect** — Relie-les. Définis qui reporte à qui, qui passe quoi à qui. |
| Étape 3 | **Run** — Lance la team. Elle travaille, collabore, et te rapporte les résultats. |
| CTA | Lien texte "Learn how it works →" vers /how-it-works |

**Raison du placement :** 3 étapes = pattern de compréhension rapide. L'utilisateur comprend le produit en 15 secondes. Le lien vers /how-it-works capte ceux qui veulent plus.
**Anti-pattern :** Pas de 4ème étape — au-delà de 3, le cerveau ne retient plus.

---

### Section 5 — CONCEPTS CLÉS
**Position :** Below the fold — 2ème scroll
**Objectif :** Poser le vocabulaire produit (Canvas, Agent, Team, Roster) pour que Persona 1 arrive sur GitHub avec le bon langage

| Élément | Détail |
|---|---|
| Titre section | "The building blocks" (H2) |
| Layout | 5 cards horizontales (ou 3+2) avec icône + nom + 1 ligne |
| Card 1 | **Canvas** — L'espace de composition. Ton org chart visuel. |
| Card 2 | **Agent** — Un collaborateur IA avec un rôle, des outils, des instructions. |
| Card 3 | **Team** — Des agents qui collaborent sur un objectif commun. |
| Card 4 | **Team Studio** — L'éditeur pour composer tes équipes. |
| Card 5 | **Agent Roster** — La bibliothèque de templates prêts à l'emploi. |

**Raison du placement :** Après avoir compris le mécanisme (section 4), l'utilisateur a besoin de nommer les pièces. Cette section ancre le vocabulaire — important pour Persona 1 qui va lire la doc ensuite.
**Anti-pattern :** Pas de descriptions longues ici — 1 ligne max par concept. Le détail est sur /how-it-works.

---

### Section 6 — USE CASES PREVIEW
**Position :** Below the fold — 3ème scroll
**Objectif :** Concrétiser pour Personas 2 & 3, leur montrer que c'est pour eux aussi

| Élément | Détail |
|---|---|
| Titre section | "What teams will you build?" (H2) |
| Layout | 3 cards avec titre + liste agents + livrable |
| Card 1 | **Finance team** — [agents] → livrable concret |
| Card 2 | **HR team** — [agents] → livrable concret |
| Card 3 | **Personal assistant** — [agents] → livrable concret |
| CTA | [See all use cases →] vers /use-cases |

**Raison du placement :** Les use cases après les concepts — l'utilisateur comprend d'abord COMMENT ça marche, puis POUR QUOI faire. Inverser crée de la confusion.
**Anti-pattern :** Pas de 4ème card ici — 3 suffit pour l'aperçu. La page /use-cases contient le reste.

---

### Section 7 — PRICING RÉSUMÉ
**Position :** Below the fold — 4ème scroll
**Objectif :** Transparence + capturer les early access avant la fin de page

| Élément | Détail |
|---|---|
| Titre section | "Simple, transparent pricing" (H2) |
| Layout | 3 colonnes condensées |
| Colonne 1 | **Free** — Open source, self-host, Docker. CTA : [⭐ GitHub] |
| Colonne 2 | **Pro** — Coming soon. CTA : [Get early access] |
| Colonne 3 | **Enterprise** — Coming soon. CTA : [Contact us] |
| Lien | "See full pricing →" vers /pricing |

**Raison du placement :** Beaucoup d'utilisateurs vérifient le pricing avant de s'engager. Le montrer sur Home évite une sortie de page pour cette question.
**Anti-pattern :** Pas de feature list détaillée ici — juste le nom du plan, 1 ligne de promesse, 1 CTA.

---

### Section 8 — CTA FINAL
**Position :** Bas de page, avant footer
**Objectif :** Recapturer ceux qui ont tout lu mais n'ont pas encore cliqué

| Élément | Détail |
|---|---|
| H2 | Reprise de la promesse principale (copywriter à définir) |
| CTA 1 | [⭐ GitHub] — bouton primaire |
| CTA 2 | [Get early access] — bouton secondaire |

**Raison du placement :** Pattern systématique SaaS — ceux qui arrivent en bas de page ont lu et sont intéressés. Un rappel des CTAs convertit bien ici.

---

### FOOTER
| Élément | Détail |
|---|---|
| Colonne 1 | Logo + tagline 1 ligne + icônes réseaux (GitHub, Discord) |
| Colonne 2 | Product : How it works · Use Cases · Pricing · Docs |
| Colonne 3 | Company : About · GitHub · Licence BSL |
| Bas | © Agentivity · Licence BSL |

---

## Résumé above-the-fold (desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ Logo    How it works  Use Cases  Pricing  Docs  [GitHub] [CTA]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  H1 — Build your AI team...          ┌──────────────────────┐   │
│  Subhead — Drag agents onto...       │                      │   │
│                                      │  [Canvas screenshot] │   │
│  [⭐ GitHub]  Get early access →     │                      │   │
│                                      └──────────────────────┘   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  ⭐ 0 stars · BSL Open source · Docker-ready                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Point de friction principal

> Persona 1 se décide sur le GitHub stars badge. Si le repo est à 0 étoiles au lancement, la proof bar fait mal. **Plan :** lancer le repo quelques jours avant le site, partager sur HN/Reddit, puis lancer le site avec un score non-nul.
