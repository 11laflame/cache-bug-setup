require('dotenv').config()

const fp = require('fastify-plugin')

module.exports = fp(async (app, options) => {

  const Query = {

  }

  app.register(require('mercurius-cache'), {
    ttl: options.cache.ttl,
    storage: { type: process.env.REDIS_URL ? 'redis' : 'memory', options: { client: app.redis, invalidation: true } },
    policy: {
      Query
    },
    onDedupe: function (type, fieldName) {
      app.log.info({ msg: 'Deduping', type, fieldName })
    },
    onHit: function (type, fieldName) {
      app.log.info({ msg: 'Hit from cache', type, fieldName })
    },
    onMiss: function (type, fieldName) {
      app.log.info({ msg: 'Miss from cache', type, fieldName })
    },
    onSkip: function (type, fieldName) {
      app.log.info({ msg: 'Skip cache', type, fieldName })
    },

    // caching stats
    logInterval: options.cache.logInterval,
    logReport: (report) => {
      app.log.info({ msg: 'cache stats' })
      console.table(report)
    }
  })

}, {
  name: 'mercurius-cache',
  dependencies: ['mercurius', 'redis']
})