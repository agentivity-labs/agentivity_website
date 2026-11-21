---
title: "Construire votre première équipe avec Winston"
description: "Décrivez avec vos mots l'équipe qu'il vous faut. Winston, votre constructeur IA, pose des questions, montre un plan et construit un brouillon à publier."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/getting-started/build-your-first-team-with-the-assistant.md. Do not edit here: edit the source and publish again. -->

Winston, votre constructeur IA, est la partie du Studio qui construit pour vous. Vous décrivez votre besoin comme vous le feriez à un collègue. Il demande ce qu'il doit savoir, montre un plan, puis construit un brouillon. Rien n'est ajouté à votre espace de travail tant que vous n'avez pas publié.

Sur cette page, vous construisez une équipe de trois : un chercheur, un rédacteur et un relecteur. Une équipe, ce sont plusieurs agents qui travaillent ensemble. Un agent, c'est un spécialiste IA qui a un rôle.

## Ce dont vous avez besoin

- Agentivity qui tourne, avec le Studio ouvert. Voyez [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
- Une connexion à un modèle. Winston utilise un modèle d'IA pour travailler, tout comme les agents qu'il construit. Voyez [Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/).

## Décrire l'équipe

1. Dans le menu de gauche, sélectionnez **Winston**. Sur l'accueil, vous pouvez aussi lui dire ce que vous voulez automatiser, dans le champ, ou sélectionner **Ask Winston**.
2. Sélectionnez **New solution**. L'écran demande **What would you like to build?** et propose trois exemples. Vous pouvez en sélectionner un pour partir de là.
3. En haut de la conversation, **Agents run on** indique la connexion au modèle utilisée. Si vous en avez plusieurs, choisissez-en une autre dans la liste.
4. Dans le champ du bas, décrivez l'équipe, en français si vous préférez : Winston comprend le français. Par exemple :

   ```text
   Une équipe de trois qui rédige une note d'une page sur un sujet que je donne : un chercheur, un rédacteur et un relecteur.
   ```

5. Envoyez votre message.

## Répondre et valider un plan

1. Winston peut vous poser une question, avec des choix. Sélectionnez un choix, ou tapez votre propre réponse.
2. Il présente son plan en mots simples. Lisez-le. Dites-lui de continuer, ou dites-lui ce qu'il faut changer.

## Regarder le brouillon

Quand vous validez le plan, Winston construit. La partie droite de l'écran dessine en direct ce qu'il construit : l'équipe, ses membres et leurs liens. Sous le dessin, une liste montre tout ce qui compose le brouillon.

À ce stade, le brouillon est marqué **Draft · not published**. Votre espace de travail n'a pas changé.

Vous pouvez continuer dans la même conversation : demander une modification, ajouter un membre, ou demander à Winston ce qui pourrait mal tourner avec cette équipe.

## Publier l'équipe

1. Sélectionnez **Publish**, en haut à droite.
2. La fenêtre montre ce qui est publié (**What is published**) et où cela va (**Where it goes**). Vérifiez les deux.
3. Sélectionnez **Publish** pour ajouter le brouillon à votre espace de travail, ou **Keep as draft** pour revenir à la conversation et le terminer plus tard avec Winston.

**Publish and open** fait les deux : il publie, puis ouvre l'équipe dans son éditeur. Si quelque chose de ce qu'il a construit a été modifié dans votre espace de travail après le début du brouillon, la fenêtre le dit, et vous choisissez entre garder le brouillon et écraser.

## Comment savoir que ça marche

- La conversation affiche **Published to your workspace**.
- Sélectionnez **Open in the editor**. L'équipe s'ouvre dans son éditeur, avec ses trois membres sur le canevas.
- L'équipe et ses agents se trouvent dans **Studio** > **Agents & Workflows**.

Après une modification, le brouillon indique **Published · changes not published yet**. Demandez la modification, puis publiez à nouveau.

## Si ça ne marche pas

- **« The model did not answer. »** Winston n'a pas pu joindre le modèle d'IA. Vérifiez votre connexion au modèle dans **Administration** > **Credentials** : la clé, et le crédit chez le fournisseur. Vérifiez aussi que la machine où tourne Agentivity accède à Internet.
- **« Winston is not available: his module is not loaded on this platform. »** Cette installation ne contient pas Winston. Réinstallez l'image actuelle : voyez [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
- **Le brouillon ne vous plaît pas.** Demandez une modification, ou abandonnez la conversation. Abandonner un brouillon ne change rien dans votre espace de travail.

## Bon à savoir

- Les conversations restent dans la liste **Solutions**, à gauche. Sélectionnez-en une pour la reprendre.
- **Work on an existing one**, ou **Improve with Winston**, ouvre quelque chose que vous avez déjà, dans une nouvelle conversation. Rien ne change tant que vous n'avez pas publié. Winston travaille sur ce qui est enregistré : les changements de l'éditeur pas encore enregistrés, il ne les voit pas.
- Quand Winston a besoin d'une connexion, seul son nom lui est transmis, jamais ses secrets.
- Une connexion que vous n'avez pas demandée reste vide : Winston dit qu'elle vous revient, et vous la choisissez dans l'étape. Quand le travail doit informer une équipe, il propose les applications possibles (Slack, Teams ou e-mail) et vous décidez laquelle.
- Winston ne construit pas de cockpits et ne publie rien dans le Desk : c'est à vous de le faire.
- Ce que construit Winston est une équipe ordinaire. Vous pouvez ensuite la modifier à la main : voyez [Créer une équipe d'agents](/fr/docs/teams/create-a-team/).
- Le modèle avec lequel Winston réfléchit se choisit dans **Administration** > **Winston**.

## Étape suivante

[Lancer une équipe et lire son travail](/fr/docs/teams/run-a-team/).
