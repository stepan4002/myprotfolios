import { create } from 'zustand';
import type { Vector3Tuple } from 'three';

interface AppState {
  // Loading
  isLoaded: boolean;
  loadProgress: number;
  setLoaded: () => void;
  setLoadProgress: (progress: number) => void;

  // Navigation
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;

  // 3D
  cameraTarget: Vector3Tuple | null;
  isAnimating: boolean;
  setCameraTarget: (target: Vector3Tuple | null) => void;
  setIsAnimating: (val: boolean) => void;

  // UI
  menuOpen: boolean;
  cursorVariant: 'default' | 'hover' | 'click';
  toggleMenu: () => void;
  setMenuOpen: (open: boolean) => void;
  setCursorVariant: (variant: 'default' | 'hover' | 'click') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  loadProgress: 0,
  setLoaded: () => set({ isLoaded: true, loadProgress: 100 }),
  setLoadProgress: (progress) => set({ loadProgress: progress }),

  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),

  cameraTarget: null,
  isAnimating: false,
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setIsAnimating: (val) => set({ isAnimating: val }),

  menuOpen: false,
  cursorVariant: 'default',
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  setMenuOpen: (open) => set({ menuOpen: open }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
