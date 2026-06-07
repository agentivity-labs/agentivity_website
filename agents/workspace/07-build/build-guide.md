# Build Guide — Agentivity Website
> Agent 07 · Build — 2026-06-05
> Sources : design-brief.md (06) · copy/*.md (04) · seo/*.md (05)

---

## 0. Vue d'ensemble

Site Astro statique déployé sur Netlify. Toutes les pages sont générées au build.
Zéro PHP, zéro base de données, zéro JS framework côté client (sauf animation CSS hero).

**Pages à construire :**
- `/` — Home
- `/how-it-works`
- `/use-cases`
- `/pricing`
- `/docs`
- `/compare/agentivity-vs-n8n`
- `/compare/agentivity-vs-dify`
- `/compare/agentivity-vs-make`
- `/blog/[slug]` — à activer quand le premier article est prêt

---

## 1. Initialisation du projet

```bash
# Créer le projet Astro
npm create astro@latest agentivity-site -- --template minimal --typescript strict --no-install
cd agentivity-site

# Installer les dépendances
npm install

# Dépendances supplémentaires
npm install @astrojs/sitemap @astrojs/netlify lucide-astro
```

**`astro.config.mjs`**
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://agentivity.io',
  integrations: [sitemap()],
  adapter: netlify(),
  output: 'static',
});
```

**`netlify.toml`** (à la racine du repo)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 2. Design tokens — CSS variables

**`src/styles/tokens.css`**
```css
:root {
  /* Couleurs principales */
  --navy:        #1B2F4E;
  --orange:      #FF4D1F;
  --indigo:      #4F46E5;
  --white:       #FFFFFF;
  --slate:       #0F172A;
  --indigo-dark: #1E1B4B;

  /* Texte */
  --text-primary:   #111827;
  --text-secondary: #4B5563;
  --text-muted:     #6B7280;

  /* Fonds utilitaires */
  --bg-orange-soft: #FFF2EE;
  --bg-indigo-soft: #EEF2FF;
  --bg-gray-light:  #F9FAFB;
  --border-light:   #E5E7EB;

  /* Sémantique */
  --color-success: #16A34A;
  --text-on-orange: #CC3010;
  --text-on-indigo: #3730A3;

  /* Gradient décoratif */
  --gradient-hero: linear-gradient(90deg, #FF4D1F 0%, #4F46E5 100%);

  /* Typographie */
  --font-ui:   'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radius */
  --radius-sm: 7px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-card: 0 8px 40px rgba(0,0,0,.08);
  --shadow-screenshot: 0 8px 40px rgba(0,0,0,.12);
}
```

**`src/styles/global.css`**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap');
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-family: var(--font-ui); color: var(--text-primary); }
body { background: var(--white); -webkit-font-smoothing: antialiased; }

img, picture, video { max-width: 100%; display: block; }

/* Typographic scale */
.h1 { font-size: clamp(36px, 5vw, 56px); font-weight: 800; letter-spacing: -.05em; line-height: 1.05; }
.h2 { font-size: clamp(28px, 4vw, 42px); font-weight: 700; letter-spacing: -.035em; line-height: 1.1; }
.h3 { font-size: clamp(18px, 2vw, 20px); font-weight: 600; letter-spacing: -.02em; }
.lead { font-size: clamp(16px, 1.5vw, 18px); font-weight: 400; line-height: 1.7; opacity: .72; max-width: 520px; }
.body { font-size: 16px; line-height: 1.7; }
.label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
.mono { font-family: var(--font-mono); font-size: 13px; }

/* Gradient text */
.grad-text {
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Utility */
.container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
@media (max-width: 768px) { .container { padding: 0 24px; } }

/* Buttons */
.btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-ui); font-size: 13px; font-weight: 700; cursor: pointer; text-decoration: none; transition: background 150ms ease, border-color 150ms ease; white-space: nowrap; }
.btn-primary { background: var(--orange); color: #fff; padding: 11px 22px; border-radius: var(--radius-md); border: none; }
.btn-primary:hover { background: #E03A10; }
.btn-secondary { background: var(--navy); color: #fff; padding: 11px 22px; border-radius: var(--radius-md); border: none; }
.btn-secondary:hover { background: #162540; }
.btn-outline-dark { background: transparent; color: #fff; padding: 11px 22px; border-radius: var(--radius-md); border: 2px solid rgba(255,255,255,.4); }
.btn-outline-dark:hover { border-color: rgba(255,255,255,.7); }
.btn-outline-indigo { background: transparent; color: var(--indigo); padding: 11px 22px; border-radius: var(--radius-md); border: 2px solid var(--indigo); }
.btn-outline-indigo:hover { background: var(--bg-indigo-soft); }
```

---

## 3. Layout de base

**`src/layouts/Base.astro`**
```astro
---
export interface Props {
  title: string;
  description: string;
  ogImage?: string;
  schema?: object;
}
const { title, description, ogImage = '/og-default.png', schema } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="canonical" href={canonicalURL} />

  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- OG -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(ogImage, Astro.site)} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Schema.org -->
  {schema && (
    <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  )}
</head>
<body>
  <slot />
</body>
</html>

<style is:global>
  @import '/src/styles/global.css';
</style>
```

---

## 4. Composant Nav

**`src/components/Nav.astro`**
```astro
---
interface Props {
  currentPath?: string;
}
const { currentPath = '' } = Astro.props;
const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/use-cases',    label: 'Use Cases' },
  { href: '/pricing',      label: 'Pricing' },
  { href: '/docs',         label: 'Docs' },
];
---
<nav class="nav">
  <div class="nav-inner container">
    <a href="/" class="nav-logo">agentivity</a>

    <ul class="nav-links">
      {links.map(link => (
        <li>
          <a
            href={link.href}
            class={`nav-link ${currentPath.startsWith(link.href) ? 'nav-link--active' : ''}`}
          >{link.label}</a>
        </li>
      ))}
    </ul>

    <div class="nav-actions">
      <a
        href="https://github.com/agentivity-labs/agentivity"
        target="_blank"
        rel="noopener"
        class="btn btn-outline-dark nav-github"
      >⭐ Star on GitHub</a>
      <a href="#waitlist" class="btn btn-primary">Join the waitlist</a>
    </div>

    <!-- Mobile hamburger -->
    <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<style>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--navy);
  height: 56px;
  display: flex;
  align-items: center;
}
.nav-inner {
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
}
.nav-logo {
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -.03em;
  flex-shrink: 0;
}
.nav-links {
  display: flex;
  gap: 28px;
  list-style: none;
  flex: 1;
}
.nav-link {
  color: rgba(255,255,255,.65);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 150ms;
}
.nav-link:hover, .nav-link--active { color: #fff; }
.nav-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
.nav-github {
  font-size: 12px;
  padding: 7px 14px;
}
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .nav-links, .nav-github { display: none; }
  .nav-hamburger { display: flex; }
  .nav-actions { margin-left: auto; }
}
</style>
```

---

## 5. Composant Footer

