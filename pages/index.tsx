import Head from 'next/head';
import { notion } from '../lib/notionBlocks';
import { RenderBlocks } from '../lib/notionBlocks/render';
import { Block, PageProperties } from '../lib/notionBlocks/types';
import HomeIntro from '../components/home/HomeIntro';
import { Meta } from '../components/Meta';
import Main from '../components/Main';

interface HomeProps {
  pageProperties: PageProperties;
  pageBlocks: Block[];
}

const Home = ({ pageProperties, pageBlocks }: HomeProps) => {
  const title = pageProperties.properties.title?.title?.[0]?.plain_text;
  const Headers = <Meta title="Borja" description="Technology. Product. Design." />;

  return (
    <Main meta={Headers}>
      <Head>
        <title>Borja Leiva</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomeIntro />
        <RenderBlocks blocks={pageBlocks} />
      </main>
    </Main>
  );
};

export async function getStaticProps() {
  const url = 'https://www.notion.so/borjadotai/Home-bfdd310d9e454c77839d11bd76e07f9f';
  const pageId = notion.getPageId(url);
  const pageProperties = await notion.getPageProperties(pageId);
  const pageBlocks = await notion.getPageBlocks(pageId);
  const parsedBlocks = await notion.populateBlockData(pageBlocks.results as Block[]);

  return {
    props: {
      pageProperties,
      pageBlocks: parsedBlocks,
    },
  };
}

export default Home;
