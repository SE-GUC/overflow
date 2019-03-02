const Joi = require("joi");

const createValidation = request => {
  const createSchema = {
    vacancyId: Joi.required(),
    memberId: Joi.required(),
    applicationText: Joi.string()
  };
  return Joi.validate(request, createSchema);
};
const updateValidation = request => {
  const updateSchema = {
    vacancyId: Joi.required(),
    memberId: Joi.required(),
    applicationText: Joi.string()
  };
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation, updateValidation };
