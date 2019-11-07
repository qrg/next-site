import unified from 'unified';
import markdown from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import raw from 'rehype-raw';
import sanitize from 'rehype-sanitize';
import html from 'rehype-stringify';
import docs from './rehype-docs';

const processor = unified()
  .use(markdown)
  .use(remarkToRehype, { allowDangerousHTML: true })
  .use(raw)
  .use(docs)
  .use(sanitize)
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
