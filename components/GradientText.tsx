import React, { useContext } from 'react';
import Gradient from 'rgt';
import { ThemeContext } from './Kbar';

type GradientTextProps = {
  highlight?: boolean;
  children: string;
  bg: {
    dir: string;
    from: string;
    to: string;
  };
};

export default function GradientText({ highlight = false, bg, children }: GradientTextProps) {
  const [isDark, _] = useContext(ThemeContext);

  if (isDark) return <Gradient {...bg}>{children}</Gradient>;
  if (!isDark) return <span className={highlight ? 'p-1 bg-yellow-200 rounded-md' : ''}>{children}</span>;
  return <></>;
}
