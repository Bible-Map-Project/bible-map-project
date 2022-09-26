module.exports = {
  siteMetadata: {
    title: `Bible Map Project`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-transformer-geojson',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data`,
      }
    },
    {
      resolve: 'gatsby-transformer-csv',
      options: {
        delimiter: 'auto',
      },
    },
  ],
}
