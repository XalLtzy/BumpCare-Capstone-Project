const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');
const { registerSchema, loginSchema } = require('../validations/authValidation');

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (request, h) => {
  const { error } = registerSchema.validate(request.payload);
  if (error) return h.response({ status: 'fail', message: error.message }).code(400);

  const { name, email, password } = request.payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rowCount > 0) {
      return h.response({ status: 'fail', message: 'Email sudah terdaftar' }).code(409);
    }

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    return h.response({
      status: 'success',
      message: 'Registrasi berhasil',
      userId: result.rows[0].id
    }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Terjadi kesalahan server' }).code(500);
  }
};

const login = async (request, h) => {
  const { error } = loginSchema.validate(request.payload);
  if (error) return h.response({ status: 'fail', message: error.message }).code(400);

  const { email, password } = request.payload;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return h.response({ status: 'fail', message: 'Email tidak ditemukan' }).code(401);
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return h.response({ status: 'fail', message: 'Password salah' }).code(401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    return h.response({
      status: 'success',
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Terjadi kesalahan server' }).code(500);
  }
};

module.exports = { register, login };
