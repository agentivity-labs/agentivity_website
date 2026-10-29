---
title: "Si un antivirus bloque les connexions d'Agentivity"
description: "Un antivirus ou un proxy d'entreprise remplace le certificat de sécurité et Agentivity ne joint plus votre modèle d'IA. Comment faire accepter ce certificat."
sidebar:
  order: 5
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/guides/if-an-antivirus-inspects-your-connections.md. Do not edit here: edit the source and publish again. -->

Certains antivirus et proxys d'entreprise lisent vos connexions Internet sécurisées. Pour cela, ils mettent leur propre certificat de sécurité à la place du vrai. Votre navigateur l'accepte, parce que l'antivirus l'a ajouté à Windows ou à macOS. Le conteneur Agentivity ne le connaît pas, alors il refuse la connexion.

## Ce que vous voyez

- Dans le Studio, un agent ou l'Assistant s'arrête avec **The model did not answer**, avec un texte qui parle d'une connexion SSL.
- La vérification de votre clé indique que le fournisseur n'a pas pu être joint, alors que votre navigateur y arrive : **Check the key** dans le guide de bienvenue, ou le bouton **Test** d'une connexion.
- La liste des modèles reste vide. Vous pouvez quand même taper l'ID de votre modèle à la main, mais les agents ne tourneront pas tant que le certificat n'est pas accepté.
- Dans les journaux (`docker logs agentivity`) : « The SSL connection could not be established ».

Seuls les appels que fait le serveur sont concernés : vers les modèles d'IA, les pages web et les services. Le Studio lui-même s'ouvre normalement.

## Choisir une méthode

| Méthode | À utiliser quand | L'antivirus reste actif |
|---|---|---|
| **1. Faire accepter le certificat par le conteneur** | La machine est à vous, ou la personne qui la gère vous a donné le certificat. C'est la méthode à garder. | Oui |
| **2. Désactiver l'analyse des connexions sécurisées** | Un test rapide sur votre propre machine. | Non, pour cette fonction |
| **3. Construire une image qui contient le certificat** | Vous déployez la même image sur plusieurs machines. | Oui |

## Méthode 1 : faire accepter le certificat par le conteneur

### Récupérer le certificat de l'antivirus

Sous Windows :

1. Appuyez sur la touche Windows, tapez `certmgr.msc` et ouvrez-le.
2. Ouvrez **Autorités de certification racines de confiance**, puis **Certificats** (**Trusted Root Certification Authorities**, puis **Certificates**, sur un Windows en anglais).
3. Trouvez la ligne dont le nom contient le nom de votre antivirus.
4. Faites un clic droit dessus, puis **Toutes les tâches**, puis **Exporter…** (**All Tasks**, puis **Export…**, en anglais).
5. Choisissez le format **X.509 encodé en base 64 (.CER)** (**Base-64 encoded X.509 (.CER)** en anglais), et enregistrez le fichier, par exemple sous `C:\certs\antivirus.crt`.

Ouvrez le fichier dans un éditeur de texte. Il doit commencer par `-----BEGIN CERTIFICATE-----`. S'il ressemble à des caractères illisibles, l'export a utilisé le mauvais format : exportez-le à nouveau.

Sur une machine d'entreprise, demandez plutôt le certificat du proxy à la personne qui la gère. S'il y a plusieurs certificats, collez-les les uns après les autres dans le même fichier.

### Démarrer Agentivity avec ce certificat

Supprimez le conteneur, puis démarrez-le à nouveau avec le certificat. Vos données restent dans le volume.

```bash
docker rm -f agentivity
docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data -v C:\certs\antivirus.crt:/certs/antivirus.crt:ro -e SSL_CERT_FILE=/certs/antivirus.crt agentivitylabs/agentivity
```

Ce que font les deux nouveaux éléments :

