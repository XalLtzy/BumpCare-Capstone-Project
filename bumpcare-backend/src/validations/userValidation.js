const Joi = require('joi');

const userProfileSchema = Joi.object({
  age: Joi.number().integer().min(14).max(50).required(),
  weight: Joi.number().min(30).max(200).required(),
  pre_pregnancy_weight: Joi.number().min(30).max(200).required(),
  height: Joi.number().min(100).max(220).required(),
  trimester: Joi.number().valid(1, 2, 3).required(),
  activity_level: Joi.string().max(50).optional().allow('', null),
});

module.exports = { userProfileSchema };
