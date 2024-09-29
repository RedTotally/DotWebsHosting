import withPlugins from 'next-compose-plugins';

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        os: false,
        path: false,
        crypto: false,
      };
    }

    config.module.rules.push({
      test: /node:/,
      loader: 'node-loader',
    });

    return config;
  },
};

export default nextConfig;
