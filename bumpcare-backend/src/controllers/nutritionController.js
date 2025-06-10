const axios = require('axios');
const pool = require('../models/db');
const { nutritionInputSchema } = require('../validations/nutritionValidation');

const classifyNutritionHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  const { lila, hemoglobin, systolic, diastolic } = request.payload;
// Validasi input
  const { error } = nutritionInputSchema.validate(request.payload);
  if (error) {
    return h.response({
      status: 'fail',
      message: error.details[0].message
    }).code(400);
  }

  try {
    // Ambil data kehamilan terbaru
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

    // Kirim ke model ML
    let nutritionStatus;
    try {
      const response = await axios.post('http://localhost:5000/predict', { features });

      if (!response.data || !response.data.prediction) {
        return h.response({
          status: 'error',
          message: 'Model tidak mengembalikan hasil prediksi yang valid',
        }).code(500);
      }

      nutritionStatus = response.data.prediction;
    } catch (err) {
      console.error('ML Server Error:', err.message);
      return h.response({
        status: 'error',
        message: 'Gagal menghubungi model klasifikasi gizi',
        detail: err.message,
      }).code(500);
    }

    // Simpan hasil klasifikasi ke record kehamilan
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
        recordId: id,
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
    console.error('Database Error:', err.message);
    return h.response({
      status: 'error',
      message: 'Gagal memproses klasifikasi gizi',
      detail: err.message,
    }).code(500);
  }
};

module.exports = { classifyNutritionHandler };
