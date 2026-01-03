const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Payment = require('./src/models/Payment');
const connectDB = require('./src/config/db');

dotenv.config();

const seedData = [
    { clientName: 'Tech Solutions Ltd', amount: 45000, status: 'Paid', date: new Date('2023-11-01') },
    { clientName: 'BuildWell Constructions', amount: 125000, status: 'Pending', date: new Date('2023-11-05') },
    { clientName: 'Green Valley Homes', amount: 75000, status: 'Active', date: new Date('2023-11-10') },
    { clientName: 'City Planners', amount: 20000, status: 'Paid', date: new Date('2023-10-25') },
    { clientName: 'Highway Infra', amount: 350000, status: 'Pending', date: new Date('2023-11-12') }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Payment.deleteMany({});
        await Payment.insertMany(seedData);
        console.log('Payments Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
