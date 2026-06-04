import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { Reveal } from '@/components/editorial/Reveal';
import { MagneticLink } from '@/components/editorial/MagneticLink';

export const metadata: Metadata = {
  title: 'About — Nikolas Stepan',
  description:
    'Born in the Czech Republic, raised in Spain and France, now in Budapest. Founder of three ventures, multilingual operator, AI-first builder.',
};

const PATH = [
  { yr: '2002', place: 'Born',             em: 'Czech Republic',            detail: 'Czech national. Multilingual upbringing started early.' },
  { yr: '2008', place: 'Five years in',    em: 'Spain',                     detail: 'Spanish became one of my first working languages.' },
  { yr: '2013', place: 'Moved to',         em: 'Montpellier, France',       detail: 'Lycée International Jules Guesde — Baccalauréat + Bachillerato (Spanish Lang & Lit).' },
  { yr: '2019', place: 'Co-founded',       em: 'CADEMA',                    detail: 'My first company at sixteen — Czech wooden-structures manufacturer.' },
  { yr: '2022', place: 'Co-founded',       em: 'GemArt',                    detail: 'Cultural-arts institute in the Gemer region of Slovakia.' },
  { yr: '2022', place: 'Started BSc',      em: 'Open University',           detail: 'Psychology with Counselling — distance, in parallel with founding work.' },
  { yr: '2025', place: 'Founded',          em: 'Gemcraft',                  detail: 'B2B craft-workshop brand based in Štítnik, Slovakia.' },
  { yr: '2025', place: 'Started MSc',      em: 'Birkbeck, London',          detail: 'Health & Clinical Psychology — University of London.' },
  { yr: '2026', place: 'Moved to',         em: 'Budapest',                  detail: 'Looking for senior engineering / solutions / founding-engineer roles.' },
];

const SKILLS = [
  { title: 'Production AI systems', body: 'Multi-agent orchestration, role separation, persona + memory architectures, MCP integrations (Blender, Canva, Hyper3D), Twilio voice agents in CZ/SK.' },
  { title: 'Full-stack web',        body: 'React 18/19, Next.js 15/16, NestJS, Fastify, FastAPI. Real production deployments on Hetzner, Vercel, Docker Compose. TypeScript or Python.' },
  { title: 'Real-time 3D',          body: 'Three.js + React Three Fiber with PDF export, live pricing, URL-shareable state. Blender / bpy / MCP for server-side parametric modelling.' },
  { title: 'Native mobile',         body: 'Flutter (iOS/Android/Web from one codebase) with offline-first persistence and QR flows. React Native / Expo with EAS APK builds.' },
  { title: 'Scraping & enrichment', body: 'Playwright + Scrapling + BeautifulSoup pipelines with three-tier fallback, resume/progress files, polite throttling, anti-block strategies.' },
  { title: 'Operations & infra',    body: 'Docker multi-stage, docker-compose, Hetzner VPS, EAS, GitHub Actions, env-driven config. CI/CD that survives a rough Friday.' },
];

