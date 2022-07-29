/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreBuildErrors: true,
  images: {
    domains: ['firebasestorage.googleapis.com','examhero.com','oimg.m2mda.com','storage.googleapis.com', 'thirdwx.qlogo.cn'],
  },
  // exclude: ['**/node_modules', '**/pages/services/**', '**/pages/api/**', '**/pages/components/**']
}

module.exports = nextConfig
