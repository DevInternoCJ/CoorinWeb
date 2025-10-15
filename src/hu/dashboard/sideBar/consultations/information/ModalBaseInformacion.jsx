import React, { useRef } from "react";
import ModalBase from "../../../board/ModalBase";

const ModalBaseInformacion = ({ onClose, tipoInformacion, children, modalSize = {} }) => {
    const modalRef = useRef(null);
    const { bounce } = ModalBase.useModalLogic();

    // Función personalizada para manejar el click del backdrop
    const handleCustomBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Mapeo de títulos para cada tipo de información
    const titulos = {
        "Lista Negra": "Lista Negra",
        "Arrepentimientos": "Arrepentimientos",
        "Pagos": "Pagos",
        "Pagos reportados": "Pagos Reportados",
        "Datos Erroneos": "Datos Erróneos",
        "Domicilios": "Domicilios",
        "Correos": "Correos",
        "Búsquedas": "Búsquedas",
        "Ofrecimientos": "Ofrecimientos", 
        "Comentarios": "Comentarios",
        "VGP": "VGP"
    };

    const titulo = titulos[tipoInformacion] || "Información";

    // Tamaño por defecto
    let defaultModalStyle = {
        maxWidth: "60vw", // 920px ~ 60vw
        minWidth: "40vw", // 690px ~ 40vw
        height: "70vh",   // 633px ~ 70vh
        display: "flex",
        flexDirection: "column",
        position: "relative"
    };

    // Si es Payments, usar dimensiones fijas (sin responsividad)
    if (tipoInformacion === "Pagos" || tipoInformacion === "Payments") {
        defaultModalStyle = {
            ...defaultModalStyle,
            maxWidth: "644px", // 920 * 0.7
            minWidth: "483px", // 690 * 0.7
            width: "483px",
            height: "506px",    // 633 * 0.8
            maxHeight: "506px"
        };
    }
    const mergedModalStyle = { ...defaultModalStyle, ...modalSize };

    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={handleCustomBackdropClick} />
            <div
                ref={modalRef}
                className={`modal-content modal-xl-container${bounce ? " animate-bounce-modal" : ""}`}
                onClick={e => e.stopPropagation()}
                style={mergedModalStyle}
            >
                {/* Header común para todos los componentes de información */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: "0.3rem",
                    paddingTop: "0.3rem",
                    minHeight: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
                        <h2 className="modal-title">{titulo}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="modal-btn modal-btn-close ml-4"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                {/* Contenido específico del componente */}
                <div style={{ flex: 1, width: '100%', overflow: 'visible', height: '100%' }}>
                    {children}
                </div>
            </div>
            <style>{`
                @keyframes bounce-modal {
                    0% { transform: scale(1); }
                    20% { transform: scale(1.05, 0.95); }
                    40% { transform: scale(0.95, 1.05); }
                    60% { transform: scale(1.03, 0.97); }
                    80% { transform: scale(0.97, 1.03); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-modal {
                    animation: bounce-modal 0.5s;
                }
            `}</style>
        </div>
    );
};

export default ModalBaseInformacion;