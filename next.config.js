/** @type {import('next').NextConfig} */
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
    ],
  },
}

module.exports = nextConfig
