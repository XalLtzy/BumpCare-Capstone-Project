import api from './api';

const calculatorModel = {
  async calculateNutrition(payload) {
    try {
      const res = await api.post('/calculate', payload);
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Terjadi kesalahan saat menghitung nutrisi',
      };
    }
  },

  async fetchRecords() {
    try {
      const res = await api.get('/records');
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat riwayat',
      };
    }
  },
};

export default calculatorModel;
