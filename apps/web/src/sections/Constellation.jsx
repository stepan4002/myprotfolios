import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ============ data ============ */
const PODS = [
  {
    id: 'gemcraft',
    label: 'GemCraft',
    count: 19,
    color: '#C5FF4D',
    blurb: 'Glass & ceramics manufacture · 19-agent operating system. Chief Orchestrator + Customer Comms, Order Intake, Workshop, Gift Card, Logistics, Website QA, Product Publishing, Social, Marketplace Expansion, Localisation, Sales, Christmas Market, Volunteer, Innovation, Knowledge, Compliance, Grants, Finance.'
  },
  {
    id: 'gemart',
    label: 'GemArt',
    count: 9,
    color: '#FF7A47',
    blurb: 'Cultural-creative association · events, artisans, heritage coordination. Anchors the GemMark events programme and the Štítnik Water Castle stewardship.'
  },
  {
    id: 'csetneki',
    label: 'Csetneki',
    count: 11,
    color: '#B388FF',
    blurb: 'European luxury maison · multi-material design · womenswear. 11-agent pod covering clienteling, PR/media, brand protection and the Štítnik-lace house codes.'
  },
  {
    id: 'cadema',
    label: 'Cadema',
    count: 11,
    color: '#5DD3FF',
    blurb: 'Prague manufacturing pod · wooden structures, logistics. 11 agents including Pod Orchestrator, Production Coordination, Multi-Factory VRP, Logistics, 3D Configurator Integration.'
  },
  {
    id: 'gemertimes',
    label: 'Gemer Times',
    count: 8,
    color: '#FFD66B',
    blurb: 'AI-powered regional newsroom · editorial independence policy. Editor-in-chief, researcher, three writer voices (formal · conversational · investigative), corrector, plus distribution.'
  }
];

const GROUP_AGENTS = ['Finance', 'Innovation', 'Compliance', 'Translation', 'Developer'];

/* ============ position helpers ============ */
function podPositions() {
  const r = 6.2;
  const arr = [];
  PODS.forEach((p, i) => {
    const a = (i / PODS.length) * Math.PI * 2;
    arr.push({ ...p, x: Math.cos(a) * r, y: Math.sin(a) * r * 0.45, z: Math.sin(a) * r * 0.85 });
  });
  return arr;
}

function groupPositions() {
  const r = 2.6;
  return GROUP_AGENTS.map((label, i) => {
    const a = (i / GROUP_AGENTS.length) * Math.PI * 2 + Math.PI / 5;
    return { label, x: Math.cos(a) * r, y: 0.4 * Math.sin(a * 1.7), z: Math.sin(a) * r };
  });
}

function clusterPositions(center, count, radius = 1.1) {
  // small fibonacci sphere around a pod
  const arr = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    arr.push({
      x: center.x + x * radius,
      y: center.y + y * radius * 0.7,
      z: center.z + z * radius
    });
  }
  return arr;
}

/* ============ scene parts ============ */
function NodeSphere({ position, color, size = 0.18, label, onHover, onUnhover }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  useFrame(({ clock }) => {
    if (ref.current) {
      const k = hov ? 1.4 : 1;
      ref.current.scale.setScalar(k + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.04);
    }
  });
  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHov(true); onHover && onHover(label); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHov(false); onUnhover && onUnhover(); document.body.style.cursor = ''; }}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function Halo({ position, color, size }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} toneMapped={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Lines({ segments }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(segments.length * 6);
    const col = new Float32Array(segments.length * 6);
    segments.forEach((s, i) => {
      pos[i * 6] = s.a.x; pos[i * 6 + 1] = s.a.y; pos[i * 6 + 2] = s.a.z;
      pos[i * 6 + 3] = s.b.x; pos[i * 6 + 4] = s.b.y; pos[i * 6 + 5] = s.b.z;
      const c = new THREE.Color(s.color || '#5DD3FF');
      col[i * 6] = c.r; col[i * 6 + 1] = c.g; col[i * 6 + 2] = c.b;
      col[i * 6 + 3] = c.r; col[i * 6 + 4] = c.g; col[i * 6 + 5] = c.b;
    });
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [segments]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);
  return <lineSegments geometry={geom} material={mat} />;
}

function BgParticles() {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const N = 240;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 9 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const mat = useMemo(() => new THREE.PointsMaterial({
    color: '#5C5C66',
    size: 0.03,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  }), []);
  return <points geometry={geom} material={mat} />;
}

