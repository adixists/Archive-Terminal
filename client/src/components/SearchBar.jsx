/**
 * =============================================================================
 * SEARCH BAR — ARCHIVE TERMINAL v2.0
 * =============================================================================
 * Terminal-style search with blinking cursor effect when empty and a neon
 * glow focus animation. Shows a clear (×) button when text is present.
 */

import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-2xl">

      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <svg
          className="w-4 h-4 transition-colors duration-300"
          style={{ color: searchQuery ? '#00f0ff' : '#44445a' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="> search_archives..."
        className="input-neon pl-11 pr-10"
        style={{
          background: 'rgba(8, 8, 16, 0.7)',
          borderRadius: '12px',
        }}
        aria-label="Search resources by title"
      />

      {/* Clear button */}
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200"
          style={{ color: '#44445a' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ff3366'}
          onMouseLeave={e => e.currentTarget.style.color = '#44445a'}
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Result count badge */}
      {searchQuery && (
        <div
          className="absolute -bottom-6 left-0 font-mono text-[0.65rem] text-text-muted"
          style={{ letterSpacing: '0.05em' }}
        >
          {'>'} searching for <span className="text-neon-cyan">"{searchQuery}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
