/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allows only HTTPS URLs
        hostname: "**", // Matches all hostnames
      },
    ],
  },
};

export default nextConfig;
