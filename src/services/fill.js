const crypto = require('crypto');

const handleFill = async (request, reply, app) => {
  try {

    const client = app.redis;  // assuming your redis client is available on app as `redis`
    const totalKeys = 10000;  // you can modify this number as required

    for (let i = 0; i < totalKeys; i++) {
      const randomValue = crypto.randomBytes(20).toString('hex');  // random data for value
      await client.set(`r:model:${i}`, randomValue);
    }
    

    app.log.info({ msg: 'Fill success' })
    reply.send({ success: true });
  } catch (error) {
    console.error("Error in handleFill:", error);
    reply.send({ success: false });
  }
};

module.exports = { handleFill };
