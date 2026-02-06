/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nagel-paul/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig
