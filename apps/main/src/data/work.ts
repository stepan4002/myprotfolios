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
export const caseStudies: CaseStudy[] = [
  {
    slug: 'groupops', title: 'GroupOps', company: 'Multi-company operations', kind: 'agents',
    summary: '70+ agents. Five company pods. One operating layer.',
    problem: 'Running several companies creates repeated coordination work across customer communication, publishing, logistics and finance.',
    architecture: 'Company-isolated pods, specialised agents, persona and memory, scheduled heartbeats, an OpenClaw bridge, and an L0–L4 autonomy ladder. Approval gates and audit trails govern outbound actions.',
    impact: 'A shared operating model for five company pods, with 70+ agents described across the portfolio. The Gemer Times newsroom is the documented live editorial workflow; maturity varies by pod.',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'OpenClaw', 'Claude', 'YAML'], proof: '70+ agents · 5 company pods',
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
    impact: 'The existing portfolio records 314 migrated SKUs, 895 normalised EAN entries, a 94% CZ/SK match rate and 374 generated EAN-13 codes.',
    stack: ['Python', 'Playwright', 'Upgates API', 'EAN-13'], proof: '314 SKUs · 94% match rate',
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
