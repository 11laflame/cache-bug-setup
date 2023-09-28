const handleInvalidate = async (request, reply, app) => {
  try {
    
    const chunk = [
        'model:49',
        'model:789',
        'model:55'
    ];

    await app.graphql.cache.invalidate(chunk);

    app.log.info({ msg: 'Invalidation success' })
    reply.send({ success: true });
  } catch (error) {
    console.error("Error in handleInvalidate:", error);
    reply.send({ success: false });
  }
};

module.exports = { handleInvalidate };
