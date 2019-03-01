const Joi = require("joi");

const createValidation = request => {
  const createSchema = {
    partnerId: Joi.required(),
    description: Joi.string().required(),
    duration: Joi.string(),
    monthlyWage: Joi.string(),
    location: Joi.string(),
    dailyHours: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    state: Joi.string()
  };
  return Joi.validate(request, createSchema);
};
const updateValidation = request => {
  const updateSchema = {
    partnerId: Joi.required(),
    description: Joi.string().required(),
    duration: Joi.string(),
    monthlyWage: Joi.string(),
    location: Joi.string(),
    dailyHours: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    state: Joi.string(),
    acceptedMemberId: Joi.string()
  };
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation, updateValidation };
