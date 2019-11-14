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

export default async function getDocsPageProps(params) {
  const slug = getSlug(params);
  const manifest = await fetchDocsManifest();
  const route = findRouteByPath(slug, manifest.routes);
  const md = await getRawFileFromRepo(route.path);
  const html = await markdownToHtml(route.path, md);

  return { routes: manifest.routes, route, html };
}
