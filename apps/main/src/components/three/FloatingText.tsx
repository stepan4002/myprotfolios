'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingTextProps {
  text: string;
  position?: [number, number, number];
  size?: number;
  color?: string;
}

export function FloatingText({
  text,
  position = [0, 2, 0],
  size = 0.8,
  color = '#14110D',
}: FloatingTextProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <Text3D
          font="/assets/fonts/fraunces-regular.json"
          size={size}
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelSegments={3}
        >
          {text}
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
        </Text3D>
      </Center>
    </group>
  );
}
