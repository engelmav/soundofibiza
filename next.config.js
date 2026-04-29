/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'balloonpalace.soundofibiza.com' }],
          destination: '/balloon-palace/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
