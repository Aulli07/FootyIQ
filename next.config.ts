import type { NextConfig } from "next";

// Fixes Turbopack incorrectly inferring the workspace root when multiple
// lockfiles exist elsewhere on the machine (which can break module resolution
// for `next/font/*`).
const projectRoot = __dirname;

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
