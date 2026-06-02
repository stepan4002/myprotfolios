export type ProjectCategory = 'tech' | 'events' | 'sales';

export interface Project {
  slug: string;
  title: string;
  titleEmphasis?: string;
  category: ProjectCategory;
  company: string;
  crossPillar?: string;
  techStack: string[];
  stats: { value: string; label: string }[];
  coverImage?: string;
  description: string;
  prose: string[];
  featured?: boolean;
  featuredIndex?: number;
}

export interface Pillar {
  id: string;
  number: string;
  title: string;
  titleEmphasis: string;
  description: string;
  tally: { value: string; label: string }[];
  href: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  description?: string;
}

export interface Language {
  name: string;
  level: string;
  proficiency: number; // 0-100
}

export interface SkillBlock {
  title: string;
  description: string;
  recent: string;
}

export interface NavItem {
  label: string;
  href: string;
}
