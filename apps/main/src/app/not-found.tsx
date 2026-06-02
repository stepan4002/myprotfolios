import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
      <div className="text-center max-w-md px-8">
        <h1 className="font-serif font-light text-[72px] leading-none text-[var(--ink)] mb-4">
          404
        </h1>
        <p className="text-[var(--ink-soft)] text-lg mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.13em] text-[var(--accent)] no-underline border-b border-[var(--accent-soft)] pb-1 hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
        >
          Back to home →
        </Link>
      </div>
    </div>
  );
}
