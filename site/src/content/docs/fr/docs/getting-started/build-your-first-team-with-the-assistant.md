---
title: "Construire votre première équipe avec l'Assistant"
description: "Décrivez avec vos mots l'équipe qu'il vous faut. L'Assistant pose des questions, montre un plan et construit un brouillon que vous vérifiez et enregistrez."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/getting-started/build-your-first-team-with-the-assistant.md. Do not edit here: edit the source and publish again. -->

L'Assistant est la partie du Studio qui construit pour vous. Vous décrivez votre besoin comme vous le feriez à un collègue. L'Assistant demande ce qu'il doit savoir, montre un plan, puis construit un brouillon. Rien n'est ajouté à votre espace de travail tant que vous n'avez pas enregistré.

Sur cette page, vous construisez une équipe de trois : un chercheur, un rédacteur et un relecteur. Une équipe, ce sont plusieurs agents qui travaillent ensemble. Un agent, c'est un spécialiste IA qui a un rôle.

## Ce dont vous avez besoin

- Agentivity qui tourne, avec le Studio ouvert. Voyez [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
- Une connexion à un modèle. L'Assistant utilise un modèle d'IA pour travailler, tout comme les agents qu'il construit. Voyez [Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/).

## Décrire l'équipe

1. Dans le menu de gauche, sélectionnez **Assistant**.
2. Sélectionnez **New solution**. L'écran demande **What would you like to build?** et propose trois exemples. Vous pouvez en sélectionner un pour partir de là.
3. En haut de la conversation, **Agents run on** indique la connexion au modèle utilisée. Si vous en avez plusieurs, choisissez-en une autre dans la liste.
4. Dans le champ du bas, décrivez l'équipe, en français si vous préférez : l'Assistant comprend le français. Par exemple :

   ```text
   Une équipe de trois qui rédige une note d'une page sur un sujet que je donne : un chercheur, un rédacteur et un relecteur.
   ```

5. Envoyez votre message.

## Répondre et valider un plan

1. L'Assistant peut vous poser une question, avec des choix. Sélectionnez un choix, ou tapez votre propre réponse.
2. L'Assistant présente son plan en mots simples. Lisez-le. Dites-lui de continuer, ou dites-lui ce qu'il faut changer.

## Regarder le brouillon

Quand vous validez le plan, l'Assistant construit. La partie droite de l'écran dessine en direct ce qu'il construit : l'équipe, ses membres et leurs liens. Sous le dessin, une liste montre tout ce qui compose le brouillon.

À ce stade, le brouillon est marqué **Draft · not saved**. Votre espace de travail n'a pas changé.

Vous pouvez continuer dans la même conversation : demander une modification, ajouter un membre, ou demander à l'Assistant ce qui pourrait mal tourner avec cette équipe.

## Enregistrer l'équipe

1. Sélectionnez **Save**, en haut à droite.
2. La fenêtre montre ce qui est ajouté à votre espace de travail (**What is added**) et où cela va (**Where it goes**). Vérifiez les deux.
3. Sélectionnez **Save** pour ajouter le brouillon à votre espace de travail, ou **Not yet** pour revenir à la conversation.

## Comment savoir que ça marche

- L'Assistant affiche **Saved to your workspace**.
- Sélectionnez **Open in the editor**. L'équipe s'ouvre dans son éditeur, avec ses trois membres sur le canevas.
- L'équipe et ses agents se trouvent dans **Studio** > **Agents**.

## Si ça ne marche pas

- **« The model did not answer. »** L'Assistant n'a pas pu joindre le modèle d'IA. Vérifiez votre connexion au modèle dans **Settings** > **Credentials** : la clé, et le crédit chez le fournisseur. Vérifiez aussi que la machine où tourne Agentivity accède à Internet.
- **« The assistant is not available: its module is not loaded in this platform. »** Cette installation ne contient pas l'Assistant. Réinstallez l'image actuelle : voyez [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
- **Le brouillon ne vous plaît pas.** Demandez une modification, ou supprimez la conversation. Supprimer un brouillon ne change rien dans votre espace de travail.

## Bon à savoir

- Les conversations restent dans la liste **Solutions**, à gauche. Sélectionnez-en une pour la reprendre.
- **Work on an existing one** ouvre dans l'Assistant quelque chose que vous avez déjà, dans une nouvelle conversation. Rien ne change tant que vous n'avez pas enregistré.
- Quand l'Assistant a besoin d'une connexion, seul son nom lui est transmis, jamais ses secrets.
- Ce que construit l'Assistant est une équipe ordinaire. Vous pouvez ensuite la modifier à la main : voyez [Créer une équipe d'agents](/fr/docs/teams/create-a-team/).

## Étape suivante

[Lancer une équipe et lire son travail](/fr/docs/teams/run-a-team/).
