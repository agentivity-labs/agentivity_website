// What /llms.txt and /llms-full.txt tell AI answer engines about Agentivity: built from what the site already says
// (the use cases, the plans, the articles, the documentation), so that a new article or use case appears without an edit.
import { getCollection } from 'astro:content';
import plans from '../data/plans.json';
import { useTranslations } from '../i18n/utils';
import { blogSlug, isLang } from './blog';

export const SITE = 'https://www.agentivity.io';

const intro = `# Agentivity

> Agentivity is a platform to build teams of AI agents, without code. You describe each AI specialist in plain words, choose how they work together, and hand them the job. The team does the work and comes back to a person for every decision that is theirs. The Community edition is free forever and runs on your own server (Docker), with your own key from your AI model provider (bring your own key). The hosted cloud edition starts with a ${plans.trial.days}-day free trial, no credit card.`;

const facts = [
  'A chatbot answers. A team does the work. Agentivity builds teams of AI agents, workflows with human approval, and VibeApps: applications that adapt to the person who uses them, with a team behind.',
  'Built in the Studio, in the browser: by describing what you need to the Assistant, or by hand on a canvas. No code.',
  'Five ways for a team to work together: Sequential, Concurrent, Handoff, Group chat and Manager-led. A team can have another team or a workflow as a member.',
  'Workflows: fixed steps (forms, conditions, loops, approvals by a person, AI steps). AI works only in the steps you choose.',
  'Knowledge Bases (your own texts, searched by meaning) and Data Tables (rows your agents and workflows read and fill).',
  'Prompt Studio: write, test and improve the instructions of an agent.',
  'AI model providers: Anthropic, OpenAI, Google Gemini, xAI, DeepSeek and AWS Bedrock, each with your own key. No markup on tokens.',
  'Licence: source-available, under the Elastic License 2.0. Code on GitHub; image on Docker Hub.',
  'Made by SMART PIXEL BV. Website in English and French.',
];

// The plans as the pricing page shows them: monthly price, and the yearly price for the year (two months free).
const planLines = () => [
  `Community edition: free forever, on your own server with Docker.`,
  ...plans.plans.map((plan) => `${plan.name} (hosted): ${plan.monthly} EUR a month billed monthly, or ${plan.yearly.toLocaleString('en-US')} EUR a year; ${plan.users === 1 ? '1 user' : plan.users + ' users'}, ${plan.executionsPerMonth.toLocaleString('en-US')} executions a month.`),
  `Enterprise: on request.`,
  `Prices exclude VAT. Every hosted plan starts with a ${plans.trial.days}-day free trial, no card (${plans.trial.executions} executions during the trial). The AI model is billed by its provider, on your own key.`,
];

// The documentation pages worth reading first, in this order; a page not published is left out.
const keyDocs = [
  'introduction/what-agentivity-is',
  'introduction/what-you-can-do-with-it',
  'introduction/agent-team-or-workflow',
  'introduction/how-a-person-stays-in-control',
  'introduction/what-the-community-edition-includes',
  'getting-started/try-a-ready-made-solution',
  'getting-started/install-community',
  'hosted/start-a-hosted-workspace',
  'hosted/plans-and-limits',
  'guides/connect-a-model',
  'getting-started/build-your-first-team-with-the-assistant',
  'teams/choose-how-a-team-works',
  'workflows/what-a-workflow-is',
  'knowledge-bases/what-a-knowledge-base-is',
  'vibeapps/what-a-vibeapp-is',
  'showcases/the-four-showcases',
  'reference/api',
];

const product = [
  ['How it works', '/how-it-works/', 'describe a team to the Assistant, or build it by hand in the Studio'],
  ['Teams', '/teams/', 'AI specialists that work together, and the five ways of working'],
  ['Agents', '/agents/', 'one AI specialist with a role, its tools, its knowledge and its model'],
  ['Workflows', '/workflows/', 'the same steps every time, with a person who approves'],
  ['Prompt Studio', '/prompt-studio/', 'test and improve the instructions of an agent'],
  ['Knowledge & Data', '/knowledge-and-data/', 'Knowledge Bases and Data Tables for your agents'],
  ['VibeApps', '/vibeapps/', 'applications that adapt to the person, with an AI team behind them'],
  ['Assistant', '/assistant/', 'build an agent, a team or a workflow by describing it'],
  ['Pricing', '/pricing/', 'the Community edition is free forever, the hosted plans start with a free trial'],
  ['Start free', '/start/', 'a hosted workspace of your own, no credit card'],
  ['Install the Community edition', '/community/', 'Docker, on your own server'],
];

