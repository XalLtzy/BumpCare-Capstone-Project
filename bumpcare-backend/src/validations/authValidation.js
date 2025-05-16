const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Nama lengkap wajib diisi',
      'string.min': 'Nama lengkap minimal 2 karakter',
      'string.max': 'Nama lengkap maksimal 100 karakter',
      'any.required': 'Nama lengkap wajib diisi'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Format email tidak valid',
      'string.empty': 'Email wajib diisi',
      'any.required': 'Email wajib diisi'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Kata sandi minimal 6 karakter',
      'string.empty': 'Kata sandi wajib diisi',
      'any.required': 'Kata sandi wajib diisi'
    })
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Format email tidak valid',
      'string.empty': 'Email wajib diisi',
      'any.required': 'Email wajib diisi'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Kata sandi wajib diisi',
      'any.required': 'Kata sandi wajib diisi'
    })
});

module.exports = {
  registerSchema,
  loginSchema
};
