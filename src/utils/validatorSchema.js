const Joi = require('joi');

const ValidateCreateContact = Joi.object().keys({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30),
  dialCode: Joi.string().min(1).max(4).required(),
  number: Joi.number().required()
});

module.exports = {
  ValidateCreateContact
};
