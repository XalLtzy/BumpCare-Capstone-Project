import api from './api';

export async function getLatestNutritionInput() {
  const res = await api.get('/latest-result');
  return res.data.data;
}

/**
 * Melakukan klasifikasi status gizi berdasarkan input pengguna.
 * @param {Object} param0 - Input pengukuran pengguna.
 * @param {number} param0.lila - Lingkar lengan atas.
 * @param {number} param0.hemoglobin - Nilai hemoglobin.
 * @param {number} param0.systolic - Tekanan darah sistolik.
 * @param {number} param0.diastolic - Tekanan darah diastolik.
 * @returns {Promise<Object>} - Hasil prediksi dari server.
 */
export async function classifyNutrition({ lila, hemoglobin, systolic, diastolic }) {
  const token = localStorage.getItem('token');

  const features = [Number(lila), Number(hemoglobin), Number(systolic), Number(diastolic)];

  try {
    const response = await api.post('/classify-nutrition', {
      features
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;

  } catch (error) {
    console.error('❌ Gagal submit klasifikasi:', error);
    throw error; 
  }
}
