---
title: "Comment faire consommer moins d'énergie à vos agents IA : 6 habitudes concrètes"
description: "Chaque appel à un modèle d'IA consomme de l'énergie. Six habitudes pour supprimer les appels inutiles : la bonne taille de modèle, l'IA seulement là où elle aide, un contexte court, un travail gardé plutôt que refait."
pubDate: 2026-10-24
author: "Agentivity Team"
tags: ["climate", "AI agents", "workflows", "best practices"]
lang: fr
---

Chaque fois qu'un agent IA réfléchit, un modèle tourne quelque part dans un centre de données, et cela consomme de l'énergie. Personne ne peut vous donner le chiffre exact pour vos propres agents : il dépend du fournisseur, du modèle, de la longueur de ce que vous envoyez et de ce que vous recevez.

Ce que vous maîtrisez est plus simple : combien d'appels vous faites, à quel modèle, avec combien de texte. La plupart des équipes IA font bien plus d'appels que le travail n'en demande. Voici six habitudes pour les réduire, sans dégrader le travail.

## 1. N'utilisez l'IA que là où il faut du jugement

Une grande partie de ce que fait une équipe IA n'est pas du jugement. Vérifier qu'un formulaire est complet, comparer un montant à un plafond, envoyer le résultat à la bonne personne : ce sont des étapes fixes, et une règle les fait mieux qu'un modèle.

**En pratique :** dessinez ces étapes dans un workflow, et mettez l'IA seulement dans les étapes qui en ont besoin, comme lire un document ou rédiger une réponse. Dans Agentivity, un formulaire, une condition, une boucle ou une validation tournent sans appeler aucun modèle.

## 2. Choisissez la taille du modèle pour chaque tâche

Le plus grand modèle n'est pas le bon pour chaque tâche. Classer un message dans une catégorie parmi cinq, extraire une date d'un e-mail ou reformuler une phrase sont largement à la portée d'un modèle plus petit et plus rapide. Gardez le grand modèle pour les étapes où le raisonnement compte vraiment.

**En pratique :** connectez plusieurs modèles, et faites tourner chaque agent sur celui qui convient à sa tâche. Une équipe peut avoir un petit modèle pour l'agent qui trie les demandes et un plus grand pour l'agent qui rédige l'analyse.

## 3. Envoyez moins de texte

Un modèle lit tout ce que vous lui envoyez, à chaque fois. Un agent qui reçoit une politique entière de 80 pages pour répondre à une question travaille bien plus qu'un agent qui reçoit les deux paragraphes utiles.

**En pratique :** mettez vos documents dans une base de connaissances, pour que l'agent pose une question et ne reçoive que les quelques passages qui y répondent, plutôt que le texte entier. Gardez aussi des consignes courtes et précises : une page claire vaut mieux que trois pages de répétitions.

## 4. Gardez le travail au lieu de le refaire

Un agent oublie tout à la fin de son exécution. Si l'exécution suivante a besoin des mêmes informations, il va les chercher, les lire et les résumer à nouveau.

**En pratique :** gardez ce qui a été fait dans un tableau : les factures déjà lues, les clients déjà vérifiés, les rapports déjà rédigés. L'exécution suivante consulte une ligne au lieu de refaire le travail.

## 5. Mettez les consignes au point avant de lancer à grande échelle

Une consigne mal écrite coûte deux fois : l'agent répond mal, et quelqu'un relance. Multipliez cela par des centaines d'exécutions par semaine.

**En pratique :** essayez d'abord les consignes sur quelques exemples enregistrés, comparez les réponses, et améliorez le texte jusqu'à ce qu'il fonctionne. Mettez ensuite l'agent en production.

## 6. Laissez reposer ce qui ne sert pas

Un logiciel qui tourne toute la nuit pour attendre une demande qui arrive une fois par jour consomme de l'énergie pour rien.

**En pratique :** un espace de travail Agentivity hébergé que personne n'utilise est mis en veille, et se réveille à la visite suivante. Si vous faites tourner Agentivity vous-même, la même idée vaut pour votre propre machine.

## Où nous en sommes

Ces habitudes font la plus grande différence, parce qu'elles agissent sur les appels eux-mêmes. De notre côté, nous consacrons aussi **1 % de notre chiffre d'affaires au retrait de carbone de l'atmosphère**. C'est un premier pas, et nous ne prétendons pas qu'il rende Agentivity, ni les modèles d'IA qu'il appelle, neutres en carbone.

[Lire notre engagement climat](/fr/climate), ou [voir comment une équipe et un workflow s'articulent](/fr/workflows).
