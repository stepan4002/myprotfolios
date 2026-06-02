import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About — Nikolas Stepan',
  description:
    'Born in the Czech Republic, raised in Spain and France, now in Budapest. Founder of three ventures, multilingual operator, AI-first builder.',
};

const PATH = [
  { yr: '2002', place: 'Born', detail: 'Czech Republic' },
  { yr: '~2008', place: 'Spain', detail: '5 years — Spanish became one of my first languages' },
  { yr: '2013', place: 'France', detail: 'Montpellier · Lycée International Jules Guesde · Baccalauréat + Bachillerato (Spanish Lang & Lit)' },
  { yr: '2019', place: 'CADEMA founded', detail: 'Co-founded my first company at sixteen — Czech wooden-structures manufacturer' },
  { yr: '2022', place: 'GemArt founded', detail: 'Co-founded the cultural-arts institute in the Gemer region of Slovakia' },
  { yr: '2022', place: 'Open University', detail: 'Started BSc (Hons) Psychology with Counselling — distance, in parallel with founding work' },
  { yr: '2025', place: 'Gemcraft founded', detail: 'B2B craft-workshop brand — Štítnik, Slovakia' },
  { yr: '2025', place: 'London', detail: 'Started MSc Health & Clinical Psychology at Birkbeck (University of London)' },
  { yr: '2026', place: 'Budapest', detail: 'Just moved — looking for senior engineering / solutions / founding roles. Learning Hungarian.' },
];

const SKILLS = [
  { title: 'Production AI systems', body: 'Multi-agent orchestration, role separation, persona + memory architectures, MCP integrations (Blender, Canva, Hyper3D), Twilio voice agents in CZ/SK.' },
  { title: 'Full-stack web', body: 'React 18/19, Next.js 15/16, NestJS, Fastify, FastAPI. Real production deployments on Hetzner, Vercel, Docker Compose. TypeScript or Python.' },
  { title: 'Real-time 3D', body: 'Three.js + React Three Fiber with PDF export, live pricing, URL-shareable state. Blender / bpy / MCP for server-side parametric modelling.' },
  { title: 'Native mobile', body: 'Flutter (iOS/Android/Web from one codebase) with offline-first persistence and QR flows. React Native / Expo with EAS APK builds.' },
  { title: 'Scraping & enrichment', body: 'Playwright + Scrapling + BeautifulSoup pipelines with three-tier fallback, resume/progress files, polite throttling, anti-block strategies.' },
  { title: 'Operations & infra', body: 'Docker multi-stage, docker-compose, Hetzner VPS, EAS, GitHub Actions, env-driven config. CI/CD that survives a rough Friday.' },
];

const LANGS = [
  { name: 'English', level: 'Native / Bilingual', dots: 10 },
  { name: 'French',  level: 'Native / Bilingual', dots: 10 },
  { name: 'Spanish', level: 'Native / Bilingual', dots: 10 },
  { name: 'Czech',   level: 'Native / Bilingual', dots: 10 },
  { name: 'Slovak',  level: 'Native / Bilingual', dots: 10 },
  { name: 'Hungarian', level: 'Learning',         dots: 1 },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-section pt-40 md:pt-52 pb-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mb-10">
          About
        </div>

        <h1 className="font-serif font-light text-[clamp(42px,8vw,96px)] leading-[0.96] tracking-[-0.03em] text-[var(--ink)] mb-12 max-w-[1000px]">
          Twenty-three,{' '}
          <em className="italic font-light">five languages,</em>{' '}
          three ventures.
        </h1>

        <div className="space-y-6 max-w-[760px] font-serif font-light text-[clamp(17px,1.8vw,21px)] leading-[1.55] tracking-[-0.01em] text-[var(--ink-soft)]">
          <p>
            I co-founded my first company, <strong className="text-[var(--ink)] font-medium">CADEMA</strong>{' '}
            (a Czech wooden-structures manufacturer), at sixteen. Six years later it has a 3D configurator,
            a Czech-language voice agent, a parametric Blender pipeline and a fully migrated Upgates
            storefront — all of which I built. Along the way I co-founded{' '}
            <strong className="text-[var(--ink)] font-medium">GemArt</strong> in 2022 (a cultural NGO in the
            Gemer region of Slovakia) and started{' '}
            <strong className="text-[var(--ink)] font-medium">Gemcraft</strong> in 2025 (B2B craft-workshop
            sales).
          </p>
          <p>
            The day-job has always been: see the workflow that's bottlenecking the business → build the
            software that removes the bottleneck → live with the consequences as a user. That loop — not a
            degree — is what taught me to ship. It's also why I'm looking now for a{' '}
            <em className="italic">senior eng / solutions-engineer / founding-engineer role</em> at a
            company building something I'd happily live with for years.
          </p>
          <p>
            Outside of code I'm also finishing an{' '}
            <strong className="text-[var(--ink)] font-medium">MSc in Health & Clinical Psychology</strong>{' '}
            at Birkbeck (University of London), on top of an honours BSc in Psychology with Counselling at
            the Open University. The psych background isn't decoration — it's what makes me good at
            multi-agent persona design and at user-facing AI work.
          </p>
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Path · the timeline</div>
        <div className="space-y-0 max-w-[900px]">
          {PATH.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[80px_240px_1fr] gap-3 md:gap-6 py-7 border-b border-[var(--rule)] last:border-b-0 hover:bg-[var(--paper-warm)] -mx-4 px-4 rounded-lg transition-colors"
            >
              <div className="font-mono text-[13px] text-[var(--accent)] pt-1">{p.yr}</div>
              <div className="font-serif text-[20px] tracking-[-0.015em] text-[var(--ink)]">{p.place}</div>
              <div className="text-[14px] text-[var(--ink-soft)] leading-[1.6]">{p.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="page-section">
        <div className="h-px bg-[var(--rule)]" />
      </div>

      <section className="page-section py-24 md:py-32">
        <div className="section-label mb-14">Skills · six surfaces, all shipped to production</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((s) => (
            <div key={s.title} className="p-8 rounded-2xl border border-[var(--rule)] bg-[var(--paper-warm)] hover:bg-[var(--paper-deep)] hover:border-[var(--ink)] transition-all">
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
        <div className="section-label mb-14">Languages · five native, one in progress</div>
        <div className="space-y-3 max-w-[700px]">
          {LANGS.map((l) => (
            <div key={l.name} className="grid grid-cols-[140px_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-6 items-center py-4 border-b border-[var(--rule)]">
              <div className="font-serif text-[20px] md:text-[22px] tracking-[-0.015em] text-[var(--ink)]">{l.name}</div>
              <div className="flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-[6px] flex-1 rounded-full"
                    style={{
                      background: i < l.dots ? 'var(--ink)' : 'var(--rule)',
                    }}
                  />
                ))}
              </div>
              <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[var(--ink-mute)] text-right min-w-[100px] md:min-w-[140px]">
                {l.level}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section py-32">
        <div className="border-t border-[var(--rule)] pt-16">
          <h2 className="font-serif font-light text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-[var(--ink)] max-w-[700px] mb-10">
            Let's talk.
          </h2>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--ink)] hover:bg-[var(--accent)] transition-colors text-[14px] font-medium"
              style={{ color: 'var(--paper)' }}
            >
              {SITE.email} →
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="font-mono text-[14px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors"
            >
              {SITE.phone}
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener"
              className="font-mono text-[14px] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors border-b border-[var(--rule)]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
