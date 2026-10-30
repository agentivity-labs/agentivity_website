import { llmsFullTxt } from '../lib/llms';

// The summary of /llms.txt followed by the use cases, the key documentation pages and the articles in full text.
export async function GET() {
  return new Response(await llmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
