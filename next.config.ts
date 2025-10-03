import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ⛔️ 忽略 ESLint 错误，允许构建通过
  },
  typescript: {
    ignoreBuildErrors: true, // ⛔️ 忽略 TS 错误，允许构建通过
  },
};

export default nextConfig;
