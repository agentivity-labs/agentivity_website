# Prompt Claude Design — Agentivity Homepage

---

## MISSION

Tu vas designer la homepage d'**Agentivity** — une plateforme open source B2B de composition d'équipes d'agents IA. L'objectif est un design de niveau premium, comparable aux meilleures landing pages SaaS 2025.

---

## RÉFÉRENCES VISUELLES (obligatoire — examine-les attentivement)

**URL principale :**
https://preview.themeforest.net/item/hub-responsive-multipurpose-wordpress-theme/full_screen_preview/31569152

**Screenshots joints :**
- [colle ici les screenshots du Hub theme que tu as]
- [colle ici les screenshots de l'app Agentivity : workflow canvas, agent node, team canvas, execution view]

**Ce que tu dois retenir du Hub theme :**
- Typographie massive (80–120px) avec un mot surligné (fond coloré ou underline)
- Layouts asymétriques — jamais 3 colonnes égales. Toujours 40/60 ou 30/70
- Chiffres géants comme contenu ("110+" prend 40% de la largeur)
- Images qui débordent entre les sections (negative margin, z-index)
- Sections alternant dark/light avec de vrais breaks visuels
- Ticker horizontal animé (éléments qui défilent)
- Section full-bleed avec image edge-to-edge
- Split section : grand titre gauche + texte + image droite qui sort du container
- CTA final sombre, typographie 80px+, 1 mot en couleur avec underline

**Ce qui distingue Agentivity du Hub theme :**
Agentivity est un produit B2B tech — pas un thème WordPress. Le design doit être Corporate · Pro · Vivant. Pas de stock photos, pas d'illustrations génériques. Uniquement des screenshots produit + icônes + typographie.

---

## IDENTITÉ DE MARQUE

**Nom :** Agentivity
**Tagline :** Build your AI team.
**Domaine :** agentivity.io
**GitHub :** github.com/agentivity-labs/agentivity

**Ce qu'est le produit :**
Plateforme visuelle pour composer des équipes d'agents IA. L'utilisateur place des agents sur un canvas, choisit une topologie (Sequential, Concurrent, Group Chat…), et lance l'équipe. Les agents collaborent et délivrent des résultats automatiquement. Open source, self-hébergé via Docker, BYOK (Bring Your Own API Key).

**Public cible :**
- AI Specialists, consultants, ops leads (les "Builders" — configurent les équipes)
- Managers, solopreneurs, PME (les "Users" — utilisent les équipes créées)

**Adjectifs validés :** Corporate · Pro · Vivant

**Compétiteurs à éviter de ressembler :**
- n8n : dark, dev tool, froid ❌
- Flowise : dark minimal, underground ❌
- Dify : bleu SaaS générique, invisible ❌
- Langflow : violet abstrait, inaccessible ❌

**Référence positive :** Mistral.ai — sophistiqué, couleurs chaudes, sections alternées

---

## PALETTE DE COULEURS (validée, ne pas modifier)

| Nom | Hex | Rôle |
|---|---|---|
| Navy Brand | `#1B2F4E` | Logo, Nav, Footer, sections navy |
| Rouge | `#FF4D1F` | CTA primaire, sections chaudes, accents |
| Indigo | `#4F46E5` | Tech accent, pricing, badges |
| Blanc | `#FFFFFF` | Fond hero, sections neutres |
| Slate | `#0F172A` | Sections très sombres (CTA final) |
| Indigo dark | `#1E1B4B` | Section pricing |

**Utilitaires :**
- Texte principal : `#111827`
- Texte secondaire : `#4B5563`
- Texte discret : `#6B7280`
- Fond rouge clair : `#FFF2EE` (pills/badges)
- Fond indigo clair : `#EEF2FF` (badges tech)
- Succès / open source : `#16A34A`

**Gradient décoratif :** `linear-gradient(90deg, #FF4D1F 0%, #4F46E5 100%)`
→ Usage : texte H1 ligne 2, séparateurs décoratifs. Jamais sur des boutons.

**Règle d'or :** jamais 2 sections sombres consécutives, jamais 2 sections blanches consécutives.

---

## TYPOGRAPHIE (validée, ne pas modifier)

**Polices :** Inter (headings + UI) · JetBrains Mono (code)
Source : Google Fonts — gratuites

| Élément | Desktop | Mobile | Graisse | Détails |
|---|---|---|---|---|
| H1 hero | 56–96px | 36px | 800 | letter-spacing: -.05em, line-height: 1.0 |
| H2 section | 42–68px | 28px | 700–800 | letter-spacing: -.04em |
| H3 card | 20px | 18px | 600 | letter-spacing: -.02em |
| Body | 16px | 15px | 400 | line-height: 1.7 |
| Lead / sous-titre | 18px | 16px | 400 | opacity .72, max-width 520px |
| Label / badge | 11px | 10px | 700 | uppercase, letter-spacing: .08em |
| Bouton CTA | 14px | 13px | 700 | — |
| Code | 13px | 13px | 400 | JetBrains Mono |

---

## SÉQUENCE DES SECTIONS (homepage)

1. **Nav** — fond Navy `#1B2F4E`, sticky
2. **Hero** — fond Blanc, H1 massif, image produit à droite ou en bas
3. **How it works** — fond Navy, 3 étapes numérotées
4. **Use Cases** — fond Rouge `#FF4D1F`, grille asymétrique
5. **Building Blocks / Features** — fond Blanc, bento ou split
6. **Pricing résumé** — fond Indigo dark `#1E1B4B`
7. **CTA final** — fond Slate `#0F172A`, H2 massif centré
8. **Footer** — fond Navy `#1B2F4E`

---

## CONTENU TEXTUEL (à utiliser tel quel)

### NAV
```
Agentivity  |  How it works  Use Cases  Pricing  Docs  |  [⭐ Star on GitHub]  [Join the waitlist]
```

### HERO
**H1 :** Build your AI team.
**H1 ligne 2 (gradient rouge→indigo) :** A finance team, an HR team, a personal assistant.
**Subhead :** Drag agents onto your canvas, connect them. They collaborate, deliver — while you sleep.
**CTA 1 :** ⭐ Star on GitHub
**CTA 2 :** Join the waitlist
**Microcopy :** Cloud version coming soon.
**Proof bar :** ⭐ [N] stars on GitHub · Open source · free to self-host · Docker-ready · up in minutes · Bring your own API key

### HOW IT WORKS
**H2 :** How it works

**01 — Compose**
Place agents on your canvas. Give each one a role, a set of tools, and instructions.

**02 — Structure**
Choose how your team is organised — sequential, collaborative, or manager-led. Each agent knows what to do and when.

**03 — Run**
Launch your team. They work, collaborate, and deliver — automatically.

**Lien :** See how it works →

### BUILDING BLOCKS
**H2 :** The building blocks

| Concept | Description |
|---|---|
| Canvas | Your visual workspace. The org chart of your AI team. |
| Agent | An AI collaborator with a role, tools, and instructions you define. |
| Team | Agents working together toward a shared goal. |
| Team Studio | The editor where you compose and configure your teams. |
| Synergi | Pre-built team templates. Ready to deploy, yours to customise. |

### USE CASES
**H2 :** What will your team do?
**Sous-titre :** AI teams for small business — finance, HR, marketing and more.

**Finance Team** — Research Agent · Analysis Agent · Report Writer Agent
> "Every Monday, Sarah's Finance team delivers a competitor briefing — sourced, summarised, ready to share with clients."

**HR Team** — Job Description Agent · Screening Agent · Interview Prep Agent
> "Marcus posted a role on Tuesday. By Wednesday morning, 3 shortlisted candidates were waiting in his inbox."

**Personal Assistant** — Research Agent · Summariser Agent · Task Tracker Agent
> "Every morning at 7am, the brief is ready. What happened, what's next, what's done."

**CTA :** See all use cases →

### PRICING RÉSUMÉ
**H2 :** Simple, transparent pricing.

| Free | Personal | Pro | Business | Enterprise |
|---|---|---|---|---|
| Open source · Self-host · Docker | Cloud · No setup | More power | Teams | SSO · White-label |
| ⭐ Star on GitHub | Join the waitlist | Join the waitlist | Join the waitlist | Contact us |

White-label available. Build on Agentivity, sell as your own.
**Lien :** See full pricing →

### CTA FINAL
**H2 :** Your team is ready to build.
**Subhead :** Start with the open source version — or join the waitlist for cloud.
**CTA 1 :** ⭐ Star on GitHub
**CTA 2 :** Join the waitlist

### FOOTER
Colonne 1 : Logo · Build your AI team. · [GitHub] [Discord]
Colonne 2 — Product : How it works · Use Cases · Pricing · Docs · Synergi
Colonne 3 — Company : GitHub · Licence · vs n8n · vs Dify · vs Make
Bas : © 2026 Agentivity · Source-available under the Agentivity Sustainable Use Licence

---

## SCREENSHOTS PRODUIT DISPONIBLES
(à intégrer comme images dans le design — zones vertes placeholder)

1. **Workflow canvas** — vue complète du studio avec un workflow SEO complexe (agents connectés, groupes colorés, connexions animées)
2. **Agent node** — noeud "Financial Analyst / AI Agent" (carte blanche, icône robot, diamants de connexion colorés)
3. **Team canvas** — 3 hexagones "Product Strategist / Engineer / UX Designer" sur fond pointillé
4. **Exécution** — à prendre dans l'app

---

## STACK TECHNIQUE CIBLE

- **Framework :** Astro (fichiers `.astro` — pas de React/Vue)
- **CSS :** Tailwind CSS v3
- **Polices :** Google Fonts CDN (Inter + JetBrains Mono)
- **Animations :** CSS keyframes + Intersection Observer (pas de GSAP/Framer)
- **Forms :** Netlify Forms (attribut `data-netlify="true"`)
- **Icônes :** Lucide Icons (SVG inline)
- **Hébergement :** Netlify (déploiement auto GitHub)

---

## OUTPUT ATTENDU

**Obligatoire :**

1. **`tailwind.config.mjs` complet**
   - Couleurs exactes de la palette
   - Échelle typographique (fontSize, fontWeight, letterSpacing, lineHeight)
   - Spacing, borderRadius, boxShadow custom
   - Breakpoints (sm: 640, md: 768, lg: 1024, xl: 1280)

2. **Specs section par section** (format markdown)
   Pour chaque section : layout exact, grille, espacements, typographie, couleurs, états hover, animations

3. **Composants réutilisables identifiés avec variantes**
   - Button (primary, ghost, outline-dark, outline-indigo)
   - Card (feature, use-case, pricing, testimonial)
   - Badge / Pill
   - Section wrapper

4. **Micro-interactions à implémenter**
   - Scroll reveal (fade + translateY)
   - Hover states (lift, border-color, background)
   - Ticker animation
   - Bouton hover

5. **Mockup PNG de chaque section** (ou export Figma)
   Pour que le développeur ait une référence visuelle exacte

**Optionnel mais bienvenu :**
- Composant Hero SVG animé (canvas avec hexagones, connexions, dots voyageurs)
- Variantes mobile des sections clés

---

## CONTRAINTES IMPORTANTES

- ❌ Pas de dark mode global — le dark est réservé aux sections spécifiques (nav, how it works, CTA)
- ❌ Pas de bleu standard `#0070F3` ou `#635BFF`
- ❌ Pas de stock photos — uniquement screenshots produit + icônes
- ❌ Pas d'animations lourdes (pas de loading screens, pas de particles.js)
- ❌ Pas de 3 colonnes égales — toujours asymétrique
- ✅ Images qui débordent entre les sections
- ✅ Typographie massive pour les chiffres clés (comme "5 topologies", "0€ to self-host")
- ✅ Un mot mis en surbrillance dans les grands titres (fond coloré ou underline épais)
- ✅ Ticker horizontal animé (topologies + concepts produit)
