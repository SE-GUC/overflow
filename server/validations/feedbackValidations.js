const Joi = require("joi");
const Review = require("../models/Reviews");
module.exports = {
  createValidation: request => {
    const createSchema = {
      memberID: Joi.string().required(),
      partnerID: Joi.string().required(),
      feedbackText: Joi.string().required()
    };

    return Joi.validate(request, createSchema);
  },
  // getSchema: () =>{
  //   const createSchema = {
  //     member: {
  //       name: Joi.string(),
  //       dateOfBirth: Joi.date().iso(),
  //       gender: Joi.string(),
  //       joinDate: Joi.date(),
  //       email: Joi.string().email({ minDomainAtoms: 2 }),
  //       skills: Joi.array(),
  //       interests: Joi.array(),
  //       reviews: Joi.array().allow(null)
  //     },
  //     datePosted: Joi.date(),
  //     feedbackText: Joi.string()
  //   };
  //   return createSchema;
  // },

  updateValidation: request => {
    const updateSchema = {
      memberID: Joi.string().required(),
      feedbackText: Joi.string().required()
    };

    return Joi.validate(request, updateSchema);
  }
};
