const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Active', 'Maintenance', 'Inactive'], default: 'Active' },
    serviceHistory: [{
        date: Date,
        description: String,
        cost: Number,
        type: { type: String, enum: ['Weekly', 'Monthly', 'Quarterly'] }
    }],
    photos: [String], // URLs
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
