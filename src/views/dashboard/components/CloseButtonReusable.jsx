import React from 'react';

const CloseButtonCampanas = ({ onClose, className = "" }) => (
    <button
        onClick={onClose}
        className={`modal-btn modal-btn-close ${className}`}
        aria-label="Cerrar"
        style={{ fontSize: '2rem' }}
        type="button"
    >
        &times;
    </button>
);

export default CloseButtonCampanas;
