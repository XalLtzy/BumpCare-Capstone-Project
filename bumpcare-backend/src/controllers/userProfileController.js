const pool = require('../models/db');
const { userProfileSchema } = require('../validations/userValidation');

const getUserProfile = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      'SELECT name, email, age, weight, height, trimester FROM users WHERE id = $1',
      [userId]
    );

    return h.response({
      status: 'success',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Gagal mengambil profil:', err);
    return h
      .response({ status: 'error', message: 'Gagal mengambil profil' })
      .code(500);
  }
};

const updateUserProfile = async (request, h) => {
  const userId = request.auth.credentials.id;

  const { error } = userProfileSchema.validate(request.payload);
  if (error) {
    return h
      .response({ status: 'fail', message: error.message })
      .code(400);
  }

  const { age, weight, height, trimester } = request.payload;

  try {
    await pool.query(
      'UPDATE users SET age = $1, weight = $2, height = $3, trimester = $4 WHERE id = $5',
      [age, weight, height, trimester, userId]
    );

    return h
      .response({ status: 'success', message: 'Profil berhasil diperbarui' })
      .code(200);
  } catch (err) {
    console.error('Gagal memperbarui profil:', err);
    return h
      .response({ status: 'error', message: 'Gagal memperbarui profil' })
      .code(500);
  }
};

module.exports = { getUserProfile, updateUserProfile };
