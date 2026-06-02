import { useId } from 'react';

/* ============ tiny building blocks ============ */
function Node({ x, y, w = 110, h = 36, label, sub, color = '#FF7A47' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-w / 2} y={-h / 2} width={w} height={h}
        rx="4"
        fill="rgba(255,255,255,0.03)"
        stroke={color}
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <text x="0" y={sub ? -2 : 4} textAnchor="middle" fill="#F4F4F6"
        style={{ font: '500 11px "Geist Mono", monospace', letterSpacing: '0.04em' }}>
        {label}
      </text>
      {sub && (
        <text x="0" y="12" textAnchor="middle" fill="#7F7F87"
          style={{ font: '500 9px "Geist Mono", monospace', letterSpacing: '0.08em' }}>
          {sub.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function FlowPath({ id, d, color = '#FF7A47', dots = 2, dur = 4 }) {
  const arr = [];
  for (let i = 0; i < dots; i++) {
    arr.push(
      <circle key={i} r="2.5" fill={color}>
        <animateMotion
          dur={`${dur}s`}
          repeatCount="indefinite"
          begin={`${(dur / dots) * i}s`}
          rotate="auto"
        >
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    );
  }
  return (
    <>
      <path id={id} d={d} fill="none" stroke={color} strokeOpacity="0.28" strokeWidth="1.1" strokeDasharray="2 3" />
      {arr}
    </>
  );
}

/* ============ pipeline 1: Marketing Lab ============ */
function MarketingLab() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const c = '#FF7A47';
  return (
    <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={`bg${uid}`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="rgba(255,122,71,0.04)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="300" fill={`url(#bg${uid})`} />

      {/* the paths */}
      <FlowPath id={`mlp1${uid}`} d="M 110 150 L 290 150" color={c} dots={2} />
      <FlowPath id={`mlp2${uid}`} d="M 400 150 L 540 150" color={c} dots={2} />

      <FlowPath id={`mlp3a${uid}`} d="M 600 150 Q 700 60 800 60" color={c} dots={1} />
      <FlowPath id={`mlp3b${uid}`} d="M 600 150 Q 700 110 800 110" color={c} dots={1} />
      <FlowPath id={`mlp3c${uid}`} d="M 600 150 L 800 150" color={c} dots={1} />
      <FlowPath id={`mlp3d${uid}`} d="M 600 150 Q 700 190 800 190" color={c} dots={1} />
      <FlowPath id={`mlp3e${uid}`} d="M 600 150 Q 700 240 800 240" color={c} dots={1} />

      <FlowPath id={`mlp4a${uid}`} d="M 900 60 Q 1000 100 1080 150" color={c} dots={1} />
      <FlowPath id={`mlp4b${uid}`} d="M 900 110 Q 1000 130 1080 150" color={c} dots={1} />
      <FlowPath id={`mlp4c${uid}`} d="M 900 150 L 1080 150" color={c} dots={1} />
      <FlowPath id={`mlp4d${uid}`} d="M 900 190 Q 1000 170 1080 150" color={c} dots={1} />
      <FlowPath id={`mlp4e${uid}`} d="M 900 240 Q 1000 200 1080 150" color={c} dots={1} />

      <Node x="110" y="150" w="130" label="READY marker" sub="trigger" color={c} />
      <Node x="350" y="150" w="120" label="Brief synth" sub="brand.json" color={c} />
      <Node x="600" y="150" w="120" label="Orchestrator" sub="9 agents" color="#FFE6D6" />

      <Node x="860" y="60"  w="120" label="Identity" sub="logo · system" color={c} />
      <Node x="860" y="110" w="120" label="Copy" sub="multilingual" color={c} />
      <Node x="860" y="150" w="120" label="Print" sub="posters · pdf" color={c} />
      <Node x="860" y="190" w="120" label="Social" sub="stories · cards" color={c} />
      <Node x="860" y="240" w="120" label="Video" sub="Remotion" color={c} />

      <Node x="1140" y="150" w="110" label="QA · Pack" sub="22 files" color="#FFE6D6" />
    </svg>
  );
}

/* ============ pipeline 2: Schools.sk Outreach ============ */
function SchoolsPipeline() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const c = '#C5FF4D';
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid meet">
      <FlowPath id={`sp1${uid}`} d="M 110 100 L 290 100" color={c} dots={2} />
      <FlowPath id={`sp2${uid}`} d="M 400 100 L 540 100" color={c} dots={2} />
      <FlowPath id={`sp3${uid}`} d="M 660 100 L 800 100" color={c} dots={2} />
      <FlowPath id={`sp4${uid}`} d="M 910 100 L 1050 100" color={c} dots={2} />

      <Node x="110" y="100" w="140" label="Registry · 3,400" sub="zsk · zus · gym · sos" color={c} />
      <Node x="350" y="100" w="120" label="Scraper" sub="15 workers" color={c} />
      <Node x="600" y="100" w="130" label="Filter UI" sub="kraj · okres" color={c} />
      <Node x="860" y="100" w="130" label="Personalise" sub="gender · type" color={c} />
      <Node x="1120" y="100" w="140" label="Outlook send" sub="inline MIME" color="#E8FFB3" />

      <text x="600" y="172" textAnchor="middle" fill="#7F7F87"
        style={{ font: '500 10px "Geist Mono", monospace', letterSpacing: '0.14em' }}>
        APPEND-ONLY AUDIT LOG · EMAIL_LOG.XLSX
      </text>
    </svg>
  );
}

/* ============ pipeline 3: CADEMA Generator ============ */
function CademaPipeline() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const c = '#5DD3FF';
  return (
    <svg viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet">
      <FlowPath id={`cp1${uid}`} d="M 110 140 L 290 140" color={c} dots={2} />
      <FlowPath id={`cp2${uid}`} d="M 400 140 L 540 140" color={c} dots={2} />
      <FlowPath id={`cp3${uid}`} d="M 660 140 L 800 140" color={c} dots={2} />

      <FlowPath id={`cp4a${uid}`} d="M 920 140 Q 1000 90 1080 60" color={c} dots={1} />
      <FlowPath id={`cp4b${uid}`} d="M 920 140 L 1080 140" color={c} dots={1} />
      <FlowPath id={`cp4c${uid}`} d="M 920 140 Q 1000 190 1080 220" color={c} dots={1} />

      <Node x="110" y="140" w="120" label="JSON spec" sub="pydantic v2" color={c} />
      <Node x="350" y="140" w="120" label="Validator" sub="constraints" color={c} />
      <Node x="600" y="140" w="120" label="Blender MCP" sub="bpy + jinja" color={c} />
      <Node x="860" y="140" w="120" label="Cycles render" sub="3 scenes · gpu" color="#C5EFFF" />

      <Node x="1140" y="60"  w="120" label="Renders" sub="stills + video" color={c} />
      <Node x="1140" y="140" w="120" label="Assembly PDF" sub="reportlab" color={c} />
      <Node x="1140" y="220" w="120" label="CAD pack" sub="dxf + matplotlib" color={c} />
    </svg>
  );
}

/* ============ pipeline 4: GroupOps Multi-Pod ============ */
function GroupOpsPipeline() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const c = '#B388FF';
  const c2 = '#FF7A47';
  return (
    <svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid meet">
      {/* Master executive at top */}
      <Node x="600" y="40" w="180" h="46" label="Master Executive" sub="AI COO · approval gate" color={c} />

      {/* Group services */}
      <FlowPath id={`go-ms1${uid}`} d="M 600 70 L 200 145" color={c} dots={1} dur={5} />
      <FlowPath id={`go-ms2${uid}`} d="M 600 70 L 400 145" color={c} dots={1} dur={5} />
      <FlowPath id={`go-ms3${uid}`} d="M 600 70 L 600 145" color={c} dots={1} dur={5} />
      <FlowPath id={`go-ms4${uid}`} d="M 600 70 L 800 145" color={c} dots={1} dur={5} />
      <FlowPath id={`go-ms5${uid}`} d="M 600 70 L 1000 145" color={c} dots={1} dur={5} />

      <Node x="200"  y="160" w="130" label="Finance"     sub="ledger · runway" color={c} />
      <Node x="400"  y="160" w="130" label="Compliance"  sub="audit · gates"   color={c} />
      <Node x="600"  y="160" w="130" label="Translation" sub="GPT-4.1-mini"    color={c} />
      <Node x="800"  y="160" w="130" label="Innovation"  sub="ideation · spike" color={c} />
      <Node x="1000" y="160" w="130" label="Developer"   sub="ci · deploy"     color={c} />

      {/* Company pods */}
      <FlowPath id={`go-c1${uid}`} d="M 600 185 L 150 290" color={c2} dots={1} dur={5.5} />
      <FlowPath id={`go-c2${uid}`} d="M 600 185 L 400 290" color={c2} dots={1} dur={5.5} />
      <FlowPath id={`go-c3${uid}`} d="M 600 185 L 600 290" color={c2} dots={1} dur={5.5} />
      <FlowPath id={`go-c4${uid}`} d="M 600 185 L 800 290" color={c2} dots={1} dur={5.5} />
      <FlowPath id={`go-c5${uid}`} d="M 600 185 L 1050 290" color={c2} dots={1} dur={5.5} />

      <Node x="150"  y="310" w="140" label="GemCraft"    sub="19 agents"  color={c2} />
      <Node x="400"  y="310" w="140" label="GemArt"      sub="9 agents"   color={c2} />
      <Node x="600"  y="310" w="140" label="Gemer Times" sub="8 agents"   color={c2} />
      <Node x="800"  y="310" w="140" label="Csetneki"    sub="11 agents"  color={c2} />
      <Node x="1050" y="310" w="140" label="Cadema"      sub="11 agents"  color={c2} />
    </svg>
  );
}

