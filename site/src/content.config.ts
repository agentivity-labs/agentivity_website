import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { BLOG_TAGS } from './lib/blog';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    // Set when an article is rewritten: shown next to the date and given to search engines as dateModified.
    updated:     z.coerce.date().optional(),
    author:      z.string().default('Agentivity Team'),
    tags:        z.array(z.enum(BLOG_TAGS)).default([]),
    // The small image of the article in the blog index, 800 x 500; also its preview when shared, without an image of its own.
    thumb:       z.string().optional(),
    // The id of its Template on Synergi, when there is one: the article then links to it.
    template:    z.string().optional(),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
    lang:        z.enum(['en', 'fr']).default('en'),
    draft:       z.boolean().default(false),
    faq:         z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

// The documentation: generated from the agentivity_docs project (see agentivity_docs/tools/docs.mjs), never edited here.
const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

// Landing pages: one file per page and per language, src/content/landings/<lang>/<slug>.yaml, served at /lp/<slug>
// (and /fr/lp/<slug> once a French route exists). A page is a list of sections, drawn by LandingPage.astro.
// New one: node tools/landing.mjs new <slug>. Check them all: node tools/landing.mjs check.
const action = z.object({ label: z.string(), href: z.string(), github: z.boolean().default(false) });
const clip = z.object({
  title: z.string(),
  body: z.string(),
  video: z.string(),
  poster: z.string(),
  alt: z.string(),
  width: z.number().default(1280),
  height: z.number().default(640),
});
const section = z.discriminatedUnion('type', [
  z.object({ type: z.literal('banner'), text: z.string(), detail: z.string().optional() }),
  z.object({
    type: z.literal('hero'),
    eyebrow: z.string().optional(),
    title: z.string(),
    accent: z.string().optional(),
    sub: z.string(),
    // The sign-up form right in the hero: the main action of most landing pages, seen without scrolling.
    form: z.object({ submit: z.string(), fine: z.string().optional() }).optional(),
    primary: action.optional(),
    secondary: action.optional(),
    note: z.string().optional(),
    film: z.object({ video: z.string(), poster: z.string(), alt: z.string() }).optional(),
  }),
  // A block of the home page, drawn from the translation files: the fixed wording stays in one place.
  z.object({ type: z.literal('home'), block: z.enum(['values', 'ladder']) }),
  z.object({
    type: z.literal('offer'),
    id: z.string().default('offer'),
    eyebrow: z.string().optional(),
    title: z.string(),
    accent: z.string().optional(),
    items: z.array(z.object({ title: z.string(), body: z.string(), action: action.optional() })).min(1),
    fine: z.string().optional(),
  }),
  z.object({
    type: z.literal('clips'),
    eyebrow: z.string().optional(),
    title: z.string(),
    accent: z.string().optional(),
    sub: z.string().optional(),
    note: z.string().optional(),
    items: z.array(clip).min(1),
  }),
  z.object({
    type: z.literal('steps'),
    eyebrow: z.string().optional(),
    title: z.string(),
    accent: z.string().optional(),
    items: z.array(z.object({ title: z.string(), body: z.string(), command: z.string().optional() })).min(1),
    link: action.optional(),
  }),
  z.object({ type: z.literal('faq'), eyebrow: z.string().optional(), title: z.string(), items: z.array(z.object({ q: z.string(), a: z.string() })).min(1) }),
  z.object({
    type: z.literal('cta'),
    id: z.string().default('cta'),
    title: z.string(),
    accent: z.string().optional(),
    sub: z.string().optional(),
    submit: z.string().optional(),
    fine: z.string().optional(),
    secondary: action.optional(),
  }),
]);
const landings = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/landings' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(160),
    // Campaign pages are not indexed by default: they repeat the site, for one audience at a time.
    noindex: z.boolean().default(true),
    ogImage: z.string().optional(),
    header: z.object({ label: z.string(), href: z.string() }),
    sections: z.array(section).min(1),
  }),
});

