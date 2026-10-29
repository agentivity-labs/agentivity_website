import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    // Set when an article is rewritten: shown next to the date and given to search engines as dateModified.
    updated:     z.coerce.date().optional(),
    author:      z.string().default('Agentivity Team'),
    tags:        z.array(z.string()).default([]),
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

export const collections = { blog, docs, landings };
