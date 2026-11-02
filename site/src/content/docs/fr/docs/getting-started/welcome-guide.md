---
title: "Suivre le guide de bienvenue du Studio"
description: "La première fois que vous ouvrez le Studio, un court guide vous aide à connecter un modèle d'IA et à essayer une Solution prête à l'emploi. Voici chaque étape."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/getting-started/welcome-guide.md. Do not edit here: edit the source and publish again. -->

La première fois que vous ouvrez le Studio, un guide de bienvenue apparaît. Il compte quatre étapes courtes. La liste de gauche montre aussi l'écran d'accueil et l'écran de fin, qui ne sont pas comptés comme des étapes. Vous pouvez passer n'importe quelle étape et y revenir plus tard.

## Ce dont vous avez besoin

- Agentivity qui tourne, avec le Studio ouvert dans votre navigateur. Sinon, commencez par [Installer Agentivity avec Docker](/fr/docs/getting-started/install-community/).
- Pour l'étape 1, un compte OpenRouter, que vous pouvez créer en chemin, ou une clé API d'un fournisseur de modèles d'IA si vous préférez la vôtre. Une clé API est un code secret qui permet à Agentivity d'utiliser votre compte chez ce fournisseur.
- Pour l'étape 2, une connexion Internet sur la machine où tourne Agentivity.

## Lancer le guide

![Le guide de bienvenue du Studio : la liste des étapes à gauche, de Welcome à You are set, et, à droite, les trois cartes Connect your model, Try a ready-made solution et Take the two-minute tour, avec le bouton Get started](images/welcome-guide.jpg)

L'écran de bienvenue montre ce que couvre le guide : **Connect your model**, **Try a ready-made solution** et **Take the two-minute tour**.

1. Sélectionnez **Get started**.

Si vous préférez d'abord jeter un œil, sélectionnez **Not now** ou **Skip the guide**. Voyez [Rouvrir le guide](#rouvrir-le-guide).

## Étape 1 : connecter votre modèle d'IA

Vos agents ont besoin d'un modèle d'IA pour réfléchir. L'étape propose deux voies, dans deux cases :

- **One OpenRouter account**, marquée **Recommended** : pas de clé à copier, des modèles de plusieurs fournisseurs, et vous payez ce que vous utilisez. Si vous avez déjà un compte, vous vous connectez simplement.
- **Use my own key** : pour qui paye déjà un fournisseur d'IA, comme Anthropic ou OpenAI. Vous collez une clé, et Agentivity la vérifie aussitôt.