// A case file of the Services section, shown at /services/work/<file name>: a concept or a client mission, how it was designed,
// its mockup, its team and its tests. One JSON file per case; the pages and their components are the same for all. Every
// section but the hero is optional.
const titled = { title: z.string(), lead: z.string().optional() };
const link = z.object({ label: z.string(), href: z.string() });
const cases = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/cases' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(160),
    ogImage: z.string().optional(),
    // "Concept": built to show an idea; "Client mission": real work for a client, explained with its agreement.
    type: z.enum(['Concept', 'Client mission']),
    name: z.string(),
    kind: z.string(),
    // One or two sentences for the list of case files.
    summary: z.string(),
    h1: z.string(),
    h1_accent: z.string(),
    lead: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    disclaimer: z.string().optional(),
    stages: z.object({ ...titled, items: z.array(z.object({ name: z.string(), body: z.string() })) }).optional(),
    mockup: z.object({
      ...titled,
      // A page of its own under public/, shown in the page in a frame; never linked as such.
      src: z.string().startsWith('/'),
      label: z.string(),
      width: z.number(),
      height: z.number(),
      screens: z.array(z.object({ label: z.string(), query: z.string() })).default([]),
    }).optional(),
    modes: z.object({
      ...titled,
      items: z.array(z.object({ label: z.string(), meaning: z.string(), ink: z.string(), tint: z.string() })),
      // Design decisions that follow from the modes, under their own small heading.
      decisions_title: z.string().optional(),
      // `mode`, when one applies, is a label of `items`: the decision's card takes its tint.
      decisions: z.array(z.object({ title: z.string(), text: z.string(), mode: z.string().optional() })).default([]),
    }).optional(),
    moments: z.object({
      ...titled,
      cards_title: z.string().optional(),
      cards: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      head: z.tuple([z.string(), z.string()]),
      rows: z.array(z.tuple([z.string(), z.string()])),
    }).optional(),
    journeys: z.object({
      ...titled,
      // A step's mode is one of the labels in `modes`; its screen, one of the ids in `canvas.screens`.
      items: z.array(z.object({
        name: z.string(),
        when: z.string(),
        steps: z.array(z.object({ mode: z.string(), text: z.string(), screen: z.string().optional() })),
        tested: z.string().optional(),
      })),
    }).optional(),
    // The map of the app's screens: each a live miniature of the mockup (its `src` with ?screen=<id>&embed=1), placed at x, y.
    // The arrows come from the journeys: one step's screen to the next one's.
    canvas: z.object({
      ...titled,
      screens: z.array(z.object({ id: z.string(), name: z.string(), mode: z.string(), x: z.number(), y: z.number() })),
    }).optional(),
    team: z.object({ ...titled, members: z.array(z.object({ name: z.string(), role: z.string() })), rules: z.array(z.string()).default([]) }).optional(),
    widgets: z.object({ ...titled, items: z.array(z.object({ name: z.string(), body: z.string() })) }).optional(),
    catalogue: z.object({
      ...titled,
      groups: z.array(z.object({ pattern: z.string(), exercises: z.array(z.string()) })),
      rules_title: z.string().optional(),
      rules_lead: z.string().optional(),
      rules: z.array(z.object({ family: z.string(), rule: z.string() })).default([]),
    }).optional(),
    tests: z.object({
      ...titled,
      items: z.array(z.object({ case: z.string(), result: z.string() })),
      limits_title: z.string().optional(),
      limits: z.array(z.string()).default([]),
    }).optional(),
    links: z.object({
      title: z.string(),
      template: link.extend({ note: z.string().optional() }).optional(),
      article: link.optional(),
      // The code of the app, when it is public.
      code: link.optional(),
      more: z.array(link).default([]),
    }).optional(),
  }),
});

export const collections = { blog, docs, landings, cases };
