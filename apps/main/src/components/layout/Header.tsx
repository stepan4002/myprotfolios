'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { navigation } from '@/data/navigation';
import { useAppStore } from '@/hooks/useAppStore';
import { SITE } from '@/lib/constants';

export function Header() {
  const pathname = usePathname();
  const menuOpen = useAppStore((s) => s.menuOpen);
  const toggleMenu = useAppStore((s) => s.toggleMenu);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(244,239,230,0)', 'rgba(244,239,230,0.92)']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: headerBg }}
    >
      <nav className="max-w-[var(--page-max)] mx-auto px-[var(--page-px)] py-5 flex items-baseline justify-between">
        <Link
          href="/"
          className="font-serif text-lg font-light tracking-tight text-[var(--ink)] hover:tracking-wide transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        >
          {SITE.name.split(' ')[0]} <em className="italic">{SITE.name.split(' ')[1]}</em>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-7 font-mono text-[11px] uppercase tracking-[0.13em]">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-0.5 border-b transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--ink)] border-[var(--accent)]'
                    : 'text-[var(--ink-mute)] border-transparent hover:text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-2"
          aria-label="Toggle menu"
        >
          <motion.span className="block w-5 h-px bg-[var(--ink)]" animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
          <motion.span className="block w-5 h-px bg-[var(--ink)]" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span className="block w-5 h-px bg-[var(--ink)]" animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
        </button>
      </nav>

      {/* Border that fades in on scroll */}
      <motion.div className="h-px bg-[var(--rule)]" style={{ opacity: borderOpacity }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[var(--paper)] border-b border-[var(--rule)]"
          >
            <div className="px-[var(--page-px)] py-8 flex flex-col gap-5 font-mono text-[12px] uppercase tracking-[0.13em]">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
