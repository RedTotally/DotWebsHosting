import withPlugins from 'next-compose-plugins';
const nextConfig = {
  webpack: (config) => {
    // Add a custom plugin to handle `node:` imports
    config.resolve.alias['node:fs'] = 'fs';
    config.resolve.alias['node:os'] = 'os';
    config.resolve.alias['node:path'] = 'path';
    return config;
  },
};

module.exports = nextConfig;
