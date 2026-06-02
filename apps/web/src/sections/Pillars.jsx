export default function Pillars() {
  return (
    <section className="pillars" id="pillars">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Disciplines</div>
            <h2 className="section-title">Three <em>working surfaces.</em></h2>
          </div>
          <p className="section-sub">
            One operator, three disciplines that compound. The web layer ships product.
            The agent layer runs the business. The automation layer keeps both fed.
          </p>
        </div>

        <div className="pillar-grid">
          <div className="pillar apps reveal" data-hover>
            <div className="num"><span className="dot" /> 01 &nbsp;Apps &amp; web</div>
            <h3>Full-stack web &amp; <em>real-time 3D.</em></h3>
            <p>
              Next.js, FastAPI, Three.js, Flutter, React Native. Configurators that close the sale.
              Dashboards that survive bad WiFi. PDF and CAD pipelines that ship to factory.
            </p>
            <ul>
              <li><span>Stacks</span><strong>Next · FastAPI · R3F</strong></li>
              <li><span>Mobile</span><strong>Flutter · Expo</strong></li>
              <li><span>3D</span><strong>Three.js · Blender MCP</strong></li>
              <li><span>E-commerce</span><strong>Upgates · PrestaShop</strong></li>
            </ul>
          </div>

          <div className="pillar agents reveal" data-hover>
            <div className="num"><span className="dot" /> 02 &nbsp;AI agents</div>
            <h3>Autonomous <em>agent systems.</em></h3>
            <p>
              Heartbeat-driven agents with role separation, memory and budget. 70+ agents
              across five company pods. Built on Claude, OpenClaw and custom orchestration.
            </p>
            <ul>
              <li><span>Group orchestrator</span><strong>Master Executive</strong></li>
              <li><span>Company pods</span><strong>5 · 70+ agents</strong></li>
              <li><span>Frameworks</span><strong>Claude · OpenClaw · Paperclip</strong></li>
              <li><span>Memory</span><strong>3-layer · graph + notes</strong></li>
            </ul>
          </div>

          <div className="pillar auto reveal" data-hover>
            <div className="num"><span className="dot" /> 03 &nbsp;Automations</div>
            <h3>Pipelines that <em>do the work.</em></h3>
            <p>
              Scraping, enrichment, multilingual outreach, marketing-pack production,
              parametric model rendering. Production-grade pipelines that run nightly and ship.
            </p>
            <ul>
              <li><span>Schools.sk</span><strong>3,400 schools</strong></li>
              <li><span>Companies.sk</span><strong>2,320 prospects</strong></li>
              <li><span>Marketing Lab</span><strong>9-agent pack producer</strong></li>
              <li><span>CADEMA Gen</span><strong>JSON → 3D + PDF + CAD</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
