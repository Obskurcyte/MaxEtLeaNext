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
        '/about': { page: '/about' },
        '/contact': { page: '/contact' },
        '/equipe': { page: '/equipe' },
        '/CGV': { page: '/CGV' },
        '/mentionsLegales': { page: '/mentionsLegales' },
        '/remerciement': { page: '/remerciement' },
      }
    },
    trailingSlash: true,
  images: {
    domains: ['https://play.maxandlea.com'],
  },
  }
