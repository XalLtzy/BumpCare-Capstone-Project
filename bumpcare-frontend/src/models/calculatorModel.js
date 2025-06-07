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

  async deleteRecordById(id) {
    try {
      const res = await api.delete(`/records/${id}`);
      return { data: res.data.data || null, error: null, success: true };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal menghapus riwayat',
        success: false,
      };
    }
  },

  async fetchLatestResult() {
    try {
      const res = await api.get('/latest-result');
      return { data: res.data.data || null, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat hasil terbaru',
      };
    }
  },
};

export default calculatorModel;
