/** @type {import('next').NextConfig} */
//const nextConfig = {}

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
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
})

// module.exports = {
//     // Other Next.js configurations...
//     async headers() {
//       return [
//         {
//           // Serve all font files with appropriate headers
//           source: '/fonts/(.*)',
//           headers: [
//             {
//               key: 'Access-Control-Allow-Origin',
//               value: '*',
//             },
//           ],
//         },
//       ];
//     },
//   };
//module.exports = nextConfig
