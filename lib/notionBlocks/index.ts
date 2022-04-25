import NotionBlocks from './notionBlocks';
export const notion = new NotionBlocks({ auth: process.env.NOTION_API_KEY || '' });
