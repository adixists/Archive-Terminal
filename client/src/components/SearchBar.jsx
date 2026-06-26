/**
 * =============================================================================
 * SEARCHBAR COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * A styled search input with:
 * ● SVG magnifying glass icon on the left
 * ● Neon cyan border glow on focus
 * ● Monospace font with terminal-style placeholder text
 * ● Full width layout with max-width constraint for readability
 *
 * Props:
 * ──────
 * ● searchQuery    — Current search string (controlled input)
 * ● setSearchQuery — State setter to update the query on each keystroke
 *
 * The search is handled in real-time as the user types, filtering
 * resources in the Dashboard component via case-insensitive title match.
 * =============================================================================
 */

import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    /* ─── Search Container ──────────────────────────────────────────────────
     * Wraps the icon and input in a relative container so the icon can be
     * absolutely positioned inside the input area. Max width keeps it
     * readable on ultra-wide screens. */
    <div className="relative w-full max-w-2xl">
      {/* ─── Search Icon (SVG Magnifying Glass) ─────────────────────────── */}
      {/* Positioned absolutely on the left side of the input. Uses a muted
       * color that brightens when the input is focused (via group-focus). */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          className="w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Circle of the magnifying glass */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* ─── Search Input ────────────────────────────────────────────────── */}
      {/* Uses the .input-neon class for base styling, with extra left padding
       * to accommodate the search icon. The placeholder uses terminal-style
       * syntax with a ">" prompt character for the cyberpunk feel. */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="> Search archives..."
        className="input-neon pl-12 pr-4 py-3 w-full"
        aria-label="Search resources"
      />

      {/* ─── Clear Button ────────────────────────────────────────────────── */}
      {/* Only visible when there's text in the search field. Clicking it
       * resets the search query to an empty string. */}
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted hover:text-neon-cyan transition-colors duration-200"
          aria-label="Clear search"
        >
          {/* "X" icon for clearing */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
