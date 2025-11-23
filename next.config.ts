import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //get out
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
