const { pregnancyInputSchema } = require('../validations/pregnancyValidation');
const pool = require('../models/db');

const classifyBMI = (bmi) => {
  if (bmi < 18.5) return 'Kurus';
  if (bmi >= 18.5 && bmi < 25) return 'Normal';
  if (bmi >= 25 && bmi < 30) return 'Gemuk';
  return 'Obesitas';
};

const calculateHandler = async (request, h) => {
  const { error } = pregnancyInputSchema.validate(request.payload);
  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  const { age, weight, height, trimester } = request.payload;
  const userId = request.auth.credentials.id;

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2);
  const bmiStatus = classifyBMI(bmi);

  const trimesterInt = parseInt(trimester);
  let calorieNeed = 2200;
  if (trimesterInt === 2) calorieNeed += 300;
  if (trimesterInt === 3) calorieNeed += 450;

  let proteinNeed = weight * 0.88;
  if (trimesterInt === 2) proteinNeed += 6;
  if (trimesterInt === 3) proteinNeed += 10;
  proteinNeed = +proteinNeed.toFixed(2);

  const fatNeed = +((calorieNeed * 0.25) / 9).toFixed(2);

  try {
    await pool.query(
      `INSERT INTO pregnancy_records 
        (user_id, age, weight, height, trimester, bmi, bmi_status, calorie_needs, protein_needs, fat_needs)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [userId, age, weight, height, trimester, bmi, bmiStatus, calorieNeed, proteinNeed, fatNeed]
    );

    return h.response({
      status: 'success',
      data: { bmi, bmiStatus, calorieNeed, proteinNeed, fatNeed }
    }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal menyimpan data' }).code(500);
  }
};

const getRecordsHandler = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      'SELECT id, age, weight, height, trimester, bmi, bmi_status, calorie_needs, protein_needs, fat_needs, created_at FROM pregnancy_records WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return h.response({
      status: 'success',
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal mengambil data' }).code(500);
  }
};

const deleteRecordHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
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

  const userId = request.auth.credentials.id;
  const { id } = request.params;
  const { age, weight, height, trimester } = request.payload;

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(2);
  const bmiStatus = classifyBMI(bmi);

  const trimesterInt = parseInt(trimester);
  let calorieNeed = 2200;
  if (trimesterInt === 2) calorieNeed += 300;
  if (trimesterInt === 3) calorieNeed += 450;

  let proteinNeed = weight * 0.88;
  if (trimesterInt === 2) proteinNeed += 6;
  if (trimesterInt === 3) proteinNeed += 10;
  proteinNeed = +proteinNeed.toFixed(2);

  const fatNeed = +((calorieNeed * 0.25) / 9).toFixed(2);

  try {
    const result = await pool.query(
      `UPDATE pregnancy_records 
       SET age = $1, weight = $2, height = $3, trimester = $4, bmi = $5, bmi_status = $6, calorie_needs = $7, protein_needs = $8, fat_needs = $9
       WHERE id = $10 AND user_id = $11 RETURNING *`,
      [age, weight, height, trimester, bmi, bmiStatus, calorieNeed, proteinNeed, fatNeed, id, userId]
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

const getLatestResultHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  try {
    const result = await pool.query(
      `SELECT bmi, bmi_status, calorie_needs, protein_needs, fat_needs, created_at 
       FROM pregnancy_records 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({ status: 'success', data: null }).code(200);
    }

    const row = result.rows[0];

    return h.response({
      status: 'success',
      data: {
        bmi: row.bmi,
        bmiStatus: row.bmi_status,
        calorieNeed: row.calorie_needs,
        proteinNeed: row.protein_needs,
        fatNeed: row.fat_needs,
        createdAt: row.created_at
      }
    }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal mengambil data' }).code(500);
  }
};

module.exports = {
  calculateHandler,
  getRecordsHandler,
  deleteRecordHandler,
  updateRecordHandler,
  getLatestResultHandler,
};
