/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  // next.config.js
  async rewrites() {
    return [{ source: "/:path*", destination: "/pages/:path*" }];
  },
};

module.exports = nextConfig;
