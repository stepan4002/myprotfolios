/* Procedural SVG art per project category — no external images required.
   Each function returns an SVG sized to fill its parent. */

import { useId } from 'react';

export function AppsArt({ seed = 1 }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const lines = [];
  for (let i = 0; i < 14; i++) {
    const y = 30 + i * 14;
    const x1 = 20 + ((i * 47 * seed) % 80);
    const x2 = 320 - ((i * 31 * seed) % 60);
    lines.push(<line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={`url(#${id})`} strokeWidth="1" />);
  }
  return (
    <svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#C5FF4D" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C5FF4D" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5DD3FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#1A1F12" />
          <stop offset="1" stopColor="#0A0A0B" />
        </radialGradient>
      </defs>
      <rect width="360" height="240" fill={`url(#${id}-bg)`} />
      {lines}
      <rect x="40" y="40" width="280" height="160" fill="none" stroke="#C5FF4D" strokeOpacity="0.18" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="3" fill="#C5FF4D" />
      <circle cx="300" cy="180" r="3" fill="#5DD3FF" />
    </svg>
  );
}

export function AgentsArt({ seed = 1 }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const cx = 180, cy = 120;
  const nodes = [];
  const links = [];
  const layer1 = 7, layer2 = 14;
  // center
  nodes.push({ x: cx, y: cy, r: 5, c: '#B388FF' });
  for (let i = 0; i < layer1; i++) {
    const a = (i / layer1) * Math.PI * 2 + seed;
    const x = cx + Math.cos(a) * 50;
    const y = cy + Math.sin(a) * 50;
    nodes.push({ x, y, r: 3.5, c: '#B388FF' });
    links.push({ x1: cx, y1: cy, x2: x, y2: y });
  }
  for (let i = 0; i < layer2; i++) {
    const a = (i / layer2) * Math.PI * 2 + seed * 0.7;
    const x = cx + Math.cos(a) * 95;
    const y = cy + Math.sin(a) * 95;
    nodes.push({ x, y, r: 2.5, c: '#D9C2FF' });
    const parent = 1 + Math.floor((i / layer2) * layer1);
    links.push({ x1: nodes[parent].x, y1: nodes[parent].y, x2: x, y2: y });
  }
  return (
    <svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#18142B" />
          <stop offset="1" stopColor="#0A0A0B" />
        </radialGradient>
      </defs>
      <rect width="360" height="240" fill={`url(#${id}-bg)`} />
      {links.map((l, i) => (
        <line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#B388FF" strokeOpacity="0.22" strokeWidth="0.7" />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={i === 0 ? 1 : 0.85} />
      ))}
    </svg>
  );
}

export function AutoArt({ seed = 1 }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  // pipeline-circuit pattern
  const rows = 6, cols = 9;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 30 + c * 36;
      const y = 30 + r * 32;
      const v = ((r * 13 + c * 7) * seed) % 5;
      if (v === 0) cells.push(<rect key={`${r}-${c}`} x={x - 6} y={y - 1} width="12" height="2" fill="#FF7A47" opacity="0.7" />);
      else if (v === 1) cells.push(<circle key={`${r}-${c}`} cx={x} cy={y} r="2" fill="#FF7A47" opacity="0.8" />);
      else if (v === 2) cells.push(<rect key={`${r}-${c}`} x={x - 1} y={y - 6} width="2" height="12" fill="#FFB48F" opacity="0.55" />);
    }
  }
  // horizontal flow lines
  const lines = [];
  for (let i = 0; i < 4; i++) {
    const y = 50 + i * 38;
    lines.push(<line key={`fl${i}`} x1="20" y1={y} x2="340" y2={y} stroke={`url(#${id})`} strokeWidth="1" />);
  }
  return (
    <svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#FF7A47" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FF7A47" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FF7A47" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#1F140C" />
          <stop offset="1" stopColor="#0A0A0B" />
        </radialGradient>
      </defs>
      <rect width="360" height="240" fill={`url(#${id}-bg)`} />
      {lines}
      {cells}
    </svg>
  );
}
