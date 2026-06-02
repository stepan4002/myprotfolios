import { useEffect, useState } from 'react';
import useLenis from './hooks/useLenis.js';
import Cursor from './sections/Cursor.jsx';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import Manifesto from './sections/Manifesto.jsx';
import Pillars from './sections/Pillars.jsx';
import Projects from './sections/Projects.jsx';
import Constellation from './sections/Constellation.jsx';
import AutomationFlow from './sections/AutomationFlow.jsx';
import TechStack from './sections/TechStack.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Scroll-triggered reveals (vanilla IntersectionObserver — light, no GSAP needed for this)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  return (
    <>
      <div className={`loader ${loaded ? 'gone' : ''}`}>
        <div className="mark" />
        <div className="label">Booting · agents · shaders · pipelines</div>
      </div>
      <Cursor />
      <Nav />
      <Hero />
      <Manifesto />
      <Pillars />
      <Projects />
      <Constellation />
      <AutomationFlow />
      <TechStack />
      <Footer />
    </>
  );
}
