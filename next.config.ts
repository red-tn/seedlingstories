import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'szyvodyudxspzwrihitk.supabase.co',
      },
    ],
  },
};

export default nextConfig;
