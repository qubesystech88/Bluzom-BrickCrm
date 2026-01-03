const express = require('express');
const { createInvoice, getInvoices } = require('../controllers/invoiceController');
const router = express.Router();

router.route('/')
    .post(createInvoice)
    .get(getInvoices);

module.exports = router;
