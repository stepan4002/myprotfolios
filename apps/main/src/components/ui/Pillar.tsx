'use client';

import Link from 'next/link';
import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Pillar as PillarType } from '@/lib/types';

interface PillarCardProps {
  pillar: PillarType;
  index: number;
}

export function PillarCard({ pillar, index }: PillarCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouse(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ rotateX: springRotateX, rotateY: springRotateY, perspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="will-change-transform"
    >
      <Link
        href={pillar.href}
        className="flex flex-col bg-[var(--paper)] p-10 text-[var(--ink)] min-h-[380px] transition-all duration-200 hover:bg-[var(--paper-warm)] border border-[var(--rule)] hover:border-[var(--ink-mute)] hover:shadow-lg"
      >
        <div className="font-mono text-[11px] text-[var(--accent)] tracking-[0.13em] uppercase mb-5">
          {pillar.number} · {pillar.id === 'tech' ? 'Tech & AI' : pillar.id === 'events' ? 'Events & Management' : 'International Sales'}
        </div>
        <h2 className="font-serif font-normal text-[clamp(26px,2.2vw,32px)] leading-[1.05] tracking-tight mb-4">
          {pillar.title} <em className="italic text-[var(--ink-soft)]">{pillar.titleEmphasis}</em>
        </h2>
        <p className="text-[var(--ink-soft)] text-[14.5px] leading-[1.6] mb-5">
          {pillar.description}
        </p>
        <div className="mt-auto pt-5 border-t border-dotted border-[var(--rule)] font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.05em] leading-[1.85]">
          {pillar.tally.map((t, i) => (
            <div key={i}>
              <b className="text-[var(--accent)] font-medium font-serif text-[13px]">{t.value}</b>{' '}
              {t.label}
            </div>
          ))}
        </div>
        <div className="mt-5 font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.13em]">
          Explore →
        </div>
      </Link>
    </motion.div>
  );
}