/* ============ pipeline 5: Polymarket Strategy Search ============ */
function PolymarketPipeline() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const c = '#FFB84D';
  const c2 = '#FF7A47';
  return (
    <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid meet">
      <FlowPath id={`pm-a${uid}`} d="M 110 80 L 280 80" color={c} dots={2} />
      <FlowPath id={`pm-b${uid}`} d="M 400 80 L 560 80" color={c} dots={2} />
      <FlowPath id={`pm-c${uid}`} d="M 680 80 L 840 80" color={c} dots={2} />

      <FlowPath id={`pm-d${uid}`} d="M 960 80 Q 1040 120 1080 170" color={c} dots={1} />
      <FlowPath id={`pm-e${uid}`} d="M 960 80 L 1080 80" color={c} dots={2} />

      {/* Strategy loop bottom */}
      <FlowPath id={`pm-f${uid}`} d="M 110 230 L 280 230" color={c2} dots={1} dur={3.5} />
      <FlowPath id={`pm-g${uid}`} d="M 400 230 L 560 230" color={c2} dots={1} dur={3.5} />
      <FlowPath id={`pm-h${uid}`} d="M 680 230 L 840 230" color={c2} dots={1} dur={3.5} />
      <FlowPath id={`pm-i${uid}`} d="M 960 230 L 1080 230" color={c2} dots={1} dur={3.5} />

      <FlowPath id={`pm-loop${uid}`} d="M 1080 230 Q 1140 200 1140 130 Q 1140 60 600 60 Q 80 60 80 130 Q 80 200 110 230" color="#FF7A47" dots={2} dur={6} />

      {/* Top row — live market data path */}
      <Node x="110" y="80" w="120" label="CLOB stream" sub="live ws"        color={c} />
      <Node x="340" y="80" w="120" label="Feature gen" sub="windows" color={c} />
      <Node x="620" y="80" w="120" label="LightGBM" sub="ML lab · 870k" color={c} />
      <Node x="900" y="80" w="120" label="Signal"  sub="prob + edge" color={c} />

      <Node x="1140" y="80"  w="120" label="Order" sub="live trade" color={c} />
      <Node x="1140" y="170" w="120" label="Holdout" sub="OOS check" color={c} />

      {/* Bottom row — strategy search loop */}
      <Node x="110" y="230" w="120" label="Strategy proposal" sub="LLM-driven" color={c2} />
      <Node x="340" y="230" w="120" label="Replay" sub="6.3M trades" color={c2} />
      <Node x="620" y="230" w="120" label="Score"  sub="robust · anti-overfit" color={c2} />
      <Node x="900" y="230" w="120" label="Guard"  sub="reject / accept" color={c2} />
    </svg>
  );
}

