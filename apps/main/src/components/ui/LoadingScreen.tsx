'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/hooks/useAppStore';
import { useEffect } from 'react';

export function LoadingScreen() {
  const isLoaded = useAppStore((s) => s.isLoaded);
  const setLoaded = useAppStore((s) => s.setLoaded);

  useEffect(() => {
    // Simulate loading — in production, this would track actual asset loading
    const timer = setTimeout(() => setLoaded(), 1500);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] bg-[var(--paper)] flex items-center justify-center"
        >
          <div className="text-center">
            <div className="font-serif text-2xl font-light text-[var(--ink)] mb-4">
              Nikolas <em className="italic">Stepan</em>
            </div>
            <div className="w-32 h-px bg-[var(--rule)] mx-auto relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--accent)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