function Scene({ onHover, onUnhover }) {
  const group = useRef(null);

  const { pods, groups, segments, podAgentPositions } = useMemo(() => {
    const pods = podPositions();
    const groups = groupPositions();
    const segments = [];

    // center → group agents (white/dim)
    groups.forEach((g) => {
      segments.push({ a: { x: 0, y: 0, z: 0 }, b: g, color: '#FFFFFF' });
    });
    // center → pods (pod color)
    pods.forEach((p) => {
      segments.push({ a: { x: 0, y: 0, z: 0 }, b: p, color: p.color });
    });

    const podAgentPositions = {};
    pods.forEach((p) => {
      const positions = clusterPositions(p, p.count, 1.0);
      podAgentPositions[p.id] = positions;
      positions.forEach((pos) => {
        segments.push({ a: p, b: pos, color: p.color });
      });
    });

    // a few cross-pod weak links (shared services)
    for (let i = 0; i < pods.length; i++) {
      const next = pods[(i + 1) % pods.length];
      segments.push({ a: pods[i], b: next, color: '#FFFFFF' });
    }

    return { pods, groups, segments, podAgentPositions };
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.06;
  });

  return (
    <group ref={group}>
      <BgParticles />
      <Lines segments={segments} />

      {/* center / master executive */}
      <NodeSphere position={[0, 0, 0]} color="#FFFFFF" size={0.32} label={{ id: 'master', label: 'Master Executive', blurb: 'AI COO · single founder conversation surface. Routes context to group services and dispatches into the five company pods.', count: 1 }} onHover={onHover} onUnhover={onUnhover} />
      <Halo position={[0, 0, 0]} color="#FFFFFF" size={0.85} />

      {/* group agents */}
      {groups.map((g, i) => (
        <NodeSphere
          key={i}
          position={[g.x, g.y, g.z]}
          color="#9AA0AA"
          size={0.16}
          label={{ id: 'group', label: g.label + ' (Group)', blurb: 'Shared group service agent — runs across all five company pods. Provides cross-cutting capability while keeping pod data isolated.', count: 1 }}
          onHover={onHover}
          onUnhover={onUnhover}
        />
      ))}

      {/* pod centers + their agent clusters */}
      {pods.map((p) => (
        <group key={p.id}>
          <Halo position={[p.x, p.y, p.z]} color={p.color} size={1.5} />
          <NodeSphere
            position={[p.x, p.y, p.z]}
            color={p.color}
            size={0.28}
            label={p}
            onHover={onHover}
            onUnhover={onUnhover}
          />
          {podAgentPositions[p.id].map((pos, i) => (
            <NodeSphere
              key={i}
              position={[pos.x, pos.y, pos.z]}
              color={p.color}
              size={0.09}
              label={{ ...p, label: `${p.label} agent ${i + 1}/${p.count}`, blurb: p.blurb }}
              onHover={onHover}
              onUnhover={onUnhover}
            />
          ))}
        </group>
      ))}
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useMemo(() => {
    camera.position.set(7, 4.5, 11);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

/* ============ component ============ */
export default function Constellation() {
  const [hud, setHud] = useState(null);
  const [shiftHeld, setShiftHeld] = useState(false);

  useEffect(() => {
    const down = (e) => { if (e.key === 'Shift') setShiftHeld(true); };
    const up   = (e) => { if (e.key === 'Shift') setShiftHeld(false); };
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
    <section className="constellation" id="constellation">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-label">Agent Ecosystem</div>
            <h2 className="section-title">70+ agents <em>· five companies.</em></h2>
          </div>
          <p className="section-sub">
            A Master Executive at the centre, five group services, and five company pods.
            <strong> Drag to orbit · Shift + scroll to zoom.</strong> Hover any node to see the agent.
          </p>
        </div>
      </div>

      <div className="constellation-stage">
        <div className={`constellation-hint ${shiftHeld ? 'on' : ''}`} aria-hidden>
          <kbd>shift</kbd> + scroll to zoom &nbsp;·&nbsp; drag to orbit
        </div>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ fov: 50, near: 0.1, far: 100 }}
        >
          <Suspense fallback={null}>
            <CameraSetup />
            <Scene onHover={setHud} onUnhover={() => setHud(null)} />
            <OrbitControls
              enablePan={false}
              enableZoom={shiftHeld}    // only zoom while Shift is held — otherwise page scrolls naturally
              minDistance={6}
              maxDistance={20}
              autoRotate={false}
              dampingFactor={0.08}
              enableDamping
            />
          </Suspense>
        </Canvas>

        <aside className="constellation-legend">
          <div className="head">Company pods</div>
          {PODS.map((p) => (
            <div className="item" key={p.id}>
              <span className="swatch" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              <span>{p.label}</span>
              <span className="v">{p.count}</span>
            </div>
          ))}
          <div className="item" style={{ marginTop: 8 }}>
            <span className="swatch" style={{ background: '#9AA0AA' }} />
            <span>Group services</span>
            <span className="v">5</span>
          </div>
          <div className="item">
            <span className="swatch" style={{ background: '#FFFFFF' }} />
            <span>Master Executive</span>
            <span className="v">1</span>
          </div>
        </aside>

        <div className="constellation-tip">Drag · scroll · hover</div>

        <div className="constellation-hud" style={{ opacity: hud ? 1 : 0 }}>
          {hud && (
            <>
              <div className="label">Selected</div>
              <h4>{hud.label}</h4>
              <p>{hud.blurb}</p>
              <div className="stats">Agents · {hud.count}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
