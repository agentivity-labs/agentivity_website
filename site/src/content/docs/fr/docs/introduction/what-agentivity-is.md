---
title: "Ce qu'est Agentivity"
description: "Agentivity est une plateforme pour construire et faire tourner des agents IA, des équipes d'IA et des workflows sans code, sur votre machine ou serveur."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/introduction/what-agentivity-is.md. Do not edit here: edit the source and publish again. -->

Agentivity est une plateforme pour construire et faire tourner des agents IA, des équipes d'IA et des workflows, sans écrire de code. Vous décrivez un besoin, vous construisez ce qui va le prendre en charge, et vous le faites tourner. Cette page explique de quoi le produit est fait, avant que vous n'installiez quoi que ce soit.

## À quoi il sert

La plupart des outils d'IA répondent à une question. Mais c'est encore vous qui pilotez : vous demandez, vous vérifiez, vous corrigez, vous redemandez.

Agentivity est fait pour le travail qui doit arriver terminé. Vous construisez une solution : quelque chose qu'une personne lance pour faire traiter un besoin du début à la fin. Par exemple, une solution qui lit une facture fournisseur, vérifie ses montants et la classe. Ou une solution qui rédige une relance de paiement et attend votre validation avant que quoi que ce soit ne parte.

## Les trois briques

| Brique | Ce que c'est |
|---|---|
| **Agent** | Un spécialiste IA, avec un rôle. |
| **Équipe** | Plusieurs agents qui travaillent ensemble sur une même demande. |
| **Workflow** | Des étapes dessinées à l'avance, exécutées de la même façon à chaque fois. L'IA n'intervient que dans les étapes que vous choisissez. |

Pour choisir entre les trois, lisez [Choisir entre un agent, une équipe et un workflow](/fr/docs/introduction/agent-team-or-workflow/).

## Ce que vous obtenez en l'installant

- **Le moteur.** Le programme qui fait tourner vos agents, vos équipes et vos workflows. Il tourne sur votre propre machine ou serveur, avec Docker.
- **Le Studio.** L'éditeur visuel, dans votre navigateur. C'est là que vous construisez, lancez et suivez tout. Voyez [Se repérer dans le Studio](/fr/docs/studio/find-your-way-in-the-studio/).
- **L'Assistant.** Une partie du Studio qui construit pour vous. Vous décrivez votre besoin avec vos mots ; il pose des questions, montre un plan et construit un brouillon que vous vérifiez et enregistrez.
- **Des Solutions toutes prêtes.** Quatre Solutions de démonstration que vous pouvez importer et ouvrir, pour voir comment une solution terminée est construite.

## Ce que vous apportez

- **Une machine qui fait tourner Docker.** Votre propre ordinateur, ou un serveur.
- **Un modèle d'IA.** Agentivity n'en fournit pas. Vous connectez le fournisseur que vous utilisez, par exemple Anthropic, OpenAI ou Google, avec votre propre clé API. Le fournisseur vous facture directement.

## Où sont vos données

Vos agents, équipes, workflows, tables et réglages sont stockés sur votre machine. Ce qu'un agent envoie au modèle d'IA va chez le fournisseur que vous avez choisi, selon les conditions de ce fournisseur.

## Ce qu'Agentivity n'est pas

- **Pas un chatbot.** Vous ne parlez pas à un assistant généraliste. Vous construisez des spécialistes qui ont chacun un rôle, et vous les organisez.
- **Pas un fournisseur de modèles.** Vous apportez votre propre modèle.
- **Pas un service hébergé, aujourd'hui.** L'édition Community est celle que vous installez vous-même. Des éditions hébergées sont prévues. Voyez [Ce que comprend l'édition Community](/fr/docs/introduction/what-the-community-edition-includes/).

## Étape suivante

[Ce qu'est une Solution, et comment la marquer](/fr/docs/introduction/what-a-solution-is/).