**`src/components/Footer.astro`**
```astro
---
---
<footer class="footer">
  <div class="footer-inner container">
    <div class="footer-brand">
      <span class="footer-logo">agentivity</span>
      <p class="footer-tagline">Build your AI team.</p>
      <div class="footer-socials">
        <a href="https://github.com/agentivity-labs/agentivity" target="_blank" rel="noopener" aria-label="GitHub">
          <!-- Lucide Github SVG inline -->
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
      </div>
    </div>

    <nav class="footer-nav" aria-label="Product">
      <p class="footer-nav-title label">Product</p>
      <ul>
        <li><a href="/how-it-works">How it works</a></li>
        <li><a href="/use-cases">Use Cases</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/docs">Docs</a></li>
        <li><a href="https://synergi.agentivity.io" target="_blank" rel="noopener">Synergi</a></li>
      </ul>
    </nav>

    <nav class="footer-nav" aria-label="Company">
      <p class="footer-nav-title label">Company</p>
      <ul>
        <li><a href="https://github.com/agentivity-labs/agentivity" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://github.com/agentivity-labs/agentivity/blob/main/LICENCE.md" target="_blank" rel="noopener">Licence</a></li>
        <li><a href="/compare/agentivity-vs-n8n">vs n8n</a></li>
        <li><a href="/compare/agentivity-vs-dify">vs Dify</a></li>
        <li><a href="/compare/agentivity-vs-make">vs Make</a></li>
      </ul>
    </nav>
  </div>

  <div class="footer-bottom container">
    <p>© 2026 Agentivity · Source-available under the Agentivity Sustainable Use Licence</p>
  </div>
</footer>

<style>
.footer {
  background: var(--navy);
  padding: 56px 0 0;
}
.footer-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 40px;
}
.footer-logo {
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  display: block;
  margin-bottom: 8px;
}
.footer-tagline {
  color: rgba(255,255,255,.5);
  font-size: 13px;
  margin-bottom: 16px;
}
.footer-socials a {
  color: rgba(255,255,255,.5);
  transition: color 150ms;
}
.footer-socials a:hover { color: #fff; }
.footer-nav-title {
  color: rgba(255,255,255,.35);
  margin-bottom: 12px;
}
.footer-nav ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-nav a {
  color: rgba(255,255,255,.5);
  text-decoration: none;
  font-size: 13px;
  transition: color 150ms;
}
.footer-nav a:hover { color: #fff; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.1);
  padding-top: 20px;
  padding-bottom: 20px;
}
.footer-bottom p {
  color: rgba(255,255,255,.4);
  font-size: 11px;
}

@media (max-width: 768px) {
  .footer-inner { grid-template-columns: 1fr; gap: 32px; }
}
</style>
```

---

## 6. Composant WaitlistForm

**`src/components/WaitlistForm.astro`**
```astro
---
interface Props {
  dark?: boolean;
}
const { dark = false } = Astro.props;
---
<form
  name="waitlist"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  class={`waitlist-form ${dark ? 'waitlist-form--dark' : ''}`}
  id="waitlist"
>
  <input type="hidden" name="form-name" value="waitlist" />
  <input type="text" name="bot-field" style="display:none" />
  <input
    type="email"
    name="email"
    placeholder="your@email.com"
    required
    autocomplete="email"
  />
  <button type="submit" class="btn btn-primary">Join the waitlist</button>
</form>

<style>
.waitlist-form {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.waitlist-form input[type="email"] {
  flex: 1;
  min-width: 240px;
  padding: 11px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  font-family: var(--font-ui);
  font-size: 14px;
  outline: none;
}
.waitlist-form input[type="email"]:focus {
  border-color: var(--orange);
  box-shadow: 0 0 0 3px rgba(255,77,31,.15);
}
.waitlist-form--dark input[type="email"] {
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.2);
  color: #fff;
}
.waitlist-form--dark input[type="email"]::placeholder { color: rgba(255,255,255,.4); }
</style>
```

---

## 7. Page — Home (`/`)

