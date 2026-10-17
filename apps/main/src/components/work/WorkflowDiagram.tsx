import type { CaseDetails } from '@/data/case-details';
export function WorkflowDiagram({ stages, compact = false }: { stages: CaseDetails['stages']; compact?: boolean }) {
  return <ol className={compact ? 'workflow-map compact-map' : 'workflow-map'} aria-label="Architecture flow">{stages.map((stage,index) => <li key={stage.title}><span className="flow-number">0{index+1}</span><strong>{stage.title}</strong><span>{stage.detail}</span></li>)}</ol>;
}
