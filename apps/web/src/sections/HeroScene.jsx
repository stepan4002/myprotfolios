import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ---------- helpers ---------- */
function fibonacciSphere(samples, radius) {
  const points = [];
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle
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

function nearestNeighborEdges(points, k = 3, maxDist = Infinity) {
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    const dists = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      dists.push([j, points[i].distanceTo(points[j])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    for (let n = 0; n < Math.min(k, dists.length); n++) {
      const [j, d] = dists[n];
      if (d <= maxDist && i < j) edges.push([i, j]);
    }
  }
  return edges;
}

/* ---------- particle nodes ---------- */
function Nodes({ points }) {
  const ref = useRef(null);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    const sizes = new Float32Array(points.length);
    const offsets = new Float32Array(points.length);
    points.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      sizes[i] = 0.5 + Math.random() * 1.6;
      offsets[i] = Math.random() * Math.PI * 2;
    });
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    g.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    return g;
  }, [points]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPxRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 },
      uColorA: { value: new THREE.Color('#C5FF4D') },
      uColorB: { value: new THREE.Color('#B388FF') }
    },
    vertexShader: /* glsl */`
      attribute float aSize;
      attribute float aOffset;
      uniform float uTime;
      uniform float uPxRatio;
      varying float vPulse;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float pulse = 0.55 + 0.45 * sin(uTime * 1.2 + aOffset);
        vPulse = pulse;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * (260.0 / -mv.z) * uPxRatio * (0.7 + 0.5 * pulse);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vPulse;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        float glow = smoothstep(0.5, 0.25, d) * 0.9;
        vec3 col = mix(uColorA, uColorB, vPulse * 0.6 + 0.2);
        float alpha = core + glow * 0.55;
        gl_FragColor = vec4(col, alpha);
      }
    `
  }), []);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return <points ref={ref} geometry={geom} material={material} />;
}

/* ---------- connecting lines ---------- */
function Edges({ points, edges }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6] = points[a].x;
      positions[i * 6 + 1] = points[a].y;
      positions[i * 6 + 2] = points[a].z;
      positions[i * 6 + 3] = points[b].x;
      positions[i * 6 + 4] = points[b].y;
      positions[i * 6 + 5] = points[b].z;
    });
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [points, edges]);

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color('#5DD3FF'),
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  return <lineSegments geometry={geom} material={mat} />;
}

/* ---------- whole group with mouse parallax + rotation ---------- */
function NetworkGroup() {
  const group = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const { points, edges } = useMemo(() => {
    // Smaller sphere — less screen real estate, less distraction from title
    const pts = fibonacciSphere(220, 2.4);
    pts.forEach((p) => p.add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.14,
      (Math.random() - 0.5) * 0.14,
      (Math.random() - 0.5) * 0.14
    )));
    const eds = nearestNeighborEdges(pts, 3, 0.85);
    return { points: pts, edges: eds };
  }, []);

  // Window-level pointer tracking — fixes "mouse leaving" weirdness
  // (R3F's mouse uniform reads as NDC inside the canvas only)
  useEffect(() => {
    const onMove = (e) => {
      target.current.y = ((e.clientX / window.innerWidth)  - 0.5) * 0.5;
      target.current.x = ((e.clientY / window.innerHeight) - 0.5) * 0.3;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(({ clock }) => {
    cur.current.x += (target.current.x - cur.current.x) * 0.05;
    cur.current.y += (target.current.y - cur.current.y) * 0.05;
    if (group.current) {
      group.current.rotation.x = cur.current.x + Math.sin(clock.elapsedTime * 0.08) * 0.04;
      group.current.rotation.y = cur.current.y + clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Edges points={points} edges={edges} />
      <Nodes points={points} />
    </group>
  );
}

/* ---------- scene wrapper ---------- */
function SceneInner() {
  const { camera } = useThree();
  useMemo(() => {
    camera.position.set(0, 0, 11);  // pulled back → sphere appears smaller
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return (
    <>
      <fog attach="fog" args={['#0A0A0B', 7, 13]} />
      <NetworkGroup />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      camera={{ fov: 50, near: 0.1, far: 50 }}
      style={{ background: 'transparent' }}
    >
      <SceneInner />
    </Canvas>
  );
}
