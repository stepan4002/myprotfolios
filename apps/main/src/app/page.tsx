import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { Dashboard } from '@/components/dashboard/Dashboard';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default function HomePage() {
  return <Dashboard />;
}
