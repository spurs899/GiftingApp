import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  basePath: process.env.GITHUB_PAGES === 'true' ? '/GiftingApp' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(process.env.GITHUB_PAGES === 'true' && {
    experimental: {
      // Empty - API routes will just not be included in export
    }
  })
};

export default nextConfig;
