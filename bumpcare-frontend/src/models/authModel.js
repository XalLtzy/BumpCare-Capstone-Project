import api from './api';

export async function login({ email, password }) {
  const res = await api.post('/login', { email, password });

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));

  return res.data.user;
}

export async function register({ name, email, password }) {
  return await api.post('/register', { name, email, password });
}
