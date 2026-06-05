'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SITE } from '@/lib/constants';

const NAV = [
  { label: 'Issue 01', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Web & AI', href: '/web' },
  { label: 'Sales', href: '/sales' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export function Masthead() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-[backdrop-filter,background] duration-300',
        scrolled
          ? 'bg-[var(--paper)]/92 backdrop-blur-md border-b border-[var(--rule)]'
          : 'bg-[var(--paper)]',
      )}
    >
      {/* Top mono ribbon — magazine masthead row */}
      <div className="page-section">
        <div className="flex items-center justify-between border-b border-[var(--rule-strong)] py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]">
            Nikolas Stepan
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)] hidden sm:block">
            Vol. III · Issue 01 · Summer 2026 · Budapest
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)] sm:hidden">
            Issue 01 · 2026
          </span>
        </div>
      </div>

      {/* Nav row */}
      <nav className="page-section">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="font-serif text-[18px] tracking-tight">
            <span>Nikolas</span> <em className="italic text-[var(--accent)]">Stepan</em>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-7 font-mono text-[11px] uppercase tracking-[0.16em]">
            {NAV.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'pb-0.5 border-b transition-colors duration-200',
                    active
                      ? 'text-[var(--ink)] border-[var(--accent)]'
                      : 'text-[var(--ink-mute)] border-transparent hover:text-[var(--ink)] hover:border-[var(--ink)]',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a
            href={`mailto:${SITE.email}`}
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] transition-colors"
          >
            Get in touch →
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={clsx('block w-5 h-px bg-[var(--ink)] transition-transform', open && 'rotate-45 translate-y-[6px]')} />
            <span className={clsx('block w-5 h-px bg-[var(--ink)] transition-opacity', open && 'opacity-0')} />
            <span className={clsx('block w-5 h-px bg-[var(--ink)] transition-transform', open && '-rotate-45 -translate-y-[6px]')} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--paper)] border-b border-[var(--rule)]">
          <div className="page-section py-6 flex flex-col gap-5 font-mono text-[12px] uppercase tracking-[0.13em]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] self-start"
            >
              Get in touch →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
