// The pages of the connected applications (src/content/integrations/<lang>/<slug>.yaml), served at /connections/<slug>/ and
// /fr/connections/<slug>/. A draft shows only on the local server (astro dev), never in the build.
import { getCollection, type CollectionEntry } from 'astro:content';

export type IntegrationPage = CollectionEntry<'integrations'> & { lang: 'en' | 'fr'; slug: string };

const showDrafts = import.meta.env.DEV;

export async function integrationPages(lang: 'en' | 'fr'): Promise<IntegrationPage[]> {
  const all = await getCollection('integrations');
  return all
    .map((entry) => {
      const [fileLang, ...rest] = entry.id.split('/');
      return { ...entry, lang: fileLang as 'en' | 'fr', slug: rest.join('/') };
    })
    .filter((page) => page.lang === lang && (showDrafts || !page.data.draft));
}

/** The address of an app's page in that language, by the app's name in src/data/connections.ts; undefined when it has none. */
export async function integrationHrefs(lang: 'en' | 'fr'): Promise<Map<string, string>> {
  const prefix = lang === 'fr' ? '/fr' : '';
  return new Map((await integrationPages(lang)).map((page) => [page.data.app, `${prefix}/connections/${page.slug}/`]));
}
