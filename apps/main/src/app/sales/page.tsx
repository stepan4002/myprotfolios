import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { KpiGrid } from '@/components/ui/KpiGrid';

export const metadata: Metadata = {
  title: 'Sales — Nikolas Stepan',
  description:
    'Founder-led commercial work across three ventures. Six years closing deals in five native languages, four Central-European markets.',
};

const KPIS = [
  { num: '3',  label: 'Ventures founded' },
  { num: '6',  label: 'Years selling' },
  { num: '5',  label: 'Native languages' },
  { num: '4',  label: 'Active markets' },
];

const VENTURES = [
  {
    name: 'CADEMA',
    role: 'Co-Founder · 2019 — present',
    motion: 'B2B / B2C · made-to-order manufacturing',
    body: 'Bespoke wooden sheds, garden structures and buildings. Long-cycle consultative selling — site visits, custom quotes, 3D configurator demos, multi-week negotiations across Czechia and Slovakia. Built the 3D configurator + parametric Blender pipeline + voice agent in Czech to compress quote cycles.',
  },
  {
    name: 'GemArt',
    role: 'Co-Founder · 2022 — present',
    motion: 'Sponsorships · tickets · partner agreements · EU funds',
    body: 'Cultural-arts institute in the Gemer region of Slovakia. Sponsorship sales to regional brands, ticketed events, artisan partner agreements, institutional grants. Selling experience and cultural cachet to brands, municipalities and EU funds.',
  },
  {
    name: 'Gemcraft',
    role: 'Founder · 2025 — present',
    motion: 'D2C e-commerce · EU marketplace wholesale',
    body: 'Direct-to-consumer artisan products plus wholesale into European marketplaces (Upgates, BaseLinker stack). Built the full commercial pipeline: catalogue, pricing, marketplace integrations, paid + organic acquisition.',
  },
];

const PIPELINE = [
  { n: '01', t: 'Discovery',    d: 'Listen first. Map the real need vs the stated brief. Decide whether there is a fit before pitching anything.' },
  { n: '02', t: 'Proposal',     d: 'Tight written proposal — scope, options, prices, timeline. Built for the buyer\'s decision committee, not for me.' },
  { n: '03', t: 'Negotiation',  d: 'Multilingual negotiation, terms and contracting. Comfortable holding price while finding shape concessions.' },
  { n: '04', t: 'Delivery',     d: 'I stay in the loop through delivery — operator and salesperson are the same person, so promises hold.' },
  { n: '05', t: 'Renewal',      d: 'Post-sale care, references, repeat business, partner referrals — the cheapest pipeline I have.' },
];

const MARKETS = [
  { market: 'Czechia',     langs: 'CZ · EN',           note: 'Domestic + diaspora · CADEMA, Gemcraft' },
  { market: 'Slovakia',    langs: 'SK · CZ',           note: 'Home base, 4+ years · GemArt, Gemcraft, CADEMA' },
  { market: 'France',      langs: 'FR · EN',           note: 'Grew up there, lived 18 yrs · CADEMA, partnerships' },
  { market: 'Hungary',     langs: 'EN',                note: 'Just moved · ramping' },
  { market: 'EU wholesale', langs: 'EN · ES · FR',     note: 'Marketplaces, partners · Gemcraft, US gallery placement' },
];

export default function SalesTab() {
  return (
    <>
      <section className="page-section pt-28 sm:pt-40 md:pt-52 pb-16 sm:pb-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-10">
          Pillar III · Sales & Business Development
        </div>

        <h1 className="font-serif font-light text-[clamp(42px,8vw,96px)] leading-[0.96] tracking-[-0.03em] text-[var(--ink)] mb-12 max-w-[1000px]">
          Founder-led <em className="italic font-light">commercial work,</em>{' '}
          across three ventures.
        </h1>

        <p className="max-w-[760px] font-serif font-light text-[clamp(18px,2vw,24px)] leading-[1.45] tracking-[-0.01em] text-[var(--ink-soft)] mb-20">
          <strong className="text-[var(--ink)] font-medium">Six years closing deals</strong> across
          cultural-events sponsorships, artisan wholesale and made-to-order manufacturing — in five native
          languages, across four Central-European markets. <strong className="text-[var(--ink)] font-medium">
          I sell what I build</strong>, so promises hold after close.
        </p>

        <KpiGrid kpis={KPIS} />
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Three ventures · three sales motions</div>
        <div className="space-y-10 max-w-[1000px]">
          {VENTURES.map((v) => (
            <article key={v.name} className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-16 p-10 rounded-2xl border border-[var(--rule)] bg-[var(--paper-warm)]">
              <div>
                <h3 className="font-serif text-[34px] leading-none tracking-[-0.02em] text-[var(--ink)] mb-3">
                  {v.name}
                </h3>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-4">
                  {v.role}
                </div>
                <div className="font-mono text-[12px] text-[var(--ink-mute)] leading-[1.6]">
                  {v.motion}
                </div>
              </div>
              <p className="text-[15px] leading-[1.7] text-[var(--ink-soft)]">{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Pipeline · discovery to renewal</div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PIPELINE.map((p) => (
            <div key={p.n} className="p-6 rounded-2xl border border-[var(--rule)] bg-[var(--paper-warm)]">
              <div className="font-mono text-[11px] text-[var(--accent)] mb-3">{p.n}</div>
              <h4 className="font-serif text-[18px] tracking-[-0.01em] text-[var(--ink)] mb-3">{p.t}</h4>
              <p className="text-[12.5px] leading-[1.65] text-[var(--ink-soft)]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Languages → markets · five for five</div>
        <div className="border border-[var(--rule)] rounded-2xl overflow-hidden">
          {MARKETS.map((m, i) => (
            <div
              key={m.market}
              className={`grid grid-cols-1 md:grid-cols-[200px_180px_1fr] gap-4 md:gap-8 px-8 py-6 ${i % 2 === 0 ? 'bg-[var(--paper-warm)]' : 'bg-[var(--paper-deep)]'}`}
            >
              <div className="font-serif text-[20px] tracking-[-0.015em] text-[var(--ink)]">{m.market}</div>
              <div className="font-mono text-[12px] text-[var(--accent)] tracking-[0.1em]">{m.langs}</div>
              <div className="text-[14px] text-[var(--ink-soft)] leading-[1.6]">{m.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section py-32">
        <div className="border-t border-[var(--rule)] pt-16">
          <h2 className="font-serif font-light text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-[var(--ink)] max-w-[800px] mb-10">
            Ready to talk territories, pipelines, or a specific deal?
          </h2>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={SITE.subdomains.sales}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-[14px] font-medium transition-colors"
              style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            >
              See the full sales portfolio →
            </a>
            <span className="font-mono text-[12px] text-[var(--ink-mute)] uppercase tracking-[0.1em]">
              sales.nikolasstepan.com
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
