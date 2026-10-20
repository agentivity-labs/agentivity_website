---
title: "L'humain dans la boucle : là où une personne doit garder la main"
description: "L'humain dans la boucle, c'est une IA qui s'arrête et demande à une personne avant certaines étapes. Où placer ces arrêts, comment bien demander, et les erreurs à éviter."
pubDate: 2026-10-10
author: "Agentivity Team"
tags: ["human in the loop", "AI agents", "governance"]
lang: fr
faq:
  - q: "Que veut dire l'humain dans la boucle ?"
    a: "Un système d'IA s'arrête à des moments choisis et attend qu'une personne valide, choisisse ou corrige avant de continuer. L'IA prépare, et la personne garde la décision."
  - q: "L'humain dans la boucle ralentit-il tout ?"
    a: "Seulement si les arrêts sont mal placés. Les arrêts ont leur place là où une erreur coûterait cher ou ne pourrait pas être réparée. Les étapes de routine tournent seules, et le temps de la personne va aux quelques cas qui le méritent."
  - q: "Comment la question arrive-t-elle à la personne ?"
    a: "Là où la personne travaille déjà. Dans Agentivity, une demande de validation peut arriver dans l'application qu'elle utilise, par e-mail, sur Slack ou dans un formulaire, et le travail attend la réponse."
  - q: "Puis-je retirer une étape de validation plus tard ?"
    a: "Oui. Une démarche raisonnable : tout valider au début, puis seulement les cas douteux quand vous avez vu assez de bons résultats. Gardez la validation sur tout ce qui ne peut pas être annulé."
  - q: "Le contrôle humain est-il imposé par la loi ?"
    a: "Pour certains usages, oui. Dans l'Union européenne, l'AI Act impose un contrôle humain pour les usages à haut risque, et le RGPD donne aux personnes des droits face aux décisions prises uniquement par des moyens automatisés. Demandez à votre conseiller juridique ce qui s'applique à votre cas."
---

L'humain dans la boucle, c'est un système d'IA qui s'arrête à des moments choisis et attend une personne avant de continuer. L'IA prépare, la personne décide. Bien fait, c'est ce qui rend l'IA utilisable pour du vrai travail : la routine tourne seule, et l'attention d'une personne va exactement là où une erreur aurait des conséquences.

Ce guide explique où placer ces arrêts, comment poser une bonne question, et ce qui transforme une validation en formalité que personne ne lit.

## Pourquoi garder une personne dans la boucle ?

Pour trois raisons qui ne dépendent pas de la qualité de l'IA.

**L'IA peut se tromper avec assurance.** Elle n'hésite pas comme une personne qui a un doute. Un arrêt au bon endroit attrape l'erreur avant qu'elle ne sorte de la maison.

**Certaines décisions reviennent aux personnes.** Écarter un candidat, refuser un remboursement, valider un paiement. Quelqu'un doit pouvoir en répondre.

**La confiance se construit cas par cas.** On accepte un système qu'on peut corriger. Un système qui agit seul est débranché après sa première erreur grave.

## Les trois types d'arrêt

Tous les arrêts ne sont pas des validations.

| Type | L'IA demande | Exemple |
|---|---|---|
| Valider | « Voici ce que j'ai préparé. Je continue ? » | Envoyer une réponse à un client |
| Choisir | « Voici les options. Laquelle ? » | Choisir un hôtel parmi trois |
| Compléter | « Il me manque quelque chose. Pouvez-vous m'aider ? » | Un document qui n'a pas pu être lu |

Le troisième type est le plus souvent oublié, et l'un des plus utiles. Un système qui dit « je n'ai pas pu lire ce fichier » est bien plus sûr qu'un système qui devine ce que le fichier contenait.

## Où placer les arrêts ?

Placez un arrêt partout où la réponse à l'une de ces questions est oui.

**Est-ce irréversible ?** Envoyer un message, faire un paiement, publier une page, supprimer un enregistrement. Si l'action ne peut pas être annulée, une personne valide d'abord.

**Cela touche-t-il quelqu'un ?** Un candidat, un client, un collaborateur. Les décisions qui concernent des personnes méritent une personne.

**Cela engage-t-il de l'argent ou l'organisation ?** Un devis, une commande, une réponse contractuelle.

**L'IA a-t-elle un doute ?** Un cas qui ne correspond pas au schéma habituel doit aller à une personne plutôt que d'y être casé de force.

**Manque-t-il quelque chose ?** Des données illisibles, des informations contradictoires, une question que les consignes n'avaient pas prévue.

## Où ne faut-il pas d'arrêt ?

Partout ailleurs, et c'est tout aussi important.

Si une personne doit valider chaque étape, l'équipe ne fait gagner aucun temps, et les demandes de validation ne sont plus lues. Rassembler des informations, lire des documents, comparer, rédiger, mettre en forme : ces étapes doivent tourner sans interruption. Leur résultat sera de toute façon jugé à l'arrêt suivant.

Un test utile : si la personne dirait oui sans regarder, quatre-vingt-dix-neuf fois sur cent, l'arrêt est au mauvais endroit.

## À quoi cela ressemble-t-il en pratique ?

Trois exemples réels, du plus simple au plus strict.

