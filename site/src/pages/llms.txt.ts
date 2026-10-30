import { llmsTxt } from '../lib/llms';

// The summary of the site for AI answer engines (llmstxt.org), built at each build from the site's own content.
export async function GET() {
  return new Response(await llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
