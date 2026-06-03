'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/constants';
import { TabRevealText } from '@/components/ui/TabRevealText';

/* ──────────────────────────────────────────────────────────────────────────
 * Clean, fast dashboard. No heavy 3D — just typography, generous whitespace,
 * and one tasteful animated element (the title reveal).
 * ─────────────────────────────────────────────────────────────────────── */

const HERO_KPIS = [
  { num: '3',     label: 'Ventures founded' },
  { num: '156',   label: 'Events in 2025' },
  { num: '20k+',  label: 'Participants' },
  { num: '70+',   label: 'AI agents shipped' },
  { num: '5',     label: 'Native languages' },
  { num: '4',     label: 'Markets active' },
];

const PILLARS = [
  {
    id: 'events',
    roman: 'I',
    title: 'Events & Culture',
    blurb: 'Cultural-arts producer at GemArt — 156 events, 20,000+ guests in 2025. Festivals, wine tastings, gallery openings, Christmas markets, artisan workshops. End-to-end ownership in five languages.',
    href: '/events',
    full: SITE.subdomains.events,
    stats: [
      ['156',  'events / 2025'],
      ['20k+', 'guests'],
      ['4 yrs','GemArt programme'],
    ],
  },
  {
    id: 'web',
    roman: 'II',
    title: 'Web & AI',
    blurb: 'AI-first builder shipping full products with AI tooling. GroupOps — 70+ agents across 5 company pods. Translation pipelines, agent orchestration, 3D configurators, full-stack ownership.',
    href: '/web',
    full: SITE.subdomains.web,
    stats: [
      ['70+',   'agents shipped'],
      ['5',     'company pods'],
      ['L0–L4', 'autonomy ladder'],
    ],
  },
  {
    id: 'sales',
    roman: 'III',
    title: 'Sales & Business Dev',
    blurb: 'Founder-led commercial work across three ventures. Cultural-events sponsorships, artisan wholesale, made-to-order manufacturing. Six years of cycles in five languages, four markets.',
    href: '/sales',
    full: SITE.subdomains.sales,
    stats: [
      ['3',      'ventures'],
      ['6 yrs',  'selling'],
      ['4',      'markets'],
    ],
  },
];

const LIFE_PATH = [
  { place: 'Czech Republic', note: 'Born' },
  { place: 'Spain',          note: '5 years' },
  { place: 'France',          note: 'Lycée International, Montpellier' },
  { place: 'London',          note: 'MSc Birkbeck' },
  { place: 'Budapest',        note: 'Now' },
];

