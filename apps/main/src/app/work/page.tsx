import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/data/work';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';
export const metadata: Metadata = { title:'Work & Case Studies — Nikolas Stepan', description:'Customer-facing voice AI, HTML-aware commerce translation and catalogue automation, with architecture, ownership and inspectable reference examples.' };
export default function WorkPage() {
  return <>
    <section className="page-section page-intro"><span className="mono-label">Selected delivery work</span><h1 className="portfolio-title">The workflow.<br/><em>The decisions. The evidence.</em></h1><p className="hero-description">Start with three operational projects. Each has its own technical walkthrough, contribution statement, failure paths and a clear distinction between documented delivery and synthetic reference examples.</p></section>
    <section aria-label="Case studies" className="page-section portfolio-section"><h2 className="section-subtitle">Three projects to inspect</h2><div className="featured-grid case-study-grid">{caseStudies.slice(0,3).map((study,index)=><CaseStudyCard key={study.slug} study={study} index={index}/>)}</div></section>
    <section className="page-section portfolio-section"><div className="section-heading"><div><span className="mono-label">Supporting work</span><h2 className="h-section">Broader systems.<br/><em>Explicit scope.</em></h2></div></div><div className="supporting-work">{caseStudies.slice(3).map(study=><article key={study.slug} id={study.slug}><h3><Link href={`/work/${study.slug}`}>{study.title} ↗</Link></h3><p>{study.summary}</p>{study.slug==='groupops' && <p className="scope-note">Mixed maturity: newsroom workflow documented; other pods configured or experimental.</p>}</article>)}</div>
      <details className="integration-note"><summary>Open-source integration experience</summary><p>Paperclip AI and Postiz are existing open-source platforms. My work involves deployment, configuration, integration and customisation, rather than authorship of their core platforms.</p><a className="text-link" href="https://github.com/stepan4002/postiz-app" target="_blank" rel="noopener noreferrer">Inspect my Postiz fork ↗</a></details>
    </section>
  </>;
}
