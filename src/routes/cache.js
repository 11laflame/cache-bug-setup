const { handleFill } = require('../services/fill');
const { handleInvalidate } = require('../services/invalidate');

module.exports = function (fastify, opts, done) {
  
  fastify.post('/cache-fill', (request, reply) => handleFill(request, reply, fastify));

  fastify.post('/cache-invalidate', (request, reply) => handleInvalidate(request, reply, fastify));

  done()
}