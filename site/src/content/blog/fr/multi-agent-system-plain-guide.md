---
title: "Qu'est-ce qu'un système multi-agents ? Un guide en mots simples"
description: "Un système multi-agents, c'est une équipe de spécialistes de l'IA qui se partagent un travail. Comment ça marche, les cinq façons de collaborer, et quand un seul agent suffit."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["AI agents", "multi-agent", "explainer"]
lang: fr
draft: true
faq:
  - q: "Un système multi-agents, est-ce la même chose que l'IA agentique ?"
    a: "L'IA agentique, c'est l'idée générale d'une IA qui agit pour atteindre un objectif au lieu de seulement répondre. Un système multi-agents est une façon d'y arriver : plusieurs agents d'IA, chacun avec un rôle, qui travaillent en équipe."
  - q: "Combien d'agents faut-il dans une équipe ?"
    a: "Aussi peu que le travail le permet. Deux ou trois, c'est un bon début : un qui fait le travail et un qui le vérifie, ou un manager et deux spécialistes. N'ajoutez un membre que lorsqu'une tâche mérite clairement son propre spécialiste."
  - q: "Faut-il coder pour construire un système multi-agents ?"
    a: "Pas avec une plateforme sans code. Dans Agentivity, vous créez chaque agent en lui donnant un nom et en décrivant son rôle avec vos mots, puis vous glissez les agents dans une équipe et vous choisissez comment ils travaillent ensemble."
  - q: "Chaque agent peut-il utiliser un modèle d'IA différent ?"
    a: "Oui. Dans Agentivity, vous choisissez le modèle de chaque agent, parmi OpenAI, Anthropic, Gemini, DeepSeek, xAI et AWS Bedrock. Une tâche exigeante peut utiliser un modèle plus puissant, et une tâche de routine un modèle moins cher."
  - q: "Un système multi-agents fonctionne-t-il sans personne ?"
    a: "Il peut tourner seul pour le travail de routine, mais une équipe bien construite s'arrête et demande quand une décision revient à une personne. Décider où placer ces arrêts fait partie de la construction de l'équipe."
---

Un système multi-agents, c'est une équipe de spécialistes de l'IA qui se partagent un travail. Au lieu de demander à une seule IA de tout faire, vous donnez un rôle à chaque spécialiste, et vous décidez comment ils travaillent ensemble. C'est la même idée qu'une équipe de personnes : un travail est mieux fait par plusieurs collègues concentrés chacun sur sa tâche que par une seule personne qui fait tout à la fois.

Ce guide explique l'idée sans jargon : ce qu'est un agent, pourquoi plusieurs valent mieux qu'un seul, les cinq façons dont ils peuvent collaborer, et quand vous n'avez pas besoin d'une équipe du tout.

## Qu'est-ce qu'un agent d'IA ?

Un agent d'IA est un modèle d'IA à qui l'on a confié un travail. Trois choses transforment un modèle généraliste en agent :

- **Un rôle.** Une description, avec des mots simples, de ce dont il est responsable, comme vous le feriez pour accueillir un nouveau collègue.
- **Des outils.** Ce qu'il a le droit d'utiliser : chercher sur le web, lire un document, envoyer un e-mail, écrire un fichier.
- **Un objectif.** Ce qu'il doit livrer, et à qui.

Un chatbot répond à une question. Un agent travaille vers un résultat : il lit, cherche, vérifie et recommence jusqu'à ce que le travail soit fait ou qu'il ait besoin de demander.

## Qu'est-ce qui rend un système « multi-agents » ?

Plusieurs agents, chacun avec son propre rôle, et une règle qui fixe comment ils travaillent ensemble.

Prenez une équipe qui organise un voyage. Un agent seul devrait tout connaître à la fois : vols, hôtels, transferts, restaurants, visas, assurances et budgets. Une équipe répartit ce travail : un manager lit la demande et confie chaque partie à un spécialiste, et chaque spécialiste fait une seule chose et rend compte.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/team-manager.jpg" width="1000" height="950" style="max-width: 440px;">
<source src="/media/team-manager.mp4" type="video/mp4" />
</video>
<figcaption>Un manager qui confie le travail à des spécialistes et rassemble leurs réponses. Enregistré depuis le produit.</figcaption>
</figure>

C'est un exemple réel : l'[équipe Trip Planner](/fr/use-cases/trip-planner) compte treize membres, et seul le manager parle à tous les autres.

## Pourquoi plusieurs agents plutôt qu'un seul ?

Pour les mêmes raisons qui font que vous n'embaucheriez pas une seule personne pour être à la fois votre comptable, votre avocat et votre graphiste.

- **La concentration.** Un agent qui a un rôle clair fait moins d'erreurs qu'un agent qui reçoit vingt consignes tirant dans des directions différentes.
- **La vérification.** Quand chaque étape appartient à un membre, vous voyez qui a fait quoi, et vous trouvez où quelque chose s'est mal passé.
- **Le bon modèle pour chaque tâche.** Une analyse exigeante peut utiliser un modèle d'IA plus puissant, et une étape de routine un modèle moins cher.
- **La réutilisation.** Un bon spécialiste, une fois construit, peut servir dans plusieurs équipes.

