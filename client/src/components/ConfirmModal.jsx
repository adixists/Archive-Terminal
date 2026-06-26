/**
 * =============================================================================
 * CONFIRM MODAL COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * A confirmation dialog shown before permanently deleting a resource.
 *
 * Features:
 * ● Full-screen dark overlay with backdrop blur
 * ● Compact centered glass panel with slide-up entrance
 * ● Animated warning icon with pulsing red/amber glow
 * ● Clear warning text showing the resource title being deleted
 * ● "// This operation cannot be undone." disclaimer
 * ● "DELETE" button with red glow and "CANCEL" button (muted)
 * ● Closes on overlay click
 *
 * This modal provides a safety net to prevent accidental deletions,
 * following the UX pattern of requiring explicit confirmation for
 * destructive actions.
 *
 * Props:
 * ──────
 * ● isOpen        — Boolean controlling modal visibility
 * ● onClose       — Callback to dismiss the modal without deleting
 * ● onConfirm     — Callback to confirm and execute the deletion
 * ● resourceTitle — Title of the resource about to be deleted
 * =============================================================================
 */

import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, resourceTitle }) => {
  // ─── Early Return if Closed ────────────────────────────────────────────
  if (!isOpen) return null;

  return (
    /* ─── Overlay Backdrop ──────────────────────────────────────────────────
     * Same overlay pattern as ResourceModal — full viewport coverage,
     * click-to-close, with a semi-transparent dark background. */
    <div
      className="modal-overlay"
      onClick={onClose}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
    >
      {/* ─── Confirm Panel ────────────────────────────────────────────────
       * Smaller max-width than the resource modal since this is just
       * a confirmation prompt. Uses slide-up animation on entrance. */}
      <div
        className="glass-strong w-full max-w-md mx-4 p-6 animate-slide-up text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Warning Icon ────────────────────────────────────────────── */}
        {/* Large animated warning symbol with pulsing red glow.
         * The animate-pulse-glow class creates a breathing effect
         * that draws the user's attention to the destructive nature. */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-glow"
            style={{
              background: 'rgba(255, 51, 102, 0.1)',
              border: '2px solid rgba(255, 51, 102, 0.4)',
              boxShadow: '0 0 25px rgba(255, 51, 102, 0.2)',
            }}
          >
            {/* Exclamation triangle SVG icon */}
            <svg
              className="w-8 h-8 text-neon-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* ─── Warning Title ───────────────────────────────────────────── */}
        <h3
          id="confirm-title"
          className="font-mono text-lg font-bold text-neon-red tracking-wider mb-3"
        >
          CONFIRM DELETION
        </h3>

        {/* ─── Warning Description ─────────────────────────────────────── */}
        <p
          id="confirm-description"
          className="text-text-secondary text-sm mb-2"
        >
          This action will permanently remove:
        </p>

        {/* Resource title displayed prominently so the user knows
         * exactly which resource they're about to delete */}
        <p className="font-mono text-neon-cyan font-semibold text-base mb-4 px-4 py-2 rounded-lg"
          style={{
            background: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid rgba(0, 240, 255, 0.15)',
          }}
        >
          "{resourceTitle}"
        </p>

        {/* Irreversibility disclaimer */}
        <p className="font-mono text-xs text-text-muted mb-6">
          {'// This operation cannot be undone.'}
        </p>

        {/* ─── Action Buttons ──────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3">
          {/* Cancel button — dismisses without any action */}
          <button
            onClick={onClose}
            className="btn-neon !bg-transparent !border-dark-border !text-text-secondary hover:!text-text-primary hover:!border-text-muted"
          >
            CANCEL
          </button>

          {/* Delete button — confirms the deletion with red glow */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-neon btn-red"
          >
            {/* Trash icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