**`src/pages/index.astro`**
```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import WaitlistForm from '../components/WaitlistForm.astro';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Agentivity",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Docker, Linux, macOS, Windows",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "url": "https://agentivity.io",
      "description": "Visual platform for composing AI agent teams."
    },
    {
      "@type": "Organization",
      "name": "Agentivity",
      "url": "https://agentivity.io",
      "logo": "https://agentivity.io/logo.svg",
      "sameAs": ["https://github.com/agentivity-labs/agentivity"]
    }
  ]
};
---
<Base
  title="Build Your AI Team — Visual, Open Source | Agentivity"
  description="Compose AI agent teams visually. No code. Finance, HR, marketing teams built in minutes. Self-host free with Docker or join the cloud waitlist."
  schema={schema}
>
  <Nav currentPath="/" />

  <!-- HERO -->
  <section class="s-hero">
    <div class="container hero-grid">
      <div class="hero-text">
        <div class="hero-pill label">
          <span class="pill-dot"></span>
          Open source · Available now
        </div>

        <h1 class="h1 hero-h1">
          Build your AI team.<br />
          <span class="grad-text">A finance team, an HR team,<br />a personal assistant.</span>
        </h1>

        <p class="lead hero-sub">
          Drag agents onto your canvas, connect them. They collaborate, deliver — while you sleep.
        </p>

        <div class="hero-ctas">
          <a
            href="https://github.com/agentivity-labs/agentivity"
            target="_blank"
            rel="noopener"
            class="btn btn-secondary"
          >⭐ Star on GitHub</a>
          <a href="#waitlist" class="btn btn-primary">Join the waitlist</a>
        </div>

        <p class="hero-microcopy">Cloud version coming soon.</p>

        <!-- Proof bar -->
        <div class="proof-bar">
          <span class="proof-item">
            <span class="proof-star">⭐</span>
            <a href="https://github.com/agentivity-labs/agentivity" target="_blank" rel="noopener">
              <!-- TODO: remplacer par badge dynamique GitHub stars -->
              Stars on GitHub
            </a>
          </span>
          <span class="proof-sep">·</span>
          <span class="proof-item proof-open">Open source · free to self-host</span>
          <span class="proof-sep">·</span>
          <span class="proof-item">Docker-ready · up in minutes</span>
          <span class="proof-sep">·</span>
          <span class="proof-item">Bring your own API key</span>
        </div>
      </div>

      <!-- Hero demo canvas (animation CSS) -->
      <div class="hero-canvas" aria-hidden="true">
        <div class="canvas-frame">
          <div class="canvas-node canvas-node--1">
            <div class="node-dot"></div>
            <span>Researcher</span>
          </div>
          <div class="canvas-conn canvas-conn--1"></div>
          <div class="canvas-node canvas-node--2">
            <div class="node-dot"></div>
            <span>Analyst</span>
          </div>
          <div class="canvas-conn canvas-conn--2"></div>
          <div class="canvas-node canvas-node--3">
            <div class="node-dot"></div>
            <span>Writer</span>
          </div>
          <div class="canvas-badge">Sequential</div>
          <div class="canvas-result">
            <span class="result-check">✓</span>
            Report ready
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS (résumé) -->
  <section class="s-navy">
    <div class="container section-pad">
      <div class="section-header section-header--center">
        <h2 class="h2" style="color:#fff">How it works</h2>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num label" style="color:var(--orange)">01</div>
          <h3 class="h3" style="color:#fff">Compose</h3>
          <p style="color:rgba(255,255,255,.65);font-size:15px;line-height:1.65">Place agents on your canvas. Give each one a role, a set of tools, and instructions.</p>
        </div>
        <div class="step-card">
          <div class="step-num label" style="color:var(--orange)">02</div>
          <h3 class="h3" style="color:#fff">Structure</h3>
          <p style="color:rgba(255,255,255,.65);font-size:15px;line-height:1.65">Choose how your team is organised — sequential, collaborative, or manager-led.</p>
        </div>
        <div class="step-card">
          <div class="step-num label" style="color:var(--orange)">03</div>
          <h3 class="h3" style="color:#fff">Run</h3>
          <p style="color:rgba(255,255,255,.65);font-size:15px;line-height:1.65">Launch your team. They work, collaborate, and deliver — automatically.</p>
        </div>
      </div>
      <div style="text-align:center;margin-top:40px">
        <a href="/how-it-works" class="btn btn-outline-dark">See how it works →</a>
      </div>
    </div>
  </section>

  <!-- USE CASES PREVIEW -->
  <section class="s-orange">
    <div class="container section-pad">
      <div class="section-header section-header--center">
        <h2 class="h2" style="color:#fff">What will your team do?</h2>
        <p style="color:rgba(255,255,255,.8);font-size:16px;margin-top:8px">
          AI teams for small business — finance, HR, marketing and more.
        </p>
      </div>
      <div class="uc-grid">
        <div class="uc-card">
          <h3 class="h3" style="color:#fff">Finance Team</h3>
          <p style="color:rgba(255,255,255,.8);font-size:13px;margin-top:8px">Research Agent · Analysis Agent · Report Writer Agent</p>
          <blockquote class="uc-quote">"Every Monday, Sarah's Finance team delivers a competitor briefing — sourced, summarised, ready to share with clients."</blockquote>
        </div>
        <div class="uc-card">
          <h3 class="h3" style="color:#fff">HR Team</h3>
          <p style="color:rgba(255,255,255,.8);font-size:13px;margin-top:8px">Job Description Agent · Screening Agent · Interview Prep Agent</p>
          <blockquote class="uc-quote">"Marcus posted a role on Tuesday. By Wednesday morning, 3 shortlisted candidates were waiting in his inbox."</blockquote>
        </div>
        <div class="uc-card">
          <h3 class="h3" style="color:#fff">Personal Assistant</h3>
          <p style="color:rgba(255,255,255,.8);font-size:13px;margin-top:8px">Research Agent · Summariser Agent · Task Tracker Agent</p>
          <blockquote class="uc-quote">"Every morning at 7am, the brief is ready. What happened, what's next, what's done."</blockquote>
        </div>
      </div>
      <div style="text-align:center;margin-top:40px">
        <a href="/use-cases" class="btn btn-secondary">See all use cases →</a>
      </div>
    </div>
  </section>

  <!-- PROOF / FEATURES -->
  <section class="s-white">
    <div class="container section-pad">
      <div class="section-header section-header--center">
        <h2 class="h2">The building blocks</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <!-- Icon: layout-dashboard -->
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <h3 class="h3">Canvas</h3>
          <p>Your visual workspace. The org chart of your AI team.</p>
        </div>
        <div class="feature-card">
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <h3 class="h3">Agent</h3>
          <p>An AI collaborator with a role, tools, and instructions you define.</p>
        </div>
        <div class="feature-card">
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <h3 class="h3">Team</h3>
          <p>Agents working together toward a shared goal.</p>
        </div>
        <div class="feature-card">
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <h3 class="h3">Team Studio</h3>
          <p>The editor where you compose and configure your teams.</p>
        </div>
        <div class="feature-card">
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <h3 class="h3">Synergi</h3>
          <p>Pre-built team templates. Ready to deploy, yours to customise.</p>
        </div>
        <div class="feature-card">
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></svg>
          <h3 class="h3">BYOK</h3>
          <p>Bring your own API key. Pay Anthropic or OpenAI directly — we never touch your tokens.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING RÉSUMÉ -->
  <section class="s-indigo">
    <div class="container section-pad">
      <div class="section-header section-header--center">
        <h2 class="h2" style="color:#fff">Simple, transparent pricing.</h2>
      </div>
      <div class="pricing-mini-grid">
        <div class="pricing-mini-card pricing-mini-card--free">
          <div class="label" style="color:var(--color-success)">Free</div>
          <h3 class="h3" style="color:#fff;margin-top:8px">Open source · Self-host · Docker</h3>
          <a href="https://github.com/agentivity-labs/agentivity" target="_blank" rel="noopener" class="btn btn-outline-dark" style="margin-top:20px">⭐ Star on GitHub</a>
        </div>
        <div class="pricing-mini-card pricing-mini-card--cloud">
          <div class="label" style="color:var(--orange)">Personal · Pro · Business</div>
          <h3 class="h3" style="color:#fff;margin-top:8px">Cloud · No setup needed</h3>
          <a href="#waitlist" class="btn btn-primary" style="margin-top:20px">Join the waitlist</a>
        </div>
        <div class="pricing-mini-card pricing-mini-card--enterprise">
          <div class="label" style="color:rgba(255,255,255,.5)">Enterprise</div>
          <h3 class="h3" style="color:#fff;margin-top:8px">SSO · On-premise · White-label</h3>
          <a href="mailto:hello@agentivity.io" class="btn btn-outline-dark" style="margin-top:20px">Contact us</a>
        </div>
      </div>
      <div style="text-align:center;margin-top:32px">
        <a href="/pricing" style="color:rgba(255,255,255,.6);font-size:13px;text-decoration:underline">See full pricing →</a>
      </div>
    </div>
  </section>

  <!-- CTA FINAL + WAITLIST -->
  <section class="s-dark">
    <div class="container section-pad" style="text-align:center">
      <h2 class="h2" style="color:#fff">Your team is ready to build.<br /><span class="grad-text">Start today.</span></h2>
      <p class="lead" style="color:rgba(255,255,255,.55);margin:16px auto 32px;text-align:center">
        Start with the open source version — or join the waitlist for cloud.
      </p>
      <WaitlistForm dark={true} />
      <p style="color:rgba(255,255,255,.35);font-size:12px;margin-top:12px">No spam. Just the important updates.</p>
    </div>
  </section>

  <Footer />
</Base>

<style>
/* Sections */
.s-hero  { background: var(--white); }
.s-navy  { background: var(--navy); }
.s-orange{ background: var(--orange); }
.s-white { background: var(--white); }
.s-indigo{ background: var(--indigo-dark); }
.s-dark  { background: var(--slate); }

.section-pad { padding: 80px 0; }
@media (max-width: 768px) { .section-pad { padding: 48px 0; } }

.section-header { margin-bottom: 48px; }
.section-header--center { text-align: center; }

/* Hero */
.hero-grid {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 48px;
  align-items: center;
  padding: 80px 48px;
  min-height: calc(100vh - 56px);
}
@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; padding: 48px 24px; min-height: unset; }
  .hero-canvas { display: none; }
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-orange-soft);
  color: var(--text-on-orange);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 20px;
}
.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--orange);
  flex-shrink: 0;
}

.hero-h1 { margin-bottom: 20px; }

.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.hero-microcopy {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 28px;
  font-style: italic;
}

.proof-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
}
.proof-sep { color: var(--border-light); }
.proof-open { color: var(--color-success); font-weight: 600; }
.proof-star { color: var(--orange); }
.proof-bar a { color: inherit; text-decoration: none; }

/* Hero canvas animation */
.hero-canvas { display: flex; align-items: center; justify-content: center; }
.canvas-frame {
  width: 320px;
  height: 280px;
  background: var(--bg-gray-light);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-screenshot);
  position: relative;
  overflow: hidden;
}

.canvas-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0;
  animation: nodeIn 0.4s ease-out forwards;
}
.canvas-node span { font-size: 11px; font-weight: 600; color: var(--navy); }
.node-dot {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--navy);
  border: 3px solid rgba(255,255,255,.9);
  box-shadow: 0 2px 8px rgba(27,47,78,.3);
}
.canvas-node--1 { left: 24px; top: 60px; animation-delay: .3s; }
.canvas-node--2 { left: 50%; transform: translateX(-50%); top: 60px; animation-delay: .7s; }
.canvas-node--3 { right: 24px; top: 60px; animation-delay: 1.1s; }

.canvas-conn {
  position: absolute;
  top: 78px;
  height: 2px;
  background: linear-gradient(90deg, var(--navy), var(--indigo));
  transform-origin: left;
  transform: scaleX(0);
  animation: connIn .3s ease-out forwards;
  border-radius: 2px;
}
.canvas-conn--1 { left: 72px; width: 80px; animation-delay: .9s; }
.canvas-conn--2 { left: 172px; width: 80px; animation-delay: 1.3s; }

.canvas-badge {
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-indigo-soft);
  color: var(--text-on-indigo);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  opacity: 0;
  animation: nodeIn .3s ease-out forwards;
  animation-delay: 1.5s;
}

.canvas-result {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid var(--border-light);
  padding: 8px 20px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  opacity: 0;
  box-shadow: var(--shadow-card);
  animation: nodeIn .4s ease-out forwards;
  animation-delay: 1.9s;
}
.result-check { color: var(--orange); font-size: 16px; }

@keyframes nodeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes connIn {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Steps */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.step-card {
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-lg);
  padding: 28px;
}
.step-num { margin-bottom: 12px; }
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }

/* Use cases */
.uc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.uc-card {
  background: rgba(255,255,255,.15);
  border-radius: var(--radius-lg);
  padding: 28px;
  backdrop-filter: blur(4px);
}
.uc-quote {
  font-style: italic;
  font-size: 13px;
  color: rgba(255,255,255,.75);
  margin-top: 16px;
  line-height: 1.6;
  border-left: 2px solid rgba(255,255,255,.3);
  padding-left: 12px;
}
@media (max-width: 768px) { .uc-grid { grid-template-columns: 1fr; } }

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.feature-card {
  background: var(--bg-gray-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 28px;
}
.feature-card h3 { color: var(--navy); margin: 12px 0 8px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.65; }
.feature-icon { margin-bottom: 4px; }
@media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }

/* Pricing mini */
.pricing-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.pricing-mini-card {
  border-radius: var(--radius-lg);
  padding: 28px;
}
.pricing-mini-card--free     { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); }
.pricing-mini-card--cloud    { background: rgba(255,77,31,.15);   border: 1px solid rgba(255,77,31,.3); }
.pricing-mini-card--enterprise{ background: rgba(79,70,229,.25);  border: 1px solid rgba(79,70,229,.4); }
@media (max-width: 768px) { .pricing-mini-grid { grid-template-columns: 1fr; } }
</style>
```

