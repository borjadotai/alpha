import React, { ReactNode } from 'react';

import FadeIn from '../components/FadeIn';
import NavMenu from '../components/Navigation/NavMenu';
import IconButton from '../components/ThemeButton';
import Loading from './Navigation/Loading';

type IMainProps = {
  bg?: boolean;
  meta: ReactNode;
  children: ReactNode;
};

export default function Main({ meta, children }: IMainProps) {
  return (
    <div className="min-h-screen antialiased w-full text-gray-700 dark:text-gray-500 bg-white dark:bg-black">
      {meta}
      <div className="min-h-screen max-w-xs sm:max-w-screen-ee lg:max-w-screen-md sm:pt-8 mx-auto flex flex-col">
        <div className="pt-8 pb-4 sm:pb-8 flex flex-row w-full justify-between items-center flex-grow-0">
          <IconButton />
          <NavMenu />
        </div>

        <main className="min-h-full flex-grow">
          <Loading>
            <FadeIn>
              <div className="py-2 text-xl content">{children}</div>
            </FadeIn>
          </Loading>
        </main>

        <div className="text-center py-8 text-sm flex flex-col flex-grow-0" id="end-of-page">
          <p>Copyright {new Date().getFullYear()} © Borja Leiva</p>
          <p>
            Made with
            <span role="img" aria-label="Love" className="mx-1">
              ♥
            </span>
            in London
          </p>
        </div>
      </div>
    </div>
  );
}
