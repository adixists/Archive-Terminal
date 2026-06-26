// =============================================================================
// DATABASE CONFIGURATION — config/db.js
// =============================================================================
// This module handles the MongoDB connection using Mongoose.
// It exports a single async function, `connectDB`, which is called once at
// server startup (in server.js) to establish the database connection.
// =============================================================================

const mongoose = require('mongoose');

/**
 * connectDB
 * ---------
 * Connects to the MongoDB instance specified by the MONGO_URI environment
 * variable. On success it logs the host name of the connected database server.
 * On failure it logs the error message and terminates the process with exit
 * code 1 so the server doesn't run without a database.
 *
 * @async
 * @returns {void}
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the connection string from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a confirmation message that includes the database host
    console.log(`[Archive Terminal] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error details so the developer can diagnose the issue
    console.error(`[Archive Terminal] Database connection error: ${error.message}`);

    // Exit with a failure code — the server cannot function without a DB
    process.exit(1);
  }
};

// Export the function so server.js can call it during startup
module.exports = connectDB;
