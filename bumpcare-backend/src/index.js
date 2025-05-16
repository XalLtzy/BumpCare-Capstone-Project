const Hapi = require('@hapi/hapi');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const pregnancyRoutes = require('./routes/pregnancyRoutes');
const userRoutes = require('./routes/userRoutes');

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

  server.route([...authRoutes, ...pregnancyRoutes, ...userRoutes]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();