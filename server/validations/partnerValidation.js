const Joi = require("joi");

// 2 schemas for password attribute difference when updating
const createValidation = request => {
  const createSchema = {
    name: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(50),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    fax: Joi.string().min(3).max(50),
    phone: Joi.number(),
    partners: Joi.array().allow(null),
    members: Joi.array().allow(null),
    projects: Joi.array().allow(null),
    password: Joi.string().required(),
  };
  return Joi.validate(request, createSchema);
};
const updateValidation = request => {
  const updateSchema = {
    name: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(50),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    fax: Joi.string().min(3).max(50),
    phone: Joi.number(),
    partners: Joi.array().allow(null),
    members: Joi.array().allow(null),
    projects: Joi.array().allow(null),
  }
  return Joi.validate(request, updateSchema);
};

module.exports = { createValidation,updateValidation };
