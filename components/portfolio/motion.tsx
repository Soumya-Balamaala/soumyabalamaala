'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import { trackVisitor } from '@/lib/api/visitors';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
}

export function Reveal({ children, delay = 0, className, variants = FADE_UP }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

interface SectionRevealProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

// Fades/slides the whole <section> in as it scrolls into view, on top of
// whatever finer-grained Reveal/StaggerContainer animations live inside it.
// Every section on the page renders through this wrapper, so it's also the
// one place that records a visit — keyed by the section's own id — the
// moment someone actually scrolls to it, rather than repeating that in each
// section individually.
export function SectionReveal({ children, id, className }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onViewportEnter={() => {
        if (id) trackVisitor(id, window.location.href);
      }}
    >
      {children}
    </motion.section>
  );
}

export function StaggerContainer({ children, className, staggerDelay = 0.07 }: StaggerContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={FADE_UP}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScalePop({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { FADE_UP, FADE_IN };
