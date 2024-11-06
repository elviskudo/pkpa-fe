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

};

export default nextConfig;
