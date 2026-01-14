/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended
  compiler: {
    reactRemoveProperties: true, // optional: strips __DEV__ props in production
  },
};

module.exports = nextConfig;
