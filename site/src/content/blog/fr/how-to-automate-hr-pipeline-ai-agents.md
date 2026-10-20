---
title: "Automatiser votre recrutement avec des agents d'IA (sans lire un seul CV)"
description: "De la fiche de poste à la liste des candidats retenus : comment construire une équipe d'agents d'IA qui gère tout le recrutement pendant la nuit, et à quoi faire attention."
pubDate: 2026-06-06
author: "Agentivity Team"
tags: ["HR", "automation", "use case", "how-to"]
lang: fr
---

Le recrutement est l'un des processus les plus chronophages de toute organisation. Un seul poste peut représenter :

- Rédiger la fiche de poste (2 heures)
- La publier sur 3 à 5 plateformes (1 heure)
- Lire de 40 à 200 CV (4 à 20 heures)
- Noter les candidats et établir une liste restreinte (2 à 4 heures)
- Préparer les questions d'entretien (1 heure)

Cela fait 10 à 28 heures de travail avant la moindre conversation avec un candidat. Et l'essentiel relève du processus, pas du jugement.

Les équipes d'agents d'IA peuvent prendre en charge le processus. Le jugement, c'est votre travail.

## L'équipe d'agents RH

Voici une équipe de 7 agents qui couvre tout le parcours, de la demande de poste à la liste des candidats retenus :

```
JD Writer
  → Publisher
    → CV Parser (concurrent for each application)
    → Skills Matcher (concurrent)
    → Culture Fit Assessor (concurrent)
      → Question Generator
        → Report Formatter
```

Passons chaque agent en revue.

### Agent 1 : JD Writer

**Rôle :** rédiger la fiche de poste à partir d'une demande.

**Entrée :** une courte demande : intitulé du poste, équipe, responsabilités principales, compétences indispensables, compétences appréciées, fourchette de salaire.

**Sortie :** une fiche de poste structurée, dans le ton de votre entreprise, prête à publier.

**Modèle de prompt :**
> Vous êtes un professionnel RH expérimenté qui rédige des fiches de poste convaincantes et attentives aux biais. À partir d'une demande, produisez une fiche de poste claire, structurée, qui attire les candidats qualifiés sans employer de formulations excluantes. Rédigez en Markdown.

**Pourquoi c'est important :** la plupart des fiches de poste sont écrites par des responsables du recrutement qui ne sont pas rédacteurs. Résultat : des exigences vagues, des compétences « indispensables » gonflées et des formulations qui découragent des candidats qualifiés. Un agent bien entraîné rédige des fiches plus précises et plus justes, plus vite.

---

### Agent 2 : Publisher

**Rôle :** diffuser la fiche de poste sur les bonnes plateformes.

