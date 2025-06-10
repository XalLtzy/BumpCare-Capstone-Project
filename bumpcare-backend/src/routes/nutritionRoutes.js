const { classifyNutritionHandler } = require('../controllers/nutritionController');
const { verifyToken } = require('../middleware/authMiddleware');

const nutritionRoutes = [
  {
    method: 'POST',
    path: '/api/classify-nutrition',
    handler: classifyNutritionHandler,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
];

module.exports = nutritionRoutes;
