import api from '../models/api';

export async function calculateNutrition(payload) {
  try {
    const res = await api.post('/calculate', payload); 
    return { data: res.data.data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || 'Terjadi kesalahan saat menghitung nutrisi',
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