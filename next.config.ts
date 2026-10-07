import type { NextConfig } from "next";

// Fixes Turbopack incorrectly inferring the workspace root when multiple
// lockfiles exist elsewhere on the machine (which can break module resolution
// for `next/font/*`).
const projectRoot = __dirname;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/FootyIQ",
  turbopack: {
    root: projectRoot,
  }
};

export default nextConfig;