export function Dashboard() {
  const heroRef = useRef<HTMLElement>(null);

  // Counter animation for KPIs (lightweight, only runs once on enter)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll<HTMLElement>('[data-counter]');
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          const raw = el.textContent ?? '';
          const m = raw.match(/(\d+)/);
          if (!m) return;
          const target = parseInt(m[1], 10);
          const prefix = raw.slice(0, m.index!);
          const suffix = raw.slice(m.index! + m[1].length);
          const start = performance.now();
          (function tick(now: number) {
            const t = Math.min(1, (now - start) / 1200);
            const v = Math.round(target * (1 - Math.pow(1 - t, 3)));
            el.textContent = `${prefix}${v}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
          })(start);
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* HERO — calmer scale, more whitespace, no overflow */}
      <section
        ref={heroRef}
        className="page-section pt-28 sm:pt-40 md:pt-56 pb-20 sm:pb-32 md:pb-48 overflow-x-hidden"
      >
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mb-8 sm:mb-12 md:mb-16">
          Nikolas Stepan — Portfolio 2026
        </div>

        <h1
          className="font-serif font-light leading-[1.02] tracking-[-0.035em] text-[var(--ink)] mb-10 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(36px, 8vw, 96px)', maxWidth: '14ch' }}
        >
          <TabRevealText>Founder, builder,</TabRevealText>{' '}
          <em className="italic font-light"><TabRevealText delay={250}>operator.</TabRevealText></em>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 sm:gap-14 md:gap-24 items-start mt-10 sm:mt-16 md:mt-20">
          <p
            className="font-serif font-light leading-[1.5] tracking-[-0.015em] text-[var(--ink-soft)]"
            style={{ fontSize: 'clamp(16px, 1.8vw, 21px)', maxWidth: '600px' }}
          >
            I'm Nikolas — 23, Czech, multilingual. I co-founded my first company at sixteen and have been
            building, directing and selling across three ventures ever since. I work across three pillars:
            <em className="italic"> cultural events</em>, <em className="italic">web & AI</em>, and
            <em className="italic"> international sales</em>.
          </p>

          <div className="font-mono text-[11px] sm:text-[12px] leading-[2] text-[var(--ink-mute)] uppercase tracking-[0.1em] md:text-right md:min-w-[240px]">
            <div className="opacity-60">Based</div>
            <div className="text-[var(--ink)] normal-case tracking-normal text-[13px] sm:text-[14px] mt-1">{SITE.location}</div>
            <div className="mt-5 sm:mt-7 opacity-60">Reach</div>
            <div className="text-[var(--ink)] normal-case tracking-normal text-[13px] sm:text-[14px] mt-1 break-all">
              <a href={`mailto:${SITE.email}`} className="border-b border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                {SITE.email}
              </a>
            </div>
            <div className="mt-5 sm:mt-7 opacity-60">Languages</div>
            <div className="text-[var(--ink)] normal-case tracking-normal text-[13px] sm:text-[14px] mt-1">EN · FR · ES · CZ · SK</div>
          </div>
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      {/* KPI STRIP — combined dashboard */}
      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Snapshot · across all three pillars</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          {HERO_KPIS.map((k) => (
            <div key={k.label} className="flex flex-col">
              <div
                data-counter
                className="font-serif font-light text-[clamp(40px,4.5vw,56px)] leading-none tracking-[-0.03em] text-[var(--ink)]"
              >
                {k.num}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--ink-mute)] mt-4">
                {k.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      {/* THREE PILLARS — substantial cards, each with stats + tab link + subdomain link */}
      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Three pillars · pick one to go deep</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {PILLARS.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group flex flex-col gap-8 p-10 rounded-2xl border border-[var(--rule)] bg-[var(--paper-warm)] hover:bg-[var(--paper-deep)] hover:border-[var(--ink)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  Pillar {p.roman}
                </div>
                <div className="font-mono text-[11px] text-[var(--ink-mute)] uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open →
                </div>
              </div>

              <h3 className="font-serif font-light text-[clamp(28px,3.5vw,40px)] leading-[1.05] tracking-[-0.02em] text-[var(--ink)]">
                {p.title}
              </h3>

              <p className="text-[15px] leading-[1.7] text-[var(--ink-soft)]">
                {p.blurb}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--rule)] mt-auto">
                {p.stats.map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif text-[22px] leading-none tracking-[-0.02em] text-[var(--ink)]">{n}</div>
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--ink-mute)] mt-2">{l}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-8 gap-y-3 font-mono text-[11px] sm:text-[12px] text-[var(--ink-mute)] uppercase tracking-[0.1em]">
          <span>Direct subdomains →</span>
          {PILLARS.map((p) => (
            <a
              key={p.id}
              href={p.full}
              className="text-[var(--ink)] border-b border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors normal-case tracking-normal text-[12px] sm:text-[13px] break-all sm:break-normal"
            >
              {p.full.replace('https://', '')}
            </a>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      {/* LIFE PATH — a strip showing geography */}
      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Path · five cities, four countries, twenty-three years</div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2">
          {LIFE_PATH.map((stop, i) => (
            <div key={stop.place} className="flex flex-col gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-serif font-light text-[clamp(22px,2.5vw,30px)] leading-tight tracking-[-0.02em] text-[var(--ink)]">
                {stop.place}
              </div>
              <div className="font-mono text-[11px] text-[var(--ink-mute)] uppercase tracking-[0.1em]">
                {stop.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-section py-32 md:py-40">
        <h2 className="font-serif font-light text-[clamp(32px,5vw,60px)] leading-[1.05] tracking-[-0.025em] text-[var(--ink)] max-w-[800px] mb-12">
          Reach out in any of five languages —{' '}
          <em className="italic">I'll reply within the day.</em>
        </h2>

        <div className="flex flex-wrap gap-x-10 gap-y-6 items-center">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-[14px] font-medium transition-colors"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--ink)'; }}
          >
            {SITE.email} →
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="font-mono text-[14px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors"
          >
            {SITE.phone}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener"
            className="font-mono text-[14px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors border-b border-[var(--rule)]"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
