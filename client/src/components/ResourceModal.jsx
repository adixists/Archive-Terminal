/**
 * =============================================================================
 * RESOURCE MODAL COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * A full-screen overlay modal for creating and editing resources.
 *
 * Features:
 * ● Dark overlay with backdrop blur for depth
 * ● Centered glass panel with slide-up entrance animation
 * ● Dynamic title: "// NEW RESOURCE" or "// EDIT RESOURCE"
 * ● Form fields with neon-styled inputs:
 *   - Title (text input)
 *   - Category (select: AI Model, Code Snippet, Research Paper, Tool)
 *   - Description (textarea, 4 rows)
 *   - Status (select: Active, Archived, In Review)
 * ● "EXECUTE" submit button with cyan glow
 * ● "ABORT" cancel button with muted styling
 * ● Closes on overlay click (click outside modal)
 * ● Prevents default form submission
 * ● Auto-populates form when editing an existing resource
 *
 * Props:
 * ──────
 * ● isOpen   — Boolean controlling modal visibility
 * ● onClose  — Callback to close the modal
 * ● onSubmit — Callback with form data when user submits
 * ● resource — Null for create mode, populated object for edit mode
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';

/**
 * Default empty form state for creating a new resource.
 * All fields start blank/default so the user fills them in.
 */
const EMPTY_FORM = {
  title: '',
  category: 'AI Model',
  description: '',
  status: 'Active',
};

const ResourceModal = ({ isOpen, onClose, onSubmit, resource }) => {
  // ─── Local Form State ──────────────────────────────────────────────────
  // Tracks the current values of all form fields. Initialized from the
  // resource prop (if editing) or from EMPTY_FORM (if creating).
  const [formData, setFormData] = useState(EMPTY_FORM);

  // ─── Sync Form Data with Resource Prop ─────────────────────────────────
  // When the modal opens for editing, populate the form with existing data.
  // When it opens for creating (resource is null), reset to empty state.
  useEffect(() => {
    if (resource) {
      // Edit mode: populate with existing resource data
      setFormData({
        title: resource.title || '',
        category: resource.category || 'AI Model',
        description: resource.description || '',
        status: resource.status || 'Active',
      });
    } else {
      // Create mode: reset to blank form
      setFormData(EMPTY_FORM);
    }
  }, [resource, isOpen]); // Re-run when resource or modal visibility changes

  /**
   * Handles changes to any form input/select/textarea.
   * Uses computed property names to update the correct field
   * based on the input's `name` attribute.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission.
   * Prevents the default browser form action, calls the parent's
   * onSubmit callback with the current form data, then closes the modal.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // ─── Early Return if Closed ────────────────────────────────────────────
  // Don't render anything when the modal is not open
  if (!isOpen) return null;

  // ─── Determine if we're in edit or create mode ─────────────────────────
  const isEditing = !!resource;

  return (
    /* ─── Overlay Backdrop ──────────────────────────────────────────────────
     * Covers the entire viewport with a semi-transparent dark layer.
     * Clicking the overlay (but not the modal content) closes the modal.
     * Uses .modal-overlay from App.css for fade-in animation. */
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* ─── Modal Panel ──────────────────────────────────────────────────
       * Glass card that slides up into view. stopPropagation prevents
       * clicks inside the modal from triggering the overlay's onClick. */}
      <div
        className="glass-strong w-full max-w-lg mx-4 p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Modal Header ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="modal-title"
            className="font-mono text-lg font-bold text-neon-cyan tracking-wider"
          >
            {isEditing ? '// EDIT RESOURCE' : '// NEW RESOURCE'}
          </h2>

          {/* Close button (X) — top right corner */}
          <button
            onClick={onClose}
            className="text-text-muted hover:text-neon-cyan transition-colors duration-200 p-1"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ─── Form ───────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-2 tracking-wider uppercase">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter resource title..."
              className="input-neon"
              required
              autoFocus
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-2 tracking-wider uppercase">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-neon cursor-pointer"
            >
              <option value="AI Model">AI Model</option>
              <option value="Code Snippet">Code Snippet</option>
              <option value="Research Paper">Research Paper</option>
              <option value="Tool">Tool</option>
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-2 tracking-wider uppercase">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe this resource..."
              rows={4}
              className="input-neon resize-none scrollbar-neon"
            />
          </div>

          {/* Status Select */}
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-2 tracking-wider uppercase">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-neon cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
              <option value="In Review">In Review</option>
            </select>
          </div>

          {/* ─── Action Buttons ─────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-border">
            {/* Cancel / Abort button — muted, no glow */}
            <button
              type="button"
              onClick={onClose}
              className="btn-neon !bg-transparent !border-dark-border !text-text-secondary hover:!text-text-primary hover:!border-text-muted"
            >
              ABORT
            </button>

            {/* Submit / Execute button — cyan glow for primary action */}
            <button
              type="submit"
              className="btn-neon btn-cyan"
            >
              {/* Terminal prompt icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              EXECUTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceModal;
