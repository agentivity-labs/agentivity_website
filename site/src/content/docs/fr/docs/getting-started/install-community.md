---
title: "Installer Agentivity avec Docker"
description: "Lancez l'édition Community gratuite d'Agentivity sur votre machine ou votre serveur avec une commande Docker, puis ouvrez le Studio dans votre navigateur."
sidebar:
  order: 1
draft: true
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

## Bon à savoir

- **Il n'y a pas encore de connexion.** Toute personne qui peut joindre le serveur peut l'utiliser. Gardez-le sur un réseau de confiance, ou derrière votre propre contrôle d'accès. Ne l'exposez pas directement sur Internet.
- **Vos données restent chez vous.** Agents, équipes, workflows, tables et réglages sont stockés dans le volume `agentivity-data`. Sauvegardez-le comme toute autre donnée. Ce que vous envoyez dans une étape d'IA va chez le fournisseur de modèle que vous avez choisi.
- **Arrêter et démarrer.** Utilisez `docker stop agentivity` pour l'arrêter et `docker start agentivity` pour le redémarrer. Vos données sont conservées.
- **Mettre à jour.** Récupérez la nouvelle image, supprimez le conteneur, puis relancez la commande de démarrage. Le volume conserve vos données.

  ```bash
  docker pull agentivitylabs/agentivity
  docker rm -f agentivity
  ```

- **Licence.** L'édition Community est à code source disponible sous [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license) : vous pouvez l'utiliser pour votre entreprise, sur votre serveur, gratuitement.

## Étape suivante

[Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/), pour que vos agents aient de quoi réfléchir.
