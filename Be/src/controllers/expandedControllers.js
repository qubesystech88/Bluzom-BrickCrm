const Project = require('../models/Project'); // Work is Project

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Project.find().populate('client', 'name');
        // Transform to frontend format if needed
        const formattedTasks = tasks.map(t => ({
            id: t._id,
            title: t.title,
            assignee: 'Unassigned', // Add assignee to model later
            location: t.client ? t.client.address : 'Unknown', // Derive location from client or add field
            status: t.status,
            desc: t.description || ''
        }));
        res.json(formattedTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const newTask = await Project.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ... Keep other stubs or implement real DB logic similarly
// For brevity, keeping others as mocks or implementing basics:

const Customer = require('../models/Customer');

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Stub for Fuel/Drivers until models exist
exports.getFuelStats = (req, res) => res.json({ labels: ['A', 'B'], data: [100, 200] });
exports.addFuelRecord = (req, res) => res.status(201).json({ message: 'Recorded' });
exports.getDrivers = (req, res) => res.json([{ id: 1, name: 'Raju (DB Pending)', phone: '123' }]);
