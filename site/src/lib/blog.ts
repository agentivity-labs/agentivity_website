import type { CollectionEntry } from 'astro:content';

// Blog articles: English ones in src/content/blog, French ones in src/content/blog/fr with the same file name, so that
// both have the same slug: /blog/<slug> and /fr/blog/<slug>.
export const blogSlug = (id: string) => id.replace(/\.(md|mdx)$/, '').replace(/^fr\//, '');
export const isLang = (post: CollectionEntry<'blog'>, lang: string) => (post.data.lang ?? 'en') === lang;
