const {
  ValidateCreateContact,
  ValidateGetContact,
  ValidateSendSMS
} = require('../utils/validatorSchema');

const createContact = (req, res, next) => {
  const { error, value } = ValidateCreateContact.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
      data: {}
    });
    return;
  }
  req.parsed = value;
  next();
};

const getContact = (req, res, next) => {
  const { error, value } = ValidateGetContact.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
      data: {}
    });
    return;
  }
  req.parsed = value;
  next();
};

const sendSMS = (req, res, next) => {
  const { error, value } = ValidateSendSMS.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
      data: {}
    });
    return;
  }
  req.parsed = value;
  next();
};

module.exports = {
  createContact,
  sendSMS,
  getContact
};
