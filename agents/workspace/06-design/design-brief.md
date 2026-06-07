# Design Brief — Agentivity
> Agent 06 · Directeur Artistique — 2026-06-05
> Validé aux Checkpoints A → D

---

## 1. Cartographie visuelle des concurrents

| Outil | Esthétique | Couleur dominante | Ressenti | Verdict |
|---|---|---|---|---|
| n8n | Dark dev tool, fonctionnel | Rose-rouge sur noir | Froid, lourd, amateur | ❌ Référence négative explicite |
| Flowise | Dark minimal | Bleu-violet sur noir | Developer underground | ❌ Trop outil |
| Dify | SaaS générique clair | Bleu standard | Corporate banal | ⚠️ Invisible |
| Langflow | Dark abstrait | Violet sur noir | Inaccessible | ❌ |
| Mistral | Premium sobre | Navy + gradients chauds | Sophistiqué, ambitieux | ✅ Inspiration principale |

**Espace blanc occupé par Agentivity :** Professionnel + lumineux + vivant. Ni dark dev tool, ni bleu SaaS générique. Le seul acteur de la catégorie avec des couleurs chaudes affirmées et une structure corporate claire.

**Références visuelles validées :**
- Mistral.ai — sophistication, couleurs chaudes, sections dark/light alternées
- Hub WordPress Theme (LiquidThemes) — structure corporate, multi-section, pro

---

## 2. Système de couleurs

### Palette principale

