import api from './api';

const nutritionModel = {
  async classifyNutrition(payload) {
    try {
      const res = await api.post('/nutrition/classify', payload);
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Terjadi kesalahan saat klasifikasi status gizi',
      };
    }
  },

  async getClassificationHistory() {
    try {
      const res = await api.get('/nutrition/history');
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat riwayat klasifikasi',
      };
    }
  },

  async getLatestClassification() {
    try {
      const res = await api.get('/nutrition/latest');
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat hasil klasifikasi terbaru',
      };
    }
  },
};

export default nutritionModel;
