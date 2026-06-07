# Agentivity — Palette validée V3
> Design system · Couleurs · Transmis à Claude Design pour intégration

---

## Couleurs primaires

| Nom | Hex | Rôle |
|---|---|---|
| **Rouge électrique** | `#FF0A30` | CTA primaire, accents forts, 1 section flash |
| **Violet électrique** | `#6D00F5` | Pricing, section premium, badges tech |
| **Mint flash** | `#00C896` | Synergi, open source, surprise visuelle |
| **Navy** | `#0D1B35` | Nav, How it works, Footer |
| **Noir absolu** | `#0A0F1E` | Hero, CTA final, fond principal dark |

## Couleurs secondaires

| Nom | Hex | Rôle |
|---|---|---|
| **Violet flash** | `#8B2FF8` | Variante violet, hover states |
| **Rouge foncé** | `#CC0A26` | Hover du rouge, ombres sur rouge |
| **Cyan électrique** | `#00CFFF` | Ticker, accents tech légers |
| **Blanc** | `#FFFFFF` | Sections neutres, respiration |
| **Perle** | `#F0F2FF` | Sections light alternées, tintée bleu-violet |

## Gradient décoratif

```
linear-gradient(135deg, #FF0A30 0%, #6D00F5 100%)
```

> Usage uniquement : texte H1 (ligne 2), éléments décoratifs SVG, séparateurs.
> **Jamais sur des boutons.**

---

## Système complet par section

Pour chaque fond de section : texte principal, texte secondaire, bordure card, CTA/accent, hover card.

### Noir absolu — `#0A0F1E`
*Sections : Hero · CTA final*

| Token | Valeur |
|---|---|
| Texte principal | `#FFFFFF` |
| Texte secondaire | `rgba(255,255,255,.45)` |
| Bordure card | `rgba(255,255,255,.1)` |
| CTA / Accent | `#FF0A30` |
| Hover card bg | `rgba(255,255,255,.07)` |
| Eyebrow / label | `rgba(255,255,255,.35)` |

---

### Navy — `#0D1B35`
*Sections : Nav · How it works · Footer*

| Token | Valeur |
|---|---|
| Texte principal | `#FFFFFF` |
| Texte secondaire | `rgba(255,255,255,.5)` |
| Bordure card | `rgba(255,255,255,.12)` |
| CTA / Accent | `#FF0A30` |
| Hover card bg | `rgba(255,255,255,.06)` |
| Eyebrow / label | `rgba(255,255,255,.3)` |

---

### Rouge électrique — `#FF0A30`
*Sections : Use Cases (section la plus mémorable)*

| Token | Valeur |
|---|---|
| Texte principal | `#FFFFFF` |
| Texte secondaire | `rgba(255,255,255,.75)` |
| Bordure card | `rgba(255,255,255,.3)` |
| CTA / Accent | `#FFFFFF` (bouton blanc) |
| Hover card bg | `rgba(255,255,255,.2)` |
| Eyebrow / label | `rgba(255,255,255,.6)` |
| Blob déco | `#CC0A26` opacity 0.3 |

---

### Violet électrique — `#6D00F5`
*Sections : Pricing*

| Token | Valeur |
|---|---|
| Texte principal | `#FFFFFF` |
| Texte secondaire | `rgba(255,255,255,.65)` |
| Bordure card | `rgba(255,255,255,.2)` |
| CTA / Accent | `#FF0A30` |
| Hover card bg | `rgba(255,255,255,.1)` |
| Eyebrow / label | `rgba(255,255,255,.4)` |
| Blob déco | `#8B2FF8` opacity 0.4 |

---

### Mint flash — `#00C896`
*Sections : Synergi · Open source*

| Token | Valeur |
|---|---|
| Texte principal | `#FFFFFF` |
| Texte secondaire | `rgba(255,255,255,.75)` |
| Bordure card | `rgba(255,255,255,.3)` |
| CTA / Accent | `#0A0F1E` (bouton noir sur mint) |
| Hover card bg | `rgba(255,255,255,.2)` |
| Eyebrow / label | `rgba(255,255,255,.6)` |

---

### Blanc — `#FFFFFF`
*Sections : Canvas · Features · Respiration*

| Token | Valeur |
|---|---|
| Texte principal | `#0A0F1E` |
| Texte secondaire | `#4B5563` |
| Texte discret | `#6B7280` |
| Bordure card | `#E5E7EB` |
| CTA / Accent | `#FF0A30` |
| Hover card bg | `#F9FAFB` |
| Eyebrow / label | `#FF0A30` ou `#6D00F5` |

---

### Perle — `#F0F2FF`
*Sections : Features alternées · Bento*

| Token | Valeur |
|---|---|
| Texte principal | `#0A0F1E` |
| Texte secondaire | `#4B5563` |
| Texte discret | `#6B7280` |
| Bordure card | `#C7D2FE` |
| CTA / Accent | `#FF0A30` |
| Hover card bg | `#E8EAFF` |
| Eyebrow / label | `#6D00F5` |

---

## Séquence homepage (ordre validé)

