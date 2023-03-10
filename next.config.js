/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: "public"
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.anarres.fm',
      },
      {
        protocol: 'https',
        hostname: 'coverartarchive.org',
      },
      {
        protocol: 'https',
        hostname: 'demo.azuracast.com',
      },
    ],
  },
}

module.exports = withPWA(nextConfig);
