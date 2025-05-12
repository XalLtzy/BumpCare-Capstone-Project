const { pregnancyInputSchema } = require('../validations/pregnancyValidation');
const pool = require('../models/db');

const predictHandler = async (request, h) => {
  const { error } = pregnancyInputSchema.validate(request.payload);
  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  const { age, weight, height, trimester } = request.payload;
  const userId = request.auth.user.id;

  // Hitung BMI
  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2);

  // Dummy kalori sesuai trimester (bisa diganti ML nanti)
  let calorieNeed = 2200;
  if (trimester === 2) calorieNeed += 300;
  if (trimester === 3) calorieNeed += 450;

  // Dummy status gizi (bisa diganti hasil ML)
  let statusGizi = 'Normal';
  if (bmi < 18.5) statusGizi = 'Kurus';
  else if (bmi >= 25) statusGizi = 'Berlebih';

  // Simpan ke database
  try {
    await pool.query(
      `INSERT INTO pregnancy_records 
        (user_id, age, weight, height, trimester, bmi, calorie_needs, status_gizi)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, age, weight, height, trimester, bmi, calorieNeed, statusGizi]
    );

    return h.response({
      status: 'success',
      data: {
        bmi,
        calorieNeed,
        statusGizi
      }
    }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal menyimpan data' }).code(500);
  }
};

const getRecordsHandler = async (request, h) => {
  const userId = request.auth.user.id;

  try {
    const result = await pool.query(
      'SELECT id, age, weight, height, trimester, bmi, calorie_needs, status_gizi, created_at FROM pregnancy_records WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return h.response({
      status: 'success',
      data: result.rows
    }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal mengambil data' }).code(500);
  }
};

const deleteRecordHandler = async (request, h) => {
  const userId = request.auth.user.id;
  const { id } = request.params;

  try {
    const result = await pool.query(
      'DELETE FROM pregnancy_records WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rowCount === 0) {
      return h.response({ status: 'fail', message: 'Data tidak ditemukan atau bukan milik Anda' }).code(404);
    }

    return h.response({ status: 'success', message: 'Data berhasil dihapus' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal menghapus data' }).code(500);
  }
};

const updateRecordHandler = async (request, h) => {
  const { error } = pregnancyInputSchema.validate(request.payload);
  if (error) return h.response({ status: 'fail', message: error.message }).code(400);

  const userId = request.auth.user.id;
  const { id } = request.params;
  const { age, weight, height, trimester } = request.payload;

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2);
  let calorieNeed = 2200;
  if (trimester === 2) calorieNeed += 300;
  if (trimester === 3) calorieNeed += 450;

  let statusGizi = 'Normal';
  if (bmi < 18.5) statusGizi = 'Kurus';
  else if (bmi >= 25) statusGizi = 'Berlebih';

  try {
    const result = await pool.query(
      `UPDATE pregnancy_records 
       SET age = $1, weight = $2, height = $3, trimester = $4, bmi = $5, calorie_needs = $6, status_gizi = $7 
       WHERE id = $8 AND user_id = $9 RETURNING *`,
      [age, weight, height, trimester, bmi, calorieNeed, statusGizi, id, userId]
    );

    if (result.rowCount === 0) {
      return h.response({ status: 'fail', message: 'Data tidak ditemukan atau bukan milik Anda' }).code(404);
    }

    return h.response({
      status: 'success',
      message: 'Data berhasil diperbarui',
      data: result.rows[0]
    }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal memperbarui data' }).code(500);
  }
};

module.exports = {
  predictHandler,
  getRecordsHandler,
  deleteRecordHandler,
  updateRecordHandler
};

