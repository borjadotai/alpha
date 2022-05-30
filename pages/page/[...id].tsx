import Head from 'next/head';
import Main from '../../components/Main';
import { Meta } from '../../components/Meta';
import { supabase } from '../../lib/supabase';
import { RenderBlocks } from '../../lib/notionBlocks/render';
import { DbPage, PageIds } from '../../lib/supabase/db.types';
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
  const { data, error } = await supabase.from('pages').select('id');
  if (error) throw new Error(error.message);
  const pageIds: PageIds = data;

  const paths = pageIds.map(({ id }) => ({
    params: { id: [id] },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: Record<string, string> }) {
  const { data, error } = await supabase.from('pages').select('*').eq('id', params.id);
  if (error) throw new Error(error?.message);

  const dbPage: DbPage = data?.[0];
  const pageProperties = dbPage?.meta;
  const pageBlocks = dbPage?.content;

  return {
    props: {
      pageProperties,
      pageBlocks: pageBlocks,
    },
    revalidate: 10,
  };
}

export default Page;
