import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed static export to enable API routes for CORS proxy
  // If you need static export, you'll need to handle CORS differently
  // output: "export",

  trailingSlash: true,

  images: {
    unoptimized: true,
    // Allow images from the API domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.martech-influence.com',
      },
    ],
  },
};

export default nextConfig;
