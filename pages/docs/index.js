import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import fetchDocsManifest from '../../lib/fetch-docs-manifest';
import markdownToHtml from '../../lib/markdown-to-html';
import { getRawFileFromRepo } from '../../lib/github';
import Page from '../../components/page';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Container from '../../components/container';
import SocialMeta from '../../components/social-meta';
import Footer from '../../components/footer';
import { Sidebar, Post, Category } from '../../components/sidebar';

function removeFromLast(path, key) {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}

function getCategoryPath(routes) {
  const route = routes.find(r => r.path);
  return route && removeFromLast(route.path, '/');
}

function SidebarRoutes({ routes: currentRoutes, level = 1 }) {
  const { query } = useRouter();
  const { slug } = query;

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

const Docs = ({ routes, html }) => (
  <Page>
    <Header height={64} shadow defaultActive>
      <Navbar />
    </Header>
    <Container>
      <div className="content">
        <Sidebar>
          <SidebarRoutes routes={routes} />
        </Sidebar>
        {/* eslint-disable-next-line */}
        <div className="docs" dangerouslySetInnerHTML={{ __html: html }} />
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
      image="/static/twitter-cards/learn.png"
      title="Learn | Next.js"
      url="https://nextjs.org/learn"
      description="Production grade React applications that scale. The world’s leading companies use Next.js to build server-rendered applications, static websites, and more."
    />
    <SkipNavContent />
    <Footer />
  </Page>
);

function findRouteByPath(path, routes) {
  return routes.find(route =>
    route.path
      ? removeFromLast(route.path, '.') === path
      : route.routes && findRouteByPath(path, route.routes)
  );
}

// export async function unstable_getStaticParams() {
//   // const { routes } = await fetchDocsManifest();
//   console.log('HELLO YOU PIECE OF SHIT');
//   return ['/docs/getting-started', { slug: '/docs/getting-started' }];
// }

// export async function unstable_getStaticProps(obj, obj2, obj3) {
//   console.log('OBJ', obj, obj2, obj3);

//   const { routes } = await fetchDocsManifest();
//   const route = findRouteByPath(obj.params.slug, routes);
//   const md = await getRawFileFromRepo(route.path);
//   const html = await markdownToHtml(md);

//   return {
//     props: { routes, html },
//     revalidate: 1
//   };
// }

Docs.getInitialProps = async ({ query }) => {
  const manifest = await fetchDocsManifest();
  const route = findRouteByPath(query.slug, manifest.routes);
  const md = await getRawFileFromRepo(route.path);
  const html = await markdownToHtml(md);

  console.log('HTML', html);

  return { routes: manifest.routes, html };
};

export default Docs;

// export const config = {
//   amp: true
// };
