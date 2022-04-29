import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isOpen?: boolean;
  width: string | number;
  height: string | number;
  strokeWidth?: string | number;
  lineProps?: any;
  toggle: () => void;
}

export default function HamburgerButton({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  lineProps = null,
  toggle,
  ...props
}: Props) {
  const variant = isOpen ? 'opened' : 'closed';
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 4,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -4,
    },
  };
  const newLineProps = {
    strokeWidth: strokeWidth as number,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variant,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
    strokeLinecap: 'round',
    ...lineProps,
  };

  return (
    <button onClick={toggle} className="sm:hidden z-50">
      <motion.svg
        viewBox="0 0 24 24"
        overflow="visible"
        preserveAspectRatio="none"
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        className="text-gray-800 dark:text-gray-200"
        {...props}
      >
        <motion.line x1="4" x2="20" y1="8" y2="8" variants={top} {...newLineProps} />
        <motion.line x1="4" x2="20" y1="16" y2="16" variants={bottom} {...newLineProps} />
      </motion.svg>
    </button>
  );
}
