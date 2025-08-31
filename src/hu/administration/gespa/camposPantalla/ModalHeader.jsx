import React from "react";
import LogoCoorin from "../../../../assets/logo_coorin_3.svg";

const ModalHeader = ({ onClose }) => {
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={LogoCoorin} alt="Logo-coorin" className="h-8" />
        <h2 className="text-xl font-bold text-jerarquia3">Campos Pantalla - Coorin</h2>
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