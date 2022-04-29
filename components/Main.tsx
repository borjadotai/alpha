import React, { ReactNode, useState } from 'react';

import FadeIn from '../components/FadeIn';
import HamburgerButton from '../components/Navigation/HamburgerButton';
import Menu from '../components/Navigation/Menu';
import NavMenu from '../components/Navigation/NavMenu';
import IconButton from '../components/ThemeButton';

type IMainProps = {
  bg?: boolean;
  meta: ReactNode;
  children: ReactNode;
};

export default function Main({ meta, children }: IMainProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen antialiased w-full text-gray-700 dark:text-gray-500 bg-white dark:bg-black">
      {meta}
      <div className="min-h-screen max-w-xs sm:max-w-screen-ee lg:max-w-screen-md sm:pt-8 mx-auto flex flex-col">
        <div className="pt-8 pb-4 sm:pb-8 flex flex-row w-full justify-between items-center flex-grow-0">
          <IconButton />
          <NavMenu />
          <HamburgerButton isOpen={isMenuOpen} toggle={toggleMenu} strokeWidth="2" width="24" height="24" />
        </div>

        <main className="min-h-full flex-grow">
          {isMenuOpen && <Menu />}
          {!isMenuOpen && (
            <FadeIn>
              <div className="py-2 text-xl content">{children}</div>
            </FadeIn>
          )}
        </main>

        <div className="text-center py-8 text-sm flex flex-col flex-grow-0">
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
function setTheme(arg0: string) {
  throw new Error('Function not implemented.');
}
