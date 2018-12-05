const Contact = require('../models/contacts');
const SmsService = require('../utils/sendSMS');

const getAll = async (req, res) => {
  let contacts;
  try {
    contacts = await Contact.find();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(200).json({
    success: true,
    msg: 'List of Contacts',
    data: {
      contacts
    }
  });
};

const create = async (req, res) => {
  const {
    firstName,
    lastName,
    dialCode,
    number
  } = req.parsed;

  const newContact = {
    firstName,
    lastName,
    phone: {
      dialCode,
      number
    }
  };

  try {
    await Contact.create(newContact);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    success: true,
    msg: 'New Contact Created',
    data: {}
  });
};

const sendSMS = async (req, res) => {
  const {
    message,
    phone
  } = req.parsed;

  try {
    await SmsService.send(phone, message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(200).json({
    success: true,
    msg: 'SMS Successfully Sent',
    data: {}
  });
};

module.exports = {
  getAll,
  create,
  sendSMS
};
