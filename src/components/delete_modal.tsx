// Modal.tsx
import React from "react";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <Button
            type="button"
            text="Save"
            color="bg-red-600 hover:bg-red-900"
            onClick={onConfirm}
          />
          <Button
            type="submit"
            text="Cancel"
            color="bg-blue-600 hover:bg-blue-900"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
