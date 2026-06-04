import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { Reveal } from '@/components/editorial/Reveal';
import { Counter } from '@/components/editorial/Counter';
import { MagneticLink } from '@/components/editorial/MagneticLink';

export const metadata: Metadata = {
  title: 'Events — Nikolas Stepan',
  description:
    'Cultural-events production at scale: 156 events, 20,000+ participants in 2025 across Slovakia, Czechia and Hungary.',
};

const STATS = [
  { value: 156,   suffix: '',  label: 'Events delivered · 2025' },
  { value: 20000, suffix: '+', label: 'Participants & guests · 2025' },
  { value: 4,     suffix: '',  label: 'Years running GemArt' },
  { value: 5,     suffix: '',  label: 'Working languages on the floor' },
];

const FORMATS = [
  { fig: 'I',   name: 'Festivals & public squares', body: '500-seat regional gastro festivals on the main public square — programming, permits, supplier panels, bilingual signage, on-the-day production.' },
  { fig: 'II',  name: 'Cultural-creative association', body: 'GemArt: programming, venue contracts, supplier panels, budget, multilingual marketing, day-of production, post-event reporting across eight event categories.' },
  { fig: 'III', name: 'Workshops & team-buildings', body: 'Hand-blown glass, ceramics, silvering, painting. Half-day B2B team-buildings (8–20 people), B2C drop-ins, school programmes, multi-day intensives.' },
  { fig: 'IV',  name: 'Luxury maison & couture', body: 'Multi-city couture tour through Prague, Budapest and Rožňava. Castle reconstruction site visits. Curated-pair wine tastings on a heritage estate.' },
  { fig: 'V',   name: 'Gallery openings & exhibitions', body: 'Gallery openings with international guests — curated programmes, multilingual catering pairings, hospitality flow.' },
  { fig: 'VI',  name: 'Christmas markets & seasonal', body: 'Stall maps, queue plans, cashless partnerships, vendor coordination. Cross-border guest pulls via bilingual road-edge signage.' },
];

const DISCIPLINE = [
  ['Concept & proposal',  'Brief → budget → programme → pitch deck → contracts'],
  ['Supplier & venue',    'Artisans, wine producers, caterers, venues, logistics — negotiated and managed'],
  ['Permits & compliance','Municipal liaison, fire-safety sign-off, GDPR guest data, insurance, allergen logs'],
  ['Marketing & promotion','28+ social channels, campaign pages, partner co-marketing, multilingual collateral'],
  ['Day-of production',   'Run sheets, vendor coordination, multilingual guest hosting, calm under peak load'],
  ['Post-event',          'Settlement, partner reports, learnings doc, references and repeat-business motion'],
];

export default function EventsTab() {
  return (
    <>
      {/* HERO */}
      <section className="page-section pt-44 sm:pt-52 md:pt-60 pb-20 md:pb-28">
        <Reveal>
          <span className="chapter-num">CHAPTER I</span>
          <h1 className="h-display mt-10 max-w-[1100px]" style={{ fontSize: 'clamp(40px, 8vw, 112px)' }}>
            Cultural events, <em>at scale.</em>
          </h1>
        </Reveal>

        <Reveal delay={250}>
          <p className="lede dropcap mt-14 max-w-[760px]">
            Co-Founder of <em>GemArt</em>, a cultural-arts institute in the Gemer region of Slovakia. Four
            years of festivals, wine tastings, gallery openings, Christmas markets and artisan workshops —
            <strong> 156 events delivered in 2025 with 20,000+ participants</strong>, in five working
            languages, with calm under seasonal peak load.
          </p>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="page-section pb-32 md:pb-48">
        <div className="mag-grid border-t-2 border-[var(--ink)] pt-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="col-span-12 sm:col-span-6 md:col-span-3 flex flex-col gap-4">
              <div className="numeral">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMATS */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">FORMATS</span>
            <h2 className="h-section flex-1">Six formats <em>I run regularly.</em></h2>
          </div>
        </Reveal>
        <div className="mag-grid">
          {FORMATS.map((f, i) => (
            <Reveal key={f.name} delay={i * 80} className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="spread h-full">
                <div className="figure-label"><b>Fig.</b> {f.fig}</div>
                <h3 className="h-piece" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}>{f.name}</h3>
                <p className="text-[14.5px] leading-[1.7] text-[var(--ink-soft)]">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DISCIPLINE */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">DISCIPLINE</span>
            <h2 className="h-section flex-1">Single source-of-truth <em>brief.</em></h2>
          </div>
        </Reveal>
        <div className="mag-grid">
          <div className="col-span-12 md:col-span-10 md:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {DISCIPLINE.map(([title, body], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="flex gap-6">
                  <div className="font-mono text-[12px] text-[var(--accent)] tracking-[0.12em] mt-1 min-w-[28px]">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h4 className="font-serif text-[20px] tracking-[-0.012em] text-[var(--ink)] mb-2">{title}</h4>
                    <p className="text-[14px] leading-[1.65] text-[var(--ink-soft)]">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="mag-grid">
            <blockquote className="pull-quote col-span-12 md:col-span-10 md:col-start-2">
              Food events live or die on flow. The stall map, queue plan and cashless partner is half the
              production. Bilingual signage at the road edge is what actually pulls cross-border guests.
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="mag-grid items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="mono-label">Read on</span>
              <h2 className="h-section mt-6 max-w-[700px]">
                Want to see how I'd <em>run an event</em> for you?
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:flex md:flex-col md:items-end md:text-right mt-10 md:mt-0 flex flex-col gap-4">
              <MagneticLink href={SITE.subdomains.events} external className="btn-solid">
                See full events portfolio →
              </MagneticLink>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)]">
                events.nikolasstepan.com
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
