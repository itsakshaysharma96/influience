import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Fix CSS in static export
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // Ensure CSS is properly handled in static export
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