const LANGS = [
  { name: 'English',  level: 'Native / Bilingual', dots: 10 },
  { name: 'French',   level: 'Native / Bilingual', dots: 10 },
  { name: 'Spanish',  level: 'Native / Bilingual', dots: 10 },
  { name: 'Czech',    level: 'Native / Bilingual', dots: 10 },
  { name: 'Slovak',   level: 'Native / Bilingual', dots: 10 },
  { name: 'Hungarian', level: 'Learning',          dots: 1 },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-section pt-44 sm:pt-52 md:pt-60 pb-20 md:pb-28">
        <Reveal>
          <span className="chapter-num">ABOUT</span>
          <h1 className="h-display mt-10 max-w-[1200px]" style={{ fontSize: 'clamp(42px, 8vw, 120px)' }}>
            Twenty-three, <em>five languages,</em> three ventures.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="mag-grid mt-16">
            <div className="col-span-12 md:col-span-8">
              <p className="lede dropcap">
                I co-founded my first company, <em>CADEMA</em> (a Czech wooden-structures manufacturer), at
                sixteen. Six years later it has a 3D configurator, a Czech-language voice agent, a parametric
                Blender pipeline and a fully migrated Upgates storefront — all of which I built. Along the
                way I co-founded <em>GemArt</em> in 2022 (a cultural NGO in the Gemer region of Slovakia)
                and started <em>Gemcraft</em> in 2025 (B2B craft-workshop sales).
              </p>
              <p className="lede mt-8">
                The day-job has always been: see the workflow that's bottlenecking the business → build the
                software that removes it → live with the consequences as a user. That loop — not a degree —
                is what taught me to ship. I'm looking now for a <em>senior eng / solutions /
                founding-engineer role</em> at a company building something I'd happily live with for years.
              </p>
              <p className="lede mt-8">
                Outside of code I'm also finishing an <em>MSc in Health &amp; Clinical Psychology</em> at
                Birkbeck (University of London), on top of an honours BSc in Psychology with Counselling at
                the Open University. The psych background isn't decoration — it's what makes me good at
                multi-agent persona design and at user-facing AI work.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">THE PATH</span>
            <h2 className="h-section flex-1">A short <em>biography.</em></h2>
          </div>
        </Reveal>
        <div className="mag-grid">
          <div className="col-span-12 md:col-span-10 md:col-start-2 relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--rule)] hidden md:block" />
            {PATH.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="grid grid-cols-1 md:grid-cols-[80px_320px_1fr] gap-3 md:gap-10 py-6 md:py-7 border-b border-[var(--rule)] md:border-none md:pl-10 md:relative">
                  <span className="hidden md:block absolute left-[-6px] top-[34px] w-[12px] h-[12px] rounded-full bg-[var(--accent)] ring-4 ring-[var(--paper)]" />
                  <div className="font-mono text-[12px] text-[var(--accent)] tracking-[0.1em]">{p.yr}</div>
                  <div className="font-serif text-[22px] tracking-[-0.018em] text-[var(--ink)] leading-tight">
                    {p.place} <em className="italic text-[var(--accent)]">{p.em}</em>
                  </div>
                  <div className="text-[14px] leading-[1.65] text-[var(--ink-soft)] max-w-[520px]">{p.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-end gap-6 mb-16 border-b-2 border-[var(--ink)] pb-4">
            <span className="chapter-num">SKILLS</span>
            <h2 className="h-section flex-1">Six surfaces, <em>all shipped.</em></h2>
          </div>
        </Reveal>
        <div className="mag-grid">
          {SKILLS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60} className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="spread h-full">
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
            <span className="chapter-num">LANGUAGES</span>
            <h2 className="h-section flex-1">Five native, <em>one in progress.</em></h2>
          </div>
        </Reveal>
        <div className="mag-grid">
          <div className="col-span-12 md:col-span-10 md:col-start-2 space-y-3">
            {LANGS.map((l) => (
              <div key={l.name} className="grid grid-cols-[140px_1fr_auto] md:grid-cols-[200px_1fr_auto] gap-4 md:gap-8 items-center py-4 border-b border-[var(--rule)]">
                <div className="font-serif text-[20px] md:text-[24px] tracking-[-0.015em] text-[var(--ink)]">{l.name}</div>
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-[6px] flex-1 rounded-full"
                      style={{ background: i < l.dots ? 'var(--ink)' : 'var(--rule)' }}
                    />
                  ))}
                </div>
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[var(--ink-mute)] text-right min-w-[100px] md:min-w-[140px]">{l.level}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pb-32 md:pb-48">
        <Reveal>
          <div className="mag-grid items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="mono-label">Last word</span>
              <h2 className="h-section mt-6 max-w-[700px]">Let's <em>talk.</em></h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:flex md:flex-col md:items-end md:text-right mt-10 md:mt-0 flex flex-col gap-4">
              <MagneticLink href={`mailto:${SITE.email}`} className="btn-solid">{SITE.email} →</MagneticLink>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="font-mono text-[13px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors">{SITE.phone}</a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors border-b border-[var(--rule)] inline-block">LinkedIn ↗</a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
