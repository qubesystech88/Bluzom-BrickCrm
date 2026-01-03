const Quotation = require('../models/Quotation');

exports.createQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.create(req.body);
        res.status(201).json({
            success: true,
            data: quotation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: quotations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
