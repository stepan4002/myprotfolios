'use client';

import { useEffect, useRef } from 'react';

/**
 * Letter-by-letter reveal — lightweight, no animation lib.
 * Each character fades + slides up in sequence after `delay`ms.
 */
export function TabRevealText({
  children,
  delay = 0,
  stagger = 28,
}: {
  children: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.opacity = '1';
      return;
    }
    const spans = el.querySelectorAll<HTMLSpanElement>('span[data-char]');
    spans.forEach((s, i) => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(0.4em)';
      setTimeout(() => {
        s.style.transition = 'opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)';
        s.style.opacity = '1';
        s.style.transform = 'translateY(0)';
      }, delay + i * stagger);
    });
  }, [delay, stagger, children]);

  return (
    <span ref={ref} className="inline-block">
      {children.split('').map((ch, i) => (
        <span
          key={i}
          data-char
          className="inline-block whitespace-pre"
          style={{ willChange: 'opacity, transform' }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
