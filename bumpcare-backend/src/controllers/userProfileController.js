const pool = require('../models/db');
const { userProfileSchema } = require('../validations/userValidation');

const getUserProfile = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      `SELECT u.name, u.email, p.age, p.weight, p.pre_pregnancy_weight, p.height, p.trimester, p.activity_level
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
      profile.pre_pregnancy_weight === null &&
      profile.height === null &&
      profile.trimester === null &&
      profile.activity_level === null;

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

  const { age, weight, pre_pregnancy_weight, height, trimester, activity_level } = request.payload;

  try {
    const check = await pool.query('SELECT id FROM profiles WHERE user_id = $1', [userId]);

    if (check.rowCount === 0) {
      await pool.query(
        `INSERT INTO profiles (user_id, age, weight, pre_pregnancy_weight, height, trimester, activity_level)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userId, age, weight, pre_pregnancy_weight, height, trimester, activity_level]
      );
    } else {
      await pool.query(
        `UPDATE profiles 
         SET age=$1, weight=$2, pre_pregnancy_weight=$3, height=$4, trimester=$5, activity_level=$6, updated_at=NOW()
         WHERE user_id=$7`,
        [age, weight, pre_pregnancy_weight, height, trimester, activity_level, userId]
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
