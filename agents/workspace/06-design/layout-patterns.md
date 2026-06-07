# Layout Patterns — Agentivity Secondary Pages

Reference for implementing advanced layout patterns across how-it-works, use-cases, pricing, and other secondary pages.

---

## 1. Sticky Scroll

**CSS technique:** `position: sticky` + scroll-driven section transitions  
**Best use case:** How-It-Works page — pin a step label or diagram while prose scrolls past it, letting users read at their own pace without losing context.

```css
.sticky-panel {
  position: sticky;
  top: 6rem;
  height: fit-content;
}

.scroll-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
```

---

## 2. Bento Grid

**CSS technique:** `display: grid` with explicit `grid-column` / `grid-row` spans  
**Best use case:** Use-Cases or Features page — showcase 4–6 capability tiles of varying sizes that communicate hierarchy without a list.

```css
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 14rem;
  gap: 1rem;
}

.bento__hero   { grid-column: span 4; grid-row: span 2; }
.bento__tall   { grid-column: span 2; grid-row: span 2; }
.bento__wide   { grid-column: span 3; }
.bento__small  { grid-column: span 2; }
```

---

## 3. Oversized Decorative Type

**CSS technique:** `font-size: clamp()` + `overflow: hidden` on the parent, text used as background texture  
**Best use case:** Section dividers or hero eyebrows — "AUTOMATE", "AGENTS", or section numbers rendered at 15–20rem as watermark-style decoration behind content.

```css
.deco-text {
  font-size: clamp(6rem, 18vw, 16rem);
  font-weight: 900;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px hsl(var(--brand) / 0.15);
  user-select: none;
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  overflow: hidden;
}
```

---

## 4. Full-Bleed Section with Overlay Text

**CSS technique:** `min-height: 100svh` container, `background-image` or `<video>`, content in a centered `z-index` layer with a gradient scrim  
**Best use case:** Pricing page hero or a Use-Cases testimonial break — high-impact visual pause between dense content sections.

```css
.full-bleed {
  position: relative;
  min-height: 60svh;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.full-bleed__bg {
  position: absolute;
  inset: 0;
  background: url('/assets/mesh.webp') center / cover no-repeat;
}

.full-bleed__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, hsl(220 20% 4% / 0.4), hsl(220 20% 4% / 0.85));
}

.full-bleed__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 48rem;
  padding-inline: var(--page-gutter);
}
```

---

## 5. Split-Screen (Half Dark / Half Light)

**CSS technique:** `display: grid; grid-template-columns: 1fr 1fr` with each column carrying its own background  
**Best use case:** How-It-Works comparison sections — "before automation" (light, cluttered) vs. "after Agentivity" (dark, clean).

```css
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 70svh;
}

.split__dark {
  background: hsl(220 20% 6%);
  color: hsl(0 0% 95%);
  padding: 5rem var(--page-gutter);
}

.split__light {
  background: hsl(220 15% 96%);
  color: hsl(220 20% 10%);
  padding: 5rem var(--page-gutter);
}

@media (max-width: 768px) {
  .split { grid-template-columns: 1fr; }
}
```

---

## 6. Vertical Timeline with Glowing Line

**CSS technique:** Pseudo-element center line + `box-shadow` glow, flex column with alternating left/right cards  
**Best use case:** How-It-Works step sequence or onboarding journey — communicates ordered progression without a numbered list.

```css
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-inline: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: hsl(var(--brand) / 0.3);
  box-shadow: 0 0 12px 2px hsl(var(--brand) / 0.5);
  transform: translateX(-50%);
}

.timeline__item {
  width: 45%;
  background: hsl(220 20% 9%);
  border: 1px solid hsl(var(--brand) / 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.timeline__item:nth-child(even) { align-self: flex-end; }
```

---

## 7. Floating / Overlapping Cards

**CSS technique:** `position: relative` on a wrapper, children use negative `margin-top` or `translate` to overlap; `z-index` stacking on hover  
**Best use case:** Use-Cases page feature cluster or testimonials — creates visual depth and draws the eye without a grid.

```css
.card-stack {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.card-stack .card {
  position: relative;
  margin-top: -2rem;
  transition: transform 200ms ease, z-index 0s;
  z-index: 1;
  border-radius: 1rem;
  padding: 2rem;
  background: hsl(220 20% 10%);
  border: 1px solid hsl(220 20% 20%);
}

.card-stack .card:first-child { margin-top: 0; }

.card-stack .card:hover {
  transform: translateY(-0.5rem) scale(1.01);
  z-index: 10;
}
```

---

## 8. Asymmetric Magazine Grid

**CSS technique:** Named `grid-template-areas` with intentionally unequal column weights and row spans  
**Best use case:** Use-Cases landing or a resource/blog index — breaks the uniform-card monotony and signals editorial quality.

```css
.mag-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "lead  side1 side2"
    "lead  side3 side3";
  gap: 1rem;
}

.mag-grid__lead  { grid-area: lead;  }
.mag-grid__side1 { grid-area: side1; }
.mag-grid__side2 { grid-area: side2; }
.mag-grid__side3 { grid-area: side3; }

@media (max-width: 900px) {
  .mag-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "lead  lead"
      "side1 side2"
      "side3 side3";
  }
}
```
