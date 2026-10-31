import type { CollectionEntry } from 'astro:content';

// Blog articles: English ones in src/content/blog, French ones in src/content/blog/fr with the same file name, so that
// both have the same slug: /blog/<slug> and /fr/blog/<slug>.
// The topics a visitor can filter on, in the order of the filter. An article takes one or two; their names are in "blog_page.tags".
export const BLOG_TAGS = ['basics', 'use-cases', 'teams', 'workflows', 'vibeapps', 'features', 'cost-privacy', 'misc'] as const;
export const blogSlug =(id: string) => id.replace(/\.(md|mdx)$/, '').replace(/^fr\//, '');
export const isLang = (post: CollectionEntry<'blog'>, lang: string) => (post.data.lang ?? 'en') === lang;
