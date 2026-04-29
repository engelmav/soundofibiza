/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path((?!_next|api|favicon\\.ico|ballroom-logo\\.webp|THUMP210).*)*',
          has: [{ type: 'host', value: 'balloonpalace.soundofibiza.com' }],
          destination: '/balloon-palace/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
