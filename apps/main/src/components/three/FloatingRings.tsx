'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingRingsProps {
  count?: number;
  radius?: number;
  color?: string;
}

export function FloatingRings({
  count = 5,
  radius = 3,
  color = '#B14A2F',
}: FloatingRingsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        Math.sin((i / count) * Math.PI * 2) * radius,
        (i - count / 2) * 1.2,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.8,
      speed: 0.3 + Math.random() * 0.4,
    }));
  }, [count, radius]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <Ring key={i} {...ring} color={color} index={i} />
      ))}
    </group>
  );
}

function Ring({
  position,
  rotation,
  scale,
  speed,
  color,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = rotation[0] + state.clock.elapsedTime * speed;
    ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + index * 0.7) * 0.5;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.03, 16, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.5}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}
