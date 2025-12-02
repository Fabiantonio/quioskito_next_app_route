import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";



/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
   experimental: {
    outputFileTracingIncludes: {
      "/*": [
        "./node_modules/.prisma/client/**/*",
        "./src/generated/prisma/**/*",
        "./.prisma/client/**/*"
      ],
    },
  }
};

export default nextConfig;
