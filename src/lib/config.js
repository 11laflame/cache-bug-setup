require('dotenv').config();
const path = require('path');
const { Redis } = require('ioredis');

const createRedisClient = () => {
  return new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
      connectTimeout: 3000,
      tls: process.env.REDIS_TLS === 'true' ? { rejectUnauthorized: false } : null,
      retryStrategy: (retries) => {
          return null; // No retry
      }
  });
};

const config = {
    env: process.env.NODE_ENV,
    log: {
      level: 'info',
      pretty: true
    },
    app: {
      port: process.env.PORT
    },
    autoload: [
      { path: path.join(__dirname, '../plugins') },
      { path: path.join(__dirname, '../routes') }
    ],
    cors: {
      exposedHeaders: 'Content-Disposition'
    },
    // mercurius options
    graphql: {
      dir: path.join(__dirname, '../graphql'),
      graphiql: true
    },
    redis: {
      client: createRedisClient()
    },
    // mercurius-cache options
    cache: {
      ttl: 86400,
      type: process.env.REDIS_URL ? 'redis' : 'memory',
      redis: {},
      logInterval: 60,
      gc: {
        chunk: 32,
        lazyChunk: 64,
        lazyInterval: 60e3,
        strictInterval: 5 * 60e3
      }
    }
  }

module.exports = {
  createRedisClient,
  config
}
