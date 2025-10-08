import React, { useRef, useState, useEffect } from "react";

const ModaBaseEjecutivos = ({ open, children, onClose }) => {
  const [bounce, setBounce] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
        if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 500);
    if (onClose) onClose();
  };

  return (
    <div className="coorin-modal-blur-bg">
      <div className="coorin-modal-overlay" onClick={handleBackdropClick} />
      <div
        ref={modalRef}
        className={`coorin-modal-content${bounce ? " coorin-animate-bounce-modal" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModaBaseEjecutivos;
