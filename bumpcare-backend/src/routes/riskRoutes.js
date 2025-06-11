const { 
  classifyRiskHandler,
  getRiskHistoryHandler,
  getLatestRiskHandler
} = require('../controllers/riskController');

const { verifyToken } = require('../middleware/authMiddleware');

const riskRoutes = [
  {
    method: 'POST',
    path: '/api/risk-classification',
    handler: classifyRiskHandler,
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'GET',
    path: '/api/risk-history',
    handler: getRiskHistoryHandler,
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'GET',
    path: '/api/risk-latest',
    handler: getLatestRiskHandler,
    options: { pre: [{ method: verifyToken }] }
  }
];

module.exports = riskRoutes;
