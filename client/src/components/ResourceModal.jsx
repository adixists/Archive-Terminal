/**
 * =============================================================================
 * RESOURCE MODAL — ARCHIVE TERMINAL v2.0
 * =============================================================================
 * Create / Edit form modal with animated gradient border header,
 * neon-styled form controls, and "Other" category option.
 */

import React, { useState, useEffect } from 'react';

const EMPTY_FORM = {
  title: '',
  category: 'AI Model',
  description: '',
  status: 'Active',
};

const CATEGORIES = ['AI Model', 'Code Snippet', 'Research Paper', 'Tool', 'Other'];
const STATUSES   = ['Active', 'Archived', 'In Review'];

const ResourceModal = ({ isOpen, onClose, onSubmit, resource }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const isEditing = !!resource;

  /* Populate form when editing */
  useEffect(() => {
    if (resource) {
      setFormData({
        title:       resource.title       || '',
        category:    resource.category    || 'AI Model',
        description: resource.description || '',
        status:      resource.status      || 'Active',
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [resource, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal panel */}
      <div
        className="glass-strong w-full max-w-lg mx-4 overflow-hidden animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient accent bar at top */}
        <div
          className="h-[3px] w-full"
          style={{ background: 'linear-gradient(90deg, #00f0ff, #a855f7, #ff00cc)' }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="modal-title" className="font-mono text-lg font-bold tracking-wider">
                <span className="gradient-text">
                  {isEditing ? '// EDIT_RESOURCE' : '// NEW_RESOURCE'}
                </span>
              </h2>
              <p className="font-mono text-[0.65rem] text-text-muted mt-1">
                {isEditing
                  ? 'Modify the fields below and execute to save changes.'
                  : 'Fill in the fields below to add to the archive.'}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ color: '#44445a', border: '1px solid rgba(30,30,58,0.8)' }}
              onMouseEnter={e => { e.currentTarget.style.color='#ff3366'; e.currentTarget.style.borderColor='rgba(255,51,102,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='#44445a'; e.currentTarget.style.borderColor='rgba(30,30,58,0.8)'; }}
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block font-mono text-[0.68rem] text-text-secondary mb-2 tracking-widest uppercase">
                <span className="text-neon-cyan mr-1">►</span> Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. GPT-4 Vision, React hooks..."
                className="input-neon"
                required
                autoFocus
              />
            </div>

            {/* Category + Status — side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[0.68rem] text-text-secondary mb-2 tracking-widest uppercase">
                  <span className="text-neon-purple mr-1">►</span> Category
                </label>
                <select name="category" value={formData.category} onChange={handleChange} className="input-neon cursor-pointer">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[0.68rem] text-text-secondary mb-2 tracking-widest uppercase">
                  <span className="text-neon-green mr-1">►</span> Status
                </label>
                <select name="status" value={formData.status} onChange={handleChange} className="input-neon cursor-pointer">
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-mono text-[0.68rem] text-text-secondary mb-2 tracking-widest uppercase">
                <span className="text-neon-amber mr-1">►</span> Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this resource — what it does, why it's useful..."
                rows={4}
                className="input-neon resize-none scrollbar-neon"
              />
            </div>

            {/* Buttons */}
            <div
              className="flex items-center justify-end gap-3 pt-4"
              style={{ borderTop: '1px solid rgba(30,30,58,0.8)' }}
            >
              <button
                type="button"
                onClick={onClose}
                className="btn-neon !text-text-secondary !border-dark-border !bg-transparent hover:!text-text-primary"
                style={{ border: '1px solid rgba(30,30,58,0.8)' }}
              >
                ABORT
              </button>

              <button type="submit" className="btn-neon btn-cyan">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                EXECUTE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
