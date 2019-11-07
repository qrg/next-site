import unified from 'unified';
import markdown from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import html from 'rehype-stringify';

const processor = unified()
  .use(markdown)
  .use(remarkToRehype)
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
