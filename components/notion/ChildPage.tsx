import Link from 'next/link';

export default function ChildPage({ id, emoji, title }: { id: string; emoji?: string; title: string }) {
  return (
    <Link href={`/page/${id}`} passHref>
      <a>
        <div className="w-full flex px-2 py-1 cursor-pointer rounded-sm hover:bg-slate-50">
          {emoji && <span className="mr-2">{emoji}</span>}
          <p>{title}</p>
        </div>
      </a>
    </Link>
  );
}