![L'étape 1 du guide de bienvenue : les deux cases One OpenRouter account, marquée Recommended, et Use my own key, le bouton Connect with OpenRouter et le bouton Skip for now](images/guide-step1-choices.png)

### Avec un compte OpenRouter

1. Gardez la première case et sélectionnez **Connect with OpenRouter**. Une fenêtre s'ouvre chez OpenRouter : créez un compte ou connectez-vous, puis sélectionnez **Authorize**.
2. Un nouveau compte n'a pas de crédit : le guide dit alors « One step left: add credit ». Sélectionnez **Add credit**, payez chez OpenRouter, puis revenez. Le guide voit le crédit tout seul, ou vous pouvez sélectionner **I've added credit**.
3. Quand le guide dit « Connected to OpenRouter. You are ready. », sélectionnez **Continue**.

Vous pourrez changer de modèle plus tard, dans **Administration** > **Credentials**. Tout ce qui concerne cette voie, y compris ce qui se passe quand le crédit s'épuise, est dans [Connect with OpenRouter](/fr/docs/guides/connect-with-openrouter/) (page en anglais).

### Avec votre propre clé

![L'étape 1 du guide de bienvenue avec votre propre clé : cinq fournisseurs au choix (Claude, GPT, Gemini, Grok, DeepSeek), un champ pour la clé API, et les boutons Check the key et Skip for now](images/guide-step1.jpg)

1. Sélectionnez **Use my own key**, puis choisissez votre fournisseur : **Claude**, **GPT**, **Gemini**, **Grok** ou **DeepSeek**. **Back to the choices** revient aux deux cases.
2. Collez votre clé API dans le champ, puis sélectionnez **Check the key**. Agentivity demande au fournisseur si la clé fonctionne. Rien n'est encore enregistré. Si le fournisseur refuse la clé, son message s'affiche.
3. Choisissez le modèle. C'est obligatoire. La liste contient les modèles que votre clé peut utiliser. Si la liste n'est pas disponible, tapez l'ID du modèle.
4. Sélectionnez **Save**. La connexion est enregistrée avec sa clé et son modèle. Vous pourrez changer de modèle plus tard, dans **Administration** > **Credentials**.

La clé est stockée sur votre serveur et n'est plus jamais affichée.

Pour le faire plus tard, sélectionnez **Skip for now**. Si vous lancez un chat ou une exécution sans modèle connecté, le Studio propose les deux mêmes choix dans une fenêtre : rien n'est perdu. La page [Connecter un modèle d'IA](/fr/docs/guides/connect-a-model/) explique la voie de la clé personnelle en détail.

## Étape 2 : essayer une première Solution

Une solution, c'est ce que vous lancez pour qu'un besoin soit pris en charge de bout en bout. Cette étape propose des Solutions prêtes à l'emploi : vous en voyez une fonctionner avant de construire quoi que ce soit. Chaque carte indique ce que contient la Solution, par exemple « 1 team · 13 agents · 2 data tables ».

![L'étape 2 du guide de bienvenue, Try a first solution : les cartes CV Screening, Invoice Clerk, Shopping Lab et Trip Manager Team, chacune avec son contenu et un lien Try it](images/four-showcases.jpg)

1. Sur la carte de la Solution qui vous intéresse, sélectionnez **Try it**. La fenêtre **Import a Template** s'ouvre. Un Template est un fichier unique qui contient une Solution et tout ce dont elle a besoin.
2. Sélectionnez **Import**.
3. Quand **Template imported** s'affiche, sélectionnez **Open it** pour ouvrir la Solution dans son éditeur, ou **Close** pour rester dans le guide.

L'import crée de nouvelles copies dans votre espace de travail. Rien de ce que vous avez déjà n'est modifié.

Les Solutions prêtes à l'emploi sont téléchargées depuis le catalogue de Templates d'Agentivity, par Internet. Si le catalogue est injoignable, le guide vous le signale et vous laisse continuer. Vous pourrez importer des Templates plus tard, dans la section **Templates**.

Pour plus de détails, lisez [Essayer une Solution prête à l'emploi](/fr/docs/getting-started/try-a-ready-made-solution/).

## Étape 3 : regarder l'introduction

Une courte vidéo montre ce que vous pouvez construire et par où commencer. Vous pouvez la passer.

## Étape 4 : rester informé

Vous pouvez donner votre adresse e-mail pour recevoir les nouvelles d'Agentivity : nouveaux Templates et nouvelles versions. Cette étape est facultative. Pour vous abonner, cochez la case pour donner votre accord, puis sélectionnez **Subscribe**. Vous recevez un seul e-mail de confirmation, et vous pouvez vous désabonner à tout moment.

## Comment savoir que ça marche

Le guide se termine sur l'écran **You are set**. Sélectionnez **Open my workspace** pour aller dans le Studio.

## Rouvrir le guide

Ce que vous avez passé n'est pas perdu. Dans le Studio, sélectionnez **Getting started**, en bas du menu de gauche. Le guide s'ouvre à nouveau.

## Si ça ne marche pas

- **La fenêtre d'OpenRouter ne s'ouvre pas.** Votre navigateur a bloqué la fenêtre. Autorisez les fenêtres pour cette page, puis sélectionnez **Try again**.
- **« Paste your API key first. »** Le champ de la clé est vide.
- **La clé est refusée.** Le Studio affiche le message de votre fournisseur.
- **« The marketplace could not be reached. »** La machine où tourne Agentivity n'a pas accès au catalogue de Templates. Vérifiez sa connexion Internet, ou passez l'étape et importez un Template plus tard à partir d'un fichier.

## Étape suivante

[Vous repérer dans le Studio](/fr/docs/studio/find-your-way-in-the-studio/), puis [construire votre première équipe avec l'Assistant](/fr/docs/getting-started/build-your-first-team-with-the-assistant/).
