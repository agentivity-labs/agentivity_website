---
title: "Où va chaque type d'information"
description: "Instructions, Prompts, Data Tables, Knowledge Bases, sessions et Vector Stores : à quoi sert chacun, comment l'agent y accède, combien de temps il est gardé."
sidebar:
  order: 9
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/introduction/where-does-it-go.md. Do not edit here: edit the source and publish again. -->

On peut donner six types de choses à un agent. Elles se ressemblent, et on les confond facilement. Cette page dit laquelle utiliser pour quoi.

## La comparaison

| Vous voulez que l'agent… | Où cela va | Comment l'agent y accède | Combien de temps c'est conservé |
|---|---|---|---|
| Suive toujours certaines règles, un ton, un rôle | **Ses instructions**, dans la fenêtre de l'AI Agent | Il les lit à chaque demande | Aussi longtemps que l'agent |
| Dispose d'instructions écrites et essayées à l'avance | **La bibliothèque de Prompts**, dans Prompt Studio | Il ne la lit pas. Vous copiez le résultat dans ses instructions | Aussi longtemps que le Prompt |
| Consulte ou modifie des faits rangés en lignes : prix, stock, commandes, clients | **Une Data Table** | Un outil **Data Table** | Jusqu'à ce que les lignes soient modifiées |
| Connaisse vos textes : politiques, guides, manuels, un site web, un flux, les lignes d'une base de données vues comme des textes | **Une Knowledge Base** | L'étape **Knowledge Base**, sur le losange **Knowledge Bases**. L'agent cherche par le sens | Conservée, et tenue à jour depuis sa source |
| Se souvienne des messages précédents d'une conversation | **Une Agent Session** | Le losange **Agent Session** | **In-Memory** : jusqu'au redémarrage du serveur. **File** : conservée |
| Conserve des textes pendant qu'il travaille et les retrouve par leur sens : des notes, ce qu'il a appris | **Un Vector Store** | L'**AI Agent Vector Store Tool**, ou une étape **Vector Store** dans un workflow | **In-Memory** : le temps d'une exécution. **Qdrant**, **Pinecone**, **pgvector** : conservé |

## Un exemple, avec l'agent Reminder Writer

L'agent `Reminder Writer` rédige une relance de paiement pour un client.

| Ce dont l'agent a besoin | Où cela va |
|---|---|
| « Rédige un e-mail court et poli. Indique la facture, le montant et la date d'échéance. » | Ses **instructions** |
| Les factures ouvertes de l'entreprise : client, numéro, montant, date d'échéance | Une **Data Table** `invoices` |
| Les conditions de paiement et la politique de relance de l'entreprise, rédigées sous forme de textes | Une **Knowledge Base** `Payment terms` |
| Ce qui a déjà été dit avec la personne qui demande, dans cette conversation | Une **Agent Session** |
| Une note que l'agent veut garder : « Northgate Bakery préfère être appelée avant 10 h » | Un **Vector Store**, avec l'**AI Agent Vector Store Tool** |

## Lequel choisir ?

### Knowledge Base ou Data Table

- Une **Data Table** contient des **lignes** : les mêmes champs pour chaque ligne. L'agent consulte une valeur, ou la modifie. « Quel est le montant de la facture INV-2041 ? »
- Une **Knowledge Base** contient des **textes**. L'agent trouve le passage dont le sens correspond. « Que disent nos conditions sur un retard de paiement ? »

Si cela tient en colonnes, utilisez une table. Si c'est de la prose, utilisez une base. Une base peut aussi lire les lignes d'une base de données, mais elle les transforme en textes : l'agent les trouve par leur sens, et ne peut pas les modifier.

### Knowledge Base ou Vector Store

- Une **Knowledge Base**, c'est **ce que l'agent doit savoir**. Vous la préparez, elle lit une source, et elle reste à jour.
- Un **Vector Store**, c'est **ce que l'agent rassemble pendant qu'il travaille** : des notes, des réponses trouvées plus tôt. Quelque chose y dépose des textes, une étape ou l'agent lui-même, et quelque chose les retrouve plus tard.

Un Vector Store n'est jamais le moyen de donner ses connaissances à un agent. Donnez-lui une Knowledge Base.

### Agent Session ou Vector Store

- Une **Agent Session** garde **la conversation**, message par message, pour que l'agent se souvienne de ce qui vient d'être dit.
- Un **Vector Store** garde **des textes retrouvés par leur sens**, quel que soit le moment où ils y ont été déposés, quelle que soit la conversation.

### Instructions ou bibliothèque de Prompts

La bibliothèque de Prompts est un atelier. Vous écrivez un prompt, vous l'essayez, vous l'améliorez. Aucune étape et aucun agent ne la lit : quand le prompt est bon, vous le copiez là où il sert. Voyez [À quoi sert Prompt Studio](/fr/docs/prompts/what-prompt-studio-is/). À ne pas confondre avec l'étape **LLM Prompt**, qui est une étape de workflow dans laquelle un prompt est écrit.

## Ce que fait l'Assistant

L'Assistant du Studio suit les mêmes règles quand il construit une solution pour vous. Il met les lignes dans une Data Table, les textes dans une Knowledge Base, et la conversation dans une session. Il n'utilise jamais un Vector Store pour ce qu'un agent doit savoir.

L'Assistant ne peut pas créer de Knowledge Base. Quand vos textes ne sont encore dans aucune base, il vous dit quelle base créer et ce qu'elle doit lire, puis il branche la base une fois qu'elle existe. Voyez [À quoi sert une Knowledge Base](/fr/docs/knowledge-bases/what-a-knowledge-base-is/).

## Pour aller plus loin

- [Donner à un agent des connaissances et une mémoire](/fr/docs/agents/give-memory-and-knowledge/)
- [À quoi sert une Data Table](/fr/docs/data-tables/what-a-data-table-is/)
- [À quoi sert une Knowledge Base](/fr/docs/knowledge-bases/what-a-knowledge-base-is/)
- [Conserver des textes et les retrouver par leur sens](/fr/docs/workflows/keep-texts-and-find-them-by-meaning/)
- [Rédiger le rôle et les instructions d'un agent](/fr/docs/agents/write-the-instructions/)

## Étape suivante

[Les mots qu'utilise Agentivity](/fr/docs/introduction/words-we-use/).
