const Joi = require('joi');

const pregnancyInputSchema = Joi.object({
  age: Joi.number().integer().min(14).max(50)
    .required()
    .messages({
      'number.base': 'Umur harus berupa angka',
      'number.min': 'Umur minimal 14 tahun',
      'number.max': 'Umur maksimal 50 tahun',
      'any.required': 'Umur wajib diisi'
    }),

  weight: Joi.number().min(30).max(200)
    .required()
    .messages({
      'number.base': 'Berat badan harus berupa angka',
      'number.min': 'Berat badan minimal 30 kg',
      'number.max': 'Berat badan maksimal 200 kg',
      'any.required': 'Berat badan wajib diisi'
    }),

  height: Joi.number().min(100).max(220)
    .required()
    .messages({
      'number.base': 'Tinggi badan harus berupa angka',
      'number.min': 'Tinggi badan minimal 100 cm',
      'number.max': 'Tinggi badan maksimal 220 cm',
      'any.required': 'Tinggi badan wajib diisi'
    }),

  trimester: Joi.number().valid(1, 2, 3)
    .required()
    .messages({
      'any.only': 'Trimester hanya bisa bernilai 1, 2, atau 3',
      'any.required': 'Trimester wajib diisi'
    })
});

module.exports = { pregnancyInputSchema };
