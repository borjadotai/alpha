import { Block, PageProperties } from '../notionBlocks/types';

export type PageIds = { id: string }[];

export interface DbPage {
  id: string;
  meta: PageProperties;
  content: Block[];
}