**Outils :** API LinkedIn, API Indeed, webhook de la page carrières interne, Slack (pour prévenir l'équipe).

**Sortie :** la confirmation des endroits où le poste a été publié, avec les URL.

Cet agent utilise surtout des outils, sans raisonnement complexe. Son intérêt : supprimer le copier-coller manuel d'une plateforme à l'autre.

---

### Agents 3 à 5 : CV Parser, Skills Matcher, Culture Fit (en parallèle)

Ces trois agents travaillent en même temps pour chaque candidature reçue.

**CV Parser :**
- Extrait des données structurées du CV (nom, expérience, compétences, formation, interruptions de carrière)
- Uniformise le format pour que les agents suivants travaillent sur des données propres

**Skills Matcher :**
- Compare les compétences extraites aux exigences de la fiche de poste
- Note la correspondance sur les compétences indispensables (0/1) et sur les compétences appréciées (pondérées)
- Signale les compétences essentielles manquantes

**Culture Fit Assessor :**
- Analyse le parcours, la description des projets et la façon dont le candidat se présente
- Note l'adéquation avec les valeurs de l'entreprise (définies dans le prompt système)
- Signale les points d'alerte ou les signaux forts

En les faisant travailler en parallèle, le temps de traitement d'une candidature passe d'environ 3 minutes (l'un après l'autre) à environ 45 secondes.

---

### Agent 6 : Question Generator

**Rôle :** produire des questions d'entretien sur mesure pour les candidats retenus.

**Entrée :** le profil analysé du candidat et ses notes données par les agents 3 à 5.

**Sortie :** 5 à 8 questions propres au poste, plus 2 ou 3 questions qui visent les lacunes ou les incertitudes précises signalées par les agents de notation.

C'est là que l'agent va au-delà du tri et apporte une vraie valeur. Les questions d'entretien génériques ne servent à rien. Les questions fondées sur *le profil précis de ce candidat*, comme son interruption de carrière en 2022 ou le projet qu'il a décrit sans le chiffrer, sont celles que posent les bons recruteurs.

---

### Agent 7 : Report Formatter

**Rôle :** rassembler le tout dans un rapport prêt pour le recruteur.

**Sortie par candidat :**
- Synthèse (3 phrases)
- Détail des notes (compétences indispensables, compétences appréciées, adéquation culturelle)
- Principaux points forts
- Points à creuser
- Questions d'entretien suggérées
- Action recommandée (poursuivre / mettre en attente / refuser)

**Sortie globale :**
- Liste classée des N meilleurs candidats
- Répartition des candidatures par note

---

## Le workflow en pratique

1. **Lundi, 9 h :** le responsable du recrutement envoie une demande de 200 mots.
2. **Lundi, 9 h 05 :** JD Writer produit la fiche de poste. Le responsable du recrutement la relit et la valide avec quelques retouches.
3. **Lundi, 9 h 10 :** Publisher publie sur LinkedIn, Indeed et la page carrières. L'équipe est prévenue sur Slack.
4. **Les candidatures arrivent** pendant les 3 à 5 jours suivants.
5. **Chaque candidature déclenche** le traitement en parallèle : CV analysé, compétences comparées, adéquation culturelle évaluée. Terminé en moins d'une minute.
6. **Vendredi, 7 h :** Report Formatter rassemble les candidatures de la semaine dans un rapport classé.
7. **Vendredi, 9 h :** le responsable du recrutement ouvre une liste restreinte propre. 40 CV traités. 8 candidats recommandés. Les questions d'entretien sont prêtes.

Temps total pour le responsable du recrutement : environ 30 minutes.

---

## À quoi faire attention

### Des biais à l'entrée, des biais à la sortie
Vos agents Skills Matcher et Culture Fit ne sont pas plus justes que leurs prompts et que la fiche de poste sur laquelle ils notent. Contrôlez régulièrement leurs résultats. Ajoutez des vérifications explicites des biais dans le prompt système de l'agent Culture Fit.

### Une fausse précision
Une note de 87/100 donne une impression de précision. Elle n'est pas précise. Servez-vous des notes comme d'un filtre et d'un point de départ pour la discussion, pas comme d'une décision finale. L'agent vous aide à vous concentrer : la décision vous appartient.

### Le contexte qui manque
Un CV est un document de présentation. Il ne dit pas comment le candidat se comporte vraiment en équipe, sous pression ou en réunion. Les agents trient sur le papier. L'entretien reste indispensable.

### RGPD et conservation des données
Si vous êtes dans l'Union européenne, il vous faut une base légale pour traiter les données des candidats avec des outils d'IA. Assurez-vous que votre instance d'Agentivity tourne sur votre propre infrastructure (BYOK, auto-hébergée), pour que les données des candidats ne quittent jamais votre environnement.

---

## Pour commencer

Vous n'avez pas besoin des 7 agents dès le premier jour. Une équipe RH minimale, c'est :

1. **CV Parser** : extraction structurée à partir des PDF
2. **Skills Matcher** : notation par rapport à la fiche de poste
3. **Report Formatter** : un résultat propre pour le recruteur

Cela suffit déjà à supprimer 80 % du travail manuel. Construisez à partir de là.

[Essayez le Template de recrutement dans Synergi →](/fr/use-cases#hr)
