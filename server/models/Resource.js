// =============================================================================
// RESOURCE MODEL — models/Resource.js
// =============================================================================
// Defines the Mongoose schema and model for a "Resource" document.
// Resources are the core data entity of Archive Terminal — each one represents
// an item such as an AI Model, Code Snippet, Research Paper, or Tool that a
// user can create, read, update, and delete through the API.
// =============================================================================

const mongoose = require('mongoose');

// -----------------------------------------------------------------------------
// Schema Definition
// -----------------------------------------------------------------------------
// Each field includes validation rules and sensible defaults so the database
// stays consistent even if the client omits optional values.
// -----------------------------------------------------------------------------

const resourceSchema = new mongoose.Schema({
  // ---- title ----------------------------------------------------------------
  // A short, human-readable name for the resource.
  // `trim` removes leading/trailing whitespace before saving.
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },

  // ---- category -------------------------------------------------------------
  // Classifies the resource into one of four predefined buckets.
  // The `enum` validator rejects any value not in this list.
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['AI Model', 'Code Snippet', 'Research Paper', 'Tool', 'Other'],
      message: '{VALUE} is not a valid category',
    },
  },

  // ---- description ----------------------------------------------------------
  // A longer, free-text explanation of what the resource is or does.
  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  // ---- status ---------------------------------------------------------------
  // Tracks the lifecycle stage of the resource.
  // Defaults to 'Active' when a new resource is created.
  status: {
    type: String,
    enum: {
      values: ['Archived', 'Active', 'In Review'],
      message: '{VALUE} is not a valid status',
    },
    default: 'Active',
  },

  // ---- createdAt ------------------------------------------------------------
  // Timestamp auto-populated with the current date/time on creation.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// -----------------------------------------------------------------------------
// Model Export
// -----------------------------------------------------------------------------
// Compile the schema into a Model and export it.  Mongoose will automatically
// create (or reuse) a "resources" collection in MongoDB for this model.
// -----------------------------------------------------------------------------

module.exports = mongoose.model('Resource', resourceSchema);
