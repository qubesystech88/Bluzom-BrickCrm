const express = require('express');
const { getPayments, createPayment, updatePaymentStatus } = require('../controllers/paymentController');
const router = express.Router();

router.route('/')
    .get(getPayments)
    .post(createPayment);

router.route('/:id')
    .put(updatePaymentStatus);

module.exports = router;
