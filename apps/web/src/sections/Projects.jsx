import { useRef } from 'react';
import { AppsArt, AgentsArt, AutoArt } from './ProjectArt.jsx';

const PROJECTS = [
  {
    cat: 'apps', size: 'lg',
    title: 'CADEMA Configurator',
    desc: 'Real-time 3D garden-pavilion configurator. Dual-synchronised 2D floor-plan + 3D Three.js scene; live pricing engine; jsPDF quote export and URL-encoded shareable state.',
    tags: ['Apps', 'React · Three.js', '2024']
  },
  {
    cat: 'agents', size: 'md',
    title: 'GemCraft 19-agent OS',
    desc: '19 production agents — orchestrator, customer comms, order intake, workshop, gift card, logistics, website QA, product publishing, social, marketplace expansion, localisation, partnerships, christmas market, volunteer, innovation, knowledge, compliance, grants, finance.',
    tags: ['Agents', 'OpenClaw · Claude', '2025']
  },
  {
    cat: 'agents', size: 'sm',
    title: 'Paperclip AI',
    desc: 'Open-source Node/Fastify/Postgres platform for running autonomous AI companies — agents as employees, with org charts, budgets, heartbeats, and immutable audit trails.',
    tags: ['Agents', 'OSS · Fastify', '2025']
  },
  {
    cat: 'apps', size: 'md',
    title: 'CADEMA 3D Generator',
    desc: 'JSON spec → Blender via MCP → photoreal renders, assembly PDFs, CAD tech pack. Hyper3D / Hunyuan3D asset assist, Cycles rendering, ReportLab PDFs.',
    tags: ['Apps · Pipeline', 'FastAPI · Blender MCP', '2025']
  },
  {
    cat: 'auto', size: 'md',
    title: 'Marketing Lab',
    desc: '9-agent autonomous marketing-production pipeline. READY marker → orchestrator → 6 producers → brand identity + print + web + social + video. 22 deliverables in a single test pack.',
    tags: ['Automations', 'Claude · Canva MCP · Remotion', '2026']
  },
  {
    cat: 'auto', size: 'sm',
    title: 'Schools.sk Outreach',
    desc: 'Scrape ~3,400 Slovak schools, Tkinter filter UI, gender-aware Slovak email variants, Outlook COM mailer with inline-image MIME, append-only audit log.',
    tags: ['Automations', 'Python · pywin32', '2025']
  },
  {
    cat: 'apps', size: 'sm',
    title: 'Lacko Museum App',
    desc: 'Flutter SK/EN/HU storybook tour for the Štítnik Water Castle — 10 QR stations, 9 mini-games, offline-first via Hive, hidden admin panel for staff.',
    tags: ['Apps · Mobile', 'Flutter · Riverpod · Hive', '2025']
  },
  {
    cat: 'agents', size: 'md',
    title: 'Gemer Times Newsroom',
    desc: 'AI-powered regional newsroom — editor-in-chief, researcher, three writer voices, corrector. Cron-driven editorial pipeline; YAML-validated pod config; OpenClaw bridge.',
    tags: ['Agents · Editorial', 'Node · Fastify · OpenClaw', '2025']
  },
  {
    cat: 'apps', size: 'md',
    title: 'Polymarket Bot',
    desc: '4-subsystem BTC 5-min trader: LLM strategy search (crypto_lab), LightGBM ML lab on 870k windows, live CLOB recorder, historical replay over 6.3M real taker trades.',
    tags: ['Apps · Quant', 'Python · LightGBM', '2026']
  }
];

function Card({ p, idx }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  const Art = p.cat === 'apps' ? AppsArt : p.cat === 'agents' ? AgentsArt : AutoArt;

  return (
    <article
      ref={ref}
      className={`project-card size-${p.size} reveal`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-hover
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
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Work</div>
            <h2 className="section-title">Selected <em>artifacts.</em></h2>
          </div>
          <p className="section-sub">
            Nine systems from the catalogue of seventy-six. Live products, agent platforms,
            and the pipelines that feed them. Each is deployed and running.
          </p>
        </div>

        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
