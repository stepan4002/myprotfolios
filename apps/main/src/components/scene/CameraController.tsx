'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { CAMERA } from '@/lib/constants';

const DEFAULT_POSITION = new Vector3(...CAMERA.initialPosition);
const DEFAULT_LOOK_AT = new Vector3(...CAMERA.initialLookAt);

interface CameraControllerProps {
  scrollProgress?: number;
  scrollRange?: number;
}

export function CameraController({
  scrollProgress = 0,
  scrollRange = CAMERA.scrollRange,
}: CameraControllerProps) {
  const clock = useRef(0);
  const targetPos = useRef(DEFAULT_POSITION.clone());

  useFrame(({ camera }, delta) => {
    clock.current += delta;

    // Ambient sway
    const swayX = Math.sin(clock.current * 0.3) * 0.03;
    const swayY = Math.cos(clock.current * 0.2) * 0.02;

    // Scroll-driven vertical movement
    const scrollY = DEFAULT_POSITION.y - scrollProgress * scrollRange;

    targetPos.current.set(
      DEFAULT_POSITION.x + swayX,
      scrollY + swayY,
      DEFAULT_POSITION.z,
    );

    // Smooth damping
    const lerpFactor = Math.min(1, delta * 6);
    camera.position.lerp(targetPos.current, lerpFactor);
    camera.lookAt(DEFAULT_LOOK_AT);
  });

  return null;
}
