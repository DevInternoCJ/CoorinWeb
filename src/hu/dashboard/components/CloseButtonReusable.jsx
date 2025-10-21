import React from 'react';

const CloseButtonCampanas = ({ onClose }) => (
    <div style={{ marginLeft: 'auto' }}>
        <button
            onClick={onClose}
            className="modal-btn modal-btn-close"
            aria-label="Cerrar"
            style={{ marginLeft: 'auto', fontSize: '2rem' }}
            type="button"
        >
            &times;
        </button>
    </div>
);

export default CloseButtonCampanas;
