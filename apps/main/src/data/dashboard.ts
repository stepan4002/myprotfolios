/**
 * Single source of truth for the editorial homepage content.
 * Keep this file plain data — no JSX — so it can be imported by
 * server and client components alike.
 */

export interface Stat { value: number; suffix?: string; prefix?: string; label: string; sub?: string; }
export interface Lane { id: 'events' | 'web' | 'sales'; chapter: string; title: string; titleEmphasis: string; blurb: string; stats: { value: string; label: string }[]; href: string; full: string; }
export interface Dispatch { fig: string; year: string; title: string; titleEmphasis?: string; body: string; tag: string; }
export interface PathStop { year: string; place: string; placeEmphasis?: string; note: string; }

export const SNAPSHOT_STATS: Stat[] = [
  { value: 3,     label: 'Ventures co-founded', sub: '2019 · 2022 · 2025 — all still operating' },
  { value: 156,   label: 'Events delivered in 2025', sub: 'across Slovakia, Czechia, Hungary' },
  { value: 20000, suffix: '+', label: 'Participants & guests in 2025' },
  { value: 70,    suffix: '+', label: 'AI agents shipped to production', sub: '5 company pods · L0–L4 ladder' },
  { value: 5,     label: 'Native working languages', sub: 'EN · FR · ES · CZ · SK' },
  { value: 6,     label: 'Years selling, continuously', sub: 'first cold pitch at sixteen' },
];

export const LANES: Lane[] = [
  {
    id: 'events',
    chapter: 'Chapter I',
    title: 'Cultural events,',
    titleEmphasis: 'at scale.',
    blurb:
      'Co-founder of GemArt — 156 events delivered in 2025 with 20,000+ participants. Festivals, wine tastings, gallery openings, Christmas markets and artisan workshops, owned end-to-end in five languages.',
    stats: [
      { value: '156',  label: 'events in 2025' },
      { value: '20k+', label: 'guests' },
      { value: '4 yrs', label: 'GemArt programme' },
    ],
    href: '/events',
    full: 'https://events.nikolasstepan.com',
  },
  {
    id: 'web',
    chapter: 'Chapter II',
    title: 'Web & AI,',
    titleEmphasis: 'production-grade.',
    blurb:
      'AI-first builder shipping full products end-to-end with AI tooling. 70+ agents across five company pods (Cadema, GemCraft, GemArt, Gemer Times, Csetneki). Translation pipelines, agent orchestration, 3D configurators, full-stack ownership.',
    stats: [
      { value: '70+',   label: 'agents shipped' },
      { value: '~76',   label: 'production artifacts' },
      { value: 'L0–L4', label: 'autonomy ladder' },
    ],
    href: '/web',
    full: 'https://web.nikolasstepan.com',
  },
  {
    id: 'sales',
    chapter: 'Chapter III',
    title: 'Founder-led',
    titleEmphasis: 'commercial work.',
    blurb:
      'Six years closing deals across three ventures — cultural-events sponsorships, artisan wholesale, made-to-order manufacturing. Five native languages, five Central-European markets, one US gallery placement (Cedar Rapids, Iowa).',
    stats: [
      { value: '3',     label: 'ventures founded' },
      { value: '6 yrs', label: 'commercial track' },
      { value: '5',     label: 'native languages' },
    ],
    href: '/sales',
    full: 'https://sales.nikolasstepan.com',
  },
];

export const DISPATCHES: Dispatch[] = [
  { fig: 'Fig. 01', year: '2024 — now',  title: 'CADEMA Configurator',          titleEmphasis: 'a real-time 3D quote engine.', body: 'Real-time 3D garden-pavilion configurator with dual-synchronised 2D floor-plan and 3D Three.js scene, jsPDF quote export, URL-encoded shareable state. Compresses a multi-week quote cycle into minutes.', tag: 'Apps · 3D' },
  { fig: 'Fig. 02', year: '2025 — now',  title: 'GroupOps',                     titleEmphasis: '70+ agents, five company pods.', body: 'Multi-company AI operations stack. 5-level autonomy ladder, approval-gate governance, real-time mission control. The platform that actually runs the businesses, not a demo.', tag: 'Agents · Ops' },
  { fig: 'Fig. 03', year: '2025',        title: 'Marketing Lab',                titleEmphasis: 'a 9-agent campaign producer.', body: 'A READY marker in a client folder triggers an orchestrator, which fans out six producers and a QA guardian. 22 deliverables shipped in a single test pack — brand, print, web, social, video, copy.', tag: 'Automations' },
  { fig: 'Fig. 04', year: '2025 — now',  title: 'Lacko Museum App',             titleEmphasis: 'a Flutter castle tour.', body: 'Interactive museum guide for the Štítnik Water Castle. 10 QR stations, 9 interactive mini-games, hidden staff admin panel, offline-first via Hive — works without WiFi on castle grounds.', tag: 'Mobile · Flutter' },
  { fig: 'Fig. 05', year: '2026',        title: 'Polymarket Bot',               titleEmphasis: 'four subsystems, two loops.', body: 'LLM strategy search, LightGBM ML lab on 870k feature windows, live CLOB recorder, historical replay over 6.3M real taker trades. Holdout-gated robust scoring with anti-overfit guardrails.', tag: 'Quant · Python' },
];

export const LIFE_PATH: PathStop[] = [
  { year: '2002', place: 'Born',                placeEmphasis: 'Czech Republic',                   note: 'Czech national. Multilingual upbringing started early.' },
  { year: '2008', place: 'Five years in',       placeEmphasis: 'Spain',                            note: 'Spanish became one of my first working languages.' },
  { year: '2013', place: 'France',              placeEmphasis: 'Montpellier',                      note: 'Lycée International Jules Guesde — Baccalauréat + Bachillerato (Spanish Lang & Lit).' },
  { year: '2019', place: 'Founded CADEMA',      placeEmphasis: 'at sixteen',                       note: 'Co-founded my first company — Czech wooden-structures manufacturer.' },
  { year: '2022', place: 'Co-founded',          placeEmphasis: 'GemArt',                           note: 'Cultural-arts institute in the Gemer region of Slovakia.' },
  { year: '2022', place: 'Started BSc',         placeEmphasis: 'Open University',                  note: 'Psychology with Counselling — distance, in parallel with founding work.' },
  { year: '2025', place: 'Founded',             placeEmphasis: 'Gemcraft',                         note: 'B2B craft-workshop brand based in Štítnik, Slovakia.' },
  { year: '2025', place: 'Started MSc',         placeEmphasis: 'Birkbeck, London',                 note: 'Health & Clinical Psychology — University of London.' },
  { year: '2026', place: 'Moved to',            placeEmphasis: 'Budapest',                         note: 'Looking for senior engineering / solutions / founding roles. Learning Hungarian.' },
];
