'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { ANIMATION } from '@/lib/constants';

interface StatsProps {
  items: { value: string; label: string }[];
  className?: string;
}

export function Stats({ items, className }: StatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--rule)] border border-[var(--rule)] max-w-[820px] ${className ?? ''}`}
    >
      {items.map((item, i) => (
        <div key={i} className="bg-[var(--paper)] p-5">
          <AnimatedValue value={item.value} animate={isInView} delay={i * 0.1} />
          <div className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-[var(--ink-mute)] mt-2 leading-[1.45]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnimatedValue({
  value,
  animate,
  delay,
}: {
  value: string;
  animate: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const numMatch = value.match(/^(~?)(\d+)/);
    if (!animate || !numMatch) return;
    const prefix = numMatch[1];
    const target = parseInt(numMatch[2], 10);
    const suffix = value.slice(numMatch[0].length);
    const duration = ANIMATION.counterDuration * 1000;
    const start = Date.now() + delay * 1000;

    let raf: number;
    function tick() {
      const elapsed = Date.now() - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, value, delay]);

  return (
    <div className="font-serif font-light text-[38px] leading-none tracking-tight text-[var(--ink)]">
      {display}
    </div>
  );
}