```
1. Nav          → #0D1B35  Navy
2. Hero         → #0A0F1E  Noir absolu
3. How it works → #0D1B35  Navy
4. Canvas       → #FFFFFF  Blanc
5. Use Cases    → #FF0A30  Rouge électrique  ← moment flash #1
6. Features     → #F0F2FF  Perle
7. Synergi      → #00C896  Mint flash        ← moment flash #2
8. Pricing      → #6D00F5  Violet électrique ← moment flash #3
9. CTA + Footer → #0A0F1E  Noir absolu
```

**Règles à respecter :**
- Jamais 2 sections sombres consécutives
- Jamais 2 sections blanches consécutives
- Maximum 3 sections flash par page
- Blanc et Perle servent de respiration entre les sections intenses

---

## Typographie

| Police | Usage | Source |
|---|---|---|
| **Inter** | Tous les titres, UI, boutons, body | Google Fonts — gratuit |
| **JetBrains Mono** | Code, snippets, commandes Docker | Google Fonts — gratuit |

### Échelle desktop → mobile

| Élément | Desktop | Mobile | Weight | Détails |
|---|---|---|---|---|
| H1 hero | 88–108px | 48px | 900 | letter-spacing: -.055em, line-height: .95 |
| H2 section | 56–68px | 36px | 800 | letter-spacing: -.045em, line-height: 1 |
| H3 card | 20px | 18px | 700 | letter-spacing: -.02em |
| Body | 16px | 15px | 400 | line-height: 1.7 |
| Lead / sous-titre | 18px | 16px | 400 | opacity .6–.7, max-width 520px |
| Eyebrow / label | 11px | 10px | 700 | uppercase, letter-spacing: .12em |
| Bouton | 14px | 13px | 700 | — |
| Chiffre géant | 120–160px | 72px | 900 | letter-spacing: -.06em (stats, big numbers) |
| Code | 13px | 13px | 400 | JetBrains Mono |

---

## Boutons

| Variante | Background | Texte | Border | Hover |
|---|---|---|---|---|
| Primary | `#FF0A30` | `#FFFFFF` | — | `#CC0A26` |
| Secondary | `#0A0F1E` | `#FFFFFF` | — | `#1a2030` |
| Ghost (sur dark) | `transparent` | `rgba(255,255,255,.8)` | `1.5px rgba(255,255,255,.25)` | border `rgba(255,255,255,.6)` |
| Ghost (sur mint/rouge) | `transparent` | `#FFFFFF` | `1.5px rgba(255,255,255,.4)` | bg `rgba(255,255,255,.15)` |
| Noir (sur mint) | `#0A0F1E` | `#FFFFFF` | — | `#1a2030` |
| Blanc (sur rouge) | `#FFFFFF` | `#FF0A30` | — | `rgba(255,255,255,.9)` |

**Specs communes :**
- `border-radius: 8px`
- `padding: 12px 24px` (standard) / `14px 28px` (large)
- `font-weight: 700`
- `transition: 150ms ease`

---

## Highlights de mots dans les titres

Deux styles validés (inspirés Hub theme) :

**Style 1 — Underline épais (sur fond dark)**
```css
text-decoration: underline;
text-underline-offset: 6px;
text-decoration-thickness: 4px;
text-decoration-color: rgba(255,10,48,.4); /* rouge semi-transparent */
color: #FF0A30;
```

**Style 2 — Background block (sur fond clair)**
```css
background: #FFE4E8; /* rose très clair */
color: #CC0A26;
padding: 2px 10px;
border-radius: 5px;
display: inline-block;
```

---

## Radius & Shadows

| Token | Valeur | Usage |
|---|---|---|
| `radius-sm` | `6px` | Badges, chips, boutons |
| `radius-md` | `10px` | Cards internes |
| `radius-lg` | `14px` | Cards principales |
| `radius-xl` | `20px` | Fenêtres app, screenshots |
| `shadow-card` | `0 4px 24px rgba(0,0,0,.12)` | Cards sur fond clair |
| `shadow-float` | `0 8px 40px rgba(0,0,0,.2)` | Éléments flottants |
| `shadow-screenshot` | `0 24px 80px rgba(0,0,0,.25)` | Screenshots produit |

---

## Stack technique cible

- **Framework** : Astro (fichiers `.astro`, pas de React)
- **CSS** : Tailwind CSS v3 → output `tailwind.config.mjs`
- **Animations** : CSS keyframes + Intersection Observer uniquement
- **Icônes** : Lucide Icons (SVG inline)
- **Formulaire** : Netlify Forms (`data-netlify="true"`)
- **Polices** : Google Fonts CDN

---

## Ce qu'il faut éviter

- ❌ Orange `#FF4D1F` ou similaire — remplacé par rouge `#FF0A30`
- ❌ Bleu SaaS standard `#0070F3`, `#635BFF`, `#2563EB`
- ❌ Indigo `#4F46E5` — remplacé par violet électrique `#6D00F5`
- ❌ 3 colonnes égales — toujours asymétrique (40/60, 55/45)
- ❌ Dark mode global — le dark est réservé aux sections spécifiques
- ❌ Stock photos — uniquement screenshots produit + icônes SVG
- ❌ Animations lourdes, particles, loading screens
- ❌ 2 sections sombres ou 2 sections claires consécutives
