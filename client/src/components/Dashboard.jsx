/**
 * =============================================================================
 * DASHBOARD COMPONENT — ARCHIVE TERMINAL
 * =============================================================================
 *
 * The main page component and heart of the application. Orchestrates all
 * CRUD operations and manages the full lifecycle of resource management.
 *
 * Features:
 * ─────────
 * ● Fetches all resources from the API on mount
 * ● Real-time search filtering by title (case-insensitive)
 * ● Stats bar showing counts by status (Active, Archived, In Review)
 * ● Responsive grid layout: 1 col mobile → 2 cols md → 3 cols lg
 * ● Create new resources via floating "ADD RESOURCE" button
 * ● Edit existing resources via card edit button
 * ● Delete with confirmation modal
 * ● Loading state with animated skeleton cards
 * ● Empty state with styled message
 *
 * State Management:
 * ─────────────────
 * ● resources       — Array of all resources from the API
 * ● loading         — Boolean for loading state during API calls
 * ● searchQuery     — Current search filter text
 * ● isModalOpen     — Controls ResourceModal visibility
 * ● isConfirmOpen   — Controls ConfirmModal visibility
 * ● selectedResource — Resource being edited (null for create)
 * ● resourceToDelete — Resource pending deletion
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from '../services/api';
import SearchBar from './SearchBar';
import ResourceCard from './ResourceCard';
import ResourceModal from './ResourceModal';
import ConfirmModal from './ConfirmModal';

const Dashboard = () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE DECLARATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /** All resources fetched from the backend */
  const [resources, setResources] = useState([]);

  /** Loading indicator — true during API calls */
  const [loading, setLoading] = useState(true);

  /** Search query for filtering resources by title */
  const [searchQuery, setSearchQuery] = useState('');

  /** Controls the create/edit modal visibility */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** Controls the delete confirmation modal visibility */
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /** The resource currently being edited (null = create mode) */
  const [selectedResource, setSelectedResource] = useState(null);

  /** The resource pending deletion confirmation */
  const [resourceToDelete, setResourceToDelete] = useState(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // DATA FETCHING
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Fetches all resources from the API.
   * Called on mount and after every create/update/delete operation
   * to keep the UI in sync with the database.
   */
  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await getResources();
      // The API returns { data: [...] } — we access the nested data
      setResources(response.data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch resources when the component first mounts */
  useEffect(() => {
    fetchResources();
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // CRUD HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Creates a new resource.
   * Called by ResourceModal's onSubmit when selectedResource is null.
   */
  const handleCreate = async (formData) => {
    try {
      await createResource(formData);
      fetchResources(); // Refresh the list to include the new resource
    } catch (error) {
      console.error('Failed to create resource:', error);
    }
  };

  /**
   * Updates an existing resource.
   * Called by ResourceModal's onSubmit when selectedResource is populated.
   */
  const handleUpdate = async (formData) => {
    try {
      await updateResource(selectedResource._id, formData);
      fetchResources(); // Refresh to show updated data
    } catch (error) {
      console.error('Failed to update resource:', error);
    }
  };

  /**
   * Deletes a resource after confirmation.
   * Called by ConfirmModal's onConfirm.
   */
  const handleDelete = async () => {
    if (!resourceToDelete) return;
    try {
      await deleteResource(resourceToDelete._id);
      fetchResources(); // Refresh to remove the deleted resource
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  };

  /**
   * Opens the modal in "edit" mode for a specific resource.
   * Pre-populates the form with the resource's current data.
   */
  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  /**
   * Opens the modal in "create" mode with an empty form.
   */
  const openCreateModal = () => {
    setSelectedResource(null);
    setIsModalOpen(true);
  };

  /**
   * Opens the delete confirmation modal for a specific resource.
   */
  const openConfirmModal = (resource) => {
    setResourceToDelete(resource);
    setIsConfirmOpen(true);
  };

  /**
   * Handles the modal submit — routes to create or update
   * based on whether we're editing an existing resource.
   */
  const handleModalSubmit = (formData) => {
    if (selectedResource) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SEARCH FILTERING
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Filter resources by search query.
   * Case-insensitive match against the resource title.
   * If no query, all resources are shown.
   */
  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // STATS COMPUTATION
  // ═══════════════════════════════════════════════════════════════════════════

  /** Count resources by status for the stats bar */
  const activeCount = resources.filter((r) => r.status === 'Active').length;
  const archivedCount = resources.filter((r) => r.status === 'Archived').length;
  const reviewCount = resources.filter((r) => r.status === 'In Review').length;

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="pb-12 animate-fade-in">
      {/* ─── Header Section ────────────────────────────────────────────────
       * Contains the dashboard title, resource count, and the primary
       * "ADD RESOURCE" action button. Responsive flex layout. */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          {/* Dashboard title in terminal-comment style */}
          <h2 className="font-mono text-2xl font-bold text-text-primary tracking-wider mb-1">
            {'// DASHBOARD'}
          </h2>
          {/* Resource count subtitle */}
          <p className="font-mono text-sm text-text-muted">
            {resources.length} resource{resources.length !== 1 ? 's' : ''} in archive
          </p>
        </div>

        {/* Add Resource button — primary action with cyan glow */}
        <button
          onClick={openCreateModal}
          className="btn-neon btn-cyan"
        >
          {/* Plus icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          ADD RESOURCE
        </button>
      </div>

      {/* ─── Search Bar ────────────────────────────────────────────────────
       * Full-width search input for filtering resources by title.
       * Centered with a max-width for readability on large screens. */}
      <div className="mb-6">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* ─── Stats Bar ─────────────────────────────────────────────────────
       * Shows the count of resources in each status category.
       * Uses a glass card with flexed stat items for a clean layout.
       * Each stat has a colored dot matching the status color. */}
      <div className="glass p-4 mb-8 flex flex-wrap items-center gap-6">
        {/* Active count */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: '#00ff88',
              boxShadow: '0 0 6px rgba(0, 255, 136, 0.6)',
            }}
          />
          <span className="font-mono text-xs text-text-secondary">
            Active: <span className="text-neon-green font-semibold">{activeCount}</span>
          </span>
        </div>

        {/* Archived count */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#8888aa' }}
          />
          <span className="font-mono text-xs text-text-secondary">
            Archived: <span className="text-text-primary font-semibold">{archivedCount}</span>
          </span>
        </div>

        {/* In Review count */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: '#ffaa00',
              boxShadow: '0 0 6px rgba(255, 170, 0, 0.6)',
            }}
          />
          <span className="font-mono text-xs text-text-secondary">
            In Review: <span className="text-neon-amber font-semibold">{reviewCount}</span>
          </span>
        </div>

        {/* Vertical separator + total filtered count */}
        <div className="ml-auto font-mono text-xs text-text-muted">
          Showing {filteredResources.length} of {resources.length}
        </div>
      </div>

      {/* ─── Content Area ──────────────────────────────────────────────── */}
      {loading ? (
        /* ─── Loading State: Skeleton Cards ─────────────────────────────
         * Shows 6 animated skeleton placeholder cards while data is
         * being fetched from the API. Uses the shimmer animation. */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="skeleton-card animate-shimmer p-5 h-[240px]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Skeleton header line */}
              <div className="flex justify-between mb-4">
                <div className="h-5 w-24 rounded bg-dark-border opacity-50" />
                <div className="h-5 w-16 rounded-full bg-dark-border opacity-50" />
              </div>
              {/* Skeleton title line */}
              <div className="h-5 w-3/4 rounded bg-dark-border opacity-50 mb-3" />
              {/* Skeleton description lines */}
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-dark-border opacity-30" />
                <div className="h-3 w-5/6 rounded bg-dark-border opacity-30" />
                <div className="h-3 w-2/3 rounded bg-dark-border opacity-30" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredResources.length > 0 ? (
        /* ─── Resource Grid ─────────────────────────────────────────────
         * Responsive grid: 1 column on mobile, 2 on medium, 3 on large.
         * Each card gets a staggered slide-up animation via animationDelay. */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div
              key={resource._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ResourceCard
                resource={resource}
                onEdit={handleEdit}
                onDelete={openConfirmModal}
              />
            </div>
          ))}
        </div>
      ) : (
        /* ─── Empty State ───────────────────────────────────────────────
         * Shown when there are no resources at all, or when the search
         * query doesn't match any resources. Different messaging for
         * each case helps the user understand what to do next. */
        <div className="glass p-12 text-center animate-fade-in">
          {/* Empty state icon — a document with a question mark */}
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
              }}
            >
              <svg
                className="w-8 h-8 text-neon-cyan opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {searchQuery ? (
            /* No search results messaging */
            <>
              <p className="font-mono text-base text-text-secondary mb-2">
                No matches found
              </p>
              <p className="font-mono text-sm text-text-muted">
                {'// No resources match "'}{searchQuery}{'"'}
              </p>
            </>
          ) : (
            /* Empty archive messaging */
            <>
              <p className="font-mono text-base text-text-secondary mb-2">
                Archive is empty
              </p>
              <p className="font-mono text-sm text-text-muted mb-4">
                {'// Click "ADD RESOURCE" to begin cataloging'}
              </p>
              <button
                onClick={openCreateModal}
                className="btn-neon btn-cyan"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                ADD FIRST RESOURCE
              </button>
            </>
          )}
        </div>
      )}

      {/* ─── Modals ────────────────────────────────────────────────────────
       * ResourceModal: Handles both create and edit operations.
       * ConfirmModal: Safety confirmation before deletion. */}
      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedResource(null);
        }}
        onSubmit={handleModalSubmit}
        resource={selectedResource}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setResourceToDelete(null);
        }}
        onConfirm={handleDelete}
        resourceTitle={resourceToDelete?.title || ''}
      />
    </div>
  );
};

export default Dashboard;
