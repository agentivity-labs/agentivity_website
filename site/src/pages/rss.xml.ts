// The feed of the blog, /rss.xml: the English articles, the newest first.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { blogSlug, isLang } from '../lib/blog';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', (post) => !post.data.draft && isLang(post, 'en'));
  return rss({
    title: 'Agentivity Blog',
    description: 'Guides and explanations for people who want to put AI specialists to work, without the jargon.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: '/blog/' + blogSlug(post.id),
      })),
  });
}
