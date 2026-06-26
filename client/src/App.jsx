/**
 * =============================================================================
 * APP COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * Root application component that sets up:
 * ● React Router for client-side navigation
 * ● Fixed Navbar visible on all pages
 * ● Main content area with top padding (to clear the fixed navbar)
 * ● Route configuration: "/" renders the Dashboard
 *
 * The layout uses a max-width container with responsive horizontal padding
 * to keep content centered and readable on all screen sizes.
 *
 * Future routes (e.g., /resource/:id for detail view) can be added to
 * the Routes block as the application grows.
 * =============================================================================
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    /* ─── Router Wrapper ──────────────────────────────────────────────────
     * BrowserRouter enables HTML5 history-based routing (clean URLs
     * without hash fragments). All route definitions live inside. */
    <Router>
      {/* Full-height dark background container */}
      <div className="min-h-screen bg-dark-bg">
        {/* ─── Fixed Navigation Bar ────────────────────────────────────── */}
        {/* Always visible at the top of the viewport, independent of
         * scroll position. See Navbar.jsx for implementation details. */}
        <Navbar />

        {/* ─── Main Content Area ───────────────────────────────────────── */}
        {/* pt-20 provides clearance below the fixed 68px navbar.
         * max-w-7xl centers the content with a reasonable max width.
         * Responsive padding: 16px mobile → 24px sm → 32px lg */}
        <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Routes>
            {/* Dashboard — the main CRUD interface */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
