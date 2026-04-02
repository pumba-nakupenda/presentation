/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // export statique pour Vercel / GitHub Pages
  trailingSlash: true,
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // react-pdf uses canvas — exclude from server bundle
      config.externals = [...(config.externals || []), 'canvas']
    }
    return config
  },
}
export default nextConfig
