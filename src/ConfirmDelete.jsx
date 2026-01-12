import React from "react";

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface text-text-main p-6 rounded-2xl border border-slate-700/50 shadow-2xl max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p className="text-text-muted mb-6">
          Are you sure you want to delete this card? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDelete;
