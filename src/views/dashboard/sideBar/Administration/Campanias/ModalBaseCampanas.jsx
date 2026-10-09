import React, { useRef } from "react"
import GlobalModal from "../../../../../components/Modal/GlobalModal";
import ModalBase from "../../../board/ModalBase";
import ModalCampanasContent from "../Campanias/ModalCampanasContent";

const ModalBaseCampanas = ({ open, onClose }) => {
    const modalRef = useRef(null);
    
    // Usando la lógica pura de ModalBase
    const { bounce, handleBackdropClick } = ModalBase.useModalLogic();

    if (!open) return null;

    return (
        <GlobalModal isOpen={open} onClose={onClose} onBackdropClick={handleBackdropClick} title="Campañas" mode="content" showHeader={false} showCloseButton={false} closeOnBackdropClick={false}>
            <div
                  ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } modal-container bg-surface-modal text-foreground rounded-xl shadow-2xl w-full max-w-6xl p-4 overflow-hidden border border-border flex flex-col`}
        onClick={(e) => e.stopPropagation()}
            >
                {/* Header y contenido principal */}
                <ModalCampanasContent onClose={onClose} />
            </div>
            <style>{`
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
        </GlobalModal>
    );
};

export default ModalBaseCampanas;
