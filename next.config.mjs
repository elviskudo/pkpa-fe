/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["pkpa.s3.ap-southeast-1.amazonaws.com"],
  },
};

export default nextConfig;
