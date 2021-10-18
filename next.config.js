module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    { source: '/lasers', destination: '/pages/api/static/lasers/index.js' },
  ],
};
