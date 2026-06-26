// =============================================================================
// ENTRY POINT — server.js
// =============================================================================
// This is the main entry file for the Archive Terminal backend.  It:
//   1. Loads environment variables from .env
//   2. Creates an Express application
//   3. Configures middleware (CORS, JSON body parser)
//   4. Mounts the API routes
//   5. Connects to MongoDB
//   6. Starts the HTTP server on the configured port
// =============================================================================

// -----------------------------------------------------------------------------
// 1.  ENVIRONMENT CONFIGURATION
// -----------------------------------------------------------------------------
// dotenv reads the .env file in the project root and injects its key-value
// pairs into `process.env`.  This MUST be called before any code that reads
// environment variables (e.g., the database module).
// -----------------------------------------------------------------------------

const dotenv = require('dotenv');
dotenv.config();

// -----------------------------------------------------------------------------
// 2.  IMPORTS
// -----------------------------------------------------------------------------
// • express  — web framework for building the REST API
// • cors     — middleware to handle Cross-Origin Resource Sharing headers
// • connectDB — our custom function that establishes the MongoDB connection
// • resourceRoutes — Express Router with all /api/resources endpoints
// -----------------------------------------------------------------------------

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const resourceRoutes = require('./routes/resourceRoutes');

// -----------------------------------------------------------------------------
// 3.  APP INITIALISATION
// -----------------------------------------------------------------------------
// Create the core Express application instance.
// Read the port from environment variables, falling back to 5000 if unset.
// -----------------------------------------------------------------------------

const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------------------------------------------------------
// 4.  MIDDLEWARE
// -----------------------------------------------------------------------------
// Middleware functions run on every incoming request, in the order they are
// registered, before the route handlers execute.
//
// • cors   — Allows the Vite-powered React frontend (running on port 5173) to
//            make requests to this API.  `credentials: true` permits cookies
//            and auth headers to be sent cross-origin.
//
// • express.json() — Parses incoming JSON request bodies and exposes the
//                    result on `req.body`.  Essential for POST and PUT routes.
// -----------------------------------------------------------------------------

app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server default URL
    credentials: true,              // allow cookies / auth headers
  }),
);

app.use(express.json());

// -----------------------------------------------------------------------------
// 5.  ROUTES
// -----------------------------------------------------------------------------
// Mount the resource router at /api/resources.  All routes defined inside
// resourceRoutes.js are now accessible under that path prefix:
//   GET    /api/resources
//   GET    /api/resources/:id
//   POST   /api/resources
//   PUT    /api/resources/:id
//   DELETE /api/resources/:id
// -----------------------------------------------------------------------------

app.use('/api/resources', resourceRoutes);

// A simple root route to verify the API is reachable (health-check endpoint)
app.get('/', (req, res) => {
  res.json({ message: 'Archive Terminal API is online.' });
});

// -----------------------------------------------------------------------------
// 6.  START THE SERVER
// -----------------------------------------------------------------------------
// First connect to MongoDB.  Only after a successful connection do we start
// listening for HTTP requests — this prevents the API from accepting traffic
// when the database is unreachable.
// -----------------------------------------------------------------------------

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Archive Terminal] Server is running on port ${PORT}`);
  });
});
