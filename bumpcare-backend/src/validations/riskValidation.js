const Joi = require('joi');

const riskInputSchema = Joi.object({
  blood_sugar: Joi.number().min(2).max(20).required()
    .messages({
      'any.required': 'Kadar gula darah wajib diisi',
      'number.base': 'Kadar gula darah harus berupa angka',
    }),

  body_temperature: Joi.number().min(35).max(42).required()
    .messages({
      'any.required': 'Suhu tubuh wajib diisi',
      'number.base': 'Suhu tubuh harus berupa angka (dalam °C)',
    }),

  heart_rate: Joi.number().min(40).max(200).required()
    .messages({
      'any.required': 'Detak jantung wajib diisi',
      'number.base': 'Detak jantung harus berupa angka',
    }),

  previous_complications: Joi.number().valid(0, 1).required()
    .messages({
      'any.required': 'Riwayat komplikasi harus diisi',
      'any.only': 'Hanya boleh bernilai 0 (Tidak) atau 1 (Ya)',
    }),

  preexisting_diabetes: Joi.number().valid(0, 1).required()
    .messages({
      'any.required': 'Riwayat diabetes sebelum kehamilan wajib diisi',
      'any.only': 'Hanya boleh bernilai 0 (Tidak) atau 1 (Ya)',
    }),

  gestational_diabetes: Joi.number().valid(0, 1).required()
    .messages({
      'any.required': 'Status diabetes selama kehamilan wajib diisi',
      'any.only': 'Hanya boleh bernilai 0 (Tidak) atau 1 (Ya)',
    }),

  mental_health: Joi.number().valid(0, 1).required()
    .messages({
      'any.required': 'Status kesehatan mental wajib diisi',
      'any.only': 'Hanya boleh bernilai 0 (Ada masalah) atau 1 (Tidak ada masalah)',
    }),
});

module.exports = { riskInputSchema };
