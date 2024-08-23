/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.vox-cdn.com",
      "techcrunch.com",
      "s.yimg.com",
      "edgecast-img.yahoo.net",
      "media.zenfs.com",
    ],
  },
};

module.exports = nextConfig;
