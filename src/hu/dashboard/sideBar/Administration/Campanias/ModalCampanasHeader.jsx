import React from "react";

const ModalCampanasHeader = ({ onClose }) => (
    <div className="flex items-center mb-2 w-full" style={{ justifyContent: 'space-between' }}>
        {/* Título alineado a la izquierda */}
        <h2 className="modal-title">
            <span className="modal-title-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                </svg>
            </span>
            Campañas - Coorinnn
        </h2>
        {/* Botón de cierre alineado a la derecha */}
        <button
            onClick={onClose}
            className="modal-btn modal-btn-close"
            aria-label="Cerrar"
            style={{ marginLeft: 'auto', fontSize: '2rem' }}
        >
            &times;
        </button>
    </div>
);

export default ModalCampanasHeader;