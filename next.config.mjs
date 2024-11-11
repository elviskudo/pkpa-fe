/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
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
