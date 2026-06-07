# CRO Plan — Agentivity
> Produit par l'Agent 02 · Architecte CRO
> Date : 2026-06-05
> Statut : Validé en session collaborative

---

## 1. Navigation

```
[Logo]   How it works   Use Cases   Pricing   Docs   [⭐ GitHub]   [Get early access]
```

| Item | Rôle | Rationale |
|---|---|---|
| How it works | Page d'explication du mécanisme | Plus engageant que "Features" — promet de la clarté |
| Use Cases | Ancrage personas non-techniques | "Finance team, HR team" — concret, pas "Solutions" |
| Pricing | Transparence | Toujours visible — signal de confiance même avec coming soon |
| Docs | Crédibilité OSS | Un outil sans docs n'existe pas pour Persona 1 |
| ⭐ GitHub | CTA primaire | Bouton avec étoile — convention OSS reconnue instantanément |
| Get early access | CTA secondaire | Capture Personas 2/3/4 qui ne peuvent pas utiliser Docker |

**Footer :** About, GitHub, Discord, Licence (BSL)

---

## 2. Inventaire des pages

### Home `/`

| Élément | Détail |
|---|---|
| **Objectif** | Convaincre Persona 1 de cliquer sur GitHub. Capturer l'email des autres. |
| **CTA principal** | ⭐ GitHub |
| **CTA secondaire** | Get early access |
| **Sections** | Hero → How it works (3 étapes) → Use cases (3 résumés) → Concepts clés → Pricing résumé → CTA final |
| **Éléments de preuve** | GitHub stars (badge live), licence OSS, Discord (nb membres) |
| **Kill factor** | Aucun visuel produit → compenser avec diagramme/animation simple du canvas |

---

### How it works `/how-it-works`

| Élément | Détail |
|---|---|
| **Objectif** | Expliquer le mécanisme pour convertir Persona 1 avant l'installation |
| **CTA principal** | ⭐ GitHub (installer) |
| **CTA secondaire** | Get early access |
| **Sections** | Canvas → Agent → Team → Agent Roster → Builder vs User (honnête sur le niveau) |
| **Éléments de preuve** | Exemples concrets d'agents (nom, rôle, outils) |
| **Kill factor** | Trop technique trop vite → commencer par la métaphore, descendre vers le technique |

---

### Use Cases `/use-cases`

| Élément | Détail |
|---|---|
| **Objectif** | Concrétiser pour Personas 2 & 3 qui ne pensent pas encore en agents |
| **CTA principal** | Get early access |
| **CTA secondaire** | ⭐ GitHub |
| **Sections** | Finance team / HR team / Marketing team / Personal assistant — chacun : agents qui composent l'équipe → livrable tangible produit |
| **Éléments de preuve** | Description précise du résultat (ex: "Un rapport de veille concurrentielle chaque lundi matin") |
| **Kill factor** | Trop abstrait — chaque use case doit finir sur un résultat concret et lisible |

---

### Pricing `/pricing`

| Élément | Détail |
|---|---|
| **Objectif** | Transparence + capturer les early access |
| **CTA principal** | ⭐ GitHub (plan Free) / Get early access (Pro) / Contact us (Enterprise) |
| **Sections** | 3 colonnes : Free OSS / Pro coming soon / Enterprise coming soon |
| **Éléments de preuve** | Licence BSL expliquée en 1 phrase, lien GitHub |
| **Kill factor** | "Coming soon" grisé sans message → accompagner d'une promesse datée ou d'une formule rassurante |

**Message coming soon recommandé :**
> "Cloud version en cours. Rejoins la liste — tu seras parmi les premiers."

---

### Docs `/docs`

| Élément | Détail |
|---|---|
| **Objectif** | Permettre à Persona 1 d'installer sans friction |
| **CTA principal** | GitHub → README |
| **CTA secondaire** | Discord |
| **Sections** | Quickstart Docker (5 étapes max) → Lien GitHub → Lien Discord |
| **Kill factor** | Quickstart qui ne fonctionne pas — tester avant lancement |

---

## 3. Parcours utilisateurs

### Parcours 1 — AI Specialist (Persona 1)
*Canal : Hacker News "Show HN" / Reddit r/selfhosted*

```
Post HN / Reddit
  → Home       → lit H1, comprend la métaphore
  → How it works → vérifie le mécanisme, niveau Builder
  → GitHub     → README, architecture, commits, stars ← décision ici
  → Docs       → quickstart Docker, installe
  → Discord    → rejoint la communauté
```

> ⚠️ Il se décide sur GitHub, pas sur le site. Si le README est mauvais, il repart. Le site doit l'amener au README en moins de 2 clics.

---

### Parcours 2 — Manager PME (Persona 2)
*Canal : Recommandation d'un consultant (Persona 1)*

```
Lien direct
  → Home       → "finance team, HR team" → il reconnaît son monde
  → Use Cases  → cherche son cas d'usage
  → Pricing    → voit coming soon cloud
  → Early access → s'inscrit ← conversion ici
```

> ⚠️ Il ne va pas sur GitHub. Il veut une solution, pas un outil. Le coming soon doit être une promesse, pas une excuse.

---

### Parcours 3 — Solopreneur (Persona 3)
*Canal : Google / LinkedIn*

```
Recherche / partage
  → Home       → "working while you sleep" résonne
  → How it works → curieux, risque de se perdre si trop technique
  → Pricing    → voit Docker uniquement, ne sait pas ce que c'est
  → Early access → s'inscrit et attend le cloud ← conversion ici
```

> ⚠️ Point de friction : Persona 3 ne peut pas utiliser le produit aujourd'hui. Le message coming soon doit être rassurant et actif, pas passif.

---

## 4. Règles CRO globales

1. **2 CTAs maximum par page** — GitHub (primaire) et Early access (secondaire). Jamais plus de 2 destinations concurrentes.
2. **Le CTA primaire est toujours visible sans scroller** — dans la nav ET dans le hero, sur toutes les pages.
3. **Aucun placeholder au lancement** — une section sans contenu réel est supprimée, pas remplie avec du lorem ipsum ou "coming soon" vague.
4. **Le "coming soon" est une promesse active** — toujours accompagné d'un CTA (early access) et d'un bénéfice ("tu seras parmi les premiers").
5. **GitHub stars = preuve sociale principale** — badge live sur la home. C'est la seule preuve sociale disponible au lancement.
6. **Discord dès le lancement** — même vide. Signale que le projet est vivant et maintenu.
7. **Lancement communautaire avant SEO** — HN, Reddit, Product Hunt. Le SEO organique prend 6-12 mois sur un domaine nouveau ; les communautés donnent des résultats en 48h.
8. **Le README GitHub est une page du site** — il doit être aussi soigné que la home. Persona 1 y va en premier.

---

## Handoff

> Architecture validée. L'Agent 03 (UX & Wireframes) prend le relais pour traduire ça en structure de sections pour chaque page — section par section, avec hiérarchie visuelle et contenu requis.
