'use client';

import { useEffect } from 'react';

/**
 * Mounts Lenis smooth-scroll on desktop pointer-fine devices only.
 * Touch / coarse / reduced-motion users get native scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return;
    }
    let lenis: { destroy?: () => void } | null = null;
    let raf = 0;
    (async () => {
      const mod = await import('lenis');
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1,
        lerp: 0.09,
      });
      const loop = (t: number) => {
        (lenis as unknown as { raf?: (t: number) => void }).raf?.(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy?.();
    };
  }, []);
  return null;
}
