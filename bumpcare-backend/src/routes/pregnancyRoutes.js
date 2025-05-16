const { 
  calculateHandler,   
  getRecordsHandler,
  deleteRecordHandler,
  updateRecordHandler,
  getLatestResultHandler
} = require('../controllers/pregnancyController');
const { verifyToken } = require('../middleware/authMiddleware');

const pregnancyRoutes = [
  {
    method: 'POST',
    path: '/api/calculate',   
    handler: calculateHandler, 
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'GET',
    path: '/api/records',
    handler: getRecordsHandler,
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'DELETE',
    path: '/api/records/{id}',
    handler: deleteRecordHandler,
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'PUT',
    path: '/api/records/{id}',
    handler: updateRecordHandler,
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'GET',
    path: '/api/latest-result',
    handler: getLatestResultHandler,
    options: { pre: [{ method: verifyToken }] }
  }
];

module.exports = pregnancyRoutes;
