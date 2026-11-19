import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const KEY = 'gm-intro-seen';

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/** Short first-visit intro: a counter and the initials, then the curtain lifts. */
export function IntroOverlay() {
  const [visible, setVisible] = useState(() => !alreadySeen());
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable: intro just plays again next time */
    }
    const start = performance.now();
    const DURATION = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060a]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl"
          >
            G<span className="text-gradient-anim">M</span>
          </motion.div>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 via-cyan-300 to-fuchsia-400"
              style={{ width: `${count}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-xs tracking-[0.3em] text-slate-400">
            {String(count).padStart(3, '0')}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
