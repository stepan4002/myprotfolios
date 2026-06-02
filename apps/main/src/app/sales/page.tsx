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
  { num: '3', label: 'Ventures founded' },
  { num: '6 yrs', label: 'Commercial track' },
  { num: '5 native', label: 'Working languages' },
  { num: '4 markets', label: 'Active geographies' },
];

const HIGHLIGHTS = [
  'CADEMA — bespoke wooden structures, B2B + B2C, long-cycle consultative selling across CZ/SK.',
  'GemArt — sponsorship sales, ticketed events, partner agreements with regional brands and institutions.',
  'Gemcraft — D2C e-commerce + EU marketplace wholesale (Upgates / BaseLinker stack).',
  'I sell what I build — operator and salesperson are the same person, so promises hold post-close.',
];

export default function SalesTab() {
  return (
    <div className="page-section pt-32 pb-24 md:pt-40">
      <div className="section-label mb-6">Pillar 03</div>
      <h1 className="font-serif font-light text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] mb-10">
        Sales,{' '}
        <em className="italic font-light">founder-led.</em>
      </h1>
      <p className="max-w-[760px] text-[var(--ink-soft)] text-[clamp(17px,1.9vw,21px)] leading-[1.55] mb-14">
        Six years closing deals across three ventures — cultural-events sponsorships, artisan wholesale,
        made-to-order manufacturing. Five native languages, four Central-European markets. Numbers that hold
        up when you walk into the back office.
      </p>

      <KpiGrid kpis={KPIS} />

      <div className="max-w-[760px] space-y-3 mb-14">
        {HIGHLIGHTS.map((h, i) => (
          <div key={i} className="flex gap-4">
            <span className="font-mono text-[11px] text-[var(--accent)] mt-1">0{i + 1}</span>
            <p className="text-[var(--ink-soft)] text-[16px] leading-[1.65]">{h}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-[var(--rule)]">
        <Link
          href={SITE.subdomains.sales}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-[14px] font-medium hover:bg-[var(--accent)] transition-colors"
        >
          See the full sales portfolio →
        </Link>
        <span className="font-mono text-[12px] text-[var(--ink-mute)]">
          sales.nikolasstepan.com
        </span>
      </div>
    </div>
  );
}
