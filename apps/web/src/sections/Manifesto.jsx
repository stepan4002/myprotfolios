import { useEffect, useRef } from 'react';

export default function Manifesto() {
  const textRef = useRef(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = textRef.current;
    if (!el) return;

    // Wrap each word in a span so we can light it up individually.
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const frag = document.createDocumentFragment();
        const re = /(\S+)(\s+|$)/g;
        let m;
        while ((m = re.exec(text)) !== null) {
          const w = document.createElement('span');
          w.className = 'mf-word';
          w.textContent = m[1];
          frag.appendChild(w);
          if (m[2]) frag.appendChild(document.createTextNode(m[2]));
        }
        node.replaceWith(frag);
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        !['SCRIPT', 'STYLE'].includes(node.tagName)
      ) {
        Array.from(node.childNodes).forEach(walk);
      }
    };
    Array.from(el.childNodes).forEach(walk);

    const words = el.querySelectorAll('.mf-word');
    words.forEach((w) => {
      w.style.opacity = '0.16';
      w.style.transition =
        'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), color 0.5s ease';
      w.style.display = 'inline-block';
    });

    // Light words up as the section scrolls through the viewport.
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.2;
      const fullSpan = start - end;
      const elapsed = start - r.top;
      const progress = Math.max(0, Math.min(1, elapsed / fullSpan));
      const total = words.length;
      const activeIdx = Math.floor(progress * total);
      words.forEach((w, i) => {
        w.style.opacity = i <= activeIdx ? '1' : '0.16';
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="manifesto" id="manifesto">
      <div className="container">
        <div className="manifesto-mark reveal">Manifesto · 01</div>
        <p className="manifesto-text reveal" ref={textRef}>
          I treat <em>software as infrastructure</em> for the businesses I run.
          The configurator that closes the sale, the agent pod that runs the operation,
          the pipeline that turns 3,400 schools into a booked workshop.
          <strong> Not demos. Production systems</strong> — deployed, monitored,
          and load-bearing for real revenue.
        </p>
      </div>
    </section>
  );
}
