module.exports = {
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' },
        '/playboard': { page: '/playboard' },
        '/tour': { page: '/tour' },
        '/xylophone': { page: '/xylophone' },
        '/checkout': { page: '/checkout' },
      }
    },
    trailingSlash: true,
  }