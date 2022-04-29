import Head from 'next/head';
import { notion } from '../lib/notionBlocks';
import { RenderBlocks } from '../lib/notionBlocks/render';
import { Block, PageProperties } from '../lib/notionBlocks/types';
import { Meta } from '../components/Meta';
import Main from '../components/Main';

interface PageProps {
  pageProperties: PageProperties;
  pageBlocks: Block[];
}

const Tech = ({ pageProperties, pageBlocks }: PageProps) => {
  const title = pageProperties.properties.title?.title?.[0]?.plain_text;
  const Headers = <Meta title="Borja" description="Technology. Product. Design." />;

  return (
    <Main meta={Headers}>
      <Head>
        <title>BL • {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="post">
        <h1>{title}</h1>
        <RenderBlocks blocks={pageBlocks} />
      </main>
    </Main>
  );
};

export async function getStaticProps() {
  const url = 'Front-End-Development-56c48726a7ee40918bb6359576452f49';
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

export default Tech;
