import React from "react";
import "./index.css";

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-custom-black text-custom-white p-6 rounded-lg border border-accent shadow-lg">
        <p className="text-lg mb-4">
          Are you sure you want to delete this card?
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="secondary-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="primary-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDelete;
