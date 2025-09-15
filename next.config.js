/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'cdn.sanity.io'  // Add Sanity's CDN
    ],
  },
  // Add this to handle large chunks
  webpack: (config, { isServer }) => {
    // Increase the max size for chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244 * 1024, // 244KB
      minSize: 20 * 1024,  // 20KB
    };
    return config;
  },
};

module.exports = nextConfig;