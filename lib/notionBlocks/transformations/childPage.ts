import { notion } from '../';
import { Block, ChildPageBlock } from "../types";

export default async function childPage(blockData: Block) {
  const page: object = await notion.getPageProperties(blockData.id);
  blockData.child_page = {...blockData.child_page, ...page } as ChildPageBlock;
  return blockData;
}