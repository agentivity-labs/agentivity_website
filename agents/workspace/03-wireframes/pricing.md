# Wireframe — Pricing `/pricing`
> Agent 03 · UX & Wireframes — 2026-06-05

---

## Sections (ordre de build)

---

### Section 1 — PAGE HERO
**Position :** Above the fold
**Objectif :** Poser la transparence comme valeur avant même de montrer les prix

| Élément | Détail |
|---|---|
| H1 | "Simple, transparent pricing" |
| Sous-titre | 1 ligne : "Open source à la base. Cloud quand tu en as besoin." |
| Pas de CTA ici | L'utilisateur vient chercher une info — on la lui donne sans friction |

---

### Section 2 — 3 COLONNES PRICING
**Position :** Above the fold (suite) — doit être visible sans scroller sur desktop
**Objectif :** Donner la réponse à la question principale immédiatement

| Colonne | Plan | Statut | Contenu | CTA |
|---|---|---|---|---|
| 1 | **Free** | ✅ Disponible | Open source · Self-host · Docker · Fonctions de base | [⭐ GitHub] |
| 2 | **Pro** | 🔜 Coming soon | Fonctions avancées · Cloud · Analytics · Multi-workspace | [Get early access] |
| 3 | **Enterprise** | 🔜 Coming soon | SSO · On-premise · SLA · Support dédié · White-label | [Contact us] |

**Message coming soon (colonne Pro et Enterprise) :**
> "Cloud version en cours. Rejoins la liste — tu seras parmi les premiers."

**Note sur la colonne Free :**
Ajouter sous le CTA GitHub : *"Nécessite Docker. Pas encore familier ? La version cloud arrive — [rejoins la liste]."*
→ Ce lien pointe vers le formulaire early access. Persona 3 ne repart pas les mains vides.

**Mise en avant visuelle :** La colonne Pro peut être légèrement mise en avant (bordure, badge "Populaire") même en coming soon — signal que c'est la cible principale.

**Anti-pattern :** Pas de feature comparison exhaustive ici — ça complexifie sans valeur au stade du lancement. Juste 3-4 bullets par plan maximum.

---

### Section 3 — LICENCE BSL
**Position :** Below the fold
**Objectif :** Répondre à la question "c'est vraiment open source ?" que Persona 1 va se poser

| Élément | Détail |
|---|---|
| Layout | Bloc texte centré, fond alterné |
| Titre | "A word on our licence" (H3) |
| Contenu | 2-3 lignes : "Agentivity est sous licence BSL (Business Source Licence). Le code est public, auditable, et librement utilisable pour un usage personnel et commercial. Une seule limite : tu ne peux pas l'utiliser pour créer une plateforme concurrente." |
| Lien | "Lire la licence complète →" (lien GitHub) |

**Raison du placement :** La licence BSL est parfois mal comprise. Une explication claire ici évite les questions sur Discord et construit la confiance avec Persona 1.

---

### Section 4 — FAQ PRICING
**Position :** Below the fold
**Objectif :** Répondre aux 3 objections prévisibles avant qu'elles bloquent la conversion

| # | Question | Réponse courte |
|---|---|---|
| 1 | "C'est vraiment gratuit ?" | "Oui. Le plan Free est open source et self-hosted, sans limite de temps ni de fonctionnalités de base. Tu as juste besoin de Docker." |
| 2 | "Docker, c'est quoi ?" | "Un outil qui permet de lancer Agentivity sur ton ordinateur ou serveur en une commande. Guide complet dans la doc." + lien /docs |
| 3 | "Quand arrive le cloud ?" | "On travaille dessus. Rejoins la liste early access — tu seras notifié en premier et tu auras accès au tarif de lancement." |

**Layout :** Accordion ou liste Q/R lisible — pas de modal, pas de complexité.

---

### Section 5 — CTA EARLY ACCESS
**Position :** Bas de page
**Objectif :** Dernière chance de capturer Personas 2/3 qui ne peuvent pas Docker

| Élément | Détail |
|---|---|
| H2 | "La version cloud arrive." |
| Sous-titre | "Rejoins la liste — tu seras parmi les premiers et tu auras accès au tarif de lancement." |
| Formulaire | Champ email + bouton [Rejoindre la liste] |
| Mention | Pas de spam. Juste les updates importantes. |

**Raison du formulaire inline ici :** Ne pas renvoyer vers une autre page pour s'inscrire — la friction tue la conversion. Le formulaire est là, maintenant.

---

## Résumé de la structure

```
Hero (H1 + 1 ligne)
  ↓
3 colonnes pricing (Free / Pro / Enterprise)
  ↓
Licence BSL (explication courte)
  ↓
FAQ 3 questions
  ↓
CTA early access (formulaire inline)
```

---

## Point de friction principal

> Persona 3 voit "Docker" sur la colonne Free et ne comprend pas. Sans le pont explicite vers l'early access dans cette colonne, il repart. **Le lien "Rejoins la liste" doit être dans la colonne Free elle-même**, pas seulement en bas de page.
