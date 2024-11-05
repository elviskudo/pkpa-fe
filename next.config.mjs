/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["pkpa.s3.ap-southeast-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pkpa.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
  headers: async () => [
    {
      source: '/models/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Tambahkan aturan untuk meng-handle file .svg
      use: ['@svgr/webpack'], // Gunakan svgr untuk mengimpor SVG sebagai komponen React
    });
    return config; 
  },
};

export default nextConfig;
