/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'balloonpalace.soundofibiza.com' }],
          destination: '/balloon-palace',
        },
      ],
    };
  },
};

module.exports = nextConfig;
