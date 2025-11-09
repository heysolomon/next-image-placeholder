// Example Next.js configuration for next-image-placeholder
// This ensures Sharp works correctly with both Webpack and Turbopack

/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Next.js 15+ (stable API)
  // Prevent bundling of native dependencies like Sharp
  serverExternalPackages: ['sharp', 'fast-average-color-node'],

  // For Next.js 14 and below, use the experimental flag:
  // experimental: {
  //   serverComponentsExternalPackages: ['sharp', 'fast-average-color-node'],
  // },
};

export default nextConfig;
