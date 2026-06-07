# Copy — Docs `/docs`
> Agent 04 · Copywriter — 2026-06-05

---

## PAGE HERO

**H1 :** Up and running in 5 minutes.

**Subhead :** Self-host Agentivity with Docker. No cloud required.

---

## QUICKSTART

**H2 :** Quickstart

*5 étapes. Chaque bloc a un bouton copier. Aucune étape conditionnelle — les variantes (Windows, ARM) sont dans le README.*

---

**Step 1 — Prerequisites**

```
Docker installed → docker.com
Your API key ready (Anthropic, OpenAI, or compatible)
```

---

**Step 2 — Clone**

```bash
git clone https://github.com/agentivity-labs/agentivity
cd agentivity
```

---

**Step 3 — Configure**

```bash
cp .env.example .env
# Open .env and add your API key:
# ANTHROPIC_API_KEY=your_key_here
```

---

**Step 4 — Run**

```bash
docker compose up
```

---

**Step 5 — Open**

```
http://localhost:3000
```

> That's it. Your Agentivity instance is running.

---

**⚠️ Note pour le build :** Ces 5 commandes doivent fonctionner sur une machine propre avant le lancement. Tester sur Mac, Linux, et Windows. Un quickstart cassé est le kill factor numéro un de cette page.

---

## CARD README

**Titre :** Full documentation on GitHub

**Description :** Architecture, advanced configuration, environment variables, topology guides, and use case walkthroughs.

**CTA :** `Open the README →`
*(lien : https://github.com/agentivity-labs/agentivity#readme)*

---

## CARD DISCORD

**Titre :** Stuck? Join the community.

**Description :** Ask a question, share what you're building, follow the updates.

**CTA :** `Join the community →`
*(lien Discord — à ajouter)*

---

## Résumé structure

```
Hero (H1 + 1 ligne)
  ↓
Quickstart 5 étapes (blocs code copiables)
  ↓
Card README GitHub
  ↓
Card Discord
```
