'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SITE } from '@/lib/constants';
import { navigation } from '@/data/navigation';

export function Masthead() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  return (
    <header className="site-header">
      <div className="page-section header-ribbon"><span>Independent builder &amp; operator</span><span>Budapest, Hungary</span></div>
      <nav aria-label="Main navigation" className="page-section header-nav">
        <Link href="/" className="wordmark" onClick={() => setMenuPath(null)}>Nikolas <em>Stepan.</em></Link>
        <div className="desktop-navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</div>
        <a className="header-contact" href={`mailto:${SITE.email}`}>Let’s talk ↗</a>
        <button className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setMenuPath(open ? null : pathname)}>{open ? 'Close −' : 'Menu +'}</button>
      </nav>
      {open && <nav id="mobile-menu" aria-label="Mobile navigation" className="page-section mobile-navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setMenuPath(null)}>{item.label} ↗</Link>)}<a href={`mailto:${SITE.email}`}>Get in touch ↗</a></nav>}
    </header>
  );
}
