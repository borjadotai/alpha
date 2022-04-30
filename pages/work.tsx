import Head from 'next/head';
import { notion } from '../lib/notionBlocks';
import { RenderBlocks } from '../lib/notionBlocks/render';
import { Block, PageProperties } from '../lib/notionBlocks/types';
import { Meta } from '../components/Meta';
import Main from '../components/Main';
import GradientText from '../components/GradientText';

interface PageProps {
  pageProperties: PageProperties;
  pageBlocks: Block[];
}

const Work = ({ pageProperties, pageBlocks }: PageProps) => {
  const title = pageProperties.properties.title?.title?.[0]?.plain_text;
  const Headers = <Meta title="Borja" description="Technology. Product. Design." />;
  const gGradient = { dir: 'left-to-right', from: '#a8ff78', to: '#78ffd6' };
  const Title = () => <GradientText bg={gGradient}>{title || 'Work'}</GradientText>;

  return (
    <Main meta={Headers}>
      <Head>
        <title>BL • {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="post">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 leading-tight sm:leading-none lg:mt-1">
          <Title />
        </h1>
        <RenderBlocks blocks={pageBlocks} />
      </main>
    </Main>
  );
};

export async function getStaticProps() {
  const url = 'https://www.notion.so/borjadotai/Work-c4d863c3cac848a4b17dfdfafb8d0d08';
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

export default Work;
