import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(2px)',
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number],
    },
  },
};

export function PageTransition({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
