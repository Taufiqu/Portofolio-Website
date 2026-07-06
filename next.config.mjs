/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Menghindari error build jika linting konfigurasi lama terlalu ketat
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
