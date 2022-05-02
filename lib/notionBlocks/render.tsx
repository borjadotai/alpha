import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import ChildPage from '../../components/notion/ChildPage';
import Bookmark from '../../components/notion/Bookmark';
import Todo from '../../components/notion/Todo';
import { Block } from './types';

const BlockParser = NotionBlocksHtmlParser.getInstance();

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  // console.log({ blocks });
  const elements = blocks.map((block) => {
    switch (block.type) {
      case 'paragraph':
        return <ParagraphEl {...block} />;
      case 'heading_3':
      case 'heading_2':
      case 'heading_1':
        return <HeadingEl {...block} />;
      case 'bookmark':
        return <BookmarkEl {...block} />;
      case 'child_page':
        return <ChildPageEl {...block} />;
      case 'to_do':
        return <TodoEl {...block} />;
      case 'divider':
        return <Divider {...block} />;
      case 'code':
        return <CodeEl {...block} />;
      case 'image':
        return <ImageEl {...block} />;
      case 'quote':
        return <ParagraphEl {...block} />;
      case 'bulleted_list_item':
        return <ParagraphEl {...block} />;
      default:
        return <p key={block.id}>other</p>;
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
  <div key={block.id} dangerouslySetInnerHTML={{ __html: BlockParser.parse([block]) }} />
);

const TodoEl = (block: Block) => <Todo key={block.id} blockparser={BlockParser} block={block} />;

const Divider = (block: Block) => <hr key={block.id} className="border-0.5 border-gray-900 my-4" />;

const CodeEl = (block: Block) => {
  const SyntaxHighlighter = dynamic(
    async () =>
      import(
        /* webpackChunkName: "react-syntax-highlighter" */
        'react-syntax-highlighter'
      ),
  );

  return (
    <div className="my-8 grid w-full font-mono" id="codeSnippet">
      <SyntaxHighlighter
        language={block.code?.language}
        key={block.id}
        style={dracula as { [key: string]: CSSProperties }}
        lineNumberStyle={{ color: 'rgb(156 163 175)' }}
        customStyle={{
          padding: '1rem',
          borderRadius: '0.25rem',
        }}
        showLineNumbers
      >
        {block.code?.rich_text[0].plain_text || ''}
      </SyntaxHighlighter>
    </div>
  );
};

const ImageEl = (block: Block) => <img alt="image" src={block.image?.external.url} />;
