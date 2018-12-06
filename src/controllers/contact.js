const Contact = require('../models/contacts');
const Message = require('../models/messages');
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

  const filteredContacts = [];

  contacts.forEach((contact) => {
    const data = {
      phone: `${contact.phone.dialCode}${contact.phone.number}`,
      id: contact._id,
      firstName: contact.firstName,
      lastName: contact.lastName
    };
    filteredContacts.push(data);
  });

  res.status(200).json({
    success: true,
    msg: 'List of Contacts',
    data: {
      contacts: filteredContacts
    }
  });
};

const getContact = async (req, res) => {
  const { id } = req.parsed;
  let contact;
  try {
    contact = await Contact.findById(id);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if (!contact) {
    res.status(404).json({
      success: false,
      msg: 'Contact Not Found',
      data: {}
    });
    return;
  }

  res.status(200).json({
    success: true,
    msg: 'Contact Details',
    data: {
      contact: {
        phone: `${contact.phone.dialCode}${contact.phone.number}`,
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName
      }
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

  const newMessage = {
    recipient: phone,
    message
  };

  try {
    await Message.create(newMessage);
    console.log('Message Successfully stored');
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (req, res) => {
  let messages;

  try {
    messages = await Message.find();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
      data: {}
    });
  }

  const filteredMessages = [];

  messages.forEach((message) => {
    const { message: content, recipient } = message;
    const filtered = {
      recipient,
      message: content,
      sentAt: message.lastUpdateAt
    };
    filteredMessages.push(filtered);
  });

  res.status(200).json({
    success: true,
    msg: 'List of messages',
    data: {
      messages: filteredMessages
    }
  });
};

module.exports = {
  getAll,
  create,
  sendSMS,
  getMessages,
  getContact
};
