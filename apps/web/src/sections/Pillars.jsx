import { useState } from 'react';

const PILLARS = [
  {
    key: 'apps',
    num: '01',
    tag: 'Apps & web',
    title: <>Full-stack web &amp; <em>real-time 3D.</em></>,
    blurb:
      'Next.js, FastAPI, Three.js, Flutter, React Native. Configurators that close the sale. Dashboards that survive bad WiFi. PDF and CAD pipelines that ship to factory.',
    grid: [
      ['Stacks',      'Next · FastAPI · R3F'],
      ['Mobile',      'Flutter · Expo'],
      ['3D',          'Three.js · Blender MCP'],
      ['E-commerce',  'Upgates · PrestaShop'],
    ],
    expanded: {
      headline: 'Production-deployed since 2019.',
      lines: [
        'CADEMA Configurator — real-time Three.js with PDF export, live pricing, URL-shareable state. Compresses a multi-day quote cycle to minutes.',
        'Mission Control — FastAPI + Expo dashboard for the agent fleet. Mobile-first, audit-trailed, push-notified.',
        'Lacko Museum App — Flutter (iOS/Android/Web) with offline-first persistence and QR flows. CZ/SK/EN narration.',
        'CADEMA Voice Agent — Czech-language Twilio agent for inbound qualification on the factory phone line.',
      ],
    },
  },
  {
    key: 'agents',
    num: '02',
    tag: 'AI agents',
    title: <>Autonomous <em>agent systems.</em></>,
    blurb:
      'Heartbeat-driven agents with role separation, memory and budget. 70+ agents across five company pods. Built on Claude, OpenClaw and custom orchestration.',
    grid: [
      ['Group orchestrator', 'Master Executive'],
      ['Company pods',       '5 · 70+ agents'],
      ['Frameworks',         'Claude · OpenClaw · Paperclip'],
      ['Memory',             '3-layer · graph + notes'],
    ],
    expanded: {
      headline: '5-level autonomy ladder, approval-gate governance.',
      lines: [
        'GroupOps — multi-company stack across Cadema, GemCraft, GemArt, Gemer Times, Csetneki.',
        'Marketing Lab — 9 agents producing campaign packs end-to-end. Concept → copy → designs → exports.',
        'Gemer Times newsroom — 6 agents researching, writing, fact-checking, scheduling.',
        'CEO Agent — autonomous persona with memory, budget, daily standup and approval gates.',
      ],
    },
  },
  {
    key: 'auto',
    num: '03',
    tag: 'Automations',
    title: <>Pipelines that <em>do the work.</em></>,
    blurb:
      'Scraping, enrichment, multilingual outreach, marketing-pack production, parametric model rendering. Production-grade pipelines that run nightly and ship.',
    grid: [
      ['Schools.sk',     '3,400 schools'],
      ['Companies.sk',   '2,320 prospects'],
      ['Marketing Lab',  '9-agent pack producer'],
      ['CADEMA Gen',     'JSON → 3D + PDF + CAD'],
    ],
    expanded: {
      headline: 'Real production tonnage — not demos.',
      lines: [
        '3,400 Slovak schools enriched and matched to a workshop-buying profile. Outlook-COM email engine with inline-image MIME.',
        '2,320 Slovak SMEs enriched for B2B craft-workshop outreach.',
        'CADEMA Generator — JSON spec → Blender parametric model → PDF quote + CAD file in one pipeline.',
        'Upgates AI translator — production translation for ~3k SKUs with retry/resume, glossary enforcement, rate-limit strategy.',
      ],
    },
  },
];

export default function Pillars() {
  const [open, setOpen] = useState(null); // pillar key or null

  return (
    <section className="pillars" id="pillars">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Disciplines · click to expand</div>
            <h2 className="section-title">Three <em>working surfaces.</em></h2>
          </div>
          <p className="section-sub">
            One operator, three disciplines that compound. The web layer ships product.
            The agent layer runs the business. The automation layer keeps both fed.
          </p>
        </div>

        <div className="pillar-grid">
          {PILLARS.map((p) => {
            const isOpen = open === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setOpen(isOpen ? null : p.key)}
                aria-expanded={isOpen}
                className={`pillar ${p.key} ${isOpen ? 'is-open' : ''}`}
                data-hover
              >
                <div className="num"><span className="dot" /> {p.num} &nbsp;{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <ul>
                  {p.grid.map(([k, v]) => (
                    <li key={k}><span>{k}</span><strong>{v}</strong></li>
                  ))}
                </ul>

                <div className="pillar-toggle">
                  <span className="pillar-toggle-label">
                    {isOpen ? '— close' : '+ expand'}
                  </span>
                </div>

                {isOpen && (
                  <div className="pillar-detail">
                    <div className="pillar-detail-head">{p.expanded.headline}</div>
                    <ol>
                      {p.expanded.lines.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
