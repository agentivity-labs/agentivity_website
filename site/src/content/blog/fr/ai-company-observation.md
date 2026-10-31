---
title: "L'Observation dans le Studio : ce que fait vraiment votre entreprise agentique, et où vont ses tokens"
description: "L'onglet Observation montre toute une organisation sur un seul écran. Descendez département par département jusqu'au membre qui consomme. Le fonctionnement, pas à pas."
pubDate: 2026-10-31
author: "Agentivity Team"
tags: ["features", "teams"]
thumb: "/media/blog/thumbs/ai-company-observation.jpg"
lang: fr
draft: false
faq:
  - q: "Quelle différence entre Execution et Observation ?"
    a: "Execution montre une exécution en détail. Observation montre une période dans son ensemble : 7, 14 ou 30 jours, sur le même graphe."
  - q: "La latence compte-t-elle le temps qu'une personne met à répondre ?"
    a: "Non. La latence est le temps habituel d'un appel à un modèle. Le temps d'une personne ne compte jamais."
  - q: "Pourquoi ne vois-je que le premier niveau dans Tokens ?"
    a: "Parce qu'une équipe qui contient des équipes s'ouvre sur son premier niveau dans Tokens, Errors et Latency, avec un chiffre pour chaque branche : son total, ou son temps habituel dans Latency. Vous ouvrez une branche à la main avec le bouton +."
  - q: "Puis-je voir cela dans une VibeApp ou par un SDK ?"
    a: "Non. L'Observation se trouve uniquement dans le Studio, dans les éditeurs d'équipes et de workflows."
  - q: "Quelles éditions ont l'Observation ?"
    a: "Les offres Pro, Business et Enterprise. Elle n'est ni dans l'offre Personal ni dans l'édition Community."
---

Une entreprise agentique se dessine facilement et se suit difficilement. Dès qu'une équipe contient d'autres équipes, qui contiennent elles-mêmes des spécialistes et des workflows, une question simple devient compliquée : qui fait vraiment le travail, et où vont les tokens ?

L'onglet Observation du Studio y répond sur un seul écran. Vous partez de toute l'organisation, puis vous descendez département par département jusqu'au membre qui consomme.

Cet article montre ce chemin, puis les gestes, pas à pas. L'Observation est disponible dans les offres Pro, Business et Enterprise.

## Toute l'organisation sur un seul écran

Voici Northmoor Coffee Roasters, notre exemple d'entreprise agentique : un directeur général, six départements, 34 agents et 5 workflows.

<figure>
<img src="/media/blog/observation/01-northmoor-groups-all-open-1400.png" alt="L'onglet Observation sur Northmoor Coffee Roasters : le Chief Executive au centre et, autour de lui, six départements dans des zones de couleur, chacun avec son responsable, ses agents et ses workflows." width="1400" height="900" loading="lazy" decoding="async" />
<figcaption>Northmoor Coffee Roasters dans la lecture Groups. Un exemple de structure : tous les niveaux sont ouverts, autour du premier manager.</figcaption>
</figure>

Une équipe qui contient des équipes s'ouvre en anneaux autour de son premier manager. Le Chief Executive se tient au centre. Les responsables de département forment le premier anneau, et ce que chaque département contient se prolonge vers l'extérieur, dans sa propre direction : agents, sous-équipes, workflows et leurs étapes.

Les couleurs sont des groupes, rien d'autre. Le rouge d'Operations n'est pas une alerte : il indique seulement où commence et où finit ce département.

Cette image se lit comme un organigramme, à une différence près : elle montre l'organisation telle qu'elle est publiée, jusqu'aux étapes de chaque workflow.

## Descendre, département par département

De là, vous vous approchez. Dans la lecture Groups, c'est le zoom qui commande les niveaux : de loin vous voyez les départements, plus près leurs équipes, puis leurs membres.

