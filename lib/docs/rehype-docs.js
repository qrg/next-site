import { resolve } from 'url';
import visit from 'unist-util-visit';
import toString from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import permalinkIcon from './permalink-icon-ast';

const ABSOLUTE_URL = /^https?:\/\/|^\/\//i;
// The headers will be updated to include a link to their hash
const HEADINGS = ['h2', 'h3', 'h4'];

function removeExt(path) {
  const basePath = path.split(/#|\?/)[0];
  const i = basePath.lastIndexOf('.');

  if (i === -1) return path;
  return basePath.substring(0, i) + path.substring(basePath.length);
}

export default function rehypeDocs({ filePath, repoUrl }) {
  const slugger = new GithubSlugger();

  function visitAnchor(node) {
    if (!node.properties) return;

    const { href } = node.properties;

    if (!href) return;

    const isAbsoluteUrl = ABSOLUTE_URL.test(href);
    const isHash = href[0] === '#';
    const isDocs = href.startsWith('/docs');
    const isRepoUrl = !isHash && !isDocs;

    if (isAbsoluteUrl || isRepoUrl) {
      node.properties.className = 'absolute';
      node.properties.target = '_blank';
      node.properties.rel = 'noopener noreferrer';

      if (!isAbsoluteUrl) {
        // Turn any relative URL that's not handled by the Next.js site into an absolute URL
        node.properties.href = resolve(`${repoUrl}/${filePath.replace(/^\//, '')}`, href);
      }
      return;
    }

    // The URL is relative at this point
    node.properties.className = 'relative';
    // Relative URL for another documentation route
    if (isDocs) node.properties.href = removeExt(href);
  }

  function visitHeading(node) {
    const text = toString(node);

    if (!text) return;

    const id = slugger.slug(text);

    node.properties.className = 'heading';
    node.children = [
      {
        type: 'element',
        tagName: 'span',
        properties: { id }
      },
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${id}`
        },
        children: node.children
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: 'permalink' },
        children: [permalinkIcon]
      }
    ];
  }

  return function transformer(tree) {
    visit(tree, node => node.tagName === 'a', visitAnchor);
    visit(tree, node => HEADINGS.includes(node.tagName), visitHeading);
  };
}