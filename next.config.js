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
        '/about': { page: '/about' },
        '/contact': { page: '/contact' },
        '/equipe': { page: '/equipe' },
        '/CGV': { page: '/CGV' },
        '/mentionsLegales': { page: '/mentionsLegales' },
        '/remerciement': { page: '/remerciement' },
        '/blogs': { page: '/blogs' },
        '/blogs/AideMoiAFaireSeul': { page: '/blogs/AideMoiAFaireSeul' },
        '/blogs/ConcilierTravailEtEducation': { page: '/blogs/ConcilierTravailEtEducation' },
        '/blogs/EducationPositive': { page: '/blogs/EducationPositive' },
        '/blogs/LeJeuEnExterieur': { page: '/blogs/LeJeuEnExterieur' },
        '/blogs/LesEnfantsEtLesEcrans': { page: '/blogs/LesEnfantsEtLesEcrans' },
        '/blogs/MathematiquesEtJeunesEnfants': { page: '/blogs/MathematiquesEtJeunesEnfants' },
        '/blogs/PourquoiChoisirDesJouetsEnBois': { page: '/blogs/PourquoiChoisirDesJouetsEnBois' },
        '/blogs/PourquoiLesEnfantsJouent': { page: '/blogs/PourquoiLesEnfantsJouent' },
      }
    },
    trailingSlash: true,
  images: {
    domains: ['https://play.maxandlea.com'],
  },
  env: {
    PAYPAL_CLIENT_ID: 'AfiMbg3knsQVR1llxcjFizkj0V-9sNkWH6Hy_P9xrpftezR8yQOy_H3iHrJbXUx7sRhi4pqubOYIa2MB',
  },
  }
