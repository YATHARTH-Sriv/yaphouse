import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qdsebdoep25obid7.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
