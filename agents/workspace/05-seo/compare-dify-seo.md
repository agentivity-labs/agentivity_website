# SEO Spec — Compare `/compare/agentivity-vs-dify`
> Agent 05 · SEO Stratège — 2026-06-05
> ⚠️ Page nouvelle — non incluse dans le copy Agent 04. À créer.

---

## Mot-clé primaire

**`dify alternative open source`**
- Intention : Transactionnel (cherche à remplacer ou comparer)
- Concurrence estimée : Faible (moins de pages que pour n8n)
- Tendance : Croissant — Dify gagne rapidement en notoriété
- Horizon réaliste : 3-6 mois

---

## Mots-clés secondaires

| Mot-clé | Intention | Difficulté | Usage sur la page |
|---|---|---|---|
| `dify vs agentivity` | Navigational | Très faible | H1, title tag |
| `dify alternative multi-agent` | Commercial | Très faible | Section différenciateur |
| `dify alternative visual team builder` | Commercial | Quasi nul | H2 |
| `open source LLM app builder alternative` | Commercial | Faible | Corps de page |

---

## Title tag

```
Agentivity vs Dify — Build AI Teams, Not Just LLM Apps
```
*(54 caractères)*

---

## Meta description

```
Dify builds LLM apps with RAG pipelines. Agentivity builds AI teams with collaborative topologies. See which fits your use case — both open source, self-hosted.
```
*(161 caractères — couper à "self-hosted." pour 155)*

---

## H1

```
Agentivity vs Dify — AI teams vs LLM apps.
```

---

## Structure de la page (à créer)

### Section 1 — Le résumé en 30 secondes
Dify est une plateforme de premier plan pour construire des applications LLM — RAG, chatbots, agents simples. Excellente pour les équipes qui veulent déployer une app IA rapidement avec un backend solide.

Agentivity est centré sur la **composition d'équipes d'agents** — plusieurs agents avec des rôles, des topologies collaboratives, des résultats produits ensemble. Pas une app. Une équipe.

### Section 2 — Tableau de comparaison

| | Dify | Agentivity |
|---|---|---|
| Interface | Workflow visual + chat UI | Team canvas (agents + topologies) |
| Paradigme principal | LLM app platform (RAG, chatbots) | Multi-agent team builder |
| Multi-agent | Via agents dans un workflow | Natif — topologies dédiées |
| RAG / Knowledge base | ✅ Natif, très complet | ❌ Via agents outils (futur) |
| Topologies d'équipes | Limitées | Sequential, Concurrent, Group Chat, Handoff, Magentic-One |
| Open source | ✅ Apache 2.0 | ✅ Agentivity Sustainable Use Licence |
| Self-hosted | ✅ Docker (4GB RAM min) | ✅ Docker |
| BYOK | ✅ | ✅ |
| Templates | App templates | Synergi — équipes pré-construites |
| Cible | Dev teams, product managers | AI Specialists + end-users non-techniques |
| White-label | ❌ | ✅ Enterprise |

### Section 3 — Quand choisir Dify
- Tu as besoin de RAG natif (Dify est imbattable là-dessus)
- Tu construis une app de chat ou un assistant avec base de connaissances
- Tu veux un backend LLM complet avec monitoring et logs de production
- Ton équipe est technique et veut un environnement de développement complet

### Section 4 — Quand choisir Agentivity
- Tu veux des agents qui **collaborent** en équipe avec des topologies définies
- Ta priorité est la métaphore "équipe" — Finance team, HR team, pas une app
- Tu veux permettre à des utilisateurs non-techniques d'utiliser des équipes
- Tu veux mixer steps agentiques et déterministes dans le même flow
- Tu veux white-labeler pour tes clients

### Section 5 — CTA

**H2 :** Build your first AI team.

**CTA 1 :** `⭐ Star on GitHub`
**CTA 2 :** `Join the waitlist`

---

## Questions PAA à adresser

1. "What is Dify used for?" → Répondu dans résumé + tableau
2. "Is there a free alternative to Dify?" → Oui — les deux sont open source gratuits
3. "Does Agentivity have RAG like Dify?" → Non — honnêteté = crédibilité
4. "What's better for building AI teams — Dify or Agentivity?" → Répondu dans les deux sections "Quand choisir"

---

## Liens internes recommandés

| Ancre | Destination |
|---|---|
| "How Agentivity works →" | `/how-it-works` |
| "See pricing →" | `/pricing` |
| "Compare with n8n →" | `/compare/agentivity-vs-n8n` |
| "Compare with Make →" | `/compare/agentivity-vs-make` |

---

## Schema markup

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is Agentivity a Dify alternative?", "acceptedAnswer": { "@type": "Answer", "text": "Partially. Dify excels at LLM app development with RAG and chatbot capabilities. Agentivity focuses on multi-agent team composition with collaborative topologies. If you need RAG-heavy apps, Dify wins. If you need collaborative AI teams, Agentivity is built for that." } },
    { "@type": "Question", "name": "Are both Dify and Agentivity free to self-host?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Both are open source and run on Docker Compose. Dify uses Apache 2.0. Agentivity uses the Agentivity Sustainable Use Licence — free for personal and internal commercial use." } }
  ]
}
```
