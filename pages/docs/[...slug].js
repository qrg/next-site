import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { SkipNavContent } from '@reach/skip-nav';
import { getSlug, removeFromLast } from '../../lib/docs/utils';
import Page from '../../components/page';
import PageContent from '../../components/page-content';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Container from '../../components/container';
import DocsPage from '../../components/docs/docs-page';
import SocialMeta from '../../components/social-meta';
import { Sidebar, SidebarMobile, Post, Category } from '../../components/sidebar';

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

    const href = '/docs/[...slug]';
    const pathname = removeFromLast(path, '.');
    const selected = slug === '/docs' ? false : slug.startsWith(pathname);

    return <Post key={title} level={level} route={{ href, path, title, pathname, selected }} />;
  });
}

// These hashes don't need to be redirected to the olds docs because they are covered
// by the first page of the new docs
const excludedHashes = ['how-to-use', 'quick-start', 'manual-setup'];

const Docs = ({ routes, route, html }) => {
  if (!route) {
    return <Error statusCode={404} />;
  }

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
            <Sidebar fixed>
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
    </Page>
  );
};

export async function unstable_getStaticParams() {
  const docsPage = await import('../../lib/docs/page');
  return docsPage.getStaticParams();
}

export async function unstable_getStaticProps({ params }) {
  const docsPage = await import('../../lib/docs/page');
  const props = await docsPage.getStaticProps(params);

  return { props, revalidate: 60 };
}

export default Docs;
