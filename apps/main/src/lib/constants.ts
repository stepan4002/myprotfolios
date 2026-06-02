import type { Vector3Tuple } from 'three';

export const SITE = {
  name: 'Nikolas Stepan',
  title: 'Nikolas Stepan — Technical Founder · Event Director · International Sales',
  description:
    'Nikolas Stepan — 23, multilingual founder/operator. Three pillars: production AI & software systems, cultural-event management, international sales. Based in Budapest.',
  email: 'nikostepan24@gmail.com',
  phone: '+36 30 667 0892',
  linkedin: 'https://linkedin.com/in/nikolas-stepan-545417221',
  location: 'Budapest, HU',
  subdomains: {
    events: 'https://events.nikolasstepan.com',
    web: 'https://web.nikolasstepan.com',
    sales: 'https://sales.nikolasstepan.com',
  },
} as const;

export const CAMERA = {
  initialPosition: [0, 0, 8] as Vector3Tuple,
  initialLookAt: [0, 0, 0] as Vector3Tuple,
  fov: 50,
  near: 0.1,
  far: 100,
  animationDuration: 1.6,
  scrollRange: 4,
} as const;

export const ANIMATION = {
  scrollLerp: 0.1,
  scrollDuration: 1.2,
  staggerDelay: 0.08,
  revealDuration: 0.8,
  counterDuration: 2,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
