import type { TimelineEntry, Language, SkillBlock } from '@/lib/types';

export const bio = {
  shortVersion: [
    'I co-founded my first company, CADEMA (a Czech wooden-structures manufacturer), at sixteen. Six years later it has a 3D configurator, a Czech-language voice agent, a parametric Blender pipeline, and a fully migrated Upgates storefront — all of which I built. Along the way I co-founded GemArt in 2022 (a cultural NGO in the Gemer region of Slovakia) and started Gemcraft in 2025 (B2B craft-workshop sales).',
    'The day-job has always been: see the workflow that\'s bottlenecking the business → build the software that removes the bottleneck → live with the consequences as a user. That loop — not a degree — is what taught me to ship. It\'s also why I\'m looking now for a senior eng / solutions-engineer / founding-engineer role at a company building something I\'d happily live with for years.',
    'Outside of code I\'m also finishing an MSc in Health & Clinical Psychology at Birkbeck (University of London), on top of an honours BSc in Psychology with Counselling at the Open University. The psych background isn\'t decoration — it\'s what makes me good at multi-agent persona design and at user-facing AI work.',
  ],
  lede: "I'm a technical founder, multilingual, comfortable as deep in the stack as you need to go — and I keep my work close to the people who actually use it.",
};

export const skills: SkillBlock[] = [
  {
    title: 'Production AI systems',
    description:
      'Multi-agent orchestration with role separation, persona + memory architectures, MCP integrations (Blender, Canva, Hyper3D), Twilio voice agents, hard-tested in Czech and Slovak.',
    recent:
      'Marketing Lab (9 agents) · Gemer Times newsroom (6 agents) · Gemcraft CEO Agent · CADEMA voice agent',
  },
  {
    title: 'Full-stack web',
    description:
      'React 18/19, Next.js 15/16, NestJS, Fastify, FastAPI — with real production deployments on Hetzner, Vercel, Docker Compose. Equally happy in TypeScript or Python.',
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
      'Playwright + Scrapling + BeautifulSoup pipelines with three-tier fallback chains, resume / progress files, polite throttling, anti-block strategies. Real production tonnage.',
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
  { name: 'English', level: 'Native / Bilingual', proficiency: 100 },
  { name: 'French', level: 'Native / Bilingual', proficiency: 100 },
  { name: 'Spanish', level: 'Native / Bilingual', proficiency: 100 },
  { name: 'Czech', level: 'Native / Bilingual', proficiency: 100 },
  { name: 'Slovak', level: 'Native / Bilingual', proficiency: 100 },
  { name: 'Hungarian', level: 'None', proficiency: 6 },
];

export const timeline: TimelineEntry[] = [
  {
    period: '2025 — now',
    title: 'Founder — Gemcraft',
    org: 'Štítnik, SK · Glass & ceramic craft workshops',
    description:
      'B2B craft-workshop brand. Built the entire technical and operational stack solo: a Python prospect-enrichment pipeline for ~3,400 Slovak schools and SMEs, an Outlook-COM email engine with inline-image MIME, and an autonomous CEO-agent persona/memory framework on Claude.',
  },
  {
    period: '2025 — 2026',
    title: 'MSc Health & Clinical Psychology',
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
    title: 'BSc (Hons) Psychology with Counselling',
    org: 'The Open University',
  },
  {
    period: '2019 — now',
    title: 'Co-Founder — CADEMA LTD',
    org: 'Czechia · Wooden garden structures',
    description:
      'Co-founded a Czech manufacturer of wooden garden structures at age 16. Own all software: a Czech-language voice agent on Twilio, a React + Three.js 3D configurator, a parametric Blender + MCP CAD/render pipeline, a 314-SKU PrestaShop → Upgates migration, and the full CE/ES regulatory documentation set.',
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
    'Senior / staff full-stack or AI engineer at an international scaleup or AI-native company.',
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
