import visit from 'unist-util-visit';
import githubSchema from 'hast-util-sanitize/lib/github';
import GithubSlugger from 'github-slugger';

const ABSOLUTE_URL = /^https?:\/\/|^\/\//i;
// The headers will be updated to include a link to their hash
const HEADINGS = ['h2', 'h3', 'h4'];

function removeExt(path) {
  const basePath = path.split(/#|\?/)[0];
  const i = basePath.lastIndexOf('.');

  if (i === -1) return path;
  return basePath.substring(0, i) + path.substring(basePath.length);
}

// Returns the sanitized schema that's required to make this plugin work properly
// https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
export function getSchema(schema = githubSchema) {
  // clobber contains `id` by default, this removes it
  schema.clobber = ['name'];
  // Allow className for all elements
  schema.attributes['*'].push('className');

  return schema;
}

export default function rehypeDocs({ repoUrl }) {
  const slugger = new GithubSlugger();

  function visitAnchor(node) {
    if (!node.properties) return;

    const { href } = node.properties;

    if (!href) return;
    if (ABSOLUTE_URL.test(href)) {
      node.properties.target = '_blank';
      return;
    }

    // Add a className so the client can differentiate between absolute and relative links
    node.properties.className = 'relative';

    if (href[0] === '#') return;
    if (href.startsWith('/docs')) {
      // Handle relative URLs to another route of the docs
      node.properties.href = removeExt(href);
    } else {
      // Turn any relative URL that's not handled by the Next.js site into an absolute URL
      node.properties.href = `${repoUrl}/${href.replace(/^\//, '')}`;
      node.properties.target = '_blank';
    }
  }

  function visitHeading(node) {
    const child = node.children[0];

    if (!child || child.type !== 'text') return;

    const id = slugger.slug(child.value);

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
        children: [child]
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: 'permalink' }
      }
    ];
  }

  return function transformer(tree) {
    // console.log('TREE', tree);
    visit(tree, node => node.tagName === 'a', visitAnchor);
    visit(tree, node => HEADINGS.includes(node.tagName), visitHeading);
  };
}
