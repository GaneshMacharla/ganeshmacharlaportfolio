import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: readonly string[], enabled = true): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'home');

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const updateActive = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.32;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMarker) {
          current = id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [sectionIds, enabled]);

  return activeId;
}
