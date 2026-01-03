const express = require('express');
const { createQuotation, getQuotations } = require('../controllers/quotationController');
const router = express.Router();

router.route('/')
    .post(createQuotation)
    .get(getQuotations);

module.exports = router;
