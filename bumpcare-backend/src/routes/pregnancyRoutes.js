const {
  predictHandler,
  getRecordsHandler,
  deleteRecordHandler,
  updateRecordHandler
} = require('../controllers/pregnancyController');
const { verifyToken } = require('../middleware/authMiddleware');

const pregnancyRoutes = [
  {
    method: 'POST',
    path: '/api/predict',
    handler: predictHandler,
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
  }
];

module.exports = pregnancyRoutes;
