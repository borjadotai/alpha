import React, { ReactNode, useEffect, useState } from 'react';

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
    <div
      style={{
        backgroundRepeat: 'repeat-y',
        backgroundImage:
          'radial-gradient(800px at 700px 200px,#221527,rgba(22,22,24,0)),radial-gradient(600px at calc(100% - 300px) 300px,#041d31,rgba(22,22,24,0)),radial-gradient(800px at right center,#082636,rgba(22,22,24,0)),radial-gradient(800px at right bottom,#0c1820,rgba(22,22,24,0)),radial-gradient(800px at calc(50% - 600px) calc(100% - 100px),#3a182f,#1f121b,rgba(22,22,24,0))',
      }}
    >
      <div
        className={`min-h-screen antialiased w-full text-gray-700 dark:text-gray-500 bg-white dark:bg-black sm:bg-gray-50 sm:dark:bg-black sm:dark:bg-opacity-50`}
      >
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
    </div>
  );
}
