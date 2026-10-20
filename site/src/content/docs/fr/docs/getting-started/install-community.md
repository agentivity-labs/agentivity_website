---
title: "Installer Agentivity avec Docker"
description: "Lancez l'édition Community gratuite d'Agentivity sur votre machine ou votre serveur avec une commande Docker, puis ouvrez le Studio dans votre navigateur."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/getting-started/install-community.md. Do not edit here: edit the source and publish again. -->

Cette page vous permet de faire tourner Agentivity sur votre propre machine ou serveur. Cela prend quelques minutes.

## Ce dont vous avez besoin

- Un ordinateur ou un serveur qui peut faire tourner Docker : Docker Desktop sous Windows ou macOS, Docker Engine sous Linux. Si vous ne l'avez pas encore, [installez Docker](https://docs.docker.com/get-started/get-docker/).
- Une clé API d'un fournisseur de modèles d'IA. Vous pouvez l'ajouter après l'installation : voyez [Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/).

## Démarrer Agentivity

Lancez cette commande dans un terminal :

```bash
docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
```

Ce que fait la commande :

- `-p 5005:5005` rend Agentivity accessible sur le port 5005 de votre machine. Si ce port est déjà utilisé, changez le premier nombre, par exemple `-p 8080:5005`, et ouvrez le port 8080.
- `-v agentivity-data:/app/_data` conserve vos données dans un volume Docker nommé `agentivity-data` : elles survivent à un redémarrage ou à une mise à jour.
- `--name agentivity` donne un nom au conteneur, pour l'arrêter et le démarrer facilement.

## Ouvrir le Studio

Dans votre navigateur, sur la machine où tourne Agentivity, ouvrez :

```text
http://localhost:5005
```

Le Studio s'ouvre avec un court guide de bienvenue. C'est là que vous construisez vos agents, équipes et workflows. Le Studio est en anglais.

**Comment savoir que ça marche :** vous voyez le Studio dans votre navigateur. Si la page ne se charge pas, vérifiez que le conteneur tourne avec `docker ps`.

## Qui peut appeler l'API

Agentivity n'a encore ni écran de connexion, ni mot de passe, ni jeton. Toute personne qui peut joindre le serveur peut l'utiliser. La connexion par compte arrivera avec les versions cloud.

**Pour essayer et pour développer, il n'y a rien à régler.** Par défaut, le serveur accepte les appels de n'importe quelle page web : une VibeApp ou un exemple servi depuis un autre port, une autre machine ou un autre domaine fonctionne tout de suite. Les appels qui ne viennent pas d'un navigateur (un script, une application mobile, un autre serveur) ont toujours été acceptés.

C'est simple, mais ce n'est pas sûr. Faites-le sur votre propre machine, ou sur un réseau de confiance.

**Pour une vraie mise en production, faites deux choses.**

1. **Limitez les pages qui peuvent appeler le serveur à celles de votre VibeApp.** Donnez leurs adresses au démarrage du conteneur, un réglage par adresse :

   ```bash
   docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data \
     -e Cors__AllowedOrigins__0=https://app.mydomain.com \
     agentivitylabs/agentivity
   ```

   Pour une autre adresse, ajoutez `Cors__AllowedOrigins__1`, puis `__2`, et ainsi de suite. Sans ce réglage, n'importe quel site web ouvert par un visiteur qui peut joindre votre serveur peut l'appeler en arrière-plan.

2. **N'exposez pas le serveur sans protection**, puisqu'il n'a pas d'écran de connexion. Placez-le derrière un proxy en HTTPS qui contrôle qui entre, ou limitez-le avec un pare-feu aux personnes et aux machines qui doivent l'utiliser.

Le Studio n'est pas concerné : le serveur le fournit lui-même, il appelle donc toujours le serveur depuis sa propre adresse.

## Bon à savoir

- **Il n'y a pas encore de connexion.** Toute personne qui peut joindre le serveur peut l'utiliser. Gardez-le sur un réseau de confiance, ou derrière votre propre contrôle d'accès. Ne l'exposez pas directement sur Internet. Voyez [Qui peut appeler l'API](#qui-peut-appeler-lapi).
- **Vos données restent chez vous.** Agents, équipes, workflows, tables et réglages sont stockés dans le volume `agentivity-data`. Sauvegardez-le comme toute autre donnée. Ce que vous envoyez dans une étape d'IA va chez le fournisseur de modèle que vous avez choisi.
- **Arrêter et démarrer.** Utilisez `docker stop agentivity` pour l'arrêter et `docker start agentivity` pour le redémarrer. Vos données sont conservées.
- **Mettre à jour.** Récupérez la nouvelle image, supprimez le conteneur, puis relancez la commande de démarrage. Le volume conserve vos données.

  ```bash
  docker pull agentivitylabs/agentivity
  docker rm -f agentivity
  ```

- **Licence.** L'édition Community est à code source disponible sous [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license) : vous pouvez l'utiliser pour votre entreprise, sur votre serveur, gratuitement.

## Si quelque chose ne marche pas

Voyez [Réparer une installation qui a échoué](/fr/docs/guides/if-the-install-fails/). Pour protéger vos données et faire les mises à jour, voyez [Mettre à jour Agentivity et sauvegarder vos données](/fr/docs/guides/update-and-back-up/). Avant que d'autres personnes n'accèdent à votre serveur, lisez [Garder votre serveur Agentivity privé](/fr/docs/guides/keep-your-server-private/).

## Étape suivante

[Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/), pour que vos agents aient de quoi réfléchir.
