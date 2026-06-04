import type { Metadata } from 'next';
import { Reveal } from '@/components/editorial/Reveal';
import { ConstellationClient } from '@/components/projects-3d/ConstellationClient';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Project archive — Nikolas Stepan',
  description: 'Interactive 3D archive of every shipped artifact across cultural events, web & AI, and international sales.',
};

export default function ProjectsPage() {
  const counts = {
    tech:   projects.filter((p) => p.category === 'tech').length,
    events: projects.filter((p) => p.category === 'events').length,
    sales:  projects.filter((p) => p.category === 'sales').length,
  };

  return (
    <>
      <section className="page-section pt-44 sm:pt-52 md:pt-60 pb-14 md:pb-20">
        <Reveal>
          <span className="chapter-num">PROJECT ARCHIVE</span>
          <h1 className="h-display mt-10 max-w-[1200px]" style={{ fontSize: 'clamp(40px, 8vw, 112px)' }}>
            Every shipped artifact, <em>floating in space.</em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-12 max-w-[760px]">
            A 3D archive of <strong>{projects.length} shipped artifacts</strong>: <em>{counts.tech} apps &amp; AI systems</em>, <em>{counts.events} event productions</em>, <em>{counts.sales} sales / commercial</em>. Drag to orbit, Shift+scroll to zoom, click any node to read the case.
          </p>
        </Reveal>
      </section>

      <section className="page-section pb-24 md:pb-32">
        <Reveal>
          <div className="border border-[var(--ink)] overflow-hidden bg-[var(--paper-warm)]">
            <ConstellationClient />
          </div>
        </Reveal>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">
          ● Apps &amp; AI · ■ Events · ◆ Sales · colour-coded by category
        </p>
      </section>
    </>
  );
}
