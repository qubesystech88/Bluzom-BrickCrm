const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    billToName: {
        type: String,
        required: true
    },
    vehicle: {
        type: String
    },
    timing: {
        type: String
    },
    rate: {
        type: Number
    },
    gst: {
        type: Number,
        default: 18
    },
    lumpSum: {
        type: Number
    },
    total: {
        type: Number,
        required: true
    },
    isLumpSum: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
