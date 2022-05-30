import type { NextApiRequest, NextApiResponse } from 'next';
import { Block } from '../../../lib/notionBlocks/types';
import { notion } from '../../../lib/notionBlocks';
import { supabase } from '../../../lib/supabase';

async function populatePages(pageId: string) {
  const pageProperties = await notion.getPageProperties(pageId);
  const pageBlocks = await notion.getPageBlocks(pageId);
  const parsedBlocks = await notion.populateBlockData(pageBlocks.results as Block[]);
  return { id: pageId, meta: pageProperties, content: parsedBlocks };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'borja-ai-5ab6be8a87774338863120b0591c04a5';
  const pageId = notion.getPageId(url);
  const pagePaths = await notion.getAllPaths(pageId);

  const promises: Promise<any>[] = [];
  pagePaths.forEach((id) => promises.push(populatePages(id)));
  const pages = await Promise.all(promises);
  const { error } = await supabase.from('pages').upsert(pages);

  if (error) res.status(500).json(error);
  res.status(200).send('Succesfully updated DB with latest Notion data.');
}
