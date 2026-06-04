'use client';

import { useRef, type ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Link that gently translates toward the cursor on hover.
 * Touch devices get a plain link (no transform).
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 0.28,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) * strength;
    const dy = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(
        'inline-block transition-transform duration-300 ease-out will-change-transform',
        className,
      )}
    >
      {children}
    </a>
  );
}
