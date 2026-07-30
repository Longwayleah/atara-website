import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 92, 95],
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
