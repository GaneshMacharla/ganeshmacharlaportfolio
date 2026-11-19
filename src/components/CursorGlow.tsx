import { useEffect, useRef } from 'react';

/**
 * Custom desktop cursor: a dot that tracks the pointer exactly, a ring that
 * trails behind it, and a soft spotlight. The ring grows over interactive
 * elements and becomes a "View" bubble over project cards.
 * Only active for fine pointers (mouse/trackpad); touch devices are untouched.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!glow || !dot || !ring || !window.matchMedia('(pointer: fine)').matches) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('custom-cursor');

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let gx = x;
    let gy = y;
    let raf = 0;

    const setMode = (mode: 'default' | 'link' | 'view' | 'text') => {
      ring.dataset.mode = mode;
      dot.dataset.mode = mode;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      glow.style.opacity = '1';

      const target = e.target as Element | null;
      if (!target?.closest) return;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) setMode('text');
      else if (target.closest('a, button, [role="button"], [role="tab"], label')) setMode('link');
      else if (target.closest('.tilt-card')) setMode('view');
      else setMode('default');
    };
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onDown = () => ring.classList.add('cursor-press');
    const onUp = () => ring.classList.remove('cursor-press');

    const loop = () => {
      const k = reduce ? 1 : 0.18;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      gx += (x - gx) * 0.08;
      gy += (y - gy) * 0.08;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      glow.style.transform = `translate3d(${gx - 300}px, ${gy - 300}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, rgba(34,211,238,0.05) 35%, transparent 65%)',
        }}
      />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" data-mode="default">
        <span className="cursor-label">View</span>
      </div>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" data-mode="default" />
    </>
  );
}
