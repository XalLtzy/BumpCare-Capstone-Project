const axios = require('axios');
const pool = require('../models/db');
const { nutritionInputSchema } = require('../validations/nutritionValidation');

const classifyNutritionHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  const { lila, hemoglobin, systolic, diastolic } = request.payload;

  const { error } = nutritionInputSchema.validate({ lila, hemoglobin, systolic, diastolic });
  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  try {
    const result = await pool.query(
      `SELECT id, age, pre_pregnancy_weight, weight, height, bmi 
       FROM pregnancy_records 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({ status: 'fail', message: 'Data kehamilan belum tersedia' }).code(404);
    }

    const { id, age, pre_pregnancy_weight, weight, height, bmi } = result.rows[0];

    const features = [
      age,
      pre_pregnancy_weight,
      weight,
      height,
      bmi,
      lila,
      hemoglobin,
      systolic,
      diastolic,
    ];

    const response = await axios.post('http://localhost:5000/predict', { features });

    const nutritionStatus = response.data.prediction;

    await pool.query(
      `UPDATE pregnancy_records
       SET lila = $1, hemoglobin = $2, systolic = $3, diastolic = $4, nutrition_status = $5
       WHERE id = $6`,
      [lila, hemoglobin, systolic, diastolic, nutritionStatus, id]
    );

    return h.response({
      status: 'success',
      message: 'Klasifikasi gizi berhasil disimpan',
      data: {
        age,
        prePregnancyWeight: pre_pregnancy_weight,
        weight,
        height,
        bmi,
        lila,
        hemoglobin,
        systolic,
        diastolic,
        nutritionStatus,
      },
    }).code(200);

  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Gagal mengklasifikasi gizi', detail: err.message }).code(500);
  }
};

module.exports = { classifyNutritionHandler };
