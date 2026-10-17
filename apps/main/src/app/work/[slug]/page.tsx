import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/work';
import { caseDetails } from '@/data/case-details';
import { WorkflowDiagram } from '@/components/work/WorkflowDiagram';
import { WorkflowDemo } from '@/components/work/WorkflowDemo';

export const dynamicParams = false;

export function generateStaticParams() { return caseStudies.map(study => ({slug:study.slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params; const study=caseStudies.find(item=>item.slug===slug);
  return study ? { title:`${study.title} — Nikolas Stepan`, description:study.summary, alternates:{canonical:`/work/${slug}`} } : {};
}
export default async function CaseStudyPage({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params;
  const study=caseStudies.find(item=>item.slug===slug);
  if(!study) notFound();
  const detail=caseDetails[slug];
  return <article className="page-section case-page">
    <nav aria-label="Breadcrumb"><Link className="text-link" href="/work">← All work</Link></nav>
    <header className="case-header"><span className="mono-label">{study.company} / delivery case study</span><h1 className="portfolio-title">{study.title}</h1><p className="hero-description">{study.summary}</p><ul className="stack-tags">{study.stack.map(tag=><li key={tag}>{tag}</li>)}</ul></header>
    <section className="case-section"><h2>The business problem</h2><p>{study.problem}</p></section>
    <section className="case-section case-ownership"><h2>My contribution</h2><p>{detail.role}</p><p>{detail.dependencies}</p></section>
    <section className="case-section"><h2>Architecture &amp; boundaries</h2><p>{study.architecture}</p><WorkflowDiagram stages={detail.stages}/><p className="diagram-caption">Labelled architecture overview, reconstructed from project documentation. This is not a production trace.</p></section>
    {detail.demo && <section className="case-section"><h2>Inspect the workflow</h2><WorkflowDemo kind={detail.demo}/><div className="evidence-links"><a href="/evidence/portfolio_reference.py" download>Download reference Python ↗</a><a href="/evidence/test_portfolio_reference.py" download>Download reference tests ↗</a><a href="/evidence/README.md" download>Read scope &amp; run instructions ↗</a></div><a className="text-link" href="https://github.com/stepan4002/myprotfolios/tree/codex/unified-ai-portfolio/apps/main/public/evidence" target="_blank" rel="noopener noreferrer">Inspect the reference source on GitHub ↗</a></section>}
    <section className="case-section"><h2>Failure paths &amp; design decisions</h2><div className="decision-list">{detail.decisions.map(decision=><div key={decision.issue}><h3>{decision.issue}</h3><p>{decision.response}</p><p className="verification-note"><strong>Evidence boundary:</strong> {decision.verification}</p></div>)}</div></section>
    <section className="case-section"><h2>Delivery record</h2><dl className="delivery-record"><div><dt>Status</dt><dd>{detail.record}</dd></div><div><dt>Users &amp; scope</dt><dd>{detail.scope}</dd></div><div><dt>Dates &amp; usage</dt><dd>{detail.period}</dd></div></dl></section>
    <section className="case-section"><h2>Results &amp; measurement gaps</h2><p>{study.impact}</p><p>{detail.measurements}</p></section>
    <aside className="evidence-boundary"><h2>What is available to verify</h2><p>{detail.evidenceGap}</p><p>Architecture and delivery descriptions come from the existing project notes and CV. New reference examples demonstrate specific decisions with synthetic data; they are not original production exports.</p></aside>
    <nav className="case-next" aria-label="Other case studies">{caseStudies.filter(item=>item.slug!==slug).slice(0,3).map(item=><Link key={item.slug} href={`/work/${item.slug}`}>{item.title} ↗</Link>)}</nav>
  </article>;
}
