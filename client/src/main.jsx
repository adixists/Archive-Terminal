/**
 * =============================================================================
 * MAIN ENTRY POINT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * Standard React 18+ entry point that mounts the root App component
 * into the #root DOM element. Uses StrictMode for development warnings
 * about deprecated patterns and side-effect detection.
 *
 * Imports:
 * ● index.css — Tailwind CSS v4 with custom theme tokens
 * ● App — Root component with router, navbar, and routes
 * =============================================================================
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Mount the React application into the #root element defined in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
