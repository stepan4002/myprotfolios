'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const springScale = useSpring(scale, { stiffness: 400, damping: 20 });

  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    // Hide custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const over = () => scale.set(2.5);
    const out = () => scale.set(1);

    window.addEventListener('mousemove', move);

    // Prevent duplicate listeners with WeakSet
    const tracked = new WeakSet<Element>();

    function attachListeners() {
      const els = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      els.forEach((el) => {
        if (tracked.has(el)) return;
        tracked.add(el);
        el.addEventListener('mouseenter', over);
        el.addEventListener('mouseleave', out);
      });
    }

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, [cursorX, cursorY, scale]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#F4EFE6',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(244,239,230,0.5)',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
