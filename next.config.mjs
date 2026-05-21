/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/PRIME',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas']
    }
    return config
  },
  // Rewrites au niveau Next.js : valent à la fois en `next dev` (local)
  // et en prod Vercel. Permet d'ouvrir /academy sans préfixe basePath.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/academy', destination: '/PRIME/academy' },
        { source: '/academy/:path*', destination: '/PRIME/academy/:path*' },
      ],
    }
  },
}
export default nextConfig
