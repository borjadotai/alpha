import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={className}>
      {children}
    </motion.div>
  );
}
