---
title: "Réparer une installation qui a échoué"
description: "Que vérifier quand Agentivity ne démarre pas ou que le Studio ne s'ouvre pas. Les messages de Docker que vous pouvez voir, et ce que chacun veut dire."
sidebar:
  order: 4
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/guides/if-the-install-fails.md. Do not edit here: edit the source and publish again. -->

Cette page liste les problèmes que vous pouvez rencontrer en installant Agentivity, avec le message affiché et ce qu'il faut faire.

## D'abord, regardez l'état du conteneur

```bash
docker ps -a --filter name=agentivity
```

La colonne **STATUS** indique si le conteneur tourne (« Up ») ou s'il est arrêté (« Exited »).

Pour lire ce qu'Agentivity a écrit au démarrage :

```bash
docker logs agentivity
```

## Docker ne tourne pas

**Message :** « failed to connect to the docker API », ou « the docker daemon is not running ».

Docker lui-même n'est pas démarré. Sous Windows et macOS, lancez Docker Desktop et attendez qu'il indique qu'il tourne. Relancez ensuite la commande.

## Le port est déjà utilisé

**Message :** « Bind for 0.0.0.0:5005 failed: port is already allocated ».

Un autre programme utilise le port 5005 de votre machine.

1. Supprimez le conteneur qui n'a pas pu démarrer.

   ```bash
   docker rm -f agentivity
   ```

2. Démarrez Agentivity sur un autre port. Ne changez que le premier nombre :

   ```bash
   docker run -d --name agentivity -p 8080:5005 -v agentivity-data:/app/_data agentivitylabs/agentivity
   ```

3. Ouvrez `http://localhost:8080`.

## Le nom est déjà utilisé

**Message :** « Conflict. The container name "/agentivity" is already in use ».

Un conteneur nommé `agentivity` existe déjà, qu'il tourne ou qu'il soit arrêté.

- Pour démarrer celui que vous avez : `docker start agentivity`.
- Pour le remplacer : `docker rm -f agentivity`, puis relancez la commande de démarrage. Vos données sont dans le volume et sont conservées.

## La page ne s'ouvre pas

Le conteneur tourne, mais `http://localhost:5005` n'affiche rien.

- **Attendez quelques secondes** après le démarrage, puis rechargez la page.
- **Vérifiez le port.** Dans le résultat de `docker ps`, la colonne **PORTS** doit afficher `0.0.0.0:5005->5005`. Si le premier nombre est différent, ouvrez plutôt ce port.
- **Ouvrez-la sur la bonne machine.** `localhost` désigne la machine où se trouve votre navigateur. Si Agentivity tourne sur une autre machine, utilisez l'adresse de cette machine.

## Le Studio s'ouvre, mais il est vide après un redémarrage

Le conteneur a été démarré sans le volume. Vérifiez que la commande de démarrage contient `-v agentivity-data:/app/_data`. Voyez [Mettre à jour Agentivity et sauvegarder vos données](/fr/docs/guides/update-and-back-up/).

## Le modèle ne répond pas

**Message dans le Studio :** « The model did not answer », avec un texte qui parle d'une connexion SSL.

Agentivity tourne, mais n'arrive pas à établir une connexion sécurisée avec votre fournisseur de modèle d'IA. Les journaux (logs) montrent alors des lignes comme « The SSL connection could not be established ».

Cela arrive quand un programme de sécurité ou un proxy d'entreprise inspecte le trafic Internet de la machine. Demandez à la personne qui gère la machine ou le réseau de laisser les conteneurs Docker accéder à Internet sans cette inspection.

Autres signes de la même cause :

- Le bouton **Test** d'une connexion à un modèle indique « The provider could not be reached », alors qu'Internet fonctionne dans votre navigateur.
- Les journaux affichent « The remote certificate is invalid because of errors in the certificate chain: PartialChain ».
- Juste après le démarrage, les journaux indiquent « Failed to download ONNX model. Local embeddings will not be available. »

### Si un antivirus inspecte le trafic

Pour garder l'antivirus actif et faire accepter son certificat par le conteneur, voyez [Si un antivirus bloque les connexions d'Agentivity](/fr/docs/guides/if-an-antivirus-inspects-your-connections/). La méthode rapide, pour un test, se trouve ci-dessous.

De nombreux antivirus (Avast, AVG, Kaspersky, ESET, Bitdefender…) lisent les connexions sécurisées de la machine, avec un certificat qui leur est propre. Votre navigateur fait confiance à ce certificat, parce que l'antivirus l'a ajouté à Windows ou à macOS. Le conteneur Agentivity ne le connaît pas, alors il refuse la connexion.

Si la machine est à vous :

1. Ouvrez les réglages de l'antivirus et cherchez l'option qui analyse les connexions sécurisées. En anglais, elle s'appelle « HTTPS scanning », « SSL/TLS scanning » ou « Encrypted connections scanning ». Dans Avast et AVG, elle se trouve dans **Protection**, **Core Shields**, **Web Shield**.
2. Désactivez cette option, ou ajoutez une exception pour Docker si l'antivirus le permet.
3. Redémarrez Agentivity : `docker restart agentivity`.
4. Dans le Studio, ouvrez votre connexion au modèle et appuyez de nouveau sur **Test**.

Mettre tout l'antivirus en pause fonctionne aussi, pour un test. Réactivez-le ensuite.

Sur une machine d'entreprise, ne modifiez pas l'antivirus vous-même : demandez à la personne qui le gère.

## La barre du bas indique Realtime reconnecting

Le Studio fonctionne, mais ses écrans ne se mettent pas à jour tout seuls, et le chat d'une exécution reste vide. La connexion en direct entre votre navigateur et Agentivity est bloquée. La cause est souvent la même que ci-dessus : un programme de sécurité ou un proxy qui retient la connexion. Voyez [La barre d'état, le thème et le bouton du guide](/fr/docs/studio/status-bar-and-theme/).

## Les Solutions prêtes à l'emploi ne se chargent pas

**Message dans le guide de bienvenue :** « The marketplace could not be reached. »

La machine ne peut pas joindre la marketplace d'Agentivity par Internet. Vous pouvez passer cette étape et importer un Template plus tard.

## Si le problème persiste

Copiez le résultat de `docker logs agentivity` avant de demander de l'aide. Retirez-en d'abord toute clé et tout mot de passe.

## Étape suivante

[Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/).
