const app = require('../src/app');
const connectDB = require('../src/config/db');

module.exports = async (req, res) => {
    // Ensure DB is connected before handling the request
    await connectDB();

    // Pass request to express app
    app(req, res);
};
