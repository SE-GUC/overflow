const Joi = require("joi");

// 2 schemas for password attribute difference when updating
const createValidation = (request) => {
  const createSchema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phone: Joi.number(),
    password: Joi.string().required(),
    gender: Joi.string().min(3).max(50),
    salary: Joi.number(),
    isSuper: Joi.boolean(),
    dateOfBirth: Joi.date(),
    joinDate: new date(),
  };
  return Joi.validate(request, createSchema);
};
const updateValidation = (request) => {
  const updateSchema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phone: Joi.number(),
    password: Joi.string().required(),
    gender: Joi.string().min(3).max(50),
    salary: Joi.number(),
    isSuper: Joi.boolean(),
    dateOfBirth: Joi.date(),
  }
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation,updateValidation };