# SEO Spec — Compare `/compare/agentivity-vs-n8n`
> Agent 05 · SEO Stratège — 2026-06-05
> ⚠️ Page nouvelle — non incluse dans le copy Agent 04. À créer.

---

## Pourquoi cette page

Les SERPs sur `n8n alternative` sont dominés par des articles de blog (Vellum, Gumloop, Botpress, Lindy — tous avec des pages "X meilleures alternatives à n8n"). Ces pages sont des **listes** — pas des comparaisons produit-à-produit. Une page de comparaison directe, honnête, bien structurée peut ranker en 3-6 mois sur un domaine neuf car Google valorise le contenu de comparaison spécifique et à faible compétition directe.

**C'est aussi la page qui convertit le mieux** — quelqu'un qui cherche "n8n alternative" a déjà n8n, cherche à migrer ou comparer. Il est à 80% du chemin.

---

## Mot-clé primaire

**`n8n alternative open source`**
- Intention : Transactionnel (cherche à remplacer ou comparer)
- Concurrence estimée : Moyen (nombreux articles, peu de pages produit directes)
- Tendance : Stable-croissant
- Horizon réaliste : 3-6 mois

---

## Mots-clés secondaires

| Mot-clé | Intention | Difficulté | Usage sur la page |
|---|---|---|---|
| `n8n vs agentivity` | Navigational/comparaison | Très faible (neuf) | H1, title tag |
| `n8n alternative with AI teams` | Transactionnel | Très faible | H2 différenciateur |
| `n8n alternative visual canvas` | Commercial | Très faible | H2 ou encart |
| `n8n alternative self-hosted` | Transactionnel | Faible | Encart Free tier |
| `n8n alternative for multi-agent` | Commercial | Très faible | Section positionnement |

---

## Title tag

```
Agentivity vs n8n — The AI Team Builder Alternative
```
*(52 caractères)*

---

## Meta description

```
n8n automates workflows. Agentivity builds AI teams. See the difference — visual canvas, team topologies, agentic + deterministic flows. Open source, self-hosted.
```
*(162 caractères — couper à "Open source, self-hosted." pour 155)*

Version courte :
```
n8n automates workflows. Agentivity builds AI teams. Visual canvas, topologies, agentic + deterministic — open source and self-hosted.
```

---

## H1

```
Agentivity vs n8n — When workflows aren't enough.
```

---

## Structure de la page (à créer)

### Section 1 — Le résumé en 30 secondes
> n8n est excellent pour automatiser des workflows techniques — connecter des apps, déclencher des actions, orchestrer des APIs.
> Agentivity est fait pour construire des équipes d'agents IA — des collaborateurs avec des rôles, qui prennent des décisions, et qui produisent des résultats.
> Ils ne font pas la même chose.

### Section 2 — Tableau de comparaison

| | n8n | Agentivity |
|---|---|---|
| Interface | Workflow canvas (nodes) | Team canvas (agents) |
| Paradigme | Déterministe en priorité | Agentic + deterministic hybrid |
| Multi-agent | Via sous-workflows | Natif — topologies intégrées |
| Topologies | Séquentiel | Sequential, Concurrent, Group Chat, Handoff, Magentic-One |
| Open source | ✅ Sustainable Use License | ✅ Agentivity Sustainable Use Licence |
| Self-hosted | ✅ Docker | ✅ Docker |
| BYOK | ✅ | ✅ |
| Templates | Workflow templates | Synergi — équipes pré-construites |
| Cible | Développeurs & ops | Builders + end-users non-techniques |
| White-label | ❌ | ✅ Enterprise |

### Section 3 — Quand choisir n8n

Soyons honnêtes. n8n est le bon choix si :
- Tu as des centaines d'intégrations à connecter (n8n en a 400+, nous non à ce stade)
- Ton besoin est principalement déterministe — triggers, conditions, données
- Tu as une équipe technique qui veut une plateforme de scripting visuel
- Tu utilises déjà les templates n8n et tu en es content

### Section 4 — Quand choisir Agentivity

Agentivity est le bon choix si :
- Tu veux que tes agents **collaborent** — pas juste s'enchaîner
- Tu construis une Finance team, une HR team, un assistant personnel — pas un pipeline
- Tu veux mélanger des étapes agentiques ET déterministes dans le même flow
- Tu veux que tes clients (non-techniques) utilisent les équipes que tu construis
- Tu veux proposer des solutions IA sous ta propre marque (white-label Enterprise)

### Section 5 — CTA

**H2 :** Ready to build your first AI team?

**CTA 1 :** `⭐ Star on GitHub`
**CTA 2 :** `Join the waitlist`

---

## Questions PAA à adresser (en FAQ ou inline)

1. "Is Agentivity a n8n alternative?" → Répondu dans l'intro — ce n'est pas un remplacement direct, c'est un angle différent
2. "Can Agentivity replace n8n?" → Répondu dans "Quand choisir n8n" — honnêteté = confiance
3. "What's the difference between n8n and AI agent platforms?" → Répondu dans le tableau
4. "Does Agentivity have as many integrations as n8n?" → À adresser honnêtement — non, pas encore

---

## Liens internes recommandés

| Ancre | Destination |
|---|---|
| "How Agentivity works →" | `/how-it-works` |
| "See pricing →" | `/pricing` |
| "Browse Synergi templates →" | `synergi.agentivity.io` |
| "Compare with Dify →" | `/compare/agentivity-vs-dify` |

---

## Schema markup recommandé

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is Agentivity a replacement for n8n?", "acceptedAnswer": { "@type": "Answer", "text": "Not a direct replacement. n8n excels at deterministic workflow automation with 400+ integrations. Agentivity is built for composing AI agent teams with collaborative topologies. Most power users end up using both for different parts of their stack." } },
    { "@type": "Question", "name": "Does Agentivity support self-hosting like n8n?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Agentivity is open source and runs on Docker Compose. Free to self-host with no usage cap." } }
  ]
}
```
