import React from "react";

const ModalHeader = ({ onClose, title, icon}) => {
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-jerarquia3">
        {icon}
        <h2 className="text-xl font-bold text-jerarquia3">
          {title}
        </h2>
      </div>
      <button
        onClick={onClose}
        className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
      >
        &times;
      </button>
    </div>
  );
};

export default ModalHeader;
