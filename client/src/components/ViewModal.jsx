/**
 * ViewModal — Archive Terminal v4.0
 * Metal-framed modal to read full resource details.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_CONFIG = {
  'AI Model':       { bg:'rgba(0,240,255,0.07)', color:'#00f0ff', border:'rgba(0,240,255,0.2)', dot:'#00f0ff' },
  'Code Snippet':   { bg:'rgba(168,85,247,0.07)', color:'#a855f7', border:'rgba(168,85,247,0.2)', dot:'#a855f7' },
  'Research Paper': { bg:'rgba(255,170,0,0.07)', color:'#ffaa00', border:'rgba(255,170,0,0.2)', dot:'#ffaa00' },
  'Tool':           { bg:'rgba(0,255,136,0.07)', color:'#00ff88', border:'rgba(0,255,136,0.2)', dot:'#00ff88' },
  'Other':          { bg:'rgba(255,0,204,0.07)', color:'#ff00cc', border:'rgba(255,0,204,0.2)', dot:'#ff00cc' },
};
const STATUS_CLASS = { 'Active':'status-active', 'Archived':'status-archived', 'In Review':'status-review' };
const formatDate = d => new Date(d).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });

const ViewModal = ({ isOpen, onClose, resource }) => {
  if (!isOpen || !resource) return null;
  const cat = CATEGORY_CONFIG[resource.category] || CATEGORY_CONFIG['Other'];
  const stCls = STATUS_CLASS[resource.status] || 'status-active';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="metal-modal-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="metal-modal" style={{ maxWidth: '600px' }}
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 80, rotateX: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <div className="screw screw-tl" /><div className="screw screw-tr" />
            <div className="screw screw-bl" /><div className="screw screw-br" />

            <div className="modal-inner">
              <div className="modal-accent-bar" style={{ background: `linear-gradient(90deg, ${cat.color}, #a855f7, #00f0ff)` }} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <span className="category-badge" style={{ background:cat.bg, color:cat.color, border:`1px solid ${cat.border}` }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:cat.dot }} />
                      {resource.category}
                    </span>
                    <span className={stCls}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                        background: resource.status==='Active' ? '#00ff88' : resource.status==='In Review' ? '#ffaa00' : '#6a6a8e',
                        boxShadow: resource.status==='Active' ? '0 0 6px rgba(0,255,136,0.7)' : resource.status==='In Review' ? '0 0 6px rgba(255,170,0,0.6)' : 'none',
                      }} />
                      {resource.status}
                    </span>
                  </div>
                  <button onClick={onClose} className="text-text-muted hover:text-neon-red transition-colors" aria-label="Close">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <h2 className="font-mono text-xl sm:text-2xl font-bold text-white mb-2" style={{ textShadow: `0 0 10px ${cat.color}60` }}>{resource.title}</h2>
                <div className="font-mono text-xs text-text-muted mb-6">{'// ADDED: '}{formatDate(resource.createdAt)}</div>

                <div className="bg-dark-bg/50 border border-dark-border rounded-md p-4 mb-6 max-h-[40vh] overflow-y-auto scrollbar-neon whitespace-pre-wrap text-sm text-text-primary leading-relaxed" style={{ background: 'rgba(4,4,8,0.5)', borderColor: 'rgba(26,26,54,0.8)' }}>
                  {resource.description || 'No description provided.'}
                </div>

                <div className="flex justify-end">
                  <button onClick={onClose} className="btn-neon btn-cyan btn-glitch">CLOSE_TERMINAL</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ViewModal;
