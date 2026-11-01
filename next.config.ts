import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongodb"],
  // ager config e `images` ba onno kichu thakle ekhane rekhe din
  // `cacheComponents: true` line ta thakle MUCHHE din
};

export default nextConfig;