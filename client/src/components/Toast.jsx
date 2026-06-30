/**
 * Toast.jsx — Archive Terminal
 * Pop-up notification component for CRUD operation feedback.
 */

import React, { useState, useEffect } from 'react';

/* Individual Toast */
const Toast = ({ id, message, type, onRemove }) => {
  const [removing, setRemoving] = useState(false);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setRemoving(true);
      setTimeout(() => onRemove(id), 280);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const icons = {
    success: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01" />
      </svg>
    ),
  };

  return (
    <div className={`toast toast-${type} ${removing ? 'removing' : ''}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

/* Toast Container — renders all active toasts */
export const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

/* Hook for managing toasts */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export default Toast;
