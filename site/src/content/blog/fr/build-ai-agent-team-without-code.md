---
title: "Comment construire votre première équipe d'agents d'IA sans code"
description: "Un guide pas à pas pour construire une équipe d'agents d'IA sans code : choisir un travail, décrire chaque rôle en mots simples, choisir comment ils travaillent ensemble, tester et ajuster."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["no-code", "AI agents", "how-to"]
lang: fr
faq:
  - q: "Dois-je savoir coder ?"
    a: "Non. Vous construisez l'équipe dans le Studio d'Agentivity avec des noms, des descriptions en mots simples et du glisser-déposer. Installer l'édition Community sur un serveur demande en revanche quelqu'un à l'aise avec Docker."
  - q: "Combien de temps prend une première équipe ?"
    a: "Une première version qui fonctionne, pour une petite équipe, prend un après-midi. L'essentiel de ce temps sert à décrire les rôles et à tester sur des cas réels, pas à manier l'outil."
  - q: "Combien d'agents doit compter une première équipe ?"
    a: "Deux ou trois. Par exemple un qui rassemble l'information, un qui rédige, un qui vérifie. N'ajoutez un membre que lorsqu'une tâche mérite clairement son propre spécialiste."
  - q: "Quel modèle d'IA choisir ?"
    a: "Commencez avec un seul modèle généraliste performant, chez le fournisseur que vous utilisez déjà, pour tous les membres. Une fois que l'équipe fonctionne, passez les étapes de routine sur un modèle plus léger et moins cher."
  - q: "Puis-je réutiliser un agent dans une autre équipe ?"
    a: "Oui. Un agent que vous avez créé est disponible quand vous construisez d'autres équipes : un bon chercheur ou un bon relecteur peut servir dans plusieurs d'entre elles."
---

Vous pouvez construire une équipe d'agents d'IA sans écrire de code, en six étapes : choisir un travail, lister les rôles, décrire chaque rôle en mots simples, choisir comment les membres travaillent ensemble, tester sur des cas réels, et décider où une personne approuve. L'outil, c'est la partie facile. La qualité de l'équipe vient de la clarté avec laquelle vous décrivez le travail.

Ce guide suit ces six étapes dans le Studio d'Agentivity, avec un seul exemple du début à la fin.

## Ce dont vous avez besoin avant de commencer

- **Agentivity.** L'édition Community est gratuite et tourne sur votre propre machine ou serveur. [L'installer](/fr/community) tient en une commande, sur une machine qui fait tourner Docker. Si ce n'est pas pour vous, les offres hébergées commencent par un essai gratuit de 14 jours : [commencer gratuitement](/fr/start).
- **Un compte chez un fournisseur d'IA.** Agentivity se connecte à OpenAI, Anthropic, Gemini, DeepSeek, xAI et AWS Bedrock. Vous ajoutez votre clé une seule fois, dans le Studio.
- **Un travail que vous connaissez bien.** C'est plus important que les deux points ci-dessus.

Une précaution avec l'édition Community : elle n'a pas encore d'écran de connexion, donc toute personne qui peut joindre le serveur peut l'utiliser. Gardez-la sur un réseau de confiance, et ne l'exposez jamais directement sur Internet.

## Étape 1 : choisir un travail

Choisissez un travail :

- qui revient chaque semaine ;
- qui prend du vrai temps ;
- que vous pourriez expliquer à un nouveau collègue en dix minutes ;
- qui produit quelque chose que vous pouvez juger d'un coup d'œil.

Ne commencez pas par votre processus le plus important. Commencez par un processus utile et peu risqué.

**Notre exemple :** chaque semaine, quelqu'un prépare une note d'une page sur ce que trois concurrents ont publié. Cela prend environ trois heures de lecture et de rédaction.

## Étape 2 : lister les rôles

Demandez-vous qui vous embaucheriez si vous pouviez recruter pour ce travail. Deux ou trois rôles suffisent.

Pour la note sur les concurrents :

1. **Un chercheur** qui lit le site de chaque concurrent et rassemble ce qui est nouveau.
2. **Un rédacteur** qui transforme ces trouvailles en une note d'une page.
3. **Un relecteur** qui vérifie la note par rapport aux trouvailles et signale tout ce qui n'est pas étayé.

Chaque rôle fait une seule chose. C'est tout l'intérêt : un membre avec une seule responsabilité claire fait moins d'erreurs qu'un membre à qui l'on demande de tout faire.

## Étape 3 : créer chaque agent

Dans le Studio, un agent est un spécialiste IA. Vous lui donnez un nom, puis vous décrivez son rôle.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/studio-agent.jpg" width="1418" height="770">
<source src="/media/studio-agent.mp4" type="video/mp4" />
</video>
<figcaption>Créer un agent dans le Studio : un nom, puis son rôle en mots simples. Enregistré depuis le produit, accéléré.</figcaption>
</figure>

C'est dans le rôle que se fait le travail. Rédigez-le comme si vous briefiez un nouveau collègue, et couvrez quatre points :

- **Ce dont il est responsable.**
- **Ce qu'il reçoit**, et de qui.
- **Ce qu'il doit rendre**, et sous quelle forme.
- **Ce qu'il ne doit pas faire.**

Voici un rôle pour le chercheur :

