const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
    quotationNo: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    validUntil: {
        type: Date
    },
    recipientName: {
        type: String,
        required: true
    },
    items: [{
        description: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quotation', QuotationSchema);
