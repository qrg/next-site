import { SkipNavContent } from '@reach/skip-nav';
import fetchDocsManifest from '../../lib/fetch-docs-manifest';
import Page from '../../components/page';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Container from '../../components/container';
import SocialMeta from '../../components/social-meta';
import Footer from '../../components/footer';

const Docs = () => (
  <Page>
    <Header height={64} shadow defaultActive>
      <Navbar />
    </Header>
    <Container />
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
