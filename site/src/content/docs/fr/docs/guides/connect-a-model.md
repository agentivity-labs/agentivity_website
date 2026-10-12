---
title: "Connecter un modèle d'IA à Agentivity"
description: "Ajoutez la clé API d'OpenAI, Anthropic, Google Gemini, xAI ou DeepSeek pour que vos agents et équipes puissent tourner. Votre clé reste sur votre serveur."
sidebar:
  order: 1
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/guides/connect-a-model.md. Do not edit here: edit the source and publish again. -->

Les agents ont besoin d'un modèle d'IA pour réfléchir. Agentivity n'en fournit pas : vous apportez le vôtre. Vous ajoutez la clé API du fournisseur que vous utilisez, et vos agents tournent sur ce modèle.

## Ce dont vous avez besoin

- Agentivity qui tourne. Sinon, commencez par [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
- Une clé API d'un fournisseur, avec du crédit chez lui. C'est le fournisseur qui vous facture directement ce que vos agents utilisent.

## Où obtenir une clé

| Fournisseur | Famille de modèles | Où créer la clé |
|---|---|---|
| Anthropic | Claude | console.anthropic.com |
| OpenAI | GPT | platform.openai.com/api-keys |
| Google | Gemini | aistudio.google.com/apikey |
| xAI | Grok | console.x.ai |
| DeepSeek | DeepSeek | platform.deepseek.com |

## Connecter votre modèle la première fois

Le Studio est en anglais : les noms ci-dessous sont ceux de l'écran.

1. Ouvrez le Studio. Dans le guide de bienvenue, choisissez **Get started**, puis l'étape **Connect your AI model**.
2. Choisissez votre fournisseur.
3. Collez votre clé API.
4. Sélectionnez **Check and save**.

Agentivity vérifie la clé auprès du fournisseur immédiatement, sans frais. Quand elle fonctionne, un message vert apparaît, par exemple « Connected to Claude », avec le nombre de modèles disponibles.

**Comment savoir que ça marche :** l'étape affiche le message vert « Connected », et le guide vous laisse continuer.

## Ajouter une autre connexion plus tard

Vous pouvez ajouter ou modifier une connexion à tout moment :

1. Dans le Studio, ouvrez **Settings**, puis **Credentials**.
2. Sélectionnez **New credentials** et choisissez le fournisseur dans la liste des modèles.
3. Remplissez les champs et enregistrez.

Vous pouvez garder plusieurs connexions, par exemple une par fournisseur, et choisir sur laquelle tournent vos agents.

## Votre clé

- La clé est stockée sur votre serveur et n'est plus jamais affichée après l'enregistrement.
- Ce que vos agents envoient va chez le fournisseur que vous avez choisi, selon ses conditions.

## Si ça ne marche pas

- **« Paste your API key first. »** Le champ de la clé est vide.
- **« This key was refused by » votre fournisseur.** Le fournisseur n'a pas accepté la clé. Vérifiez que vous l'avez copiée en entier, qu'elle est toujours active, et que votre compte a du crédit.
- **« Key saved, but » votre fournisseur « could not confirm it right now ».** La clé est enregistrée, mais le fournisseur n'a pas pu être joint à ce moment-là. Réessayez un peu plus tard.

## Étape suivante

Créez votre premier agent, équipe ou workflow dans le Studio. Pour voir à quoi ressemble le Studio, lisez [comment ça marche](/fr/how-it-works).
