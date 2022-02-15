module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    { source: '/static/lasers/index.html', destination: '/pages/api/static/lasers/index.js' },
  ],
  images: {
    domains: ['github-readme-stats.vercel.app'],
  },
}
