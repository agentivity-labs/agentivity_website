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

export const collections = { blog, docs };
