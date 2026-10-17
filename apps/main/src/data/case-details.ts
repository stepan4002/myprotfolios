export interface CaseDetails {
  role: string;
  record: string;
  scope: string;
  period: string;
  dependencies: string;
  stages: { title: string; detail: string }[];
  decisions: { issue: string; response: string; verification: string }[];
  measurements: string;
  evidenceGap: string;
  demo?: 'voice' | 'translator' | 'catalogue';
}
const assisted = 'My role covered workflow definition, architecture, direction of AI-assisted implementation, service integration, testing and deployment. Platform and library authorship belongs to the third parties credited below; additional collaborators are not identified in the public project notes.';
export const caseDetails: Record<string, CaseDetails> = {
  'cadema-voice-agent': {
    role: assisted,
    record: 'Described as deployed in the existing project record; no live phone endpoint is published here.',
    scope: 'Czech-language inbound customer enquiries for CADEMA, with human escalation for custom quotes.',
    period: 'Delivery dates and current call volume are not recorded in the public evidence.',
    dependencies: 'Twilio supplies telephony; ElevenLabs supplies speech. These are third-party services, not platforms I authored.',
    stages: [{title:'Incoming call',detail:'Twilio / telephone forwarding'},{title:'Constrained answer',detail:'Known delivery information + Czech speech'},{title:'Human hand-off',detail:'Custom quotes, uncertainty and exceptions'}],
    decisions: [
      {issue:'Czech place names were mispronounced.',response:'The project notes describe an SSML pronunciation dictionary and iterative listening.',verification:'A real recording and pronunciation evaluation set are not published.'},
      {issue:'Delivery answers could sound confident without support.',response:'Replace unconstrained answers with a bounded knowledge lookup; route unsupported requests to a person.',verification:'The synthetic demo below shows the routing decision, not speech recognition quality.'},
      {issue:'Custom quotes should not be improvised by the agent.',response:'Use a human escalation branch through conditional telephone forwarding.',verification:'Reference tests check custom-quote and uncertain-answer routes.'},
    ],
    measurements:'No public call-volume, latency, task-completion, escalation-rate or missed-call comparison is available. The useful claim here is the workflow and its documented design decisions.',
    evidenceGap:'No customer audio, live agent endpoint or production source is published. The transcript below is a synthetic reference example, not a recording of a real call.',demo:'voice',
  },
  'upgates-translator': {
    role: assisted,
    record:'Described as a Dockerised application in the project record; its authenticated shop interface is not publicly exposed.',
    scope:'Product and category translation across configured Upgates shops, with an operator review step.',
    period:'Delivery dates, active user count and current operating volume are not published.',
    dependencies:'Upgates provides the catalogue API and OpenAI provides translation. FastAPI, React and HTML parsing libraries are existing tools.',
    stages:[{title:'Read catalogue',detail:'Upgates API → product HTML'},{title:'Translate text',detail:'Preserve tags, attributes and placeholders'},{title:'Review & approve',detail:'Operator checks the proposed content'},{title:'Write back',detail:'API update only after approval'}],
    decisions:[
      {issue:'Translation can damage inline markup or placeholders.',response:'Translate text nodes while preserving HTML structure and protected values.',verification:'The downloadable reference has tests for tags, attributes, placeholders and escaped output.'},
      {issue:'A provider can rate-limit or interrupt a long batch.',response:'The delivery notes describe rate-limit handling, retries and resumable processing.',verification:'Production retry logs and a resume recording are not published; these capabilities are not demonstrated by the browser sample.'},
      {issue:'A fluent translation can still be the wrong product copy.',response:'Separate preview from write-back and keep a human approval step.',verification:'The browser demo prevents the simulated write until the sample has been reviewed and approved.'},
    ],
    measurements:'No translation accuracy score, time-saving comparison or batch-throughput benchmark is published. The sample demonstrates structure preservation and review gating, not production translation quality.',
    evidenceGap:'Production API credentials, catalogue data and source are private. The browser sample uses fixed synthetic text; it does not call an LLM or update a shop.',demo:'translator',
  },
  'catalogue-migration': {
    role: assisted,
    record:'Documented PrestaShop-to-Upgates migration project; the public materials describe its scope rather than an independently audited outcome.',
    scope:'314 SKUs in the existing project record; catalogue preparation included Czech/Slovak normalisation and EAN handling.',
    period:'Migration dates and the original reconciliation export are not published.',
    dependencies:'PrestaShop and Upgates are external commerce platforms. Python and Playwright supported transformation and integration.',
    stages:[{title:'Extract',detail:'Source records and existing identifiers'},{title:'Normalise',detail:'Accents, spacing and candidate keys'},{title:'Reconcile',detail:'Unique match / manual review / no match'},{title:'Validate',detail:'EAN checksum and reconciliation before import'}],
    decisions:[
      {issue:'Equivalent names differ in accents, case or spacing.',response:'Create deterministic comparison keys while retaining the original product values.',verification:'The reference tests cover diacritics, case, whitespace and repeat normalisation.'},
      {issue:'Normalisation can collapse different products onto one key.',response:'Send ambiguous candidate sets to review instead of silently choosing the first match.',verification:'The synthetic sample includes an ambiguous product and checks that it is not auto-matched.'},
      {issue:'An identifier can look plausible and still be invalid.',response:'Validate the EAN-13 checksum before accepting an identifier.',verification:'Reference tests distinguish valid identifiers from a wrong check digit.'},
    ],
    measurements:'314 SKUs is the documented project scope. A historical 94% CZ/SK match rate has no published denominator, threshold or exception report, so it is not used as a verified result. The four-row demo is synthetic and is not that historical report.',
    evidenceGap:'The original catalogue and reconciliation report are not public. Downloadable code and fixtures below are new reference examples, not a production migration export.',demo:'catalogue',
  },
  'cadema-configurator': {
    role:assisted, record:'Described as a deployed commercial configurator in the existing portfolio.',scope:'Custom garden structures: configuration, live pricing, PDF quotations and shareable state.',period:'The former portfolio lists 2024 onward; current usage is not published.',dependencies:'React, Three.js, Zustand and jsPDF are third-party libraries.',
    stages:[{title:'Configure',detail:'Dimensions and product options'},{title:'Synchronise',detail:'One state store → 2D and 3D views'},{title:'Quote',detail:'Pricing + PDF + shareable state'}],
    decisions:[{issue:'Two views can drift when each owns its state.',response:'Use one upstream Zustand store to drive both views.',verification:'Documented architectural decision; production code and a recording are not published.'},{issue:'A visual tool still needs to work on slower devices.',response:'The project notes describe instanced geometry, a capped device-pixel ratio and resource disposal.',verification:'No device benchmark is published.'}],
    measurements:'No independently measured quote-cycle reduction, conversion lift or active-user count is available.',evidenceGap:'No verified public configurator deep link or interface capture was found. This page documents the architecture without presenting a recreated screen as the original product.',
  },
  groupops:{
    role:assisted,record:'Mixed maturity: Gemer Times is the documented newsroom workflow; other company pods are configured, scaffolded or experimental.',scope:'Multi-company orchestration, with a newsroom as the concrete workflow described in the records.',period:'The former portfolio lists 2025 onward; no current deployment inventory is published.',dependencies:'OpenClaw and other agent runtimes are existing platforms. Agent definitions and configured integrations are distinct from runtime authorship.',
    stages:[{title:'Discover & research',detail:'Editorial inputs and sources'},{title:'Draft & correct',detail:'Specialist writer and correction roles'},{title:'Approval boundary',detail:'Authority limits before outbound publication'}],
    decisions:[{issue:'An agent definition is not evidence of a reliably operating agent.',response:'Distinguish configuration, experimental pods and documented workflows.',verification:'No headline agent-count metric is used to imply adoption.'},{issue:'Outbound action needs a clear authority boundary.',response:'The architecture describes L0–L4 autonomy levels, approval gates and audit trails.',verification:'A real execution trace, approval event and recovery log are not published.'}],
    measurements:'Older materials variously mention 40+, 70+ and 76. These refer to different or unspecified scopes of definitions, agents and artifacts; no reconciled inventory is available. They are not presented as a current operating count.',evidenceGap:'No public execution recording, approval-gate trace or recovery record is available. This is an architectural case study, not a verified reliability benchmark.',
  },
  'n8n-pipelines':{
    role:assisted,record:'Commerce workflow automation described in the project records.',scope:'Product creation and catalogue operations. Records refer to both Upgates and PrestaShop workflows; those integrations are separate.',period:'Workflow delivery dates and run volumes are not published.',dependencies:'n8n is an existing orchestration platform; the contribution is workflow design and commerce integration.',
    stages:[{title:'Product input',detail:'Structured catalogue data'},{title:'Validate & transform',detail:'Python / workflow steps'},{title:'API integration',detail:'Commerce-platform write and review'}],
    decisions:[{issue:'A migration total can be mistaken for workflow throughput.',response:'Keep the 314-SKU migration scope separate from n8n execution metrics.',verification:'No execution-count or time-saving claim is made.'}],measurements:'No public workflow export, success-rate history or run-time benchmark is available.',evidenceGap:'No production workflow JSON is published; the diagram is a documented overview, not an exported n8n canvas.',
  },
  'marketing-lab':{
    role:assisted,record:'A documented test pack, with broader ongoing production use unverified.',scope:'Brand, print, web, social, video and copy production around a shared brief.',period:'Test date and repeat-run results are not published.',dependencies:'Claude Code, Canva MCP and Remotion are existing tools. Contribution centres on orchestration and quality rules.',
    stages:[{title:'Brief',detail:'Shared brand.json'},{title:'Produce',detail:'Isolated specialist outputs'},{title:'Review',detail:'QA guardian re-triggers a failed producer'}],
    decisions:[{issue:'One bad output should not trigger a complete re-run.',response:'Separate producer workspaces and re-trigger the failed producer.',verification:'Described in the project notes; no public failure/recovery trace is available.'}],measurements:'22 deliverables in 12 minutes is a single documented test result, not a sustained throughput or cost benchmark.',evidenceGap:'The original deliverable pack and execution log are not published.',
  },
};
