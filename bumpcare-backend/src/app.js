const Hapi = require('@hapi/hapi');

const authRoutes = require('./routes/authRoutes');
const pregnancyRoutes = require('./routes/pregnancyRoutes');
const userRoutes = require('./routes/userRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const riskRoutes = require('./routes/riskRoutes');
const testimoniRoutes = require('./routes/testimoniRoutes');

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: [
        'https://bumpcare.vercel.app',
        'https://bumpcare-frontend.vercel.app',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        ],
        credentials: false,
      },
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: () => ({
        status: 'success',
        message: 'Welcome to BumpCare Backend!',
      }),
    },
    {
      method: 'GET',
      path: '/api',
      handler: () => ({
        status: 'success',
        message: 'BumpCare API is running!',
      }),
    },
    ...authRoutes,
    ...pregnancyRoutes,
    ...userRoutes,
    ...nutritionRoutes,
    ...riskRoutes,
    ...testimoniRoutes,
  ]);

  return server;
};

module.exports = createServer;