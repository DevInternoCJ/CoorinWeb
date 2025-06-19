import React from "react";
import "./modalBase.css";

const ModalBase = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalBase;
