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
  { num: '22',  label: 'Git repositories' },
  { num: '~76', label: 'Production artifacts' },
  { num: '5',   label: 'Company pods' },
];

const STACK = [
  { tag: 'AI', title: 'Production AI systems', body: 'Multi-agent orchestration with role separation, persona + memory architectures, MCP integrations (Blender, Canva, Hyper3D), Twilio voice agents — hard-tested in Czech and Slovak.' },
  { tag: 'Web', title: 'Full-stack web', body: 'React 18/19, Next.js 15/16, NestJS, Fastify, FastAPI. Real production deployments on Hetzner, Vercel, Docker Compose. Equally fluent in TypeScript and Python.' },
  { tag: '3D', title: 'Real-time 3D', body: 'Three.js + React Three Fiber in two production apps with PDF export, live pricing, URL-shareable state. Blender / bpy / MCP for parametric server-side modelling.' },
  { tag: 'Mobile', title: 'Native mobile', body: 'Flutter (iOS / Android / Web from one codebase) with offline-first persistence and QR flows. React Native / Expo with EAS APK builds and offline-first SQLite sync.' },
  { tag: 'Pipelines', title: 'Scraping & enrichment', body: 'Playwright + Scrapling + BeautifulSoup pipelines with three-tier fallback chains, resume / progress files, polite throttling, anti-block strategies. Real production tonnage.' },
  { tag: 'Ops', title: 'Operations & infra', body: 'Founder mindset on cost, churn, throughput, audit trails. Docker multi-stage, docker-compose, Hetzner VPS, EAS, GitHub Actions, env-driven config. CI/CD that survives a rough Friday.' },
];

const SHIPPED = [
  { name: 'GroupOps', subtitle: 'AI ops stack', body: 'Multi-company AI operations: 70+ agents across 5 company pods. 5-level autonomy ladder (L0–L4), approval-gate governance, real-time mission control.' },
  { name: 'CADEMA Configurator', subtitle: '3D + commerce', body: 'Real-time Three.js wooden-structure configurator with PDF export, live pricing, URL-shareable state. Wired to a Blender/bpy parametric pipeline server-side.' },
  { name: 'Upgates AI translator', subtitle: 'GPT-4.1-mini', body: 'Production translation pipeline for an e-commerce catalogue. Handles ~3k products with retry/resume, glossary enforcement, rate-limit strategy.' },
  { name: 'Lacko Museum App', subtitle: 'Flutter + ElevenLabs', body: 'Interactive museum guide with offline-first persistence, QR-driven flows, AI-generated narration in CZ/SK/EN.' },
  { name: 'Mission Control', subtitle: 'FastAPI + Expo', body: 'Real-time approval and oversight dashboard for the agent fleet. Mobile-first, audit-trailed, push-notified on attention items.' },
  { name: 'Polymarket strategy search', subtitle: 'LLM-driven', body: 'Holdout-gated robust strategy search. Anti-overfit guardrails. Walk-forward validation. Real money, real friction.' },
];

export default function WebTab() {
  return (
    <>
      <section className="page-section pt-40 md:pt-52 pb-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-10">
          Pillar II · Web & AI Systems
        </div>

        <h1 className="font-serif font-light text-[clamp(42px,8vw,96px)] leading-[0.96] tracking-[-0.03em] text-[var(--ink)] mb-12 max-w-[1000px]">
          Production AI &{' '}
          <em className="italic font-light">full-stack systems.</em>
        </h1>

        <p className="max-w-[760px] font-serif font-light text-[clamp(18px,2vw,24px)] leading-[1.45] tracking-[-0.01em] text-[var(--ink-soft)] mb-20">
          AI-first builder shipping full products end-to-end with AI tooling.{' '}
          <strong className="text-[var(--ink)] font-medium">70+ agents across five company pods</strong>{' '}
          (Cadema, GemCraft, GemArt, Gemer Times, Csetneki), multilingual translation pipelines,
          Blender-driven 3D configurators, agent orchestration governance. Full-stack from infra to UI —
          self-taught, AI-assisted, production-deployed.
        </p>

        <KpiGrid kpis={KPIS} />
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Stack · six surfaces I ship on regularly</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK.map((s) => (
            <div key={s.title} className="p-8 rounded-2xl border border-[var(--rule)] bg-[var(--paper-warm)] hover:bg-[var(--paper-deep)] hover:border-[var(--ink)] transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-3">
                {s.tag}
              </div>
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.015em] text-[var(--ink)] mb-4">
                {s.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[var(--ink-soft)]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Selected shipped artifacts</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 max-w-[1100px]">
          {SHIPPED.map((p) => (
            <div key={p.name} className="border-l border-[var(--rule)] pl-8 py-2">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)] mb-3">
                {p.subtitle}
              </div>
              <h4 className="font-serif text-[26px] leading-tight tracking-[-0.018em] text-[var(--ink)] mb-3">
                {p.name}
              </h4>
              <p className="text-[14px] leading-[1.7] text-[var(--ink-soft)]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section py-32">
        <div className="border-t border-[var(--rule)] pt-16">
          <h2 className="font-serif font-light text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-[var(--ink)] max-w-[700px] mb-10">
            Want the deep tour of the tech stack and shipped work?
          </h2>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={SITE.subdomains.web}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-[14px] font-medium transition-colors"
              style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            >
              See the full web & AI portfolio →
            </a>
            <span className="font-mono text-[12px] text-[var(--ink-mute)] uppercase tracking-[0.1em]">
              web.nikolasstepan.com
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
