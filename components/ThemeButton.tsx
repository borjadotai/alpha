import React, { ButtonHTMLAttributes, useContext, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import FadeIn from './FadeIn';
import { ThemeContext } from './Kbar';

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-5 h-5 text-gray-800 dark:text-gray-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-5 h-5 text-gray-800 dark:text-gray-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    ></path>
  </svg>
);

export default function ThemeButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isDark, setIsDark] = useContext(ThemeContext);
  const [theme, setTheme] = useLocalStorage<string | undefined>('theme');

  useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, [setIsDark, theme]);

  return (
    <button
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 bg-gray-200 rounded-md dark:bg-white dark:bg-opacity-10 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
      {...props}
    >
      {isDark ? (
        <FadeIn>
          <SunIcon />
        </FadeIn>
      ) : (
        <FadeIn>
          <MoonIcon />
        </FadeIn>
      )}
    </button>
  );
}
