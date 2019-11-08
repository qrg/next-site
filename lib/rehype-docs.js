import visit from 'unist-util-visit';

const ABSOLUTE_URL = /^https?:\/\/|^\/\//i;

function removeExt(path) {
  const basePath = path.split(/#|\?/)[0];
  const i = basePath.lastIndexOf('.');

  if (i === -1) return path;
  return basePath.substring(0, i) + path.substring(basePath.length);
}

export default function rehypeDocs({ repoUrl }) {
  function visitAnchor(node) {
    if (!node.properties) return;

    const { href } = node.properties;

    if (!href || href[0] === '#' || ABSOLUTE_URL.test(href)) return;
    if (href.startsWith('/docs')) {
      // Handle relative URLs to another route of the docs
      node.properties.href = removeExt(href);
    } else {
      // Turn any relative URL that's not handled by the Next.js site into an absolute URL
      node.properties.href = `${repoUrl}/${href.replace(/^\//, '')}`;
    }
  }

  return function transformer(tree) {
    visit(tree, node => node.tagName === 'a', visitAnchor);
  };
}
