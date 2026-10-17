import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { caseStudies } from '@/data/work';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';
import profile from '@/data/profile.json';

export function Dashboard() {
  return (
    <>
      <section className="page-section portfolio-hero evidence-hero">
        <div className="hero-kicker mono-label">AI Solutions Engineer / Forward Deployed Engineer</div>
        <h1 className="portfolio-title">AI that works.<br/><em>Where work happens.</em></h1>
        <p className="hero-description">I’m Nikolas Stepan, a technical founder in Budapest. I define workflows and architecture, direct AI-assisted implementation, integrate APIs, and guide testing and deployment.</p>
        <p className="hero-location">Budapest, Hungary · Remote preferred · English-speaking on-site roles in Hungary.</p>
        <div className="hero-actions"><Link className="btn-solid" href="/work">Explore my work ↗</Link><a className="btn-ghost" href={profile.cv} download>Download CV ↓</a><a className="text-link" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a className="text-link" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
      </section>
      <section className="page-section portfolio-section">
        <div className="section-heading"><div><span className="mono-label">Selected work / 01—03</span><h2 className="h-section">Real workflows.<br/><em>Inspectable decisions.</em></h2></div><Link href="/work" className="text-link">All case studies ↗</Link></div>
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
        <div className="home-about"><span className="mono-label">Builder. Founder. Operator.</span><h2 className="h-section">I’ve been on both sides<br />of the <em>requirements document.</em></h2><p>Co-founding CADEMA at sixteen put me close to buyers, quotations and fulfilment. Building the systems behind it taught me to connect technical choices to commercial reality. I use Claude Code and AI-assisted Python and TypeScript workflows, with architecture, integration and operational ownership as my contribution.</p><Link className="text-link" href="/about">About my background ↗</Link></div>
      </section>
      <section id="contact" className="page-section portfolio-section contact-section"><span className="mono-label">Employment &amp; collaboration</span><h2 className="h-section">Looking for a builder<br/><em>who understands operations?</em></h2><p>{profile.arrangements}</p><p>Targeting AI Solutions Engineer, Forward Deployed Engineer and AI integration opportunities.</p><div className="hero-actions"><a className="btn-solid" href={`mailto:${SITE.email}`}>Contact me ↗</a><a className="btn-ghost" href={profile.cv} download>Download CV ↓</a></div></section>
    </>
  );
}
