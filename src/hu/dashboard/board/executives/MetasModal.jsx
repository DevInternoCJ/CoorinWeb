import React from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalMetasHeader from "./ModalMetasHeader";
import ModalMetasContent from "./ModalMetasContent";
import ModalMetasFooter from "./ModalMetasFooter";

const MetasModal = ({
    isOpen,
    onClose,
    // Props opcionales para personalizar
    size = "metas", // 70% del viewport (reducido del 80% original)
    showCustomHeader = true,
    showCustomFooter = true,
    enableBounce = true,
    enableShakeOnBackdropClick = true,
    closeOnBackdropClick = false,
    ...props
}) => {
    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            showHeader={showCustomHeader}
            headerComponent={showCustomHeader ? ModalMetasHeader : null}
            showFooter={showCustomFooter}
            footerComponent={showCustomFooter ? ModalMetasFooter : null}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="modal-scroll-gray"
            modalClassName="border-0 shadow-2xl"
            overlayClassName="modal-blur-bg"
            {...props}
        >
            <ModalMetasContent />

            {/* Agregar estilos específicos del modal de metas */}
            <style jsx global>{`
        /* Estilo personalizado para el backdrop del modal - transparente con blur suave */
        .modal-blur-bg {
          background: rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(6px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(6px) saturate(180%) !important;
          animation: fadeInBackdrop 0.3s ease-out;
        }
        
        /* Animación suave para la aparición del backdrop */
        @keyframes fadeInBackdrop {
          from {
            background: rgba(255, 255, 255, 0);
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
          }
          to {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(6px) saturate(180%);
            -webkit-backdrop-filter: blur(6px) saturate(180%);
          }
        }
        .scrollbar-gray::-webkit-scrollbar {
          height: 8px;
          width: 8px;
          background: #f5f5f5;
        }
        .scrollbar-gray::-webkit-scrollbar-thumb {
          background: #b0b0b0;
          border-radius: 4px;
        }
        .scrollbar-gray::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
        .modal-scroll-gray::-webkit-scrollbar {
          width: 8px;
          background: #f5f5f5;
        }
        .modal-scroll-gray::-webkit-scrollbar-thumb {
          background: #b0b0b0;
          border-radius: 4px;
        }
        .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
        /* Estilo para filas con checkbox activo */
        :global(.modal-table tr.row-selected) {
          background: #9dc5bc !important;
        }
        :global(.modal-table tr.row-selected:hover) {
          background: #8bb5b0 !important;
        }
        :global(.modal-table tr.row-selected td) {
          color: #2b463c !important;
        }
      `}</style>
        </ReusableModal>
    );
};

export default MetasModal;