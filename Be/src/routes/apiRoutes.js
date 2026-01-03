const express = require('express');
const router = express.Router();
const expandedControllers = require('../controllers/expandedControllers');

// Work
router.get('/tasks', expandedControllers.getAllTasks);
router.post('/tasks', expandedControllers.createTask);

// Fuel
router.get('/fuel-stats', expandedControllers.getFuelStats);
router.post('/fuel', expandedControllers.addFuelRecord);

// Drivers
router.get('/drivers', expandedControllers.getDrivers);

// Customers
router.get('/customers', expandedControllers.getCustomers);
router.delete('/customers/:id', expandedControllers.deleteCustomer);

module.exports = router;
