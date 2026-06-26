/**
 * =============================================================================
 * NAVBAR COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * Fixed top navigation bar with:
 * ● 3D floating "AT" logo with animated neon glow and perspective transforms
 * ● "ARCHIVE TERMINAL" title in monospace with neon text-shadow effect
 * ● Flavor text "// DIGITAL LIBRARY v2.0" for immersive cyberpunk branding
 * ● Glass background with bottom border glow for depth separation
 *
 * The navbar is pinned to the top with a high z-index so it stays visible
 * above all other content during scroll. The glass effect creates a beautiful
 * frosted backdrop when content scrolls beneath it.
 * =============================================================================
 */

import React from 'react';

const Navbar = () => {
  return (
    /* ─── Fixed Top Bar ─────────────────────────────────────────────────────
     * position: fixed keeps it pinned to viewport top
     * z-50 ensures it floats above all page content
     * glass-strong gives frosted glass background with strong blur
     * Bottom border uses a gradient from cyan to transparent for a glow line
     * ──────────────────────────────────────────────────────────────────── */
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 lg:px-8"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.12)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(0, 240, 255, 0.08)',
      }}
    >
      {/* ─── Left Section: Logo + Title ─────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* 3D "AT" Logo — uses the .logo-3d class from App.css for
         * perspective transforms, gradient background, animated float,
         * and layered glow effects. Hovering changes the rotation axis. */}
        <div className="logo-3d" aria-label="Archive Terminal Logo">
          AT
        </div>

        {/* Title block — monospace font with neon text glow */}
        <div className="flex flex-col">
          {/* Main title with neon text-shadow for the glowing effect */}
          <h1
            className="font-mono text-lg font-bold tracking-wider neon-text leading-tight"
          >
            ARCHIVE TERMINAL
          </h1>
          {/* Subtle tagline below the main title for extra flavor */}
          <span className="font-mono text-[0.6rem] text-text-muted tracking-widest uppercase">
            Resource Management System
          </span>
        </div>
      </div>

      {/* ─── Right Section: Flavor Text ─────────────────────────────────── */}
      {/* This decorative text adds to the cyberpunk terminal aesthetic.
       * Hidden on small screens to keep mobile layout clean. */}
      <div className="hidden md:flex items-center gap-4">
        <span className="font-mono text-xs text-text-muted tracking-wide">
          {'// DIGITAL LIBRARY v2.0'}
        </span>
        {/* Decorative separator dot */}
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: '#00ff88',
            boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
          }}
          title="System Online"
        />
      </div>
    </nav>
  );
};

export default Navbar;
