'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Scroll-into-view reveal driven by React state — survives re-renders.
 * Why React state and not external IntersectionObserver-on-DOM:
 *   when a parent re-renders, React rewrites the child's className from props.
 *   Any class added by external JS gets wiped, leaving content invisible.
 *   This component holds shown=true in useState, so the visible state is
 *   guaranteed to persist across re-renders.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: As = 'div',
  threshold = 0.12,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (delay > 0) {
              const t = setTimeout(() => setShown(true), delay);
              return () => clearTimeout(t);
            }
            setShown(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, once, threshold]);

  // @ts-expect-error — generic element typing
  return <As ref={ref} className={clsx('reveal-init', shown && 'reveal-shown', className)}>{children}</As>;
}
