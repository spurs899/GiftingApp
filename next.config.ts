import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  basePath: process.env.GITHUB_PAGES === 'true' ? '/GiftingApp' : '',
  images: {
    unoptimized: process.env.GITHUB_PAGES === 'true',
  },
  ...(process.env.GITHUB_PAGES === 'true' && {
    // Skip API routes for static export
    experimental: {
      // Empty - API routes will just not be included in export
    }
  })
};

export default nextConfig;
