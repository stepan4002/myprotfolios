import type { Metadata } from 'next';
import { caseStudies } from '@/data/work';
import { projects } from '@/data/projects';
import { webProjects } from '@/data/web-projects';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';

export const metadata: Metadata = { title: 'Work & Case Studies — Nikolas Stepan', description: 'AI architecture and operational impact: GroupOps, CADEMA Voice Agent, n8n pipelines, and production software.' };

export default function WorkPage() {
  const featuredSlugs = new Set(['group-ops', 'voice-agent', 'configurator', 'upgates-migration', 'marketing-lab']);
  const otherProjects = projects.filter(project => !featuredSlugs.has(project.slug));
  const webOnly = webProjects.filter(project => ['GemCraft 19-agent OS', 'Paperclip AI', 'Gemer Times Newsroom', 'Polymarket Bot'].includes(project.title));
  return (
    <>
      <section className="page-section page-intro"><span className="mono-label">Selected work</span><h1 className="portfolio-title">One problem.<br /><em>A complete solution.</em></h1><p className="hero-description">Each case connects the business need, the architecture and what changed for the people doing the work. Technical delivery and commercial context belong in the same story.</p><nav aria-label="Featured case studies" className="case-index">{caseStudies.slice(0,3).map(study => <a key={study.slug} href={`#${study.slug}`}>{study.title} ↓</a>)}</nav></section>
      <section aria-label="Case studies" className="page-section portfolio-section"><div className="case-study-grid">{caseStudies.map((study,index) => <CaseStudyCard key={study.slug} study={study} index={index} />)}</div></section>
      <section className="page-section portfolio-section"><div className="section-heading"><div><span className="mono-label">More from the build log</span><h2 className="h-section">A wider <em>body of work.</em></h2></div></div><div className="project-log">{webOnly.map(project => <details key={project.title}><summary>{project.title}<span aria-hidden="true">+</span></summary><p>{project.desc}</p>{project.title === 'Paperclip AI' && <p>Open-source platform integrated into the operating stack; included here as an integration, not an original platform authorship claim.</p>}<ul className="stack-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></details>)}{otherProjects.filter(project => !['paperclip','polymarket-bot'].includes(project.slug)).map(project => <details key={project.slug}><summary>{project.title}<span aria-hidden="true">+</span></summary><p>{project.description}</p>{project.prose.slice(1).map((paragraph,index) => <p key={index}>{paragraph}</p>)}<ul className="stack-tags">{project.techStack.map(tag => <li key={tag}>{tag}</li>)}</ul></details>)}</div></section>
    </>
  );
}
