import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import fetchDocsManifest from '../../lib/fetch-docs-manifest';
import markdownToHtml from '../../lib/markdown-to-html';
import { getRawFileFromRepo } from '../../lib/github';
import Page from '../../components/page';
import PageContent from '../../components/page-content';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Container from '../../components/container';
import DocsPage from '../../components/docs/docs-page';
import SocialMeta from '../../components/social-meta';
import Footer from '../../components/footer';
import { Sidebar, SidebarMobile, Post, Category } from '../../components/sidebar';

function removeFromLast(path, key) {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}

function getSlug(query) {
  return query.slug ? `/docs${query.slug}` : '/docs/getting-started';
}

function getCategoryPath(routes) {
  const route = routes.find(r => r.path);
  return route && removeFromLast(route.path, '/');
}

function SidebarRoutes({ routes: currentRoutes, level = 1 }) {
  const { query } = useRouter();
  const slug = getSlug(query);

  return currentRoutes.map(({ path, title, routes }) => {
    if (routes) {
      const pathname = getCategoryPath(routes);
      const selected = slug.startsWith(pathname);

      return (
        <Category key={pathname} level={level} title={title} selected={selected}>
          <SidebarRoutes routes={routes} level={level + 1} />
        </Category>
      );
    }

    const pathname = removeFromLast(path, '.');
    const href = `/docs?slug=${pathname}`;
    const selected = slug === '/docs' ? false : slug.startsWith(pathname);

    return <Post key={title} level={level} route={{ href, path, title, pathname, selected }} />;
  });
}

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

// These hashes don't need to be redirected to the olds docs because they are covered
// by the first page of the new docs
const excludedHashes = ['how-to-use', 'quick-start', 'manual-setup'];

const Docs = ({ routes, route, html }) => {
  const router = useRouter();
  const { asPath } = router;
  const title = `Documentation - ${route.title} | ${process.env.SITE_NAME}`;

  useEffect(() => {
    if (asPath.startsWith('/docs#')) {
      const hash = asPath.split('#')[1];

      if (!excludedHashes.includes(hash)) {
        // Redirect the user to the old docs
        router.push(`/docs/old#${hash}`);
      }
    }
  }, [asPath]);

  return (
    <Page>
      <PageContent>
        <Header height={{ desktop: 64, mobile: 114 }} shadow defaultActive>
          <Navbar />
          <SidebarMobile>
            <SidebarRoutes routes={routes} />
          </SidebarMobile>
        </Header>
        <Container>
          <div className="content">
            <Sidebar>
              <SidebarRoutes routes={routes} />
            </Sidebar>
            <DocsPage path={route.path} html={html} />
          </div>
          <style jsx>{`
            .content {
              display: flex;
              margin-top: 2rem;
              margin-bottom: 5rem;
            }
          `}</style>
        </Container>
        <SocialMeta
          title={title}
          url={`https://nextjs.org${asPath}`}
          description="Production grade React applications that scale. The world’s leading companies use Next.js to build server-rendered applications, static websites, and more."
        />
      </PageContent>
      <SkipNavContent />
      <Footer />
    </Page>
  );
};

// export async function unstable_getStaticParams() {
//   // const { routes } = await fetchDocsManifest();
//   return ['/docs/getting-started', { slug: '/docs/getting-started' }];
// }

export async function unstable_getStaticProps({ params }) {
  const slug = getSlug(params);
  const manifest = await fetchDocsManifest();
  const route = findRouteByPath(slug, manifest.routes);
  const md = await getRawFileFromRepo(route.path);
  const html = await markdownToHtml(route.path, md);

  return {
    props: { routes: manifest.routes, route, html },
    revalidate: 60
  };
}

// NOTE: temporal code until iSSG is properly implemented for the page
// Docs.getInitialProps = async ({ res, query }) => {
//   console.log('query', query);

//   const slug = getSlug(query);
//   const manifest = await fetchDocsManifest();
//   const route = findRouteByPath(slug, manifest.routes);
//   const md = await getRawFileFromRepo(route.path);
//   const html = await markdownToHtml(route.path, md);

//   if (res) res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

//   return { routes: manifest.routes, route, html };
// };

export default Docs;
