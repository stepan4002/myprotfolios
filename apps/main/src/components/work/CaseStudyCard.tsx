import Link from 'next/link';
import type { CaseStudy } from '@/data/work';
import { AppsArt, AgentsArt, AutoArt } from './ProjectArt';

export function CaseStudyCard({ study, index, compact = false }: { study: CaseStudy; index: number; compact?: boolean }) {
  const Art = study.kind === 'agents' ? AgentsArt : study.kind === 'automation' ? AutoArt : AppsArt;
  return (
    <article id={compact ? undefined : study.slug} className="work-card">
      <div className="work-art" aria-hidden="true"><Art seed={index + 1} /></div>
      <div className="work-card-body">
        <div className="mono-label">0{index + 1} / {study.company}</div>
        <h3 className="h-piece"><Link href={`/work#${study.slug}`}>{study.title}</Link></h3>
        <p className="work-summary">{study.summary}</p>
        <div className="work-proof">{study.proof}</div>
        {compact ? (
          <>
            <p className="work-excerpt">{study.problem}</p>
            <Link className="text-link" href={`/work#${study.slug}`}>Read the case study <span aria-hidden="true">↗</span></Link>
          </>
        ) : (
          <>
            <div className="case-facts">
              <div><h4>The business problem</h4><p>{study.problem}</p></div>
              <div><h4>AI &amp; software architecture</h4><p>{study.architecture}</p></div>
              <div><h4>Operational impact</h4><p>{study.impact}</p></div>
            </div>
            <ul className="stack-tags" aria-label={`${study.title} technologies`}>{study.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </>
        )}
      </div>
    </article>
  );
}
