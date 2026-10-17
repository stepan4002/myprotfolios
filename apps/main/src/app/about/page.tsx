import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { skills } from '@/data/about';
import profile from '@/data/profile.json';
import { techStack } from '@/data/tech-stack';
import { ventures, markets } from '@/data/business';

export const metadata: Metadata = { title: 'About — Nikolas Stepan', description: 'Technical founder and AI engineer in Budapest. Claude Code, Python, APIs, multi-agent orchestration, and five working languages.' };

export default function AboutPage() {
  return (
    <>
      <section className="page-section page-intro"><span className="mono-label">About / Budapest, Hungary</span><h1 className="portfolio-title">Close to the code.<br /><em>Closer to the problem.</em></h1><div className="about-copy"><p>I’m Nikolas Stepan, a technical founder and operator based in Budapest, Hungary. I define business workflows, design systems and direct AI-assisted implementation around real customer and operational needs.</p><p>I co-founded CADEMA, a Czech manufacturer of wooden structures, at sixteen. Working through sales, custom quotations and fulfilment gave me direct experience of the problems I now solve with software: a real-time configurator, a Czech-language voice agent and a catalogue automation stack.</p><p>My work combines requirements, architecture, API integration, testing and deployment. I use Claude Code and other AI tools for implementation in Python and TypeScript. My core strength is connecting the system design, integrations and operational requirements.</p><p>{profile.arrangements}</p><p>{profile.education} This background informs my approach to communication, human review and user-facing AI.</p></div><div className="hero-actions"><Link href="/work" className="btn-solid">See the work ↗</Link><a href={profile.cv} className="btn-ghost" download>Download CV ↓</a><a href={`mailto:${SITE.email}`} className="text-link">Start a conversation ↗</a></div></section>
      <section className="page-section portfolio-section"><div className="section-heading"><div><span className="mono-label">Capabilities</span><h2 className="h-section">From architecture<br />to <em>day-to-day operations.</em></h2></div></div><div className="capability-grid">{skills.map(skill => <article key={skill.title}><h3>{skill.title}</h3><p>{skill.description}</p><small>{skill.recent}</small></article>)}</div></section>
      <section className="page-section portfolio-section"><div className="section-heading"><div><span className="mono-label">Tools I work with</span><h2 className="h-section">A practical <em>technical stack.</em></h2></div></div><div className="capability-grid">{techStack.map(group => <article key={group.title}><h3>{group.title}</h3><ul className="tool-list">{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
      <section className="page-section portfolio-section"><div className="section-heading"><div><span className="mono-label">Operating background</span><h2 className="h-section">Companies behind<br />the <em>requirements.</em></h2></div></div><div className="capability-grid">{ventures.map(venture => <article key={venture.name}><span className="mono-label">{venture.role}</span><h3>{venture.name}</h3><p>{venture.body}</p></article>)}</div><p className="market-note">Commercial experience across {markets.map(market => market.name).join(', ')}.</p></section>
      <section className="page-section portfolio-section"><div className="section-heading"><div><span className="mono-label">Communication</span><h2 className="h-section">Five working languages.<br /><em>Clearly stated levels.</em></h2></div></div><dl className="language-list">{profile.languages.map(language => <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>)}</dl></section>
    </>
  );
}
