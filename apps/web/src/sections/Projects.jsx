import { useRef, useState } from 'react';
import { AppsArt, AgentsArt, AutoArt } from './ProjectArt.jsx';

const PROJECTS = [
  {
    cat: 'apps',
    title: 'CADEMA Configurator',
    desc: 'Real-time 3D garden-pavilion configurator. Dual-synchronised 2D floor-plan + 3D Three.js scene; live pricing engine; jsPDF quote export and URL-encoded shareable state.',
    tags: ['Apps', 'React · Three.js', '2024'],
    detail: [
      'Production deployed for CADEMA — closes ~5-figure made-to-order deals.',
      'jsPDF quote export; URL-encoded shareable configurator state.',
      'Compresses a multi-week quote cycle to minutes.',
    ],
    status: 'In production · 2024 — now',
  },
  {
    cat: 'agents',
    title: 'GemCraft 19-agent OS',
    desc: '19 production agents — orchestrator, customer comms, order intake, workshop, gift card, logistics, website QA, product publishing, social, marketplace expansion, localisation, partnerships, christmas market, volunteer, innovation, knowledge, compliance, grants, finance.',
    tags: ['Agents', 'OpenClaw · Claude', '2025'],
    detail: [
      'Full company operating stack — 19 agents covering every functional area.',
      'Agents hold persona, memory, budget, schedule. Heartbeat-driven.',
      'Approval gates on outbound action; full audit log per agent.',
    ],
    status: 'In production · 2025 — now',
  },
  {
    cat: 'agents',
    title: 'Paperclip AI',
    desc: 'Open-source Node/Fastify/Postgres platform for running autonomous AI companies — agents as employees, with org charts, budgets, heartbeats, and immutable audit trails.',
    tags: ['Agents', 'OSS · Fastify', '2025'],
    detail: [
      'Open-source foundation for agent-led companies — Node/Fastify/Postgres.',
      'Org charts, budgets, heartbeats, immutable audit trails.',
      'Underpins GemCraft OS and other company pods.',
    ],
    status: 'Open source · 2025 — now',
  },
  {
    cat: 'apps',
    title: 'CADEMA 3D Generator',
    desc: 'JSON spec → Blender via MCP → photoreal renders, assembly PDFs, CAD tech pack. Hyper3D / Hunyuan3D asset assist, Cycles rendering, ReportLab PDFs.',
    tags: ['Apps · Pipeline', 'FastAPI · Blender MCP', '2025'],
    detail: [
      'JSON spec in, full pack out: renders, PDFs, CAD tech pack.',
      'FastAPI + Blender MCP + Cycles renderer + ReportLab.',
      'Hyper3D / Hunyuan3D for AI-generated assets.',
    ],
    status: 'In production · 2025',
  },
  {
    cat: 'auto',
    title: 'Marketing Lab',
    desc: '9-agent autonomous marketing-production pipeline. READY marker → orchestrator → 6 producers → brand identity + print + web + social + video. 22 deliverables in a single test pack.',
    tags: ['Automations', 'Claude · Canva MCP · Remotion', '2026'],
    detail: [
      '9 agents producing an entire campaign pack end-to-end.',
      'Orchestrator + 6 producers (brand, print, web, social, video, copy).',
      '22 deliverables shipped in a single test pack.',
    ],
    status: 'Live · 2026',
  },
  {
    cat: 'auto',
    title: 'Schools.sk Outreach',
    desc: 'Scrape ~3,400 Slovak schools, Tkinter filter UI, gender-aware Slovak email variants, Outlook COM mailer with inline-image MIME, append-only audit log.',
    tags: ['Automations', 'Python · pywin32', '2025'],
    detail: [
      '3,400 Slovak schools scraped + enriched + filtered.',
      'Gender-aware Slovak email variants (vy / ty + endings).',
      'Outlook COM mailer with inline-image MIME; append-only audit.',
    ],
    status: 'In production · 2025 — now',
  },
  {
    cat: 'apps',
    title: 'Lacko Museum App',
    desc: 'Flutter SK/EN/HU storybook tour for the Štítnik Water Castle — 10 QR stations, 9 mini-games, offline-first via Hive, hidden admin panel for staff.',
    tags: ['Apps · Mobile', 'Flutter · Riverpod · Hive', '2025'],
    detail: [
      'Flutter app (iOS/Android/Web from one codebase).',
      '10 QR stations, 9 interactive mini-games, hidden staff admin panel.',
      'Offline-first via Hive — works without WiFi on castle grounds.',
    ],
    status: 'Shipped · 2025',
  },
  {
    cat: 'agents',
    title: 'Gemer Times Newsroom',
    desc: 'AI-powered regional newsroom — editor-in-chief, researcher, three writer voices, corrector. Cron-driven editorial pipeline; YAML-validated pod config; OpenClaw bridge.',
    tags: ['Agents · Editorial', 'Node · Fastify · OpenClaw', '2025'],
    detail: [
      'Editor-in-chief, researcher, 3 writer voices, fact-corrector.',
      'Cron-driven editorial pipeline with YAML-validated pod config.',
      'OpenClaw bridge for orchestration; immutable audit trail.',
    ],
    status: 'In production · 2025',
  },
  {
    cat: 'apps',
    title: 'Polymarket Bot',
    desc: '4-subsystem BTC 5-min trader: LLM strategy search (crypto_lab), LightGBM ML lab on 870k windows, live CLOB recorder, historical replay over 6.3M real taker trades.',
    tags: ['Apps · Quant', 'Python · LightGBM', '2026'],
    detail: [
      '4 subsystems: LLM strategy search, LightGBM ML lab, live CLOB recorder, historical replay.',
      '870k feature windows in the ML lab; 6.3M real trades in replay.',
      'Holdout-gated robust strategy search · anti-overfit guardrails.',
    ],
    status: 'Live · 2026',
  },
];

function Card({ p, idx, open, onToggle }) {
  const ref = useRef(null);
  function onMove(e) {
    if (open) return; // no tilt while expanded — feels wrong
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  const Art = p.cat === 'apps' ? AppsArt : p.cat === 'agents' ? AgentsArt : AutoArt;

  return (
    <article
      ref={ref}
      className={`project-card ${open ? 'is-open' : ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      data-hover
      aria-expanded={open}
    >
      <div className="project-art">
        <Art seed={idx + 1} />
      </div>
      <div className="project-meta">
        <div className="project-tags">
          {p.tags.map((t, i) => (
            <span key={i} className={`pill ${i === 0 ? p.cat : ''}`}>{t}</span>
          ))}
        </div>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-desc">{p.desc}</p>
        <div className="project-toggle">{open ? '— close details' : '+ click for details'}</div>
        {open && (
          <div className="project-detail">
            <div className="project-detail-status">{p.status}</div>
            <ul>
              {p.detail.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Work · click any card</div>
            <h2 className="section-title">Selected <em>artifacts.</em></h2>
          </div>
          <p className="section-sub">
            Nine systems from the catalogue of seventy-six. Live products, agent platforms,
            and the pipelines that feed them. Each is deployed and running.
          </p>
        </div>

        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <Card
              key={p.title}
              p={p}
              idx={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
