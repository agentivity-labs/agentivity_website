---
title: "Construire le cockpit d'un département"
description: "Un cockpit est la page de départ d'un département dans Agentivity Desk. Construisez-le dans le Studio avec des blocs, donnez-lui un style, puis publiez-le."
sidebar:
  order: 2
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/fr/desk/build-a-cockpit.md. Do not edit here: edit the source and publish again. -->

Un **cockpit** est la page de départ d'un département dans [Agentivity Desk](/fr/docs/desk/agentivity-desk/) : Finance, Ventes, Support. Il dit à quoi sert le département, permet de demander à ses Solutions, montre ce qui attend chacun, et peut afficher des chiffres de vos Data Tables. Vous le construisez dans le Studio, dans un designer, et le publiez quand il est prêt.

## Ce qu'il vous faut

- Un espace de travail avec le Desk. Le Desk est inclus dans les plans Pro et Business : ni dans Personal, ni dans l'édition Community.
- Les Solutions du département, publiées dans le Desk. Voyez [Agentivity Desk](/fr/docs/desk/agentivity-desk/).
- L'un des deux :
  - un rôle avec le droit « Make the cockpits of the Desk, change and publish any of them, choose their owners, order and delete them » ;
  - ou être **responsable** (owner) du cockpit.

## Qui fait quoi

| Qui | Ce qu'il peut faire |
|---|---|
| Une personne qui a le droit de faire les cockpits | Crée les cockpits, les ordonne, les supprime, et choisit leurs responsables. Modifie et publie n'importe quel cockpit. |
| Un **responsable** d'un cockpit | Modifie et publie ce cockpit. |

Les cockpits se construisent uniquement dans le Studio. **Administration** › **Desk** garde la marque du Desk, ce qui y est publié et les suggestions. Sa partie **Cockpits** n'a plus qu'un bouton, **Open Cockpits**, qui vous amène ici.

## Créer un cockpit

1. Dans le Studio, dans la barre latérale, sous **Desk**, sélectionnez **Cockpits**.
2. Sélectionnez **New cockpit**.
3. Donnez-lui un **Name**, par exemple `Finance`, et une **Colour**.
4. Sélectionnez **Open the designer**.

Un nouveau cockpit part de l'accueil du Desk. Modifiez-le, puis publiez-le. D'ici là, il indique **Not published** : personne ne le voit dans le Desk.

Dans la liste, **Move up** et **Move down** fixent l'ordre des cockpits dans la barre latérale du Desk.

## Le designer

Le designer a trois parties :

- **À gauche, Blocks.** Glissez un bloc sur la page, ou cliquez dessus pour l'ajouter à la fin.
- **Au centre, la page**, telle que le Desk la dessine. Passez de **Computer** à **Phone** pour voir les deux.
- **À droite, les réglages**, en onglets :
  - sans bloc sélectionné, la page : **Page** (son nom, sa couleur, ses Solutions), **Look** (son style) et **Access** (ses responsables et sa publication) ;
  - avec un bloc sélectionné, ce bloc : **Content** et **Look**.

Sur un bloc, les boutons règlent sa largeur, le dupliquent (**Duplicate**) ou le retirent (**Remove from the page**). Faites glisser un bloc pour le déplacer.

## Les blocs

| Bloc | Ce qu'il montre |
|---|---|
| **Top of the page** | Le nom du département et ce à quoi il sert, dans sa couleur. |
| **Ask** | Le champ pour demander à une de ses Solutions, en écrivant, en dictant ou en ajoutant une image. |
| **Suggestions** | Des demandes à lancer d'un clic. |
| **Waiting for you** | Ce qui attend la réponse de la personne dans ce cockpit. Rien ne s'affiche quand rien n'attend. |
| **Time saved** | Ce que ses Solutions ont fait gagner au département ce mois-ci, et la part de la personne. |
| **Solutions** | **All of its Solutions**, ou **Some**, celles que vous choisissez. |
| **Conversations** | Les conversations de la personne avec ses Solutions. |
| **Announcement** | Un message, avec un ton (**News**, **Good news**, **Warning**) et une date à laquelle il cesse de s'afficher. **Always** le garde. |
| **Text** | Des paragraphes. Une ligne qui commence par `- ` est une liste. |
| **Links** | Des liens vers d'autres endroits. Une adresse commence par `https://` ou `mailto:`. |
| **Launch button** | Un bouton qui lance une Solution, avec la demande déjà écrite. |
| **Indicator** | Un chiffre d'une Data Table : le nombre de lignes, ou le total, la moyenne, le minimum ou le maximum d'une colonne. **Only the rows where** filtre les lignes. |
| **Table** | Les dernières lignes d'une Data Table, **Latest first** ou **Oldest first**. |
| **Card** | Une image, un titre, un texte et un lien vers un autre endroit : l'intranet, un outil, un site. |
| **Section** | Un titre, un sous-titre et un trait, pour ouvrir une partie de la page. |

