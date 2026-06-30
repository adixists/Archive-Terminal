/**
 * =============================================================================
 * NAVBAR — ARCHIVE TERMINAL v2.0
 * =============================================================================
 * Features an animated orbital logo: three concentric spinning rings around
 * a pulsing cyan core — like an atom or a solar system — giving the brand
 * a sci-fi "live system" feeling. Title uses an animated gradient text effect.
 */

import React from 'react';

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 lg:px-10"
      style={{
        background: 'rgba(8, 8, 16, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.08)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(0,240,255,0.06)',
      }}
    >
      {/* ── Left: Orbital Logo + Title ─────────────────────────────────── */}
      <div className="flex items-center gap-4">

        {/* Orbital Logo — three spinning rings + glowing core */}
        <div className="logo-orbital" aria-label="Archive Terminal — Orbital Logo">
          <div className="logo-ring logo-ring-1" />
          <div className="logo-ring logo-ring-2" />
          <div className="logo-ring logo-ring-3" />
          <div className="logo-core" />
        </div>

        {/* Title block */}
        <div className="flex flex-col">
          <h1 className="font-mono font-bold tracking-widest leading-none text-lg">
            <span className="gradient-text">ARCHIVE</span>
            <span className="text-text-primary"> TERMINAL</span>
          </h1>
          <span className="font-mono text-[0.58rem] text-text-muted tracking-[0.2em] uppercase mt-0.5">
            // v2.0 · digital library
          </span>
        </div>
      </div>

      {/* ── Right: Status indicator ────────────────────────────────────── */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Live system indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.05)' }}>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#00ff88',
              boxShadow: '0 0 8px rgba(0, 255, 136, 0.8)',
              animation: 'corePulse 2s ease-in-out infinite',
            }}
          />
          <span className="font-mono text-[0.62rem] text-neon-green tracking-widest">ONLINE</span>
        </div>

        <span className="font-mono text-xs text-text-muted hidden md:block">
          {'// DIGITAL LIBRARY v2.0'}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
