/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'codex.aulasoftwarelibre.uco.es'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      ...process.env.NODE_ENV === 'test' ?
      [{
        protocol: 'http',
        hostname: 'localhost',
      }] : [],
    ],
  },
  output: 'standalone'
}

module.exports = nextConfig
