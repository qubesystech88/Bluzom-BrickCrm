# CRM Backend (Be)

This folder contains the Node.js/Express backend for the CRM application.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)

## Setup
1. Navigate to this folder: `cd Be`
2. Install dependencies: `npm install`
3. Set up environment:
   - Create a `.env` file in this directory.
   - Add `MONGO_URI=your_mongodb_atlas_connection_string`.
   - Add `PORT=5000`.
4. Run server: `npm run dev`

## API Endpoints
- `GET /api/vehicles`: Get all vehicles
- `POST /api/vehicles`: Add a vehicle
- `GET /api/work`: Get work items
- `GET /api/payments`: Get payment records
- `GET /api/reports`: Get analytics data

## Structure
- `src/config`: Database configuration
- `src/controllers`: Request logic
- `src/models`: Mongoose schemas
- `src/routes`: API route definitions

## Deployment
- Ready for Vercel/Netlify Functions (entry point `src/server.js` or generic request handler).
