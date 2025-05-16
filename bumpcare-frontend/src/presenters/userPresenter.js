import api from '../models/api';

export async function getUserProfile() {
  const res = await api.get('/profile');
  return res.data.data;
}

export async function updateUserProfile(data) {
  const res = await api.put('/profile', data);
  return res.data;
}
