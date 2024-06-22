/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.icon-icons.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
