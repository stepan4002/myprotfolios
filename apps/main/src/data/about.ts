import type { TimelineEntry, Language, SkillBlock } from '@/lib/types';

import profile from './profile.json';
export const bio = { shortVersion: [profile.summary, profile.education], lede: profile.summary };

export const skills: SkillBlock[] = [
  {
    title: 'Production AI systems',
    description:
      'Multi-agent orchestration with role separation, persona + memory architectures, MCP integrations (Blender, Canva, Hyper3D), Twilio voice-agent integration with Czech-language constraints.',
    recent:
      'Marketing Lab (9 agents) · Gemer Times newsroom (6 agents) · Gemcraft CEO Agent · CADEMA voice agent',
  },
  {
    title: 'Full-stack web',
    description:
      'React 18/19, Next.js 15/16, NestJS, Fastify, FastAPI — with real production deployments on Hetzner, Vercel, Docker Compose. Implementation in TypeScript and Python is AI-assisted; my contribution centres on architecture, integration and deployment.',
    recent:
      'GemMark (Next 16 / R19 / Three.js) · Mission Control (FastAPI + Expo) · Upgates AI translator',
  },
  {
    title: 'Real-time 3D',
    description:
      'Three.js + React Three Fiber in two production apps with PDF export, live pricing, URL-shareable state. Blender / bpy / MCP for parametric server-side modelling.',
    recent: 'CADEMA Configurator · CADEMA 3D Generator (Blender + MCP)',
  },
  {
    title: 'Native mobile',
    description:
      'Flutter (iOS / Android / Web from one codebase) with offline-first persistence and QR-driven flows; React Native / Expo with EAS APK builds and offline-first SQLite sync.',
    recent: 'Lacko Museum App · Mission Control mobile',
  },
  {
    title: 'Scraping & enrichment',
    description:
      'Playwright + Scrapling + BeautifulSoup pipelines with three-tier fallback chains, resume / progress files, polite throttling, anti-block strategies. Designed around operational data and explicit exception handling.',
    recent: 'Schools.sk · Companies.sk · AI Gemer Researcher',
  },
  {
    title: 'Operations & infra',
    description:
      'Founder mindset on cost, churn, throughput and audit trails. Docker multi-stage, docker-compose, Hetzner VPS, EAS, GitHub Actions, env-driven config. CI/CD that survives a rough Friday.',
    recent: 'Self-hosted Postiz · Paperclip AI · Group-Ops bridge',
  },
];

export const languages: Language[] = [
  { name: 'English', level: 'Fluent', proficiency: 100 },
  { name: 'French', level: 'Fluent', proficiency: 100 },
  { name: 'Spanish', level: 'Fluent', proficiency: 100 },
  { name: 'Czech', level: 'Native', proficiency: 100 },
  { name: 'Slovak', level: 'Native', proficiency: 100 },
  { name: 'Hungarian', level: 'None', proficiency: 6 },
];

export const timeline: TimelineEntry[] = [
  {
    period: '2025 — now',
    title: 'Founder — Gemcraft',
    org: 'Štítnik, SK · Glass & ceramic craft workshops',
    description:
      'B2B craft-workshop brand. Directed AI-assisted delivery of the technical and operational tooling: a Python prospect-enrichment pipeline for ~3,400 Slovak schools and SMEs, an Outlook-COM email engine with inline-image MIME, and an autonomous CEO-agent persona/memory framework on Claude.',
  },
  {
    period: '2025 — 2026',
    title: 'Postgraduate psychology studies',
    org: 'Birkbeck, University of London',
    description:
      'Postgraduate research-track psychology — complementing the engineering work with formal training in human behaviour, evidence-based intervention design and quantitative methods.',
  },
  {
    period: '2022 — now',
    title: 'Co-Founder — GemArt',
    org: 'Betliar, SK · Gemerský umelecký inštitút, o.z.',
    description:
      'Co-founded the Gemer Artistic Institute — a cultural NGO around art, wine and gastronomy in the Gemer region. Plan and run events, manage cross-language partnerships, lead all digital tooling.',
  },
  {
    period: '2022 — 2025',
    title: 'Psychology studies',
    org: 'The Open University',
  },
  {
    period: '2019 — now',
    title: 'Co-Founder — CADEMA LTD',
    org: 'Czechia · Wooden garden structures',
    description:
      'Co-founded a Czech manufacturer of wooden garden structures at age 16. Defined requirements and directed AI-assisted delivery for: a Czech-language voice agent on Twilio, a React + Three.js 3D configurator, a parametric Blender + MCP CAD/render pipeline, a 314-SKU PrestaShop → Upgates migration, and the full CE/ES regulatory documentation set.',
  },
  {
    period: '—',
    title: 'Leadership for Global Business and Politics',
    org: 'Yale School of Management · Course',
  },
  {
    period: '2018 — 2021',
    title: 'Baccalauréat (General) · Bachillerato',
    org: 'Lycée International Jules Guesde, Montpellier',
  },
];

export const workingPreferences = {
  lookingFor: [
    'AI Solutions Engineer or Forward Deployed Engineer working on operational integrations.',
    'Forward-deployed / solutions engineer at an AI infra company (Anthropic, OpenAI, Vercel, ElevenLabs, LangChain, Cursor …).',
    'Founding engineer at a remote-first early-stage startup.',
    'Roles where multilingual range — especially Czech / Slovak / French / Spanish — is an asset, not a tax.',
  ],
  ratherNot: [
    "Hungarian-language-mandatory roles — I don't speak Hungarian.",
    'Pure consultancy / agency body-shop work with no product.',
    "Roles with no AI / agentic surface area — that's where I've been investing for two years and it's where I'd like to stay.",
  ],
};
