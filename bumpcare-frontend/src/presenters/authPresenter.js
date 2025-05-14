import api from '../models/api';

export async function loginUser({ email, password }) {
  const res = await api.post('/login', { email, password });
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  return res.data.user;
}

export async function registerUser({ name, email, password }) {
  await api.post('/register', { name, email, password });
  return await loginUser({ email, password });
}