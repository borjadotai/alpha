import { ReactNode, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useIntersection } from 'react-use';
import { KButton } from './Navigation/NavMenu';

type StickyTitleProps = {
  children: string;
};

const StickyTitle = ({ children }: StickyTitleProps) => {
  const [text, setText] = useState(children);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const isSticky = intersection ? !intersection.isIntersecting : false;

  useEffect(() => {
    if (isSticky) setText(children.substring(0, 20));
    if (!isSticky) setText(children);
  }, [children, isSticky]);

  return (
    <div
      className={`w-[102%] xs:w-[100.5%] -ml-1 pt-2 sm:pt-0 top-[-1px] z-10 border-b bg-transparent sticky ${
        isSticky
          ? 'border-gray-100 bg-white/80 backdrop-blur-sm transition-all dark:border-neutral-900 dark:bg-black/80'
          : 'border-transparent'
      }`}
      ref={intersectionRef}
    >
      <div className="container flex justify-between max-w-[42rem] xs:max-w-full py-2">
        <h1
          className={`flex items-center font-bold text-gray-900 transition-all dark:text-white ${
            isSticky ? 'text-base leading-loose' : 'text-3xl'
          }`}
        >
          {text}
        </h1>
        <div className={!isSticky ? 'hidden' : ''}>
          <KButton />
        </div>
      </div>
    </div>
  );
};

export default StickyTitle;
