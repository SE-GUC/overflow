const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      booked:Joi.bool().required(),
      date:Joi.date().required(),
      location:Joi.string().required(),
      member:Joi.object(),
      confirmed:Joi.bool().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
        booked:Joi.bool().required(),
        date:Joi.date().required(),
        location:Joi.string().required(),
        member:Joi.object(),
        confirmed:Joi.bool().required()
    };

    return Joi.validate(request, updateSchema);
  }
};
