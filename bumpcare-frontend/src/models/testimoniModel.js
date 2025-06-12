import api from './api';

const testimoniModel = {
  async createTestimoni(payload) {
    try {
      const res = await api.post('/testimoni', payload);
      return {
        data: res.data.data,   
        error: null,
        message: res.data.message, 
      };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal mengirim testimoni',
      };
    }
  },

  async getAllTestimoni() {
    try {
      const res = await api.get('/testimoni');
      return {
        data: res.data.data,   
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data?.message || 'Gagal memuat testimoni',
      };
    }
  },
};

export default testimoniModel;
