const COLS = [
  {
    cls: '',
    title: 'Frontend &amp; 3D',
    items: ['Next.js 16 · React 19', 'React Three Fiber · Drei', 'Three.js + GLSL shaders', 'Vite · Tailwind · Zustand', 'Flutter · React Native (Expo)', 'jsPDF · html2canvas', 'GSAP · Lenis', 'Smarty (PrestaShop)']
  },
  {
    cls: 'agents',
    title: 'AI &amp; agents',
    items: ['Claude (Code + API)', 'OpenAI GPT-4o · GPT-4.1', 'ElevenLabs TTS', 'OpenClaw runtime', 'Blender / Canva MCP', 'Hyper3D · Hunyuan3D', 'Playwright + Scrapling', 'Custom 3-layer memory']
  },
  {
    cls: 'auto',
    title: 'Backend &amp; orchestration',
    items: ['Node.js · NestJS · Fastify', 'Python · FastAPI · APScheduler', 'Temporal (background jobs)', 'pywin32 Outlook COM', 'BeautifulSoup4 · Tenacity', 'Pydantic v2 · SQLAlchemy', 'Click CLIs', 'Webhooks · SSE']
  },
  {
    cls: 'data',
    title: 'Data · infra · deploy',
    items: ['PostgreSQL · Prisma · SQLite', 'Hive (mobile offline-first)', 'Docker · docker-compose · Nginx', 'Hetzner · Vercel · Railway', 'EAS (Expo) · GitHub Actions', 'Jenkins · CodeRabbit', 'pnpm monorepos', 'OpenAPI · WebSockets']
  }
];

export default function TechStack() {
  return (
    <section className="stack" id="stack">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Toolbelt</div>
            <h2 className="section-title">What it's <em>built with.</em></h2>
          </div>
          <p className="section-sub">
            A working stack picked across hundreds of shipped commits.
            Conservative where it has to be, novel where it should be.
          </p>
        </div>
        <div className="stack-grid">
          {COLS.map((col, i) => (
            <div key={i} className={`stack-col ${col.cls} reveal`}>
              <h4 dangerouslySetInnerHTML={{ __html: col.title }} />
              <ul>
                {col.items.map((t, j) => <li key={j}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