<figure>
<img src="/media/blog/observation/04-northmoor-groups-customer-care-department.png" alt="Vue rapprochée du département Customer Care : son responsable, le Coffee Advisor, le Subscription Specialist, l'Order Support Agent et le workflow Complaint Handling avec ses étapes. La Sourcing Team se trouve à côté." width="1800" height="1125" loading="lazy" decoding="async" />
<figcaption>De plus près : Customer Care, avec son responsable, ses agents et son workflow Complaint Handling et ses étapes.</figcaption>
</figure>

Rien ne bouge pendant le zoom. Un niveau apparaît en fondu là où il a toujours été : vous ne perdez pas votre place.

La question des tokens suit le même chemin. Dans Tokens, l'organisation s'ouvre sur son premier niveau, et chaque branche affiche le total de tout ce qu'elle contient. Vous voyez aussitôt quel département se détache. Vous l'ouvrez, vous voyez laquelle de ses équipes se détache, vous l'ouvrez à son tour, et ainsi de suite jusqu'à un seul membre.

## Où vont les tokens

Au bout de ce chemin, vous regardez une seule équipe, et chaque membre porte son chiffre. Voici Shopping Lab, une équipe de neuf spécialistes qui compare des produits entre boutiques en ligne.

<figure>
<img src="/media/blog/observation/11-shopping-tokens.png" alt="Shopping Lab dans la lecture Tokens : neuf membres sur un graphe, sous les noms de leurs groupes. Certains membres affichent un chiffre sous leur nom, et le plus élevé est dans le bleu le plus soutenu." width="1400" height="900" loading="lazy" decoding="async" />
<figcaption>Un exemple, issu d'une exécution de test arrêtée en cours de route. Les derniers membres n'affichent pas de chiffre parce qu'ils n'ont pas été atteints.</figcaption>
</figure>

Le chiffre se trouve sous le nom, et la couleur le suit : plus un membre consomme par rapport aux autres, plus son bleu est soutenu. Vous repérez celui qui se détache avant d'avoir lu un seul nombre.

La lecture Tokens compte uniquement des tokens. C'est ce que vous lisez ici, à chaque niveau.

Un chiffre qui se détache est une question, pas un verdict. Cliquez sur le membre et lisez à quoi il sert. Un membre qui lit de longues pages consomme plus qu'un membre qui écrit un plan court. La lecture vous montre où regarder, et vous jugez si cela convient au travail demandé.

## Un même graphe, quatre lectures

Le graphe ne bouge pas. Vous changez ce que vous y lisez avec quatre boutons, dont les libellés sont en anglais dans le Studio.

- **Groups :** qui appartient à quoi. C'est la structure, sans chiffres.
- **Errors :** quels membres et quelles étapes ont des appels en échec.
- **Tokens :** quels membres et quelles étapes consomment.
- **Latency :** le temps que prend habituellement un appel à un modèle, membre par membre.

Errors, Tokens et Latency se lisent sur 7, 14 ou 30 jours. Une période plus longue que l'historique de votre offre montre ce qui est conservé.

La latence mesure le temps habituel d'un appel à un modèle. Le temps d'une personne ne compte jamais : une équipe qui attend deux jours la validation de quelqu'un ne paraît pas lente pour autant.

<figure>
<img src="/media/blog/observation/13-shopping-latency.png" alt="Shopping Lab dans la lecture Latency : le même graphe, au même endroit, avec un temps en secondes sous chaque membre qui a fait des appels." width="1400" height="900" loading="lazy" decoding="async" />
<figcaption>Le même graphe, lu pour la latence. Les chiffres sont un exemple.</figcaption>
</figure>

## Observation ou Execution ?

Observation est le troisième onglet des éditeurs d'équipes et de workflows, à côté d'Editor et d'Execution. Execution et Observation se confondent facilement, et ils ne répondent pas à la même question.

