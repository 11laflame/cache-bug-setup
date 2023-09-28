const path = require('path')
const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')

const schema = loadSchemaSync(path.join(__dirname, './**/*.gql'), {
  loaders: [new GraphQLFileLoader()]
})

module.exports = schema
