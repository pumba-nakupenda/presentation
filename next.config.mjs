/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/PRIME',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas']
    }
    return config
  },
}
export default nextConfig
