const Joi = require("joi");
const Review = require("../models/Reviews");
const validator = require("./feedbackValidations");
module.exports = {
  createValidation: request => {
    const createSchema = {
      partner: {
        name:Joi.string().required(),
        address:Joi.string(),
        email:Joi.string().email({minDomainAtoms:2}).required(),
        fax:Joi.string().alphanum(),
        phone:Joi.string().alphanum(),
        partners:Joi.array(),
        members:Joi.array(),
        fieldOfWork:Joi.string(),
        projects:Joi.array(),
        feedback:Joi.object()
      },
      reviewText:Joi.string().required(),
      rating:Joi.string(),
      datePosted:Joi.date().iso()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
        partner: {
            name:Joi.string().required(),
            address:Joi.string(),
            email:Joi.string().email({minDomainAtoms:2}).required(),
            fax:Joi.string().alphanum(),
            phone:Joi.string().alphanum(),
            partners:Joi.array(),
            members:Joi.array(),
            fieldOfWork:Joi.string(),
            projects:Joi.array(),
            feedback:Joi.object()
          },
          reviewText:Joi.string().required(),
          rating:Joi.string(),
          datePosted:Joi.date().iso()
    };

    return Joi.validate(request, updateSchema);
  }
};
