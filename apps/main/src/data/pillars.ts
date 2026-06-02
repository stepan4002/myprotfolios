import type { Pillar } from '@/lib/types';

export const pillars: Pillar[] = [
  {
    id: 'tech',
    number: 'I',
    title: 'Production AI systems,',
    titleEmphasis: 'full-stack & 3D.',
    description:
      'I build, ship and operate the AI agent platforms, web apps, configurators and mobile apps that run my companies.',
    tally: [
      { value: '~76', label: 'shipped artifacts' },
      { value: '22', label: 'git repositories' },
      { value: '5', label: 'AI company pods, 62 agents' },
      { value: '495', label: 'SKUs live across 6 marketplaces' },
    ],
    href: '/projects?filter=tech',
  },
  {
    id: 'events',
    number: 'II',
    title: 'Cultural director &',
    titleEmphasis: 'event organiser.',
    description:
      'Co-founder of GemMark; director of Gemcraft; co-steward of the Štítnik Water Castle reconstruction. Fashion shows, tours, workshops, wine tastings, food events — end-to-end.',
    tally: [
      { value: '3', label: 'organisations directed' },
      { value: '40+', label: 'events organised' },
      { value: '1 castle', label: 'under reconstruction' },
      { value: '9-mini-game', label: 'museum tour app shipped' },
    ],
    href: '/projects?filter=events',
  },
  {
    id: 'sales',
    number: 'III',
    title: 'Multilingual B2B &',
    titleEmphasis: 'gallery sales.',
    description:
      'Sales lead for CADEMA wooden garden structures into the Spanish, French and Czech markets; international partnerships for Gemcraft, including a gallery placement with the National Czech & Slovak Museum in the US.',
    tally: [
      { value: '3', label: 'EU markets · 1 US partnership' },
      { value: '6', label: 'languages on the sales floor' },
      { value: '314 SKUs', label: 'migrated · 374 EAN-13s generated' },
      { value: '3D configurator', label: 'built to close quotes faster' },
    ],
    href: '/projects?filter=sales',
  },
];
