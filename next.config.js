/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com','examhero.com','oimg.m2mda.com','storage.googleapis.com', 'thirdwx.qlogo.cn'],
  },
}

module.exports = nextConfig
