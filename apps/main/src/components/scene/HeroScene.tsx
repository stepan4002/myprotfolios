'use client';

import { Environment } from '@react-three/drei';
import { ParticleField } from '@/components/three/ParticleField';
import { AbstractShape } from '@/components/three/AbstractShape';
import { CameraController } from './CameraController';
import { PostProcessingStack } from './PostProcessingStack';

interface HeroSceneProps {
  scrollProgress?: number;
}

export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#E5A78F" />

      {/* Environment */}
      <Environment preset="studio" environmentIntensity={0.3} />

      {/* Particles */}
      <ParticleField count={1500} spread={15} size={0.012} color="#B14A2F" />
      <ParticleField count={500} spread={10} size={0.008} color="#D9D1C0" />

      {/* Central abstract shape */}
      <AbstractShape
        position={[0, 0, 0]}
        scale={1.8}
        color="#B14A2F"
        distort={0.25}
        speed={1.5}
      />

      {/* Secondary shape */}
      <AbstractShape
        position={[3, -1, -2]}
        scale={0.6}
        color="#E8DFCC"
        distort={0.4}
        speed={2.5}
      />

      {/* Camera */}
      <CameraController scrollProgress={scrollProgress} />

      {/* Post-processing */}
      <PostProcessingStack
        bloomIntensity={0.3}
        bloomThreshold={0.85}
        chromaticOffset={0.0003}
        vignetteIntensity={0.25}
      />
    </>
  );
}
