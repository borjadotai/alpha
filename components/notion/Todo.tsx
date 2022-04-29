import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import { CheckSquare, Square } from 'react-feather';
import { Block } from '../../lib/notionBlocks/types';

export default function Todo({ blockparser, block }: { blockparser: NotionBlocksHtmlParser; block: Block }) {
  return (
    <div className="flex align-middle items-center mt-3 -mb-2">
      {block.to_do?.checked ? (
        <CheckSquare size={24} aria-label="Checked checkbox" className="text-teal-600 mr-2" />
      ) : (
        <Square size={24} aria-label="Checked checkbox" className="mr-2" />
      )}
      <div
        key={block.id + block.last_edited_time}
        id="todo"
        dangerouslySetInnerHTML={{
          __html: blockparser.parse([{ ...block, type: 'paragraph', paragraph: block.to_do }]),
        }}
      ></div>
    </div>
  );
}
