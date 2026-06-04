'use client';

import dynamic from 'next/dynamic';

/**
 * Tiny client-side wrapper. `ssr: false` is only allowed inside a Client Component
 * in Next 16, so we isolate the dynamic import here.
 */
const Constellation = dynamic(
  () => import('./ProjectConstellation').then((m) => m.ProjectConstellation),
  { ssr: false, loading: () => <div className="h-[600px] flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-mute)]">Loading 3D archive…</div> },
);

export function ConstellationClient() {
  return <Constellation />;
}
