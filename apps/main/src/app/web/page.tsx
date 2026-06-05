import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { Reveal } from '@/components/editorial/Reveal';
import { Counter } from '@/components/editorial/Counter';
import { MagneticLink } from '@/components/editorial/MagneticLink';

export const metadata: Metadata = {
  title: 'Web & AI — Nikolas Stepan',
  description:
    'AI-first builder. 70+ agents across 5 company pods, production translation pipelines, agent orchestration, full-stack ownership.',
};

const STATS = [
  { value: 70, suffix: '+', label: 'AI agents shipped' },
  { value: 22, suffix: '',  label: 'Git repositories' },
  { value: 76, suffix: '',  label: 'Production artifacts' },
  { value: 5,  suffix: '',  label: 'Company pods' },
];

const STACK = [
  { tag: 'AI',        title: 'Production AI systems',     body: 'Multi-agent orchestration with role separation, persona + memory architectures, MCP integrations (Blender, Canva, Hyper3D), Twilio voice agents — hard-tested in Czech and Slovak.' },
  { tag: 'Web',       title: 'Full-stack web',            body: 'React 18/19, Next.js 15/16, NestJS, Fastify, FastAPI. Real production deployments on Hetzner, Vercel, Docker Compose. Equally fluent in TypeScript and Python.' },
  { tag: '3D',        title: 'Real-time 3D',              body: 'Three.js + React Three Fiber in two production apps with PDF export, live pricing, URL-shareable state. Blender / bpy / MCP for parametric server-side modelling.' },
  { tag: 'Mobile',    title: 'Native mobile',             body: 'Flutter (iOS / Android / Web from one codebase) with offline-first persistence and QR flows. React Native / Expo with EAS APK builds and offline-first SQLite sync.' },
  { tag: 'Pipelines', title: 'Scraping & enrichment',     body: 'Playwright + Scrapling + BeautifulSoup pipelines with three-tier fallback chains, resume / progress files, polite throttling, anti-block strategies. Real production tonnage.' },
  { tag: 'Ops',       title: 'Operations & infra',        body: 'Founder mindset on cost, churn, throughput, audit trails. Docker multi-stage, docker-compose, Hetzner VPS, EAS, GitHub Actions, env-driven config. CI/CD that survives a rough Friday.' },
];

const SHIPPED = [
  { fig: 'A', name: 'GroupOps',              subtitle: 'AI ops stack',          body: 'Multi-company AI operations: 70+ agents across 5 company pods. 5-level autonomy ladder (L0–L4), approval-gate governance, real-time mission control.' },
  { fig: 'B', name: 'CADEMA Configurator',   subtitle: '3D + commerce',         body: 'Real-time Three.js wooden-structure configurator with PDF export, live pricing, URL-shareable state. Wired to a Blender/bpy parametric pipeline server-side.' },
  { fig: 'C', name: 'Upgates AI translator', subtitle: 'GPT-4.1-mini',          body: 'Production translation pipeline for an e-commerce catalogue. Handles ~3k products with retry/resume, glossary enforcement, rate-limit strategy.' },
  { fig: 'D', name: 'Lacko Museum App',      subtitle: 'Flutter + ElevenLabs',  body: 'Interactive museum guide with offline-first persistence, QR-driven flows, AI-generated narration in CZ/SK/EN.' },
  { fig: 'E', name: 'Mission Control',       subtitle: 'FastAPI + Expo',        body: 'Real-time approval and oversight dashboard for the agent fleet. Mobile-first, audit-trailed, push-notified on attention items.' },
  { fig: 'F', name: 'Polymarket strategy',   subtitle: 'LLM-driven',            body: 'Holdout-gated robust strategy search. Anti-overfit guardrails. Walk-forward validation. Real money, real friction.' },
];

export default function WebTab() {
  return (
    <>
      <section className="page-section pt-16 sm:pt-24 md:pt-32 pb-20 md:pb-28">
        <Reveal>
          <span className="chapter-num">CHAPTER II</span>
          <h1 className="h-display mt-10 max-w-[1100px]" style={{ fontSize: 'clamp(40px, 8vw, 112px)' }}>
            Web &amp; AI, <em>production-grade.</em>
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="lede dropcap mt-14 max-w-[760px]">
            AI-first builder shipping full products end-to-end with AI tooling.
            <strong> 70+ agents across five company pods</strong> (Cadema, GemCraft, GemArt, Gemer Times,
            Csetneki), multilingual translation pipelines, Blender-driven 3D configurators, agent
            orchestration governance. <em>Full-stack from infra to UI</em> — self-taught, AI-assisted,
            production-deployed.
          </p>
        </Reveal>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <div className="mag-grid border-t-2 border-[var(--ink)] pt-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="col-span-12 sm:col-span-6 md:col-span-3 flex flex-col gap-4">
              <div className="numeral"><Counter value={s.value} suffix={s.suffix} /></div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">STACK</span>
            <h2 className="h-section flex-1">Six surfaces, <em>all shipped.</em></h2>
          </div>
        </Reveal>
        <div className="mag-grid">
          {STACK.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="spread h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">{s.tag}</div>
                <h3 className="h-piece" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}>{s.title}</h3>
                <p className="text-[14.5px] leading-[1.7] text-[var(--ink-soft)]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">SHIPPED</span>
            <h2 className="h-section flex-1">Selected <em>artifacts.</em></h2>
            <span className="mono-label hidden md:block">A→F</span>
          </div>
        </Reveal>
        <div className="mag-grid">
          {SHIPPED.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="col-span-12 md:col-span-6">
              <div className="border-l border-[var(--rule)] pl-8 py-2">
                <div className="figure-label mb-3"><b>Fig. {p.fig}</b> · {p.subtitle}</div>
                <h4 className="font-serif text-[clamp(22px,2.4vw,28px)] tracking-[-0.018em] text-[var(--ink)] mb-3 leading-tight">{p.name}</h4>
                <p className="text-[14.5px] leading-[1.7] text-[var(--ink-soft)]">{p.body}</p>
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
                The deep tour of the <em>tech stack</em> and shipped work.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:flex md:flex-col md:items-end md:text-right mt-10 md:mt-0 flex flex-col gap-4">
              <MagneticLink href={SITE.subdomains.web} external className="btn-solid">
                See full web &amp; AI portfolio →
              </MagneticLink>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)]">
                web.nikolasstepan.com
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
