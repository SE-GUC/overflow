const Joi = require("joi");
const Review = require("../models/Reviews");
module.exports = {
  createValidation: request => {
    const createSchema = {
      booked:Joi.bool(),
      date:Joi.date(),
      location:Joi.string(),
      member:Joi.object(),
      confirmed:Joi.bool()
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
