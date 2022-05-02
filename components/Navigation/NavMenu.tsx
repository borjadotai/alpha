import React, { KeyboardEventHandler, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useKBar } from 'kbar';
import { PingContext } from '../Kbar';

function MenuItem({ active = false, href, children }: { active?: boolean; href: string; children: string }) {
  return (
    <li className="w-full text-center">
      <Link href={href}>
        <a
          className={`hidden font-medium ${
            active ? 'text-gray-900 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'
          } md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}

export const KButton = () => {
  const [kbarOpened, setKbarOpened] = useContext(PingContext);
  const kbar = useKBar();

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      kbar.query.toggle();
    }
  };

  const onClick = () => {
    if (!kbarOpened) setKbarOpened(true);
    kbar.query.toggle();
  };

  return (
    <div className="relative">
      {!kbarOpened && (
        <span className="absolute flex h-1 w-1 -right-1 sm:right-1">
          <span className="absolute top-0 sm:top-1.5 right-0.5 animate-ping inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
          <span className="absolute top-0.5 sm:top-2 right-1 inline-flex rounded-full h-full w-full bg-green-500"></span>
        </span>
      )}
      <div
        className="text-xl sm:text-lg p-1 sm:px-3 sm:py-2 text-gray-500 outline-none dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all rounded-md"
        onClick={onClick}
        onKeyDown={keyDownHandler}
        role="button"
        tabIndex={0}
      >
        ⌘
      </div>
    </div>
  );
};

export default function NavMenu() {
  const router = useRouter();

  return (
    <div className="flex flex-row space-x-2">
      <ul className="flex flex-row space-x-2">
        <MenuItem active={router.asPath === '/'} href="/">
          Home
        </MenuItem>
        <MenuItem active={router.asPath === '/work'} href="/work">
          Work
        </MenuItem>
        <MenuItem active={router.asPath.includes('blog')} href="/blog">
          Blog
        </MenuItem>
      </ul>
      <KButton />
    </div>
  );
}
