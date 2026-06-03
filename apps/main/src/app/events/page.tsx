import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { KpiGrid } from '@/components/ui/KpiGrid';

export const metadata: Metadata = {
  title: 'Events — Nikolas Stepan',
  description:
    'Cultural-events production at scale: 156 events, 20,000+ participants in 2025 across Slovakia, Czechia and Hungary.',
};

const KPIS = [
  { num: '156',  label: 'Events in 2025' },
  { num: '20k+', label: 'Participants' },
  { num: '4 yrs', label: 'GemArt programme' },
  { num: '5',    label: 'Languages working' },
];

const FORMATS = [
  {
    name: 'Festivals & public squares',
    body: '500-seat regional gastro festivals on the main public square — programming, permits, supplier panels, bilingual signage, on-the-day production.',
  },
  {
    name: 'Cultural-creative association',
    body: 'GemArt: programming, venue contracts, supplier panels, budget, multilingual marketing, day-of production, post-event reporting across eight event categories.',
  },
  {
    name: 'Workshops & team-buildings',
    body: 'Hand-blown glass, ceramics, silvering, painting. Half-day B2B team-buildings (8–20 people), B2C drop-ins, school programmes, multi-day intensives.',
  },
  {
    name: 'Luxury maison & couture',
    body: 'Multi-city couture tour through Prague, Budapest and Rožňava. Castle reconstruction site visits. Curated-pair wine tastings on a heritage estate.',
  },
  {
    name: 'Gallery openings & exhibitions',
    body: 'Gallery openings with international guests — curated programmes, multilingual catering pairings, hospitality flow.',
  },
  {
    name: 'Christmas markets & seasonal',
    body: 'Stall maps, queue plans, cashless partnerships, vendor coordination. Cross-border guest pulls via bilingual road-edge signage.',
  },
];

const STACK = [
  ['Concept & proposal', 'Brief → budget → programme → pitch deck → contracts'],
  ['Supplier & venue', 'Artisans, wine producers, caterers, venues, logistics — negotiated and managed'],
  ['Permits & compliance', 'Municipal liaison, fire-safety sign-off, GDPR-compliant guest data, insurance, allergen logs'],
  ['Marketing & promotion', '28+ social channels, campaign pages, partner co-marketing, multilingual collateral'],
  ['Day-of production', 'Run sheets, vendor coordination, multilingual guest hosting, calm under peak load'],
  ['Post-event', 'Settlement, partner reports, learnings doc, references and repeat-business motion'],
];

export default function EventsTab() {
  return (
    <>
      <section className="page-section pt-40 md:pt-52 pb-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-10">
          Pillar I · Events & Hospitality
        </div>

        <h1 className="font-serif font-light text-[clamp(42px,8vw,96px)] leading-[0.96] tracking-[-0.03em] text-[var(--ink)] mb-12 max-w-[1000px]">
          Cultural events,{' '}
          <em className="italic font-light">at scale.</em>
        </h1>

        <p className="max-w-[760px] font-serif font-light text-[clamp(18px,2vw,24px)] leading-[1.45] tracking-[-0.01em] text-[var(--ink-soft)] mb-20">
          Co-Founder of <strong className="text-[var(--ink)] font-medium">GemArt</strong> — a cultural-arts
          institute in the Gemer region of Slovakia. <strong className="text-[var(--ink)] font-medium">156
          events delivered in 2025 with 20,000+ participants</strong>, across festivals, wine tastings,
          gallery openings, Christmas markets and artisan workshops. From proposal to wrap-up, in five
          languages, with calm under seasonal peak load.
        </p>

        <KpiGrid kpis={KPIS} />
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      {/* Formats — six format cards */}
      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Six formats I run regularly</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FORMATS.map((f) => (
            <div
              key={f.name}
              className="p-8 rounded-2xl border border-[var(--rule)] bg-[var(--paper-warm)] hover:bg-[var(--paper-deep)] hover:border-[var(--ink)] transition-all"
            >
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.015em] text-[var(--ink)] mb-4">
                {f.name}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[var(--ink-soft)]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      {/* Stack — operating discipline */}
      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Operating discipline · single source-of-truth brief</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-[1000px]">
          {STACK.map(([title, body], i) => (
            <div key={title} className="flex gap-6">
              <div className="font-mono text-[12px] text-[var(--accent)] mt-1 min-w-[28px]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h4 className="font-serif text-[19px] tracking-[-0.01em] text-[var(--ink)] mb-3">{title}</h4>
                <p className="text-[14px] leading-[1.65] text-[var(--ink-soft)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — light text on dark pill (fixes the dark-on-dark complaint) */}
      <section className="page-section py-32">
        <div className="border-t border-[var(--rule)] pt-16">
          <h2 className="font-serif font-light text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-[var(--ink)] max-w-[700px] mb-10">
            Want to see how I'd run an event for you?
          </h2>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={SITE.subdomains.events}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-[14px] font-medium transition-colors"
              style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            >
              See the full events portfolio →
            </a>
            <span className="font-mono text-[12px] text-[var(--ink-mute)] uppercase tracking-[0.1em]">
              events.nikolasstepan.com
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-[13px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors border-b border-[var(--rule)] hover:border-[var(--accent)]"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
