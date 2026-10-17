export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  kind: 'agents' | 'apps' | 'automation';
  summary: string;
  problem: string;
  architecture: string;
  impact: string;
  stack: string[];
  proof: string;
}

// Curated from the migrated Main, Web and Sales portfolios. No new ROI estimates.
const studies: CaseStudy[] = [
  {
    slug: 'groupops', title: 'GroupOps', company: 'Multi-company operations', kind: 'agents',
    summary: 'A documented newsroom workflow within a broader, mixed-maturity agent architecture.',
    problem: 'Running several companies creates repeated coordination work across customer communication, publishing, logistics and finance.',
    architecture: 'Company-isolated pods, specialised agents, persona and memory, scheduled heartbeats, an OpenClaw bridge, and an L0–L4 autonomy ladder. Approval gates and audit trails govern outbound actions.',
    impact: 'A shared operating model across company pods. Gemer Times is the documented newsroom workflow; other pods vary in maturity and no current reconciled operating-agent inventory is published.',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'OpenClaw', 'Claude', 'YAML'], proof: 'Newsroom workflow · other pods at varying stages',
  },
  {
    slug: 'cadema-voice-agent', title: 'CADEMA Voice Agent', company: 'CADEMA', kind: 'agents',
    summary: 'A Czech-speaking first line for inbound customer calls.',
    problem: 'Inbound enquiries depended on a single person. Missed calls meant lost opportunities, while repetitive delivery questions interrupted other work.',
    architecture: 'Twilio and ElevenLabs connected to a constrained knowledge base and prompt/state-machine flow. Czech SSML pronunciation tuning and O2 conditional forwarding handle local language and human escalation.',
    impact: 'Answers routine delivery questions, qualifies buyers and routes custom quotes or exceptions to a person. Iteration focused on real calls, pronunciation and reliable hand-offs.',
    stack: ['Twilio', 'ElevenLabs', 'SSML', 'APIs', 'State machines'], proof: 'Czech-language customer workflow',
  },
  {
    slug: 'n8n-pipelines', title: 'n8n Automation Pipelines', company: 'CADEMA · commerce operations', kind: 'automation',
    summary: 'Turn repetitive catalogue work into connected workflows.',
    problem: 'Manual product entry and disconnected catalogue tools made commercial operations repetitive and difficult to keep consistent.',
    architecture: 'n8n connects product creation with the Upgates API and Python data preparation. The wider migration toolkit uses Playwright, Czech/Slovak normalisation, progress files and valid EAN-13 generation.',
    impact: 'New product creation runs through a single n8n workflow. The associated catalogue migration covered 314 SKUs; that migration figure is context, not a separate n8n throughput claim.',
    stack: ['n8n', 'Python', 'Upgates API', 'Playwright', 'Webhooks'], proof: 'Product creation in one workflow',
  },
  {
    slug: 'cadema-configurator', title: 'CADEMA 3D Configurator', company: 'CADEMA', kind: 'apps',
    summary: 'From custom dimensions to a visual, shareable quote.',
    problem: 'Made-to-order structures needed site discussions, custom specifications and repeated quoting conversations before a buyer could decide.',
    architecture: 'A single Zustand store synchronises a 2D floor plan with a React Three Fiber scene. Live pricing, PDF export and URL-encoded state connect configuration to the quoting process.',
    impact: 'Customers can explore a configuration, see its price and export or share a quote. The tool brings technical product choices into the commercial conversation.',
    stack: ['React', 'Three.js', 'Zustand', 'jsPDF'], proof: '2D + 3D + live pricing',
  },
  {
    slug: 'catalogue-migration', title: 'Catalogue Migration & Data Quality', company: 'CADEMA', kind: 'automation',
    summary: '314 SKUs, with the data work the import tool could not do.',
    problem: 'A PrestaShop-to-Upgates migration involved mixed Czech/Slovak titles, incomplete product identifiers and inconsistent catalogue records.',
    architecture: 'Python and Playwright integrate with the Upgates API. Diacritic-aware normalisation, EAN-13 check digits and JSON progress checkpoints make the process resumable.',
    impact: 'The existing project record describes a 314-SKU migration. The original reconciliation report and the denominator behind the previously quoted 94% match rate are not published, so that rate is not presented as a verified outcome.',
    stack: ['Python', 'Playwright', 'Upgates API', 'EAN-13'], proof: '314 SKUs in the documented migration scope',
  },
  {
    slug: 'marketing-lab', title: 'Marketing Lab', company: 'Campaign production', kind: 'automation',
    summary: 'One brief, specialised producers, a shared quality loop.',
    problem: 'Small teams need consistent brand, print, web, social and video assets without coordinating a separate production process for each format.',
    architecture: 'A READY marker triggers nine specialised Claude Code agents around a shared brand.json. Producers write to isolated folders; a QA guardian can re-trigger only the failed producer.',
    impact: 'A documented test pack produced 22 deliverables in 12 minutes. That is a single test result, rather than a promise of production throughput.',
    stack: ['Claude Code', 'Canva MCP', 'Remotion', 'FastAPI'], proof: '22 deliverables in one test pack',
  },
];

const translator: CaseStudy = {
  slug: 'upgates-translator', title: 'Upgates AI Translator', company: 'E-commerce localisation', kind: 'automation',
  summary: 'Translate product content while preserving markup and keeping an operator in control.',
  problem: 'Catalogue translation has to preserve product structure, brand names and placeholders, while giving the operator a chance to review changes before writing back.',
  architecture: 'A React review interface sits above a FastAPI service integrating the Upgates and OpenAI APIs. HTML-aware text processing, multi-shop configuration and live progress updates separate content transformation from catalogue writes.',
  impact: 'Connects catalogue retrieval, translation, review and write-back in one workflow. Glossary, rate-limit and retry/resume handling are described in the project documentation; public throughput and quality measurements are not available.',
  stack: ['Python', 'FastAPI', 'React', 'OpenAI API', 'Upgates API', 'Docker'], proof: 'HTML-aware translation · human review before write-back',
};
export const caseStudies: CaseStudy[] = [
  studies.find(s => s.slug === 'cadema-voice-agent')!,
  translator,
  studies.find(s => s.slug === 'catalogue-migration')!,
  studies.find(s => s.slug === 'cadema-configurator')!,
  studies.find(s => s.slug === 'groupops')!,
  studies.find(s => s.slug === 'n8n-pipelines')!,
  studies.find(s => s.slug === 'marketing-lab')!,
];
