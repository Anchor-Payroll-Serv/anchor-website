import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contact", destination: "/get-started", permanent: true },
      { source: "/demo", destination: "/get-started", permanent: true },
      { source: "/security", destination: "/product", permanent: true },
      { source: "/privacy", destination: "/about", permanent: true },
      { source: "/terms", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
