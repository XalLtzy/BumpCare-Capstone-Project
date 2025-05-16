import api from '../models/api';

export async function fetchLatestResult() {
  try {
    const res = await api.get('/latest-result');
    return { data: res.data.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Gagal memuat data' };
  }
}
