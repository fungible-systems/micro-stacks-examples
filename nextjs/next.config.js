const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    const fallback = config.resolve.fallback || (config.resolve.fallback = {});
    const alias = config.resolve.alias || (config.resolve.alias = {});

    // to make sure everything is using the same version of jotai and atoms in pkgs
    alias['jotai'] = path.resolve(__dirname, 'node_modules', 'jotai');
    alias['jotai-query-toolkit'] = path.resolve(__dirname, 'node_modules', 'jotai-query-toolkit');
    alias['@micro-stacks/nextjs'] = path.resolve(__dirname, 'node_modules', '@micro-stacks/nextjs');
    alias['@micro-stacks/query'] = path.resolve(__dirname, 'node_modules', '@micro-stacks/query');
    alias['@micro-stacks/react'] = path.resolve(__dirname, 'node_modules', '@micro-stacks/react');

    if (!isServer) fallback['crypto'] = fallback['stream'] = false;
    return config;
  },
};
