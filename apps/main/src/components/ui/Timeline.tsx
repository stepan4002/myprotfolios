'use client';

import { motion } from 'framer-motion';
import type { TimelineEntry } from '@/lib/types';

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="mt-6 relative">
      {/* Vertical connector line on desktop */}
      <div className="hidden md:block absolute left-[140px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--rule)] via-[var(--accent-soft)] to-[var(--rule)]" />

      {entries.map((entry, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8 py-5 border-t border-[var(--rule)] ${
            i === entries.length - 1 ? 'border-b' : ''
          } group`}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.13em] text-[var(--ink-mute)] pt-1 relative">
            {/* Dot on timeline */}
            <div className="hidden md:block absolute -right-[13px] top-2 w-[5px] h-[5px] rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {entry.period}
          </div>
          <div>
            <h4 className="font-serif font-normal text-[22px] tracking-tight mb-0.5 group-hover:text-[var(--accent)] transition-colors duration-300">
              {entry.title}
            </h4>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-mute)] mb-2">
              {entry.org}
            </div>
            {entry.description && (
              <p className="text-[var(--ink-soft)] text-[15px] leading-[1.6] max-w-[680px]">
                {entry.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
