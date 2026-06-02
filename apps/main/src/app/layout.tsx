import type { Metadata } from 'next';
import { fraunces, geist, jetbrainsMono } from '@/lib/fonts';
import { SITE } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import './globals.css';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: 'Nikolas Stepan — Founder · Director · Sales',
    description:
      'Production AI systems, cultural events at scale, international B2B & gallery sales.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <GrainOverlay />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
