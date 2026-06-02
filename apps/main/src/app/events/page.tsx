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
  { num: '156', label: 'Events in 2025' },
  { num: '20k+', label: 'Participants' },
  { num: '4 yrs', label: 'GemArt programme' },
  { num: '5 langs', label: 'Guest hosting' },
];

const HIGHLIGHTS = [
  'Festivals, wine tastings, Christmas markets, gallery openings, artisan workshops — owned end-to-end.',
  'Hosted international guests on site visits across Gemer in French, Spanish, English, Czech & Slovak.',
  'Negotiated contracts with artisans, wine producers, caterers, venues and logistics suppliers.',
  'Built a repeatable vendor roster and ran promotion across 28+ social channels.',
];

export default function EventsTab() {
  return (
    <div className="page-section pt-32 pb-24 md:pt-40">
      <div className="section-label mb-6">Pillar 01</div>
      <h1 className="font-serif font-light text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] mb-10">
        Cultural events,{' '}
        <em className="italic font-light">at scale.</em>
      </h1>
      <p className="max-w-[760px] text-[var(--ink-soft)] text-[clamp(17px,1.9vw,21px)] leading-[1.55] mb-14">
        Co-Founder of GemArt — a cultural-arts institute in the Gemer region of Slovakia. Four years of
        festivals, tastings, gallery openings, Christmas markets and artisan workshops. From proposal to
        wrap-up, in five languages, with calm under seasonal peak load.
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
          href={SITE.subdomains.events}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-[14px] font-medium hover:bg-[var(--accent)] transition-colors"
        >
          See the full events portfolio →
        </Link>
        <span className="font-mono text-[12px] text-[var(--ink-mute)]">
          events.nikolasstepan.com
        </span>
      </div>
    </div>
  );
}
