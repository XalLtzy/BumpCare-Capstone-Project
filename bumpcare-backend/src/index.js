const Hapi = require('@hapi/hapi');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const pregnancyRoutes = require('./routes/pregnancyRoutes');
const userRoutes = require('./routes/userRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const riskRoutes = require('./routes/riskRoutes');
const testimoniRoutes = require('./routes/testimoniRoutes');

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

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        status: 'success',
        message: 'Welcome to BumpCare Backend!',
      };
    },
  });

  server.route([
    ...authRoutes,
    ...pregnancyRoutes,
    ...userRoutes,
    ...nutritionRoutes,
    ...riskRoutes,
    ...testimoniRoutes,
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
