// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import compress from 'astro-compress';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The menu of the documentation comes from agentivity_docs (docs.json), through tools/docs.mjs.
// Pages marked draft are shown by the local server (astro dev) and left out of the build: the published site lists
// only the sections that have a published page.
const isDev = process.argv[2] === 'dev';
const navFile = fileURLToPath(new URL('./src/generated/docs-sidebar.json', import.meta.url));
/** @type {{ home: { label: Record<string, string>, published: boolean }, sections: { id: string, label: Record<string, string>, total: number, published: number }[] }} */
const nav = existsSync(navFile)
  ? JSON.parse(readFileSync(navFile, 'utf8'))
  : { home: { label: { en: 'Overview' }, published: false }, sections: [] };
const visibleSections = nav.sections.filter((section) => (isDev ? section.total : section.published) > 0);
const homeVisible = isDev || nav.home.published;
const docsSidebar = [
  ...(homeVisible ? [{ label: nav.home.label.en, translations: { fr: nav.home.label.fr ?? nav.home.label.en }, slug: 'docs' }] : []),
  ...visibleSections.map((section) => ({
    label: section.label.en,
    translations: { fr: section.label.fr ?? section.label.en },
    items: [{ autogenerate: { directory: `docs/${section.id}` } }],
  })),
];
// Until the documentation has a published home page, the Docs link of the website must not end on a 404.
const docsRedirects = isDev || nav.home.published ? {} : { '/docs': '/how-it-works', '/fr/docs': '/fr/how-it-works' };

export default defineConfig({
  site: 'https://www.agentivity.io',

  integrations: [
    starlight({
      title: { en: 'Agentivity documentation', fr: 'Documentation Agentivity' },
      description: 'How to install Agentivity, connect an AI model and build agents, teams and workflows.',
      // The languages come from the i18n block of Astro below (English at the root, French under /fr).
      favicon: '/favicon.svg',
      disable404Route: true,
      credits: false,
      lastUpdated: false,
      sidebar: docsSidebar,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      customCss: ['./src/styles/docs.css'],
      // Long commands wrap instead of scrolling sideways.
      expressiveCode: { defaultProps: { wrap: true } },
      components: {
        Head: './src/components/docs/DocsHead.astro',
        Header: './src/components/docs/DocsHeader.astro',
        PageFrame: './src/components/docs/DocsPageFrame.astro',
        ThemeProvider: './src/components/docs/DocsThemeProvider.astro',
        ThemeSelect: './src/components/docs/DocsEmpty.astro',
        LanguageSelect: './src/components/docs/DocsEmpty.astro',
        SocialIcons: './src/components/docs/DocsEmpty.astro',
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', fr: 'fr-FR' },
      },
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // handled separately (real images not yet in place)
      JavaScript: true,
      SVG: true,
    }),
  ],

  output: 'static',

  redirects: docsRedirects,

  devToolbar: { enabled: false },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
