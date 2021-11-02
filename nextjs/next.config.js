/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
  },
  webpack(config, { dev, isServer, ...options }) {
    const fallback = config.resolve.fallback || (config.resolve.fallback = {});

    if (!isServer) {
      fallback['crypto'] = false;
      fallback['stream'] = false;
    }

    return config;
  },
};
