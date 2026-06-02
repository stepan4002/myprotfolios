import { Suspense } from 'react';
import HeroScene from './HeroScene.jsx';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>
          Systems for
          <br />
          the web &amp; for
          <br />
          <em>autonomous AI.</em>
        </h1>
        <div className="hero-meta">
          <p className="hero-lede">
            I build full-stack web platforms, real-time 3D experiences and the agentic backends behind them.
            <br /><em>76 buildable artifacts. 70+ AI agents. Five companies running on the systems.</em>
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="v"><em>76</em></div>
              <div>Artifacts shipped</div>
            </div>
            <div className="stat">
              <div className="v">70<em>+</em></div>
              <div>AI agents in production</div>
            </div>
            <div className="stat">
              <div className="v">22</div>
              <div>Git repositories</div>
            </div>
            <div className="stat">
              <div className="v">5</div>
              <div>Companies running it</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
