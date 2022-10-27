exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    schema.buildObjectType({
      name: 'GeoJsonFeaturesGeometry',
      fields: {
        type: 'String',
        coordinates: {
          type: '[[[[Float]]]]',
          resolve: source => typeof source.coordinates[0][0][0] === 'number' ? [source.coordinates] : source.coordinates
        },
      },
    }),
  ]
  createTypes(typeDefs)
}
