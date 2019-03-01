const Joi = require("joi");
const Review = require("../models/Reviews");

module.exports = {
  createValidation: request => {
    const createSchema = {
      partnerID:Joi.string().required(),
      memberID:Joi.string().required(),
      reviewText:Joi.string().required(),
      rating:Joi.string(),
      datePosted:Joi.date().iso()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      partnerID:Joi.string().required(),
      reviewText:Joi.string().required(),
      rating:Joi.string(),
      datePosted:Joi.date().iso()
    };

    return Joi.validate(request, updateSchema);
  }
};
