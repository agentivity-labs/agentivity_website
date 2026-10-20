---
title: "Comment une personne garde la main"
description: "Où vous décidez dans Agentivity : des brouillons que vous enregistrez, des étapes qui attendent votre accord, des exécutions à arrêter, un suivi pas à pas."
sidebar:
  order: 6
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/introduction/how-a-person-stays-in-control.md. Do not edit here: edit the source and publish again. -->

Une équipe IA fait le travail répétitif. Les décisions restent les vôtres. Cette page liste les moments où Agentivity s'arrête et laisse une personne décider.

## Quand vous construisez

- **L'Assistant travaille sur un brouillon.** Ce qu'il construit n'est pas dans votre espace de travail tant que vous n'avez pas sélectionné **Save**. Avant d'enregistrer, vous voyez ce qui sera ajouté et où cela ira. Si vous supprimez le brouillon, rien ne change dans votre espace de travail.
- **Vous publiez vous-même vos modifications.** Dans un éditeur, une modification est enregistrée quand vous sélectionnez **Publish**.

## Quand une solution tourne

- **Une étape peut attendre une personne.** Dans un workflow, vous ajoutez une étape qui envoie une question et s'arrête. Le workflow ne continue que lorsque quelqu'un a répondu. Voyez [Demander à une personne de valider ou de répondre](/fr/docs/workflows/ask-a-person-to-decide/).
- **Un agent peut demander avant de décider.** Un agent qui dispose d'un canal pour joindre une personne peut s'arrêter et demander un choix ou un accord.
- **Vous pouvez arrêter une exécution.** La barre au-dessus du canevas propose **Pause**, **Resume** et **Stop**. La section **Executions** peut arrêter plusieurs exécutions à la fois.
- **Une exécution démarre quand une personne la lance.** Rien ne démarre tout seul. Le lancement d'exécutions selon un planning est prévu, mais pas encore disponible.

## Après une exécution

- **Chaque exécution est listée.** La section **Executions** montre les exécutions de votre espace de travail et leur état. Une exécution qui attend une personne porte l'étiquette **ACTION REQUIRED**.
- **Chaque étape peut être relue.** Dans l'onglet **Execution** d'un éditeur, l'**Inspector** montre, pour chaque étape, ce qu'elle a reçu et ce qu'elle a produit.

## Des règles fixes là où il en faut

Un modèle d'IA peut répondre différemment à la même demande. Quand une règle doit toujours donner le même résultat, ne la confiez pas à un modèle : mettez-la dans un workflow, sous forme d'étape fixe. Une condition, par exemple, prend toujours le même chemin pour la même entrée. Voyez [Ajouter une condition à un workflow](/fr/docs/workflows/add-a-condition/).

## Une limite à connaître

Agentivity n'a pas d'écran de connexion aujourd'hui. Il ne sait pas qui est devant l'écran, il ne peut donc pas vérifier qui a validé une étape. Toute personne qui peut joindre votre serveur peut construire, lancer et répondre. Gardez le serveur sur un réseau de confiance, ou derrière votre propre contrôle d'accès.

## Étape suivante

[Ce que comprend l'édition Community](/fr/docs/introduction/what-the-community-edition-includes/).
