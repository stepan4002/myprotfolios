'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Project } from '@/lib/types';
import { projects } from '@/data/projects';

type Category = Project['category'];

const CATEGORY_COLOR: Record<Category, string> = {
  tech:   '#1F3FBB',
  events: '#B14A2F',
  sales:  '#0B7355',
};

const FILTERS: { id: Category | 'all'; label: string }[] = [
  { id: 'all',    label: 'All' },
  { id: 'tech',   label: 'Apps & AI' },
  { id: 'events', label: 'Events' },
  { id: 'sales',  label: 'Sales' },
];

/* ── geometry helpers ───────────────────────────────────────────── */
function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

/* ── individual project node ────────────────────────────────────── */
function ProjectNode({
  project,
  position,
  active,
  visible,
  onClick,
}: {
  project: Project;
  position: THREE.Vector3;
  active: boolean;
  visible: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const color = CATEGORY_COLOR[project.category];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + position.x;
    ref.current.position.y = position.y + Math.sin(t * 0.6) * 0.15;
    ref.current.rotation.x += 0.003;
    ref.current.rotation.y += 0.005;
    const targetScale = active ? 1.6 : hover ? 1.3 : 1.0;
    const cur = ref.current.scale.x;
    const next = cur + (targetScale - cur) * 0.1;
    ref.current.scale.setScalar(next * (visible ? 1 : 0.001));
    (ref.current.material as THREE.MeshStandardMaterial).opacity = visible ? 1 : 0.05;
  });

  const Geo =
    project.category === 'events'
      ? <boxGeometry args={[0.42, 0.42, 0.42]} />
      : project.category === 'sales'
      ? <octahedronGeometry args={[0.32, 0]} />
      : <sphereGeometry args={[0.32, 24, 24]} />;

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh
        ref={ref}
        position={[position.x, position.y, position.z]}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = ''; }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        {Geo}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hover || active ? 0.9 : 0.35}
          roughness={0.35}
          metalness={0.65}
          transparent
        />
      </mesh>
    </Float>
  );
}

/* ── scene contents ─────────────────────────────────────────────── */
function Scene({
  filter,
  activeSlug,
  onSelect,
}: {
  filter: Category | 'all';
  activeSlug: string | null;
  onSelect: (p: Project) => void;
}) {
  const { camera } = useThree();
  const positions = useMemo(() => fibonacciSphere(projects.length, 4.2), []);

  useEffect(() => {
    camera.position.set(0, 0, 11);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#DCE3FF" />
      <fog attach="fog" args={['#F8F5EC', 9, 22]} />
      {projects.map((p, i) => {
        const visible = filter === 'all' || p.category === filter;
        return (
          <ProjectNode
            key={p.slug}
            project={p}
            position={positions[i]}
            active={activeSlug === p.slug}
            visible={visible}
            onClick={() => onSelect(p)}
          />
        );
      })}
    </>
  );
}

/* ── top-level component (Canvas + UI overlays) ─────────────────── */
export function ProjectConstellation() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [active, setActive] = useState<Project | null>(null);
  const [shiftHeld, setShiftHeld] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.key === 'Shift') setShiftHeld(true); };
    const up   = (e: KeyboardEvent) => { if (e.key === 'Shift') setShiftHeld(false); };
    const blur = () => setShiftHeld(false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    window.addEventListener('blur',    blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup',   up);
      window.removeEventListener('blur',    blur);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: 'min(85vh, 780px)' }}>
      {/* Filters */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-2 pointer-events-none">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`pointer-events-auto px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] border rounded-full transition-colors ${
              filter === f.id
                ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--rule)] hover:border-[var(--ink)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Shift+scroll hint */}
      <div
        className={`absolute top-4 right-4 z-10 font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border transition-colors ${
          shiftHeld
            ? 'bg-[var(--accent)] text-[var(--paper)] border-[var(--accent)]'
            : 'bg-[var(--paper)]/80 text-[var(--ink-mute)] border-[var(--rule)] backdrop-blur'
        }`}
        style={{ marginTop: '52px' }}
      >
        <kbd className="font-mono mr-1.5 px-1.5 py-0.5 bg-[var(--paper-deep)] rounded text-[var(--ink)]">Shift</kbd>
        + scroll · drag to orbit · click a node
      </div>

      {/* Canvas */}
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ fov: 50, near: 0.1, far: 100 }}
      >
        <Scene filter={filter} activeSlug={active?.slug ?? null} onSelect={setActive} />
        <OrbitControls
          enablePan={false}
          enableZoom={shiftHeld}
          minDistance={6}
          maxDistance={20}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>

      {/* Detail panel — slide in from right */}
      {active && (
        <div
          className="absolute top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[var(--paper)] border-l border-[var(--ink)] overflow-y-auto p-8 z-20"
          style={{ boxShadow: '-30px 0 60px -20px rgba(11,11,12,0.18)' }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-mute)] hover:text-[var(--accent)] transition-colors mb-6"
          >
            ← Close
          </button>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: CATEGORY_COLOR[active.category] }}>
            {active.category} · {active.company ?? '—'}
          </div>
          <h3 className="font-serif font-light text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-6">
            {active.title}
          </h3>
          {active.stats && active.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {active.stats.slice(0, 4).map((s, i) => (
                <div key={i} className="border border-[var(--rule)] p-3">
                  <div className="font-serif text-[22px] leading-none tracking-[-0.02em]">{s.value}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-mute)] mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <p className="text-[14px] leading-[1.7] text-[var(--ink-soft)] mb-6">{active.description}</p>
          {active.techStack && active.techStack.length > 0 && (
            <div className="mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-mute)] mb-3">Stack</div>
              <div className="flex flex-wrap gap-2">
                {active.techStack.map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2 py-1 border border-[var(--rule)] text-[var(--ink-soft)]">{t}</span>
                ))}
              </div>
            </div>
          )}
          {active.prose && active.prose.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[var(--rule)]">
              {active.prose.slice(0, 2).map((p, i) => (
                <p key={i} className="text-[13px] leading-[1.7] text-[var(--ink-soft)]">{p}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
