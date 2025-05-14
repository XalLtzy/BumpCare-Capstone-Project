const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401).takeover();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.auth = { credentials: decoded };
    return h.continue;
  } catch (err) {
    return h.response({ status: 'fail', message: 'Token tidak valid' }).code(403).takeover();
  }
};

module.exports = { verifyToken };
