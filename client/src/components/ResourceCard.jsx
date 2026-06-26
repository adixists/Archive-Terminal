/**
 * =============================================================================
 * RESOURCE CARD COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * Displays a single resource as a glassmorphic card with:
 * ● Color-coded category badge (AI Model=cyan, Code Snippet=purple,
 *   Research Paper=amber, Tool=green)
 * ● Status pill (Active=green, Archived=gray, In Review=amber)
 * ● Title in bold monospace with truncation
 * ● Description with 3-line clamp for consistent card heights
 * ● Footer with formatted date, edit (cyan) and delete (red) buttons
 * ● Smooth hover transitions: lift, border glow, shadow expansion
 *
 * Props:
 * ──────
 * ● resource — The resource object { _id, title, category, description,
 *              status, createdAt }
 * ● onEdit   — Callback when edit button is clicked, receives full resource
 * ● onDelete — Callback when delete button is clicked, receives full resource
 * =============================================================================
 */

import React from 'react';

/**
 * Maps category names to their visual styling.
 * Each category gets a unique neon color for its badge so users can
 * quickly scan the grid and identify resource types at a glance.
 */
const CATEGORY_STYLES = {
  'AI Model': {
    bg: 'rgba(0, 240, 255, 0.1)',
    color: '#00f0ff',
    border: 'rgba(0, 240, 255, 0.3)',
  },
  'Code Snippet': {
    bg: 'rgba(168, 85, 247, 0.1)',
    color: '#a855f7',
    border: 'rgba(168, 85, 247, 0.3)',
  },
  'Research Paper': {
    bg: 'rgba(255, 170, 0, 0.1)',
    color: '#ffaa00',
    border: 'rgba(255, 170, 0, 0.3)',
  },
  'Tool': {
    bg: 'rgba(0, 255, 136, 0.1)',
    color: '#00ff88',
    border: 'rgba(0, 255, 136, 0.3)',
  },
};

/**
 * Maps status names to their corresponding CSS class.
 * These classes are defined in App.css with full pill styling.
 */
const STATUS_CLASSES = {
  'Active': 'status-active',
  'Archived': 'status-archived',
  'In Review': 'status-review',
};

/**
 * Formats a date string into a human-readable format.
 * Example: "2024-01-15T..." → "Jan 15, 2024"
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const ResourceCard = ({ resource, onEdit, onDelete }) => {
  // Look up the category style, fallback to cyan if unknown
  const catStyle = CATEGORY_STYLES[resource.category] || CATEGORY_STYLES['AI Model'];
  // Look up the status class, fallback to active
  const statusClass = STATUS_CLASSES[resource.status] || 'status-active';

  return (
    /* ─── Card Container ────────────────────────────────────────────────────
     * .glass provides the frosted glass background
     * .card-hover adds the lift + glow on hover
     * Flex column layout ensures footer stays at the bottom */
    <div className="glass card-hover flex flex-col h-full p-5 group">
      {/* ─── Top Row: Category Badge + Status Pill ────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        {/* Category badge with dynamic color based on category type */}
        <span
          className="category-badge"
          style={{
            background: catStyle.bg,
            color: catStyle.color,
            border: `1px solid ${catStyle.border}`,
          }}
        >
          {/* Small decorative dot before the category name */}
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: catStyle.color }}
          />
          {resource.category}
        </span>

        {/* Status pill using the mapped CSS class */}
        <span className={statusClass}>
          {/* Pulsing dot for Active status, static for others */}
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{
              background: resource.status === 'Active' ? '#00ff88' :
                          resource.status === 'In Review' ? '#ffaa00' : '#8888aa',
              boxShadow: resource.status === 'Active'
                ? '0 0 6px rgba(0, 255, 136, 0.6)'
                : 'none',
            }}
          />
          {resource.status}
        </span>
      </div>

      {/* ─── Title ───────────────────────────────────────────────────────── */}
      {/* Monospace bold title with subtle color transition on card hover */}
      <h3 className="font-mono text-base font-bold text-text-primary mb-2 group-hover:text-neon-cyan transition-colors duration-300 leading-snug">
        {resource.title}
      </h3>

      {/* ─── Description ─────────────────────────────────────────────────── */}
      {/* 3-line clamp keeps card heights consistent across the grid.
       * The .line-clamp-3 class uses -webkit-line-clamp for truncation. */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow line-clamp-3">
        {resource.description || 'No description provided.'}
      </p>

      {/* ─── Footer: Date + Action Buttons ───────────────────────────────── */}
      {/* mt-auto pushes the footer to the bottom of the flex container */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-border">
        {/* Formatted creation date */}
        <span className="font-mono text-xs text-text-muted">
          {formatDate(resource.createdAt)}
        </span>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Edit button — cyan accent, triggers edit modal */}
          <button
            onClick={() => onEdit(resource)}
            className="btn-neon btn-cyan !py-1.5 !px-3 !text-[0.7rem]"
            aria-label={`Edit ${resource.title}`}
          >
            {/* Pencil icon */}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          {/* Delete button — red accent, triggers confirm modal */}
          <button
            onClick={() => onDelete(resource)}
            className="btn-neon btn-red !py-1.5 !px-3 !text-[0.7rem]"
            aria-label={`Delete ${resource.title}`}
          >
            {/* Trash icon */}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Del
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
