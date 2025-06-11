// src/models/riskModel.js
import api from './api';

const riskModel = {
  async classifyRisk(payload) {
    try {
      const res = await api.post('/risk-classification', payload);
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Terjadi kesalahan saat klasifikasi risiko kehamilan',
      };
    }
  },

  async getRiskClassificationHistory() {
    try {
      const res = await api.get('/risk-history');
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat riwayat klasifikasi risiko',
      };
    }
  },

  async getLatestRiskClassification() {
    try {
      const res = await api.get('/risk-latest');
      return { data: res.data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat hasil klasifikasi risiko terbaru',
      };
    }
  },
};

export default riskModel;