Cela a un coût. Plus d'agents, c'est plus d'échanges avec les modèles d'IA, donc plus de temps et plus de dépenses. Une équipe doit être aussi petite que le travail le permet.

## Les cinq façons dont les agents travaillent ensemble

La façon dont les membres collaborent compte autant que leur identité. Voici les cinq façons de travailler que vous pouvez choisir dans le Studio d'Agentivity.

| Façon de travailler | En mots simples | Convient bien pour |
|---|---|---|
| Sequential | L'un après l'autre | Une chaîne fixe : recherche, puis rédaction, puis relecture |
| Concurrent | Tous en même temps | Des tâches indépendantes : lire cinq sources à la fois |
| Handoff | Chacun passe le cas au bon collègue | Des demandes qui doivent arriver au bon spécialiste |
| Group Chat | Ils discutent à tour de rôle | Des questions qui gagnent à réunir plusieurs points de vue |
| Manager-led | Un manager planifie et répartit le travail | Des travaux dont les étapes dépendent de la demande |

### Sequential : l'un après l'autre

La plus simple. Le premier agent termine et passe son travail au deuxième, et ainsi de suite. C'est prévisible et facile à suivre. Utilisez-la quand l'ordre des étapes ne change jamais.

### Concurrent : tous en même temps

Plusieurs agents travaillent en parallèle sur des parties distinctes, et leurs résultats sont rassemblés à la fin. Utilisez-la quand les parties ne dépendent pas les unes des autres, et quand la vitesse compte.

### Handoff : passer le cas

Un agent qui reçoit une demande qu'il ne doit pas traiter la passe au collègue qui doit s'en charger, comme un accueil qui vous envoie au bon service. Utilisez-la quand les demandes arrivent mélangées et doivent trouver leur spécialiste.

### Group Chat : une discussion à tour de rôle

Les agents parlent chacun leur tour, et chacun réagit à ce que les autres ont dit. Utilisez-la quand une question gagne à être discutée : un plan, un diagnostic, un texte.

### Manager-led : un manager planifie le travail

Un manager lit la demande, décide quels spécialistes il faut, répartit le travail et assemble le résultat. Utilisez-la quand deux demandes ne demandent jamais exactement les mêmes étapes. C'est ainsi que fonctionne Trip Planner : un week-end et un mois à l'étranger ne font pas appel aux mêmes spécialistes.

## Et les personnes, dans tout ça ?

Elles interviennent à chaque moment où la décision leur revient.

Une équipe bien construite ne décide pas de tout toute seule. Elle s'arrête et demande : quel hôtel, si cette facture est un doublon, si ce candidat passe à l'étape suivante. La question peut arriver dans l'application que la personne utilise, par e-mail, sur Slack ou dans un formulaire, et l'équipe attend la réponse avant de continuer.

Choisir ces arrêts fait partie de la conception. Trop d'arrêts, et l'équipe ne fait gagner aucun temps. Pas assez, et elle fait des choix qu'elle ne devrait pas faire.

## Quand un seul agent suffit-il ?

Souvent. Une équipe n'est pas toujours la bonne réponse.

Un seul agent suffit quand le travail est une tâche unique et bien définie : lire des factures et vérifier leurs montants, résumer un document, répondre à des questions à partir d'un ensemble d'informations connu. Ajouter des membres à un travail de ce genre augmente le coût sans améliorer la qualité.

Passez à une équipe quand le travail a des parties distinctes qui demandent des savoir-faire différents, quand une partie doit en vérifier une autre, ou quand les étapes dépendent de la demande.

## Équipe ou workflow ?

Ils répondent à des problèmes différents, et vous pouvez les combiner.

Un **workflow** suit le chemin que vous avez tracé, de la même façon à chaque fois. Il convient aux processus qui doivent être réguliers et faciles à contrôler. L'[exemple de CV screening](/fr/use-cases/cv-screening) est un workflow : chaque CV passe par les mêmes étapes.

Une **équipe** choisit elle-même son chemin, dans le cadre des rôles que vous lui avez donnés. Elle convient au travail où chaque demande est différente.

Une combinaison courante : un workflow dont l'une des étapes est une équipe. Le workflow garantit le processus d'ensemble, et l'équipe se charge de la partie qui demande du jugement.

## Comment commencer ?

1. **Choisissez un travail répétitif** qui prend un vrai temps chaque semaine et que vous connaissez bien.
2. **Notez qui le ferait** si vous pouviez embaucher pour ce travail : deux ou trois rôles suffisent pour commencer.
3. **Construisez ces rôles sous forme d'agents**, en décrivant chacun avec des mots simples.
4. **Choisissez comment ils travaillent ensemble.** En cas de doute, commencez par Sequential : c'est le plus facile à suivre.
5. **Décidez où une personne valide**, puis faites tourner l'équipe sur des cas réels et ajustez.

[Comment ça marche](/fr/how-it-works) montre ces étapes dans le Studio d'Agentivity, en trois courts clips. Quand l'équipe est prête, vous pouvez aussi la placer derrière une application : c'est ce que nous appelons une [VibeApp](/fr/blog/what-is-a-vibeapp).
