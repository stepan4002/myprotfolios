import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  transpilePackages: ['three', 'lenis'],
  async redirects() {
    return [
      { source: '/web', destination: '/work', permanent: true },
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/business', destination: '/work', permanent: true },
    ];
  },
};
export default nextConfig;
