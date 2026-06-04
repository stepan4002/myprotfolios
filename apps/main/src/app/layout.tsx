import type { Metadata } from 'next';
import { fraunces, geist, jetbrainsMono } from '@/lib/fonts';
import { SITE } from '@/lib/constants';
import { Masthead } from '@/components/editorial/Masthead';
import { Colophon } from '@/components/editorial/Colophon';
import { SmoothScroll } from '@/components/editorial/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: 'Nikolas Stepan — Vol. III · Issue 01 · 2026',
    description: SITE.description,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScroll />
        <Masthead />
        <main>{children}</main>
        <Colophon />
      </body>
    </html>
  );
}
