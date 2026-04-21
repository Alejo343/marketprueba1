import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  allowedDevOrigins: ["169.254.83.107"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thebarrilmarket.com",
      },
    ],
  },
};

export default nextConfig;
