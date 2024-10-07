/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
