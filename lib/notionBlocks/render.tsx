import { Fragment } from 'react';
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import ChildPage from '../../components/notion/ChildPage';
import Bookmark from '../../components/notion/Bookmark';
import { Block } from './types';
import Todo from '../../components/notion/Todo';

const BlockParser = NotionBlocksHtmlParser.getInstance();

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  const elements = blocks.map((block) => {
    switch (block.type) {
      case 'heading_3':
      case 'heading_2':
      case 'heading_1':
        return <HeadingEl {...block} />;
      case 'bookmark':
        return <BookmarkEl {...block} />;
      case 'child_page':
        return <ChildPageEl {...block} />;
      case 'paragraph':
        return <ParagraphEl {...block} />;
      case 'to_do':
        return <TodoEl {...block} />;
      case 'divider':
        return <Divider {...block} />;
      default:
        return <p>other</p>;
    }
  });
  return <div className="post">{elements}</div>;
}

const BookmarkEl = (block: Block) =>
  block.bookmark ? (
    <Bookmark
      key={block.id}
      image={block.bookmark['og:image']}
      title={block.bookmark['og:title']}
      description={block.bookmark['og:description']}
      url={block.bookmark.url}
    />
  ) : null;

const ChildPageEl = (block: Block) =>
  block.child_page ? (
    <ChildPage key={block.id} id={block.id} emoji={block.child_page?.icon?.emoji} title={block.child_page.title} />
  ) : null;

const ParagraphEl = (block: Block) => (
  <span key={block.id} dangerouslySetInnerHTML={{ __html: BlockParser.parse([block]) || `<br />` }} />
);

const HeadingEl = (block: Block) => (
  <span key={block.id} dangerouslySetInnerHTML={{ __html: BlockParser.parse([block]) }} />
);

const TodoEl = (block: Block) => <Todo key={block.id} blockparser={BlockParser} block={block} />;

const Divider = (block: Block) => <hr key={block.id} className="border-0.5 border-gray-900 my-4" />;
