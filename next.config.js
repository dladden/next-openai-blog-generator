/** @type {import('next').NextConfig} */
/*file is a configuration file used in Next.js applications to customize 
various aspects of the build and development process. It allows you to modify 
the default behavior of Next.js by providing configuration options and settings */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com"],
  },
};

module.exports = nextConfig;
