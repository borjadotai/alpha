import urlMetadata from 'url-metadata';

export interface BlockChildren {
  block: unknown;
  has_more: boolean;
  next_cursor: string | null;
  object: string; //"list"
  results: (Block | PartialBlockObjectResponse)[];
  type: string; //"block"
}

type PartialBlockObjectResponse = {
  object: 'block';
  id: string;
};

export interface RichText {
  type: string; // 'text',
  text: {
    content: string; // 'This is a test. This is ',
    link: string | null;
  };
  annotations: {
    bold: boolean;
    code: boolean;
    color: string; // "default"
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  plain_text: string | null;
  href: string | null;
}

export type BookmarkBlock = {
  caption: [];
  url: string;
} & urlMetadata.Result;

export interface ChildPageBlock {
  title: string;
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  // created_by: { object: 'user', id: 'bb833d33-47ac-482e-92b4-18637d404b75' },
  // last_edited_by: { object: 'user', id: 'bb833d33-47ac-482e-92b4-18637d404b75' },
  cover: string | null;
  icon: { type: string; emoji: string };
  parent: {
    type: string;
    page_id: string;
  };
  archived: boolean;
  // properties: { title: [Object] },
  url: string;
}

export interface Heading {
  color: string; // "default"
  rich_text: RichText[];
}

interface TodoBlock {
  checked: boolean;
  color: string;
  rich_text: RichText[];
}

interface CodeBlock {
  language: string;
  rich_text: RichText[];
}

interface ImageBlock {
  caption: unknown;
  external: {
    url: string;
  };
  type: string; // "external"
}

interface BulletBlock {
  color: string;
  rich_text: RichText[];
}

export interface Block {
  id: string; // "284546ad-c84b-40a6-9ff1-d608378b0387"
  type: BlockType;
  archived: boolean;
  object: string; // "block"
  has_children: boolean;
  created_time: string; // "2022-04-24T18:04:00.000Z"
  last_edited_time: string; // "2022-04-24T18:04:00.000Z"
  last_edited_by: {
    object: string; // 'user',
    id: string; // 'bb833d33-47ac-482e-92b4-18637d404b75'
  };
  created_by: {
    object: string; // 'user',
    id: string; // 'bb833d33-47ac-482e-92b4-18637d404b75'
  };
  bookmark?: BookmarkBlock;
  to_do?: TodoBlock;
  code?: CodeBlock;
  image?: ImageBlock;
  bulleted_list_item: BulletBlock;
  child_page?: ChildPageBlock;
  heading_1?: Heading;
  heading_2?: Heading;
  heading_3?: Heading;
  paragraph?: {
    rich_text: RichText[];
    color: string; // 'default'
  };
}

export type BlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'
  | 'toggle'
  | 'child_page'
  | 'child_database'
  | 'embed'
  | 'image'
  | 'video'
  | 'file'
  | 'pdf'
  | 'bookmark'
  | 'callout'
  | 'quote'
  | 'equation'
  | 'divider'
  | 'table_of_contents'
  | 'column'
  | 'column_list'
  | 'link_preview'
  | 'synced_block'
  | 'template'
  | 'link_to_page'
  | 'table'
  | 'table_row'
  | 'code'
  | 'unsupported';

export interface PageProperties {
  archived: boolean;
  cover: string | null;
  created_by: {
    object: string; // 'user',
    id: string; // 'bb833d33-47ac-482e-92b4-18637d404b75'
  };
  created_time: string;
  icon: {
    type: string;
    emoji: string;
  };
  id: string;
  last_edited_time: string; // "2022-04-24T18:04:00.000Z"
  last_edited_by: {
    object: string; // 'user',
    id: string; // 'bb833d33-47ac-482e-92b4-18637d404b75'
  };
  object: string;
  parent: {
    type: string; // 'page_id',
    page_id: string; // '09950758-68ea-454f-802f-3bf8580ccc94'
  };
  properties: {
    title: {
      id: string;
      type: string;
      title: RichText[];
    };
  };
  url: string; // "https://www.notion.so/Front-End-Development-56c48726a7ee40918bb6359576452f49"
}