- `-v C:\certs\antivirus.crt:/certs/antivirus.crt:ro` donne le fichier au conteneur, en lecture seule. Remplacez `C:\certs\antivirus.crt` par l'emplacement de votre fichier.
- `-e SSL_CERT_FILE=/certs/antivirus.crt` indique au serveur de faire confiance à ce certificat, en plus des certificats habituels.

Le certificat s'ajoute aux autres : les connexions sécurisées qui fonctionnent aujourd'hui continuent de fonctionner.

Laissez le fichier où il est. Le conteneur le lit à chaque démarrage.

### Comment savoir que ça marche

1. Dans le Studio, vérifiez de nouveau votre clé (**Check the key** dans le guide, ou **Test** sur la connexion). Le message ne dit plus que le fournisseur n'a pas pu être joint, et la liste des modèles se charge.
2. Lancez un agent. Il répond au lieu de s'arrêter avec « The model did not answer ».

## Méthode 2 : désactiver l'analyse des connexions sécurisées

Ouvrez les réglages de l'antivirus et cherchez l'option qui analyse les connexions sécurisées. En anglais, elle s'appelle « HTTPS scanning », « SSL/TLS scanning » ou « Encrypted connections scanning ». Dans Avast et AVG, elle se trouve dans **Protection**, **Core Shields**, **Web Shield**. Dans une version française d'Avast, ces noms peuvent être différents (par exemple « Bouclier Web » et « Activer l'analyse HTTPS ») : cherchez l'option d'analyse HTTPS dans les réglages du bouclier Web.

Désactivez-la, ou ajoutez une exception pour Docker si l'antivirus le permet. Redémarrez ensuite Agentivity avec `docker restart agentivity`, puis sélectionnez de nouveau **Test** sur votre connexion au modèle.

Mettre tout l'antivirus en pause fonctionne aussi, pour un test. Réactivez-le ensuite.

Cela réduit votre protection pour tous les programmes de la machine, pas seulement pour Agentivity. Préférez la méthode 1 sur une machine que vous utilisez tous les jours.

## Méthode 3 : construire une image qui contient le certificat

Créez un fichier nommé `Dockerfile` à côté du certificat, avec ces lignes :

```text
FROM agentivitylabs/agentivity:latest
USER root
COPY antivirus.crt /usr/local/share/ca-certificates/antivirus.crt
RUN update-ca-certificates
USER app
```

Construisez l'image et démarrez-la :

```bash
docker build -t agentivity-with-certificate .
docker run -d --name agentivity -p 5005:5005 -v agentivity-data:/app/_data agentivity-with-certificate
```

L'image vous appartient : quand une nouvelle version d'Agentivity sort, reconstruisez-la à partir de la nouvelle.

## Sur une machine d'entreprise

Ne désactivez pas l'antivirus vous-même, et n'exportez pas de certificat sans demander. La personne qui gère la machine connaît les règles. Demandez-lui le certificat du proxy ou de l'antivirus, et utilisez la méthode 1 ou la méthode 3.

## Si ça ne marche pas

- **Docker refuse de démarrer le conteneur, ou il ne démarre pas.** Le chemin du fichier est probablement faux. Vérifiez le chemin sur votre machine, et lisez le message de Docker et `docker logs agentivity`.
- **Le message est toujours le même.** Le fichier n'est pas un certificat au format texte, ou ce n'est pas celui qu'utilise votre antivirus. Exportez celui qui porte le nom de l'antivirus, au format base 64.
- **Ça a marché, puis ça s'est arrêté.** Certains antivirus renouvellent leur certificat. Exportez-le à nouveau et redémarrez le conteneur.
- **La barre du bas du Studio indique Realtime reconnecting.** Le même genre de programme peut retenir la connexion en direct du navigateur. C'est un autre problème, avec d'autres étapes : voyez [Réparer une installation qui a échoué](/fr/docs/guides/if-the-install-fails/).

## Étape suivante

[Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/), puis vérifiez de nouveau votre clé.
