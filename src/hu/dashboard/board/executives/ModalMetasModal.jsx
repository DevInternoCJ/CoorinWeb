import React from "react";
import ReusableModal from "../modalGlobalReboot/ReusableModal";
import ModalMetasContent from "./ModalMetasContent";
import { IconMetas } from "./IconesEjecutives";

const MetasModal = ({
    isOpen,
    onClose,
    // Props opcionales para personalizar
    size = "metas", // 76% del viewport 
    enableBounce = true,
    enableShakeOnBackdropClick = true,
    closeOnBackdropClick = false,
    ...props
}) => {
    // Header personalizado con estilos verdes usando DefaultModalHeader structure
    const CustomHeader = ({ onClose }) => (
        <div className="px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                       bg-white border-b-2 flex items-center justify-between gap-3"
             style={{ borderColor: "var(--color-jerarquia1)" }}>
            {/* Sección izquierda: Ícono y título */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <IconMetas 
                    className="size-5 sm:size-6 flex-shrink-0"
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold truncate sm:whitespace-normal leading-tight"
                        style={{ color: "var(--color-jerarquia3)" }}>
                        <span className="hidden sm:inline">Metas diarias ejecutivos - Coorin</span>
                        <span className="sm:hidden">Metas Ejecutivos</span>
                    </h2>
                </div>
            </div>
            
            {/* Botón de cerrar */}
            <div className="flex-shrink-0">
                <button
                    onClick={onClose}
                    className="transition-colors duration-200 rounded-full p-1 sm:p-1.5 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                    style={{ color: "var(--color-jerarquia3)", fontSize: "1.25rem", lineHeight: 1 }}
                    onMouseEnter={(e) => e.target.style.color = "#dc2626"}
                    onMouseLeave={(e) => e.target.style.color = "var(--color-jerarquia3)"}
                    aria-label="Cerrar modal"
                >
                    &times;
                </button>
            </div>
        </div>
    );

    // Footer personalizado con estilos verdes usando DefaultModalFooter structure
    const CustomFooter = () => (
        <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                       flex flex-col sm:flex-row justify-between items-start sm:items-center 
                       border-t-2 gap-2 sm:gap-0 bg-gray-50"
             style={{ borderColor: "var(--color-jerarquia1)" }}>
            <div className="text-xs sm:text-sm md:text-sm font-medium leading-relaxed"
                 style={{ color: "var(--color-jerarquia3)" }}>
                Seleccione los ejecutivos para guardar sus Metas Diarias
            </div>
        </div>
    );

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            headerComponent={CustomHeader}
            footerComponent={CustomFooter}
            showHeader={true}
            showFooter={true}
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