---

## 8. Page — How it works

**`src/pages/how-it-works.astro`**
```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---
<Base
  title="How Agentivity Works — Visual AI Team Builder"
  description="Build AI agent teams visually. No code. Compose agents, choose topologies, run your team. See how it works."
>
  <Nav currentPath="/how-it-works" />

  <!-- HERO -->
  <section class="page-hero s-white">
    <div class="container" style="padding-top:80px;padding-bottom:60px">
      <h1 class="h1">How Agentivity works.</h1>
      <p class="lead" style="margin-top:16px">You don't write code. You build a team.</p>
    </div>
  </section>

  <!-- MÉTAPHORE -->
  <section class="s-navy">
    <div class="container section-pad" style="text-align:center">
      <blockquote class="metaphor">
        Think of a finance team. One agent finds the data, one analyses it, one writes the report.
        They work in sequence, pass results along — and you receive the output, not the process.
        <br /><br />
        <strong style="color:#fff">That's Agentivity. You compose the team. They handle the rest.</strong>
      </blockquote>
    </div>
  </section>

  <!-- CANVAS -->
  <section class="s-white">
    <div class="container section-pad hiw-section">
      <div class="hiw-text">
        <h2 class="h2">The Canvas</h2>
        <p class="body" style="color:var(--text-secondary);margin-top:16px;max-width:480px">
          Your visual workspace. Place agents on it, choose how they're structured,
          see the whole team at a glance — who does what, in what order, and what they produce.
        </p>
      </div>
      <div class="hiw-media">
        <!-- TODO: remplacer par screenshot canvas -->
        <div class="screenshot-placeholder">
          <span>Canvas screenshot</span>
        </div>
      </div>
    </div>
  </section>

  <!-- AGENTS -->
  <section class="s-navy">
    <div class="container section-pad hiw-section hiw-section--rev">
      <div class="hiw-text">
        <h2 class="h2" style="color:#fff">Agents</h2>
        <p style="color:rgba(255,255,255,.65);margin-top:16px;max-width:480px;font-size:15px;line-height:1.65">
          Each agent has a role, a set of tools, and instructions you define.
          A Research Agent searches the web. An Analysis Agent reads the findings.
          A Writer Agent drafts the report.
        </p>
        <div class="example-block" style="margin-top:24px">
          <p class="label" style="color:var(--orange);margin-bottom:8px">Example</p>
          <p style="color:rgba(255,255,255,.8);font-size:14px;font-style:italic;line-height:1.6">
            Research Agent — "Find the top 5 competitor news items this week.
            Summarise each in 3 bullet points. Pass to Analysis Agent."
          </p>
        </div>
        <div class="honesty-block" style="margin-top:24px;background:rgba(255,255,255,.07);border-radius:var(--radius-md);padding:16px 20px;border-left:3px solid var(--orange)">
          <p style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.6">
            Configuring an agent takes care — a clear role, precise instructions, the right tools.
            It's low-code, not no-code. Builders love it.
          </p>
        </div>
      </div>
      <div class="hiw-media">
        <!-- TODO: screenshot config agent -->
        <div class="screenshot-placeholder screenshot-placeholder--dark">
          <span>Agent config screenshot</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TEAMS / TOPOLOGIES -->
  <section class="s-white">
    <div class="container section-pad">
      <h2 class="h2" style="margin-bottom:16px">Teams</h2>
      <p class="body" style="color:var(--text-secondary);max-width:600px;margin-bottom:48px">
        Choose your team structure. Sequential, collaborative, or manager-led — each topology defines
        how agents interact, pass information, and produce results together.
      </p>
      <div class="topology-grid">
        <div class="topology-card">
          <div class="topology-badge label" style="background:var(--bg-indigo-soft);color:var(--text-on-indigo)">Sequential</div>
          <p style="color:var(--text-secondary);font-size:14px;margin-top:12px">Agents hand off in a chain. A → B → C.</p>
        </div>
        <div class="topology-card">
          <div class="topology-badge label" style="background:var(--bg-orange-soft);color:var(--text-on-orange)">Group Chat</div>
          <p style="color:var(--text-secondary);font-size:14px;margin-top:12px">A manager agent coordinates the team dynamically.</p>
        </div>
        <div class="topology-card">
          <div class="topology-badge label" style="background:var(--bg-indigo-soft);color:var(--text-on-indigo)">Concurrent</div>
          <p style="color:var(--text-secondary);font-size:14px;margin-top:12px">Multiple agents work in parallel, results merged at the end.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- AGENTIC + DETERMINISTIC -->
  <section class="s-navy">
    <div class="container section-pad">
      <h2 class="h2" style="color:#fff;margin-bottom:16px">Agentic and deterministic — in one flow.</h2>
      <p style="color:rgba(255,255,255,.65);font-size:15px;max-width:580px;line-height:1.65;margin-bottom:40px">
        Some steps need intelligence — research, analyse, decide.
        Others need precision — send, log, publish, trigger.
        Agentivity handles both in the same flow.
      </p>
      <!-- TODO: SVG diagram onboarding flow -->
      <div class="flow-diagram">
        <div class="flow-item flow-item--trigger">New hire signed contract</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item flow-item--agentic">HR Team <span class="flow-tag">Agentic · Group Chat</span></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item flow-item--deter">Send welcome email <span class="flow-tag">Deterministic</span></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item flow-item--agentic">Budget & Procurement Team <span class="flow-tag">Agentic · Sequential</span></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item flow-item--deter">Create PO in system <span class="flow-tag">Deterministic</span></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item flow-item--done">Employee fully onboarded ✓</div>
      </div>
      <p style="color:rgba(255,255,255,.45);font-size:13px;font-style:italic;margin-top:24px">
        Most tools do one or the other. Agentivity does both.
      </p>
    </div>
  </section>

  <!-- SYNERGI -->
  <section class="s-white">
    <div class="container section-pad hiw-section">
      <div class="hiw-text">
        <h2 class="h2">Start faster with Synergi.</h2>
        <p class="body" style="color:var(--text-secondary);margin-top:16px;max-width:480px">
          Don't build from scratch. Synergi is Agentivity's template library — pre-built teams
          for finance, HR, marketing, and more. Pick a template, customise the instructions, run.
        </p>
        <a href="https://synergi.agentivity.io" target="_blank" rel="noopener" class="btn btn-secondary" style="margin-top:24px">Browse Synergi →</a>
      </div>
      <div class="hiw-media">
        <!-- TODO: screenshot Synergi -->
        <div class="screenshot-placeholder">
          <span>Synergi screenshot</span>
        </div>
      </div>
    </div>
  </section>

  <!-- BUILDER vs USER -->
  <section class="s-navy">
    <div class="container section-pad">
      <h2 class="h2" style="color:#fff;text-align:center;margin-bottom:48px">Who does what?</h2>
      <div class="role-grid">
        <div class="role-card">
          <div class="label" style="color:var(--orange);margin-bottom:12px">Builder</div>
          <p style="color:#fff;font-size:16px;font-weight:600;margin-bottom:8px">Configures agents, builds teams, connects tools.</p>
          <p style="color:rgba(255,255,255,.6);font-size:14px;line-height:1.65">Needs clear thinking, not Python. It's low-code.</p>
          <p style="color:rgba(255,255,255,.45);font-size:13px;font-style:italic;margin-top:12px">AI Specialists, consultants, ops leads.</p>
        </div>
        <div class="role-card">
          <div class="label" style="color:var(--indigo);margin-bottom:12px">User</div>
          <p style="color:#fff;font-size:16px;font-weight:600;margin-bottom:8px">Uses teams built by a Builder.</p>
          <p style="color:rgba(255,255,255,.6);font-size:14px;line-height:1.65">Launch, interact, read results. Truly no-code.</p>
          <p style="color:rgba(255,255,255,.45);font-size:13px;font-style:italic;margin-top:12px">Managers, solopreneurs, anyone with a team to run.</p>
        </div>
      </div>
      <p style="text-align:center;color:rgba(255,255,255,.5);font-size:14px;margin-top:32px;font-style:italic">
        You're both? Start as a Builder.
      </p>
    </div>
  </section>

  <!-- CTA -->
  <section class="s-dark">
    <div class="container section-pad" style="text-align:center">
      <h2 class="h2" style="color:#fff">Ready to build your first team?</h2>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:32px">
        <a href="https://github.com/agentivity-labs/agentivity" target="_blank" rel="noopener" class="btn btn-outline-dark">⭐ Star on GitHub</a>
        <a href="/#waitlist" class="btn btn-primary">Join the waitlist</a>
      </div>
    </div>
  </section>

  <Footer />
</Base>

<style>
.s-white { background: var(--white); }
.s-navy  { background: var(--navy); }
.s-dark  { background: var(--slate); }
.section-pad { padding: 80px 0; }
@media (max-width: 768px) { .section-pad { padding: 48px 0; } }

.metaphor {
  font-size: 18px;
  color: rgba(255,255,255,.7);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.75;
  font-style: italic;
}

.hiw-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.hiw-section--rev .hiw-text { order: 2; }
.hiw-section--rev .hiw-media { order: 1; }
@media (max-width: 768px) { .hiw-section { grid-template-columns: 1fr; } }

.screenshot-placeholder {
  background: var(--bg-gray-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 13px;
  font-style: italic;
}
.screenshot-placeholder--dark {
  background: rgba(255,255,255,.07);
  border-color: rgba(255,255,255,.15);
  color: rgba(255,255,255,.35);
}

.topology-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.topology-card {
  background: var(--bg-gray-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
}
.topology-badge { display: inline-block; padding: 4px 12px; border-radius: 999px; }
@media (max-width: 768px) { .topology-grid { grid-template-columns: 1fr; } }

/* Flow diagram */
.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 480px;
}
.flow-item {
  width: 100%;
  text-align: center;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.flow-item--trigger { background: rgba(255,255,255,.1); color: rgba(255,255,255,.7); }
.flow-item--agentic { background: rgba(79,70,229,.3);   color: #fff; border: 1px solid rgba(79,70,229,.5); }
.flow-item--deter   { background: rgba(22,163,74,.2);   color: rgba(255,255,255,.8); border: 1px solid rgba(22,163,74,.3); }
.flow-item--done    { background: rgba(255,77,31,.2);   color: #fff; border: 1px solid rgba(255,77,31,.4); justify-content: center; }
.flow-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; opacity: .7; }
.flow-arrow { color: rgba(255,255,255,.3); font-size: 20px; }

.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
}
.role-card {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-lg);
  padding: 28px;
}
@media (max-width: 768px) { .role-grid { grid-template-columns: 1fr; } }
</style>
```

