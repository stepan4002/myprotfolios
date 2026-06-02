'use client';

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface PostProcessingStackProps {
  bloomIntensity?: number;
  bloomThreshold?: number;
  chromaticOffset?: number;
  vignetteIntensity?: number;
}

export function PostProcessingStack({
  bloomIntensity = 0.4,
  bloomThreshold = 0.8,
  chromaticOffset = 0.0005,
  vignetteIntensity = 0.3,
}: PostProcessingStackProps) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(chromaticOffset, chromaticOffset)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        offset={0.5}
        darkness={vignetteIntensity}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
