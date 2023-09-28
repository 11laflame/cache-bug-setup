require('dotenv').config()

const fp = require('fastify-plugin')

const schema = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');

module.exports = fp(async (fastify, options) => {
  fastify.register(require('mercurius'), {
    ...options.graphql,
    schema,
    resolvers,
    jit: 1,
    graphiql: process.env.NODE_ENV !== 'production',
    queryDepth: 8,
    context: async (req) => {
      return {
        log: fastify.log
      }
    },
    errorHandler: (error, request, reply) => {
      fastify.log.error({ msg: "Mercurius handler error", error});
    }
  })
}, { name: 'mercurius' })
