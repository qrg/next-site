export function getSlug({ slug }) {
  return slug ? `/docs${slug}` : '/docs/getting-started';
}

export function removeFromLast(path, key) {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}
