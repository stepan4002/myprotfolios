import Link from 'next/link';
import { SITE } from '@/lib/constants';

export function Colophon() {
  return (
    <footer className="page-section site-footer">
      <div><Link className="wordmark" href="/">Nikolas <em>Stepan.</em></Link><p>AI engineering. Architecture. Operational ownership.<br />Budapest, Hungary.</p></div>
      <div className="footer-links"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Nikolas Stepan</span><a href="https://github.com/stepan4002/myprotfolios" target="_blank" rel="noopener noreferrer">Portfolio source ↗</a></div>
    </footer>
  );
}
