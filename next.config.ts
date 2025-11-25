import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Optimizacija za brže učitavanje resursa
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-select"],
  },

  // SWC compiler optimizacije
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Image optimization - dozvoli eksterne domene
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pink-magnificent-cephalopod-824.mypinata.cloud",
      },
    ],
  },

  // Headers za optimizaciju
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
