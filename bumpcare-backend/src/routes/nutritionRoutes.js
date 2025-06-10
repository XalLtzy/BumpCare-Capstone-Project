const {
  classifyNutritionHandler,
  getClassificationHistoryHandler,
  getLatestClassificationHandler,
} = require('../controllers/nutritionController');
const { verifyToken } = require('../middleware/authMiddleware');

module.exports = [
  {
    method: 'POST',
    path: '/api/nutrition/classify',
    handler: classifyNutritionHandler,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'GET',
    path: '/api/nutrition/history',
    handler: getClassificationHistoryHandler,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'GET',
    path: '/api/nutrition/latest',
    handler: getLatestClassificationHandler,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
];