> Vous recherchez ce qu'un concurrent a publié récemment. Vous recevez le nom d'une entreprise et l'adresse de son site web. Lisez ses actualités, son blog et ses pages produits. Ne signalez que ce qui est nouveau depuis la semaine dernière : changements de produits, prix, annonces. Pour chaque élément, donnez une phrase et l'adresse de la page où vous l'avez trouvé. Si vous ne trouvez rien de nouveau, dites-le. Ne devinez jamais, et ne signalez jamais quelque chose que vous n'avez pas pu trouver sur le site.

Remarquez ce qui le rend efficace : il dit quoi lire, ce qui compte comme une trouvaille, la forme de la réponse, et que faire quand il n'y a rien. La dernière phrase évite l'échec le plus courant : un agent qui comble un vide avec quelque chose de plausible.

Donnez ensuite à l'agent les outils dont il a besoin, ici la lecture de pages web, et choisissez son modèle d'IA.

## Étape 4 : les réunir en équipe

Créez une équipe, donnez-lui un nom, et choisissez comment ses membres travaillent ensemble. Le Studio propose cinq façons : l'un après l'autre, tous en même temps, en passant le cas au bon collègue, en discutant à tour de rôle, ou sous la direction d'un manager.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/studio-team.jpg" width="1418" height="770">
<source src="/media/studio-team.mp4" type="video/mp4" />
</video>
<figcaption>Créer une équipe : lui donner un nom, choisir la façon de travailler, y glisser les membres. Enregistré depuis le produit, accéléré.</figcaption>
</figure>

Pour une première équipe, choisissez **sequential** : le chercheur, puis le rédacteur, puis le relecteur. C'est la façon la plus facile à suivre, et quand le résultat est faux, vous voyez à quelle étape ça s'est mal passé.

Glissez ensuite vos trois agents dans l'équipe, dans cet ordre.

Si vous voulez comprendre les quatre autres, lisez [les cinq façons dont les agents d'IA travaillent ensemble](/fr/blog/how-ai-agents-work-together). Vous pourrez en changer plus tard sans reconstruire les membres.

## Étape 5 : tester sur des cas réels

Lancez l'équipe sur un cas réel, et lisez ce que chaque membre a produit, pas seulement la note finale.

Trois points à vérifier :

- **Chaque membre a-t-il fait son propre travail ?** Si le rédacteur se met à faire des recherches, son rôle n'est pas assez clair.
- **Y a-t-il des affirmations non étayées ?** Comparez quelques phrases de la note avec les pages citées par le chercheur.
- **La forme est-elle la bonne ?** Longueur, ton, ordre. Sinon, dites-le dans le rôle, avec un exemple.

Quand quelque chose ne va pas, résistez à l'envie d'ajouter un membre. Neuf fois sur dix, la solution est une phrase plus claire dans un rôle existant. Changez une seule chose, relancez sur le même cas, comparez.

Lancez au moins cinq cas différents avant de lui faire confiance. Une équipe qui marche sur un seul exemple n'a pas été testée.

## Étape 6 : décider où une personne approuve

Avant que l'équipe ne fasse du vrai travail, décidez où elle doit s'arrêter et demander.

Pour la note sur les concurrents, une règle raisonnable : la note n'est envoyée à l'équipe qu'après avoir été lue par une personne. Plus tard, une fois que vous lui faites confiance, vous pourrez ne relire que les notes où le relecteur a signalé quelque chose.

La règle générale : une personne approuve tout ce qui sort, coûte de l'argent ou touche quelqu'un. [Où une personne doit garder la main](/fr/blog/human-in-the-loop-ai) détaille ce point.

## Cinq erreurs à éviter

1. **Commencer trop grand.** Dix membres dès le premier jour, et personne ne sait lequel se trompe.
2. **Des rôles flous.** « Vous êtes un expert en marketing » ne dit rien à un agent. Dites ce qu'il reçoit et ce qu'il rend.
3. **Tester sur un seul cas.** Un succès ne prouve pas grand-chose.
4. **Le meilleur modèle partout.** Il fait grimper la facture sans améliorer les étapes de routine. Voir [ce que coûte vraiment une équipe IA](/fr/blog/ai-team-cost).
5. **Pas d'étape d'approbation.** La première fois que l'équipe se trompera avec aplomb, vous regretterez qu'il n'y en ait pas eu.

## Et ensuite ?

Une fois que votre première équipe fait son travail, trois directions s'offrent à vous.

- **La rendre plus stricte.** Si une partie du travail doit être identique à chaque fois, dessinez cette partie sous forme de workflow. Un workflow peut appeler votre équipe comme l'une de ses étapes. [Chatbot, agent, équipe ou workflow](/fr/blog/chatbot-agent-team-or-workflow) explique quand utiliser lequel.
- **La partager.** Publiez l'équipe pour que vos collègues puissent l'utiliser depuis le portail prêt à l'emploi, sans rien installer de leur côté.
- **La placer derrière une app.** Quand l'expérience compte, une équipe peut fonctionner derrière une application qui s'adapte à chaque personne : une [VibeApp](/fr/blog/what-is-a-vibeapp).

## En bref

Choisissez un travail que vous connaissez, listez deux ou trois rôles, décrivez chacun comme vous le feriez pour un nouveau collègue, commencez avec des membres qui travaillent l'un après l'autre, testez sur cinq cas réels, et décidez où une personne approuve. Pour voir ces étapes avant de les essayer, regardez [comment ça marche](/fr/how-it-works).
