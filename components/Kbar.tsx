import type { ActionImpl } from 'kbar';
import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, useMatches } from 'kbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createContext, FC, ReactNode, useState } from 'react';
import { useEffect, useCallback } from 'react';
import { ArrowUpRight, ChevronRight } from 'react-feather';
import { useLocalStorage } from 'react-use';
import { social } from '../utils/social';
import { KBarResults } from './KbarResults';

type RenderParams<T = ActionImpl | string> = {
  item: T;
  active: boolean;
};

const RenderResults: FC = () => {
  const { results } = useMatches();

  const onRender = useCallback(
    (props: RenderParams) =>
      typeof props.item === 'string' ? (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-neutral-400">{props.item}</div>
      ) : (
        <div
          className={`flex cursor-pointer items-center justify-between py-3 px-4 transition-colors ${
            props.active
              ? 'border-l-2 border-black dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800'
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center gap-1">
            {props.item.icon && <div className="mr-2 flex">{props.item.icon}</div>}
            {props.item.parent && (
              <>
                <span
                  className={`text-md transition-colors ${
                    props.active ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-400 dark:text-neutral-500'
                  }`}
                >
                  {props.item.ancestors.find((ancestor) => ancestor.id === (props.item as ActionImpl).parent)?.name}
                </span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  <ChevronRight size={16} />
                </span>
              </>
            )}
            <span className="text-md text-neutral-900 line-clamp-1 dark:text-white">{props.item.name}</span>
          </div>
          {props.item.shortcut && (
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                props.active ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              <span
                className={`font-mono text-sm font-medium leading-normal transition-colors ${
                  props.active ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                {props.item.shortcut}
              </span>
            </div>
          )}
          {props.item.icon && <ArrowUpRight size={16} className="text-neutral-400 dark:text-neutral-500" />}
        </div>
      ),
    [],
  );

  return <KBarResults items={results} onRender={onRender} />;
};

export const PingContext = createContext<any[]>([]);
export const ThemeContext = createContext<any[]>([]);

const CommandBar = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const [kbarOpened, setKbarOpened] = useState(false);
  const ePush = (url: string) => window.open(url, '_blank');
  const [theme, setTheme, removeTheme] = useLocalStorage<string | undefined>('theme', 'dark');
  const [isDark, setIsDark] = useState(true);

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['h'],
      keywords: 'home',
      section: 'Pages',
      perform: async () => push('/'),
    },
    {
      id: 'work',
      name: 'Work',
      shortcut: ['w'],
      keywords: 'work',
      section: 'Pages',
      perform: async () => push('/work'),
    },
    {
      id: 'tech',
      name: 'Tech',
      shortcut: ['x'],
      keywords: 'tech',
      section: 'Pages',
      perform: async () => push('/tech'),
    },
    {
      id: 'blog',
      name: 'Blog',
      keywords: 'blog',
      section: 'Pages',
    },
    // {
    //   id: 'resume',
    //   name: 'Resume',
    //   shortcut: ['/'],
    //   keywords: 'resume',
    //   section: 'Pages',
    //   perform: async () => push('/resume'),
    // },
    {
      id: 'blog-index',
      name: 'All Posts',
      parent: 'blog',
      shortcut: ['b'],
      perform: async () => push('/blog'),
    },
    {
      id: 'theme',
      name: 'Change theme...',
      shortcut: ['t'],
      keywords: 'theme',
      section: 'Utilities',
    },
    {
      id: 'lightMode',
      name: 'Light',
      shortcut: ['l'],
      keywords: 'light',
      parent: 'theme',
      perform: () => setTheme('light'),
    },
    {
      id: 'darkMode',
      name: 'Dark',
      shortcut: ['d'],
      keywords: 'dark',
      parent: 'theme',
      perform: () => setTheme('dark'),
    },
    {
      id: 'systemTheme',
      name: 'System Default',
      shortcut: ['s'],
      keywords: 'light',
      parent: 'theme',
      perform: () => removeTheme(),
    },
  ];

  const socialActions = social.map(({ id, name, url }) => ({
    id,
    name,
    keywords: id,
    icon: <Image src={`/social/${id}.svg`} width={16} height={16} layout="fixed" quality={100} alt="" />,
    section: 'Social',
    perform: async () => ePush(url),
  }));

  useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <KBarProvider actions={[...actions, ...socialActions]}>
      <KBarPortal>
        <KBarPositioner className="z-30 bg-white/80 backdrop-blur-sm dark:bg-black/80">
          <KBarAnimator className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-white drop-shadow-2xl dark:bg-neutral-900">
            <KBarSearch className="font-md w-full border-b border-neutral-100 bg-transparent py-4 px-4 font-normal text-neutral-900 outline-none dark:border-neutral-800 dark:text-white" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <PingContext.Provider value={[kbarOpened, setKbarOpened]}>
        <ThemeContext.Provider value={[isDark, setIsDark]}>{children}</ThemeContext.Provider>
      </PingContext.Provider>
    </KBarProvider>
  );
};

export default CommandBar;
