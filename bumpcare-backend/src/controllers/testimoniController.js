const pool = require('../models/db');
const { testimoniSchema } = require('../validations/testimoniValidation');

const createTestimoniHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  const { message, rating } = request.payload;

  const { error } = testimoniSchema.validate(request.payload);
  if (error) {
    return h.response({
      status: 'fail',
      message: error.details[0].message,
    }).code(400);
  }

  try {
    const userResult = await pool.query(
      'SELECT name FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rowCount === 0) {
      return h.response({
        status: 'fail',
        message: 'User tidak ditemukan',
      }).code(404);
    }

    const name = userResult.rows[0].name;

    const result = await pool.query(
      `INSERT INTO testimoni (user_id, name, message, rating) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [userId, name, message, rating]
    );

    return h.response({
      status: 'success',
      message: 'Testimoni berhasil disimpan',
      data: result.rows[0],
    }).code(201);
  } catch (err) {
    console.error('Error saat menyimpan testimoni:', err.message);
    return h.response({
      status: 'error',
      message: 'Gagal menyimpan testimoni',
      detail: err.message,
    }).code(500);
  }
};

const getAllTestimoniHandler = async (request, h) => {
  try {
    const result = await pool.query(
      `SELECT * FROM testimoni 
       ORDER BY created_at DESC`
    );

    return h.response({
      status: 'success',
      data: result.rows,
    }).code(200);
  } catch (err) {
    console.error('Error saat mengambil semua testimoni:', err.message);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil data testimoni',
      detail: err.message,
    }).code(500);
  }
};

module.exports = {
  createTestimoniHandler,
  getAllTestimoniHandler,
};