**Choisir, dans une application.** Dans l'[exemple Trip Planner](/fr/use-cases/trip-planner), une équipe de spécialistes organise un voyage. Elle ne réserve jamais de sa propre initiative : l'application montre les vols, l'hôtel, les transferts et le dîner, et le voyageur choisit chacun d'eux.

<figure>
<video controls muted loop playsinline preload="none" poster="/media/trip-planner.jpg" width="1024" height="768">
<source src="/media/trip-planner.mp4" type="video/mp4" />
</video>
<figcaption>Trip Planner : l'équipe propose, le voyageur choisit. Enregistré depuis le produit, accéléré. Les réservations et le paiement sont simulés dans cette démonstration.</figcaption>
</figure>

**Confirmer avant que le travail commence.** Dans l'[exemple Shopping Lab](/fr/use-cases/shopping-lab), un membre transforme un souhait vague en demande précise et la fait confirmer par l'acheteur avant que huit autres se mettent au travail. Une confirmation de deux lignes évite une longue recherche dans la mauvaise direction.

**Revoir les cas douteux.** Dans l'[exemple de CV screening](/fr/use-cases/cv-screening), les cas clairs sont triés, et ceux dont le workflow n'est pas sûr vont à un recruteur. Le workflow demande aussi de l'aide quand il ne peut pas lire un document. Pour en savoir plus : [CV screening par l'IA : comment laisser la main au recruteur](/fr/blog/ai-cv-screening).

## Comment la question doit-elle arriver à la personne ?

Là où cette personne travaille déjà, sans l'obliger à ouvrir un outil de plus.

Dans Agentivity, une demande de validation peut arriver de quatre façons : dans l'application que la personne utilise, par e-mail, sur Slack ou dans un formulaire. Le travail attend la réponse, puis reprend là où il s'était arrêté.

Choisissez le canal selon qui doit répondre et à quelle vitesse. Pour un recruteur qui examine les candidatures deux fois par jour, l'e-mail convient bien. Pour un chef d'équipe qui doit débloquer quelque chose rapidement, Slack convient mieux.

## Qu'est-ce qu'une bonne demande de validation ?

Une personne doit pouvoir décider en quelques secondes, sans rien ouvrir d'autre. Une bonne demande donne :

1. **Ce qui est proposé**, en une phrase.
2. **Pourquoi**, avec les deux ou trois faits qui y ont mené.
3. **Ce qui se passe ensuite** si la réponse est oui.
4. **Les choix possibles** : valider, refuser ou corriger.

Comparez :

- *Faible :* « Merci de valider le candidat 42. »
- *Mieux :* « Proposition : refus. Raison : le poste demande cinq ans d'expérience en paie, le CV en montre un. Validez le refus, envoyez plutôt en entretien, ou revoyez le CV. »

La seconde demande se traite d'un coup d'œil, et on peut ne pas être d'accord avec elle, ce qui est tout l'intérêt.

## Quatre erreurs qui rendent la validation inutile

**La validation automatique.** Trop de demandes, toutes semblables, et on clique sur oui sans lire. Moins de demandes, et de meilleures, règlent le problème.

**Valider sans les raisons.** Une note ou un verdict sans explication ne peut pas être vérifié. On peut seulement lui faire confiance ou non.

**Aucun moyen de corriger.** Si les seuls choix sont oui et non, on dit oui pour éviter de refaire le travail soi-même. Proposez un moyen d'ajuster.

**Personne en particulier.** Une demande envoyée à « l'équipe » n'appartient à personne. Chaque arrêt a besoin d'une personne nommée, et de quelqu'un qui prend le relais en son absence.

## Comment desserrer la boucle avec le temps ?

Commencez strict, puis assouplissez là où les résultats le permettent.

1. **Tout valider** pendant les premières semaines. Vous apprenez où le système est fiable.
2. **Valider seulement les cas douteux**, une fois que les cas clairs se sont révélés justes assez souvent.
3. **Contrôler un échantillon** de ce qui tourne seul, régulièrement, pour vérifier que cela reste juste.

N'assouplissez jamais les arrêts sur ce qui ne peut pas être annulé ni sur les décisions qui concernent des personnes. Ils ne sont pas là parce que l'IA est faible. Ils sont là parce que quelqu'un doit répondre de la décision.

Gardez aussi une trace. Dans Agentivity, chaque étape d'une exécution est enregistrée : vous voyez ce qui a tourné, quand et pourquoi.

## Une liste de contrôle avant la mise en service

- Chaque action irréversible est précédée d'une validation.
- Chaque décision qui concerne une personne peut être revue par une personne.
- Le système demande quand des données manquent ou sont illisibles, au lieu de deviner.
- Chaque demande dit ce qui est proposé, pourquoi, et ce qui se passe ensuite.
- Chaque arrêt a un responsable nommé et un remplaçant.
- Les étapes de routine tournent sans interruption.

## En bref

L'humain dans la boucle n'est pas un frein pour l'IA. C'est ce qui vous permet de confier la routine en toute confiance : des arrêts là où une erreur coûterait, aucun là où elle ne coûterait rien, et des questions auxquelles une personne répond en quelques secondes. Pour voir où placer les arrêts quand vous construisez une équipe, lisez [comment construire votre première équipe d'agents d'IA](/fr/blog/build-ai-agent-team-without-code), ou [regardez-en une se construire](/fr/how-it-works).
