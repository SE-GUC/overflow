const Joi = require("joi");

const createValidation = request => {
  const createSchema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phone: Joi.number(),
    password: Joi.string().required(),
    gender: Joi.string().min(4).max(6),
    salary: Joi.string(),
    isSuper: Joi.boolean(),
    dateOfBirth: Joi.date().required()
  };
  return Joi.validate(request, createSchema);
};
const updateValidation = request => {
const updateSchema = {
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  phone: Joi.number(),
  gender: Joi.string().min(4).max(6),
  salary: Joi.string(),
  isSuper: Joi.boolean(),
  dateOfBirth: Joi.date().required()
}
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation,updateValidation };