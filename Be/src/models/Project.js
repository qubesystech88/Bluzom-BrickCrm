const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    startDate: Date,
    endDate: Date,
    budget: Number,
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
