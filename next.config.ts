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
};

export default nextConfig;