---

## 9. Page — Pricing

**`src/pages/pricing.astro`**
```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import WaitlistForm from '../components/WaitlistForm.astro';

const plans = [
  {
    id: 'free',
    name: 'Free',
    status: '✅ Available',
    tagline: 'Self-host. Full control.',
    features: [
      'Open source · Docker',
      'Unlimited agents & teams',
      'Access to Synergi templates',
      'Community support (Discord)',
      'Bring your own API key',
    ],
    cta: { label: '⭐ Star on GitHub', href: 'https://github.com/agentivity-labs/agentivity', style: 'outline' },
    micro: 'Not on Docker yet? Cloud coming soon.',
    highlight: false,
  },
  {
    id: 'personal',
    name: 'Personal',
    status: '🔜 Coming soon',
    tagline: 'Cloud-hosted. No setup.',
    features: [
      'Everything in Free',
      'Cloud hosted — no Docker needed',
      'Single workspace',
      'Standard executions',
      'Email support',
      'Bring your own API key',
    ],
    cta: { label: 'Join the waitlist', href: '#waitlist', style: 'primary' },
    micro: 'First in, launch pricing.',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    status: '🔜 Most popular',
    tagline: 'More power. Same simplicity.',
    features: [
      'Everything in Personal',
      'More agents · More executions',
      'Advanced analytics',
      'Priority support',
      'Bring your own API key',
    ],
    cta: { label: 'Join the waitlist', href: '#waitlist', style: 'primary' },
    micro: 'First in, launch pricing.',
    highlight: true,
  },
  {
    id: 'business',
    name: 'Business',
    status: '🔜 Coming soon',
    tagline: 'Built for teams.',
    features: [
      'Everything in Pro',
      'Multiple workspaces',
      'Team management & collaboration',
      'Usage tracking per workspace',
      'Bring your own API key',
    ],
    cta: { label: 'Join the waitlist', href: '#waitlist', style: 'primary' },
    highlight: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    status: '🔜 Coming soon',
    tagline: 'Enterprise-grade.',
    features: [
      'Everything in Business',
      'SSO / SAML · On-premise option',
      'Advanced permissions & audit logs',
      'Budget management per team',
      'Optimised engine for high volumes',
      'Dedicated support · SLA',
      'White-label available',
    ],
    cta: { label: 'Contact us', href: 'mailto:hello@agentivity.io', style: 'outline' },
    micro: 'Onboarding sessions available for teams and agencies.',
    highlight: false,
  },
];

const faq = [
  { q: 'Is the Free plan really free?', a: 'Yes. Open source, self-hosted, no time limit. You need Docker and your own API key. That\'s it.' },
  { q: 'What\'s Docker?', a: 'A tool that runs Agentivity on your machine or server in one command. Full guide in the docs.' },
  { q: 'Do I need an API key?', a: 'Yes — for all plans. You connect your own key from Anthropic, OpenAI, or a compatible provider. We never touch your tokens or mark up your usage.' },
  { q: 'When do the cloud plans launch?', a: 'We\'re working on it. Join the waitlist — you\'ll be notified first and get access to launch pricing.' },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faq.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};
---
<Base
  title="Pricing — Agentivity"
  description="Open source at the core. Cloud when you need it. Self-host free, or join the waitlist for cloud plans. You always own your API keys."
  schema={schema}
>
  <Nav currentPath="/pricing" />

  <section class="s-white" style="padding:80px 0 48px">
    <div class="container" style="text-align:center">
      <h1 class="h1">Simple, transparent pricing.</h1>
      <p class="lead" style="margin:16px auto 0;text-align:center">
        Open source at the core. Cloud when you need it. You always own your API keys.
      </p>
    </div>
  </section>

  <section class="s-white" style="padding-bottom:80px">
    <div class="container">
      <div class="pricing-grid">
        {plans.map(plan => (
          <div class={`pricing-card ${plan.highlight ? 'pricing-card--hot' : ''}`}>
            <div class="pricing-card-top">
              <div class="label" style={plan.highlight ? 'color:var(--orange)' : 'color:var(--text-muted)'}>{plan.status}</div>
              <h2 class="h3" style="margin-top:8px">{plan.name}</h2>
              <p style="color:var(--text-secondary);font-size:14px;margin-top:4px">{plan.tagline}</p>
            </div>
            <ul class="pricing-features">
              {plan.features.map(f => (
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <div class="pricing-card-bottom">
              <a
                href={plan.cta.href}
                class={`btn ${plan.cta.style === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                style="width:100%;justify-content:center"
                {...(plan.cta.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
              >{plan.cta.label}</a>
              {plan.micro && <p class="pricing-micro">{plan.micro}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- BYOK -->
  <section class="s-navy">
    <div class="container section-pad" style="text-align:center;max-width:680px;margin:0 auto">
      <h3 class="h3" style="color:#fff">You control your API keys. Always.</h3>
      <p style="color:rgba(255,255,255,.65);font-size:15px;margin-top:12px;line-height:1.7">
        Agentivity doesn't provide or mark up LLM tokens. Connect your own Anthropic, OpenAI,
        or compatible API key — and pay your provider directly.
        <br /><strong style="color:#fff">Your data, your costs, your control.</strong>
      </p>
    </div>
  </section>

  <!-- LICENCE -->
  <section class="s-white">
    <div class="container section-pad" style="max-width:680px;margin:0 auto;text-align:center">
      <h3 class="h3">A word on our licence.</h3>
      <p style="color:var(--text-secondary);margin-top:12px;line-height:1.7">
        Agentivity is source-available under the Agentivity Sustainable Use Licence.
        The code is public and auditable. Free for personal and internal commercial use.
        <br />One limit: you can't use it to build a competing platform.
      </p>
      <a href="https://github.com/agentivity-labs/agentivity/blob/main/LICENCE.md" target="_blank" rel="noopener" class="btn btn-outline-indigo" style="margin-top:20px">Read the full licence →</a>
    </div>
  </section>

  <!-- FAQ -->
  <section class="s-navy">
    <div class="container section-pad" style="max-width:680px;margin:0 auto">
      <h2 class="h2" style="color:#fff;text-align:center;margin-bottom:40px">FAQ</h2>
      <dl class="faq-list">
        {faq.map(item => (
          <div class="faq-item">
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section class="s-dark">
    <div class="container section-pad" style="text-align:center">
      <h2 class="h2" style="color:#fff">The cloud is coming.</h2>
      <p style="color:rgba(255,255,255,.55);margin:12px auto 32px;font-size:15px">
        Join the list — first in, launch pricing, no spam.
      </p>
      <WaitlistForm dark={true} />
      <p style="color:rgba(255,255,255,.3);font-size:12px;margin-top:12px">We'll only reach out when it matters.</p>
    </div>
  </section>

  <Footer />
</Base>

<style>
.s-white { background: var(--white); }
.s-navy  { background: var(--navy); }
.s-dark  { background: var(--slate); }
.section-pad { padding: 80px 0; }

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
@media (max-width: 1100px) { .pricing-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .pricing-grid { grid-template-columns: 1fr; } }

.pricing-card {
  background: var(--bg-gray-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pricing-card--hot {
  background: rgba(255,77,31,.06);
  border-color: rgba(255,77,31,.3);
  box-shadow: 0 4px 24px rgba(255,77,31,.08);
}
.pricing-card-top {}
.pricing-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}
.pricing-features li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}
.pricing-features svg { flex-shrink: 0; margin-top: 2px; }
.pricing-card-bottom {}
.pricing-micro {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
  text-align: center;
  margin-top: 8px;
}

.faq-list { display: flex; flex-direction: column; gap: 24px; }
.faq-item dt { color: #fff; font-size: 16px; font-weight: 600; margin-bottom: 6px; }
.faq-item dd { color: rgba(255,255,255,.6); font-size: 14px; line-height: 1.7; }
</style>
```

---

## 10. Pages Compare (dynamiques)

Les 3 pages compare partagent le même layout. On crée un composant réutilisable.

**`src/components/ComparePage.astro`**
```astro
---
export interface Props {
  title: string;
  description: string;
  schema: object;
  competitor: string;
  h1: string;
  summary: string;
  summaryB: string;
  tableRows: Array<{ feature: string; competitor: string | boolean; agentivity: string | boolean }>;
  whenCompetitor: string[];
  whenAgentivity: string[];
  internalLinks: Array<{ anchor: string; href: string }>;
}
const { title, description, schema, competitor, h1, summary, summaryB, tableRows, whenCompetitor, whenAgentivity, internalLinks } = Astro.props;

function renderBool(val: string | boolean) {
  if (val === true)  return '<span style="color:var(--color-success);font-size:16px">✅</span>';
  if (val === false) return '<span style="color:#EF4444;font-size:16px">❌</span>';
  return String(val);
}
---
<!-- import is done in the calling page -->
<section class="s-white" style="padding:80px 0 48px">
  <div class="container" style="max-width:820px">
    <div class="compare-breadcrumb label" style="color:var(--text-muted);margin-bottom:16px">
      <a href="/">Home</a> › Compare
    </div>
    <h1 class="h1">{h1}</h1>
  </div>
</section>

<section class="s-navy">
  <div class="container section-pad" style="max-width:820px">
    <div class="compare-summary">
      <p>{summary}</p>
      <p style="margin-top:16px">{summaryB}</p>
    </div>
  </div>
</section>

<section class="s-white">
  <div class="container section-pad" style="max-width:820px">
    <h2 class="h2" style="margin-bottom:32px">{competitor} vs Agentivity — at a glance</h2>
    <div class="compare-table-wrapper">
      <table class="compare-table">
        <thead>
          <tr>
            <th></th>
            <th>{competitor}</th>
            <th style="color:var(--navy)">Agentivity</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map(row => (
            <tr>
              <td class="feature-col">{row.feature}</td>
              <td set:html={renderBool(row.competitor)} />
              <td set:html={renderBool(row.agentivity)} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="s-navy">
  <div class="container section-pad">
    <div class="when-grid">
      <div class="when-card">
        <h3 class="h3" style="color:#fff;margin-bottom:20px">When to choose {competitor}</h3>
        <ul>
          {whenCompetitor.map(item => <li set:html={item} />)}
        </ul>
      </div>
      <div class="when-card when-card--agentivity">
        <h3 class="h3" style="color:#fff;margin-bottom:20px">When to choose Agentivity</h3>
        <ul>
          {whenAgentivity.map(item => <li set:html={item} />)}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- internal links -->
<section class="s-white" style="padding:48px 0">
  <div class="container" style="display:flex;gap:24px;flex-wrap:wrap">
    {internalLinks.map(link => (
      <a href={link.href} class="compare-link">{link.anchor} →</a>
    ))}
  </div>
</section>

<section class="s-dark">
  <div class="container section-pad" style="text-align:center">
    <h2 class="h2" style="color:#fff">Ready to build your first <span class="grad-text">AI team?</span></h2>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:32px">
      <a href="https://github.com/agentivity-labs/agentivity" target="_blank" rel="noopener" class="btn btn-outline-dark">⭐ Star on GitHub</a>
      <a href="/#waitlist" class="btn btn-primary">Join the waitlist</a>
    </div>
  </div>
</section>

<style>
.s-white { background: var(--white); }
.s-navy  { background: var(--navy); }
.s-dark  { background: var(--slate); }
.section-pad { padding: 80px 0; }

.compare-breadcrumb a { color: inherit; text-decoration: none; }
.compare-summary p { color: rgba(255,255,255,.7); font-size: 16px; line-height: 1.75; }

.compare-table-wrapper { overflow-x: auto; }
.compare-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.compare-table th { text-align: left; padding: 10px 16px; background: var(--bg-gray-light); font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); border-bottom: 2px solid var(--border-light); }
.compare-table td { padding: 12px 16px; border-bottom: 1px solid var(--border-light); color: var(--text-secondary); }
.feature-col { color: var(--text-primary); font-weight: 500; }
.compare-table tr:hover td { background: var(--bg-gray-light); }

.when-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 820px; margin: 0 auto; }
.when-card { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: var(--radius-lg); padding: 28px; }
.when-card--agentivity { border-color: rgba(255,77,31,.3); background: rgba(255,77,31,.1); }
.when-card ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.when-card li { color: rgba(255,255,255,.7); font-size: 14px; line-height: 1.5; padding-left: 16px; position: relative; }
.when-card li::before { content: '→'; position: absolute; left: 0; color: var(--orange); }
@media (max-width: 768px) { .when-grid { grid-template-columns: 1fr; } }

.compare-link { color: var(--navy); font-size: 14px; font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--border-light); padding-bottom: 2px; }
.compare-link:hover { border-color: var(--navy); }
</style>
```

**`src/pages/compare/agentivity-vs-n8n.astro`**
```astro
---
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import ComparePage from '../../components/ComparePage.astro';

const schema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is Agentivity a replacement for n8n?", "acceptedAnswer": { "@type": "Answer", "text": "Not a direct replacement. n8n excels at deterministic workflow automation with 400+ integrations. Agentivity is built for composing AI agent teams with collaborative topologies." } },
    { "@type": "Question", "name": "Does Agentivity support self-hosting like n8n?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Agentivity is open source and runs on Docker Compose. Free to self-host with no usage cap." } }
  ]
};

const tableRows = [
  { feature: 'Interface',       competitor: 'Workflow canvas (nodes)',           agentivity: 'Team canvas (agents)' },
  { feature: 'Paradigm',        competitor: 'Deterministic first',               agentivity: 'Agentic + deterministic hybrid' },
  { feature: 'Multi-agent',     competitor: 'Via sub-workflows',                 agentivity: 'Native — built-in topologies' },
  { feature: 'Topologies',      competitor: 'Sequential',                        agentivity: 'Sequential, Concurrent, Group Chat, Handoff' },
  { feature: 'Open source',     competitor: true,                                agentivity: true },
  { feature: 'Self-hosted',     competitor: true,                                agentivity: true },
  { feature: 'BYOK',            competitor: true,                                agentivity: true },
  { feature: 'Templates',       competitor: 'Workflow templates',                agentivity: 'Synergi — pre-built teams' },
  { feature: 'Target audience', competitor: 'Developers & ops',                  agentivity: 'Builders + non-technical end-users' },
  { feature: 'White-label',     competitor: false,                               agentivity: '✅ Enterprise' },
];
---
<Base
  title="Agentivity vs n8n — The AI Team Builder Alternative"
  description="n8n automates workflows. Agentivity builds AI teams. Visual canvas, team topologies, agentic + deterministic — open source and self-hosted."
  schema={schema}
>
  <Nav />
  <ComparePage
    title="Agentivity vs n8n"
    description=""
    schema={schema}
    competitor="n8n"
    h1="Agentivity vs n8n — When workflows aren't enough."
    summary="n8n is excellent for automating technical workflows — connecting apps, triggering actions, orchestrating APIs."
    summaryB="Agentivity is built for composing AI agent teams — collaborators with roles, that make decisions, and produce results together. They don't do the same thing."
    tableRows={tableRows}
    whenCompetitor={[
      "You need 400+ integrations (n8n has them — we don't, at this stage)",
      "Your need is primarily deterministic — triggers, conditions, data plumbing",
      "You have a technical team that wants a visual scripting platform",
      "You already have working n8n workflows you're happy with",
    ]}
    whenAgentivity={[
      "You want agents that <strong style='color:#fff'>collaborate</strong> — not just chain",
      "You're building a Finance team, HR team, personal assistant — not a pipeline",
      "You want to mix agentic AND deterministic steps in the same flow",
      "You want non-technical clients to use the teams you build",
      "You need white-label to offer AI solutions under your own brand",
    ]}
    internalLinks={[
      { anchor: 'How Agentivity works', href: '/how-it-works' },
      { anchor: 'See pricing', href: '/pricing' },
      { anchor: 'Compare with Dify', href: '/compare/agentivity-vs-dify' },
      { anchor: 'Compare with Make', href: '/compare/agentivity-vs-make' },
    ]}
  />
  <Footer />
</Base>
```

> **Même structure** pour `agentivity-vs-dify.astro` et `agentivity-vs-make.astro` — adapter `competitor`, `h1`, `summary`, `tableRows`, `when*` depuis les SEO specs correspondantes.

---

## 11. Page — Docs

**`src/pages/docs.astro`**
```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

const steps = [
  {
    num: 1,
    title: 'Prerequisites',
    code: `Docker installed → docker.com\nYour API key ready (Anthropic, OpenAI, or compatible)`,
    lang: 'bash',
  },
  {
    num: 2,
    title: 'Clone',
    code: `git clone https://github.com/agentivity-labs/agentivity\ncd agentivity`,
    lang: 'bash',
  },
  {
    num: 3,
    title: 'Configure',
    code: `cp .env.example .env\n# Open .env and add your API key:\n# ANTHROPIC_API_KEY=your_key_here`,
    lang: 'bash',
  },
  {
    num: 4,
    title: 'Run',
    code: `docker compose up`,
    lang: 'bash',
  },
  {
    num: 5,
    title: 'Open',
    code: `http://localhost:3000`,
    lang: '',
  },
];
---
<Base
  title="Docs — Up and running in 5 minutes | Agentivity"
  description="Self-host Agentivity with Docker. Clone, configure, run. No cloud required."
>
  <Nav currentPath="/docs" />

  <section style="background:var(--white);padding:80px 0 48px">
    <div class="container" style="max-width:760px">
      <h1 class="h1">Up and running in 5 minutes.</h1>
      <p class="lead" style="margin-top:16px">Self-host Agentivity with Docker. No cloud required.</p>
    </div>
  </section>

  <section style="background:var(--white);padding-bottom:80px">
    <div class="container" style="max-width:760px">
      <h2 class="h2" style="margin-bottom:40px">Quickstart</h2>
      <div class="steps">
        {steps.map(step => (
          <div class="step">
            <div class="step-header">
              <span class="step-num label">Step {step.num}</span>
              <h3 class="h3">{step.title}</h3>
            </div>
            <div class="code-block">
              <pre><code class="mono">{step.code}</code></pre>
              <button class="copy-btn label" data-code={step.code} aria-label="Copy">Copy</button>
            </div>
          </div>
        ))}
        <div class="step-done">
          <p style="color:var(--navy);font-size:16px;font-weight:600">That's it. Your Agentivity instance is running. 🎉</p>
        </div>
      </div>
    </div>
  </section>

  <section style="background:var(--navy);padding:64px 0">
    <div class="container" style="max-width:760px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
      <div class="docs-card">
        <h3 class="h3" style="color:#fff">Full documentation on GitHub</h3>
        <p style="color:rgba(255,255,255,.6);font-size:14px;margin-top:8px">Architecture, advanced configuration, environment variables, topology guides, and use case walkthroughs.</p>
        <a href="https://github.com/agentivity-labs/agentivity#readme" target="_blank" rel="noopener" class="btn btn-outline-dark" style="margin-top:20px">Open the README →</a>
      </div>
      <div class="docs-card">
        <h3 class="h3" style="color:#fff">Stuck? Join the community.</h3>
        <p style="color:rgba(255,255,255,.6);font-size:14px;margin-top:8px">Ask a question, share what you're building, follow the updates.</p>
        <a href="#" class="btn btn-primary" style="margin-top:20px">Join the community →</a>
      </div>
    </div>
  </section>

  <Footer />
</Base>

<style>
.steps { display: flex; flex-direction: column; gap: 32px; }
.step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.step-num { color: var(--orange); }
.code-block {
  background: var(--slate);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  position: relative;
}
.code-block pre { color: rgba(255,255,255,.85); overflow-x: auto; }
.copy-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: rgba(255,255,255,.1);
  color: rgba(255,255,255,.6);
  border: none;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  transition: background 150ms;
}
.copy-btn:hover { background: rgba(255,255,255,.2); color: #fff; }
.step-done { background: var(--bg-indigo-soft); border-radius: var(--radius-md); padding: 20px 24px; border-left: 3px solid var(--indigo); }
.docs-card { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: var(--radius-lg); padding: 28px; }
@media (max-width: 768px) { .docs-grid { grid-template-columns: 1fr; } }
</style>

<script>
// Copy button logic
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code') || '';
    await navigator.clipboard.writeText(code);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
});
</script>
```

---

## 12. Fichiers de contenu JSON

**`src/content/en/home.json`** — extrait type
```json
{
  "meta": {
    "title": "Build Your AI Team — Visual, Open Source | Agentivity",
    "description": "Compose AI agent teams visually. No code. Finance, HR, marketing teams built in minutes."
  },
  "hero": {
    "pill": "Open source · Available now",
    "h1_line1": "Build your AI team.",
    "h1_line2": "A finance team, an HR team, a personal assistant.",
    "subhead": "Drag agents onto your canvas, connect them. They collaborate, deliver — while you sleep.",
    "cta_primary": "Join the waitlist",
    "cta_secondary": "⭐ Star on GitHub",
    "microcopy": "Cloud version coming soon."
  },
  "proof_bar": [
    "Stars on GitHub",
    "Open source · free to self-host",
    "Docker-ready · up in minutes",
    "Bring your own API key"
  ]
}
```

> Pour multilingue v2 : dupliquer `/en/` → `/fr/` et traduire les valeurs JSON. Astro i18n routing gérera `/fr/` automatiquement.

---

## 13. Configuration finale Netlify

**`netlify.toml`** (complet)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

# Redirects pour i18n v2 (préparer maintenant)
# [[redirects]]
#   from = "/fr/*"
#   to = "/fr/:splat"
#   status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 14. Checklist avant mise en ligne

### Assets à remplacer (🔴 bloquants)
- [ ] `/public/logo.svg` — logo Agentivity (navy, SVG original)
- [ ] `/public/favicon.svg` — version 'a' avec 3 points
- [ ] `/public/og-default.png` — OG image 1200×630
- [ ] Screenshots produit × 4 (canvas, agent config, résultat, Synergi) → remplacer les `screenshot-placeholder`
- [ ] GitHub stars badge → lien API GitHub `https://img.shields.io/github/stars/agentivity-labs/agentivity`
- [ ] Discord invite URL → mettre dans Footer et docs card

### Tests à faire
- [ ] Lighthouse 95+ sur home (mobile + desktop)
- [ ] Form waitlist → vérifier dashboard Netlify Forms après premier test
- [ ] Tous les `href="#waitlist"` scrollent bien jusqu'au formulaire
- [ ] Responsive : nav hamburger, hero 1-col, grilles 1-col
- [ ] Copy-button docs fonctionne (HTTPS uniquement — ok sur Netlify)
- [ ] `sitemap.xml` généré → soumettre Google Search Console

### SEO
- [ ] Google Search Console — propriété vérifiée sur agentivity.io
- [ ] Sitemap soumis
- [ ] Robots.txt sans blocage (Astro génère `/robots.txt` automatiquement avec `@astrojs/sitemap`)

---

## Handoff

> **Agent 07 · Build — terminé.**
> Tous les fichiers de code sont prêts à être créés dans `/src`.
> Prochaine étape : créer le projet Astro, copier les composants ci-dessus, intégrer les assets visuels.
> 🔴 Bloquant avant mise en ligne : logo SVG + screenshots produit.
