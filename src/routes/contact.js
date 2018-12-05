const express = require('express');
const contact = require('../controllers/contact');

const router = express.Router();

router.get('/', contact.getAll);
router.post('/', contact.create);

module.exports = router;
