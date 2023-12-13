/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "placehold.co",
      "gempita.gnusa.id",
      "yt3.googleusercontent.com",
      "i.ytimg.com",
      "www.pexels.com",
      "images.pexels.com",
    ],
  },
};

module.exports = nextConfig;
