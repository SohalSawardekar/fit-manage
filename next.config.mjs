/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allows HTTPS URLs
        hostname: "**", // Matches all hostnames
      },
      {
        protocol: "http", // Allows HTTP URLs
        hostname: "**", // Matches all hostnames
      },
    ],
  },
};

export default nextConfig;
