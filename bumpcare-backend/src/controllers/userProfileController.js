const pool = require('../models/db');
const { userProfileSchema } = require('../validations/userValidation');

const getUserProfile = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      `SELECT u.name, u.email, p.age, p.weight, p.height, p.trimester, p.activity_level, p.medical_history
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({ status: 'fail', message: 'User tidak ditemukan' }).code(404);
    }

    const profile = result.rows[0];

    const isProfileEmpty =
      profile.age === null &&
      profile.weight === null &&
      profile.height === null &&
      profile.trimester === null &&
      profile.activity_level === null &&
      profile.medical_history === null;

    if (isProfileEmpty) {
      return h.response({
        status: 'success',
        data: null
      }).code(200);
    }

    return h.response({
      status: 'success',
      data: profile
    }).code(200);
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

  const { age, weight, height, trimester, activity_level, medical_history } = request.payload;

  try {
    const check = await pool.query('SELECT id FROM profiles WHERE user_id = $1', [userId]);

    if (check.rowCount === 0) {
      await pool.query(
        `INSERT INTO profiles (user_id, age, weight, height, trimester, activity_level, medical_history)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userId, age, weight, height, trimester, activity_level, medical_history]
      );
    } else {
      await pool.query(
        `UPDATE profiles SET age=$1, weight=$2, height=$3, trimester=$4, activity_level=$5, medical_history=$6, updated_at=NOW()
         WHERE user_id=$7`,
        [age, weight, height, trimester, activity_level, medical_history, userId]
      );
    }

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
