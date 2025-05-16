const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');
const { verifyToken } = require('../middleware/authMiddleware');

module.exports = [
  {
    method: 'GET',
    path: '/api/profile',
    handler: getUserProfile,
    options: { pre: [{ method: verifyToken }] }
  },
  {
    method: 'PUT',
    path: '/api/profile',
    handler: updateUserProfile,
    options: { pre: [{ method: verifyToken }] }
  }
];
