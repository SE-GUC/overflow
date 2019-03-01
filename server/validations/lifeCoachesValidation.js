const Joi = require("joi");

// 2 schemas for password attribute difference when updating
const createValidation = (request) => {
  const createSchema = {
    name: Joi.string().min(3).max(30).required(),
    dateOfBirth: new date(),
    gender: Joi.string().min(4).max(6).required(),
    joinDate:Joi.date(),
    hourlyRate:Joi.number(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    monthlySlots:Joi.number(),
  };
  return Joi.validate(request, createSchema);
};
const updateValidation = (request) => {
  const updateSchema = {
    name: Joi.string().min(3).max(30).required(),
    dateOfBirth: Joi.date(),
    gender: Joi.string().min(4).max(6).required(),
    hourlyRate:Joi.number(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    monthlySlots:Joi.number(),
  }
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation,updateValidation };