/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      "placehold.co",
      "gempita.gnusa.id",
      "yt3.googleusercontent.com",
      "i.ytimg.com",
    ],
  },
};

module.exports = nextConfig;
