import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MenuItems } from '../../utils/MenuItems';
import FadeIn from '../FadeIn';

function MenuItem({ href, children }: { href: string; children: string }) {
  const router = useRouter();
  const active =
    href === '/' ? router.asPath === '/' : router.asPath.includes(href);

  return (
    <li className="w-full text-center">
      <Link href={href}>
        <a
          className={`text-xl font-bold ${
            active
              ? 'text-gray-900 dark:text-gray-200'
              : 'text-gray-600 dark:text-gray-600'
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}

export default function Menu() {
  return (
    <FadeIn className="h-max flex flex-col flex-grow justify-center ">
      <ul className="space-y-2">
        {MenuItems.map((i) => (
          <MenuItem key={i.title} href={i.href}>
            {i.title}
          </MenuItem>
        ))}
      </ul>
    </FadeIn>
  );
}
