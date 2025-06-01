import api from './api';

export const fetchUserProfile = async () => {
  try {
    const res = await api.get('/profile');
    return res.data.data ?? null;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 404)
    ) {
      return null;
    }
    throw error;
  }
};


export const updateUserProfile = async (data) => {
  const res = await api.put('/profile', data);
  return res.data;
};
