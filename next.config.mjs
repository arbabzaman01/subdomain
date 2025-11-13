/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Uncomment if you need to ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  */
  images: {
    unoptimized: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
}

export default nextConfig
