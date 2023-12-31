const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeResolvers } = require('@graphql-tools/merge')

module.exports = mergeResolvers(loadFilesSync(path.join(__dirname, './**/*.resolver.js')))
