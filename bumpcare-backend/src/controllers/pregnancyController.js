const { pregnancyInputSchema } = require('../validations/pregnancyValidation');
const pool = require('../models/db');

const classifyBMI = (bmi) => {
  if (bmi < 18.5) return 'Kurus';
  if (bmi < 23) return 'Normal';
  if (bmi < 25) return 'Gemuk';
  if (bmi < 30) return 'Obesitas 1';
  return 'Obesitas 2';
};

const calculateNeeds = (prePregnancyWeight, currentWeight, trimester, activityLevel) => {
  const baseCaloriePerKg = 25; 
  let calorieNeed = prePregnancyWeight * baseCaloriePerKg;

  if (trimester === 2) calorieNeed += 340;
  else if (trimester === 3) calorieNeed += 452;

  switch ((activityLevel || '').toLowerCase()) {
    case 'rendah':
      calorieNeed *= 1.2;
      break;
    case 'sedang':
      calorieNeed *= 1.5;
      break;
    case 'tinggi':
      calorieNeed *= 1.7;
      break;
    default:
      calorieNeed *= 1.3; 
  }

  calorieNeed = Math.round(calorieNeed);

  const baseProteinPerKg = 0.8;
  let proteinNeed = currentWeight * baseProteinPerKg;
  if (trimester === 2) proteinNeed += 6;
  if (trimester === 3) proteinNeed += 10;
  proteinNeed = +proteinNeed.toFixed(2);

  const fatNeed = +((calorieNeed * 0.25) / 9).toFixed(2);

  return { calorieNeed, proteinNeed, fatNeed };
};

const calculateHandler = async (request, h) => {
  const { error } = pregnancyInputSchema.validate(request.payload);
  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  const { age, weight, height, trimester, prePregnancyWeight, activity_level } = request.payload;
  const userId = request.auth.credentials.id;

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters ** 2)).toFixed(2);
  const bmiStatus = classifyBMI(bmi);
  const trimesterInt = parseInt(trimester);

  const { calorieNeed, proteinNeed, fatNeed } = calculateNeeds(prePregnancyWeight, weight, trimesterInt, activity_level);

  try {
    await pool.query(
      `INSERT INTO pregnancy_records 
        (user_id, age, pre_pregnancy_weight, weight, height, trimester, bmi, bmi_status, calorie_needs, protein_needs, fat_needs, activity_level)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [userId, age, prePregnancyWeight, weight, height, trimester, bmi, bmiStatus, calorieNeed, proteinNeed, fatNeed, activity_level]
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
      `SELECT id, age, pre_pregnancy_weight, weight, height, trimester, bmi, bmi_status, 
              calorie_needs, protein_needs, fat_needs, activity_level, created_at,
              lila, hemoglobin, systolic, diastolic, nutrition_status,
              blood_sugar, heart_rate, body_temperature_f,
              previous_complications, preexisting_diabetes,
              gestational_diabetes, mental_health, risk_classification
       FROM pregnancy_records 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
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
      `DELETE FROM pregnancy_records 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
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
  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  const userId = request.auth.credentials.id;
  const { id } = request.params;
  const { age, weight, height, trimester, prePregnancyWeight, activity_level } = request.payload;

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters ** 2)).toFixed(2);
  const bmiStatus = classifyBMI(bmi);
  const trimesterInt = parseInt(trimester);

  const { calorieNeed, proteinNeed, fatNeed } = calculateNeeds(prePregnancyWeight, weight, trimesterInt, activity_level);

  try {
    const result = await pool.query(
      `UPDATE pregnancy_records 
       SET age = $1, weight = $2, height = $3, trimester = $4, 
           bmi = $5, bmi_status = $6, calorie_needs = $7, 
           protein_needs = $8, fat_needs = $9, pre_pregnancy_weight = $10, activity_level = $11
       WHERE id = $12 AND user_id = $13 
       RETURNING *`,
      [age, weight, height, trimester, bmi, bmiStatus, calorieNeed, proteinNeed, fatNeed, prePregnancyWeight, activity_level, id, userId]
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
      `SELECT bmi, bmi_status, calorie_needs, protein_needs, fat_needs, activity_level, created_at 
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
        activityLevel: row.activity_level,
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
