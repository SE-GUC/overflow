const Joi = require("joi");

// 2 schemas for password attribute difference when updating
const createValidation = (request) => {
  const createSchema = {
    name: Joi.string().min(3).max(30).required(),
    password:Joi.string().required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().min(4).max(6).required(),
    hourlyRate:Joi.string(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()

  };
  return Joi.validate(request, createSchema);
};
const updateValidation = (request) => {
  const updateSchema = {
    name: Joi.string().min(3).max(30).required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().min(4).max(6).required(),
    hourlyRate:Joi.string(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()

  }
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation,updateValidation };