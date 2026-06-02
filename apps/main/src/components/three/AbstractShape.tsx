'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AbstractShapeProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  distort?: number;
  speed?: number;
}

export function AbstractShape({
  position = [0, 0, 0],
  scale = 2,
  color = '#B14A2F',
  distort = 0.3,
  speed = 2,
}: AbstractShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={color}
        roughness={0.4}
        metalness={0.1}
        distort={distort}
        speed={speed}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}
