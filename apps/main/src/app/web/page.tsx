import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { KpiGrid } from '@/components/ui/KpiGrid';

export const metadata: Metadata = {
  title: 'Web & AI — Nikolas Stepan',
  description:
    'AI-first builder. 70+ agents across 5 company pods, production translation pipelines, agent orchestration, full-stack ownership.',
};

const KPIS = [
  { num: '70+', label: 'Agents shipped' },
  { num: '5 pods', label: 'Company stacks' },
  { num: 'L0–L4', label: 'Autonomy ladder' },
  { num: 'Full-stack', label: 'Front to ops' },
];

const HIGHLIGHTS = [
  'GroupOps — multi-company AI operations stack running 70+ agents across 5 company pods today.',
  'Production AI pipelines: GPT-4.1-mini translation, GPT-4o event scraper, ElevenLabs museum narration.',
  'Blender-based 3D configurator + render pipeline wired to FastAPI; React + Three.js frontends.',
  'Comfortable with MCP servers, rate-limit strategy, anti-hallucination safeguards, Docker deploys.',
];

export default function WebTab() {
  return (
    <div className="page-section pt-32 pb-24 md:pt-40">
      <div className="section-label mb-6">Pillar 02</div>
      <h1 className="font-serif font-light text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] mb-10">
        Web & AI,{' '}
        <em className="italic font-light">end-to-end.</em>
      </h1>
      <p className="max-w-[760px] text-[var(--ink-soft)] text-[clamp(17px,1.9vw,21px)] leading-[1.55] mb-14">
        AI-first builder shipping full products end-to-end with AI tooling. 70+ agents across five company
        pods (Cadema, GemCraft, GemArt, Gemer Times, Csetneki), multilingual translation pipelines,
        Blender-driven 3D configurators, agent orchestration governance. Full-stack from infra to UI.
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
          href={SITE.subdomains.web}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-[14px] font-medium hover:bg-[var(--accent)] transition-colors"
        >
          See the full web & AI portfolio →
        </Link>
        <span className="font-mono text-[12px] text-[var(--ink-mute)]">
          web.nikolasstepan.com
        </span>
      </div>
    </div>
  );
}
