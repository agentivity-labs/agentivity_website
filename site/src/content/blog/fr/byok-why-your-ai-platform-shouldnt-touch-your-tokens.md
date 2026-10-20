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

BYOK signifie que vous connectez directement à votre plateforme d'IA votre propre clé API, obtenue chez votre fournisseur de LLM (Anthropic, OpenAI, Mistral, ou tout point d'accès compatible OpenAI). La plateforme orchestre les agents et le workflow. Mais chaque token va de votre environnement à votre fournisseur. La plateforme n'y touche jamais.

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

Les fournisseurs de LLM sortent sans cesse de nouveaux modèles. Avec le BYOK, passer de Claude 3.5 à Claude 4.0 revient à changer un choix dans une liste déroulante, sans attendre que votre fournisseur SaaS mette à jour son intégration. Vous pouvez aussi utiliser des modèles différents pour des agents différents. Un modèle rapide et bon marché pour l'étape d'extraction des données. Un modèle plus performant pour l'étape de raisonnement. À vous d'optimiser vos coûts.

### Pour l'indépendance vis-à-vis des fournisseurs

Si vous payez une plateforme pour appeler Anthropic à votre place, vous avez deux dépendances : la plateforme *et* Anthropic. Si l'une ou l'autre change ses conditions, augmente ses prix ou tombe en panne, vous êtes touché. Avec le BYOK et une plateforme auto-hébergée, la couche d'orchestration vous appartient. Vous changez de fournisseur en changeant une clé. Vous l'hébergez sur n'importe quelle infrastructure qui fait tourner Docker.

## Les fournisseurs compatibles

Tout point d'accès compatible OpenAI fonctionne en BYOK. Cela comprend :

- **Anthropic** (Claude 3.5, Claude 4, Opus, Haiku)
- **OpenAI** (GPT-4o, o1, o3)
- **Mistral** (Mistral Large, Codestral)
- **Groq** (pour une inférence rapide)
- **Ollama** (pour des modèles locaux, entièrement coupés de l'extérieur)
- **LM Studio** (pour des modèles locaux)
- Tout fournisseur doté d'une API compatible OpenAI

Les modèles locaux via Ollama méritent une mention. Pour les usages les plus sensibles, vous pouvez faire tourner toute votre équipe IA (Agentivity + LLM locaux) sur un seul serveur, sans aucun appel à une API externe. Aucune donnée ne quitte votre réseau.

## Ce que le BYOK ne règle pas

Le BYOK concerne le chemin des données entre votre plateforme et votre fournisseur de LLM. Il ne couvre pas :

- **Les pratiques du fournisseur de LLM en matière de données.** Quand vous envoyez un prompt à Anthropic, Anthropic le voit. Lisez ses règles d'utilisation des données : la plupart des contrats entreprise prévoient un engagement à ne pas entraîner les modèles sur vos données.
- **Les résultats que vous stockez.** Si vous enregistrez les résultats des agents dans une base de données, ces données se trouvent là où est votre base.
- **Les outils que vos agents appellent.** Si un agent appelle une API externe, cette API voit les données qu'elle reçoit.

Le BYOK réduit nettement la surface d'attaque. Il ne la supprime pas. Une vraie protection des données combine le BYOK avec l'auto-hébergement, des contrats adaptés avec le fournisseur de LLM et une gestion raisonnable des résultats.

## Comment le mettre en place dans Agentivity

1. Obtenez une clé API auprès de votre fournisseur de LLM (Anthropic, OpenAI, etc.)
2. Dans Agentivity, allez dans Settings → API Keys
3. Ajoutez votre clé et sélectionnez le fournisseur
4. Choisissez le modèle utilisé par chaque agent (vous pouvez mélanger les modèles d'un agent à l'autre)

C'est tout. Vos agents appellent maintenant directement votre fournisseur. Agentivity ne voit jamais vos tokens.

---

*Agentivity est auto-hébergé et BYOK par conception. [Ajoutez une étoile sur GitHub](https://github.com/agentivity-labs/agentivity) ou [lisez la documentation](/fr/docs).*
