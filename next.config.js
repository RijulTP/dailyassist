/** @type {import('next').NextConfig} */
//const nextConfig = {}

module.exports = {
    // Other Next.js configurations...
    async headers() {
      return [
        {
          // Serve all font files with appropriate headers
          source: '/fonts/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
      ];
    },
  };
//module.exports = nextConfig
