import React from "react";

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-[#060c07] text-[#e9f3eb] p-6 rounded-lg border border-[#58bd6b] shadow-lg">
        <p className="text-lg mb-4">
          Are you sure you want to delete this card?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-[#e9f3eb] rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#58bd6b] text-[#060c07] rounded hover:bg-[#6be27f]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDelete;
