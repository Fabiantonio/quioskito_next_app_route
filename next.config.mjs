/** @type {import('next').NextConfig} */
const nextConfig = {
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
      "/*": ["./node_modules/.prisma/client/**/*"],
    },
  },
};

export default nextConfig;
