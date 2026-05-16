import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  allowedDevOrigins: ["169.254.83.107"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "themarketgourmet.com.co",
      },
    ],
  },
};

export default nextConfig;
