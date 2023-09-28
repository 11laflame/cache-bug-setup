const fp = require('fastify-plugin')

module.exports = fp(async (fastify, options) => {
  fastify.register(require('@fastify/cors'), options.cors)
}, { name: 'cors' })