| Nom | Hex | Rôle |
|---|---|---|
| **Navy Brand** | `#1B2F4E` | Couleur du logo. Nav, footer, sections alternées navy, éléments d'ancrage. |
| **Rouge-orange** | `#FF4D1F` | CTA primaire (boutons d'action), sections chaudes, accent chaud, proof bar. |
| **Indigo** | `#4F46E5` | Accent tech, second CTA, sections pricing/deep, badges feature. |
| **Blanc** | `#FFFFFF` | Fond principal hero, sections neutres. |
| **Slate dark** | `#0F172A` | Sections très sombres (CTA final, code blocks). |
| **Indigo dark** | `#1E1B4B` | Section pricing, profondeur premium. |

### Couleurs secondaires / utilitaires

| Nom | Hex | Usage |
|---|---|---|
| Texte principal | `#111827` | Corps de page sur fond clair |
| Texte secondaire | `#4B5563` | Sous-titres, descriptions |
| Texte discret | `#6B7280` | Captions, labels secondaires |
| Fond orange clair | `#FFF2EE` | Pills/badges sur sections claires |
| Fond indigo clair | `#EEF2FF` | Pills/badges feature, sections douces |
| Succès / open source | `#16A34A` | Badge "free", icônes de validation |
| Texte sur fond orange | `#CC3010` | Labels sur `#FFF2EE` |
| Texte sur fond indigo | `#3730A3` | Labels sur `#EEF2FF` |

### Gradient décoratif

```
linear-gradient(90deg, #FF4D1F 0%, #4F46E5 100%)
```
Usage : texte H1 hero (ligne 2), éléments graphiques décoratifs, séparateurs visuels. **Jamais sur des boutons** — réservé au décor.

### Rationale conversion

- **Rouge-orange sur fond blanc** = contraste élevé, CTA très visible, action immédiate
- **Navy en nav** = autorité, stabilité, ancrage de la marque à chaque scroll
- **Sections orange vif** = rupture de rythme, mémorabilité, "vivant"
- **Indigo en pricing** = premium, sérieux, confiance avant l'acte d'achat

---

## 3. Typographie

### Polices

| Rôle | Police | Source |
|---|---|---|
| Heading & UI | **Inter** | Google Fonts — gratuit, licence OFL |
| Code & mono | **JetBrains Mono** | Google Fonts — gratuit, licence OFL |

Inter est la police de référence du SaaS moderne (Linear, Vercel, Raycast). Elle colle avec le logo existant (même famille géométrique). JetBrains Mono pour tous les blocs code dans `/docs` et snippets techniques.

### Échelle typographique

| Élément | Taille desktop | Taille mobile | Graisse | Autres |
|---|---|---|---|---|
| H1 hero | 56px | 36px | 800 | letter-spacing: -.05em, line-height: 1.05 |
| H1 gradient (ligne 2) | 56px | 36px | 800 | gradient `#FF4D1F → #4F46E5` |
| H2 section | 42px | 28px | 700 | letter-spacing: -.035em, line-height: 1.1 |
| H3 card | 20px | 18px | 600 | letter-spacing: -.02em |
| Body | 16px | 15px | 400 | line-height: 1.7 |
| Sous-titre / lead | 18px | 16px | 400 | opacity .72, max-width 520px |
| Label / badge | 11px | 10px | 700 | uppercase, letter-spacing: .08em |
| CTA bouton | 13px | 13px | 700 | — |
| Nav liens | 13px | — | 500 | opacity .65 sur fond dark |
| Code | 13px | 13px | 400 | JetBrains Mono |

---

## 4. Direction esthétique

### 3 adjectifs validés
**Corporate · Pro · Vivant**

- **Corporate** → structure solide, hiérarchie claire, grille stricte, pas de fantaisie typographique
- **Pro** → finition des détails (espacements, radius, ombres légères), cohérence entre sections
- **Vivant** → color blocking affirmé, gradient sur le H1, sections oranges qui cassent le rythme, animations légères au scroll

### Ce qu'il faut éviter
- ❌ Dark mode global (= dev tool froid — n8n, Flowise)
- ❌ Bleu SaaS standard `#0070F3` / `#635BFF` — invisible dans la catégorie
- ❌ Typo display créative concurrençant le logo
- ❌ Animations lourdes ou loading screens
- ❌ Orange muted / amber (= artisanat, craft — pas SaaS)
- ❌ Deux sections sombres ou deux sections blanches consécutives

---

## 5. Séquence des sections (homepage)

| Section | Fond | Accent | Note |
|---|---|---|---|
| Nav | Navy `#1B2F4E` | Rouge-orange (CTA) | Sticky |
| Hero | Blanc `#FFFFFF` | Rouge-orange + gradient H1 | |
| How it works | Navy `#1B2F4E` | Rouge-orange (cards chaudes) + Indigo | Cards semi-transparentes |
| Use Cases | Rouge-orange `#FF4D1F` | Blanc | Section la plus mémorable |
| Proof / Features | Blanc `#FFFFFF` | Indigo (badges) | Cartes grises légères |
| Pricing | Indigo dark `#1E1B4B` | Rouge-orange (Free) + Indigo (Enterprise) | |
| CTA final | Slate `#0F172A` | Gradient H2 | Centré |
| Footer | Navy `#1B2F4E` | Texte blanc 50% | |

**Règle d'or :** jamais deux sections sombres consécutives, jamais deux sections blanches consécutives.

---

## 6. Direction imagery & médias

### Screenshots produit (🔴 bloquant au build)
- **Canvas team** — screenshot de l'interface de composition d'équipe (vue principale)
- **Config agent** — screenshot d'un agent configuré (nom, modèle, rôle, instructions)
- **Vue résultat** — screenshot d'une exécution en cours ou terminée
- **Synergi** — screenshot de la bibliothèque de templates

Traitement : fond blanc ou fond très clair, ombre légère `box-shadow: 0 8px 40px rgba(0,0,0,.12)`, border-radius 12px, légère inclinaison optionnelle (-2deg) sur le hero.

### Diagramme SVG (🔴 bloquant au build)
Un diagramme vectoriel montrant plusieurs agents connectés selon différentes topologies (Sequential, Concurrent, Group Chat). Style : nodes circulaires navy/indigo, connexions en trait navy ou gradient, fond transparent. Utilisé dans la section "How it works".

### Illustrations / icônes
- Style : icônes outline, trait 1.5px, couleur `#1B2F4E` ou `#FF4D1F`
- Source recommandée : Lucide Icons (open source, cohérent, utilisé nativement dans React/WordPress)
- Pas de stock photos — uniquement screenshots produit + icônes

### Pas de vidéo au launch
Une vidéo hero peut venir en V2. Au launch : screenshot statique + diagramme SVG animé CSS (fade-in des nodes).

---

## 7. Description du moment démo (hero animation)

**Ce que l'animation doit montrer :**

Le canvas de composition d'équipe — en desktop, à droite du H1. Séquence :

1. **Fade in** du canvas vide (fond blanc, grille légère)
2. **Apparition séquentielle** de 3 agents (nodes circulaires navy) avec leurs étiquettes : "Researcher", "Analyst", "Writer"
3. **Connexions** qui se tracent entre les agents (trait animé, gauche → droite)
4. **Badge topology** qui apparaît : "Sequential"
5. **Résultat** : une carte "Report ready" en bas du canvas avec une checkmark orange

Durée totale : ~3 secondes, loop infini, easing ease-in-out. Implémentation : CSS keyframes ou Lottie (si budget). Au minimum : GIF ou séquence statique avec fade-in CSS.

---

## 8. Specs des composants principaux

### Nav
```
- Fond : #1B2F4E
- Logo : blanc, Inter 800, 18px
- Liens : blanc 65%, Inter 500, 13px, gap 28px
- CTA : background #FF4D1F, blanc, Inter 700, 12px, padding 9px 20px, radius 7px
- Height : 56px
- Sticky, z-index 100
- Pas de hamburger desktop — mobile : hamburger blanc
```

### Hero
```
- Fond : #FFFFFF
- Layout : 2 colonnes (60% texte / 40% canvas demo) — desktop
- Layout mobile : 1 colonne, texte + image empilés
- Pill badge : fond #FFF2EE, texte #CC3010, Inter 700, 10px uppercase
- H1 ligne 1 : #111827, Inter 800, 56px
- H1 ligne 2 : gradient #FF4D1F → #4F46E5
- Sous-titre : #4B5563, Inter 400, 16px, max-width 520px
- CTA primaire : #FF4D1F, blanc, Inter 700, 13px
- CTA secondaire : #1B2F4E, blanc, Inter 700, 13px
- Proof bar : icons + texte, #FF4D1F pour "Open Source", #6B7280 pour les autres
- Padding : 80px 48px desktop / 48px 24px mobile
```

### Card feature (section Proof)
```
- Fond : #F9FAFB
- Bordure : 1px solid #E5E7EB
- Radius : 12px
- Padding : 28px
- Titre : #1B2F4E, Inter 600, 20px
- Texte : #6B7280, Inter 400, 14px, line-height 1.65
- Icône : Lucide, 24px, couleur #FF4D1F ou #4F46E5
```

### Card use case (section orange)
```
- Fond : rgba(255,255,255,.15)
- Radius : 12px
- Padding : 28px
- Titre : blanc, Inter 600, 20px
- Texte : rgba(255,255,255,.8), Inter 400, 13px
- Emoji ou icône : 24px
```

### Pricing card
```
- Free : fond rgba(255,255,255,.08), bordure rgba(255,255,255,.1)
- Cloud : fond rgba(255,77,31,.15), bordure rgba(255,77,31,.3)
- Enterprise : fond rgba(79,70,229,.25), bordure rgba(79,70,229,.4)
- Prix : blanc, Inter 800, 32px
- CTA : voir spec boutons ci-dessous
```

### Boutons
```
- Primaire : bg #FF4D1F, texte #fff, Inter 700, 13px, padding 11px 22px, radius 8px
  → Hover : bg #E03A10, transition 150ms ease
- Secondaire : bg #1B2F4E, texte #fff, Inter 700, 13px, padding 11px 22px, radius 8px
  → Hover : bg #162540
- Outline sur fond dark : border 2px solid rgba(255,255,255,.4), texte #fff
  → Hover : border rgba(255,255,255,.7)
- Outline indigo sur fond clair : border 2px solid #4F46E5, texte #4F46E5
  → Hover : bg #EEF2FF
```

### CTA Banner (section finale)
```
- Fond : #0F172A
- H2 : blanc Inter 800, 44px, gradient sur la ligne 2
- Sous-titre : rgba(255,255,255,.55), 15px
- 2 boutons côte à côte : primaire + outline white
- Centré, padding 100px 48px
```

### Footer
```
- Fond : #1B2F4E
- Logo : blanc
- Liens : rgba(255,255,255,.5), Inter 400, 12px
- Copyright : rgba(255,255,255,.4), 11px
- Padding : 40px 48px
- 3 colonnes : logo / copyright / liens externes
```

---

## 9. Stack technique & implications

| Brique | Solution | Coût |
|---|---|---|
| Framework | **Astro** (static site generator) | Gratuit |
| Contenu | **JSON + Markdown** (fichiers locaux) | — |
| Multilingue | Astro i18n natif (EN prioritaire, FR + autres en V2) | Inclus |
| Blog | Astro Content Collections (Markdown) | Inclus |
| Waitlist | **Netlify Forms** (zéro backend) ou Brevo API | Gratuit |
| Polices | Google Fonts CDN — Inter + JetBrains Mono | Gratuit |
| Icônes | Lucide Icons (SVG inline) | Gratuit |
| Animations | CSS keyframes (hero canvas). Lottie en V2. | Gratuit |
| Hébergement | **Netlify** ou Vercel (déploiement auto via GitHub) | Gratuit |
| Domaine | agentivity.io | Déjà acheté |

**Total infrastructure : 0€/mois.**

### Structure des fichiers de contenu

```
/src
  /content
    /en
      home.json
      how-it-works.json
      use-cases.json
      pricing.json
      docs.json
    /fr
      home.json          ← V2
      ...
    /blog
      article-1.md
      article-2.md
    /compare
      agentivity-vs-n8n.json
      agentivity-vs-dify.json
      agentivity-vs-make.json
  /pages
    index.astro
    how-it-works.astro
    use-cases.astro
    pricing.astro
    docs.astro
    /compare
      [slug].astro       ← pages dynamiques depuis JSON
    /blog
      [slug].astro
  /components
    Nav.astro
    Hero.astro
    Footer.astro
    ...
  /layouts
    Base.astro
```

### Formulaire waitlist
```html
<!-- Netlify Forms — zéro backend -->
<form name="waitlist" method="POST" data-netlify="true">
  <input type="email" name="email" placeholder="your@email.com" />
  <button type="submit">Join the waitlist</button>
</form>
```
Netlify intercepte automatiquement → dashboard + email de notification. Gratuit jusqu'à 100 soumissions/mois.

### Performance attendue
- Lighthouse score : 95-100 (HTML statique, pas de PHP, pas de base de données)
- Core Web Vitals : vert natif
- Pas de WP Rocket, pas de cache à configurer — Netlify CDN fait tout

---

## Handoff

> Le design brief est prêt. L'**Agent 07 · Build** va maintenant traduire ce système visuel en instructions de construction concrètes pour **Astro + Netlify** — structure de fichiers, composants, routing i18n, formulaire waitlist, section par section.
