import type { Metadata } from 'next';
import { fraunces, geist, jetbrainsMono } from '@/lib/fonts';
import { SITE } from '@/lib/constants';
import { Masthead } from '@/components/editorial/Masthead';
import { Colophon } from '@/components/editorial/Colophon';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: { title: SITE.title, description: SITE.description, type: 'website', url: SITE.url },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><Masthead /><main id="main-content">{children}</main><Colophon /></body></html>;
}
