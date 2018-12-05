const Joi = require('joi');

const ValidateCreateContact = Joi.object().keys({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30),
  dialCode: Joi.string().min(1).max(4).required(),
  number: Joi.number().required()
});

const ValidateSendSMS = Joi.object().keys({
  message: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(5).required()
});


module.exports = {
  ValidateCreateContact,
  ValidateSendSMS
};
