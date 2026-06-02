'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ClientOnly } from '@/components/shared/ClientOnly';
import { ScrollTriggerWrapper } from '@/components/shared/ScrollTriggerWrapper';
import { ProjectGrid } from '@/components/ui/ProjectGrid';

const SceneCanvas = dynamic(
  () => import('@/components/scene/SceneCanvas').then((m) => m.SceneCanvas),
  { ssr: false },
);
const WaveGrid = dynamic(
  () => import('@/components/three/WaveGrid').then((m) => m.WaveGrid),
  { ssr: false },
);
const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then((m) => m.ParticleField),
  { ssr: false },
);

export default function ProjectsPage() {
  return (
    <>
      {/* Ambient 3D — wave grid + sparse particles for data/catalogue feel */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <ClientOnly>
          <SceneCanvas>
            <ambientLight intensity={0.3} />
            <group position={[0, -3, -5]} rotation={[-0.5, 0, 0]}>
              <WaveGrid gridSize={25} spacing={0.7} size={0.01} color="#D9D1C0" waveAmplitude={0.4} waveSpeed={0.6} />
            </group>
            <ParticleField count={200} spread={16} size={0.005} color="#E5A78F" />
          </SceneCanvas>
        </ClientOnly>
      </div>

      <div className="relative z-10 page-section pt-32 pb-16">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 border-b border-[var(--rule)] pb-12"
        >
          <h1 className="font-serif font-light text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-[-0.035em] text-[var(--ink)]">
            All <span className="italic">projects.</span>
          </h1>
          <p className="mt-8 max-w-[680px] text-[var(--ink-soft)] text-[17px] leading-[1.6]">
            76 shipped artifacts across tech, events, and sales — from multi-agent AI systems
            to 3D configurators to cultural event production.
          </p>
        </motion.header>

        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}
