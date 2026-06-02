export default function Nav() {
  return (
    <nav className="nav">
      <div className="brand">
        <span className="brand-dot" />
        <span>Nikolas Stepan · Tech</span>
      </div>
      <div className="links">
        <a href="#pillars">Disciplines</a>
        <a href="#projects">Work</a>
        <a href="#constellation">Agents</a>
        <a href="#flows">Automations</a>
        <a href="#stack">Stack</a>
      </div>
      <a className="cta" href="mailto:nikostepan24@gmail.com">Get in touch</a>
    </nav>
  );
}
