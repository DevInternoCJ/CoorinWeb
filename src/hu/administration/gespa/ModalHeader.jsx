import React from "react";

const ModalHeader = ({ onClose, title}) => {
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-jerarquia3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
          />
        </svg>
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
