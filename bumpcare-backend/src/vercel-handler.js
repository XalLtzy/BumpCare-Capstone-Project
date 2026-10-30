const createServer = require('./app');

let serverPromise;

const getServer = async () => {
  if (!serverPromise) {
    serverPromise = (async () => {
      const server = await createServer();
      await server.initialize();
      return server;
    })();
  }

  return serverPromise;
};

module.exports = async (req, res) => {
  try {
    const server = await getServer();

    const response = await server.inject({
      method: req.method,
      url: req.url,
      headers: req.headers,
      payload: req.body,
    });

    for (const [name, value] of Object.entries(response.headers)) {
      const headerName = name.toLowerCase();

      if (
        !['transfer-encoding', 'connection', 'keep-alive'].includes(headerName)
      ) {
        res.setHeader(name, value);
      }
    }

    res.statusCode = response.statusCode;

    if (req.method === 'HEAD') {
      return res.end();
    }

    return res.end(response.payload);
  } catch (error) {
    console.error('Vercel handler error:', error);

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};