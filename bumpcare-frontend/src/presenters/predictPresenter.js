import api from '../models/api';

export async function predictHealth({ age, weight, height, trimester }) {
  try {
    const res = await api.post('/predict', { age, weight, height, trimester });
    return { data: res.data.data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || 'Terjadi kesalahan saat prediksi',
    };
  }
}

export async function fetchRecords() {
  try {
    const res = await api.get('/records');
    return { data: res.data.data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || 'Gagal memuat riwayat',
    };
  }
}