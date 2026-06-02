'use client';

import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { CAMERA } from '@/lib/constants';

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SceneCanvas({ children, className, style }: SceneCanvasProps) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      camera={{
        fov: CAMERA.fov,
        position: CAMERA.initialPosition,
        near: CAMERA.near,
        far: CAMERA.far,
      }}
      style={{ background: 'transparent', ...style }}
      className={className}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
