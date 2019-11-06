import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import fetchDocsManifest from '../../lib/fetch-docs-manifest';
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
  const { asPath, query } = useRouter();
  const { slug } = query;

  return currentRoutes.map(({ path, title, routes }) => {
    if (routes) {
      const selected = asPath.startsWith(getCategoryPath(routes));

      return (
        <Category level={level} title={title} selected={selected}>
          <SidebarRoutes routes={routes} level={level + 1} />
        </Category>
      );
    }

    const pathname = removeFromLast(path, '.');
    const selected = asPath === '/docs' ? false : asPath.startsWith(pathname);

    return <Post key={path} level={level} route={{ slug, path, title, pathname, selected }} />;
  });
}

const Docs = ({ routes }) => (
  <Page>
    <Header height={64} shadow defaultActive>
      <Navbar />
    </Header>
    <Container>
      <div className="content">
        <Sidebar>
          <SidebarRoutes routes={routes} />
        </Sidebar>
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

Docs.getInitialProps = async () => {
  const manifest = await fetchDocsManifest();
  return manifest;
};

export default Docs;

// export const config = {
//   amp: true
// };
