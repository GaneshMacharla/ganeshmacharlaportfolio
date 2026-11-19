import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ScrollFadeProps {
  children: ReactNode;
  /** hero: only fades out (it is already on screen when the page loads) */
  variant?: 'section' | 'hero';
}

/**
 * Scroll-linked fade: content fades/rises in as it enters the viewport and
 * fades, shrinks and blurs out as it leaves through the top.
 */
export function ScrollFade({ children, variant = 'section' }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = top of block reaches bottom of screen, 1 = bottom of block leaves the top
    offset: ['start end', 'end start'],
  });

  const isHero = variant === 'hero';
  const inPts = isHero ? [0, 0] : [0, 0.18];

  const opacity = useTransform(
    scrollYProgress,
    isHero ? [0.5, 0.62, 0.95] : [inPts[0], inPts[1], 0.78, 0.98],
    isHero ? [1, 0.85, 0] : [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, isHero ? [0.5, 1] : [0, 0.18, 0.78, 1], isHero ? [0, -120] : [70, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, isHero ? [0.5, 1] : [0.78, 1], isHero ? [1, 0.88] : [1, 0.94]);
  const filter = useTransform(
    scrollYProgress,
    isHero ? [0.6, 1] : [0, 0.15, 0.82, 1],
    isHero ? ['blur(0px)', 'blur(10px)'] : ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
  );

  if (reduce) return <div ref={ref}>{children}</div>;

  // blurring large areas is expensive on phones: fade + move only there
  const touch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, filter: touch ? undefined : filter, willChange: 'opacity, transform' }}>
      {children}
    </motion.div>
  );
}
