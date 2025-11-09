// Example Next.js configuration for next-image-placeholder
// This ensures Sharp works correctly with both Webpack and Turbopack

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Sharp is treated as an external dependency
  experimental: {
    // For Turbopack (Next.js 15+)
    serverComponentsExternalPackages: ['sharp', 'fast-average-color-node'],
  },

  // For Webpack (Next.js 14 and below)
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark Sharp as external for server-side rendering
      config.externals = config.externals || [];
      config.externals.push('sharp', 'fast-average-color-node');
    }
    return config;
  },
};

export default nextConfig;
