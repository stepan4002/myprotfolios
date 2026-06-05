import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { Reveal } from '@/components/editorial/Reveal';
import { Counter } from '@/components/editorial/Counter';
import { MagneticLink } from '@/components/editorial/MagneticLink';

export const metadata: Metadata = {
  title: 'Sales — Nikolas Stepan',
  description:
    'Founder-led commercial work across three ventures. Six years closing deals in five native languages, five Central-European markets.',
};

const STATS = [
  { value: 3, label: 'Ventures co-founded' },
  { value: 6, label: 'Years selling continuously' },
  { value: 5, label: 'Native working languages' },
  { value: 5, label: 'Active markets · 1 US placement' },
];

const VENTURES = [
  { fig: 'I',   name: 'CADEMA',   role: 'Co-Founder · 2019 — present', motion: 'B2B / B2C · made-to-order manufacturing', body: 'Bespoke wooden sheds, garden structures and buildings sold across Czechia and Slovakia. Long-cycle consultative selling — site visits, custom quotes, 3D configurator demos, multi-week negotiations.' },
  { fig: 'II',  name: 'GemArt',   role: 'Co-Founder · 2022 — present', motion: 'Sponsorships · tickets · partners · EU funds', body: 'Cultural-arts institute in the Gemer region of Slovakia. Sponsorship sales to regional brands, ticketed events, artisan partner agreements, institutional grants.' },
  { fig: 'III', name: 'Gemcraft', role: 'Founder · 2025 — present',    motion: 'D2C e-commerce · EU marketplace wholesale',  body: 'Direct-to-consumer artisan products plus wholesale into European marketplaces (Upgates, BaseLinker stack). Built the full commercial pipeline.' },
];

const PIPELINE = [
  ['i',   'Discovery',   'Listen first. Map the real need vs the stated brief. Decide whether there\'s a fit before pitching.'],
  ['ii',  'Proposal',    'Tight written proposal — scope, options, prices, timeline. Built for the buyer\'s decision committee, not for me.'],
  ['iii', 'Negotiation', 'Multilingual negotiation, terms and contracting. Comfortable holding price while finding shape concessions.'],
  ['iv',  'Delivery',    'I stay in the loop through delivery — operator and salesperson are the same person, so promises hold.'],
  ['v',   'Renewal',     'Post-sale care, references, repeat business, partner referrals — the cheapest pipeline I have.'],
];

const MARKETS = [
  { name: 'Czechia',     langs: 'CZ · EN',       note: 'Domestic + diaspora · CADEMA, Gemcraft' },
  { name: 'Slovakia',    langs: 'SK · CZ',       note: 'Home base, 4+ years · GemArt, Gemcraft, CADEMA' },
  { name: 'Spain',       langs: 'ES · EN',       note: 'Lived there 5 years · CADEMA exports, partnerships' },
  { name: 'France',      langs: 'FR · EN',       note: 'Grew up there, lived 18 yrs · CADEMA, partnerships' },
  { name: 'Hungary',     langs: 'EN',            note: 'Just moved · ramping' },
  { name: 'EU wholesale', langs: 'EN · ES · FR', note: 'Marketplaces, partners · Gemcraft, US gallery placement' },
];

export default function SalesTab() {
  return (
    <>
      <section className="page-section pt-16 sm:pt-24 md:pt-32 pb-20 md:pb-28">
        <Reveal>
          <span className="chapter-num">CHAPTER III</span>
          <h1 className="h-display mt-10 max-w-[1100px]" style={{ fontSize: 'clamp(40px, 8vw, 112px)' }}>
            Founder-led <em>commercial work.</em>
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="lede dropcap mt-14 max-w-[760px]">
            <strong>Six years closing deals</strong> across cultural-events sponsorships, artisan wholesale
            and made-to-order manufacturing — in <em>five native languages</em>, across five Central-European
            markets plus a US gallery placement.
            <strong> I sell what I build</strong>, so promises hold after close.
          </p>
        </Reveal>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <div className="mag-grid border-t-2 border-[var(--ink)] pt-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="col-span-12 sm:col-span-6 md:col-span-3 flex flex-col gap-4">
              <div className="numeral"><Counter value={s.value} /></div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">VENTURES</span>
            <h2 className="h-section flex-1">Three ventures, <em>three motions.</em></h2>
          </div>
        </Reveal>
        <div className="flex flex-col gap-10">
          {VENTURES.map((v, i) => (
            <Reveal key={v.name} delay={i * 100}>
              <div className="mag-grid">
                <div className="col-span-12 md:col-span-3">
                  <div className="figure-label"><b>Fig.</b> {v.fig}</div>
                  <h3 className="font-serif text-[clamp(36px,4.5vw,54px)] leading-none tracking-[-0.025em] mt-4">{v.name}</h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mt-4">{v.role}</div>
                  <div className="font-mono text-[11px] text-[var(--ink-mute)] leading-[1.7] mt-2">{v.motion}</div>
                </div>
                <div className="col-span-12 md:col-span-9 md:pl-8">
                  <p className="lede" style={{ fontSize: 'clamp(17px, 1.7vw, 21px)' }}>{v.body}</p>
                </div>
              </div>
              <div className="rule mt-10" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">PIPELINE</span>
            <h2 className="h-section flex-1">Discovery to renewal, <em>five steps.</em></h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PIPELINE.map(([n, t, d], i) => (
            <Reveal key={t} delay={i * 70} className="border border-[var(--rule)] p-6">
              <div className="font-serif italic text-[42px] leading-none text-[var(--accent)]">{n}</div>
              <h4 className="font-serif text-[18px] tracking-[-0.012em] text-[var(--ink)] mt-4">{t}</h4>
              <p className="text-[13px] leading-[1.65] text-[var(--ink-soft)] mt-3">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">MARKETS</span>
            <h2 className="h-section flex-1">Five languages, <em>five real markets.</em></h2>
          </div>
        </Reveal>
        <div className="border border-[var(--ink)]">
          {MARKETS.map((m, i) => (
            <Reveal key={m.name} delay={i * 50}>
              <div className={`grid grid-cols-1 md:grid-cols-[200px_200px_1fr] gap-3 md:gap-8 px-6 md:px-8 py-5 ${i % 2 === 0 ? 'bg-[var(--paper)]' : 'bg-[var(--paper-warm)]'}`}>
                <div className="font-serif text-[22px] tracking-[-0.018em] text-[var(--ink)]">{m.name}</div>
                <div className="font-mono text-[12px] tracking-[0.1em] text-[var(--accent)]">{m.langs}</div>
                <div className="text-[14px] text-[var(--ink-soft)] leading-[1.6]">{m.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="mag-grid items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="mono-label">Read on</span>
              <h2 className="h-section mt-6 max-w-[760px]">
                Ready to talk <em>territories, pipelines,</em> or a specific deal?
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:flex md:flex-col md:items-end md:text-right mt-10 md:mt-0 flex flex-col gap-4">
              <MagneticLink href={SITE.subdomains.sales} external className="btn-solid">
                See full sales portfolio →
              </MagneticLink>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)]">
                sales.nikolasstepan.com
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