const optional = [
  ['Agentivity vs n8n', '/compare/agentivity-vs-n8n/'],
  ['Agentivity vs Dify', '/compare/agentivity-vs-dify/'],
  ['Agentivity vs Make', '/compare/agentivity-vs-make/'],
  ['Source code on GitHub', 'https://github.com/agentivity-labs/agentivity'],
  ['Docker image', 'https://hub.docker.com/r/agentivitylabs/agentivity'],
  ['Ready-made Templates on Synergi', 'https://synergi.agentivity.io'],
  ['French version of the site', '/fr/'],
];

const url = (path: string) => (path.startsWith('http') ? path : SITE + path);
const link = (title: string, path: string, note?: string) => `- [${title}](${url(path)})${note ? ': ' + note : ''}`;

export async function sources() {
  const useCases = useTranslations('en').use_cases_page.cases as any[];
  const articles = (await getCollection('blog', (post) => isLang(post, 'en') && !post.data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const docs = await getCollection('docs', (page) => !page.data.draft);
  const docsById = new Map(docs.map((page) => [page.id.replace(/^docs\//, ''), page]));
  const key = keyDocs.map((id) => docsById.get(id)).filter((page) => page !== undefined);
  return { useCases, articles, key };
}

export async function llmsTxt() {
  const { useCases, articles, key } = await sources();
  return [
    intro,
    'Key facts:\n\n' + facts.map((fact) => '- ' + fact).join('\n'),
    '## Plans\n\n' + planLines().map((line) => '- ' + line).join('\n'),
    '## Product\n\n' + product.map(([title, path, note]) => link(title, path, note)).join('\n'),
    '## Ready-made solutions (use cases)\n\n' + useCases.map((item) => link(item.title, `/use-cases/${item.slug}/`, item.summary)).join('\n'),
    '## Documentation\n\n' + key.map((page) => link(page.data.title, `/${page.id}/`)).join('\n'),
    '## Articles\n\n' + articles.map((post) => link(post.data.title, `/blog/${blogSlug(post.id)}/`, post.data.description)).join('\n'),
    '## Optional\n\n' + [link('Everything above in full text', '/llms-full.txt'), ...optional.map(([title, path]) => link(title, path))].join('\n'),
  ].join('\n\n') + '\n';
}

// The Markdown of an article without its figures (videos and images, which say nothing as text) and inline HTML.
const plain = (markdown: string) => markdown
  .replace(/<figure>[\s\S]*?<\/figure>/g, '')
  .replace(/<[^>]+>/g, '')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

export async function llmsFullTxt() {
  const { useCases, articles, key } = await sources();
  const labels = useTranslations('en').use_cases_page.labels;
  const cases = useCases.map((item) => [
    `## ${item.title}`,
    `Source: ${SITE}/use-cases/${item.slug}/`,
    item.summary,
    `${labels.facts.for}: ${item.facts.for}. ${labels.facts.use}: ${item.facts.use}. ${labels.facts.behind}: ${item.facts.behind}.`,
    ...item.qa.map((entry: any) => `### ${entry.q}\n\n${entry.a}`),
  ].join('\n\n'));
  const docs = key.map((page) => `## ${page.data.title}\n\nSource: ${SITE}/${page.id}/\n\n${plain(page.body ?? '')}`);
  const posts = articles.map((post) => [
    `## ${post.data.title}`,
    `Source: ${SITE}/blog/${blogSlug(post.id)}/ (published ${post.data.pubDate.toISOString().slice(0, 10)})`,
    plain(post.body ?? ''),
    ...post.data.faq.map((entry) => `### ${entry.q}\n\n${entry.a}`),
  ].join('\n\n'));
  return [
    await llmsTxt(),
    '# Ready-made solutions, in full\n\n' + cases.join('\n\n'),
    '# Documentation, in full\n\n' + docs.join('\n\n'),
    '# Articles, in full\n\n' + posts.join('\n\n'),
  ].join('\n\n') + '\n';
}
