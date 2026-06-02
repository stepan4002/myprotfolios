# Nikolas Stepan — Tech / AI Portfolio

An interactive, 3D portfolio that **is** the demo. Built with Vite + React + Three.js (R3F) + Drei + GSAP + Lenis.

## What's inside

| Section | Tech | Note |
|---|---|---|
| **Hero** | Three.js · custom GLSL shader · R3F | 280-node Fibonacci-sphere agent network with nearest-neighbor edges, additive-blended particle shader, mouse parallax, slow rotation. |
| **Manifesto** | CSS | One typographic statement. |
| **Pillars** | CSS · IntersectionObserver | Three disciplines · Apps · Agents · Automations. |
| **Projects** | React · procedural SVG art · 3D tilt | 9-card magazine grid. Each card generates a unique SVG visual from its category. Hover → perspective transform. |
| **Agent Constellation** | R3F · OrbitControls | A 3D orbital map of 70+ agents across 5 company pods. Drag to orbit, scroll to zoom, hover any node for live HUD. |
| **Automation Flow** | SVG · `animateMotion` | Three pipeline diagrams with data packets flowing along the paths. Marketing Lab · Schools.sk · CADEMA Generator. |
| **Tech Stack** | CSS | Four columns × 8 rows of the working stack. |
| **Footer** | CSS | Contact, languages, location. |
| **Cursor** | Custom | Dot + ring with hover state. Mix-blend-mode: difference. |
| **Smooth scroll** | Lenis | RAF-driven smooth wheel. |

## Run it

```bash
cd "Specialized Portfolios/Web and AI Automation"
npm install
npm run dev
# → http://localhost:5174
```

> A project-local `.npmrc` sets `strict-ssl=false` to work around TLS interception on networks where corporate proxies / AV break the npm leaf-cert chain. Remove it in trusted CI environments.

Build a static bundle:

```bash
npm run build
npm run preview
```

Output goes to `dist/`. Drop it on any static host (Vercel, Netlify, Hetzner + Nginx).

## Design

- **Palette**: near-black `#0A0A0B` paper with subtle noise, electric lime `#C5FF4D` (apps), lavender `#B388FF` (agents), warm coral `#FF7A47` (automations), cyan `#5DD3FF` (data).
- **Type**: Geist + Geist Mono + Fraunces (italic accents).
- **Motion**: Lenis smooth scroll, IntersectionObserver reveals, slow continuous rotation on 3D scenes, custom cursor.
- **No bundled images** — every visual is procedural (Three.js, SVG, CSS gradients).

## File map

```
src/
├── main.jsx
├── App.jsx
├── styles.css
├── hooks/
│   └── useLenis.js
└── sections/
    ├── Cursor.jsx
    ├── Nav.jsx
    ├── Hero.jsx
    ├── HeroScene.jsx       (R3F)
    ├── Manifesto.jsx
    ├── Pillars.jsx
    ├── Projects.jsx
    ├── ProjectArt.jsx      (procedural SVG art per category)
    ├── Constellation.jsx   (R3F · interactive agent map)
    ├── AutomationFlow.jsx  (animated SVG pipelines)
    ├── TechStack.jsx
    └── Footer.jsx
```
