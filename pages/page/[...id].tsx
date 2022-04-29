import Head from 'next/head';
import Main from '../../components/Main';
import { Meta } from '../../components/Meta';
import { notion } from '../../lib/notionBlocks';
import { RenderBlocks } from '../../lib/notionBlocks/render';
import { Block, PageProperties } from '../../lib/notionBlocks/types';

interface PageProps {
  pageProperties: PageProperties;
  pageBlocks: Block[];
}

const Page = ({ pageProperties, pageBlocks }: PageProps) => {
  const title = pageProperties.properties.title?.title?.[0]?.plain_text;
  const Headers = <Meta title="Borja" description="Technology. Product. Design." />;

  return (
    <Main meta={Headers}>
      <Head>
        <title>Borja Leiva</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="post">
        <h1>{title}</h1>
        <RenderBlocks blocks={pageBlocks} />
      </main>
    </Main>
  );
};

export async function getStaticPaths() {
  const url = 'Front-End-Development-56c48726a7ee40918bb6359576452f49';
  const pageId = notion.getPageId(url);
  const pagePaths = await notion.getAllPaths(pageId);

  const paths = pagePaths.map((page) => ({
    params: { id: [page] },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: Record<string, string> }) {
  const pageId = params.id;
  const pageProperties = await notion.getPageProperties(pageId);
  const pageBlocks = await notion.getPageBlocks(pageId);
  const parsedBlocks = await notion.populateBlockData(pageBlocks.results as Block[]);

  return {
    props: {
      pageProperties,
      pageBlocks: parsedBlocks,
    },
    revalidate: 10,
  };
}

export default Page;
