const { register, login } = require('../controllers/authController');

const authRoutes = [
  {
    method: 'POST',
    path: '/api/register',
    handler: register
  },
  {
    method: 'POST',
    path: '/api/login',
    handler: login
  }
];

module.exports = authRoutes;
