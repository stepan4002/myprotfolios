export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <h2 className="reveal">
          Let's build the
          <br />
          <em>next system.</em>
        </h2>
        <div className="links reveal">
          <div><a href="mailto:nikostepan24@gmail.com">nikostepan24@gmail.com</a></div>
          <div><a href="https://linkedin.com/in/nikolas-stepan-545417221" target="_blank" rel="noopener">LinkedIn</a></div>
          <div><a href="https://github.com/stepan4002" target="_blank" rel="noopener">GitHub</a></div>
          <div style={{ marginTop: '14px' }}>Rožňava · Prague · Remote</div>
          <div>FR · ES · EN · CZ · SK</div>
        </div>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Nikolas Stepan · Built with Three.js, R3F &amp; a lot of opinions.</span>
        <span>Last shipped · today</span>
      </div>
    </footer>
  );
}
