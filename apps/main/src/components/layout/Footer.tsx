'use client';

import { motion } from 'framer-motion';
import { SITE } from '@/lib/constants';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ScrollTriggerWrapper } from '@/components/shared/ScrollTriggerWrapper';

export function Footer() {
  return (
    <footer className="page-section pb-24 mt-32">
      {/* CTA */}
      <ScrollTriggerWrapper>
        <div className="pt-20 border-t border-[var(--rule)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end">
          <h3 className="font-serif font-light text-[clamp(32px,4.4vw,56px)] leading-[1.05] tracking-tight text-[var(--ink)] max-w-[740px]">
            I&apos;m looking for the next thing — <em className="italic">senior engineering, solutions, or founding-team.</em>
          </h3>
          <div className="md:text-right flex flex-col gap-2">
            <MagneticButton href={`mailto:${SITE.email}`}>{SITE.email}</MagneticButton>
            <MagneticButton href={SITE.linkedin}>LinkedIn</MagneticButton>
          </div>
        </div>
      </ScrollTriggerWrapper>

      {/* Colophon */}
      <div className="mt-24 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-mute)] flex justify-between border-t border-[var(--rule)] pt-5">
        <span>&copy; 2026 {SITE.name}</span>
        <span>Set in Fraunces, Geist &amp; JetBrains Mono</span>
      </div>
    </footer>
  );
}
