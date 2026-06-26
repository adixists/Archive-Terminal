/**
 * =============================================================================
 * API SERVICE — ARCHIVE TERMINAL
 * =============================================================================
 *
 * Centralized API layer using Axios for all CRUD operations against the
 * Express backend. The baseURL is set to '/api' which gets proxied to
 * http://localhost:5000/api by Vite's dev server proxy configuration.
 *
 * This abstraction keeps HTTP logic out of components and provides a
 * single place to configure headers, interceptors, and error handling.
 *
 * Available Operations:
 * ─────────────────────
 * ● getResources()      — GET    /api/resources       — Fetch all resources
 * ● getResource(id)     — GET    /api/resources/:id   — Fetch single resource
 * ● createResource(data)— POST   /api/resources       — Create new resource
 * ● updateResource(id)  — PUT    /api/resources/:id   — Update existing resource
 * ● deleteResource(id)  — DELETE /api/resources/:id   — Remove a resource
 * =============================================================================
 */

import axios from 'axios';

// ─── Axios Instance ─────────────────────────────────────────────────────────
// Create a pre-configured axios instance so we don't repeat baseURL/headers
// in every API call. The proxy in vite.config.js forwards /api → port 5000.
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── CRUD Operations ────────────────────────────────────────────────────────

/** Fetch all resources from the archive */
export const getResources = () => API.get('/resources');

/** Fetch a single resource by its MongoDB ObjectId */
export const getResource = (id) => API.get(`/resources/${id}`);

/** Create a new resource entry in the archive */
export const createResource = (data) => API.post('/resources', data);

/** Update an existing resource by its ID (full replacement) */
export const updateResource = (id, data) => API.put(`/resources/${id}`, data);

/** Permanently delete a resource from the archive */
export const deleteResource = (id) => API.delete(`/resources/${id}`);

export default API;
