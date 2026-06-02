'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProjectBySlug, projects } from '@/data/projects';
import { ScrollTriggerWrapper } from '@/components/shared/ScrollTriggerWrapper';
import { Stats } from '@/components/ui/Stats';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="page-section pt-32 pb-16">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-16 border-b border-[var(--rule)] pb-14"
      >
        <div className="font-mono text-[11px] text-[var(--ink-mute)] uppercase tracking-[0.13em] mb-6">
          {project.company}
          {project.crossPillar && (
            <><span className="mx-3 text-[var(--rule)]">·</span>{project.crossPillar}</>
          )}
        </div>
        <h1 className="font-serif font-light text-[clamp(36px,5.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] max-w-[900px]">
          {project.title}{' '}
          {project.titleEmphasis && (
            <em className="italic text-[var(--ink-soft)]">{project.titleEmphasis}</em>
          )}
        </h1>
      </motion.header>

      {/* Stats */}
      {project.stats.length > 0 && (
        <ScrollTriggerWrapper className="mb-14">
          <Stats items={project.stats} />
        </ScrollTriggerWrapper>
      )}

      {/* Tech stack */}
      {project.techStack.length > 0 && (
        <ScrollTriggerWrapper delay={0.1} className="mb-14">
          <div className="flex flex-wrap gap-2 max-w-[780px]">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-3 py-1.5 border border-[var(--rule)] text-[var(--ink-soft)] rounded-sm bg-[var(--paper-warm)] tracking-[0.01em] transition-colors hover:border-[var(--ink-mute)] hover:text-[var(--ink)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </ScrollTriggerWrapper>
      )}

      {/* Prose */}
      <div className="max-w-[680px] mb-20">
        {project.prose.map((paragraph, i) => (
          <ScrollTriggerWrapper key={i} delay={i * 0.05}>
            <p className="text-[var(--ink-soft)] text-[16.5px] leading-[1.7] mb-5">
              {paragraph}
            </p>
          </ScrollTriggerWrapper>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t border-[var(--rule)] pt-14 grid grid-cols-2 gap-8">
        <div>
          {prev && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-mute)] mb-2">Previous</div>
              <MagneticButton href={`/projects/${prev.slug}`}>← {prev.title.slice(0, 50)}{prev.title.length > 50 ? '...' : ''}</MagneticButton>
            </div>
          )}
        </div>
        <div className="text-right">
          {next && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-mute)] mb-2">Next</div>
              <MagneticButton href={`/projects/${next.slug}`}>{next.title.slice(0, 50)}{next.title.length > 50 ? '...' : ''} →</MagneticButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
