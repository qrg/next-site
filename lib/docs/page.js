import { getRawFileFromRepo } from '../github';
import { getSlug, removeFromLast } from './utils';
import fetchDocsManifest from './fetch-docs-manifest';
import markdownToHtml from './markdown-to-html';

function findRouteByPath(path, routes) {
  // eslint-disable-next-line
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, '.') === path) {
      return route;
    }
    const childPath = route.routes && findRouteByPath(path, route.routes);
    if (childPath) return childPath;
  }
}

function getStaticPaths(nextRoutes, carry = []) {
  nextRoutes.forEach(({ path, routes }) => {
    if (path) {
      carry.push(removeFromLast(path, '.'));
    } else if (routes) {
      getStaticPaths(routes, carry);
    }
  });

  return carry;
}

export async function getStaticParams() {
  const manifest = await fetchDocsManifest();
  return getStaticPaths(manifest.routes);
}

export async function getStaticProps(params) {
  const slug = getSlug(params);
  const manifest = await fetchDocsManifest();
  const route = findRouteByPath(slug, manifest.routes);

  if (!route) return {};

  const md = await getRawFileFromRepo(route.path);
  const html = await markdownToHtml(route.path, md);

  return { routes: manifest.routes, route, html };
}
