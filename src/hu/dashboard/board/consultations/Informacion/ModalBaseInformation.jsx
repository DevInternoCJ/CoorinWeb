import React from "react";

const ModalBaseInformation = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[340px] max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-green-500 hover:text-red-600 transition rounded-full p-1"
                    style={{ fontSize: "1.5rem", lineHeight: 1, background: "transparent" }}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalBaseInformation;