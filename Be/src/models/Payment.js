const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Paid'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
