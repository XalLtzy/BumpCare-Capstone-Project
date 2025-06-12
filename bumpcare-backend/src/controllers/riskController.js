const axios = require('axios');
const pool = require('../models/db');
const { riskInputSchema } = require('../validations/riskValidation');

const classifyRiskHandler = async (request, h) => {
  const userId = request.auth.credentials.id;

  const {
    blood_sugar,
    body_temperature,
    heart_rate,
    previous_complications,
    preexisting_diabetes,
    gestational_diabetes,
    mental_health
  } = request.payload;

  const { error } = riskInputSchema.validate(request.payload);
  if (error) {
    return h.response({
      status: 'fail',
      message: error.details[0].message,
    }).code(400);
  }

  try {
    const result = await pool.query(
      `SELECT id, age, weight, height, systolic, diastolic, bmi
       FROM pregnancy_records 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({
        status: 'fail',
        message: 'Data kehamilan belum tersedia'
      }).code(404);
    }

    const {
      id,
      age,
      weight,
      height,
      systolic,
      diastolic,
      bmi: storedBmi
    } = result.rows[0];

    if (systolic === null || diastolic === null) {
      return h.response({
        status: 'fail',
        message: 'Tekanan darah belum tersedia, silakan lakukan klasifikasi gizi terlebih dahulu.',
      }).code(400);
    }

    // Hitung ulang BMI jika belum tersedia
    let bmi = storedBmi;
    if (bmi === null && weight && height) {
      const tinggi_m = parseFloat(height) / 100;
      bmi = parseFloat(weight) / (tinggi_m ** 2);
    }

    const body_temp_f = (parseFloat(body_temperature) * 9 / 5) + 32;

    const inputPayload = {
      age,
      systolic_bp: systolic,
      diastolic,
      bs: blood_sugar,
      body_temp: body_temp_f,
      bmi,
      previous_complications,
      preexisting_diabetes,
      gestational_diabetes,
      mental_health,
      heart_rate
    };

    console.log('Payload ke Flask:', inputPayload);

    const response = await axios.post('http://127.0.0.1:5000/predict-risk', inputPayload);
    const { prediction: riskResult, confidence } = response.data;

    if (!riskResult || typeof confidence !== 'number') {
      return h.response({
        status: 'error',
        message: 'Model tidak mengembalikan hasil prediksi',
      }).code(500);
    }

    await pool.query(
      `UPDATE pregnancy_records
       SET 
         bmi = $1,
         body_temperature_f = $2,
         blood_sugar = $3,
         heart_rate = $4,
         previous_complications = $5,
         preexisting_diabetes = $6,
         gestational_diabetes = $7,
         mental_health = $8,
         risk_classification = $9
       WHERE id = $10`,
      [
        bmi,
        body_temp_f,
        blood_sugar,
        heart_rate,
        previous_complications,
        preexisting_diabetes,
        gestational_diabetes,
        mental_health,
        riskResult,
        id
      ]
    );

    return h.response({
      status: 'success',
      message: 'Klasifikasi risiko kehamilan berhasil disimpan',
      data: {
        recordId: id,
        bmi,
        risk_classification: riskResult,
        confidence,
      }
    }).code(200);

  } catch (err) {
    console.error('Error klasifikasi risiko:', err.message);

    if (err.response) {
      console.error('Respon Flask:', err.response.status, err.response.data);
    }

    return h.response({
      status: 'error',
      message: 'Gagal memproses klasifikasi risiko kehamilan',
      detail: err.message
    }).code(500);
  }
};

const getRiskHistoryHandler = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      `SELECT id, age, bmi, systolic, diastolic, blood_sugar, heart_rate,
              body_temperature_f, previous_complications, preexisting_diabetes,
              gestational_diabetes, mental_health, risk_classification, created_at
       FROM pregnancy_records
       WHERE user_id = $1 AND risk_classification IS NOT NULL
       ORDER BY created_at DESC`,
      [userId]
    );

    return h.response({
      status: 'success',
      data: result.rows
    }).code(200);
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Gagal mengambil riwayat klasifikasi risiko',
      detail: err.message
    }).code(500);
  }
};

const getLatestRiskHandler = async (request, h) => {
  const userId = request.auth.credentials.id;

  try {
    const result = await pool.query(
      `SELECT id, age, bmi, systolic, diastolic, blood_sugar, heart_rate,
              body_temperature_f, previous_complications, preexisting_diabetes,
              gestational_diabetes, mental_health, risk_classification, created_at
       FROM pregnancy_records
       WHERE user_id = $1 AND risk_classification IS NOT NULL
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return h.response({
        status: 'fail',
        message: 'Tidak ada hasil klasifikasi risiko terbaru',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: result.rows[0]
    }).code(200);
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Gagal mengambil data klasifikasi risiko terbaru',
      detail: err.message
    }).code(500);
  }
};

module.exports = {
  classifyRiskHandler,
  getRiskHistoryHandler,
  getLatestRiskHandler
};
