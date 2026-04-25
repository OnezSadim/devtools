/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/devtools',
  trailingSlash: true,
  images: { unoptimized: true },
}
module.exports = nextConfig
