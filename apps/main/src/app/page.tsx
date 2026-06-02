'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pillars } from '@/data/pillars';
import { getFeaturedProjects } from '@/data/projects';
import { SITE } from '@/lib/constants';
import { ClientOnly } from '@/components/shared/ClientOnly';
import { ScrollTriggerWrapper } from '@/components/shared/ScrollTriggerWrapper';
import { ParallaxWrapper } from '@/components/shared/ParallaxWrapper';
import { TextReveal } from '@/components/ui/TextReveal';
import { PillarCard } from '@/components/ui/Pillar';
import { CaseCard } from '@/components/ui/CaseCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const SceneCanvas = dynamic(
  () => import('@/components/scene/SceneCanvas').then((m) => m.SceneCanvas),
  { ssr: false },
);
const HeroScene = dynamic(
  () => import('@/components/scene/HeroScene').then((m) => m.HeroScene),
  { ssr: false },
);

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(heroRef);
  const featured = getFeaturedProjects();

  // Hero parallax — 3D scene moves slower than scroll for depth effect
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <LoadingScreen />

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* 3D Background — parallax: moves slower than page scroll */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
          <ClientOnly>
            <SceneCanvas style={{ width: '100%', height: '100%' }}>
              <HeroScene scrollProgress={scrollProgress} />
            </SceneCanvas>
          </ClientOnly>
        </motion.div>

        {/* Content overlay — pinned to bottom like editorial layout */}
        <div className="relative z-10 page-section w-full pb-16 pt-[40vh]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-12 border-b border-[var(--rule)] pb-12">
              <h1 className="font-serif font-light text-[clamp(56px,9vw,128px)] leading-[0.88] tracking-[-0.04em] text-[var(--ink)]">
                {'Nikolas '.split('').map((char, i) => (
                  <motion.span
                    key={`n${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 + i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                    className="inline-block"
                    style={{ minWidth: char === ' ' ? '0.25em' : undefined }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                {'Stepan'.split('').map((char, i) => (
                  <motion.span
                    key={`s${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 + i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                    className="inline-block italic font-light"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              <div className="md:text-right font-mono text-[11px] leading-[1.8] text-[var(--ink-mute)] tracking-[0.04em] uppercase">
                <div className="text-[var(--ink-mute)]">Based</div>
                <div className="text-[var(--ink)] normal-case tracking-normal text-[13px]">{SITE.location}</div>
                <div className="h-4" />
                <div className="text-[var(--ink-mute)]">Reach</div>
                <div className="text-[var(--ink)] normal-case tracking-normal text-[13px]">
                  <a href={`mailto:${SITE.email}`} className="border-b border-[var(--rule)] hover:border-[var(--accent)] transition-colors duration-200">
                    {SITE.email}
                  </a>
                </div>
                <div className="h-4" />
                <div className="text-[var(--ink-mute)]">Languages</div>
                <div className="text-[var(--ink)] normal-case tracking-normal text-[13px]">
                  EN · FR · ES · CZ · SK · HU
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-mute)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="w-px h-8 bg-[var(--accent)]"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
            Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="page-section">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--rule)] to-transparent" />
      </div>

      {/* ==================== LEDE ==================== */}
      <section className="page-section py-24 md:py-36">
        <TextReveal
          text="I'm 23 — a founder/operator who works across three pillars: production AI & software systems, cultural-event direction in the Gemer region of Slovakia, and international sales for a Czech wood manufacturer and a Slovak craft maison."
          className="max-w-[820px] font-serif font-light text-[clamp(22px,2.5vw,30px)] leading-[1.4] tracking-[-0.018em] text-[var(--ink-soft)]"
        />
      </section>

      {/* ==================== THREE PILLARS ==================== */}
      <section className="page-section pb-32">
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">Three Pillars · 2022 — 2026</div>
        </ScrollTriggerWrapper>

        <ParallaxWrapper speed={-0.04}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </div>
        </ParallaxWrapper>
      </section>

      {/* ==================== FEATURED CASES ==================== */}
      <section className="page-section pb-32">
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">Featured · across pillars</div>
        </ScrollTriggerWrapper>

        {featured.map((project, i) => (
          <CaseCard key={project.slug} project={project} index={i} total={featured.length} />
        ))}
      </section>

      {/* Gradient divider */}
      <div className="page-section">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--rule)] to-transparent" />
      </div>

      {/* ==================== MORE WORK ==================== */}
      <section className="page-section pb-16 pt-16">
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">More Work</div>
        </ScrollTriggerWrapper>

        <ScrollTriggerWrapper delay={0.1}>
          <p className="max-w-[680px] text-[var(--ink-soft)] text-[17px] leading-[1.65] mb-10">
            Each pillar has its own catalogue. Tech lists the ~76 shipped artifacts;
            Events documents fashion shows, tours, wine tastings, workshops and food events;
            Sales walks through the EU markets, the marketplace stack and the US gallery placement.
          </p>
        </ScrollTriggerWrapper>

        <ScrollTriggerWrapper delay={0.2}>
          <div className="flex flex-wrap gap-8">
            <MagneticButton href="/projects?filter=tech">Tech catalogue →</MagneticButton>
            <MagneticButton href="/projects?filter=events">Events catalogue →</MagneticButton>
            <MagneticButton href="/projects?filter=sales">Sales catalogue →</MagneticButton>
          </div>
        </ScrollTriggerWrapper>
      </section>
    </>
  );
}
