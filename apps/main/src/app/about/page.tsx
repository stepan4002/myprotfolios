'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { bio, skills, languages, timeline, workingPreferences } from '@/data/about';
import { ClientOnly } from '@/components/shared/ClientOnly';
import { ScrollTriggerWrapper } from '@/components/shared/ScrollTriggerWrapper';
import { ParallaxWrapper } from '@/components/shared/ParallaxWrapper';
import { Timeline } from '@/components/ui/Timeline';

const SceneCanvas = dynamic(
  () => import('@/components/scene/SceneCanvas').then((m) => m.SceneCanvas),
  { ssr: false },
);
const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then((m) => m.ParticleField),
  { ssr: false },
);
const FloatingRings = dynamic(
  () => import('@/components/three/FloatingRings').then((m) => m.FloatingRings),
  { ssr: false },
);

export default function AboutPage() {
  return (
    <>
      {/* Ambient 3D — floating rings + sparse particles for organic feel */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <ClientOnly>
          <SceneCanvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 5]} intensity={0.4} />
            <ParticleField count={300} spread={20} size={0.006} color="#E5A78F" />
            <FloatingRings count={7} radius={4} color="#B14A2F" />
          </SceneCanvas>
        </ClientOnly>
      </div>

      <div className="relative z-10 page-section pt-32 pb-16">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-12 border-b border-[var(--rule)] pb-14 mb-16"
        >
          <h1 className="font-serif font-light text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.035em] text-[var(--ink)]">
            About <span className="italic font-light">me.</span>
          </h1>
          <div className="md:text-right font-mono text-[11px] leading-[1.8] text-[var(--ink-mute)] tracking-[0.04em] uppercase">
            <div>Age</div>
            <div className="text-[var(--ink)] normal-case tracking-normal text-[13px]">23</div>
            <div className="h-4" />
            <div>Based</div>
            <div className="text-[var(--ink)] normal-case tracking-normal text-[13px]">Budapest, HU</div>
            <div className="h-4" />
            <div>Open to</div>
            <div className="text-[var(--ink)] normal-case tracking-normal text-[13px]">Budapest · Remote · EU</div>
          </div>
        </motion.header>

        {/* Lede */}
        <ScrollTriggerWrapper>
          <p className="font-serif font-light text-[clamp(22px,2.5vw,30px)] leading-[1.4] tracking-[-0.018em] text-[var(--ink-soft)] max-w-[820px] mb-20">
            {bio.lede}
          </p>
        </ScrollTriggerWrapper>

        {/* Story */}
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">The short version</div>
        </ScrollTriggerWrapper>
        <div className="max-w-[760px] mb-24">
          {bio.shortVersion.map((para, i) => (
            <ScrollTriggerWrapper key={i} delay={i * 0.05}>
              <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] mb-5">{para}</p>
            </ScrollTriggerWrapper>
          ))}
        </div>

        {/* Skills */}
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">What I do best</div>
        </ScrollTriggerWrapper>
        <ParallaxWrapper speed={-0.03}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-24">
            {skills.map((skill, i) => (
              <ScrollTriggerWrapper key={skill.title} delay={i * 0.08}>
                <div className="border border-[var(--rule)] p-8 transition-all duration-300 hover:border-[var(--accent-soft)] hover:bg-[var(--paper-warm)] hover:shadow-md group">
                  <h3 className="font-serif font-normal text-[22px] tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">{skill.title}</h3>
                  <p className="text-[var(--ink-soft)] text-[14.5px] leading-[1.65]">{skill.description}</p>
                  <div className="font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--ink-mute)] mt-6 mb-2">Recently</div>
                  <p className="text-[var(--ink-soft)] text-[14px] leading-[1.6]">{skill.recent}</p>
                </div>
              </ScrollTriggerWrapper>
            ))}
          </div>
        </ParallaxWrapper>

        {/* Languages */}
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">Languages</div>
        </ScrollTriggerWrapper>
        <div className="max-w-[760px] mb-6">
          {languages.map((lang, i) => (
            <ScrollTriggerWrapper key={lang.name} delay={i * 0.06}>
              <div
                className={`grid grid-cols-[120px_1fr_100px] md:grid-cols-[140px_1fr_110px] gap-4 items-baseline pb-4 border-b border-dotted border-[var(--rule)] mb-4 ${
                  lang.proficiency < 10 ? 'opacity-40' : ''
                }`}
              >
                <div className="font-serif font-normal italic text-[20px] md:text-[22px] text-[var(--ink)]">{lang.name}</div>
                <motion.div
                  className="h-0.5 bg-[var(--ink)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-[var(--ink-mute)] text-right">{lang.level}</div>
              </div>
            </ScrollTriggerWrapper>
          ))}
        </div>
        <ScrollTriggerWrapper>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-mute)] max-w-[760px] leading-[1.7] mb-24">
            I&apos;m based in Budapest but do not speak Hungarian. I&apos;m looking for roles where
            the working language is one of the five above.
          </p>
        </ScrollTriggerWrapper>

        {/* Timeline */}
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">Timeline</div>
        </ScrollTriggerWrapper>
        <div className="mb-24">
          <Timeline entries={timeline} />
        </div>

        {/* Working preferences */}
        <ScrollTriggerWrapper>
          <div className="section-label mb-12">Working preferences</div>
        </ScrollTriggerWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ScrollTriggerWrapper>
            <div className="border border-[var(--rule)] p-8 transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-md">
              <h3 className="font-serif font-normal text-[22px] tracking-tight mb-4">What I&apos;m looking for</h3>
              <ul className="text-[var(--ink-soft)] text-[15px] leading-[1.7] pl-5 list-disc space-y-2">
                {workingPreferences.lookingFor.map((item, i) => (<li key={i}>{item}</li>))}
              </ul>
            </div>
          </ScrollTriggerWrapper>
          <ScrollTriggerWrapper delay={0.1}>
            <div className="border border-[var(--rule)] p-8 transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-md">
              <h3 className="font-serif font-normal text-[22px] tracking-tight mb-4">What I&apos;d rather not do</h3>
              <ul className="text-[var(--ink-soft)] text-[15px] leading-[1.7] pl-5 list-disc space-y-2">
                {workingPreferences.ratherNot.map((item, i) => (<li key={i}>{item}</li>))}
              </ul>
            </div>
          </ScrollTriggerWrapper>
        </div>
      </div>
    </>
  );
}
