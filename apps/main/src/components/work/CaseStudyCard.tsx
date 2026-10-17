import Link from 'next/link';
import type { CaseStudy } from '@/data/work';
import { caseDetails } from '@/data/case-details';
import { WorkflowDiagram } from './WorkflowDiagram';

export function CaseStudyCard({ study, index, compact = false }: { study: CaseStudy; index: number; compact?: boolean }) {
  const details = caseDetails[study.slug];
  return <article id={study.slug} className="work-card">
    <div className="work-card-body"><div className="mono-label">0{index+1} / {study.company}</div><h3 className="h-piece"><Link href={`/work/${study.slug}`}>{study.title}</Link></h3><p className="work-summary">{study.summary}</p><p className="work-proof">{study.proof}</p><div className="card-workflow"><span className="diagram-caption">Workflow overview</span><WorkflowDiagram stages={details.stages} compact /></div><p className="work-excerpt">{compact ? study.problem : details.record}</p><Link className="text-link" href={`/work/${study.slug}`}>Read the case study ↗</Link></div>
  </article>;
}
