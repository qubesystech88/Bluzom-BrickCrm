const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addVehicle = async (req, res) => {
    try {
        // const newVehicle = await Vehicle.create(req.body);
        res.status(201).json({ message: "Vehicle added successfully", data: req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
