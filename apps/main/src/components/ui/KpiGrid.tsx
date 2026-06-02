'use client';

import { useEffect, useRef } from 'react';

export interface Kpi {
  num: string;
  label: string;
}

interface Props {
  kpis: Kpi[];
}

/**
 * KPI grid with:
 *  - count-up animation on the leading number when scrolled into view
 *  - cursor-tracked tilt on hover
 *  - scroll-reveal fade-up
 *  - accent glow on hover
 */
export function KpiGrid({ kpis }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(root.querySelectorAll<HTMLDivElement>('[data-kpi]'));
    const numEls = cards.map((c) => c.querySelector<HTMLDivElement>('[data-num]')!);

    // Reveal classes
    cards.forEach((c) => c.classList.add('kpi-reveal'));

    // Animated counter
    const ioCount = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const card = e.target as HTMLDivElement;
          const numEl = card.querySelector<HTMLDivElement>('[data-num]');
          if (!numEl) return;
          ioCount.unobserve(card);
          card.classList.add('in');
          if (reduced) return;
          const raw = numEl.dataset.raw ?? numEl.textContent ?? '';
          const m = raw.match(/(\d+)/);
          if (!m) return;
          const target = parseInt(m[1], 10);
          const suffix = raw.slice(m.index! + m[1].length);
          const prefix = raw.slice(0, m.index!);
          const start = performance.now();
          const duration = 1300;
          (function tick(now: number) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = Math.round(target * eased);
            numEl.textContent = `${prefix}${v}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
          })(start);
        });
      },
      { threshold: 0.4 },
    );
    cards.forEach((c) => ioCount.observe(c));

    // Cursor tilt
    const handlers: Array<[HTMLDivElement, (e: PointerEvent) => void, () => void]> = [];
    if (!reduced) {
      cards.forEach((card) => {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 6;
          card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-2px)`;
        };
        const leave = () => {
          card.style.transform = '';
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        handlers.push([card, move, leave]);
      });
    }

    // Pre-set the displayed text to 0 so the animation has somewhere to start
    if (!reduced) {
      numEls.forEach((el) => {
        const raw = el.textContent ?? '';
        el.dataset.raw = raw;
        const m = raw.match(/(\d+)/);
        if (m) {
          const prefix = raw.slice(0, m.index!);
          const suffix = raw.slice(m.index! + m[1].length);
          el.textContent = `${prefix}0${suffix}`;
        }
      });
    }

    return () => {
      ioCount.disconnect();
      handlers.forEach(([card, m, l]) => {
        card.removeEventListener('pointermove', m);
        card.removeEventListener('pointerleave', l);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .kpi-reveal { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1), box-shadow .4s; }
        .kpi-reveal.in { opacity: 1; transform: translateY(0); }
        .kpi-reveal:hover { box-shadow: 0 18px 50px -20px rgba(177,74,47,0.35); border-color: var(--accent) !important; }
      `}</style>
      <div
        ref={rootRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {kpis.map((k) => (
          <div
            key={k.label}
            data-kpi
            className="border border-[var(--rule)] rounded-2xl px-6 py-7 bg-[var(--paper-warm)] will-change-transform"
          >
            <div
              data-num
              className="font-serif font-light text-[clamp(36px,5vw,52px)] leading-none tracking-[-0.03em] text-[var(--ink)]"
            >
              {k.num}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)] mt-4">
              {k.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
