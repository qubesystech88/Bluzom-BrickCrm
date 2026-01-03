const app = require('../src/app');
const connectDB = require('../src/config/db');

module.exports = async (req, res) => {
    // Set CORS headers for all responses (Serverless fallback)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    // Handle OPTIONS method immediately
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await connectDB();
    } catch (error) {
        console.error('Database connection error:', error);
        return res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message
        });
    }

    app(req, res);
};
