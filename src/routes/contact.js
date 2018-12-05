const express = require('express');
const contact = require('../controllers/contact');
const validate = require('../middlewares/validator');

const router = express.Router();

router.get('/', contact.getAll);
router.post('/', validate.createContact, contact.create);
router.post('/send', validate.sendSMS, contact.sendSMS);

module.exports = router;
