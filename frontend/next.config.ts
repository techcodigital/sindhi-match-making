import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] },
  // Allow Arena/E2B live previews (https://{port}-{sandboxId}.e2b.app)
  allowedDevOrigins: ['*.e2b.app'],
  // Proxy browser API calls to the local backend so the browser never
  // has to reach localhost directly (required for live previews).
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://127.0.0.1:4000/api/:path*' }];
  },
};
export default nextConfig;
