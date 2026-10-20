---
title: "BYOK : pourquoi votre plateforme d'IA ne devrait pas toucher à vos tokens"
description: "La plupart des plateformes d'IA se placent entre vous et votre fournisseur de LLM, prennent une marge sur votre usage et enregistrent vos prompts. Voici pourquoi c'est important, et ce que BYOK veut dire en pratique."
pubDate: 2026-06-05
author: "Agentivity Team"
tags: ["BYOK", "privacy", "architecture", "self-hosted"]
lang: fr
---

Quand vous utilisez une plateforme qui « inclut l'IA », une question mérite d'être posée : à qui est cette IA, exactement ?

La plupart des outils d'IA en SaaS fonctionnent ainsi : vous payez un abonnement, la plateforme appelle un LLM pour vous, et vous obtenez le résultat. Simple. Mais il se passe trois choses auxquelles la plupart des utilisateurs ne pensent pas.

1. **Vos données passent par leurs serveurs.** Vos prompts, vos documents, vos résultats : tout est traité par une infrastructure que vous ne contrôlez pas.
2. **Vous payez une marge.** La plateforme paie le fournisseur de LLM au prix coûtant, puis vous facture davantage. Cette marge est invisible.
3. **Vous n'avez aucun contrôle sur le modèle.** Quand la plateforme change de fournisseur, retouche ses prompts ou modifie ses limites d'usage, vous le découvrez le jour où quelque chose casse.

Le BYOK (Bring Your Own Key, « apportez votre propre clé ») est l'alternative.

## Ce que veut dire BYOK

BYOK signifie que vous connectez directement à votre plateforme d'IA votre propre clé API, obtenue chez votre fournisseur de LLM (Anthropic, OpenAI, Google Gemini, xAI, DeepSeek ou AWS Bedrock). La plateforme orchestre les agents et le workflow. Mais chaque token va de votre environnement à votre fournisseur. La plateforme n'y touche jamais.

Concrètement :

- **Vos prompts** vont de votre instance Agentivity → directement chez Anthropic/OpenAI
- **Vos résultats** reviennent par le même chemin
- **Vos coûts** apparaissent sur la facture de votre fournisseur de LLM, au prix coûtant, sans marge
- **Vos données** ne transitent jamais par une plateforme d'IA tierce

## Pourquoi c'est plus important que vous ne le pensez

### Pour la confidentialité des données

Si vous utilisez l'IA pour traiter quoi que ce soit de sensible (données clients, informations financières, dossiers RH, documents juridiques), le chemin que prennent ces données compte.

Une plateforme BYOK auto-hébergée traite les données sur votre infrastructure. Une plateforme dans le cloud, même avec des « garanties de confidentialité pour les entreprises », implique malgré tout que les données quittent votre environnement. Ce sont deux profils de risque différents, et vos équipes juridiques et conformité connaissent la différence.

### Pour la prévisibilité des coûts

Le coût des tokens est déjà variable. Y ajouter une marge de plateforme le rend doublement imprévisible. Avec le BYOK, vous savez exactement ce que vous payez, parce que vous payez directement le fournisseur. Pas de frais mystère, pas de ligne « usage IA » sur votre facture que vous ne pouvez pas détailler.

### Pour la liberté de choix du modèle

Les fournisseurs de LLM sortent sans cesse de nouveaux modèles. Avec le BYOK, passer à un modèle plus récent revient à le choisir dans votre connexion : la liste montre les modèles que votre clé peut utiliser. Pas besoin d'attendre que votre fournisseur SaaS mette à jour son intégration. Vous pouvez aussi garder plusieurs connexions et utiliser des modèles différents pour des agents différents. Un modèle rapide et bon marché pour l'étape d'extraction des données. Un modèle plus performant pour l'étape de raisonnement. À vous d'optimiser vos coûts.

### Pour l'indépendance vis-à-vis des fournisseurs

Si vous payez une plateforme pour appeler Anthropic à votre place, vous avez deux dépendances : la plateforme *et* Anthropic. Si l'une ou l'autre change ses conditions, augmente ses prix ou tombe en panne, vous êtes touché. Avec le BYOK et une plateforme auto-hébergée, la couche d'orchestration vous appartient. Vous changez de fournisseur en changeant une clé. Vous l'hébergez sur n'importe quelle infrastructure qui fait tourner Docker.

## Les fournisseurs que vous pouvez connecter

Agentivity se connecte à ces fournisseurs, chacun avec votre propre clé :

- **Anthropic** (les modèles Claude)
- **OpenAI** (les modèles GPT)
- **Google Gemini**
- **xAI** (les modèles Grok)
- **DeepSeek**
- **AWS Bedrock**, si votre entreprise accède à ses modèles par AWS

Chaque connexion indique le modèle exact qu'elle utilise. Pour la plupart des fournisseurs, le Studio demande au fournisseur quels modèles votre clé peut utiliser et les affiche dans une liste. Chaque connexion contient aussi l'adresse de l'API du fournisseur, déjà remplie avec l'adresse officielle : ne la changez que pour passer par un proxy à vous.

## Ce que le BYOK ne règle pas

Le BYOK concerne le chemin des données entre votre plateforme et votre fournisseur de LLM. Il ne couvre pas :

- **Les pratiques du fournisseur de LLM en matière de données.** Quand vous envoyez un prompt à Anthropic, Anthropic le voit. Lisez ses règles d'utilisation des données : la plupart des contrats entreprise prévoient un engagement à ne pas entraîner les modèles sur vos données.
- **Les résultats que vous stockez.** Si vous enregistrez les résultats des agents dans une base de données, ces données se trouvent là où est votre base.
- **Les outils que vos agents appellent.** Si un agent appelle une API externe, cette API voit les données qu'elle reçoit.

Le BYOK réduit nettement la surface d'attaque. Il ne la supprime pas. Une vraie protection des données combine le BYOK avec l'auto-hébergement, des contrats adaptés avec le fournisseur de LLM et une gestion raisonnable des résultats.

## Comment le mettre en place dans Agentivity

1. Obtenez une clé API auprès de votre fournisseur de LLM (Anthropic, OpenAI, Google, xAI ou DeepSeek), avec du crédit sur votre compte chez lui.
2. Dans le Studio, ouvrez **Settings**, puis **Credentials**, et sélectionnez **New credentials**. Choisissez **AI models**, puis votre fournisseur. (La première fois, le guide de bienvenue propose la même étape : **Connect your AI model**.)
3. Collez votre clé, puis choisissez le **modèle** : la liste montre les modèles que votre clé peut utiliser.
4. Enregistrez. Gardez plusieurs connexions si vous voulez des modèles différents pour des agents différents, et choisissez celle sur laquelle chaque agent tourne.

C'est tout. Vos agents appellent maintenant directement votre fournisseur, depuis votre propre serveur. Aucun serveur d'Agentivity ne se place entre les deux, et votre fournisseur vous facture directement.

---

*Agentivity est auto-hébergé et BYOK par conception. [Ajoutez une étoile sur GitHub](https://github.com/agentivity-labs/agentivity) ou [lisez comment connecter un modèle](/fr/docs/guides/connect-a-model).*
