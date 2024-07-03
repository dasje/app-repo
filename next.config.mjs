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
      { protocol: "https", hostname: "nextui.org", port: "", pathname: "**" },
      { protocol: "https", hostname: "i.postimg.cc", port: "", pathname: "**" },
    ],
  },
};

export default nextConfig;
