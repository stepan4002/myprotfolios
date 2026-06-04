'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

/**
 * Letter-by-letter reveal — pure React state, no DOM mutation.
 * Spaces are rendered as plain text (not spans) so they don't collapse
 * inside inline-block letter cells.
 */
export function LetterReveal({
  text,
  delay = 0,
  stagger = 28,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShownCount(text.length);
      return;
    }
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < text.length; i++) {
      timeouts.push(setTimeout(() => setShownCount((n) => Math.max(n, i + 1)), delay + i * stagger));
    }
    return () => timeouts.forEach(clearTimeout);
  }, [text, delay, stagger]);

  return (
    <span className={className}>
      {text.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        return (
          <span
            key={i}
            className={clsx(
              'inline-block transition-[opacity,transform] duration-700 ease-out',
              i < shownCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[0.5em]',
            )}
            style={{ willChange: 'opacity, transform' }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
