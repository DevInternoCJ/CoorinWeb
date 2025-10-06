import React, { useRef } from "react"
import ModalBase from "../../board/ModalBase";
import ModalCampanasContent from "./ModalCampanasContent";

const ModalBaseCampanas = ({ open, onClose }) => {
    const modalRef = useRef(null);
    
    // Usando la lógica pura de ModalBase
    const { bounce, handleBackdropClick } = ModalBase.useModalLogic();

    if (!open) return null;

    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={handleBackdropClick} />
            <div
                ref={modalRef}
                className={`modal-content modal-xl-container${bounce ? " animate-bounce-modal" : ""}`}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: "1200px",
                    minWidth: "1200px",
                    height: "660px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflowX: "hidden"
                }}
            >
                {/* Header y contenido principal */}
                <ModalCampanasContent onClose={onClose} />
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
                .modal-scroll-gray::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                    background: #f5f5f5;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
                .modal-scroll-gray {
                    scrollbar-color: #b0b0b0 #f5f5f5;
                    scrollbar-width: thin;
                }
            `}</style>
        </div>
    );
};

export default ModalBaseCampanas;