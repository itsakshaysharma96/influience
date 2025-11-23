import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //get out
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
