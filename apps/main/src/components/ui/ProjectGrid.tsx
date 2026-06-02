'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectGridProps {
  projects: Project[];
}

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Tech & AI', value: 'tech' },
  { label: 'Events', value: 'events' },
  { label: 'Sales', value: 'sales' },
];

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex gap-2.5 flex-wrap mb-10 font-mono text-[11px] uppercase tracking-[0.1em]">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`bg-transparent border px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase rounded-sm transition-all duration-200 ${
              activeFilter === f.value
                ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                : 'border-[var(--rule)] text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex flex-col bg-[var(--paper)] p-8 text-[var(--ink)] min-h-[260px] transition-all duration-200 hover:bg-[var(--paper-warm)] border border-[var(--rule)] hover:border-[var(--ink-mute)] hover:shadow-md"
                >
                  <div className="font-mono text-[11px] text-[var(--accent)] tracking-[0.05em] mb-2.5">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif font-normal text-[22px] leading-[1.15] tracking-tight mb-2">
                    {project.title}
                    {project.titleEmphasis && (
                      <em className="italic text-[var(--ink-soft)]"> {project.titleEmphasis}</em>
                    )}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--ink-mute)] mb-4">
                    {project.company}
                  </div>
                  <p className="text-[var(--ink-soft)] text-[14.5px] leading-[1.55] flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-5 font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.13em]">
                    View case →
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