## La largeur d'un bloc

Un bloc prend **A third**, **Half**, **Two thirds** ou **Full width** de la page. Sur un téléphone, tous les blocs passent en une colonne.

## Le style

Dans l'onglet **Look** de la page :

- **Un style en un clic** : **Desk**, **Soft**, **Bright**, **Bold** ou **Night**. Partez de l'un d'eux, puis changez ce que vous voulez.
- **Le fond** : une couleur, un dégradé, ou une image sous un voile. Choisissez si le texte posé dessus est foncé ou clair.
- **Les cartes** : leurs coins, leur bord (avec ou sans, son épaisseur, sa couleur), leur remplissage et leur ombre.

Un bloc peut avoir son propre style, dans son onglet **Look**. Choisissez une couleur dans les palettes, ou n'importe quelle couleur avec le sélecteur.

**Les images.** Choisissez une image sur votre ordinateur, 1 Mo au plus et 12 par cockpit, en PNG, JPEG, WebP ou GIF. Ou donnez son adresse, qui commence par `https://`.

## Les Data Tables dans un cockpit

Un bloc **Indicator** ou **Table** montre ses données à tous ceux qui voient le cockpit, même aux personnes sans droit de lire les Data Tables. Choisissez avec soin ce que vous montrez.

Pour ajouter une Data Table à un cockpit, il vous faut le droit de lire les Data Tables.

## Brouillon et publication

Vos changements sont un brouillon. Le designer l'enregistre tout seul et indique **Draft saved**.

| Bouton | Ce qu'il fait |
|---|---|
| **Preview in the Desk** | Montre le brouillon dans le Desk, comme les gens le verront. Personne d'autre ne le voit. |
| **Publish** | Met le brouillon dans le Desk. Une fois le cockpit publié, le bouton devient **Publish changes** quand vous changez quelque chose. |
| **Discard changes** | Revient à ce qui est publié. |

Pour retirer un cockpit du Desk sans le supprimer, sélectionnez **Take it off the Desk**. **Delete the cockpit** supprime sa page et ses blocs. Ses Solutions et leurs conversations restent. C'est définitif.

## Les responsables

1. Ouvrez le cockpit dans le designer, sans bloc sélectionné.
2. Ouvrez l'onglet **Access**.
3. Sous **Owners**, sélectionnez **Add an owner** et tapez son e-mail.

Un responsable modifie et publie ce cockpit. Seule une personne qui a le droit de faire les cockpits choisit les responsables.

## Qui voit un cockpit

- Une personne voit un cockpit quand elle voit au moins une de ses Solutions publiées dans le Desk.
- Un cockpit sans Solution est vu de tous dans le Desk.

## Comment savoir que ça marche

L'onglet **Access** indique que le cockpit est publié, avec sa date. Dans le Desk, le cockpit apparaît dans la barre latérale sous **Cockpits**, et sa page ressemble à celle du designer.

## Si ça ne marche pas

- **Quelqu'un ne voit pas le cockpit.** Il ne voit aucune de ses Solutions. Vérifiez que les Solutions sont publiées dans le Desk et que ses droits lui en font voir une.
- **Vous ne pouvez pas ajouter de Data Table.** Votre rôle ne vous permet pas de lire les Data Tables.
- **Une image est refusée.** Elle dépasse 1 Mo, ou le cockpit contient déjà 12 images. Réduisez-la, ou donnez son adresse.
- **Vos changements n'apparaissent pas dans le Desk.** Ils sont encore un brouillon. Sélectionnez **Publish changes**.

## Étape suivante

[Agentivity Desk](/fr/docs/desk/agentivity-desk/) : ce que voient les personnes du département.
