import unified from 'unified';
import markdown from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import raw from 'rehype-raw';
import sanitize from 'rehype-sanitize';
import githubSchema from 'hast-util-sanitize/lib/github';
import prism from '@mapbox/rehype-prism';
import html from 'rehype-stringify';
import docs from './rehype-docs';
import { REPO_URL } from './github-constants';

githubSchema.attributes['*'].push('className');

const processor = unified()
  .use(markdown)
  .use(remarkToRehype, { allowDangerousHTML: true })
  .use(raw)
  .use(prism)
  .use(docs, { repoUrl: REPO_URL })
  .use(sanitize, githubSchema)
  .use(html);

export default async function markdownToHtml(md) {
  try {
    const file = await processor.process(md);
    return file.contents;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Markdown to HTML error: ${error}`);
    throw error;
  }
}
