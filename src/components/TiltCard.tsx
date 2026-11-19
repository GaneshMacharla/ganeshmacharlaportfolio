import { useRef, type ReactNode, type PointerEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** Card that tilts in 3D toward the pointer, with a glare that follows it. */
export function TiltCard({ children, className = '', max = 9 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
    el.style.setProperty('--glare', '1');
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--glare', '0');
  };

  return (
    <div className="tilt-perspective h-full">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-card h-full ${className}`}>
        {children}
        <div aria-hidden="true" className="tilt-glare" />
      </div>
    </div>
  );
}
