/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'kirkekollekt.s3.eu-central-1.amazonaws.com'
      ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "**",
        },
      ],
    },
    experimental: {
      serverComponentsExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner']
    }
};

export default nextConfig;