/* ============ component ============ */
export default function AutomationFlow() {
  return (
    <section className="flows" id="flows">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Automations</div>
            <h2 className="section-title">Pipelines that <em>do the work.</em></h2>
          </div>
          <p className="section-sub">
            Three production pipelines, simplified. Drop a file in, get a marketing pack out;
            push a button, mail 3,400 schools; ship a JSON spec, get back renders, a PDF
            manual and a CAD pack ready for the factory.
          </p>
        </div>

        <div className="flow-stack">
          <div className="flow reveal">
            <div className="flow-head">
              <div>
                <h3>Marketing Lab <em>— autonomous brand pack producer</em></h3>
                <p>A READY marker in a client folder triggers the orchestrator, which fans out six producers and a QA guardian. Output: 22-file branded pack in 5–15 minutes.</p>
              </div>
              <span className="tag">9 agents</span>
            </div>
            <div className="flow-svg-wrap">
              <MarketingLab />
              <div className="flow-legend">
                <span><span className="swatch" style={{ background: '#FF7A47' }} />Pipeline node</span>
                <span><span className="swatch" style={{ background: '#FFE6D6' }} />Aggregator / gate</span>
                <span>Inputs · brand.json + assets &nbsp;·&nbsp; Output · 22 deliverables</span>
              </div>
            </div>
          </div>

          <div className="flow reveal">
            <div className="flow-head">
              <div>
                <h3>Schools.sk outreach <em>— 3,400-school direct mail</em></h3>
                <p>Scrape Slovak school registry → Tkinter filter UI → per-school-type personalised Slovak email → Outlook COM with inline-image MIME → append-only audit log.</p>
              </div>
              <span className="tag">Production</span>
            </div>
            <div className="flow-svg-wrap">
              <SchoolsPipeline />
              <div className="flow-legend">
                <span><span className="swatch" style={{ background: '#C5FF4D' }} />Stage</span>
                <span><span className="swatch" style={{ background: '#E8FFB3' }} />Send</span>
                <span>Throughput · ZŠ · ZUŠ · Gymnázium · SOŠ · Špeciálna variants</span>
              </div>
            </div>
          </div>

          <div className="flow reveal">
            <div className="flow-head">
              <div>
                <h3>CADEMA Generator <em>— JSON in, factory pack out</em></h3>
                <p>Pydantic-validated JSON → Blender via MCP → photoreal Cycles renders + a printable assembly manual + a DXF/PDF CAD pack ready to ship to the manufacturer.</p>
              </div>
              <span className="tag">Pipeline</span>
            </div>
            <div className="flow-svg-wrap">
              <CademaPipeline />
              <div className="flow-legend">
                <span><span className="swatch" style={{ background: '#5DD3FF' }} />Stage</span>
                <span><span className="swatch" style={{ background: '#C5EFFF' }} />Render gate</span>
                <span>3 scene templates · GPU rendering · sub-process Blender via MCP</span>
              </div>
            </div>
          </div>

          <div className="flow reveal">
            <div className="flow-head">
              <div>
                <h3>GroupOps multi-company stack <em>— Master Executive → 5 services → 5 company pods</em></h3>
                <p>The full AI operations stack. A Master Executive (AI COO) at the top with 5-level autonomy ladder + approval gates; 5 shared services (Finance, Compliance, Translation, Innovation, Developer); and 5 company pods totaling 70+ agents.</p>
              </div>
              <span className="tag">70+ agents</span>
            </div>
            <div className="flow-svg-wrap">
              <GroupOpsPipeline />
              <div className="flow-legend">
                <span><span className="swatch" style={{ background: '#B388FF' }} />Group service</span>
                <span><span className="swatch" style={{ background: '#FF7A47' }} />Company pod</span>
                <span>Hierarchy · 1 executive → 5 services → 5 pods (58 specialised agents)</span>
              </div>
            </div>
          </div>

          <div className="flow reveal">
            <div className="flow-head">
              <div>
                <h3>Polymarket strategy search <em>— LLM-driven, holdout-gated, anti-overfit</em></h3>
                <p>Two coupled loops: a live market path (CLOB stream → feature gen → LightGBM scoring → order placement, with an out-of-sample holdout check) and an LLM-driven strategy search loop (proposal → replay over 6.3M trades → robust scoring → accept-or-reject guard), feeding back into the live system.</p>
              </div>
              <span className="tag">Coupled loops</span>
            </div>
            <div className="flow-svg-wrap">
              <PolymarketPipeline />
              <div className="flow-legend">
                <span><span className="swatch" style={{ background: '#FFB84D' }} />Live path</span>
                <span><span className="swatch" style={{ background: '#FF7A47' }} />Strategy-search loop</span>
                <span>4 subsystems · 870k feature windows · 6.3M trades replay · holdout gates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
