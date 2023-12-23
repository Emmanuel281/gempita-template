/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "placehold.co",
      "gempita.gnusa.id",
      "adm.gempitamilenial.org",
      "yt3.googleusercontent.com",
      "i.ytimg.com",
      "www.pexels.com",
      "images.pexels.com",
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false,
    };
    
    return config;
  },
};

module.exports = nextConfig;
