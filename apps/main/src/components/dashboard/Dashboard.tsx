import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { caseStudies } from '@/data/work';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';

export function Dashboard() {
  return (
    <>
      <section className="page-section portfolio-hero">
        <div className="hero-kicker mono-label">Forward Deployed AI Engineer · AI Solutions Architect</div>
        <div className="hero-grid">
          <div>
            <h1 className="portfolio-title">AI that works.<br /><em>Where work happens.</em></h1>
            <p className="hero-description">I’m Nikolas Stepan. I turn business bottlenecks into working AI systems — from multi-agent operations to voice agents and automation pipelines. I design the architecture, ship the software, and stay close to the people using it.</p>
            <div className="hero-actions"><Link className="btn-solid" href="/work">Explore my work <span aria-hidden="true">↗</span></Link><a className="btn-ghost" href={`mailto:${SITE.email}`}>Let’s talk</a></div>
          </div>
          <aside className="operator-note">
            <span className="mono-label">The technical operator</span>
            <div className="operator-flow" aria-label="Business problem to AI system to operational impact">
              <div><span>01 / Understand</span><strong>The business problem</strong></div>
              <div><span>02 / Build</span><strong>The AI system</strong></div>
              <div><span>03 / Own</span><strong>The operational outcome</strong></div>
            </div>
            <p>Budapest, Hungary<br />Five working languages<br /><span className="availability">Available for senior AI engineering roles</span></p>
          </aside>
        </div>
        <div className="proof-strip">
          <div><strong>70+</strong><span>Agents across five company pods</span></div>
          <div><strong>314</strong><span>SKUs in a catalogue migration</span></div>
          <div><strong>5</strong><span>Native / bilingual working languages</span></div>
        </div>
      </section>
      <section className="page-section portfolio-section">
        <div className="section-heading"><div><span className="mono-label">Selected work / 01—03</span><h2 className="h-section">Architecture meets <em>operations.</em></h2></div><Link href="/work" className="text-link">All case studies ↗</Link></div>
        <div className="featured-grid">{caseStudies.slice(0, 3).map((study, index) => <CaseStudyCard key={study.slug} study={study} index={index} compact />)}</div>
      </section>
      <section className="page-section portfolio-section">
        <div className="approach-grid">
          <div><span className="mono-label">How I work</span><h2 className="h-section mt-6">From the first question<br />to the <em>running system.</em></h2></div>
          <div className="approach-steps">
            <div><span>01</span><div><h3>Get close to the workflow</h3><p>Talk to the people doing the work. Map the constraint, the data and what a useful result would look like.</p></div></div>
            <div><span>02</span><div><h3>Build the right system</h3><p>Choose the smallest useful architecture: an API integration, a constrained voice flow, or agents with clear responsibilities and approval gates.</p></div></div>
            <div><span>03</span><div><h3>Deploy, observe, improve</h3><p>Handle the edge cases. Make failures visible. Keep human escalation available, and iterate with the users.</p></div></div>
          </div>
        </div>
      </section>
      <section className="page-section portfolio-section">
        <div className="home-about"><span className="mono-label">Builder. Founder. Operator.</span><h2 className="h-section">I’ve been on both sides<br />of the <em>requirements document.</em></h2><p>Co-founding CADEMA at sixteen put me close to buyers, quotations and fulfilment. Building the systems behind it taught me to connect technical choices to commercial reality. Today I work with Claude Code, Python, TypeScript, APIs and multi-agent orchestration.</p><Link className="text-link" href="/about">About my background ↗</Link></div>
      </section>
      <section id="contact" className="page-section portfolio-section contact-section"><span className="mono-label">Let’s build something useful</span><h2 className="h-section">Have a hard workflow?<br /><em>Let’s work through it.</em></h2><p>Based in Budapest. Open to Senior Forward Deployed AI Engineer and AI Solutions Architect opportunities.</p><div className="hero-actions"><a className="btn-solid" href={`mailto:${SITE.email}`}>Get in touch ↗</a><a className="text-link" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a className="text-link" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section>
    </>
  );
}
