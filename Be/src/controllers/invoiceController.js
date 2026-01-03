const Invoice = require('../models/Invoice');

exports.createInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json({
            success: true,
            data: invoice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: invoices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
