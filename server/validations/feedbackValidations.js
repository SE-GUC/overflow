const Joi = require("joi");
const Review = require('../models/Reviews')
module.exports = {
  createValidation: request => {
    const createSchema = {
      member: {
        name: Joi.string(),
        dateOfBirth: Joi.date().iso(),
        gender: Joi.string(),
        joinDate: Joi.date(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        skills: Joi.array(),
        interests: Joi.array(),
        reviews: Joi.array().allow(null)
      },
      datePosted: Joi.date(),
      feedbackText: Joi.string()
    };

    return Joi.validate(request, createSchema);
  },
  getSchema: () =>{
    const createSchema = {
      member: {
        name: Joi.string(),
        dateOfBirth: Joi.date().iso(),
        gender: Joi.string(),
        joinDate: Joi.date(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        skills: Joi.array(),
        interests: Joi.array(),
        reviews: Joi.array().allow(null)
      },
      datePosted: Joi.date(),
      feedbackText: Joi.string()
    };
    return createSchema;
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
