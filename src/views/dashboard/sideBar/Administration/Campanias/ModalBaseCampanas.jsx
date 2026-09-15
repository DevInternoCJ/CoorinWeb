import React, { useRef } from "react"
import ModalBase from "../../../board/ModalBase";
import ModalCampanasContent from "../Campanias/ModalCampanasContent";

const ModalBaseCampanas = ({ open, onClose }) => {
    const modalRef = useRef(null);
    
    // Usando la lógica pura de ModalBase
    const { bounce, handleBackdropClick } = ModalBase.useModalLogic();

    if (!open) return null;

    return (
        <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
            <div
                  ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-[var(--color-surface-modal)] text-[var(--color-text-primary)] rounded-xl shadow-2xl w-full max-w-6xl p-4 overflow-hidden border border-[var(--color-border)] flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
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
                    background: var(--color-surface-secondary);
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb {
                    background: var(--color-border);
                    border-radius: 4px;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                    background: var(--color-text-muted);
                }
                .modal-scroll-gray {
                    scrollbar-color: var(--color-border) var(--color-surface-secondary);
                    scrollbar-width: thin;
                }
            `}</style>
        </div>
    );
};

export default ModalBaseCampanas;
