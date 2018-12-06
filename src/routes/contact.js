const express = require('express');
const contact = require('../controllers/contact');
const validate = require('../middlewares/validator');

const router = express.Router();

router.post('/', validate.getContact, contact.getContact);
router.get('/all', contact.getAll);
router.post('/create', validate.createContact, contact.create);
router.post('/send', validate.sendSMS, contact.sendSMS);
router.get('/messages', contact.getMessages);

module.exports = router;
