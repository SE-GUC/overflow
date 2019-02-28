const Joi = require("joi");
const Review = require("../models/Reviews");
const validator = require("./feedbackValidations");
module.exports = {
  createValidation: request => {
    const createSchema = {
      partner: {
        name:Joi.string(),
        address:Joi.string(),
        email:Joi.string().email({minDomainAtoms:2}),
        fax:Joi.string().alphanum(),
        phone:Joi.string().alphanum(),
        partners:Joi.array(),
        members:Joi.array(),
        fieldOfWork:Joi.string(),
        projects:Joi.array(),
        feedback:Joi.object()
      },
      reviewText:Joi.string(),
      rating:Joi.string(),
      datePosted:Joi.date().iso()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      member: {
        name: Joi.string().required,
        dateOfBirth: Joi.date().iso(),
        gender: Joi.string(),
        joinDate: Joi.date(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        skills: Joi.array().items(String),
        interests: Joi.array().items(String),
        reviews: Joi.array().items(Review)
      },
      datePosted: Joi.date().required,
      feedback: Joi.string().required
    };

    return Joi.validate(request, updateSchema);
  }
};
