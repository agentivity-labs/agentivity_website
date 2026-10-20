---
title: "Sequential, Group Chat, Concurrent : les 3 topologies d'équipe IA à connaître"
description: "La façon dont vous organisez vos agents d'IA compte autant que ce qu'ils font. Voici un guide pratique des trois topologies de collaboration, et quand utiliser chacune."
pubDate: 2026-06-04
author: "Agentivity Team"
tags: ["AI agents", "topology", "architecture", "how-to"]
lang: fr
---

Quand vous construisez une équipe d'agents d'IA, la première question n'est pas « de quels agents ai-je besoin ? ». C'est « comment doivent-ils travailler ensemble ? ».

La réponse, c'est-à-dire la *topologie*, détermine si vos agents collaborent efficacement ou s'emmêlent les uns dans les autres. Si vous visez juste, l'équipe tourne rond. Si vous vous trompez, les agents produisent des résultats contradictoires, tournent en boucle sans fin, ou livrent un résultat dont aucun d'eux n'est vraiment responsable.

Voici les trois topologies qui couvrent la grande majorité des processus multi-agents réels, avec des repères concrets pour savoir quand utiliser chacune.

---

## 1. Sequential

**Ce que c'est :** les agents travaillent en chaîne stricte. L'agent A termine sa tâche et transmet tout son résultat à l'agent B. L'agent B transmet à l'agent C. Et ainsi de suite, jusqu'à ce que le dernier agent livre le résultat.

**Image mentale :** une chaîne de production. Chaque poste fait une seule chose et passe la pièce au suivant.

**Quand l'utiliser :**
- La tâche a un ordre naturel qu'on ne peut pas paralléliser
- Le résultat de chaque agent dépend entièrement de celui de l'agent précédent
- Le processus doit être entièrement vérifiable, chaque étape pouvant être retracée
- La régularité compte plus que la vitesse

**Exemple — chaîne de rapport financier :**
```
Market Data Collector
  → Sentiment Analyst
    → Financial Modeller
      → Risk Assessor
        → Report Writer
          → Email Formatter
```

Chaque agent s'appuie sur le précédent. Le Report Writer ne peut pas faire son travail sans les conclusions du Risk Assessor. Le Sentiment Analyst a d'abord besoin des données brutes. L'ordre n'est pas facultatif : c'est la logique même de la tâche.

**Compromis :** le mode Sequential est prévisible et facile à dépanner. C'est aussi la topologie la plus lente : chaque agent doit attendre que le précédent ait fini. Pour les chaînes où le temps presse, demandez-vous si certaines étapes peuvent être parallélisées.

---

## 2. Group Chat

**Ce que c'est :** plusieurs agents partagent le même fil de conversation et réfléchissent ensemble. Chaque agent peut lire ce que les autres ont dit, répondre, contester et enrichir la réponse qui se dessine. Un agent chargé de la synthèse (ou un agent manager) mène la conversation jusqu'à une conclusion.

**Image mentale :** une réunion. Tout le monde est dans la salle, tout le monde peut parler, et le but est une décision commune, pas une course de relais.

**Quand l'utiliser :**
- La tâche est ambiguë ou demande du jugement, pas seulement de l'exécution
- Plusieurs regards métier améliorent le résultat
- Vous voulez que les agents repèrent les erreurs ou les angles morts des autres
- Le processus gagne à passer par plusieurs allers-retours avant la réponse finale

**Exemple — brief de contenu stratégique :**
```
Trend Scout:        "Gen Z is moving to short-form video for financial content"
Audience Researcher: "Our data shows 45-55yo professionals are the actual buyers"
Competitor Analyst:  "Competitors are all targeting Gen Z — blue ocean for professionals"
Strategist:          → synthesises into positioning recommendation
```

Aucun agent n'a seul la vue d'ensemble. Le Group Chat leur permet d'exprimer et de concilier leurs points de vue avant que le Strategist ne fixe une direction.

**Compromis :** le Group Chat donne des résultats plus riches et plus nuancés que le mode Sequential. Il prend aussi plus de temps et se contrôle moins bien : sans manager solide ni condition d'arrêt, les agents peuvent tourner en rond. Donnez un objectif clair à l'agent de synthèse et un nombre maximal de tours.

---

## 3. Concurrent

**Ce que c'est :** plusieurs agents travaillent en même temps, chacun sur une sous-tâche indépendante. Quand tous ont fini, un agent de synthèse fusionne leurs résultats en un seul résultat cohérent.

**Image mentale :** un sprint de recherche en parallèle. Trois personnes étudient trois sujets différents en même temps, puis une personne rassemble leurs conclusions dans un seul rapport.

**Quand l'utiliser :**
- La tâche se découpe en sous-tâches clairement indépendantes, qui ne dépendent pas les unes des autres
- La vitesse compte, et les sous-tâches peuvent vraiment tourner en parallèle
- Le résultat final est un regroupement ou une synthèse de plusieurs apports

**Exemple — chaîne de présélection de candidats :**
```
CV Parser        ──┐
Skills Matcher   ──┤ → Culture Fit Agent → Ranking Report
Culture Fit      ──┘
```

Les agents CV Parser, Skills Matcher et Culture Fit peuvent tous analyser le candidat en même temps. L'agent Ranking Report synthétise ensuite leurs notes en une recommandation finale. Même qualité, pour une fraction du temps.

**Compromis :** Concurrent est la topologie la plus rapide pour les tâches parallélisables. La difficulté se trouve dans l'agent de synthèse : il doit gérer des résultats de qualité inégale, trancher les contradictions et produire un résultat cohérent. Rédigez ses instructions avec soin.

---

## Choisir la bonne topologie

Voici une grille de décision simple :

| Question | Réponse → Topologie |
|---|---|
| L'étape B dépend-elle du résultat de l'étape A ? | Oui → **Sequential** |
| Plusieurs experts doivent-ils débattre avant une décision ? | Oui → **Group Chat** |
| Les sous-tâches peuvent-elles tourner indépendamment, puis être fusionnées ? | Oui → **Concurrent** |
| Avez-vous besoin de pouvoir vérifier chaque étape ? | Oui → **Sequential** |
| La vitesse est-elle la contrainte principale ? | Oui → **Concurrent** |

En pratique, les processus complexes combinent les topologies. Vous pouvez lancer une phase Concurrent (trois agents de recherche en parallèle), puis passer leurs résultats à une chaîne Sequential (analyse → rédaction → mise en forme), avec une phase Group Chat au milieu pour une décision stratégique.

Commencez par Sequential : c'est le plus simple à construire, à dépanner et à expliquer. Ajoutez du Group Chat quand il faut du jugement. Ajoutez du Concurrent quand la vitesse compte et que les sous-tâches sont vraiment indépendantes.

---

*Les trois topologies sont disponibles dans Agentivity. [Voir comment ça marche →](/fr/how-it-works)*
