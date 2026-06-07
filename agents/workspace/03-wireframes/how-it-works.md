# Wireframe — How it works `/how-it-works`
> Agent 03 · UX & Wireframes — 2026-06-05

---

## Sections (ordre de build)

---

### Section 1 — PAGE HERO
**Position :** Above the fold
**Objectif :** Poser l'intention de la page — pas convaincre, expliquer

| Élément | Détail |
|---|---|
| H1 | "How Agentivity works" (ou variante copywriter) |
| Intro | 1-2 lignes max : "Tu n'écris pas de code. Tu composes une équipe." |
| Pas de CTA ici | L'utilisateur est en mode découverte — un CTA trop tôt interrompt la lecture |

**Anti-pattern :** Pas de hero image sur cette page — on passe directement à l'explication. L'image viendra dans les sections suivantes.

---

### Section 2 — MÉTAPHORE D'ENTRÉE
**Position :** Above the fold (suite) ou 1er scroll
**Objectif :** Créer le cadre mental avant d'introduire les concepts techniques

| Élément | Détail |
|---|---|
| Layout | Texte centré, large, fond alterné |
| Contenu | Bloc de 3-4 lignes : analogie avec une équipe humaine. "Imagine une finance team. Un agent fait la veille, un autre analyse, un autre rédige le rapport. Ils travaillent ensemble, sans que tu aies à orchestrer chaque étape." |

**Raison du placement :** La métaphore avant les concepts techniques réduit la charge cognitive. L'utilisateur comprend l'analogie, puis les concepts s'emboîtent naturellement.

---

### Section 3 — LE CANVAS
**Position :** Below the fold
**Objectif :** Montrer l'espace de travail — premier contact visuel avec le produit réel

| Élément | Détail |
|---|---|
| Layout | Image gauche (screenshot canvas) · Texte droite |
| Titre | "The Canvas" (H2) |
| Texte | 2-3 lignes : c'est l'espace de composition visuel. Tu poses des agents, tu les connectes, tu vois l'équipe se former. |
| Légende image | Pointer les zones clés sur le screenshot (agents, connexions, toolbar) |
| Pas de CTA | On est en mode explication |

**Asset requis :** Screenshot canvas propre — agents visibles, connexions visibles, interface stable.

---

### Section 4 — LES AGENTS
**Position :** Below the fold
**Objectif :** Expliquer ce qu'est un agent avec un exemple concret, pas une définition abstraite

| Élément | Détail |
|---|---|
| Layout | Texte gauche · Image droite (screenshot config agent) |
| Titre | "Agents" (H2) |
| Texte | Définition courte + exemple concret : nom de l'agent, rôle, outils assignés, instructions. |
| Exemple affiché | "Research Agent — Role: Find and summarize competitor news. Tools: Web search, Summarizer. Reports to: Analysis Agent." |
| Encart honnêteté | "Configurer un agent requiert du soin : rôle clair, instructions précises, outils adaptés. C'est du low-code, pas du no-code." |

**Raison de l'encart honnêteté :** Évite la déception de Persona 2/3 qui s'attendait à quelque chose de plus automatique. Mieux vaut filtrer ici que perdre un utilisateur frustré post-install.

---

### Section 5 — LES TEAMS
**Position :** Below the fold
**Objectif :** Montrer la collaboration entre agents — la vraie valeur du produit

| Élément | Détail |
|---|---|
| Layout | Image gauche (screenshot team view ou diagramme connexions) · Texte droite |
| Titre | "Teams" (H2) |
| Texte | 2-3 lignes : comment les agents se passent l'information, qui reporte à qui, ce que ça produit ensemble. |
| Exemple | Finance team : Research Agent → Analysis Agent → Report Agent → toi. |

**Anti-pattern :** Ne pas expliquer le protocole technique de communication entre agents ici — c'est pour la doc. La page /how-it-works reste dans la métaphore équipe.

---

### Section 6 — AGENT ROSTER
**Position :** Below the fold
**Objectif :** Montrer qu'on n'a pas besoin de tout construire from scratch

| Élément | Détail |
|---|---|
| Layout | Titre centré + grille de cards (3 colonnes) |
| Titre | "Agent Roster — Start with a template" (H2) |
| Cards | 6-9 templates affichés : Finance team / HR team / Marketing team / Research assistant / etc. |
| Screenshot | Screenshot de la bibliothèque Roster si disponible |
| CTA | [⭐ GitHub — Browse templates] |

**Raison du placement :** Après avoir compris les concepts, l'utilisateur veut savoir s'il peut démarrer vite. Le Roster répond à cette question.

---

### Section 7 — BUILDER VS USER
**Position :** Below the fold
**Objectif :** Clarifier honnêtement qui peut faire quoi — éviter les mauvaises surprises

| Élément | Détail |
|---|---|
| Layout | 2 colonnes côte à côte |
| Colonne gauche | **Builder** — Configure les agents, crée les équipes, connecte les outils. Niveau requis : comprendre les instructions IA, les connecteurs. Pas de Python. |
| Colonne droite | **User** — Utilise les équipes créées par un Builder. Lance, interagit, lit les résultats. Vraiment no-code. |
| Mention | "Tu es les deux ? Parfait. Commence comme Builder." |

**Raison du placement :** En fin de page, après que l'utilisateur comprend le produit — pas en début où ça créerait une barrière. L'honnêteté ici construit la confiance.

---

### Section 8 — CTA
**Position :** Bas de page
**Objectif :** Convertir Persona 1 qui est prêt à installer

| Élément | Détail |
|---|---|
| H2 | Reprise de promesse orientée action (copywriter à définir) |
| CTA 1 | [⭐ GitHub — Get started] |
| CTA 2 | [Get early access] (pour ceux qui ne peuvent pas Docker) |

---

## Résumé de la structure

```
Hero (H1 + 2 lignes)
  ↓
Métaphore (texte centré — l'analogie équipe humaine)
  ↓
Canvas (image gauche · texte droite)
  ↓
Agents (texte gauche · image droite)
  ↓
Teams (image gauche · texte droite)
  ↓
Agent Roster (grille cards)
  ↓
Builder vs User (2 colonnes)
  ↓
CTA
```

**Pattern alterné gauche/droite** pour Canvas → Agents → Teams : évite la monotonie visuelle, chaque section se distingue naturellement.

---

## Point de friction principal

> La page devient un cours magistral si chaque section est trop longue. **Règle :** 2-3 lignes de texte par section max. Le reste va dans la doc. L'utilisateur qui veut plus clique sur GitHub → README.
