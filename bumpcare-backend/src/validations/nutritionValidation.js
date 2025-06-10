const Joi = require('joi');

const nutritionInputSchema = Joi.object({
  lila: Joi.number().min(10).max(50).required()
    .messages({
      'any.required': 'Lingkar lengan atas (LILA) wajib diisi',
      'number.base': 'LILA harus berupa angka',
      'number.min': 'LILA terlalu kecil',
      'number.max': 'LILA terlalu besar',
    }),
  hemoglobin: Joi.number().min(5).max(20).required()
    .messages({
      'any.required': 'Hemoglobin wajib diisi',
      'number.base': 'Hemoglobin harus berupa angka',
      'number.min': 'Hemoglobin terlalu rendah',
      'number.max': 'Hemoglobin terlalu tinggi',
    }),
  systolic: Joi.number().min(50).max(250).required()
    .messages({
      'any.required': 'Tekanan darah sistolik wajib diisi',
      'number.base': 'Sistolik harus berupa angka',
    }),
  diastolic: Joi.number().min(30).max(150).required()
    .messages({
      'any.required': 'Tekanan darah diastolik wajib diisi',
      'number.base': 'Diastolik harus berupa angka',
    }),
});

module.exports = { nutritionInputSchema };
