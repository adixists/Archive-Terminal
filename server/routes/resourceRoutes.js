// =============================================================================
// RESOURCE ROUTES — routes/resourceRoutes.js
// =============================================================================
// Defines all RESTful API endpoints for the Resource entity.
//
// Route summary:
//   GET    /            →  Fetch all resources (newest first)
//   GET    /:id         →  Fetch a single resource by its MongoDB _id
//   POST   /            →  Create a new resource
//   PUT    /:id         →  Update an existing resource by _id
//   DELETE /:id         →  Delete a resource by _id
//
// Every handler is wrapped in try/catch so unhandled errors return a clean
// 500 response instead of crashing the server.
// =============================================================================

const express = require('express');
const router = express.Router();

// Import the Resource model to interact with the "resources" collection
const Resource = require('../models/Resource');

// =============================================================================
// GET  /api/resources
// =============================================================================
// Returns an array of ALL resources, sorted by `createdAt` in descending order
// (most recent first).  No pagination is implemented — suitable for small to
// moderate datasets typical of a portfolio/demo app.
// =============================================================================

router.get('/', async (req, res) => {
  try {
    // Fetch every document, newest first
    const resources = await Resource.find().sort({ createdAt: -1 });

    // Respond with the array (may be empty if no resources exist yet)
    res.json(resources);
  } catch (error) {
    // Something went wrong at the database level
    res.status(500).json({ message: 'Server error while fetching resources', error: error.message });
  }
});

// =============================================================================
// GET  /api/resources/:id
// =============================================================================
// Returns a single resource identified by its MongoDB ObjectId.
// Responds with 404 if no document matches the given ID.
// =============================================================================

router.get('/:id', async (req, res) => {
  try {
    // Attempt to find the resource by the ID in the URL parameter
    const resource = await Resource.findById(req.params.id);

    // If findById returns null the ID didn't match any document
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Return the found document
    res.json(resource);
  } catch (error) {
    // Catches CastErrors (invalid ObjectId format) and other DB errors
    res.status(500).json({ message: 'Server error while fetching resource', error: error.message });
  }
});

// =============================================================================
// POST  /api/resources
// =============================================================================
// Creates a new resource from the JSON body of the request.
// Mongoose validators (required, enum, etc.) run automatically on save.
// On success the newly created document is returned with HTTP 201 (Created).
// =============================================================================

router.post('/', async (req, res) => {
  try {
    // Build a new Resource instance from the request body fields
    const resource = new Resource(req.body);

    // Persist the document to MongoDB (validators execute here)
    const savedResource = await resource.save();

    // 201 = Created — return the full document including generated _id
    res.status(201).json(savedResource);
  } catch (error) {
    // Validation errors (missing required fields, invalid enum) land here
    res.status(500).json({ message: 'Server error while creating resource', error: error.message });
  }
});

// =============================================================================
// PUT  /api/resources/:id
// =============================================================================
// Updates an existing resource identified by its MongoDB ObjectId.
// Options:
//   • `new: true`           — return the *updated* document, not the old one
//   • `runValidators: true` — re-run schema validators on the updated fields
// Responds with 404 if the ID doesn't match any document.
// =============================================================================

router.put('/:id', async (req, res) => {
  try {
    // Find the document by ID and apply the updates from the request body
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,   // the document to update
      req.body,        // the fields to change
      {
        new: true,           // return the modified document
        runValidators: true, // enforce schema validations on update
      },
    );

    // If null is returned, no document matched the provided ID
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Return the freshly updated document
    res.json(updatedResource);
  } catch (error) {
    // Catches validation errors and other DB-level issues
    res.status(500).json({ message: 'Server error while updating resource', error: error.message });
  }
});

// =============================================================================
// DELETE  /api/resources/:id
// =============================================================================
// Permanently removes a resource from the database.
// Responds with 404 if no document matches the given ID.
// On success returns a confirmation message.
// =============================================================================

router.delete('/:id', async (req, res) => {
  try {
    // Attempt to find and delete the document in a single operation
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);

    // If null, the ID didn't correspond to any existing document
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Confirm the deletion to the client
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    // Handle unexpected database errors
    res.status(500).json({ message: 'Server error while deleting resource', error: error.message });
  }
});

// Export the router so it can be mounted in server.js
module.exports = router;
