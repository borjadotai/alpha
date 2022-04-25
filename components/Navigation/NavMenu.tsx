import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MenuItem({ active = false, href, children }: { active?: boolean; href: string; children: string }) {
  return (
    <li className="w-full text-center">
      <Link href={href}>
        <a>
          <span
            className={`hidden font-medium ${
              active ? 'text-gray-900 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'
            } md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all`}
          >
            {children}
          </span>
        </a>
      </Link>
    </li>
  );
}

function GodMenu({ onClick, children }: { onClick: Dispatch<SetStateAction<boolean>>; children: string }) {
  return (
    <li className="w-full text-center">
      <button
        type="button"
        onClick={() => onClick((prev) => !prev)}
        className={`hidden text-lg md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all`}
      >
        {children}
      </button>
    </li>
  );
}

export default function NavMenu() {
  const router = useRouter();

  return (
    <ul className="flex flex-row space-x-2">
      <MenuItem active={router.asPath === '/'} href="/">
        Home
      </MenuItem>
      <MenuItem active={router.asPath.includes('blog')} href="/blog">
        Blog
      </MenuItem>
    </ul>
  );
}
