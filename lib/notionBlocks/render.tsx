import { Fragment } from 'react';
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import ChildPage from '../../components/notion/ChildPage';
import Bookmark from '../../components/notion/Bookmark';
import { Block } from './types';

const BlockParser = NotionBlocksHtmlParser.getInstance();

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  const elements = blocks.map((block) => {
    const type = block.type;
    if (type === 'bookmark' && block.bookmark)
      return (
        <Bookmark
          image={block.bookmark['og:image']}
          title={block.bookmark['og:title']}
          description={block.bookmark['og:description']}
          url={block.bookmark.url}
        />
      );
    if (type === 'child_page' && block.child_page)
      return (
        <ChildPage key={block.id} id={block.id} emoji={block.child_page?.icon?.emoji} title={block.child_page.title} />
      );
    if (type === 'paragraph')
      return <div key={block.id} dangerouslySetInnerHTML={{ __html: BlockParser.parse([block]) }} />;
    if (
      (type === 'heading_3' && block.heading_3) ||
      (type === 'heading_2' && block.heading_2) ||
      (type === 'heading_1' && block.heading_1)
    )
      return <span key={block.id} dangerouslySetInnerHTML={{ __html: BlockParser.parse([block]) }} />;
  });
  return <Fragment>{elements}</Fragment>;
}
