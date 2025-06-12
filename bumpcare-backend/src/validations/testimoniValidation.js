const Joi = require('joi');

const testimoniSchema = Joi.object({
  message: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

module.exports = { testimoniSchema };