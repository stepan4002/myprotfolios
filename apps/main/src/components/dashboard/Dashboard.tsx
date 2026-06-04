'use client';

import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { Reveal } from '@/components/editorial/Reveal';
import { Counter } from '@/components/editorial/Counter';
import { LetterReveal } from '@/components/editorial/LetterReveal';
import { MagneticLink } from '@/components/editorial/MagneticLink';
import { SNAPSHOT_STATS, LANES, DISPATCHES, LIFE_PATH } from '@/data/dashboard';

export function Dashboard() {
  return (
    <>
      {/* ============== HERO ============== */}
      <section className="page-section pt-44 sm:pt-52 md:pt-60 pb-24 md:pb-40">
        <div className="mag-grid">
          <Reveal className="col-span-12 md:col-span-9">
            <div className="mono-label mb-10 md:mb-14">
              Front cover · Edition 2026
            </div>
            <h1 className="h-display">
              <LetterReveal text="Nikolas" delay={120} stagger={28} />{' '}
              <em><LetterReveal text="Stepan." delay={480} stagger={28} /></em>
            </h1>
          </Reveal>

          <Reveal delay={900} className="col-span-12 md:col-span-3 md:flex md:flex-col md:items-end md:text-right md:pt-16 mt-10 md:mt-0">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)] space-y-5">
              <div>
                <div className="opacity-60">Based</div>
                <div className="text-[var(--ink)] normal-case tracking-normal text-[13px] mt-1">{SITE.location}</div>
              </div>
              <div>
                <div className="opacity-60">Languages</div>
                <div className="text-[var(--ink)] normal-case tracking-normal text-[13px] mt-1">EN · FR · ES · CZ · SK</div>
              </div>
              <div>
                <div className="opacity-60">Status</div>
                <div className="text-[var(--accent)] normal-case tracking-normal text-[13px] mt-1">Open to new work</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== LEDE ============== */}
      <section className="page-section pb-32 md:pb-48">
        <div className="mag-grid">
          <Reveal className="col-span-12 md:col-span-7">
            <p className="lede dropcap">
              I'm twenty-three, born in the Czech Republic, raised in Spain and France, and currently in
              Budapest. I co-founded my first company at <em>sixteen</em> and have been building, directing
              and selling across <em>three ventures</em> ever since. The day-job has always been: see the
              workflow that's bottlenecking the business, build the software that removes it, and live with
              the consequences as a user.
            </p>

            <p className="lede mt-8">
              I work across three pillars — <em>cultural events</em>, <em>web &amp; AI</em>, and
              <em> international sales</em>. They're not separate hats. Each one funds, informs and
              constrains the others.
            </p>

            <p className="lede mt-8">
              I'm looking now for a senior engineering, solutions-engineering or founding-engineer role
              at a company building something I'd happily live with for years.
            </p>
          </Reveal>

          {/* Pull quote */}
          <Reveal className="col-span-12 md:col-span-5 md:pl-12 md:pt-10">
            <blockquote className="pull-quote">
              "I treat software as infrastructure for the businesses I run — not demos, production systems
              that are load-bearing for real revenue."
            </blockquote>
            <div className="figure-label mt-5">
              <b>Fig. 00</b> — Operating principle
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== SNAPSHOT — numerals ============== */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">SNAPSHOT</span>
            <h2 className="h-section flex-1">2025 — <em>2026</em></h2>
            <span className="mono-label hidden md:block">Across all three pillars</span>
          </div>
        </Reveal>

        <div className="mag-grid">
          {SNAPSHOT_STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={[
                'col-span-12 sm:col-span-6 md:col-span-4',
                'flex flex-col gap-4 pt-10 pb-10 border-t border-[var(--rule)]',
              ].join(' ')}
            >
              <div className="numeral">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
                {s.label}
              </div>
              {s.sub && (
                <div className="text-[14px] leading-[1.6] text-[var(--ink-soft)] max-w-[260px]">
                  {s.sub}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============== THREE LANES ============== */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">THREE LANES</span>
            <h2 className="h-section flex-1">One operator, <em>three motions.</em></h2>
            <span className="mono-label hidden md:block">Pick one to go deep</span>
          </div>
        </Reveal>

        <div className="mag-grid">
          {LANES.map((lane, i) => (
            <Reveal key={lane.id} delay={i * 120} className="col-span-12 md:col-span-4">
              <Link href={lane.href} className="spread group h-full">
                <div className="flex items-start justify-between">
                  <span className="mono-label" style={{ color: 'var(--accent)' }}>{lane.chapter}</span>
                  <span className="mono-label opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                </div>

                <h3 className="h-piece">
                  {lane.title} <em>{lane.titleEmphasis}</em>
                </h3>

                <p className="text-[14.5px] leading-[1.7] text-[var(--ink-soft)]">{lane.blurb}</p>

                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[var(--rule)] mt-auto">
                  {lane.stats.map((st) => (
                    <div key={st.label}>
                      <div className="font-serif text-[22px] tracking-[-0.02em] leading-none text-[var(--ink)]">{st.value}</div>
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--ink-mute)] mt-2">{st.label}</div>
                    </div>
                  ))}
                </div>
              </Link>

              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)]">
                Full edition: <MagneticLink href={lane.full} external className="text-[var(--ink)] border-b border-[var(--rule)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors normal-case tracking-normal text-[12px]">
                  {lane.full.replace('https://', '')}
                </MagneticLink>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============== SELECTED DISPATCHES ============== */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">DISPATCHES</span>
            <h2 className="h-section flex-1">Five from the <em>catalogue.</em></h2>
            <span className="mono-label hidden md:block">76 shipped artifacts</span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-16 md:gap-24">
          {DISPATCHES.map((d, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={d.fig} delay={i * 100}>
                <div className="mag-grid">
                  <div className={`col-span-12 md:col-span-2 ${flip ? 'md:order-2 md:col-start-11' : ''}`}>
                    <div className="figure-label"><b>{d.fig}</b></div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)] mt-2">{d.year}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] mt-3 border border-[var(--accent)] inline-block px-2 py-1">{d.tag}</div>
                  </div>
                  <div className={`col-span-12 md:col-span-9 ${flip ? 'md:order-1 md:col-start-2' : 'md:col-start-4'}`}>
                    <h3 className="h-piece mb-5">
                      {d.title}{d.titleEmphasis && <> · <em>{d.titleEmphasis}</em></>}
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--ink-soft)] max-w-[680px]">{d.body}</p>
                  </div>
                </div>
                <div className="rule mt-16" />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 flex flex-wrap gap-x-8 gap-y-4 items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">
            Full catalogue with interactive 3D
          </p>
          <MagneticLink href="/projects" className="btn-solid">
            Open the project archive →
          </MagneticLink>
        </Reveal>
      </section>

      {/* ============== THE PATH ============== */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">THE PATH</span>
            <h2 className="h-section flex-1">Five cities, <em>twenty-three years.</em></h2>
            <span className="mono-label hidden md:block">A short biography</span>
          </div>
        </Reveal>

        <div className="mag-grid">
          <div className="col-span-12 md:col-span-10 md:col-start-2 relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--rule)] hidden md:block" />
            {LIFE_PATH.map((stop, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="grid grid-cols-1 md:grid-cols-[80px_280px_1fr] gap-3 md:gap-10 py-6 md:py-7 border-b border-[var(--rule)] md:border-none md:pl-10 md:relative">
                  {/* timeline dot */}
                  <span className="hidden md:block absolute left-[-6px] top-[34px] w-[12px] h-[12px] rounded-full bg-[var(--accent)] ring-4 ring-[var(--paper)]" />
                  <div className="font-mono text-[12px] text-[var(--accent)] tracking-[0.1em]">{stop.year}</div>
                  <div className="font-serif text-[22px] tracking-[-0.018em] text-[var(--ink)] leading-tight">
                    {stop.place} {stop.placeEmphasis && <em className="italic text-[var(--accent)]">{stop.placeEmphasis}</em>}
                  </div>
                  <div className="text-[14px] leading-[1.65] text-[var(--ink-soft)] max-w-[520px]">{stop.note}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CONTACT (above colophon) ============== */}
      <section className="page-section pb-24 md:pb-32">
        <Reveal>
          <div className="mag-grid items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="mono-label">Last word</span>
              <h2 className="h-display mt-6 max-w-[860px]" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
                Reach out in <em>any of five languages.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:flex md:flex-col md:items-end md:text-right">
              <div className="flex flex-col gap-4 mt-12 md:mt-0">
                <MagneticLink href={`mailto:${SITE.email}`} className="btn-solid">
                  {SITE.email} →
                </MagneticLink>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="font-mono text-[13px] tracking-[0.08em] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors">
                  {SITE.phone}
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] tracking-[0.08em] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors border-b border-[var(--rule)] inline-block">
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
