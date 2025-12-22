import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Optimizacija za brže učitavanje resursa
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-select",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@radix-ui/react-switch",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "recharts",
    ],
    serverActions: {
      bodySizeLimit: "10mb", // Increase limit for image uploads
    },
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

  // Exclude Prisma from client bundle (Turbopack compatible)
  serverExternalPackages: ["@prisma/client", "prisma"],

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
    qualities: [25, 50, 75, 85],
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
