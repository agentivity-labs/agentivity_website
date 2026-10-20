---
title: "Ce que comprend l'édition Community"
description: "Ce que vous obtenez dans l'édition Community gratuite d'Agentivity, ce qu'elle ne contient pas, ce qui est prévu, et ce que permet la licence."
sidebar:
  order: 7
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/introduction/what-the-community-edition-includes.md. Do not edit here: edit the source and publish again. -->

L'édition Community est l'édition d'Agentivity que vous installez vous-même, sur votre propre machine ou serveur. Elle est gratuite. Cette page dit ce qu'elle contient et ce qu'elle ne contient pas.

## Ce qui est inclus

- **Le Studio**, l'éditeur visuel dans votre navigateur.
- **L'Assistant**, qui construit un agent, une équipe ou un workflow à partir de votre description.
- **Les agents**, chacun avec son rôle, ses instructions et son modèle.
- **Les équipes**, avec les cinq façons de travailler ensemble : Sequential, Concurrent, Handoff, Group Chat et Manager-led. Un membre d'une équipe peut être une autre équipe ou un workflow.
- **Les workflows**, avec des conditions, des boucles, des étapes qui attendent une personne, et des étapes d'IA.
- **Les Data Tables**, pour stocker ce que vos agents et vos workflows lisent et remplissent.
- **Les Knowledge Bases**, pour donner à vos agents vos documents, vos pages et vos flux. Huit types de sources sont proposés, parmi lesquels des fichiers du serveur, des pages web et une base de données SQLite ou PostgreSQL. La recherche tourne sur votre serveur, avec un petit modèle local, et ne demande aucun compte.
- **Les Vector Stores**, pour conserver des textes et les retrouver par leur sens : un gratuit qui dure le temps d'une exécution, et trois qui conservent les textes (Qdrant, Pinecone, pgvector).
- **Prompt Studio**, pour écrire et tester des prompts.
- **Les Templates** : vous pouvez importer une Solution depuis un fichier, et enregistrer votre propre travail dans un fichier à partager.
- **Folders**, pour ranger vos agents, équipes, workflows et tables.
- **Un catalogue de plus de cent nœuds** pour les workflows et les agents : modèles d'IA, outils, recherche web, stockage, messages, et plus encore.

Les quatre Solutions de démonstration sont proposées sous forme de Templates. Elles sont téléchargées depuis le catalogue Agentivity quand vous les importez : la machine a donc besoin d'une connexion Internet.

## Ce qui n'est pas inclus

- **Les versions.** Conserver les versions précédentes d'un workflow, d'une table ou d'une Knowledge Base, et revenir à l'une d'elles, ne fait pas partie de l'édition Community.
- **Les plugins.**
- **La connexion, les comptes et les rôles.** Il n'y a pas d'écran de connexion. Une installation est un seul espace de travail partagé : toute personne qui peut joindre le serveur peut tout y utiliser.

## Ce qui est prévu

- **Des éditions hébergées**, où il n'y a rien à installer.
- **Le lancement d'exécutions selon un planning.**

Pour les autres éditions et ce à quoi chacune sert, voyez [tarifs et éditions](/fr/pricing).

## Ce que permet la licence

Le cœur d'Agentivity est à code source disponible, sous [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license). En bref :

- **Vous pouvez** l'utiliser pour votre propre entreprise, en production, gratuitement. Vous pouvez lire le code source et le modifier.
- **Vous ne pouvez pas** proposer Agentivity à d'autres personnes sous forme de service hébergé ou géré.
- **Vous ne pouvez pas** retirer ni masquer les mentions de licence et de droits d'auteur.

Ce résumé ne remplace pas la licence. Si votre situation n'est pas claire, par exemple si vous faites tourner Agentivity pour vos clients sur vos propres serveurs, posez la question avant de commencer.

Le Studio est livré dans l'image Docker sous forme compilée.

## Ce que vous apportez vous-même

- Une machine ou un serveur qui fait tourner Docker.
- Un modèle d'IA d'un fournisseur, avec votre propre clé API. Le fournisseur vous facture ce que vos agents utilisent.

## Étape suivante

[Les mots qu'utilise Agentivity](/fr/docs/introduction/words-we-use/), puis [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
