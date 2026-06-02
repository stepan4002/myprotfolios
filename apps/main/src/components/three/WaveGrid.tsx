'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface WaveGridProps {
  gridSize?: number;
  spacing?: number;
  size?: number;
  color?: string;
  waveAmplitude?: number;
  waveSpeed?: number;
}

export function WaveGrid({
  gridSize = 20,
  spacing = 0.8,
  size = 0.012,
  color = '#D9D1C0',
  waveAmplitude = 0.6,
  waveSpeed = 0.8,
}: WaveGridProps) {
  const ref = useRef<THREE.Points>(null);

  const count = gridSize * gridSize;
  const basePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const half = (gridSize * spacing) / 2;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const idx = (i * gridSize + j) * 3;
        pos[idx] = i * spacing - half;
        pos[idx + 1] = 0;
        pos[idx + 2] = j * spacing - half;
      }
    }
    return pos;
  }, [gridSize, spacing, count]);

  useFrame((state) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const positions = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime * waveSpeed;

    for (let i = 0; i < count; i++) {
      const x = basePositions[i * 3];
      const z = basePositions[i * 3 + 2];
      positions[i * 3 + 1] =
        Math.sin(x * 0.5 + t) * waveAmplitude * 0.5 +
        Math.cos(z * 0.4 + t * 0.7) * waveAmplitude * 0.5;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={basePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}
