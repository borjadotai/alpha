/* eslint-disable @next/next/no-img-element */

export default function Bookmark({url = '', title = '', description = '', image = ''}: Record<string, string>) {
  const truncatedTitle = description.length > 70 ? `${description.substring(0, 70)}...` : description;
  const maxDescLength = description.length > 70 ? 70 : 120;
  const truncatedDesc = description.length > maxDescLength ? `${description.substring(0, maxDescLength)}...` : description;

  return <a href={url} className="my-2 max-w-xl h-32">
    <div className="border-slate-300 border rounded-md flex hover:bg-slate-50">
      <div className='flex flex-col w-3/5 p-3'>
        <h4 className='font-bold'>{truncatedTitle}</h4>
        <p>{truncatedDesc}</p>
      </div>
      <div className="w-2/5 h-full bg-white rounded-tr-md rounded-br-md">
        <img alt={title} src={image} className="w-full h-32 object-cover rounded-tr-md rounded-br-md " />
      </div>
    </div>
  </a>
}