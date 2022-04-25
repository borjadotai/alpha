import urlMetadata from "url-metadata";
import { Block } from "../types";

export default async function bookmark(blockData: Block) {
  if(blockData?.bookmark?.url) {
    const metaData = await urlMetadata(blockData?.bookmark?.url);
    blockData.bookmark = {...blockData.bookmark, ...metaData };
  }
  return blockData;
}