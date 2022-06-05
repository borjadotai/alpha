import { notion } from '..';
import { supabase } from '../../supabase';
import { Block, ChildPageBlock } from '../types';

export default async function childPage(blockData: Block) {
  const { data, error } = await supabase.from('pages').select('meta').eq('id', blockData.id);
  if (error) throw new Error(error.message);

  const page = data?.[0]?.meta;

  if (!page) {
    const page: object = await notion.getPageProperties(blockData.id);
    blockData.child_page = { ...blockData.child_page, ...page } as ChildPageBlock;
    return blockData;
  }

  blockData.child_page = { ...blockData.child_page, ...page } as ChildPageBlock;
  return blockData;
}