| | Execution | Observation |
|---|---|---|
| Ce qu'il montre | Une exécution en détail | Une période dans son ensemble |
| La question | Que s'est-il passé cette fois-ci ? | Que se passe-t-il d'habitude ? |
| Quand l'utiliser | Vous suivez un cas | Vous voulez comprendre l'ensemble |

## Comment l'utiliser, pas à pas

**1. Ouvrez l'onglet.** Dans le Studio, ouvrez une équipe ou un workflow et choisissez **Observation**, à côté d'Editor et d'Execution.

**2. Regardez la structure.** Vous arrivez sur **Groups**. Une équipe qui contient des équipes s'affiche tout ouverte, comme sur la première image. Faites défiler pour zoomer : en reculant, les niveaux se ferment l'un après l'autre, en avançant ils reviennent. Cliquez sur une équipe fermée et la vue s'y rend. L'icône **Back to the whole company**, en haut à droite du graphe, ramène à la vue complète.

**3. Choisissez une lecture.** Cliquez sur **Tokens**, **Errors** ou **Latency**. L'organisation s'ouvre alors sur son premier niveau, avec un chiffre pour chaque branche : son total, ou son temps habituel dans Latency. Une équipe simple ou un workflow n'a pas de niveaux : tout s'affiche d'un coup, comme pour Shopping Lab.

**4. Choisissez une période.** En haut à droite, prenez **7 days**, **14 days** ou **30 days**. Un résumé de la lecture reste affiché dans le coin en bas à gauche.

**5. Ouvrez à la main.** Repérez le petit bouton rond **+** sur une équipe, en général celle qui se détache. Cliquez : l'équipe s'ouvre là où elle se trouve et la vue lui fait de la place. Le même bouton, devenu **−**, la referme. Recommencez au niveau suivant jusqu'à atteindre un membre. Les icônes **Open all** et **Close all**, en haut à droite, agissent sur tous les niveaux à la fois.

**6. Changez de lecture, gardez votre place.** Errors, Tokens et Latency partagent ce que vous avez ouvert. Une fois trouvé le membre qui consomme, cliquez sur Latency : vous restez au même endroit et vous lisez le même membre sous une autre mesure.

**7. Cliquez pour lire la fiche.** Cliquez sur un membre ou une étape : une fiche s'ouvre par-dessus le graphe.

<figure>
<img src="/media/blog/observation/12-shopping-tokens-floating-card.png" alt="Shopping Lab avec la fiche du membre Quill Scout ouverte en haut à droite : son rôle, puis son groupe, ses appels à un modèle, ses erreurs, ses tokens, son temps habituel et son temps le plus long." width="1400" height="900" loading="lazy" decoding="async" />
<figcaption>La fiche d'un membre. Les chiffres sont un exemple.</figcaption>
</figure>

Elle donne le groupe, les appels à un modèle, les erreurs, les tokens, le temps habituel et le temps le plus long. Sur une équipe fermée, la fiche vaut pour toute sa branche. La croix la referme.

## Ce que l'Observation n'est pas

- **Elle n'est pas dans les applications que vous publiez.** L'Observation se trouve uniquement dans le Studio, ni dans les VibeApps ni dans les SDK. Elle s'adresse aux personnes qui construisent et suivent les équipes.
- **Elle n'est pas dans toutes les éditions.** Elle est dans Pro, Business et Enterprise, pas dans Personal ni Community.
- **Elle ne change rien.** Ici, vous lisez. Une équipe se modifie dans l'Editor.

## En bref

Partez de toute l'organisation, lisez Tokens au premier niveau, ouvrez la branche qui se détache, et recommencez jusqu'au membre. Cliquez alors dessus et lisez la fiche.

Vous pouvez voir comment une équipe se construit sur [Comment ça marche](/fr/how-it-works).

**[Commencer un essai gratuit](/fr/start/?utm_source=blog&utm_medium=article&utm_campaign=observation)** : 14 jours, sans carte.
