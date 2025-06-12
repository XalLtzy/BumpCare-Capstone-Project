const {
  createTestimoniHandler,
  getAllTestimoniHandler
} = require('../controllers/testimoniController');

const { verifyToken } = require('../middleware/authMiddleware');

const testimoniRoutes = [
  {
    method: 'POST',
    path: '/api/testimoni',
    handler: createTestimoniHandler,
    options: {
      pre: [{ method: verifyToken }]
    }
  },
  {
    method: 'GET',
    path: '/api/testimoni',
    handler: getAllTestimoniHandler,
    options: {
      auth: false
    }
  }
];

module.exports = testimoniRoutes;
