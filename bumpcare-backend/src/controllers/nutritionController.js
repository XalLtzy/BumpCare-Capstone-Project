const axios = require('axios');
const pool = require('../models/db');
const { nutritionInputSchema } = require('../validations/nutritionValidation');

const classifyNutritionHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  const { lila, hemoglobin, systolic, diastolic } = request.payload;

  const { error } = nutritionInputSchema.validate(request.payload);
  if (error) {
    return h.response({
      status: 'fail',
      message: error.details[0].message
    }).code(400);
  }

  try {
    const result = await pool.query(
      `SELECT id, pre_pregnancy_weight, weight, height 
       FROM pregnancy_records 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({ status: 'fail', message: 'Data kehamilan belum tersedia' }).code(404);
    }

    const { id, pre_pregnancy_weight, weight, height } = result.rows[0];

    const bb_dulu = parseFloat(pre_pregnancy_weight);
    const bb_sekarang = parseFloat(weight);
    const tinggi_badan = parseFloat(height);
    const tinggi_m = tinggi_badan / 100;
    const bmi = bb_sekarang / (tinggi_m ** 2);

    const inputPayload = {
      bb_dulu,
      bb_sekarang,
      tinggi_badan,
      lila,
      hb: hemoglobin,
      sistolik: systolic,
      diastolik: diastolic
    };

    console.log('Payload yang dikirim ke Flask:', inputPayload);

    const response = await axios.post('http://127.0.0.1:5000/predict', inputPayload);

    console.log('Response dari Flask:', response.data); 

    const nutritionStatus = response.data?.prediction;
    const confidence = response.data?.confidence;
  
    if (!nutritionStatus) {
      return h.response({
        status: 'error',
        message: 'Model tidak mengembalikan hasil prediksi',
      }).code(500);
    }

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
        bb_dulu,
        bb_sekarang,
        tinggi_badan,
        bmi,
        lila,
        hemoglobin,
        systolic,
        diastolic,
        nutritionStatus,
        confidence,
      },
    }).code(200);

  } catch (err) {
    console.error('Error saat klasifikasi gizi:', err.message);

    if (err.response) {
      console.error('Status dari Flask:', err.response.status);
      console.error('Data error dari Flask:', err.response.data);
    }

    return h.response({
      status: 'error',
      message: 'Gagal memproses klasifikasi gizi',
      detail: err.message,
    }).code(500);
  }
};

const getClassificationHistoryHandler = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      `SELECT id, pre_pregnancy_weight, weight, height, lila, hemoglobin, systolic, diastolic, nutrition_status, created_at 
       FROM pregnancy_records 
       WHERE user_id = $1 AND nutrition_status IS NOT NULL
       ORDER BY created_at DESC`,
      [userId]
    );

    return h.response({
      status: 'success',
      data: result.rows,
    }).code(200);
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Gagal mengambil riwayat klasifikasi gizi',
      detail: err.message,
    }).code(500);
  }
};

const getLatestClassificationHandler = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      `SELECT id, pre_pregnancy_weight, weight, height, lila, hemoglobin, systolic, diastolic, nutrition_status, created_at 
       FROM pregnancy_records 
       WHERE user_id = $1 AND nutrition_status IS NOT NULL
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({
        status: 'fail',
        message: 'Tidak ada klasifikasi gizi terbaru',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: result.rows[0],
    }).code(200);
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Gagal mengambil data klasifikasi terbaru',
      detail: err.message,
    }).code(500);
  }
};

module.exports = {
  classifyNutritionHandler,
  getClassificationHistoryHandler,
  getLatestClassificationHandler,
};

