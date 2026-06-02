'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

interface CaseCardProps {
  project: Project;
  index: number;
  total: number;
}

export function CaseCard({ project, index, total }: CaseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-4 md:gap-8 py-12 border-t border-[var(--rule)] first:border-t-0 first:pt-2"
    >
      <div className="font-mono text-[13px] text-[var(--accent)] tracking-[0.05em] pt-0 md:pt-2">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      <div>
        <h2 className="font-serif font-normal text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-tight text-[var(--ink)] mb-2 max-w-[760px]">
          <Link href={`/projects/${project.slug}`} className="no-underline text-inherit border-b border-transparent hover:border-[var(--accent)]">
            {project.title}{' '}
            {project.titleEmphasis && (
              <em className="italic font-light text-[var(--ink-soft)]">{project.titleEmphasis}</em>
            )}
          </Link>
        </h2>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] uppercase tracking-[0.1em] mb-7">
          {project.company}
          {project.crossPillar && (
            <>
              <span className="mx-2.5 text-[var(--rule)]">·</span>
              {project.crossPillar}
            </>
          )}
          {project.techStack.length > 0 && (
            <>
              <span className="mx-2.5 text-[var(--rule)]">·</span>
              {project.techStack.slice(0, 3).join(' · ')}
            </>
          )}
        </div>
        <div className="max-w-[680px] text-[var(--ink-soft)] text-[16.5px] leading-[1.65] mb-8">
          <p>{project.description}</p>
        </div>
        <motion.div
          whileHover={{ x: 6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-block"
        >
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.13em] text-[var(--accent)] no-underline py-2 border-b border-[var(--accent-soft)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-150"
          >
            Read the case →
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
