import { Client } from '@notionhq/client';
import { bookmark, childPage } from './transformations';
import { Block, BlockChildren } from './types';

export default class NotionBlocks {
  auth?: string;
  notionAPI: Client;

  public constructor(options?: { auth: string }) {
    this.auth = options?.auth;
    this.notionAPI = new Client({ auth: this.auth });
  }

  public getPageProperties(id: string) {
    return this.notionAPI.pages.retrieve({
      page_id: id,
    });
  }

  public getPageBlocks(id: string): Promise<BlockChildren> {
    return this.notionAPI.blocks.children.list({
      block_id: id,
      page_size: 50,
    });
  }

  public async populateBlockData(blockData: Block[]): Promise<Block[]> {
    const blocks = [...blockData];
    const promises = blocks.map(async (block, i) => {
      if (block.type === 'child_page') blocks[i] = await childPage(block);
      if (block.type === 'bookmark') blocks[i] = await bookmark(block);
    });
    await Promise.all(promises);
    return blocks;
  }

  public async getAllPaths(pageId: string, paths: string[] = []): Promise<string[]> {
    const rootPage = await this.getPageBlocks(pageId);
    const blocks = rootPage.results as Block[];
    const promises: Promise<unknown>[] = [];
    blocks.forEach((block) => {
      if (block.type === 'child_page') {
        paths.push(block.id);
        if (block.has_children) promises.push(this.getAllPaths(block.id, paths));
      }
    });
    await Promise.all(promises);
    return paths;
  }

  public getPageId(url: string): string {
    const id = url.slice(-32);
    const first = id.slice(0, 8);
    const second = id.slice(8, 12);
    const third = id.slice(12, 16);
    const fourth = id.slice(16, 20);
    const last = id.slice(20, 32);
    return `${first}-${second}-${third}-${fourth}-${last}`;
  }
}
