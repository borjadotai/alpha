/* eslint-disable @next/next/no-img-element */
export interface BookmarkProps {
  url: string;
  title: string;
  description: string;
  image: string;
}

export default function Bookmark({ url = '', title = '', description = '', image = '' }: BookmarkProps) {
  const truncatedTitle = title.length > 70 ? `${title.substring(0, 70)}...` : title;
  const truncatedDesc = description.length > 200 ? `${description.substring(0, 200)}...` : description;

  return (
    <a href={url} className="my-4 max-w-xl xs:h-32" target="_blank" rel="noopener noreferrer">
      <div className="border border-slate-300 dark:border-neutral-800 rounded-md flex flex-wrap flex-col-reverse xs:flex-row hover:bg-slate-50 dark:hover:bg-neutral-900">
        <div className="flex flex-col p-3 w-full xs:w-3/5">
          <h4 className="font-bold">{truncatedTitle}</h4>
          <p className="hidden text-base xs:flex">{truncatedDesc}</p>
        </div>
        <div className="w-full xs:w-2/5 h-full bg-transparent rounded-tl-md rounded-tr-md xs:rounded-tl-none xs:rounded-tr-md xs:rounded-br-md">
          <img
            alt={title}
            src={image}
            className="w-full h-40 object-cover rounded-tl-md rounded-tr-md xs:rounded-tl-none xs:rounded-tr-md xs:rounded-br-md "
          />
        </div>
      </div>
    </a>
  );
}
