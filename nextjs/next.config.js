/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  webpack(config, { isServer }) {
    const fallback = config.resolve.fallback || (config.resolve.fallback = {});
    if (!isServer) fallback['crypto'] = fallback['stream'] = false;
    return config;
  },
};
