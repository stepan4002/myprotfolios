import { SITE } from '@/lib/constants';

/**
 * Footer styled as a magazine colophon: edition info on the left,
 * contact + credits on the right.
 */
export function Colophon() {
  return (
    <footer className="page-section py-20 md:py-28 border-t border-[var(--rule-strong)] mt-32 md:mt-48">
      <div className="mag-grid">
        <div className="col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)] mb-6">
            Colophon
          </div>
          <h3 className="font-serif font-light text-[clamp(28px,3.6vw,46px)] leading-[1.05] tracking-[-0.025em] mb-8 max-w-[520px]">
            <em className="italic">nikolasstepan.com</em> — Vol. III · Issue 01
          </h3>
          <p className="text-[14px] leading-[1.7] text-[var(--ink-soft)] max-w-[480px]">
            Edited, written, designed and built by Nikolas Stepan. Typeset in Fraunces (Undercase Type
            Co-Op) and Geist (Vercel). Hosted on Vercel. Source code on GitHub.
          </p>
        </div>

        <div className="col-span-5 md:flex md:flex-col md:items-end md:text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)] mb-6 mt-12 md:mt-0">
            Contact
          </div>
          <div className="space-y-3 text-[14px]">
            <a
              href={`mailto:${SITE.email}`}
              className="block text-[var(--ink)] border-b border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="block text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors font-mono"
            >
              {SITE.phone}
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors font-mono"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/stepan4002/myprotfolios"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors font-mono"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-[var(--rule)] flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">
        <span>© {new Date().getFullYear()} · Nikolas Stepan</span>
        <span className="flex gap-6">
          <a href="https://events.nikolasstepan.com">events.nikolasstepan.com</a>
          <a href="https://web.nikolasstepan.com">web.nikolasstepan.com</a>
          <a href="https://sales.nikolasstepan.com">sales.nikolasstepan.com</a>
        </span>
      </div>
    </footer>
  );
}
