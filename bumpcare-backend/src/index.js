const Hapi = require('@hapi/hapi');
const pregnancyRoutes = require('./routes/pregnancyRoutes');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: { 
        origin: ['*'],
        credentials: true 
      },
    },
  });

  server.route([...authRoutes, ...pregnancyRoutes]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();