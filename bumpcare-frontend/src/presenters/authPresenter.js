import { login, register } from '../models/authModel';

export async function loginUser({ email, password }) {
  return await login({ email, password });
}

export async function registerUser({ name, email, password }) {
  await register({ name, email, password });
  return await login({ email, password }); 
}
