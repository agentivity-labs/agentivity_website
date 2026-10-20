---
title: "Garder votre serveur Agentivity privé"
description: "Agentivity n'a pas d'écran de connexion. Qui peut joindre le serveur, ce qu'on peut y faire, et comment le garder sur un réseau de confiance."
sidebar:
  order: 3
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/guides/keep-your-server-private.md. Do not edit here: edit the source and publish again. -->

Agentivity n'a pas d'écran de connexion aujourd'hui. Le Studio s'ouvre pour toute personne qui peut joindre son adresse. Cette page explique ce que cela implique et ce que vous pouvez faire.

## Ce que peut faire toute personne qui joint le serveur

- Ouvrir le Studio, et modifier ou supprimer les agents, équipes, workflows et tables.
- Démarrer n'importe quelle exécution, avec votre modèle d'IA et à vos frais.
- Lire les lignes de vos Data Tables.
- Ajouter, modifier et supprimer des identifiants de connexion (credentials). Un secret déjà enregistré s'affiche sous forme de points et n'est pas restitué.
- Répondre à une question qu'une exécution pose à une personne.

Agentivity n'enregistre pas qui a fait quoi.

## Qui peut joindre le serveur

La commande de démarrage de la page d'installation contient `-p 5005:5005`. Elle ouvre le port 5005 de votre machine à tous les réseaux auxquels la machine est connectée.

- **Sur votre propre ordinateur, chez vous ou derrière le pare-feu d'un bureau** : les personnes du même réseau peuvent le joindre, avec l'adresse de votre machine.
- **Sur un serveur avec une adresse publique** : tout Internet peut le joindre, sauf si un pare-feu l'en empêche.

## Le garder sur votre seule machine

Si vous êtes seul à utiliser Agentivity, depuis la machine où il tourne, rendez le port joignable depuis cette machine uniquement. Utilisez cette commande de démarrage à la place de la commande habituelle :

```bash
docker run -d --name agentivity -p 127.0.0.1:5005:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
```

Le Studio s'ouvre alors à l'adresse `http://localhost:5005` sur cette machine, et nulle part ailleurs.

## Le partager avec une équipe

Quand plusieurs personnes doivent accéder au Studio :

- **Gardez le serveur sur votre réseau privé.** Ne lui donnez pas d'adresse publique.
- **Depuis l'extérieur, passez par votre VPN**, la connexion sécurisée que votre entreprise utilise déjà pour accéder à son réseau.
- **Ou placez votre propre contrôle d'accès devant** : un proxy inverse (reverse proxy) qui demande aux personnes de se connecter avant de les laisser passer. Demandez à la personne qui gère votre réseau.
- **Utilisez un pare-feu** pour n'autoriser que les machines qui en ont besoin.

## Limiter les pages web qui peuvent l'appeler

Par défaut, le serveur accepte les appels de n'importe quelle page web. C'est fait pour être simple pendant que vous construisez. Cela veut dire que n'importe quel site web ouvert par une personne qui peut joindre votre serveur pourrait l'appeler en arrière-plan.

Si d'autres personnes peuvent joindre votre serveur, démarrez-le avec les adresses de vos propres applications uniquement :

```text
-e Cors__AllowedOrigins__0=https://app.mydomain.com
```

Ajoutez `__1`, `__2` pour d'autres adresses. Cela ne remplace pas les protections ci-dessus : cela arrête les autres sites web, pas les scripts. Le Studio n'est pas concerné, puisque le serveur le fournit lui-même. Voyez [Qui peut appeler l'API](/fr/docs/getting-started/install-community/#qui-peut-appeler-lapi).

## À ne pas faire

- N'ouvrez pas le port 5005 sur un routeur ou sur un pare-feu cloud « juste pour tester ».
- Ne mettez pas l'adresse du Studio dans un endroit public.

## Limiter les dégâts

- **Sauvegardez souvent.** Voyez [Mettre à jour Agentivity et sauvegarder vos données](/fr/docs/guides/update-and-back-up/).
- **Fixez une limite de dépenses** chez votre fournisseur de modèle d'IA, s'il en propose une.
- **Utilisez une clé réservée à Agentivity.** Si vous devez la remplacer, rien d'autre ne casse.

## Si d'autres personnes doivent utiliser ce que vous avez construit

Ne leur donnez pas le Studio. Donnez-leur un portail ou une application, avec votre propre contrôle d'accès devant. Voyez [Avant de mettre une VibeApp en ligne](/fr/docs/vibeapps/before-you-put-it-online/).

## Prévu

Les comptes, les rôles et les droits sont prévus, mais ne sont pas encore disponibles.

## Étape suivante

[Réparer une installation qui a échoué](/fr/docs/guides/if-the-install-fails/).
