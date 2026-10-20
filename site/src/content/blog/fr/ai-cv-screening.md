---
title: "Tri de CV par l'IA : comment le recruteur garde la main"
description: "Comment fonctionne le tri de CV par l'IA, étape par étape : lire le CV, évaluer l'adéquation, expliquer pourquoi, et envoyer les cas douteux à un recruteur. Avec les risques à surveiller."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["HR", "CV screening", "use case", "how-to"]
lang: fr
faq:
  - q: "L'IA écarte-t-elle des candidats toute seule ?"
    a: "Cela dépend de la façon dont vous la configurez. Le workflow peut orienter un CV vers la liste restreinte, vers un refus ou vers une relecture par un recruteur. Nous recommandons qu'une personne confirme les refus et examine chaque cas sur lequel le workflow a un doute."
  - q: "Que puis-je lui donner : un fichier, un lien, du texte ?"
    a: "Les trois. Le CV et la fiche de poste peuvent chacun être un fichier, un lien vers une page web, ou du texte collé. Si un document ne peut pas être lu, le workflow s'arrête et demande à une personne."
  - q: "Puis-je changer les critères ?"
    a: "Oui. Le workflow est dessiné dans le Studio d'Agentivity, étape par étape, et les instructions de chaque étape sont écrites en mots simples. Vous les adaptez à vos postes et à votre façon d'évaluer les candidats."
  - q: "Où vont les données des candidats ?"
    a: "Avec l'édition Community, le workflow tourne sur votre propre serveur. Le texte du CV est envoyé au fournisseur de modèle d'IA que vous avez connecté, pour l'évaluation. Vérifiez les conditions de ce fournisseur, et dites aux candidats comment leurs données sont utilisées."
  - q: "Le tri de CV par l'IA est-il légal ?"
    a: "Il est encadré. Dans l'Union européenne, le règlement européen sur l'IA (AI Act) classe le recrutement parmi les usages de l'IA à haut risque, et le RGPD donne aux personnes des droits face aux décisions prises uniquement par des moyens automatisés. Gardez une personne dans la décision et demandez l'avis de votre conseiller juridique avant la mise en service."
---

Le tri de CV par l'IA consiste à utiliser l'IA pour lire chaque CV au regard d'une fiche de poste, évaluer à quel point il correspond, et expliquer pourquoi. Bien fait, il ne remplace pas le recruteur. Il lit tout, trie les cas clairs, et envoie les cas douteux à une personne qui décide.

Cet article montre comment cela fonctionne étape par étape, à partir d'un exemple réel que vous pouvez installer, et liste les risques à garder en vue.

## Ce que fait le tri de CV par l'IA, et ce qu'il ne fait pas

**Ce qu'il fait :**

- lire chaque CV en entier, y compris le quarantième en fin de journée ;
- comparer chaque CV à la même fiche de poste, de la même façon ;
- donner une note et les raisons qui l'expliquent ;
- orienter chaque candidature : liste restreinte, refus, ou relecture par un recruteur.

**Ce qu'il ne fait pas :**

- connaître la culture de votre entreprise au-delà de ce que vous avez mis par écrit ;
- comprendre ce qu'un CV passe sous silence ;
- porter la responsabilité de la décision d'embauche. Celle-ci reste à une personne.

## Comment ça marche, étape par étape ?

L'exemple ci-dessous est le workflow CV Screening fourni avec Agentivity. C'est un workflow de 34 étapes, dessiné dans le Studio.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/cv-screening.jpg" width="1418" height="770">
<source src="/media/cv-screening.mp4" type="video/mp4" />
</video>
<figcaption>Le workflow CV Screening dans le Studio d'Agentivity, d'abord de près, puis en entier. Enregistré depuis le produit.</figcaption>
</figure>

### 1. Les documents

Le recruteur fournit deux choses : le CV et la fiche de poste. Chacun peut être un fichier, un lien ou du texte collé : une fiche de poste publiée sur votre page carrières marche donc aussi bien qu'un document.

### 2. La lecture

Le workflow extrait le texte d'un fichier, ou lit la page web derrière un lien. S'il ne peut pas lire un document, il ne devine pas : il s'arrête et demande l'aide d'une personne.

### 3. L'évaluation

Des étapes d'IA comparent le CV à la fiche de poste. Elles produisent une note d'adéquation et font ressortir ce qu'un recruteur cherche : le niveau d'expérience et les signaux du parcours. Les raisons sont écrites noir sur blanc, pour que la note puisse être vérifiée.

### 4. L'orientation

Chaque candidature prend l'une des trois voies : la liste restreinte, le refus, ou une relecture par un recruteur quand le workflow a un doute.

La [page CV Screening](/fr/use-cases/cv-screening) montre les mêmes étapes avec les briques utilisées.

## Où le recruteur garde-t-il la main ?

