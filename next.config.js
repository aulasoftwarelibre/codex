/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'codex.aulasoftwarelibre.uco.es'],
    },
  },
  output: 'standalone',
}

module.exports = nextConfig