À trois moments, et chacun mérite d'être pensé avec soin.

**Quand un document ne peut pas être lu.** Un CV scanné, un lien cassé : le workflow pose la question au lieu d'inventer.

**Quand le cas est douteux.** Un profil solide à qui il manque une exigence, une reconversion, un parcours atypique. Ce sont les cas où le jugement compte le plus, et ils vont à une personne.

**Sur les refus.** Notre conseil : faites-les confirmer par un recruteur. Lire une courte explication et dire si l'on est d'accord ou non prend quelques secondes, et aucun candidat n'est ainsi écarté par un logiciel seul.

Le temps du recruteur ne sert plus à lire chaque CV, mais à examiner ceux qui méritent son attention.

## Pourquoi un workflow et pas une IA en roue libre ?

Parce que les candidats doivent être traités de la même façon.

Un workflow suit le chemin que vous avez dessiné, à l'identique pour chaque candidature. Cela vous donne deux choses dont le recrutement a besoin : la régularité, car chaque CV passe par les mêmes étapes avec les mêmes critères, et une trace, car vous pouvez montrer par quelles étapes une candidature est passée et pourquoi elle a abouti là où elle a abouti.

Une équipe de spécialistes IA, qui choisit elle-même son chemin, convient au travail où chaque demande est différente. Le tri de CV, c'est l'inverse : sa valeur tient au fait de le faire de la même façon à chaque fois. Si vous ne savez pas trop ce qu'un travail demande, [ce guide des systèmes multi-agents](/fr/blog/what-is-a-multi-agent-system) compare les deux.

## Quatre risques à surveiller

### Biais en entrée, biais en sortie

Un modèle d'IA reflète les textes dont il a appris, et vos instructions reflètent vos habitudes. Si une fiche de poste favorise sans raison un type de profil, le tri le fera aussi.

Ce qui aide : écrivez des critères qui décrivent le travail, pas la personne. Laissez hors de l'évaluation tout ce qui n'a pas de rapport avec le poste. Relisez régulièrement un échantillon de refus et cherchez-y des tendances.

### Fausse précision

Une note de 82 a l'air exacte. Elle ne l'est pas. C'est le résumé d'un jugement, et deux notes proches ne veulent pas dire qu'un candidat est meilleur que l'autre.

Ce qui aide : lisez les raisons, pas seulement le chiffre. Utilisez la note pour trier, jamais pour départager deux candidats proches.

### Contexte manquant

Un CV ne dit pas pourquoi il y a un trou de deux ans, ni ce que quelqu'un a appris dans un poste à l'intitulé peu flatteur. Un logiciel lit ce qui est écrit.

Ce qui aide : envoyez les parcours atypiques en relecture plutôt qu'au refus. C'est là qu'une personne apporte le plus.

### Données personnelles et loi

Un CV, ce sont des données personnelles. Dans l'Union européenne, le règlement européen sur l'IA (AI Act) classe le recrutement parmi les usages de l'IA à haut risque, et le RGPD donne aux personnes des droits face aux décisions prises uniquement par des moyens automatisés.

Ce qui aide : dites aux candidats que l'IA participe au tri, gardez une personne dans la décision, fixez la durée de conservation des candidatures, et demandez l'avis de votre conseiller juridique ou de votre délégué à la protection des données avant de commencer.

## Combien de temps cela fait-il gagner ?

Cela dépend de votre volume : méfiez-vous de tout chiffre tout fait. Ce qui change, c'est l'endroit où va le temps.

Sans tri, le temps part dans la lecture : chaque CV, du début à la fin, pour trouver la poignée de candidats qui méritent un entretien. Avec le tri, la lecture est faite avant votre arrivée, et votre temps va aux cas douteux et aux candidats eux-mêmes.

Le Studio d'Agentivity affiche le temps gagné par chaque équipe et chaque workflow sur son écran d'accueil : vous pouvez donc vérifier sur vos propres chiffres plutôt que sur les nôtres.

## Comment l'essayer ?

Le workflow CV Screening fait partie des exemples prêts à l'emploi de l'édition Community, gratuite, qui tourne sur votre propre serveur.

1. [Installez l'édition Community](/fr/community). Il faut une machine qui fait tourner Docker.
2. Connectez le fournisseur de modèle d'IA de votre choix.
3. Ouvrez le workflow CV Screening dans le Studio et lisez ses étapes.
4. Lancez-le sur quelques CV pour un poste que vous connaissez bien, et comparez ses orientations avec votre propre jugement.
5. Ajustez les instructions jusqu'à ce que les cas douteux qu'il vous envoie soient ceux que vous voudriez voir.

Commencez par un poste pour lequel vous avez déjà recruté. Vous savez déjà à quoi ressemble un bon candidat : il est donc facile de voir si le tri est d'accord avec vous, et de le corriger quand il ne l'est pas.
